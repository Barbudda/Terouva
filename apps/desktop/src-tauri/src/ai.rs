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

#[cfg(test)]
mod tests {
    use super::*;

    fn make_listing(overrides: impl FnOnce(&mut ListingFacts)) -> ListingFacts {
        let mut l = ListingFacts {
            title: None,
            price: None,
            surface: None,
            rooms: None,
            city: None,
            postal_code: None,
            furnished: None,
            property_type: None,
            description: None,
            publisher_type: None,
        };
        overrides(&mut l);
        l
    }

    fn make_profile(overrides: impl FnOnce(&mut ProfileFacts)) -> ProfileFacts {
        let mut p = ProfileFacts {
            first_name: None,
            last_name: None,
            email: None,
            phone: None,
            situation: None,
            income_monthly: None,
            guarantors: None,
            contract_type: None,
            intro_message: None,
            preferred_contact: None,
        };
        overrides(&mut p);
        p
    }

    fn make_input(
        tone: &str,
        listing: ListingFacts,
        profile: ProfileFacts,
    ) -> AiMessageInput {
        AiMessageInput {
            api_key: "sk-test".to_string(),
            model: None,
            tone: tone.to_string(),
            listing,
            profile,
        }
    }

    // ── system_prompt ──

    #[test]
    fn system_prompt_not_empty() {
        let sp = system_prompt();
        assert!(!sp.is_empty());
    }

    #[test]
    fn system_prompt_contains_key_rules() {
        let sp = system_prompt();
        assert!(sp.contains("Leboncoin"));
        assert!(sp.contains("français"));
        assert!(sp.contains("6 à 10 lignes"));
        assert!(sp.contains("Pas d'émoji"));
        assert!(sp.contains("copier-coller"));
    }

    // ── push_kv ──

    #[test]
    fn push_kv_basic() {
        let mut buf = String::new();
        push_kv(&mut buf, "Prix", Some("850€"));
        assert_eq!(buf, "Prix: 850€\n");
    }

    #[test]
    fn push_kv_trims_value() {
        let mut buf = String::new();
        push_kv(&mut buf, "Ville", Some("  Paris  "));
        assert_eq!(buf, "Ville: Paris\n");
    }

    #[test]
    fn push_kv_none_skipped() {
        let mut buf = String::new();
        push_kv(&mut buf, "Ville", None);
        assert!(buf.is_empty());
    }

    #[test]
    fn push_kv_empty_skipped() {
        let mut buf = String::new();
        push_kv(&mut buf, "Ville", Some(""));
        assert!(buf.is_empty());
    }

    #[test]
    fn push_kv_whitespace_only_skipped() {
        let mut buf = String::new();
        push_kv(&mut buf, "Ville", Some("   "));
        assert!(buf.is_empty());
    }

    // ── tone mapping ──

    #[test]
    fn tone_direct() {
        let input = make_input("direct", make_listing(|_| {}), make_profile(|_| {}));
        let out = render_user_prompt(&input);
        assert!(out.contains("DIRECT (court, factuel"));
    }

    #[test]
    fn tone_warm() {
        let input = make_input("warm", make_listing(|_| {}), make_profile(|_| {}));
        let out = render_user_prompt(&input);
        assert!(out.contains("CHALEUREUX"));
    }

    #[test]
    fn tone_pro() {
        let input = make_input("pro", make_listing(|_| {}), make_profile(|_| {}));
        let out = render_user_prompt(&input);
        assert!(out.contains("PROFESSIONNEL"));
    }

    #[test]
    fn tone_custom_passthrough() {
        let input = make_input("décontracté", make_listing(|_| {}), make_profile(|_| {}));
        let out = render_user_prompt(&input);
        assert!(out.contains("Ton demandé: décontracté"));
    }

    // ── render_user_prompt: listing fields ──

    #[test]
    fn render_full_listing() {
        let input = make_input(
            "direct",
            make_listing(|l| {
                l.title = Some("T3 lumineux centre".into());
                l.price = Some(950);
                l.surface = Some(65);
                l.rooms = Some(3);
                l.city = Some("Lyon".into());
                l.postal_code = Some("69003".into());
                l.furnished = Some(true);
                l.property_type = Some("appartement".into());
                l.publisher_type = Some("pro".into());
                l.description = Some("Bel appartement rénové".into());
            }),
            make_profile(|_| {}),
        );
        let out = render_user_prompt(&input);
        assert!(out.contains("== Annonce =="));
        assert!(out.contains("Titre: T3 lumineux centre"));
        assert!(out.contains("Prix: 950€ / mois"));
        assert!(out.contains("Surface: 65m²"));
        assert!(out.contains("Pièces: 3"));
        assert!(out.contains("Ville: Lyon"));
        assert!(out.contains("Code postal: 69003"));
        assert!(out.contains("Meublé: oui"));
        assert!(out.contains("Type de bien: appartement"));
        assert!(out.contains("Annonceur: pro"));
        assert!(out.contains("Description: Bel appartement rénové"));
    }

    #[test]
    fn render_furnished_false() {
        let input = make_input(
            "direct",
            make_listing(|l| { l.furnished = Some(false); }),
            make_profile(|_| {}),
        );
        let out = render_user_prompt(&input);
        assert!(out.contains("Meublé: non"));
    }

    #[test]
    fn render_none_fields_omitted() {
        let input = make_input("direct", make_listing(|_| {}), make_profile(|_| {}));
        let out = render_user_prompt(&input);
        assert!(!out.contains("Titre:"));
        assert!(!out.contains("Prix:"));
        assert!(!out.contains("Surface:"));
        assert!(!out.contains("Meublé:"));
        assert!(!out.contains("Nom complet:"));
    }

    #[test]
    fn render_description_truncated_at_800_chars() {
        let long_desc: String = "A".repeat(1200);
        let input = make_input(
            "direct",
            make_listing(|l| { l.description = Some(long_desc); }),
            make_profile(|_| {}),
        );
        let out = render_user_prompt(&input);
        let desc_start = out.find("Description: ").unwrap();
        let desc_line = out[desc_start..].lines().next().unwrap();
        let value = desc_line.strip_prefix("Description: ").unwrap();
        assert_eq!(value.len(), 800);
    }

    // ── render_user_prompt: profile fields ──

    #[test]
    fn render_full_profile() {
        let input = make_input(
            "warm",
            make_listing(|_| {}),
            make_profile(|p| {
                p.first_name = Some("Hugo".into());
                p.last_name = Some("Dupont".into());
                p.situation = Some("CDI".into());
                p.contract_type = Some("CDI temps plein".into());
                p.income_monthly = Some(2800);
                p.guarantors = Some("Parents".into());
                p.phone = Some("06 12 34 56 78".into());
                p.email = Some("hugo@test.fr".into());
                p.preferred_contact = Some("email".into());
            }),
        );
        let out = render_user_prompt(&input);
        assert!(out.contains("== Profil du candidat =="));
        assert!(out.contains("Nom complet: Hugo Dupont"));
        assert!(out.contains("Situation pro: CDI"));
        assert!(out.contains("Type de contrat recherché: CDI temps plein"));
        assert!(out.contains("Revenu net mensuel: 2800€"));
        assert!(out.contains("Garant: Parents"));
        assert!(out.contains("Téléphone: 06 12 34 56 78"));
        assert!(out.contains("Email: hugo@test.fr"));
        assert!(out.contains("Mode de contact préféré: email"));
    }

    #[test]
    fn render_name_first_only() {
        let input = make_input(
            "direct",
            make_listing(|_| {}),
            make_profile(|p| { p.first_name = Some("Hugo".into()); }),
        );
        let out = render_user_prompt(&input);
        assert!(out.contains("Nom complet: Hugo"));
    }

    #[test]
    fn render_intro_message_present() {
        let input = make_input(
            "direct",
            make_listing(|_| {}),
            make_profile(|p| {
                p.intro_message = Some("Je suis passionné par l'architecture.".into());
            }),
        );
        let out = render_user_prompt(&input);
        assert!(out.contains("Présentation libre"));
        assert!(out.contains("passionné par l'architecture"));
    }

    #[test]
    fn render_intro_message_empty_skipped() {
        let input = make_input(
            "direct",
            make_listing(|_| {}),
            make_profile(|p| { p.intro_message = Some("   ".into()); }),
        );
        let out = render_user_prompt(&input);
        assert!(!out.contains("Présentation libre"));
    }

    // ── structural checks ──

    #[test]
    fn render_ends_with_generation_instruction() {
        let input = make_input("direct", make_listing(|_| {}), make_profile(|_| {}));
        let out = render_user_prompt(&input);
        assert!(out.ends_with("Génère le message maintenant. Uniquement le texte, prêt à coller dans Leboncoin."));
    }

    #[test]
    fn render_sections_order() {
        let input = make_input(
            "direct",
            make_listing(|l| { l.title = Some("T2".into()); }),
            make_profile(|p| { p.first_name = Some("A".into()); }),
        );
        let out = render_user_prompt(&input);
        let tone_pos = out.find("Ton demandé").unwrap();
        let annonce_pos = out.find("== Annonce ==").unwrap();
        let profil_pos = out.find("== Profil du candidat ==").unwrap();
        let gen_pos = out.find("Génère le message").unwrap();
        assert!(tone_pos < annonce_pos);
        assert!(annonce_pos < profil_pos);
        assert!(profil_pos < gen_pos);
    }
}
