/**
 * Pont page ↔ extension (CANAL A), côté /app. Sans serveur local : on se connecte
 * DIRECTEMENT à l'extension via `chrome.runtime.connect(EXT_ID)` (MV3
 * externally_connectable). Chrome n'injecte `chrome.runtime` que sur les origines
 * listées dans le manifest de l'extension → leboncoin.fr ne peut JAMAIS nous joindre.
 *
 * Sécurité : on initie la connexion vers un EXT_ID précis, et on transmet un secret
 * de handshake (généré localement, persisté en IndexedDB) que l'extension exige
 * ensuite. Aucune donnée ne sort vers un serveur ; tout reste local.
 */
import { getSetting, setSetting } from "@app/lib/db";
import {
  emitWatchIngest,
  ingestParsedListing,
  type WatchEventPayload,
} from "@app/lib/watchBridge";
import type { ParsedListing } from "@app/types";

// En prod (extension signée) l'ID est fixe via env ; en dev (unpacked) il est
// variable → surchargé via app_settings.ext_id (champ dans « État extension »).
const ENV_EXT_ID = process.env.NEXT_PUBLIC_TEROUVA_EXT_ID ?? "";

interface ChromePort {
  postMessage(msg: unknown): void;
  onMessage: { addListener(cb: (msg: Record<string, unknown>) => void): void };
  onDisconnect: { addListener(cb: () => void): void };
  disconnect(): void;
}
interface ChromeRuntimeLike {
  id?: string;
  connect(extId: string, info?: { name?: string }): ChromePort;
  sendMessage(extId: string, msg: unknown, cb?: (resp: Record<string, unknown> | undefined) => void): void;
  lastError?: { message?: string };
}
function chromeRuntime(): ChromeRuntimeLike | null {
  const c = (globalThis as { chrome?: { runtime?: ChromeRuntimeLike } }).chrome;
  return c?.runtime ?? null;
}

/** True si une extension capable de parler à cette origine est présente. */
export function extensionAvailable(): boolean {
  return chromeRuntime() !== null;
}

export async function getExtId(): Promise<string> {
  const override = await getSetting("ext_id");
  return (override && override.trim()) || ENV_EXT_ID;
}
export async function setExtId(id: string): Promise<void> {
  await setSetting("ext_id", id.trim());
}

async function getOrCreateSecret(): Promise<string> {
  let s = await getSetting("bridge_secret");
  if (!s) {
    const bytes = new Uint8Array(30);
    crypto.getRandomValues(bytes);
    s = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    await setSetting("bridge_secret", s);
  }
  return s;
}

// ───────────────────────── état observable ─────────────────────────

export interface BridgeState {
  available: boolean;
  connected: boolean;
  extId: string;
  lastSyncAt: number | null;
  received: number;
  error: string | null;
}

let state: BridgeState = {
  available: false,
  connected: false,
  extId: "",
  lastSyncAt: null,
  received: 0,
  error: null,
};
const listeners = new Set<(s: BridgeState) => void>();

function setState(patch: Partial<BridgeState>) {
  state = { ...state, ...patch };
  for (const l of listeners) {
    try {
      l(state);
    } catch {
      /* ignore */
    }
  }
}
export function getBridgeState(): BridgeState {
  return state;
}
export function onBridgeState(cb: (s: BridgeState) => void): () => void {
  listeners.add(cb);
  cb(state);
  return () => listeners.delete(cb);
}

// ───────────────────────── connexion ─────────────────────────

let port: ChromePort | null = null;
let secret = "";
let reconnectScheduled = false;

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

async function handleDetected(payload: WatchEventPayload) {
  if (!payload?.data?.url) return;
  try {
    const parsed = payloadToParsed(payload.data);
    const detailOnly = payload.type === "listing-detail";
    // pageNotif:false → c'est l'extension qui affichera la notif système
    // (visible même quand l'utilisateur est sur Leboncoin, pas sur l'app).
    const result = await ingestParsedListing(parsed, { detailOnly, pageNotif: false });
    emitWatchIngest(result, payload);
    setState({ received: state.received + 1, lastSyncAt: Date.now() });
    if (result.notified && result.score !== null) {
      notifyExtension(payload.data, result.score, result.matchedSearchName);
    }
  } catch (e) {
    console.error("[extBridge] ingestion échouée:", e);
  }
}

/** Demande à l'extension d'afficher une notification système « annonce chaude ». */
function notifyExtension(
  d: WatchEventPayload["data"],
  score: number,
  searchName: string | null,
): void {
  const runtime = chromeRuntime();
  if (!runtime) return;
  const body = [
    d.price ? `${d.price}€` : null,
    d.surface ? `${d.surface}m²` : null,
    d.city,
    searchName ? `correspond à : ${searchName}` : null,
  ]
    .filter(Boolean)
    .join(" • ");
  const notif = {
    title: `★ ${score}/100 — ${d.title ?? "Annonce détectée"}`,
    body,
    url: d.url,
    score,
  };
  void getExtId().then((extId) => {
    if (!extId) return;
    try {
      runtime.sendMessage(extId, { type: "terouva.notify", notif });
    } catch {
      /* extension momentanément indisponible — best-effort */
    }
  });
}

/** (Re)connecte la page à l'extension. Best-effort : no-op si absente. */
export async function connectExtension(): Promise<boolean> {
  const runtime = chromeRuntime();
  setState({ available: runtime !== null });
  if (!runtime) {
    setState({ connected: false, error: "extension-absente" });
    return false;
  }
  const extId = await getExtId();
  if (!extId) {
    setState({ connected: false, extId: "", error: "ext-id-manquant" });
    return false;
  }
  secret = await getOrCreateSecret();
  setState({ extId, error: null });

  try {
    port = runtime.connect(extId, { name: "terouva-app" });
  } catch {
    setState({ connected: false, error: "connexion-refusée" });
    return false;
  }

  port.onMessage.addListener((msg: Record<string, unknown>) => {
    if (!msg) return;
    if (msg.type === "terouva.ready") {
      setState({ connected: true, error: null });
      // Draine les annonces mises en file pendant que l'app était fermée.
      port?.postMessage({ type: "terouva.drain", secret });
    } else if (msg.type === "terouva.batch" && Array.isArray(msg.items)) {
      for (const p of msg.items as WatchEventPayload[]) void handleDetected(p);
    } else if (msg.type === "terouva.detected" && msg.payload) {
      void handleDetected(msg.payload as WatchEventPayload);
    } else if (msg.type === "terouva.error") {
      setState({ error: String(msg.reason ?? "erreur") });
    }
  });

  port.onDisconnect.addListener(() => {
    port = null;
    setState({ connected: false });
    scheduleReconnect();
  });

  // Handshake : on transmet notre secret à l'extension.
  port.postMessage({ type: "terouva.hello", secret });
  return true;
}

function scheduleReconnect() {
  if (reconnectScheduled) return;
  reconnectScheduled = true;
  setTimeout(() => {
    reconnectScheduled = false;
    if (!port) void connectExtension();
  }, 1500);
}

// Reconnexion au focus/visibilité (le service worker MV3 peut avoir été recyclé).
if (typeof window !== "undefined") {
  window.addEventListener("focus", () => {
    if (!port) void connectExtension();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !port) void connectExtension();
  });
}

/** Ping de diagnostic (one-shot) — résout true si l'extension répond. */
export async function pingExtension(): Promise<boolean> {
  const runtime = chromeRuntime();
  const extId = await getExtId();
  if (!runtime || !extId) return false;
  return new Promise((resolve) => {
    try {
      runtime.sendMessage(extId, { type: "terouva.ping" }, (resp) => {
        if (runtime.lastError) {
          resolve(false);
          return;
        }
        resolve(!!resp?.ok);
      });
    } catch {
      resolve(false);
    }
  });
}
