//! Background polling job — fires when LBC isn't open in the user's browser.
//!
//! Watches each active `search_profile.lbc_search_url` at the cadence the user
//! configured (`check_frequency_minutes`), with jitter ±30 % and a max of one
//! concurrent fetch (sequential round-robin). Behaviour stays squarely under
//! "human refreshing their saved search": same UA, same residential IP, no
//! evasion. Newly detected listings are forwarded as `watch:listing` events,
//! exactly the same path the Chrome extension uses, so the frontend pipeline
//! (dedupe + scoring + notification) is shared.
//!
//! The job is paused 23h-7h local time so we don't ping LBC overnight.

use std::{
    collections::{HashMap, HashSet},
    sync::Arc,
    time::Duration,
};

use chrono::{Local, Timelike};
use rand::Rng;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter};
use tokio::sync::RwLock;

use crate::parser::{parse_search_internal, ParsedListing};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PollingTarget {
    pub id: i64,
    pub name: String,
    pub url: String,
    /// Minutes between checks. We add ±30 % jitter on top.
    pub frequency_minutes: u32,
}

#[derive(Clone, Debug, Default, Serialize)]
pub struct PollingStats {
    pub enabled: bool,
    pub target_count: usize,
    pub total_fetches: u64,
    pub last_error: Option<String>,
    pub last_target_id: Option<i64>,
    pub last_target_at: Option<String>, // ISO timestamp
    /// Per-target last-check ISO timestamps, keyed by target id.
    pub per_target_last_check: HashMap<String, String>,
}

#[derive(Default)]
pub struct PollingInner {
    pub targets: Vec<PollingTarget>,
    pub enabled: bool,
    pub last_check_at: HashMap<i64, chrono::DateTime<Local>>,
    pub seen_urls: HashSet<String>,
    pub stats: PollingStats,
}

pub type PollingState = Arc<RwLock<PollingInner>>;

pub fn new_state() -> PollingState {
    Arc::new(RwLock::new(PollingInner::default()))
}

pub fn spawn_loop(state: PollingState, app: AppHandle) {
    // Use Tauri's managed async runtime rather than `tokio::spawn`. `.setup()`
    // runs on the main thread *outside* any Tokio runtime context, so a bare
    // `tokio::spawn` panics with "there is no reactor running". Tauri's runtime
    // is Tokio under the hood and is always available here.
    tauri::async_runtime::spawn(async move {
        // Tick every 30 s. Cheap — most ticks find nothing due.
        let mut interval = tokio::time::interval(Duration::from_secs(30));
        interval.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Skip);
        loop {
            interval.tick().await;
            let _ = tick_once(state.clone(), app.clone()).await;
        }
    });
}

async fn tick_once(state: PollingState, app: AppHandle) -> Result<(), String> {
    // Snapshot the targets we should consider this tick.
    let (enabled, due_targets) = {
        let s = state.read().await;
        if !s.enabled || s.targets.is_empty() {
            (s.enabled, Vec::<PollingTarget>::new())
        } else if !is_active_hour() {
            (s.enabled, Vec::new())
        } else {
            let now = Local::now();
            let due: Vec<PollingTarget> = s
                .targets
                .iter()
                .filter(|t| {
                    let last = s.last_check_at.get(&t.id);
                    match last {
                        None => true,
                        Some(at) => {
                            let elapsed = now.signed_duration_since(*at);
                            elapsed
                                .num_seconds()
                                .saturating_sub(jitter_seconds(t.frequency_minutes))
                                >= (t.frequency_minutes as i64) * 60
                        }
                    }
                })
                .cloned()
                .collect();
            (s.enabled, due)
        }
    };
    if !enabled {
        return Ok(());
    }

    for t in due_targets {
        // Mark immediately to avoid double-fetch if the tick races.
        {
            let mut s = state.write().await;
            s.last_check_at.insert(t.id, Local::now());
        }
        match parse_search_internal(&t.url).await {
            Ok(listings) => {
                let new_count = forward_new_listings(&state, &app, &t, listings).await;
                let mut s = state.write().await;
                s.stats.total_fetches += 1;
                s.stats.last_target_id = Some(t.id);
                s.stats.last_target_at = Some(Local::now().to_rfc3339());
                s.stats
                    .per_target_last_check
                    .insert(t.id.to_string(), Local::now().to_rfc3339());
                s.stats.target_count = s.targets.len();
                s.stats.enabled = true;
                let _ = new_count;
            }
            Err(e) => {
                let mut s = state.write().await;
                s.stats.last_error = Some(format!("recherche {} : {e}", t.name));
            }
        }
    }
    Ok(())
}

async fn forward_new_listings(
    state: &PollingState,
    app: &AppHandle,
    target: &PollingTarget,
    listings: Vec<ParsedListing>,
) -> usize {
    let mut forwarded = 0;
    for listing in listings {
        if listing.url.is_empty() {
            continue;
        }
        let already = {
            let mut s = state.write().await;
            !s.seen_urls.insert(listing.url.clone())
        };
        if already {
            continue;
        }
        let payload = serde_json::json!({
            "app": "terouva",
            "type": "listing-watch",
            "version": 1,
            "captured_at": Local::now().to_rfc3339(),
            "data": {
                "url": listing.url,
                "external_id": listing.external_id,
                "title": listing.title,
                "price": listing.price,
                "city": listing.city,
                "postal_code": listing.postal_code,
                "surface": listing.surface,
                "rooms": listing.rooms,
                "furnished": listing.furnished,
                "property_type": listing.property_type,
                "description": listing.description,
                "images": listing.images,
                "publisher_name": listing.publisher_name,
                "publisher_type": listing.publisher_type,
                "published_at": listing.published_at,
            },
            "source": {
                "kind": "poll",
                "target_id": target.id,
                "target_name": target.name,
            }
        });
        if app.emit("watch:listing", payload).is_ok() {
            forwarded += 1;
        }
    }
    forwarded
}

fn jitter_seconds(frequency_minutes: u32) -> i64 {
    let max = ((frequency_minutes as i64) * 60) * 30 / 100;
    if max == 0 {
        0
    } else {
        rand::thread_rng().gen_range(-(max)..=max)
    }
}

fn is_active_hour() -> bool {
    let h = Local::now().hour();
    // Awake hours: 7:00 → 22:59. Quiet from 23:00 to 06:59.
    (7..23).contains(&h)
}
