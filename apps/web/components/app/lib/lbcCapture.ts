/**
 * Lecture de ce que le marque-page (ou l'extension) a copié.
 *
 * Deux formats acceptés :
 *  - `listing-batch`     : plusieurs annonces d'une page de résultats (marque-page) ;
 *  - `listing-clipboard` : une seule annonce (bouton « Copier JSON » de l'extension).
 *
 * Tout ce qui entre ici vient du presse-papiers, donc de l'extérieur : chaque
 * champ est validé et typé avant de toucher la base.
 */
import type { ParsedListing } from "@app/types";
import { ingestParsedListing, type EmailImportSummary } from "./watchBridge";

const AD_URL = /^https?:\/\/(?:www\.)?leboncoin\.fr\//i;

function str(v: unknown, max = 500): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s ? s.slice(0, max) : null;
}

function int(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v.replace(/[^\d]/g, "")) : NaN;
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : null;
}

function bool(v: unknown): boolean | null {
  return typeof v === "boolean" ? v : null;
}

function images(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((u): u is string => typeof u === "string" && /^https?:\/\//i.test(u)).slice(0, 8);
}

/** Convertit un élément du presse-papiers en annonce, ou null s'il est inutilisable. */
function toParsed(raw: unknown): ParsedListing | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const url = str(o.url, 600);
  // On n'accepte que des liens Leboncoin : rien d'autre n'a de sens ici.
  if (!url || !AD_URL.test(url)) return null;
  return {
    url,
    external_id: str(o.external_id, 40),
    title: str(o.title, 200),
    price: int(o.price),
    city: str(o.city, 80),
    postal_code: str(o.postal_code, 10),
    surface: int(o.surface),
    rooms: int(o.rooms),
    furnished: bool(o.furnished),
    property_type: str(o.property_type, 40),
    description: str(o.description, 4000),
    images: images(o.images),
    publisher_name: str(o.publisher_name, 120),
    publisher_type: str(o.publisher_type, 40),
    published_at: str(o.published_at, 40),
    raw_html_size: 0,
  };
}

export class CaptureError extends Error {}

/**
 * Lit le texte copié et en sort les annonces. Lève `CaptureError` avec un
 * message compréhensible si ce n'est pas une capture Terouva.
 */
export function parseCapture(text: string): ParsedListing[] {
  const trimmed = (text ?? "").trim();
  if (!trimmed) throw new CaptureError("Rien n'a été copié pour l'instant.");

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(trimmed) as Record<string, unknown>;
  } catch {
    throw new CaptureError("Ce que vous avez copié ne vient pas de Terouva.");
  }

  if (payload?.app !== "terouva") {
    throw new CaptureError("Ce que vous avez copié ne vient pas de Terouva.");
  }

  const raws =
    payload.type === "listing-batch"
      ? Array.isArray(payload.items)
        ? payload.items
        : []
      : payload.type === "listing-clipboard"
        ? [payload.data]
        : null;

  if (raws === null) throw new CaptureError("Ce format de capture n'est pas reconnu.");

  const out: ParsedListing[] = [];
  const seen = new Set<string>();
  for (const raw of raws) {
    const parsed = toParsed(raw);
    if (!parsed || seen.has(parsed.url)) continue;
    seen.add(parsed.url);
    out.push(parsed);
  }
  if (out.length === 0) throw new CaptureError("Aucune annonce Leboncoin dans ce que vous avez copié.");
  return out;
}

/** Vrai si le texte ressemble à une capture Terouva (pour le collage global). */
export function looksLikeCapture(text: string): boolean {
  const t = (text ?? "").trimStart();
  return t.startsWith("{") && t.includes('"terouva"') && t.includes("listing-");
}

/** Importe les annonces captées : dédoublonnage, note et alerte comme d'habitude. */
export async function importCapture(text: string): Promise<EmailImportSummary> {
  const listings = parseCapture(text);
  const summary: EmailImportSummary = {
    found: listings.length,
    added: 0,
    duplicates: 0,
    enriched: 0,
    notified: 0,
  };
  for (const parsed of listings) {
    try {
      const r = await ingestParsedListing(parsed, { detailOnly: false });
      if (r.status === "new") summary.added++;
      else if (r.status === "duplicate") summary.duplicates++;
      else if (r.status === "enriched") summary.enriched++;
      if (r.notified) summary.notified++;
    } catch (e) {
      console.error("[capture] ingestion impossible :", e);
    }
  }
  return summary;
}
