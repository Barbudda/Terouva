/**
 * Surcharge web du pont d'ingestion.
 *
 * - L'ingestion (dédup → score contre les recherches actives → notif) est RÉELLE,
 *   au-dessus d'IndexedDB. Réutilisée par l'import d'email d'alerte (LOT 4) et,
 *   au LOT 5, par le pont extension `externally_connectable`.
 * - Le serveur local 127.0.0.1, le token Bearer et le polling background Tauri
 *   N'EXISTENT PLUS : leurs fonctions sont des stubs (l'app reste compilable et le
 *   store de surveillance inerte tant que l'extension n'est pas branchée).
 *
 * Aucune requête vers Leboncoin : on ne fait que recevoir/scorer des annonces que
 * l'utilisateur a fait remonter (extension lisant le DOM, ou email d'alerte LBC).
 */
import {
  enrichListing,
  getListing,
  getListingByUrl,
  getSetting,
  insertListingFromParsed,
  listSearchProfiles,
  updateListingScore,
} from "@app/lib/db";
import { lbcAlertEmailToListings } from "@app/lib/lbcEmail";
import { scoreListing } from "@app/lib/scoring";
import { notifyDesktop } from "@app/lib/tauri";
import type { Listing, ParsedListing, SearchProfile } from "@app/types";

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

async function maybeNotifyHot(
  listing: Listing,
  score: number,
  searchName: string | null,
  show = true,
): Promise<boolean> {
  const threshold = Number((await getSetting("notification_min_score")) ?? 70);
  if (score < threshold) return false;
  // `show=false` : l'annonce vient de l'extension → c'est elle qui affichera la
  // notif système (visible même quand on est sur Leboncoin). On évite le doublon
  // avec la notification du navigateur.
  if (show) {
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
  }
  return true;
}

/**
 * Ingestion d'une annonce déjà parsée — dédup par URL, enrichit si connue, sinon
 * insère, score contre la meilleure recherche active, notifie si le seuil est franchi.
 * `detailOnly` : si l'annonce est inconnue, ne pas l'insérer (consultation au hasard).
 */
export async function ingestParsedListing(
  parsed: ParsedListing,
  opts: { detailOnly?: boolean; pageNotif?: boolean } = {},
): Promise<WatchIngestResult> {
  const { detailOnly = false, pageNotif = true } = opts;
  if (!parsed.url) throw new Error("listing missing url");

  const existing = await getListingByUrl(parsed.url);
  if (existing) {
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
    let notified = false;
    const threshold = Number((await getSetting("notification_min_score")) ?? 70);
    if (newScore !== null && newScore >= threshold && (existing.score ?? 0) < threshold) {
      notified = await maybeNotifyHot(reloaded, newScore, matchedName, pageNotif);
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

  if (detailOnly) {
    return { listingId: -1, status: "ignored", score: null, matchedSearchId: null, matchedSearchName: null, notified: false };
  }

  const id = await insertListingFromParsed(parsed, null);
  const listing = await getListing(id);
  if (!listing) {
    return { listingId: id, status: "new", score: null, matchedSearchId: null, matchedSearchName: null, notified: false };
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
    notified = await maybeNotifyHot(listing, finalScore, matchedName, pageNotif);
  }
  return { listingId: id, status: "new", score: finalScore, matchedSearchId: matchedId, matchedSearchName: matchedName, notified };
}

export interface EmailImportSummary {
  found: number;
  added: number;
  duplicates: number;
  enriched: number;
  notified: number;
}

/**
 * Importe les annonces d'un email d'alerte Leboncoin collé par l'utilisateur.
 * Aucune requête vers LBC (c'est LBC qui a envoyé le mail) ; candidature 100 % humaine.
 */
export async function importLbcAlertEmail(content: string): Promise<EmailImportSummary> {
  const parsedListings = lbcAlertEmailToListings(content);
  const summary: EmailImportSummary = { found: parsedListings.length, added: 0, duplicates: 0, enriched: 0, notified: 0 };
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

// ────────────────────────────── registre d'ingestion (in-app) ──────────────────────────────

type WatchHandler = (result: WatchIngestResult, payload: WatchEventPayload) => void;
const handlers = new Set<WatchHandler>();

export function onWatchIngest(handler: WatchHandler): () => void {
  handlers.add(handler);
  return () => handlers.delete(handler);
}

/** Notifie les abonnés (utilisé par le pont extension au LOT 5). */
export function emitWatchIngest(result: WatchIngestResult, payload: WatchEventPayload): void {
  for (const h of handlers) {
    try {
      h(result, payload);
    } catch (e) {
      console.error("[watchBridge] handler threw:", e);
    }
  }
}

// ────────────────────────────── stubs serveur / polling (ex-Tauri) ──────────────────────────────
// Remplacés au LOT 5 par le pont extension `externally_connectable` + handshake.

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

export async function getLocalServerToken(): Promise<string> {
  return "";
}
export async function regenerateLocalServerToken(): Promise<string> {
  return "";
}
export async function getLocalServerPort(): Promise<number | null> {
  return null;
}
/** Plus de polling background sur le web (cf. plan, FAQ « Et si je ferme Chrome ? »). */
export async function syncPollingTargets(): Promise<number> {
  return 0;
}
export async function getPollingStats(): Promise<PollingStats> {
  return {
    enabled: false,
    target_count: 0,
    total_fetches: 0,
    last_error: null,
    last_target_id: null,
    last_target_at: null,
    per_target_last_check: {},
  };
}
/** Le pont extension est branché au LOT 5 ; ici no-op. */
export async function startWatchBridge(): Promise<void> {}
export async function stopWatchBridge(): Promise<void> {}
