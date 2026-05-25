// Watch content script — runs on LBC search-result pages.
//
// What it does:
//  1. Indexes every ad card already visible on initial load (so we don't
//     spam the app with the existing list).
//  2. Installs a MutationObserver on the document body. Each time a new
//     ad link appears (LBC re-renders the list on infinite scroll / refresh /
//     internal fetch), we extract minimal data and POST it to the Terouva
//     desktop app's local HTTP server at 127.0.0.1:8765 (or whatever the
//     user configured in the popup).
//  3. Shows a small unobtrusive overlay at the bottom-right of the page
//     so the user knows it's working ("Terouva: 5 envoyées").
//
// What it doesn't do:
//  - No automation of the browser (no auto-click, no auto-scroll, no
//    auto-message). The browser is the user's, we just observe.
//  - No requests to LBC beyond what the page itself loads.

(function () {
  if (window.__TEROUVA_WATCH_INJECTED__) return;
  window.__TEROUVA_WATCH_INJECTED__ = true;

  const STORAGE_KEYS = {
    serverUrl: "terouva.serverUrl",
    token: "terouva.token",
    enabled: "terouva.watchEnabled",
  };
  const DEFAULT_SERVER = "http://127.0.0.1:8765";

  const sentUrls = new Set(); // canonicalized LBC ad URLs we already POSTed
  let settings = { serverUrl: DEFAULT_SERVER, token: "", enabled: true };
  let stats = { sent: 0, errors: 0, last: null };
  let overlay = null;

  // -------- settings ---------------------------------------------------------

  function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(
        [STORAGE_KEYS.serverUrl, STORAGE_KEYS.token, STORAGE_KEYS.enabled],
        (out) => {
          settings = {
            serverUrl: out[STORAGE_KEYS.serverUrl] || DEFAULT_SERVER,
            token: out[STORAGE_KEYS.token] || "",
            enabled:
              typeof out[STORAGE_KEYS.enabled] === "boolean"
                ? out[STORAGE_KEYS.enabled]
                : true,
          };
          resolve(settings);
        },
      );
    });
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    if (STORAGE_KEYS.serverUrl in changes) {
      settings.serverUrl = changes[STORAGE_KEYS.serverUrl].newValue || DEFAULT_SERVER;
    }
    if (STORAGE_KEYS.token in changes) {
      settings.token = changes[STORAGE_KEYS.token].newValue || "";
    }
    if (STORAGE_KEYS.enabled in changes) {
      settings.enabled = changes[STORAGE_KEYS.enabled].newValue !== false;
      refreshOverlay();
    }
  });

  // -------- DOM extraction --------------------------------------------------

  /**
   * Each LBC ad in a results page is rendered as <a href="/ad/...">.
   * We don't try to read every detail (we'd be brittle to layout changes).
   * Just enough so the app has a usable preview, full data comes from the
   * detail-page parser when the user clicks open.
   */
  function extractFromAnchor(a) {
    try {
      const href = a.getAttribute("href") || "";
      if (!href || !/^\/ad\//i.test(href) && !/itemId-/i.test(href)) return null;
      const url = new URL(href, location.origin).toString();

      // External id
      const idMatch = href.match(/itemId-(\d+)|\/ad\/[a-z0-9_-]+\/(\d+)/i);
      const externalId = idMatch ? idMatch[1] || idMatch[2] : null;

      // Best-effort: pull text bits. LBC frequently changes class names but
      // ad cards usually have: title, price, location, surface as visible text.
      const text = (a.textContent || "").replace(/\s+/g, " ").trim();
      const priceMatch = text.match(/([\d\s]+)\s*€/);
      const price = priceMatch
        ? parseInt(priceMatch[1].replace(/\s+/g, ""), 10) || null
        : null;
      const surfaceMatch = text.match(/(\d+)\s*m²/);
      const surface = surfaceMatch ? parseInt(surfaceMatch[1], 10) || null : null;

      // Title is the first visible non-empty title-like element in the anchor,
      // commonly an <p> with role/heading or a <span> with a high font-weight.
      // Fallback to first 80 chars of textContent.
      const titleEl =
        a.querySelector("[data-test-id='adcard-title']") ||
        a.querySelector("p[role='heading']") ||
        a.querySelector("p") ||
        null;
      const title = (titleEl ? titleEl.textContent : text).trim().slice(0, 200);

      // Image (thumbnail) when available
      const img = a.querySelector("img");
      const imageSrc =
        img && (img.getAttribute("src") || img.getAttribute("data-src"));
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
        published_at: null,
      };
    } catch (e) {
      return null;
    }
  }

  function findAdAnchors(root) {
    // Be tolerant: anything that looks like an ad link on LBC.
    return Array.from(
      root.querySelectorAll(
        "a[href^='/ad/'], a[href*='/itemId-'], a[data-test-id='ad']",
      ),
    );
  }

  // -------- network ---------------------------------------------------------

  async function postListing(data) {
    if (!settings.token) {
      stats.errors++;
      refreshOverlay("Token Terouva manquant — ouvre le popup pour le configurer.");
      return false;
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
            app: "terouva",
            type: "listing-watch",
            version: 1,
            captured_at: new Date().toISOString(),
            data,
          }),
        },
      );
      if (!resp.ok) {
        stats.errors++;
        refreshOverlay(`Terouva a refusé : HTTP ${resp.status}`);
        return false;
      }
      stats.sent++;
      stats.last = data.title || data.url;
      refreshOverlay();
      return true;
    } catch (e) {
      stats.errors++;
      refreshOverlay("App Terouva injoignable. Lance-la puis recharge la page.");
      return false;
    }
  }

  // -------- detection -------------------------------------------------------

  function indexExisting() {
    const anchors = findAdAnchors(document);
    for (const a of anchors) {
      const data = extractFromAnchor(a);
      if (data?.url) sentUrls.add(data.url);
    }
  }

  async function dispatchNew(a) {
    if (!settings.enabled) return;
    const data = extractFromAnchor(a);
    if (!data?.url) return;
    if (sentUrls.has(data.url)) return;
    sentUrls.add(data.url);
    await postListing(data);
  }

  function watchMutations() {
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== "childList") continue;
        for (const node of m.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          // The added node may itself be an anchor or contain anchors.
          if (
            node.matches &&
            (node.matches("a[href^='/ad/']") ||
              node.matches("a[href*='/itemId-']"))
          ) {
            dispatchNew(node);
          }
          if (node.querySelectorAll) {
            for (const a of findAdAnchors(node)) {
              dispatchNew(a);
            }
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
      "position:fixed",
      "right:16px",
      "bottom:16px",
      "z-index:2147483647",
      "background:#0a0a0b",
      "color:#ededee",
      "border:1px solid #2c2c33",
      "border-radius:10px",
      "padding:10px 14px",
      "font:13px/1.4 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
      "box-shadow:0 8px 32px -8px rgba(0,0,0,0.5)",
      "max-width:280px",
      "pointer-events:auto",
      "user-select:none",
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
    el.title = "Double-clique pour cacher.";
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
    if (!settings.enabled) {
      txt.textContent = "Terouva : surveillance désactivée";
      if (dot) dot.style.background = "#6f6f78";
    } else if (!settings.token) {
      txt.textContent = "Terouva : token non configuré";
      if (dot) dot.style.background = "#FFB84D";
    } else {
      txt.textContent = `Terouva : ${stats.sent} annonce${stats.sent > 1 ? "s" : ""} envoyée${stats.sent > 1 ? "s" : ""}`;
      if (dot) dot.style.background = "#7EE8C8";
    }
    if (hint) {
      hintEl.textContent = hint;
    } else if (stats.last) {
      hintEl.textContent = `dernière : ${stats.last.slice(0, 60)}${stats.last.length > 60 ? "…" : ""}`;
    } else {
      hintEl.textContent = "garde cette page ouverte pour la surveillance live.";
    }
  }

  // -------- boot ------------------------------------------------------------

  loadSettings().then(() => {
    indexExisting();
    refreshOverlay();
    watchMutations();
  });
})();
