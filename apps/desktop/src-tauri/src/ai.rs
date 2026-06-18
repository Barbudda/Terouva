//! Génération du message de candidature via le **bot interne Terouva**.
//!
//! L'app n'appelle plus l'API Anthropic directement : elle POST le contexte
//! (annonce + profil + ton) au backend Terouva (`/api/message` sur Vercel), qui
//! détient le crédit IA (AI Gateway). L'utilisateur final n'a **aucune clé** à
//! gérer. Override de l'URL via `TEROUVA_API_BASE` (utile en dev).

use anyhow::{anyhow, Result};
use serde::{Deserialize, Serialize};
use serde_json::json;

const DEFAULT_API_BASE: &str = "https://terouva.vercel.app";

#[derive(Debug, Deserialize)]
pub struct AiMessageInput {
    pub tone: String,
    pub listing: ListingFacts,
    pub profile: ProfileFacts,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ListingFacts {
    pub title: Option<String>,
    pub price: Option<i64>,
    pub surface: Option<i64>,
    pub rooms: Option<i64>,
    pub city: Option<String>,
    pub postal_code: Option<String>,
    pub furnished: Option<bool>,
    pub property_type: Option<String>,
    pub description: Option<String>,
    pub publisher_type: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ProfileFacts {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub situation: Option<String>,
    pub income_monthly: Option<i64>,
    pub guarantors: Option<String>,
    pub contract_type: Option<String>,
    pub intro_message: Option<String>,
    pub preferred_contact: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AiMessageOutput {
    pub text: String,
    pub model: String,
}

#[derive(Debug, Deserialize)]
struct BackendOk {
    text: String,
    model: String,
}

#[derive(Debug, Deserialize)]
struct BackendErr {
    error: String,
}

#[tauri::command]
pub async fn generate_message_ai(input: AiMessageInput) -> Result<AiMessageOutput, String> {
    generate_internal(input).await.map_err(|e| e.to_string())
}

async fn generate_internal(input: AiMessageInput) -> Result<AiMessageOutput> {
    let base = std::env::var("TEROUVA_API_BASE").unwrap_or_else(|_| DEFAULT_API_BASE.to_string());
    let url = format!("{}/api/message", base.trim_end_matches('/'));

    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(30))
        .build()?;

    let body = json!({
        "tone": input.tone,
        "listing": input.listing,
        "profile": input.profile,
    });

    let resp = client
        .post(&url)
        .header("content-type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| anyhow!("Terouva injoignable ({e}). Réessaie dans un instant."))?;

    let status = resp.status();
    if !status.is_success() {
        let raw = resp.text().await.unwrap_or_default();
        if let Ok(err) = serde_json::from_str::<BackendErr>(&raw) {
            return Err(anyhow!("Génération indisponible : {}", err.error));
        }
        return Err(anyhow!("Génération indisponible (HTTP {})", status));
    }

    let ok: BackendOk = resp.json().await?;
    if ok.text.trim().is_empty() {
        return Err(anyhow!("Message vide — réessaie."));
    }
    Ok(AiMessageOutput {
        text: ok.text,
        model: ok.model,
    })
}
