/**
 * Bridge between the Tauri local HTTP server (which the Chrome extension talks
 * to) and the React app.
 *
 * Boot sequence:
 *  1. Read or initialize `app_settings.local_server_token` (40-char random).
 *  2. Push that token to the Rust server via `set_server_token` so it can
 *     authenticate incoming requests from the extension.
 *  3. Subscribe to the `watch:listing` Tauri event. Each one carries a listing
 *     payload the extension just detected on a LBC page the user has open.
 *  4. Ingest each payload through the same pipeline as the clipboard import:
 *     dedupe by URL, score against the best-matching active search profile,
 *     notify if the score crosses the user's threshold.
 *
 * Auto-attribution: when a listing arrives without an explicit search profile,
 * we score it against every active search_profile and keep the highest score.
 * The chosen profile is recorded so the user understands which criteria fired.
 */

import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import {
  getListing,
  getListingByUrl,
  getSetting,
  insertListingFromParsed,
  listSearchProfiles,
  setSetting,
  updateListingScore,
} from "@/lib/db";
import { scoreListing } from "@/lib/scoring";
import { notifyDesktop } from "@/lib/tauri";
import type { Listing, ParsedListing, SearchProfile } from "@/types";

export interface WatchEventPayload {
  app: string;
  type: string;
  version: number;
  captured_at?: string;
  data: {
    url: string;
    external_id: string | null;
    title: string | null;
    price: number | null;
    city: string | null;
    postal_code: string | null;
    surface: number | null;
    rooms: number | null;
    furnished: boolean | null;
    property_type: string | null;
    description: string | null;
    images: string[];
    publisher_name: string | null;
    publisher_type: string | null;
    published_at: string | null;
  };
}

export interface WatchIngestResult {
  listingId: number;
  status: "new" | "duplicate";
  score: number | null;
  matchedSearchId: number | null;
  matchedSearchName: string | null;
  notified: boolean;
}

type WatchHandler = (result: WatchIngestResult, payload: WatchEventPayload) => void;

const handlers = new Set<WatchHandler>();
let unlistenFn: UnlistenFn | null = null;
let bootstrapped = false;

const TOKEN_SETTING_KEY = "local_server_token";

export function onWatchIngest(handler: WatchHandler): () => void {
  handlers.add(handler);
  return () => handlers.delete(handler);
}

export async function getLocalServerToken(): Promise<string> {
  const existing = await getSetting(TOKEN_SETTING_KEY);
  if (existing && existing.length >= 32) return existing;
  const fresh = await invoke<string>("generate_token");
  await setSetting(TOKEN_SETTING_KEY, fresh);
  return fresh;
}

export async function regenerateLocalServerToken(): Promise<string> {
  const fresh = await invoke<string>("generate_token");
  await setSetting(TOKEN_SETTING_KEY, fresh);
  await invoke("set_server_token", { token: fresh });
  return fresh;
}

export async function getLocalServerPort(): Promise<number | null> {
  return (await invoke<number | null>("get_server_port")) ?? null;
}

/**
 * Idempotent — safe to call multiple times.
 * Starts the bridge once, then any further call is a no-op.
 */
export async function startWatchBridge(): Promise<void> {
  if (bootstrapped) return;
  bootstrapped = true;
  const token = await getLocalServerToken();
  await invoke("set_server_token", { token });

  unlistenFn = await listen<WatchEventPayload>("watch:listing", async (event) => {
    try {
      const result = await handleWatchPayload(event.payload);
      for (const h of handlers) {
        try {
          h(result, event.payload);
        } catch (e) {
          console.error("[watchBridge] handler threw:", e);
        }
      }
    } catch (e) {
      console.error("[watchBridge] ingest failed:", e);
    }
  });
}

export async function stopWatchBridge(): Promise<void> {
  if (unlistenFn) {
    unlistenFn();
    unlistenFn = null;
  }
  bootstrapped = false;
}

async function handleWatchPayload(
  payload: WatchEventPayload,
): Promise<WatchIngestResult> {
  const d = payload.data;
  if (!d?.url) throw new Error("payload missing url");

  // Dedupe by URL — UNIQUE constraint on listings.url anyway, but we want to
  // produce a stable result and not noise the UI with duplicates.
  const existing = await getListingByUrl(d.url);
  if (existing) {
    return {
      listingId: existing.id,
      status: "duplicate",
      score: existing.score,
      matchedSearchId: existing.search_profile_id,
      matchedSearchName: null,
      notified: false,
    };
  }

  const parsed: ParsedListing = {
    url: d.url,
    external_id: d.external_id,
    title: d.title,
    price: d.price,
    city: d.city,
    postal_code: d.postal_code,
    surface: d.surface,
    rooms: d.rooms,
    furnished: d.furnished,
    property_type: d.property_type,
    description: d.description,
    images: d.images ?? [],
    publisher_name: d.publisher_name,
    publisher_type: d.publisher_type,
    published_at: d.published_at,
    raw_html_size: 0,
  };

  // Choose the best-matching active search profile (highest score), if any.
  const searches = await listSearchProfiles();
  const active = searches.filter((s) => s.is_active === 1);
  const id = await insertListingFromParsed(parsed, null);
  const listing = await getListing(id);
  if (!listing) {
    return {
      listingId: id,
      status: "new",
      score: null,
      matchedSearchId: null,
      matchedSearchName: null,
      notified: false,
    };
  }

  let best: { score: number; reasons: unknown; profile: SearchProfile } | null = null;
  for (const sp of active) {
    const r = scoreListing(listing, sp);
    if (!best || r.score > best.score) {
      best = { score: r.score, reasons: r.reasons, profile: sp };
    }
  }

  let finalScore: number | null = null;
  let matchedId: number | null = null;
  let matchedName: string | null = null;
  if (best) {
    await updateListingScore(id, best.score, best.reasons);
    finalScore = best.score;
    matchedId = best.profile.id;
    matchedName = best.profile.name;
  }

  let notified = false;
  if (finalScore !== null) {
    notified = await maybeNotifyHot(listing, finalScore, matchedName);
  }

  return {
    listingId: id,
    status: "new",
    score: finalScore,
    matchedSearchId: matchedId,
    matchedSearchName: matchedName,
    notified,
  };
}

async function maybeNotifyHot(
  listing: Listing,
  score: number,
  searchName: string | null,
): Promise<boolean> {
  const threshold = Number((await getSetting("notification_min_score")) ?? 70);
  if (score < threshold) return false;
  const subtitle = [
    listing.price ? `${listing.price}€` : null,
    listing.surface ? `${listing.surface}m²` : null,
    listing.city,
    searchName ? `match: ${searchName}` : null,
  ]
    .filter(Boolean)
    .join(" • ");
  await notifyDesktop({
    title: `★ ${score}/100 — ${listing.title ?? "Annonce détectée"}`,
    body: subtitle,
  });
  return true;
}
