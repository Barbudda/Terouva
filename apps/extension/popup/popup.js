// Popup script — 3 tabs: Surveillance, Capture URL, Réglages.

const STORAGE = {
  serverUrl: "terouva.serverUrl",
  token: "terouva.token",
  enabled: "terouva.watchEnabled",
};
const DEFAULT_SERVER = "http://127.0.0.1:8765";

const $ = (id) => document.getElementById(id);

// -------- tabs ---------------------------------------------------------------

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    document.querySelectorAll(".tab").forEach((b) =>
      b.classList.toggle("active", b === btn),
    );
    document.querySelectorAll(".panel").forEach((p) =>
      p.classList.toggle("hidden", p.dataset.panel !== target),
    );
    if (target === "capture") initCapture();
    if (target === "watch") refreshWatchPanel();
  });
});

// -------- storage helpers ----------------------------------------------------

function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      [STORAGE.serverUrl, STORAGE.token, STORAGE.enabled],
      (out) => {
        resolve({
          serverUrl: out[STORAGE.serverUrl] || DEFAULT_SERVER,
          token: out[STORAGE.token] || "",
          enabled:
            typeof out[STORAGE.enabled] === "boolean" ? out[STORAGE.enabled] : true,
        });
      },
    );
  });
}

function saveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(
      {
        [STORAGE.serverUrl]: settings.serverUrl,
        [STORAGE.token]: settings.token,
        [STORAGE.enabled]: settings.enabled,
      },
      () => resolve(),
    );
  });
}

// -------- connection check ---------------------------------------------------

async function pingServer(settings) {
  const base = (settings.serverUrl || DEFAULT_SERVER).replace(/\/+$/, "");
  try {
    const resp = await fetch(`${base}/health`, { method: "GET" });
    if (!resp.ok) return { ok: false, reason: `HTTP ${resp.status}` };
    const data = await resp.json();
    if (data?.app !== "terouva") return { ok: false, reason: "réponse inattendue" };
    if (!data.listening) return { ok: false, reason: "app prête mais token non poussé — relance l'app" };
    return { ok: true, version: data.version };
  } catch {
    return { ok: false, reason: "app injoignable" };
  }
}

async function pingAuth(settings) {
  if (!settings.token) return { ok: false, reason: "token vide" };
  const base = (settings.serverUrl || DEFAULT_SERVER).replace(/\/+$/, "");
  try {
    const resp = await fetch(`${base}/searches/active`, {
      method: "GET",
      headers: { Authorization: `Bearer ${settings.token}` },
    });
    if (resp.status === 401) return { ok: false, reason: "token rejeté" };
    if (!resp.ok) return { ok: false, reason: `HTTP ${resp.status}` };
    return { ok: true };
  } catch {
    return { ok: false, reason: "app injoignable" };
  }
}

async function refreshConnStatus() {
  const dot = $("conn-dot");
  const txt = $("conn-text");
  const settings = await loadSettings();
  const health = await pingServer(settings);
  if (!health.ok) {
    dot.className = "dot dot-off";
    txt.textContent = "OFF";
    return;
  }
  if (!settings.token) {
    dot.className = "dot dot-warn";
    txt.textContent = "Token ?";
    return;
  }
  const auth = await pingAuth(settings);
  if (!auth.ok) {
    dot.className = "dot dot-warn";
    txt.textContent = auth.reason || "auth?";
    return;
  }
  dot.className = "dot dot-ok";
  txt.textContent = "ON";
}

// -------- watch panel --------------------------------------------------------

async function refreshWatchPanel() {
  const settings = await loadSettings();
  $("watch-state").textContent = settings.enabled
    ? "Surveillance active"
    : "Surveillance désactivée";
  $("watch-tip").innerHTML = settings.token
    ? `Connecté à <code>${escapeHtml(settings.serverUrl)}</code>`
    : `Token non configuré — onglet <strong>Réglages</strong>`;
}

// -------- settings panel -----------------------------------------------------

async function bootSettingsPanel() {
  const settings = await loadSettings();
  $("server-url").value = settings.serverUrl;
  $("token").value = settings.token;
  $("watch-enabled").checked = settings.enabled !== false;

  $("save-settings").addEventListener("click", async () => {
    const newSettings = {
      serverUrl: $("server-url").value.trim() || DEFAULT_SERVER,
      token: $("token").value.trim(),
      enabled: $("watch-enabled").checked,
    };
    await saveSettings(newSettings);
    showSettingsFeedback("ok", "Enregistré.");
    refreshConnStatus();
    refreshWatchPanel();
  });

  $("test-conn").addEventListener("click", async () => {
    showSettingsFeedback("ok", "Test en cours…");
    const settings = await loadSettings();
    const h = await pingServer(settings);
    if (!h.ok) return showSettingsFeedback("ko", `App non joignable : ${h.reason}`);
    const a = await pingAuth(settings);
    if (!a.ok) return showSettingsFeedback("ko", `Auth échouée : ${a.reason}`);
    showSettingsFeedback("ok", `OK — Terouva v${h.version || "?"} répond.`);
    refreshConnStatus();
  });
}

function showSettingsFeedback(kind, msg) {
  const el = $("settings-feedback");
  el.className = `feedback ${kind}`;
  el.textContent = msg;
  el.classList.remove("hidden");
}

// -------- capture panel (single-URL, kept from v0.1) ------------------------

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
    if (!payload || !payload.data?.url) {
      return captureFail("Impossible de lire une annonce sur cette page.");
    }
    $("capture-title").textContent = payload.data.title || "(sans titre)";
    $("capture-meta").textContent = fmtMeta(payload.data) || "—";
    showCaptureState("ready");

    $("capture-clipboard").addEventListener("click", async () => {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      showCaptureFeedback("ok", "JSON copié. Colle-le dans Terouva (Annonces).");
    });
    $("capture-send").addEventListener("click", async () => {
      const settings = await loadSettings();
      if (!settings.token) {
        return showCaptureFeedback("ko", "Token absent — onglet Réglages.");
      }
      try {
        const resp = await fetch(
          `${settings.serverUrl.replace(/\/+$/, "")}/ingest/listing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${settings.token}`,
            },
            body: JSON.stringify({
              ...payload,
              type: "listing-clipboard",
            }),
          },
        );
        if (!resp.ok) {
          return showCaptureFeedback("ko", `App refusée (HTTP ${resp.status})`);
        }
        showCaptureFeedback("ok", "Envoyée à l'app Terouva.");
      } catch {
        showCaptureFeedback("ko", "App Terouva injoignable.");
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
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["content/content.js"],
  });
  const [result] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      if (typeof window.__TEROUVA_EXTRACT__ === "function") {
        return window.__TEROUVA_EXTRACT__();
      }
      return null;
    },
  });
  return result?.result ?? null;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
  );
}

// -------- boot ---------------------------------------------------------------

(async function boot() {
  await bootSettingsPanel();
  await refreshWatchPanel();
  refreshConnStatus();
  setInterval(refreshConnStatus, 5000);
})();
