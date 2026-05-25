use std::sync::{Arc, RwLock};

use tauri::Manager;
use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

mod parser;
mod server;

const MIGRATION_001: &str = include_str!("../migrations/0001_init.sql");

/// Shared state holding the bearer token used by the local HTTP server.
/// The frontend reads/initializes this from `app_settings.local_server_token`
/// at startup and pushes it here via the `set_server_token` command.
pub struct ServerToken(pub Arc<RwLock<Option<String>>>);

/// Shared state for the port the local server actually bound to. The frontend
/// reads it to display in Réglages.
pub struct ServerPort(pub Arc<RwLock<Option<u16>>>);

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let token: Arc<RwLock<Option<String>>> = Arc::new(RwLock::new(None));
    let port: Arc<RwLock<Option<u16>>> = Arc::new(RwLock::new(None));

    let token_for_setup = token.clone();
    let port_for_setup = port.clone();

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
        .invoke_handler(tauri::generate_handler![
            parser::parse_listing_url,
            set_server_token,
            get_server_port,
            generate_token,
        ])
        .setup(move |app| {
            let app_handle = app.handle().clone();
            let token = token_for_setup.clone();
            let port = port_for_setup.clone();
            tauri::async_runtime::spawn(async move {
                let bound = server::spawn(app_handle, token).await;
                if let Ok(mut p) = port.write() {
                    *p = bound;
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
