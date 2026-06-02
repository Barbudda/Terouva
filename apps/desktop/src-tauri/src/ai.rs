//! Claude API integration for adaptive message generation.
//!
//! The frontend keeps the user-entered API key in the SQLite `app_settings`
//! table and passes it to this command per call — we never persist it on the
//! Rust side. The call hits Anthropic's REST API directly via reqwest (no SDK),
//! using the simple non-streaming Messages endpoint because the output is
//! ~200 words and finishes in ~3 seconds.
//!
//! Defaults to `claude-sonnet-4-6` — best price/quality for this task. Opus is
//! overkill; Haiku misses subtle French phrasing in our tests.

use anyhow::{anyhow, Result};
use serde::{Deserialize, Serialize};
use serde_json::json;

pub const DEFAULT_MODEL: &str = "claude-sonnet-4-6";

#[derive(Debug, Deserialize)]
pub struct AiMessageInput {
    pub api_key: String,
    pub model: Option<String>,
    pub tone: String,
    pub listing: ListingFacts,
    pub profile: ProfileFacts,
}

#[derive(Debug, Deserialize)]
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

#[derive(Debug, Deserialize)]
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
    pub input_tokens: u64,
    pub output_tokens: u64,
}

#[derive(Debug, Deserialize)]
struct AnthropicResponse {
    content: Vec<AnthropicBlock>,
    model: String,
    usage: AnthropicUsage,
}

#[derive(Debug, Deserialize)]
struct AnthropicBlock {
    #[serde(rename = "type")]
    block_type: String,
    text: Option<String>,
}

#[derive(Debug, Deserialize)]
struct AnthropicUsage {
    input_tokens: u64,
    output_tokens: u64,
}

#[derive(Debug, Deserialize)]
struct AnthropicError {
    #[serde(rename = "type")]
    _type: String,
    message: String,
}

#[derive(Debug, Deserialize)]
struct AnthropicErrorResponse {
    error: AnthropicError,
}

#[tauri::command]
pub async fn generate_message_ai(input: AiMessageInput) -> Result<AiMessageOutput, String> {
    generate_internal(input).await.map_err(|e| e.to_string())
}

async fn generate_internal(input: AiMessageInput) -> Result<AiMessageOutput> {
    if input.api_key.trim().is_empty() {
        return Err(anyhow!("API key Claude manquante"));
    }
    let model = input
        .model
        .clone()
        .filter(|s| !s.trim().is_empty())
        .unwrap_or_else(|| DEFAULT_MODEL.to_string());

    let system = system_prompt();
    let user = render_user_prompt(&input);

    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(30))
        .build()?;

    let body = json!({
        "model": model,
        "max_tokens": 1024,
        "system": system,
        "messages": [
            { "role": "user", "content": user }
        ]
    });

    let resp = client
        .post("https://api.anthropic.com/v1/messages")
        .header("x-api-key", &input.api_key)
        .header("anthropic-version", "2023-06-01")
        .header("content-type", "application/json")
        .json(&body)
        .send()
        .await?;

    let status = resp.status();
    if !status.is_success() {
        let body = resp.text().await.unwrap_or_default();
        if let Ok(err) = serde_json::from_str::<AnthropicErrorResponse>(&body) {
            return Err(anyhow!("Claude API ({}) : {}", status, err.error.message));
        }
        return Err(anyhow!("Claude API ({}) : {}", status, body));
    }

    let parsed: AnthropicResponse = resp.json().await?;
    let text = parsed
        .content
        .iter()
        .filter(|b| b.block_type == "text")
        .filter_map(|b| b.text.clone())
        .collect::<Vec<_>>()
        .join("\n")
        .trim()
        .to_string();

    if text.is_empty() {
        return Err(anyhow!(
            "Réponse Claude vide (modèle : {}). Vérifie ta clé et le modèle.",
            parsed.model
        ));
    }

    Ok(AiMessageOutput {
        text,
        model: parsed.model,
        input_tokens: parsed.usage.input_tokens,
        output_tokens: parsed.usage.output_tokens,
    })
}

fn system_prompt() -> &'static str {
    "Tu écris des messages de candidature pour des locations sur Leboncoin, en français, \
     du point de vue du candidat. Tu adaptes chaque message à l'annonce et au profil fournis.\n\
     \n\
     Règles strictes:\n\
     - 6 à 10 lignes maximum. Pas de pavé.\n\
     - Mentionne 1 ou 2 détails concrets de l'annonce (quartier, surface particulière, \
     mention spécifique de la description) pour montrer que tu l'as lue.\n\
     - Cite naturellement les éléments solides du dossier (CDI, revenus, garant), \
     mais sans réciter une fiche. Pas de tableau Excel verbalisé.\n\
     - Termine par un appel à action concret : visite, échange, contact direct.\n\
     - Pas de formules creuses (\"votre annonce a retenu toute mon attention\", \
     \"je me permets de vous adresser ma candidature\"). Naturel.\n\
     - Pas d'émoji, pas d'astérisques markdown, pas de bullet points.\n\
     - Réponse = uniquement le texte du message, prêt à copier-coller. \
     Pas de préambule, pas de balise, pas de commentaire avant ou après."
}

fn render_user_prompt(input: &AiMessageInput) -> String {
    let mut out = String::new();

    let tone_label = match input.tone.as_str() {
        "direct" => "DIRECT (court, factuel, va à l'essentiel)",
        "warm" => "CHALEUREUX (montre de l'enthousiasme sincère et personnel, sans en faire trop)",
        "pro" => "PROFESSIONNEL (formel, structuré, met en avant les garanties du dossier)",
        other => other,
    };
    out.push_str(&format!("Ton demandé: {}\n\n", tone_label));

    out.push_str("== Annonce ==\n");
    push_kv(&mut out, "Titre", input.listing.title.as_deref());
    if let Some(price) = input.listing.price {
        push_kv(&mut out, "Prix", Some(&format!("{}€ / mois", price)));
    }
    if let Some(s) = input.listing.surface {
        push_kv(&mut out, "Surface", Some(&format!("{}m²", s)));
    }
    if let Some(r) = input.listing.rooms {
        push_kv(&mut out, "Pièces", Some(&format!("{}", r)));
    }
    push_kv(&mut out, "Ville", input.listing.city.as_deref());
    push_kv(&mut out, "Code postal", input.listing.postal_code.as_deref());
    if let Some(f) = input.listing.furnished {
        push_kv(&mut out, "Meublé", Some(if f { "oui" } else { "non" }));
    }
    push_kv(&mut out, "Type de bien", input.listing.property_type.as_deref());
    push_kv(&mut out, "Annonceur", input.listing.publisher_type.as_deref());
    if let Some(desc) = input.listing.description.as_deref() {
        let snippet: String = desc.chars().take(800).collect();
        out.push_str(&format!("Description: {}\n", snippet.trim()));
    }

    out.push_str("\n== Profil du candidat ==\n");
    let name = format!(
        "{} {}",
        input.profile.first_name.clone().unwrap_or_default(),
        input.profile.last_name.clone().unwrap_or_default(),
    );
    let name = name.trim();
    if !name.is_empty() {
        push_kv(&mut out, "Nom complet", Some(name));
    }
    push_kv(&mut out, "Situation pro", input.profile.situation.as_deref());
    push_kv(&mut out, "Type de contrat recherché", input.profile.contract_type.as_deref());
    if let Some(rev) = input.profile.income_monthly {
        push_kv(&mut out, "Revenu net mensuel", Some(&format!("{}€", rev)));
    }
    push_kv(&mut out, "Garant", input.profile.guarantors.as_deref());
    push_kv(&mut out, "Téléphone", input.profile.phone.as_deref());
    push_kv(&mut out, "Email", input.profile.email.as_deref());
    push_kv(&mut out, "Mode de contact préféré", input.profile.preferred_contact.as_deref());
    if let Some(intro) = input.profile.intro_message.as_deref() {
        let t = intro.trim();
        if !t.is_empty() {
            out.push_str(&format!(
                "Présentation libre (à exploiter si pertinent, sans la recopier mot pour mot):\n{}\n",
                t
            ));
        }
    }

    out.push_str(
        "\nGénère le message maintenant. Uniquement le texte, prêt à coller dans Leboncoin.",
    );
    out
}

fn push_kv(out: &mut String, key: &str, value: Option<&str>) {
    if let Some(v) = value {
        let v = v.trim();
        if !v.is_empty() {
            out.push_str(&format!("{}: {}\n", key, v));
        }
    }
}
