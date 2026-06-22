// Terouva — background service worker (MV3).
//
// Pont SANS serveur local : l'app web (/app) se connecte DIRECTEMENT à l'extension
// via `externally_connectable` (canal officiel MV3). Plus de 127.0.0.1, plus de
// token Bearer, plus de port-scan.
//
// Rôles :
//  1. CANAL A (page ↔ SW) : `onConnectExternal` accepte la connexion de /app
//     (origine vérifiée), échange un secret de handshake, et draine les annonces
//     mises en file pendant que l'app était fermée.
//  2. CANAL B (LBC → SW → page) : les content scripts (watch.js/content.js, câblés
//     au LOT 6) envoient `terouva.detected` ; on relaie à la page connectée, sinon
//     on met en file dans chrome.storage.local (le SW MV3 est recyclé ~30 s → JAMAIS
//     en mémoire seule).
//  3. Notifications « annonce chaude » (chrome.notifications), inchangées.
//
// LIGNE ROUGE : aucune requête vers Leboncoin. On lit le DOM (content scripts) et
// on relaie. L'humain valide et envoie.

// Origines autorisées à parler à l'extension (doit matcher externally_connectable).
const PAGE_ORIGINS = ["https://terouva.vercel.app", "http://localhost:3000"];

const BUFFER_KEY = "terouva.buffer"; // file FIFO d'annonces en attente (storage.local)
const SECRET_KEY = "terouva.bridgeSecret"; // secret de handshake partagé avec /app
const URLS_KEY = "terouva.notifUrls";
const BUFFER_MAX = 200;

// Port vers la page /app connectée. En mémoire (le SW peut être recyclé → on
// rebufferise dans storage.local, jamais de perte).
let pagePort = null;

function senderOrigin(sender) {
  if (!sender) return null;
  if (sender.origin) return sender.origin;
  if (sender.url) {
    try {
      return new URL(sender.url).origin;
    } catch {
      return null;
    }
  }
  return null;
}

function originAllowed(sender) {
  const origin = senderOrigin(sender);
  return !!origin && PAGE_ORIGINS.includes(origin);
}

async function getSecret() {
  try {
    return (await chrome.storage.local.get(SECRET_KEY))[SECRET_KEY] || null;
  } catch {
    return null;
  }
}
async function setSecret(secret) {
  try {
    await chrome.storage.local.set({ [SECRET_KEY]: secret });
  } catch {
    /* tant pis */
  }
}

async function pushBuffer(item) {
  try {
    const cur = (await chrome.storage.local.get(BUFFER_KEY))[BUFFER_KEY] || [];
    cur.push(item);
    const trimmed = cur.length > BUFFER_MAX ? cur.slice(-BUFFER_MAX) : cur;
    await chrome.storage.local.set({ [BUFFER_KEY]: trimmed });
  } catch {
    /* storage indisponible : on perd l'item plutôt que de planter */
  }
}
async function drainBuffer() {
  try {
    const cur = (await chrome.storage.local.get(BUFFER_KEY))[BUFFER_KEY] || [];
    await chrome.storage.local.set({ [BUFFER_KEY]: [] });
    return cur;
  } catch {
    return [];
  }
}

/** Relaie une annonce détectée à la page, sinon la met en file. */
async function relayOrBuffer(payload) {
  if (pagePort) {
    try {
      pagePort.postMessage({ type: "terouva.detected", payload });
      return;
    } catch {
      pagePort = null; // port mort → on bufferise
    }
  }
  await pushBuffer(payload);
}

// ───────────────────────── CANAL A : connexion de la page /app ─────────────────────────

chrome.runtime.onConnectExternal.addListener((port) => {
  if (!originAllowed(port.sender)) {
    try {
      port.disconnect();
    } catch {
      /* déjà fermé */
    }
    return;
  }
  pagePort = port;

  port.onMessage.addListener(async (msg) => {
    if (!msg || typeof msg !== "object") return;
    if (msg.type === "terouva.hello") {
      // La page nous transmet son secret de handshake (généré côté app, persisté
      // en IndexedDB) → on le mémorise pour authentifier les échanges suivants.
      if (typeof msg.secret === "string" && msg.secret.length >= 16) {
        await setSecret(msg.secret);
      }
      port.postMessage({ type: "terouva.ready", extId: chrome.runtime.id });
    } else if (msg.type === "terouva.drain") {
      const secret = await getSecret();
      if (!secret || msg.secret !== secret) {
        port.postMessage({ type: "terouva.error", reason: "bad-secret" });
        return;
      }
      const items = await drainBuffer();
      port.postMessage({ type: "terouva.batch", items });
    }
  });

  port.onDisconnect.addListener(() => {
    if (pagePort === port) pagePort = null;
  });
});

// Messages one-shot de la page (ping de diagnostic, demande de notif).
chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  if (!originAllowed(sender)) {
    sendResponse?.({ ok: false, reason: "origin" });
    return false;
  }
  if (msg?.type === "terouva.ping") {
    sendResponse({ ok: true, type: "terouva.pong", extId: chrome.runtime.id });
    return false;
  }
  if (msg?.type === "terouva.notify" && msg.notif) {
    showNotif(msg.notif);
    sendResponse({ ok: true });
    return false;
  }
  return false;
});

// ───────────────────────── CANAL B : messages internes (content scripts) ─────────────────────────
// Câblés au LOT 6 (watch.js/content.js enverront `terouva.detected`).

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === "terouva.detected" && msg.payload) {
    relayOrBuffer(msg.payload);
    sendResponse?.({ ok: true });
    return false;
  }
  if (msg?.type === "terouva.notify" && msg.notif) {
    showNotif(msg.notif);
    sendResponse?.({ ok: true });
    return false;
  }
  return false;
});

// ───────────────────────── notifications « annonce chaude » ─────────────────────────

async function rememberUrl(id, url) {
  try {
    const cur = (await chrome.storage.session.get(URLS_KEY))[URLS_KEY] || {};
    cur[id] = url;
    const entries = Object.entries(cur);
    const trimmed = entries.length > 50 ? Object.fromEntries(entries.slice(-50)) : cur;
    await chrome.storage.session.set({ [URLS_KEY]: trimmed });
  } catch {
    /* tant pis pour le clic */
  }
}
async function recallUrl(id) {
  try {
    return (await chrome.storage.session.get(URLS_KEY))[URLS_KEY]?.[id] || null;
  } catch {
    return null;
  }
}

function showNotif(notif) {
  if (!notif || !notif.url) return;
  const id = "terouva:" + notif.url;
  rememberUrl(id, notif.url);
  chrome.notifications.create(id, {
    type: "basic",
    iconUrl: chrome.runtime.getURL("icons/128.png"),
    title: notif.title || "Terouva — annonce chaude",
    message: notif.body || "Une annonce correspond à ta recherche.",
    priority: 2,
    requireInteraction: true,
  });
}

chrome.notifications.onClicked.addListener(async (id) => {
  const url = await recallUrl(id);
  if (url) chrome.tabs.create({ url });
  chrome.notifications.clear(id);
});
