/**
 * Surcharge web des « ponts natifs » (ex-Tauri) — 100 % API navigateur standard.
 *
 * - parseListingUrl : sur le web on ne peut PAS parser leboncoin.fr (CORS) et on
 *   ne DOIT PAS le requêter (ligne rouge). « Ajouter une URL » crée donc une fiche
 *   PROVISOIRE (url + external_id), enrichie ensuite quand l'extension voit l'annonce.
 * - openExternal : window.open (l'utilisateur ouvre LBC lui-même).
 * - notifyDesktop / ensureNotificationPermission : Web Notifications API.
 * - copyToClipboard : navigator.clipboard (fallback execCommand).
 */
import type { ParsedListing } from "@app/types";

/** Repère un identifiant d'annonce LBC (~6+ chiffres) dans une URL. */
const AD_ID_RE = /leboncoin\.fr\/[^\s"'<>]*?(?:itemId-(\d{6,})|\/(\d{6,}))/i;

export async function parseListingUrl(url: string): Promise<ParsedListing> {
  const m = AD_ID_RE.exec(url);
  const external_id = m ? m[1] ?? m[2] ?? null : null;
  return {
    url,
    external_id,
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
  };
}

export async function openExternal(url: string): Promise<void> {
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function ensureNotificationPermission(): Promise<boolean> {
  if (typeof Notification === "undefined") return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const perm = await Notification.requestPermission();
  return perm === "granted";
}

export async function notifyDesktop(opts: { title: string; body: string }): Promise<void> {
  const ok = await ensureNotificationPermission();
  if (!ok) return;
  try {
    new Notification(opts.title, { body: opts.body, icon: "/icon.svg" });
  } catch {
    /* certains contextes refusent le constructeur — best-effort */
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}
