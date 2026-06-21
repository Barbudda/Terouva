import type { ParsedListing } from "./types";

/**
 * Parser d'**email d'alerte Leboncoin** (recherche sauvegardée).
 *
 * Pourquoi cette voie : c'est **LBC qui envoie le mail** → aucune requête vers LBC,
 * donc **aucun risque de flag/ban**, et rien de lourd à installer côté client. De plus,
 * l'email est **déjà filtré par les critères de la recherche de l'utilisateur** : chaque
 * annonce qu'il contient EST un match → pas besoin de re-scorer pour filtrer (le scoring
 * ne sert plus qu'au classement). On a juste besoin d'extraire les **liens d'annonces**.
 *
 * Robustesse : on extrait toutes les URL (y compris celles enrobées dans des liens de
 * tracking, où l'URL réelle est URL-encodée dans un paramètre), on garde celles qui
 * pointent vers une annonce LBC, et on déduplique par identifiant d'annonce.
 *
 * ⚠️ Le format exact des mails LBC n'est pas public : l'extraction des liens est
 * générique (robuste aux changements de gabarit). Titre/prix/etc. viendront de
 * l'enrichissement quand l'utilisateur ouvre l'annonce (flux on-thesis existant).
 */

export interface LbcEmailListing {
  url: string;
  external_id: string | null;
}

/** Repère un identifiant d'annonce LBC (~6+ chiffres) dans une URL. */
const AD_ID_RE = /leboncoin\.fr\/[^\s"'<>]*?(?:itemId-(\d{6,})|\/(\d{6,}))/i;

/** Reconstruit une URL d'annonce propre à partir d'un candidat + son id. */
function canonicalUrl(candidate: string, id: string): string {
  const m = /https?:\/\/(?:www\.)?leboncoin\.fr\/[^\s"'<>]*?(?:itemId-\d{6,}|\/\d{6,})/i.exec(candidate);
  if (m) return m[0].replace(/[?#].*$/, "");
  return `https://www.leboncoin.fr/ad/${id}`;
}

/**
 * Extrait les annonces (URL + id) d'un email d'alerte LBC (HTML ou texte brut).
 * Déduplique par id. Tolère les liens de tracking (URL réelle encodée dans un param).
 */
export function parseLbcAlertEmail(content: string): LbcEmailListing[] {
  if (!content) return [];
  const decoded = content.replace(/&amp;/gi, "&");

  const candidates = new Set<string>();
  for (const m of decoded.matchAll(/https?:\/\/[^\s"'<>)\]]+/gi)) {
    const raw = m[0];
    candidates.add(raw);
    try {
      candidates.add(decodeURIComponent(raw));
    } catch {
      /* séquence d'échappement invalide → on garde le brut */
    }
    // Lien de tracking : l'URL cible est souvent dans un param url=/u=/target=/redirect=.
    const inner = /[?&](?:url|u|target|redirect|dest|link)=([^&]+)/i.exec(raw);
    if (inner) {
      try {
        candidates.add(decodeURIComponent(inner[1]));
      } catch {
        candidates.add(inner[1]);
      }
    }
  }

  const out: LbcEmailListing[] = [];
  const seen = new Set<string>();
  for (const u of candidates) {
    const idm = AD_ID_RE.exec(u);
    if (!idm) continue;
    const id = idm[1] ?? idm[2] ?? null;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({ url: canonicalUrl(u, id), external_id: id });
  }
  return out;
}

/**
 * Convertit un email d'alerte LBC en `ParsedListing[]` prêts pour le pipeline
 * d'ingestion existant (dédup par URL → score → notif). Champs détaillés à null :
 * ils seront enrichis quand l'utilisateur ouvrira l'annonce (content.js on-thesis).
 */
export function lbcAlertEmailToListings(content: string): ParsedListing[] {
  return parseLbcAlertEmail(content).map((e) => ({
    url: e.url,
    external_id: e.external_id,
    title: null,
    price: null,
    city: null,
    postal_code: null,
    surface: null,
    rooms: null,
    furnished: null,
    property_type: null,
    description: null,
    images: [],
    publisher_name: null,
    publisher_type: null,
    published_at: null,
    raw_html_size: 0,
  }));
}
