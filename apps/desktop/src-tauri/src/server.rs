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
    extract::State,
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
        .route("/searches/active", get(searches))
        .layer(cors)
        .with_state(state)
}

/// Spawn the server on 127.0.0.1, trying DEFAULT_PORT first then the next few.
/// Returns the actual port bound.
pub async fn spawn(app: AppHandle, token: Arc<RwLock<Option<String>>>) -> Option<u16> {
    let state = ServerState { token, app };
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
