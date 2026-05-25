use anyhow::{anyhow, Result};
use scraper::{Html, Selector};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct ParsedListing {
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
    pub images: Vec<String>,
    pub publisher_name: Option<String>,
    pub publisher_type: Option<String>,
    pub published_at: Option<String>,
    pub raw_html_size: usize,
}

const UA: &str =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) \
     Chrome/130.0.0.0 Safari/537.36";

#[tauri::command]
pub async fn parse_listing_url(url: String) -> Result<ParsedListing, String> {
    parse_listing_internal(&url)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn parse_search_url(url: String) -> Result<Vec<ParsedListing>, String> {
    parse_search_internal(&url)
        .await
        .map_err(|e| e.to_string())
}

pub async fn parse_search_internal(url: &str) -> Result<Vec<ParsedListing>> {
    let parsed = url::Url::parse(url).map_err(|e| anyhow!("URL invalide: {e}"))?;
    if !matches!(parsed.scheme(), "http" | "https") {
        return Err(anyhow!("URL doit être http(s)"));
    }
    let host = parsed.host_str().unwrap_or("");
    if !is_allowed_host(host) {
        return Err(anyhow!(
            "Host non autorisé pour le polling: '{host}'."
        ));
    }
    let client = reqwest::Client::builder()
        .user_agent(UA)
        .gzip(true)
        .timeout(std::time::Duration::from_secs(20))
        .build()?;
    let resp = client.get(url).send().await?;
    let status = resp.status();
    if !status.is_success() {
        return Err(anyhow!("HTTP {} sur la page de recherche", status));
    }
    let html = resp.text().await?;
    Ok(parse_search_html(&html))
}

fn parse_search_html(html: &str) -> Vec<ParsedListing> {
    let doc = Html::parse_document(html);
    let mut out: Vec<ParsedListing> = Vec::new();
    let mut seen = std::collections::HashSet::<String>::new();

    // Strategy A: __NEXT_DATA__ may carry the ad list at one of several known
    // paths depending on the LBC route. We probe a few likely ones.
    if let Some(json) = extract_next_data(&doc) {
        for ad in extract_ads_from_search_json(&json) {
            if !seen.contains(&ad.url) {
                seen.insert(ad.url.clone());
                out.push(ad);
            }
        }
    }

    // Strategy B: fallback to DOM scraping. Even if __NEXT_DATA__ shape
    // changed, every ad card still ends up as an <a href="/ad/...">.
    if let Ok(sel) = Selector::parse("a[href^='/ad/'], a[href*='/itemId-']") {
        for el in doc.select(&sel) {
            let Some(href) = el.value().attr("href") else { continue };
            let abs = match url::Url::parse("https://www.leboncoin.fr/")
                .and_then(|base| base.join(href))
            {
                Ok(u) => u.to_string(),
                Err(_) => continue,
            };
            if seen.contains(&abs) {
                continue;
            }
            seen.insert(abs.clone());

            let text: String = el.text().collect::<String>();
            let price = extract_price(&text);
            let surface = extract_surface(&text);
            let rooms = extract_rooms(&text);
            let title = el
                .select(&Selector::parse("p[role='heading']").unwrap())
                .next()
                .map(|n| n.text().collect::<String>())
                .or_else(|| {
                    el.select(&Selector::parse("[data-test-id='adcard-title']").unwrap())
                        .next()
                        .map(|n| n.text().collect::<String>())
                })
                .unwrap_or_else(|| text.chars().take(120).collect());
            let title = title.trim().to_string();
            let image = el
                .select(&Selector::parse("img").unwrap())
                .next()
                .and_then(|n| {
                    n.value()
                        .attr("src")
                        .or_else(|| n.value().attr("data-src"))
                        .map(String::from)
                });

            out.push(ParsedListing {
                url: abs,
                external_id: extract_external_id(href),
                title: if title.is_empty() { None } else { Some(title) },
                price,
                city: None,
                postal_code: None,
                surface,
                rooms,
                furnished: None,
                property_type: None,
                description: None,
                images: image.into_iter().collect(),
                publisher_name: None,
                publisher_type: None,
                published_at: None,
                raw_html_size: 0,
            });
        }
    }

    out
}

fn extract_ads_from_search_json(root: &serde_json::Value) -> Vec<ParsedListing> {
    let mut out: Vec<ParsedListing> = Vec::new();
    // Probe likely paths.
    let candidates = [
        "/props/pageProps/searchData/ads",
        "/props/pageProps/ads",
        "/props/pageProps/initialProps/searchData/ads",
        "/props/pageProps/data/ads",
    ];
    for path in candidates {
        if let Some(arr) = root.pointer(path).and_then(|v| v.as_array()) {
            for ad in arr {
                if let Some(parsed) = ad_object_to_parsed(ad) {
                    out.push(parsed);
                }
            }
            if !out.is_empty() {
                break;
            }
        }
    }
    out
}

fn ad_object_to_parsed(ad: &serde_json::Value) -> Option<ParsedListing> {
    let url = ad
        .get("url")
        .and_then(|v| v.as_str())
        .map(String::from)
        .or_else(|| {
            ad.get("list_id")
                .and_then(|v| v.as_i64())
                .map(|id| format!("https://www.leboncoin.fr/ad/{id}"))
        })?;

    let external_id = ad
        .get("list_id")
        .and_then(|v| v.as_i64())
        .map(|v| v.to_string())
        .or_else(|| ad.get("id").and_then(|v| v.as_str()).map(String::from));

    let title = ad.get("subject").and_then(|v| v.as_str()).map(String::from);
    let description = ad.get("body").and_then(|v| v.as_str()).map(String::from);
    let published_at = ad
        .get("first_publication_date")
        .or_else(|| ad.get("index_date"))
        .and_then(|v| v.as_str())
        .map(String::from);

    let price = if let Some(arr) = ad.get("price").and_then(|v| v.as_array()) {
        arr.first().and_then(|v| v.as_i64())
    } else {
        ad.get("price").and_then(|v| v.as_i64())
    };

    let (city, postal_code) = if let Some(loc) = ad.get("location") {
        (
            loc.get("city").and_then(|v| v.as_str()).map(String::from),
            loc.get("zipcode").and_then(|v| v.as_str()).map(String::from),
        )
    } else {
        (None, None)
    };

    let (publisher_name, publisher_type) = if let Some(owner) = ad.get("owner") {
        (
            owner
                .get("name")
                .or_else(|| owner.get("user_id"))
                .and_then(|v| v.as_str())
                .map(String::from),
            owner.get("type").and_then(|v| v.as_str()).map(String::from),
        )
    } else {
        (None, None)
    };

    let mut surface: Option<i64> = None;
    let mut rooms: Option<i64> = None;
    let mut furnished: Option<bool> = None;
    let mut property_type: Option<String> = None;
    if let Some(attrs) = ad.get("attributes").and_then(|v| v.as_array()) {
        for attr in attrs {
            let key = attr.get("key").and_then(|v| v.as_str()).unwrap_or("");
            let value = attr
                .get("value")
                .and_then(|v| v.as_str())
                .or_else(|| attr.get("value_label").and_then(|v| v.as_str()))
                .unwrap_or("");
            match key {
                "square" => surface = value.parse().ok(),
                "rooms" => rooms = value.parse().ok(),
                "real_estate_type" => property_type = Some(value.into()),
                "furnished" => furnished = Some(value == "1" || value.eq_ignore_ascii_case("meublé")),
                _ => {}
            }
        }
    }

    let mut images: Vec<String> = Vec::new();
    if let Some(imgs) = ad.get("images") {
        if let Some(urls) = imgs.get("urls").and_then(|v| v.as_array()) {
            for u in urls.iter().take(8) {
                if let Some(s) = u.as_str() {
                    images.push(s.to_string());
                }
            }
        }
    }

    Some(ParsedListing {
        url,
        external_id,
        title,
        price,
        city,
        postal_code,
        surface,
        rooms,
        furnished,
        property_type,
        description,
        images,
        publisher_name,
        publisher_type,
        published_at,
        raw_html_size: 0,
    })
}

fn extract_external_id(href: &str) -> Option<String> {
    // /ad/locations/foo/2812345678
    if let Some(rest) = href.strip_prefix("/ad/") {
        let last = rest.rsplit('/').next().unwrap_or("");
        if last.chars().all(|c| c.is_ascii_digit()) && !last.is_empty() {
            return Some(last.to_string());
        }
    }
    // /itemId-2812345678
    if let Some(idx) = href.find("itemId-") {
        let tail = &href[idx + "itemId-".len()..];
        let id: String = tail.chars().take_while(|c| c.is_ascii_digit()).collect();
        if !id.is_empty() {
            return Some(id);
        }
    }
    None
}

fn extract_price(s: &str) -> Option<i64> {
    let re = regex_like(s, "€");
    re.and_then(|t| t.replace(' ', "").parse().ok())
}

fn extract_surface(s: &str) -> Option<i64> {
    let lower = s.replace('²', "2");
    let mut chars = lower.chars().peekable();
    let mut buf = String::new();
    while let Some(c) = chars.next() {
        if c.is_ascii_digit() {
            let mut num = String::from(c);
            while let Some(&n) = chars.peek() {
                if n.is_ascii_digit() {
                    num.push(n);
                    chars.next();
                } else {
                    break;
                }
            }
            // peek ahead for "m2"
            let rest: String = chars.clone().take(4).collect();
            if rest.starts_with(['m', 'M']) && rest.contains('2') {
                return num.parse().ok();
            }
            buf.push_str(&num);
        }
    }
    None
}

fn extract_rooms(s: &str) -> Option<i64> {
    // e.g. "2 pièces" or "3 pces" or "1 piece"
    let lower = s.to_lowercase();
    for (i, _) in lower.match_indices("pièce").chain(lower.match_indices("piece")) {
        // Walk back to find the digits.
        let preceding = &lower[..i];
        let num: String = preceding
            .chars()
            .rev()
            .skip_while(|c| c.is_whitespace())
            .take_while(|c| c.is_ascii_digit())
            .collect::<String>()
            .chars()
            .rev()
            .collect();
        if let Ok(n) = num.parse::<i64>() {
            return Some(n);
        }
    }
    None
}

/// Tiny helper: returns the number that precedes the given suffix string.
fn regex_like(s: &str, suffix: &str) -> Option<String> {
    let idx = s.find(suffix)?;
    let preceding = &s[..idx];
    let mut num: Vec<char> = Vec::new();
    for c in preceding.chars().rev() {
        if c.is_ascii_digit() {
            num.push(c);
        } else if c.is_whitespace() && !num.is_empty() {
            // tolerate "1 240" style
            continue;
        } else if !num.is_empty() {
            break;
        }
    }
    if num.is_empty() {
        return None;
    }
    Some(num.into_iter().rev().collect())
}

/// Hosts the parser will fetch. Limits accidental misuse (typos, wrong URLs pasted in).
/// Keep this tight — it's a UX guardrail, not a security feature.
const ALLOWED_HOST_SUFFIXES: &[&str] = &["leboncoin.fr"];

fn is_allowed_host(host: &str) -> bool {
    let host = host.trim_start_matches("www.").to_ascii_lowercase();
    ALLOWED_HOST_SUFFIXES
        .iter()
        .any(|suffix| host == *suffix || host.ends_with(&format!(".{suffix}")))
}

async fn parse_listing_internal(url: &str) -> Result<ParsedListing> {
    let parsed = url::Url::parse(url).map_err(|e| anyhow!("URL invalide: {e}"))?;
    if !matches!(parsed.scheme(), "http" | "https") {
        return Err(anyhow!("URL doit être http(s)"));
    }
    let host = parsed.host_str().unwrap_or("");
    if !is_allowed_host(host) {
        return Err(anyhow!(
            "Host non autorisé: '{host}'. Le parser n'accepte que des URLs leboncoin.fr."
        ));
    }

    let client = reqwest::Client::builder()
        .user_agent(UA)
        .gzip(true)
        .timeout(std::time::Duration::from_secs(20))
        .build()?;
    let resp = client.get(url).send().await?;
    let status = resp.status();
    if !status.is_success() {
        return Err(anyhow!("HTTP {}", status));
    }
    let html = resp.text().await?;
    let size = html.len();
    let mut out = parse_html(&html);
    out.url = url.to_string();
    out.raw_html_size = size;
    Ok(out)
}

fn parse_html(html: &str) -> ParsedListing {
    let doc = Html::parse_document(html);
    let mut out = ParsedListing::default();

    if let Some(json) = extract_next_data(&doc) {
        apply_next_data(&mut out, &json);
    }
    apply_og_meta(&mut out, &doc);
    out
}

fn extract_next_data(doc: &Html) -> Option<serde_json::Value> {
    let sel = Selector::parse("script#__NEXT_DATA__").ok()?;
    let el = doc.select(&sel).next()?;
    let txt = el.text().collect::<String>();
    serde_json::from_str(&txt).ok()
}

fn apply_next_data(out: &mut ParsedListing, root: &serde_json::Value) {
    let ad = root
        .pointer("/props/pageProps/ad")
        .or_else(|| root.pointer("/props/pageProps/data"));
    let Some(ad) = ad else { return };

    if let Some(v) = ad.get("list_id").and_then(|v| v.as_i64()) {
        out.external_id = Some(v.to_string());
    } else if let Some(v) = ad.get("id").and_then(|v| v.as_str()) {
        out.external_id = Some(v.to_string());
    }

    out.title = ad
        .get("subject")
        .and_then(|v| v.as_str())
        .map(String::from);
    out.description = ad.get("body").and_then(|v| v.as_str()).map(String::from);
    out.published_at = ad
        .get("first_publication_date")
        .or_else(|| ad.get("index_date"))
        .and_then(|v| v.as_str())
        .map(String::from);

    if let Some(price_arr) = ad.get("price").and_then(|v| v.as_array()) {
        if let Some(p) = price_arr.first().and_then(|v| v.as_i64()) {
            out.price = Some(p);
        }
    } else if let Some(p) = ad.get("price").and_then(|v| v.as_i64()) {
        out.price = Some(p);
    }

    if let Some(loc) = ad.get("location") {
        out.city = loc.get("city").and_then(|v| v.as_str()).map(String::from);
        out.postal_code = loc
            .get("zipcode")
            .and_then(|v| v.as_str())
            .map(String::from);
    }

    if let Some(owner) = ad.get("owner") {
        out.publisher_name = owner
            .get("name")
            .or_else(|| owner.get("user_id"))
            .and_then(|v| v.as_str())
            .map(String::from);
        out.publisher_type = owner.get("type").and_then(|v| v.as_str()).map(String::from);
    }

    if let Some(attrs) = ad.get("attributes").and_then(|v| v.as_array()) {
        for attr in attrs {
            let key = attr.get("key").and_then(|v| v.as_str()).unwrap_or("");
            let value = attr
                .get("value")
                .and_then(|v| v.as_str())
                .or_else(|| attr.get("value_label").and_then(|v| v.as_str()))
                .unwrap_or("");
            match key {
                "square" => out.surface = value.parse::<i64>().ok(),
                "rooms" => out.rooms = value.parse::<i64>().ok(),
                "real_estate_type" => out.property_type = Some(value.to_string()),
                "furnished" => {
                    out.furnished = Some(value == "1" || value.eq_ignore_ascii_case("meublé"))
                }
                _ => {}
            }
        }
    }

    if let Some(imgs) = ad.get("images") {
        if let Some(urls) = imgs.get("urls").and_then(|v| v.as_array()) {
            for u in urls {
                if let Some(s) = u.as_str() {
                    out.images.push(s.to_string());
                }
            }
        }
    }
}

fn apply_og_meta(out: &mut ParsedListing, doc: &Html) {
    let Ok(sel) = Selector::parse("meta") else {
        return;
    };
    for el in doc.select(&sel) {
        let prop = el
            .value()
            .attr("property")
            .or_else(|| el.value().attr("name"));
        let content = el.value().attr("content").unwrap_or("");
        match prop {
            Some("og:title") => {
                if out.title.is_none() {
                    out.title = Some(content.to_string());
                }
            }
            Some("og:description") => {
                if out.description.is_none() {
                    out.description = Some(content.to_string());
                }
            }
            Some("og:image") => {
                if !out.images.iter().any(|i| i == content) {
                    out.images.push(content.to_string());
                }
            }
            _ => {}
        }
    }
}
