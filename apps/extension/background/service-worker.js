// Terouva — background service worker (MV3).
//
// Rôle unique : AFFICHER les notifications « annonce chaude ».
// `chrome.notifications` n'est pas accessible depuis un content script ; c'est
// donc ici qu'on crée la notif. Le content script `watch.js` (contexte long sur
// la page LBC) interroge l'app locale (GET /notifications/pending), puis nous
// transmet chaque item via `chrome.runtime.sendMessage`.
//
// Au clic sur la notif → on ouvre l'annonce LBC dans un nouvel onglet.
// PRINCIPE : on n'automatise rien sur LBC. On notifie, l'humain décide.

// Map id→url, persistée en storage.session car le SW peut être recyclé entre
// la création de la notif et le clic.
const URLS_KEY = "terouva.notifUrls";

async function rememberUrl(id, url) {
  try {
    const cur = (await chrome.storage.session.get(URLS_KEY))[URLS_KEY] || {};
    cur[id] = url;
    // borne : on ne garde que les 50 dernières correspondances
    const entries = Object.entries(cur);
    const trimmed = entries.length > 50 ? Object.fromEntries(entries.slice(-50)) : cur;
    await chrome.storage.session.set({ [URLS_KEY]: trimmed });
  } catch (e) {
    /* storage.session indisponible : tant pis pour le clic */
  }
}

async function recallUrl(id) {
  try {
    const cur = (await chrome.storage.session.get(URLS_KEY))[URLS_KEY] || {};
    return cur[id] || null;
  } catch (e) {
    return null;
  }
}

function showNotif(notif) {
  if (!notif || !notif.url) return;
  // id stable basé sur l'URL → Chrome remplace au lieu d'empiler les doublons.
  const id = "terouva:" + notif.url;
  rememberUrl(id, notif.url);
  chrome.notifications.create(id, {
    type: "basic",
    iconUrl: chrome.runtime.getURL("icons/128.png"),
    title: notif.title || "Terouva — annonce chaude",
    message: notif.body || "Une annonce correspond à ta recherche.",
    priority: 2,
    requireInteraction: true, // reste affichée jusqu'à action de l'utilisateur
  });
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === "terouva-notify" && msg.notif) {
    showNotif(msg.notif);
    sendResponse({ ok: true });
  }
  return false;
});

chrome.notifications.onClicked.addListener(async (id) => {
  const url = await recallUrl(id);
  if (url) chrome.tabs.create({ url });
  chrome.notifications.clear(id);
});
