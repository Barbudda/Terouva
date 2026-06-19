use std::sync::{Arc, RwLock};

use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

mod geo;
mod parser;
mod polling;
mod server;

const MIGRATION_001: &str = include_str!("../migrations/0001_init.sql");

pub struct ServerToken(pub Arc<RwLock<Option<String>>>);
pub struct ServerPort(pub Arc<RwLock<Option<u16>>>);
pub struct Polling(pub polling::PollingState);
/// File de notifications « annonce chaude » partagée avec le serveur HTTP local :
/// le frontend y empile (commande `enqueue_chrome_notif`), l'extension Chrome la
/// draine via GET /notifications/pending. Bornée pour éviter toute croissance.
pub struct ServerNotifs(pub Arc<RwLock<Vec<server::ChromeNotif>>>);
/// Demandes d'appairage d'extensions Chrome partagées avec le serveur HTTP local.
/// Le frontend les approuve/refuse via `respond_pairing` (style « Autoriser cette
/// extension »), évitant tout copier-coller de token côté utilisateur.
pub struct Pairings(pub Arc<RwLock<Vec<server::PairRequest>>>);

#[tauri::command]
fn set_server_token(token: String, state: tauri::State<'_, ServerToken>) -> Result<(), String> {
    let mut guard = state.0.write().map_err(|e| e.to_string())?;
    *guard = if token.is_empty() { None } else { Some(token) };
    Ok(())
}

#[tauri::command]
fn get_server_port(state: tauri::State<'_, ServerPort>) -> Option<u16> {
    state.0.read().ok().and_then(|g| *g)
}

#[tauri::command]
fn generate_token() -> String {
    server::generate_token()
}

#[tauri::command]
async fn set_polling_targets(
    targets: Vec<polling::PollingTarget>,
    enabled: bool,
    state: tauri::State<'_, Polling>,
) -> Result<(), String> {
    let mut s = state.0.write().await;
    s.targets = targets;
    s.enabled = enabled;
    s.stats.enabled = enabled;
    s.stats.target_count = s.targets.len();
    Ok(())
}

#[tauri::command]
async fn get_polling_stats(state: tauri::State<'_, Polling>) -> Result<polling::PollingStats, String> {
    let s = state.0.read().await;
    Ok(s.stats.clone())
}

/// Empile une notification « annonce chaude » pour l'extension Chrome. Appelée par
/// le frontend quand une annonce dépasse le seuil. Aucun pilotage : c'est une simple
/// alerte que l'extension affichera (clic = ouvrir l'annonce). File bornée à 50.
#[tauri::command]
fn enqueue_chrome_notif(
    notif: server::ChromeNotif,
    state: tauri::State<'_, ServerNotifs>,
) -> Result<(), String> {
    let mut q = state.0.write().map_err(|e| e.to_string())?;
    server::push_notif(&mut q, notif);
    Ok(())
}

/// Liste les demandes d'appairage en attente (pour réafficher la modale au besoin).
#[tauri::command]
fn list_pending_pairings(state: tauri::State<'_, Pairings>) -> Vec<serde_json::Value> {
    state
        .0
        .read()
        .map(|q| {
            q.iter()
                .filter(|p| p.status == "pending")
                .map(|p| serde_json::json!({ "id": p.id, "ext_id": p.ext_id, "label": p.label }))
                .collect()
        })
        .unwrap_or_default()
}

/// Réponse de l'utilisateur à une demande d'appairage : si approuvée, on attache
/// le token courant du serveur à la demande (l'extension le récupère via
/// GET /pair/status/:id). Le token doit déjà exister (poussé au boot par le
/// frontend depuis app_settings). Aucun copier-coller côté utilisateur.
#[tauri::command]
fn respond_pairing(
    request_id: String,
    approve: bool,
    pairings: tauri::State<'_, Pairings>,
    token: tauri::State<'_, ServerToken>,
) -> Result<(), String> {
    let current = token.0.read().map_err(|e| e.to_string())?.clone();
    let mut q = pairings.0.write().map_err(|e| e.to_string())?;
    let Some(req) = q.iter_mut().find(|p| p.id == request_id) else {
        return Err("Demande d'appairage introuvable".into());
    };
    if approve {
        let Some(tok) = current else {
            return Err("Token serveur absent — relance l'app.".into());
        };
        req.status = "approved".into();
        req.token = Some(tok);
    } else {
        req.status = "denied".into();
        req.token = None;
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let token: Arc<RwLock<Option<String>>> = Arc::new(RwLock::new(None));
    let port: Arc<RwLock<Option<u16>>> = Arc::new(RwLock::new(None));
    let notifs: Arc<RwLock<Vec<server::ChromeNotif>>> = Arc::new(RwLock::new(Vec::new()));
    let pairings: Arc<RwLock<Vec<server::PairRequest>>> = Arc::new(RwLock::new(Vec::new()));
    let polling_state = polling::new_state();

    let token_for_setup = token.clone();
    let port_for_setup = port.clone();
    let notifs_for_setup = notifs.clone();
    let pairings_for_setup = pairings.clone();
    let polling_for_setup = polling_state.clone();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(
            SqlBuilder::default()
                .add_migrations(
                    "sqlite:terouva.db",
                    vec![Migration {
                        version: 1,
                        description: "init schema",
                        sql: MIGRATION_001,
                        kind: MigrationKind::Up,
                    }],
                )
                .build(),
        )
        .manage(ServerToken(token.clone()))
        .manage(ServerPort(port.clone()))
        .manage(ServerNotifs(notifs.clone()))
        .manage(Pairings(pairings.clone()))
        .manage(Polling(polling_state.clone()))
        .invoke_handler(tauri::generate_handler![
            parser::parse_listing_url,
            parser::parse_search_url,
            geo::geocode_city,
            set_server_token,
            get_server_port,
            generate_token,
            enqueue_chrome_notif,
            list_pending_pairings,
            respond_pairing,
            set_polling_targets,
            get_polling_stats,
        ])
        .setup(move |app| {
            let app_handle = app.handle().clone();
            let token = token_for_setup.clone();
            let port = port_for_setup.clone();
            let notifs = notifs_for_setup.clone();
            let pairings = pairings_for_setup.clone();
            let polling = polling_for_setup.clone();

            // HTTP server for the Chrome extension.
            let server_handle = app_handle.clone();
            tauri::async_runtime::spawn(async move {
                let bound = server::spawn(server_handle, token, notifs, pairings).await;
                if let Ok(mut p) = port.write() {
                    *p = bound;
                }
            });

            // Background polling loop.
            polling::spawn_loop(polling, app_handle.clone());

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
