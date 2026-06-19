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
  enrichListing,
  getListing,
  getListingByUrl,
  getSetting,
  insertListingFromParsed,
  listSearchProfiles,
  setSetting,
  updateListingScore,
} from "@/lib/db";
import { lbcAlertEmailToListings } from "@/lib/lbcEmail";
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
  status: "new" | "duplicate" | "enriched" | "ignored";
  score: number | null;
  matchedSearchId: number | null;
  matchedSearchName: string | null;
  notified: boolean;
}

/** Construit un ParsedListing depuis le payload reçu (extension / polling). */
function payloadToParsed(d: WatchEventPayload["data"]): ParsedListing {
  return {
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
}

/** Re-score une annonce contre la meilleure recherche active. */
async function scoreAgainstActive(
  listing: Listing,
): Promise<{ score: number; reasons: unknown; profile: SearchProfile } | null> {
  const active = (await listSearchProfiles()).filter((s) => s.is_active === 1);
  let best: { score: number; reasons: unknown; profile: SearchProfile } | null = null;
  for (const sp of active) {
    const r = scoreListing(listing, sp);
    if (!best || r.score > best.score) best = { score: r.score, reasons: r.reasons, profile: sp };
  }
  return best;
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

// ────────────────────────────── polling targets ──────────────────────────────

export interface PollingTarget {
  id: number;
  name: string;
  url: string;
  frequency_minutes: number;
}

export interface PollingStats {
  enabled: boolean;
  target_count: number;
  total_fetches: number;
  last_error: string | null;
  last_target_id: number | null;
  last_target_at: string | null;
  per_target_last_check: Record<string, string>;
}

/**
 * Push the current list of active search profiles to the Rust polling loop.
 * Should be called at startup and after every search-profile mutation.
 */
export async function syncPollingTargets(): Promise<number> {
  const searches = await listSearchProfiles();
  const targets: PollingTarget[] = searches
    .filter((s) => s.is_active === 1 && !!s.lbc_search_url)
    .map((s) => ({
      id: s.id,
      name: s.name,
      url: s.lbc_search_url as string,
      frequency_minutes: Math.max(5, s.check_frequency_minutes || 30),
    }));
  await invoke("set_polling_targets", {
    targets,
    enabled: targets.length > 0,
  });
  return targets.length;
}

export async function getPollingStats(): Promise<PollingStats> {
  return await invoke<PollingStats>("get_polling_stats");
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
  const parsed = payloadToParsed(d);
  // Un payload "listing-detail" vient d'une page d'annonce ouverte par l'utilisateur :
  // il sert à ENRICHIR une fiche existante, jamais à en créer une nouvelle (sinon
  // chaque annonce consultée au hasard polluerait le feed).
  const detailOnly = payload.type === "listing-detail";
  return ingestParsedListing(parsed, { detailOnly });
}

/**
 * Ingestion d'une annonce déjà parsée — point d'entrée partagé par l'extension
 * (watch:listing) ET l'import d'emails d'alerte LBC. Dédup par URL, enrichit si
 * connue, sinon insère, score contre la meilleure recherche active, notifie si
 * le seuil est franchi.
 *
 * `detailOnly` : si l'annonce est inconnue, ne pas l'insérer (cas d'une page
 * d'annonce ouverte au hasard — sert seulement à enrichir une fiche existante).
 */
export async function ingestParsedListing(
  parsed: ParsedListing,
  opts: { detailOnly: boolean } = { detailOnly: false },
): Promise<WatchIngestResult> {
  const { detailOnly } = opts;
  if (!parsed.url) throw new Error("listing missing url");

  const existing = await getListingByUrl(parsed.url);
  if (existing) {
    // Enrichissement : on complète les champs vides avec les nouvelles données,
    // puis on re-score (la confiance monte quand la description arrive).
    const changed = await enrichListing(existing.id, parsed);
    if (!changed) {
      return {
        listingId: existing.id,
        status: "duplicate",
        score: existing.score,
        matchedSearchId: existing.search_profile_id,
        matchedSearchName: null,
        notified: false,
      };
    }
    const reloaded = await getListing(existing.id);
    if (!reloaded) {
      return { listingId: existing.id, status: "duplicate", score: existing.score, matchedSearchId: null, matchedSearchName: null, notified: false };
    }
    const best = await scoreAgainstActive(reloaded);
    let newScore: number | null = existing.score;
    let matchedName: string | null = null;
    let matchedId: number | null = existing.search_profile_id;
    if (best) {
      await updateListingScore(existing.id, best.score, best.reasons);
      newScore = best.score;
      matchedName = best.profile.name;
      matchedId = best.profile.id;
    }
    // Notif seulement si l'enrichissement fait FRANCHIR le seuil (évite le re-spam) :
    // une annonce "moyenne" sur carte pauvre qui devient "chaude" une fois enrichie.
    let notified = false;
    const threshold = Number((await getSetting("notification_min_score")) ?? 70);
    if (newScore !== null && newScore >= threshold && (existing.score ?? 0) < threshold) {
      notified = await maybeNotifyHot(reloaded, newScore, matchedName);
    }
    return {
      listingId: existing.id,
      status: "enriched",
      score: newScore,
      matchedSearchId: matchedId,
      matchedSearchName: matchedName,
      notified,
    };
  }

  // Annonce inconnue : si c'est un payload "détail" (consultation au hasard), on
  // n'ingère pas — on évite de polluer le feed avec des annonces hors recherche.
  if (detailOnly) {
    return {
      listingId: -1,
      status: "ignored",
      score: null,
      matchedSearchId: null,
      matchedSearchName: null,
      notified: false,
    };
  }

  // Choose the best-matching active search profile (highest score), if any.
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

  const best = await scoreAgainstActive(listing);

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

export interface EmailImportSummary {
  /** Nombre d'annonces trouvées dans l'email. */
  found: number;
  /** Nouvelles annonces insérées dans le feed. */
  added: number;
  /** Déjà présentes (dédup par URL). */
  duplicates: number;
  /** Fiches existantes enrichies par l'email. */
  enriched: number;
  /** Annonces ayant déclenché une notif (score ≥ seuil). */
  notified: number;
}

/**
 * Importe les annonces d'un **email d'alerte Leboncoin** collé par l'utilisateur.
 * Aucune requête vers LBC (c'est LBC qui a envoyé le mail) ; l'envoi de
 * candidature reste 100 % humain. Chaque lien d'annonce est passé dans le même
 * pipeline d'ingestion que l'extension (dédup → score → notif). Les fiches sont
 * volontairement « provisoires » (URL seule) : elles s'enrichissent quand
 * l'utilisateur ouvre l'annonce.
 */
export async function importLbcAlertEmail(
  content: string,
): Promise<EmailImportSummary> {
  const parsedListings = lbcAlertEmailToListings(content);
  const summary: EmailImportSummary = {
    found: parsedListings.length,
    added: 0,
    duplicates: 0,
    enriched: 0,
    notified: 0,
  };
  for (const parsed of parsedListings) {
    try {
      const r = await ingestParsedListing(parsed, { detailOnly: false });
      if (r.status === "new") summary.added++;
      else if (r.status === "duplicate") summary.duplicates++;
      else if (r.status === "enriched") summary.enriched++;
      if (r.notified) summary.notified++;
    } catch (e) {
      console.error("[watchBridge] email listing ingest failed:", e);
    }
  }
  return summary;
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
  const title = `★ ${score}/100 — ${listing.title ?? "Annonce détectée"}`;
  await notifyDesktop({ title, body: subtitle });
  // En plus de la notif OS (Tauri), on empile une notif pour l'extension Chrome :
  // elle l'affichera dans le navigateur (clic = ouvrir l'annonce), utile quand
  // l'utilisateur est en train de naviguer sur LBC et l'app n'est pas au premier
  // plan. Best-effort : un échec ici ne doit jamais casser l'ingestion.
  try {
    await invoke("enqueue_chrome_notif", {
      notif: { id: String(listing.id), title, body: subtitle, url: listing.url, score },
    });
  } catch {
    /* la commande peut être absente sur un vieux binaire — on ignore */
  }
  return true;
}
