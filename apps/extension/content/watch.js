// Watch content script — runs on LBC search-result pages.
//
// Ce qu'il fait :
//  1. Indexe les annonces déjà visibles au chargement (pour ne pas renvoyer
//     toute la liste existante).
//  2. Installe un MutationObserver. Chaque nouvelle annonce qui apparaît est
//     extraite et envoyée au SERVICE WORKER de l'extension via
//     chrome.runtime.sendMessage({type:"terouva.detected", payload}). Le SW la
//     relaie à l'app web (/app) si elle est ouverte, sinon la met en file.
//  3. Affiche un petit overlay discret en bas à droite ("Terouva : N détectées").
//
// Ce qu'il NE fait PAS :
//  - Aucune automation du navigateur (pas d'auto-clic, d'auto-scroll, d'auto-
//    message). Le navigateur est celui de l'utilisateur, on observe.
//  - Aucune requête vers Leboncoin au-delà de ce que la page charge déjà.

(function () {
  if (window.__TEROUVA_WATCH_INJECTED__) return;
  window.__TEROUVA_WATCH_INJECTED__ = true;

  const ENABLED_KEY = "terouva.watchEnabled";

  const sentUrls = new Set(); // URLs d'annonces déjà envoyées
  let enabled = true;
  let stats = { sent: 0, last: null };
  let overlay = null;

  // -------- réglages ---------------------------------------------------------

  function loadEnabled() {
    return new Promise((resolve) => {
      chrome.storage.sync.get([ENABLED_KEY], (out) => {
        enabled = out[ENABLED_KEY] !== false;
        resolve(enabled);
      });
    });
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    if (ENABLED_KEY in changes) {
      enabled = changes[ENABLED_KEY].newValue !== false;
      refreshOverlay();
    }
  });

  // -------- extraction DOM --------------------------------------------------

  /**
   * Chaque annonce LBC dans une page de résultats est un <a href="/ad/...">.
   * On ne lit pas tous les détails (trop fragile aux changements de gabarit) :
   * juste de quoi avoir un aperçu utilisable ; le détail complet vient quand
   * l'utilisateur ouvre l'annonce (content.js).
   */
  function extractFromAnchor(a) {
    try {
      const href = a.getAttribute("href") || "";
      if (!href || (!/^\/ad\//i.test(href) && !/itemId-/i.test(href))) return null;
      const url = new URL(href, location.origin).toString();

      const idMatch = href.match(/itemId-(\d+)|\/ad\/[a-z0-9_-]+\/(\d+)/i);
      const externalId = idMatch ? idMatch[1] || idMatch[2] : null;

      const text = (a.textContent || "").replace(/\s+/g, " ").trim();
      const priceMatch = text.match(/([\d\s]+)\s*€/);
      const price = priceMatch
        ? parseInt(priceMatch[1].replace(/\s+/g, ""), 10) || null
        : null;
      const surfaceMatch = text.match(/(\d+)\s*m²/);
      const surface = surfaceMatch ? parseInt(surfaceMatch[1], 10) || null : null;

      const titleEl =
        a.querySelector("[data-test-id='adcard-title']") ||
        a.querySelector("p[role='heading']") ||
        a.querySelector("p") ||
        null;
      const title = (titleEl ? titleEl.textContent : text).trim().slice(0, 200);

      const img = a.querySelector("img");
      const imageSrc = img && (img.getAttribute("src") || img.getAttribute("data-src"));
      const images = imageSrc ? [imageSrc] : [];

      return {
        url,
        external_id: externalId,
        title: title || null,
        price,
        city: null,
        postal_code: null,
        surface,
        rooms: null,
        furnished: null,
        property_type: null,
        description: null,
        images,
        publisher_name: null,
        publisher_type: null,
        published_at: extractFreshness(text),
      };
    } catch {
      return null;
    }
  }

  // Estime la date de publication depuis le texte de la carte LBC (« il y a 5
  // minutes », « Aujourd'hui 14:32 », « Hier »…). Sert à n'ALERTER que pour les
  // annonces fraîches. Best-effort : renvoie null si on ne sait pas (dans ce cas
  // on n'empêche pas l'alerte — on ne bloque que les annonces visiblement vieilles).
  function extractFreshness(text) {
    try {
      const t = (text || "").toLowerCase();
      const now = Date.now();
      let m;
      if (/à l'instant|il y a quelques secondes|il y a moins d'une minute/.test(t)) {
        return new Date(now).toISOString();
      }
      if ((m = t.match(/il y a (\d+)\s*min/))) {
        return new Date(now - parseInt(m[1], 10) * 60000).toISOString();
      }
      if ((m = t.match(/il y a (?:environ )?(\d+)\s*(?:h|heure)/))) {
        return new Date(now - parseInt(m[1], 10) * 3600000).toISOString();
      }
      if ((m = t.match(/aujourd'hui[,\s]*(\d{1,2})[:h](\d{2})/))) {
        const d = new Date();
        d.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
        return d.toISOString();
      }
      if ((m = t.match(/il y a (\d+)\s*jour/))) {
        return new Date(now - parseInt(m[1], 10) * 86400000).toISOString();
      }
      if (/\bhier\b/.test(t)) {
        return new Date(now - 86400000).toISOString();
      }
      // Date absolue ou rien de reconnaissable → indéterminé.
      return null;
    } catch {
      return null;
    }
  }

  function findAdAnchors(root) {
    return Array.from(
      root.querySelectorAll(
        "a[href^='/ad/'], a[href*='/itemId-'], a[data-test-id='ad']",
      ),
    );
  }

  // -------- envoi au service worker -----------------------------------------

  function sendDetected(data) {
    try {
      chrome.runtime.sendMessage({
        type: "terouva.detected",
        payload: {
          app: "terouva",
          type: "listing-watch",
          version: 1,
          captured_at: new Date().toISOString(),
          data,
        },
      });
      stats.sent++;
      stats.last = data.title || data.url;
      refreshOverlay();
    } catch {
      /* SW momentanément indisponible : l'annonce sera revue au prochain refresh */
    }
  }

  // -------- détection -------------------------------------------------------

  function indexExisting() {
    for (const a of findAdAnchors(document)) {
      const data = extractFromAnchor(a);
      if (data?.url) sentUrls.add(data.url);
    }
  }

  function dispatchNew(a) {
    if (!enabled) return;
    const data = extractFromAnchor(a);
    if (!data?.url) return;
    if (sentUrls.has(data.url)) return;
    sentUrls.add(data.url);
    sendDetected(data);
  }

  function watchMutations() {
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== "childList") continue;
        for (const node of m.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          if (
            node.matches &&
            (node.matches("a[href^='/ad/']") || node.matches("a[href*='/itemId-']"))
          ) {
            dispatchNew(node);
          }
          if (node.querySelectorAll) {
            for (const a of findAdAnchors(node)) dispatchNew(a);
          }
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  // -------- overlay ---------------------------------------------------------

  function buildOverlay() {
    const el = document.createElement("div");
    el.id = "terouva-overlay";
    el.style.cssText = [
      "position:fixed", "right:16px", "bottom:16px", "z-index:2147483647",
      "background:#0a0a0b", "color:#ededee", "border:1px solid #2c2c33",
      "border-radius:10px", "padding:10px 14px",
      "font:13px/1.4 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
      "box-shadow:0 8px 32px -8px rgba(0,0,0,0.5)", "max-width:280px",
      "pointer-events:auto", "user-select:none",
    ].join(";");

    const dot = document.createElement("span");
    dot.style.cssText =
      "display:inline-block;width:8px;height:8px;border-radius:50%;background:#7EE8C8;margin-right:8px;vertical-align:middle";
    el.appendChild(dot);

    const txt = document.createElement("span");
    txt.id = "terouva-overlay-text";
    txt.textContent = "Terouva : initialisation…";
    el.appendChild(txt);

    const hint = document.createElement("div");
    hint.id = "terouva-overlay-hint";
    hint.style.cssText = "margin-top:4px;font-size:11px;color:#a3a3aa";
    el.appendChild(hint);

    el.addEventListener("dblclick", () => el.remove());
    el.title = "Double-cliquez pour masquer.";
    return el;
  }

  function refreshOverlay(hint) {
    if (!overlay || !document.body.contains(overlay)) {
      overlay = buildOverlay();
      document.body.appendChild(overlay);
    }
    const txt = overlay.querySelector("#terouva-overlay-text");
    const hintEl = overlay.querySelector("#terouva-overlay-hint");
    const dot = overlay.firstChild;
    if (!enabled) {
      txt.textContent = "Terouva : surveillance en pause";
      if (dot) dot.style.background = "#6f6f78";
    } else {
      txt.textContent = `Terouva : ${stats.sent} annonce${stats.sent > 1 ? "s" : ""} détectée${stats.sent > 1 ? "s" : ""}`;
      if (dot) dot.style.background = "#7EE8C8";
    }
    if (hint) {
      hintEl.textContent = hint;
    } else if (stats.last) {
      hintEl.textContent = `dernière : ${stats.last.slice(0, 60)}${stats.last.length > 60 ? "…" : ""}`;
    } else {
      hintEl.textContent = "gardez cette page ouverte pour la détection en direct.";
    }
  }

  // -------- démarrage -------------------------------------------------------

  loadEnabled().then(() => {
    indexExisting();
    refreshOverlay();
    watchMutations();
  });
})();
