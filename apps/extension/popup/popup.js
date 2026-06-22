// Popup de l'extension Terouva.
//
// Plus de serveur local ni de token : l'extension envoie les annonces détectées
// au service worker, qui les relaie à l'application web (/app). Le popup sert à :
//  - activer/désactiver la surveillance,
//  - ouvrir l'application Terouva,
//  - capturer l'annonce de l'onglet courant (copier le JSON / l'envoyer à l'app).

const APP_URL = "https://terouva.vercel.app/app";
const ENABLED_KEY = "terouva.watchEnabled";

const $ = (id) => document.getElementById(id);

// -------- onglets ------------------------------------------------------------

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".panel").forEach((p) =>
      p.classList.toggle("hidden", p.dataset.panel !== target),
    );
    if (target === "capture") initCapture();
  });
});

// -------- réglage surveillance ----------------------------------------------

function loadEnabled() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([ENABLED_KEY], (out) => {
      resolve(out[ENABLED_KEY] !== false);
    });
  });
}
function saveEnabled(enabled) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [ENABLED_KEY]: enabled }, () => resolve());
  });
}

function setStatus(enabled) {
  $("conn-dot").className = enabled ? "dot dot-ok" : "dot dot-off";
  $("conn-text").textContent = enabled ? "active" : "en pause";
  $("watch-state").textContent = enabled ? "Surveillance active" : "Surveillance en pause";
  $("watch-tip").textContent = enabled
    ? "Gardez une page de recherche Leboncoin ouverte : chaque nouvelle annonce part vers l'application."
    : "Réactivez la surveillance pour détecter les nouvelles annonces.";
}

function openApp() {
  chrome.tabs.create({ url: APP_URL });
}

// -------- capture (annonce de l'onglet courant) ------------------------------

let captureInited = false;
let capturePayload = null;

async function initCapture() {
  if (captureInited) return;
  captureInited = true;
  showCaptureState("loading");
  try {
    const tab = await getActiveTab();
    if (!tab?.url || !/^https:\/\/(www\.)?leboncoin\.fr\//.test(tab.url)) {
      return captureFail("Cette page n'est pas une annonce Leboncoin.");
    }
    capturePayload = await extractActiveAd(tab.id);
    if (!capturePayload || !capturePayload.data?.url) {
      return captureFail("Impossible de lire une annonce ici.");
    }
    $("capture-title").textContent = capturePayload.data.title || "(sans titre)";
    $("capture-meta").textContent = fmtMeta(capturePayload.data) || "—";
    showCaptureState("ready");

    $("capture-clipboard").addEventListener("click", async () => {
      await navigator.clipboard.writeText(JSON.stringify(capturePayload, null, 2));
      showCaptureFeedback("ok", "JSON copié.");
    });
    $("capture-send").addEventListener("click", () => {
      try {
        chrome.runtime.sendMessage({ type: "terouva.detected", payload: capturePayload });
        showCaptureFeedback("ok", "Envoyée à l'application.");
      } catch {
        showCaptureFeedback("ko", "Application momentanément indisponible.");
      }
    });
  } catch (e) {
    captureFail(e?.message || String(e));
  }
}

function captureFail(msg) {
  $("capture-error-text").textContent = msg;
  showCaptureState("error");
}
function showCaptureState(state) {
  for (const s of ["loading", "error", "ready"]) {
    $("capture-" + s).classList.toggle("hidden", s !== state);
  }
}
function showCaptureFeedback(kind, msg) {
  const el = $("capture-feedback");
  el.className = `feedback ${kind}`;
  el.textContent = msg;
  el.classList.remove("hidden");
}
function fmtMeta(d) {
  const bits = [];
  if (d.price != null) bits.push(`${d.price}€`);
  if (d.surface != null) bits.push(`${d.surface}m²`);
  if (d.rooms != null) bits.push(`${d.rooms} pièces`);
  if (d.city) bits.push(d.city);
  return bits.join(" · ");
}
async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}
async function extractActiveAd(tabId) {
  await chrome.scripting.executeScript({ target: { tabId }, files: ["content/content.js"] });
  const [result] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => (typeof window.__TEROUVA_EXTRACT__ === "function" ? window.__TEROUVA_EXTRACT__() : null),
  });
  return result?.result ?? null;
}

// -------- démarrage ----------------------------------------------------------

(async function boot() {
  const enabled = await loadEnabled();
  $("watch-enabled").checked = enabled;
  setStatus(enabled);

  $("watch-enabled").addEventListener("change", async (e) => {
    await saveEnabled(e.target.checked);
    setStatus(e.target.checked);
  });

  // Le bouton « Connecter » et le lien « Reconnecter » ouvrent désormais l'app.
  const openBtn = $("connect-btn");
  openBtn.textContent = "Ouvrir l'application Terouva";
  openBtn.classList.remove("hidden");
  openBtn.addEventListener("click", openApp);
  $("reconnect-link").addEventListener("click", (e) => {
    e.preventDefault();
    openApp();
  });
})();
