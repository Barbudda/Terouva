// Content script — runs on Leboncoin ad pages.
// Exposes window.__TEROUVA_EXTRACT__() that parses the current page and returns a Terouva payload.
// The popup invokes this via chrome.scripting.executeScript.

(function () {
  if (window.__TEROUVA_INJECTED__) return;
  window.__TEROUVA_INJECTED__ = true;

  function extractFromNextData() {
    const el = document.getElementById("__NEXT_DATA__");
    if (!el) return null;
    try {
      const root = JSON.parse(el.textContent);
      const ad =
        root?.props?.pageProps?.ad ?? root?.props?.pageProps?.data ?? null;
      if (!ad) return null;
      const data = {
        url: location.href,
        external_id:
          (ad.list_id && String(ad.list_id)) ||
          (typeof ad.id === "string" ? ad.id : null),
        title: ad.subject ?? null,
        description: ad.body ?? null,
        published_at: ad.first_publication_date ?? ad.index_date ?? null,
        price: null,
        city: null,
        postal_code: null,
        surface: null,
        rooms: null,
        furnished: null,
        property_type: null,
        publisher_name: null,
        publisher_type: null,
        images: [],
      };
      if (Array.isArray(ad.price) && typeof ad.price[0] === "number") {
        data.price = ad.price[0];
      } else if (typeof ad.price === "number") {
        data.price = ad.price;
      }
      if (ad.location) {
        data.city = ad.location.city ?? null;
        data.postal_code = ad.location.zipcode ?? null;
      }
      if (ad.owner) {
        data.publisher_name = ad.owner.name ?? ad.owner.user_id ?? null;
        data.publisher_type = ad.owner.type ?? null;
      }
      if (Array.isArray(ad.attributes)) {
        for (const attr of ad.attributes) {
          const key = attr?.key;
          const value = attr?.value ?? attr?.value_label ?? "";
          if (key === "square") data.surface = parseInt(value, 10) || null;
          else if (key === "rooms") data.rooms = parseInt(value, 10) || null;
          else if (key === "real_estate_type") data.property_type = value || null;
          else if (key === "furnished")
            data.furnished = value === "1" || /meubl/i.test(value);
        }
      }
      if (ad.images?.urls && Array.isArray(ad.images.urls)) {
        data.images = ad.images.urls.slice(0, 12);
      }
      return data;
    } catch (e) {
      console.warn("[Terouva] __NEXT_DATA__ parse failed:", e);
      return null;
    }
  }

  function extractFromMeta() {
    const get = (sel) =>
      document.querySelector(sel)?.getAttribute("content") ?? null;
    return {
      url: location.href,
      external_id: null,
      title: get('meta[property="og:title"]'),
      description: get('meta[property="og:description"]'),
      published_at: null,
      price: null,
      city: null,
      postal_code: null,
      surface: null,
      rooms: null,
      furnished: null,
      property_type: null,
      publisher_name: null,
      publisher_type: null,
      images: [get('meta[property="og:image"]')].filter(Boolean),
    };
  }

  window.__TEROUVA_EXTRACT__ = function () {
    const data = extractFromNextData() ?? extractFromMeta();
    return {
      app: "terouva",
      type: "listing-clipboard",
      version: 1,
      captured_at: new Date().toISOString(),
      data,
    };
  };

  // ── Auto-enrichissement on-thesis ─────────────────────────────────────────
  // Quand l'utilisateur OUVRE une annonce (sa propre navigation), on envoie le
  // détail complet à l'app en type "listing-detail". L'app ENRICHIT la fiche
  // déjà détectée (description, ville, pièces…) et re-score en pleine confiance.
  // Si l'annonce n'est pas connue (consultation au hasard), l'app l'ignore.
  // Aucune requête vers LBC : on lit la page que l'utilisateur regarde déjà.
  function autoSendDetail() {
    try {
      chrome.storage.sync.get(["terouva.watchEnabled"], (out) => {
        if (out["terouva.watchEnabled"] === false) return;
        const data = extractFromNextData() ?? extractFromMeta();
        if (!data?.url) return;
        // On envoie le détail au service worker, qui le relaie à l'app (/app)
        // pour ENRICHIR la fiche déjà détectée et re-scorer en pleine confiance.
        // Aucune requête vers Leboncoin : on lit la page que l'utilisateur regarde.
        try {
          chrome.runtime.sendMessage({
            type: "terouva.detected",
            payload: {
              app: "terouva",
              type: "listing-detail",
              version: 1,
              captured_at: new Date().toISOString(),
              data,
            },
          });
        } catch {
          /* SW indisponible → best-effort, on ignore */
        }
      });
    } catch {
      /* hors contexte extension → ignore */
    }
  }

  // ── Option « réactivité » : pré-remplir le message de candidature ──────────
  // L'utilisateur a préparé son message dans Terouva (« Préparer & contacter » →
  // message copié). Ici, sur la page d'annonce, un bouton Terouva remplit le champ
  // de contact LBC avec ce message. L'ENVOI reste 100% HUMAIN : l'utilisateur clique
  // lui-même sur « Envoyer » de LBC. On n'automatise JAMAIS la soumission (ligne rouge).

  function tvSetNativeValue(el, value) {
    // Passe par le setter natif pour que le React de LBC voie le changement.
    const proto = Object.getPrototypeOf(el);
    const desc = Object.getOwnPropertyDescriptor(proto, "value");
    if (desc && desc.set) desc.set.call(el, value);
    else el.value = value;
  }

  function tvFindContactTextarea() {
    const sels = [
      "textarea[name*='message' i]",
      "textarea[placeholder*='message' i]",
      "textarea[id*='message' i]",
      "form textarea",
      "textarea",
    ];
    for (const s of sels) {
      for (const el of document.querySelectorAll(s)) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && !el.disabled && !el.readOnly) return el;
      }
    }
    return null;
  }

  function tvHint(btn, msg, ok) {
    const h = btn.querySelector(".tv-hint");
    if (h) {
      h.textContent = msg;
      h.style.color = ok ? "#7EE8C8" : "#FFB84D";
    }
  }

  async function tvFill(btn) {
    let text = "";
    try {
      text = await navigator.clipboard.readText();
    } catch {
      text = "";
    }
    if (!text || !text.trim()) {
      tvHint(btn, "Copie d'abord ton message (Terouva → « Préparer & contacter »).", false);
      return;
    }
    const ta = tvFindContactTextarea();
    if (!ta) {
      tvHint(btn, "Ouvre le formulaire « Contacter » de LBC, puis reclique.", false);
      return;
    }
    tvSetNativeValue(ta, text);
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    ta.dispatchEvent(new Event("change", { bubbles: true }));
    ta.focus();
    ta.scrollIntoView({ behavior: "smooth", block: "center" });
    tvHint(btn, "Message rempli ✓ Vérifie et clique sur « Envoyer ».", true);
  }

  function tvInjectButton() {
    if (document.getElementById("terouva-fill")) return;
    const btn = document.createElement("div");
    btn.id = "terouva-fill";
    btn.style.cssText = [
      "position:fixed", "right:16px", "bottom:16px", "z-index:2147483647",
      "background:#0a0a0b", "color:#ededee", "border:1px solid #2c2c33",
      "border-radius:10px", "padding:10px 14px", "cursor:pointer",
      "font:13px/1.4 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
      "box-shadow:0 8px 32px -8px rgba(0,0,0,0.5)", "max-width:280px", "user-select:none",
    ].join(";");
    const label = document.createElement("div");
    label.textContent = "📋 Remplir mon message Terouva";
    btn.appendChild(label);
    const hint = document.createElement("div");
    hint.className = "tv-hint";
    hint.style.cssText = "margin-top:4px;font-size:11px;color:#a3a3aa";
    hint.textContent = "Message déjà copié ? Clique pour remplir le champ.";
    btn.appendChild(hint);
    btn.addEventListener("dblclick", () => btn.remove());
    btn.addEventListener("click", (e) => {
      if (e.detail === 2) return; // ignore le 1er clic d'un double-clic (= fermer)
      tvFill(btn);
    });
    btn.title = "Terouva — l'envoi reste manuel : tu cliques « Envoyer » toi-même. Double-clic pour cacher.";
    document.body.appendChild(btn);
  }

  function tvInit() {
    try {
      chrome.storage.sync.get(["terouva.watchEnabled"], (out) => {
        if (out["terouva.watchEnabled"] === false) return;
        tvInjectButton();
      });
    } catch {
      tvInjectButton();
    }
  }

  // Laisse le temps au __NEXT_DATA__ d'être présent (document_idle suffit en général).
  if (document.readyState === "complete") {
    autoSendDetail();
    tvInit();
  } else {
    window.addEventListener("load", () => { autoSendDetail(); tvInit(); }, { once: true });
  }
})();
