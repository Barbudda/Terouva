//! Géocodage de ville → point (lat/lon/cp) via la Base Adresse Nationale
//! (api-adresse.data.gouv.fr) : API publique de l'État, gratuite, sans clé.
//!
//! Sert à construire le token de localisation des URLs de recherche Leboncoin
//! (qui attend lat/lon/rayon, pas un simple nom de ville). Fait en Rust pour
//! ne pas élargir le CSP de la webview et rester cohérent avec les autres
//! appels réseau (parser).

use anyhow::{anyhow, Result};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
pub struct GeoPoint {
    pub label: String,
    pub postcode: String,
    pub lat: f64,
    pub lon: f64,
}

#[derive(Debug, Deserialize)]
struct BanResponse {
    features: Vec<BanFeature>,
}

#[derive(Debug, Deserialize)]
struct BanFeature {
    geometry: BanGeometry,
    properties: BanProps,
}

#[derive(Debug, Deserialize)]
struct BanGeometry {
    /// [lon, lat]
    coordinates: [f64; 2],
}

#[derive(Debug, Deserialize)]
struct BanProps {
    #[serde(default)]
    city: Option<String>,
    #[serde(default)]
    name: Option<String>,
    #[serde(default)]
    postcode: Option<String>,
}

#[tauri::command]
pub async fn geocode_city(city: String) -> Result<Option<GeoPoint>, String> {
    geocode_internal(&city).await.map_err(|e| e.to_string())
}

async fn geocode_internal(city: &str) -> Result<Option<GeoPoint>> {
    let q = city.trim();
    if q.is_empty() {
        return Ok(None);
    }
    let url = format!(
        "https://api-adresse.data.gouv.fr/search/?q={}&type=municipality&limit=1",
        urlencoding(q)
    );
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(12))
        .build()?;
    let resp = client.get(&url).send().await?;
    if !resp.status().is_success() {
        return Err(anyhow!("BAN HTTP {}", resp.status()));
    }
    let parsed: BanResponse = resp.json().await?;
    let Some(f) = parsed.features.into_iter().next() else {
        return Ok(None);
    };
    let [lon, lat] = f.geometry.coordinates;
    Ok(Some(GeoPoint {
        label: f.properties.city.or(f.properties.name).unwrap_or_else(|| q.to_string()),
        postcode: f.properties.postcode.unwrap_or_default(),
        lat,
        lon,
    }))
}

/// Encodage minimal pour un paramètre de query (espaces + caractères réservés).
fn urlencoding(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    for b in s.bytes() {
        match b {
            b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'_' | b'.' | b'~' => {
                out.push(b as char)
            }
            b' ' => out.push_str("%20"),
            _ => out.push_str(&format!("%{:02X}", b)),
        }
    }
    out
}
