//! Local HTTP server that the Chrome extension talks to.
//!
//! The extension watches LBC pages the user has open and POSTs newly detected
//! listings here. This server doesn't touch the DB directly — it forwards
//! validated payloads as Tauri events to the frontend, which handles ingestion
//! using the same pipeline as the clipboard import.
//!
//! Binding: 127.0.0.1 only. Never exposed on LAN.
//! Auth: bearer token in `Authorization` header, set by the frontend at boot
//!       from `app_settings.local_server_token`.

use axum::{
    extract::{Path, State},
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::{
    net::SocketAddr,
    sync::{Arc, RwLock},
};
use tauri::{AppHandle, Emitter};
use tower_http::cors::{Any, CorsLayer};

pub const DEFAULT_PORT: u16 = 8765;

#[derive(Clone)]
pub struct ServerState {
    pub token: Arc<RwLock<Option<String>>>,
    pub app: AppHandle,
    /// File d'attente de notifications « annonce chaude » que l'extension Chrome
    /// vient drainer (GET /notifications/pending). Remplie par le frontend via la
    /// commande Tauri `enqueue_chrome_notif` quand une annonce dépasse le seuil.
    /// Permet d'alerter dans le navigateur même si la fenêtre de l'app n'est pas
    /// au premier plan. NB : pas de pilotage du navigateur — juste une notif.
    pub notifications: Arc<RwLock<Vec<ChromeNotif>>>,
    /// Demandes d'appairage en attente/résolues (style « Autoriser cette
    /// extension »). L'extension POST /pair/request (sans token) → l'app affiche
    /// une demande → l'utilisateur Autorise → l'extension récupère le token via
    /// GET /pair/status/:id. Plus de copier-coller de token côté utilisateur.
    pub pairings: Arc<RwLock<Vec<PairRequest>>>,
}

/// Une demande d'appairage d'une extension Chrome.
#[derive(Debug, Clone, Serialize)]
pub struct PairRequest {
    pub id: String,
    pub ext_id: String,
    pub label: String,
    /// "pending" | "approved" | "denied"
    pub status: String,
    /// Le token, fourni uniquement une fois la demande approuvée.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub token: Option<String>,
}

/// Borne de la file d'appairages conservés (anti-croissance).
pub const PAIR_QUEUE_CAP: usize = 20;

/// Une notification « annonce chaude » destinée à l'extension Chrome.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ChromeNotif {
    pub id: String,
    pub title: String,
    pub body: String,
    pub url: String,
    pub score: i64,
}

/// Borne maximale de la file de notifications en attente (anti-croissance).
pub const NOTIF_QUEUE_CAP: usize = 50;

/// Empile une notif dans la file : ignore les doublons (même URL déjà en attente)
/// et borne la file à `NOTIF_QUEUE_CAP` (on jette les plus anciennes). Logique pure
/// (sans verrou) pour être testable et réutilisée par la commande Tauri.
pub fn push_notif(queue: &mut Vec<ChromeNotif>, notif: ChromeNotif) {
    if queue.iter().any(|n| n.url == notif.url) {
        return;
    }
    queue.push(notif);
    if queue.len() > NOTIF_QUEUE_CAP {
        let overflow = queue.len() - NOTIF_QUEUE_CAP;
        queue.drain(0..overflow);
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct WatchPayload {
    pub app: String,         // must be "terouva"
    pub r#type: String,      // must be "listing-watch" or "listing-clipboard"
    pub version: u32,        // 1
    pub captured_at: Option<String>,
    pub data: WatchListing,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct WatchListing {
    pub url: String,
    pub external_id: Option<String>,
    pub title: Option<String>,
    pub price: Option<i64>,
    pub city: Option<String>,
    pub postal_code: Option<String>,
    pub surface: Option<i64>,
    pub rooms: Option<i64>,
    pub furnished: Option<bool>,
    pub property_type: Option<String>,
    pub description: Option<String>,
    #[serde(default)]
    pub images: Vec<String>,
    pub publisher_name: Option<String>,
    pub publisher_type: Option<String>,
    pub published_at: Option<String>,
}

#[derive(Debug, Serialize)]
struct HealthBody {
    app: &'static str,
    version: &'static str,
    listening: bool,
}

#[derive(Debug, Serialize)]
struct ErrorBody {
    error: String,
}

fn auth_ok(state: &ServerState, headers: &HeaderMap) -> bool {
    let configured = state.token.read().ok().and_then(|g| g.clone());
    let Some(expected) = configured else {
        return false;
    };
    let Some(header) = headers.get("authorization").and_then(|v| v.to_str().ok()) else {
        return false;
    };
    let presented = header.trim().strip_prefix("Bearer ").unwrap_or(header.trim());
    !expected.is_empty() && presented == expected
}

async fn health(State(state): State<ServerState>) -> impl IntoResponse {
    let listening = state.token.read().ok().and_then(|g| g.clone()).is_some();
    Json(HealthBody {
        app: "terouva",
        version: env!("CARGO_PKG_VERSION"),
        listening,
    })
}

async fn ingest_listing(
    State(state): State<ServerState>,
    headers: HeaderMap,
    Json(payload): Json<WatchPayload>,
) -> impl IntoResponse {
    if !auth_ok(&state, &headers) {
        return (
            StatusCode::UNAUTHORIZED,
            Json(ErrorBody {
                error: "invalid or missing bearer token".into(),
            }),
        )
            .into_response();
    }
    if payload.app != "terouva" {
        return (
            StatusCode::BAD_REQUEST,
            Json(ErrorBody {
                error: "unexpected app field".into(),
            }),
        )
            .into_response();
    }
    if !matches!(payload.r#type.as_str(), "listing-watch" | "listing-clipboard") {
        return (
            StatusCode::BAD_REQUEST,
            Json(ErrorBody {
                error: "unexpected type field".into(),
            }),
        )
            .into_response();
    }
    if payload.data.url.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(ErrorBody {
                error: "missing data.url".into(),
            }),
        )
            .into_response();
    }
    if let Err(e) = state.app.emit("watch:listing", &payload) {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorBody {
                error: format!("emit failed: {e}"),
            }),
        )
            .into_response();
    }
    (
        StatusCode::ACCEPTED,
        Json(serde_json::json!({ "ok": true })),
    )
        .into_response()
}

/// L'extension Chrome poll cet endpoint (toutes les ~6 s) pour récupérer les
/// notifications « annonce chaude » en attente, puis les affiche via
/// `chrome.notifications`. On **draine** : chaque item n'est renvoyé qu'une fois.
async fn notifications_pending(
    State(state): State<ServerState>,
    headers: HeaderMap,
) -> impl IntoResponse {
    if !auth_ok(&state, &headers) {
        return (StatusCode::UNAUTHORIZED, Json(serde_json::json!([]))).into_response();
    }
    let drained: Vec<ChromeNotif> = match state.notifications.write() {
        Ok(mut q) => std::mem::take(&mut *q),
        Err(_) => Vec::new(),
    };
    (StatusCode::OK, Json(drained)).into_response()
}

#[derive(Debug, Deserialize)]
struct PairRequestBody {
    ext_id: Option<String>,
    label: Option<String>,
}

/// L'extension demande à s'appairer (aucun token requis : c'est le handshake).
/// Crée une demande « pending » et notifie le frontend (event `pair:request`)
/// qui affiche « Autoriser cette extension ? ». Renvoie l'id de la demande.
async fn pair_request(
    State(state): State<ServerState>,
    Json(body): Json<PairRequestBody>,
) -> impl IntoResponse {
    let id = generate_token()[..12].to_string();
    let ext_id = body.ext_id.unwrap_or_else(|| "inconnue".into());
    let label = body.label.unwrap_or_else(|| "Extension Chrome".into());
    let req = PairRequest {
        id: id.clone(),
        ext_id: ext_id.clone(),
        label: label.clone(),
        status: "pending".into(),
        token: None,
    };
    if let Ok(mut q) = state.pairings.write() {
        q.push(req);
        if q.len() > PAIR_QUEUE_CAP {
            let overflow = q.len() - PAIR_QUEUE_CAP;
            q.drain(0..overflow);
        }
    }
    let _ = state.app.emit(
        "pair:request",
        serde_json::json!({ "id": id, "ext_id": ext_id, "label": label }),
    );
    (
        StatusCode::OK,
        Json(serde_json::json!({ "request_id": id })),
    )
}

/// L'extension poll cet endpoint jusqu'à ce que l'utilisateur réponde dans l'app.
/// Renvoie { status, token? }. Le token n'apparaît qu'après approbation.
async fn pair_status(
    State(state): State<ServerState>,
    Path(id): Path<String>,
) -> impl IntoResponse {
    let found = state
        .pairings
        .read()
        .ok()
        .and_then(|q| q.iter().find(|p| p.id == id).cloned());
    match found {
        Some(p) => (
            StatusCode::OK,
            Json(serde_json::json!({ "status": p.status, "token": p.token })),
        ),
        None => (
            StatusCode::OK,
            Json(serde_json::json!({ "status": "unknown" })),
        ),
    }
}

async fn searches(State(state): State<ServerState>, headers: HeaderMap) -> impl IntoResponse {
    if !auth_ok(&state, &headers) {
        return (StatusCode::UNAUTHORIZED, Json(serde_json::json!([]))).into_response();
    }
    // The frontend owns the DB; expose searches via a Tauri event the frontend
    // answers — but for the extension's use we keep it simpler: the extension
    // already knows which pages it sits on (it's the active LBC tab), so the
    // server just acknowledges. A richer endpoint can come later.
    (StatusCode::OK, Json(serde_json::json!({"hint": "extension reads from active tab"}))).into_response()
}

pub fn build_router(state: ServerState) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);
    Router::new()
        .route("/health", get(health))
        .route("/ingest/listing", post(ingest_listing))
        .route("/notifications/pending", get(notifications_pending))
        .route("/searches/active", get(searches))
        .route("/pair/request", post(pair_request))
        .route("/pair/status/:id", get(pair_status))
        .layer(cors)
        .with_state(state)
}

/// Spawn the server on 127.0.0.1, trying DEFAULT_PORT first then the next few.
/// Returns the actual port bound.
pub async fn spawn(
    app: AppHandle,
    token: Arc<RwLock<Option<String>>>,
    notifications: Arc<RwLock<Vec<ChromeNotif>>>,
    pairings: Arc<RwLock<Vec<PairRequest>>>,
) -> Option<u16> {
    let state = ServerState {
        token,
        app,
        notifications,
        pairings,
    };
    let router = build_router(state);

    for port in [DEFAULT_PORT, 8766, 8767, 8768, 8769] {
        let addr = SocketAddr::from(([127, 0, 0, 1], port));
        match tokio::net::TcpListener::bind(addr).await {
            Ok(listener) => {
                let router_clone = router.clone();
                tokio::spawn(async move {
                    if let Err(e) = axum::serve(listener, router_clone).await {
                        eprintln!("[terouva] local server crashed: {e}");
                    }
                });
                eprintln!("[terouva] local server listening on http://127.0.0.1:{port}");
                return Some(port);
            }
            Err(e) => {
                eprintln!("[terouva] port {port} unavailable: {e}");
            }
        }
    }
    eprintln!("[terouva] could not bind local server on any port");
    None
}

pub fn generate_token() -> String {
    use rand::{distributions::Alphanumeric, Rng};
    rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(40)
        .map(char::from)
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn notif(url: &str, score: i64) -> ChromeNotif {
        ChromeNotif {
            id: url.to_string(),
            title: format!("★ {score}"),
            body: "test".into(),
            url: url.to_string(),
            score,
        }
    }

    #[test]
    fn push_notif_ajoute_un_item() {
        let mut q = Vec::new();
        push_notif(&mut q, notif("https://lbc/1", 90));
        assert_eq!(q.len(), 1);
        assert_eq!(q[0].url, "https://lbc/1");
    }

    #[test]
    fn push_notif_ignore_les_doublons_par_url() {
        let mut q = Vec::new();
        push_notif(&mut q, notif("https://lbc/1", 90));
        push_notif(&mut q, notif("https://lbc/1", 95)); // même URL → ignoré
        assert_eq!(q.len(), 1);
        assert_eq!(q[0].score, 90); // le premier est conservé
    }

    #[test]
    fn push_notif_borne_la_file_et_jette_les_plus_anciennes() {
        let mut q = Vec::new();
        for i in 0..(NOTIF_QUEUE_CAP + 5) {
            push_notif(&mut q, notif(&format!("https://lbc/{i}"), 80));
        }
        assert_eq!(q.len(), NOTIF_QUEUE_CAP);
        // les 5 premières ont été jetées → la plus ancienne restante est l'index 5
        assert_eq!(q[0].url, "https://lbc/5");
    }
}
