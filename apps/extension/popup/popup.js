// Popup — connexion auto à l'app Terouva (zéro token à coller) + capture one-shot.
//
// Flux d'appairage « Autoriser cette extension » :
//  1. On découvre le port de l'app (8765→8769) via /health.
//  2. Si on a déjà un token valide → connecté.
//  3. Sinon POST /pair/request → l'app affiche « Autoriser cette extension ? ».
//     On poll /pair/status/:id jusqu'à approbation → on stocke le token.
// L'utilisateur ne tape jamais rien : un clic « Autoriser » dans l'app suffit.

const STORAGE = {
  serverUrl: "terouva.serverUrl",
  token: "terouva.token",
  enabled: "terouva.watchEnabled",
};
const PORTS = [8765, 8766, 8767, 8768, 8769];
const EXT_LABEL = "Terouva — Surveillance Leboncoin";

const $ = (id) => document.getElementById(id);

// -------- tabs ---------------------------------------------------------------

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

// -------- storage ------------------------------------------------------------

function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([STORAGE.serverUrl, STORAGE.token, STORAGE.enabled], (out) => {
      resolve({
        serverUrl: out[STORAGE.serverUrl] || "",
        token: out[STORAGE.token] || "",
        enabled: typeof out[STORAGE.enabled] === "boolean" ? out[STORAGE.enabled] : true,
      });
    });
  });
}
function saveSettings(patch) {
  return new Promise((resolve) => {
    const o = {};
    if (patch.serverUrl !== undefined) o[STORAGE.serverUrl] = patch.serverUrl;
    if (patch.token !== undefined) o[STORAGE.token] = patch.token;
    if (patch.enabled !== undefined) o[STORAGE.enabled] = patch.enabled;
    chrome.storage.sync.set(o, () => resolve());
  });
}

// -------- discovery + pairing ------------------------------------------------

/** Trouve l'app : premier port qui répond app=terouva. */
async function discoverBase() {
  for (const port of PORTS) {
    const base = `http://127.0.0.1:${port}`;
    try {
      const r = await fetch(`${base}/health`, { method: "GET" });
      if (!r.ok) continue;
      const d = await r.json();
      if (d?.app === "terouva") return base;
    } catch {
      /* port fermé, on continue */
    }
  }
  return null;
}

/** Vérifie qu'un token est accepté par l'app. */
async function tokenWorks(base, token) {
  if (!token) return false;
  try {
    const r = await fetch(`${base}/searches/active`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return r.status !== 401 && r.ok;
  } catch {
    return false;
  }
}

/** Lance l'appairage et attend l'autorisation côté app (~60 s max). */
async function pairWithApp(base, onWait) {
  const req = await fetch(`${base}/pair/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ext_id: chrome.runtime.id, label: EXT_LABEL }),
  });
  if (!req.ok) throw new Error(`pair/request HTTP ${req.status}`);
  const { request_id } = await req.json();
  if (!request_id) throw new Error("pas de request_id");

  for (let i = 0; i < 30; i++) {
    onWait?.(i);
    await new Promise((r) => setTimeout(r, 2000));
    let st;
    try {
      st = await (await fetch(`${base}/pair/status/${request_id}`)).json();
    } catch {
      continue;
    }
    if (st.status === "approved" && st.token) return st.token;
    if (st.status === "denied") throw new Error("refusé");
  }
  throw new Error("délai dépassé");
}

// -------- état connexion -----------------------------------------------------

function setConn(state, text) {
  $("conn-dot").className = `dot dot-${state}`; // ok | warn | off
  $("conn-text").textContent = text;
}
function setWatch(title, tip) {
  $("watch-state").textContent = title;
  if (tip !== undefined) $("watch-tip").textContent = tip;
}
function feedback(kind, msg) {
  const el = $("connect-feedback");
  el.className = `feedback ${kind}`;
  el.textContent = msg;
  el.classList.remove("hidden");
}

/** Coeur : découvre, vérifie le token, sinon appaire. */
async function ensureConnected({ forcePair = false } = {}) {
  $("connect-btn").classList.add("hidden");
  setConn("warn", "…");
  setWatch("Connexion…", "Recherche de l'app Terouva sur ta machine…");

  const base = await discoverBase();
  if (!base) {
    setConn("off", "OFF");
    setWatch("App Terouva introuvable", "Lance l'application Terouva, puis clique « Connecter à l'app ».");
    $("connect-btn").textContent = "Réessayer";
    $("connect-btn").classList.remove("hidden");
    return;
  }

  const s = await loadSettings();
  if (!forcePair && (await tokenWorks(base, s.token))) {
    await saveSettings({ serverUrl: base });
    setConn("ok", "ON");
    setWatch("Connecté ✓", "Surveillance prête. Ouvre une recherche Leboncoin.");
    return;
  }

  // Appairage.
  setWatch("Autorisation requise", "Va dans l'app Terouva et clique « Autoriser cette extension ».");
  feedback("ok", "En attente de ton autorisation dans l'app…");
  try {
    const token = await pairWithApp(base);
    await saveSettings({ serverUrl: base, token });
    $("connect-feedback").classList.add("hidden");
    setConn("ok", "ON");
    setWatch("Connecté ✓", "Surveillance prête. Ouvre une recherche Leboncoin.");
  } catch (e) {
    setConn("off", "OFF");
    const why = e?.message === "refusé" ? "Demande refusée." : e?.message === "délai dépassé" ? "Pas de réponse de l'app." : "Échec de l'appairage.";
    setWatch("Non connecté", why);
    feedback("ko", `${why} Clique « Connecter à l'app » pour réessayer.`);
    $("connect-btn").textContent = "Connecter à l'app";
    $("connect-btn").classList.remove("hidden");
  }
}

// -------- capture (inchangé, utilise le token stocké) ------------------------

let captureInited = false;
async function initCapture() {
  if (captureInited) return;
  captureInited = true;
  showCaptureState("loading");
  try {
    const tab = await getActiveTab();
    if (!tab?.url || !/^https:\/\/(www\.)?leboncoin\.fr\//.test(tab.url)) {
      return captureFail("Cette page n'est pas Leboncoin.");
    }
    const payload = await extractActiveAd(tab.id);
    if (!payload || !payload.data?.url) return captureFail("Impossible de lire une annonce ici.");
    $("capture-title").textContent = payload.data.title || "(sans titre)";
    $("capture-meta").textContent = fmtMeta(payload.data) || "—";
    showCaptureState("ready");

    $("capture-clipboard").addEventListener("click", async () => {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      showCaptureFeedback("ok", "JSON copié.");
    });
    $("capture-send").addEventListener("click", async () => {
      const s = await loadSettings();
      if (!s.serverUrl || !s.token) return showCaptureFeedback("ko", "Pas connecté — onglet Connexion.");
      try {
        const resp = await fetch(`${s.serverUrl.replace(/\/+$/, "")}/ingest/listing`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${s.token}` },
          body: JSON.stringify({ ...payload, type: "listing-clipboard" }),
        });
        if (!resp.ok) return showCaptureFeedback("ko", `App refusée (HTTP ${resp.status})`);
        showCaptureFeedback("ok", "Envoyée à l'app.");
      } catch {
        showCaptureFeedback("ko", "App injoignable.");
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

// -------- boot ---------------------------------------------------------------

(async function boot() {
  const s = await loadSettings();
  $("watch-enabled").checked = s.enabled !== false;
  $("watch-enabled").addEventListener("change", (e) => saveSettings({ enabled: e.target.checked }));
  $("connect-btn").addEventListener("click", () => ensureConnected({ forcePair: true }));
  $("reconnect-link").addEventListener("click", (e) => {
    e.preventDefault();
    ensureConnected({ forcePair: true });
  });
  ensureConnected();
})();
