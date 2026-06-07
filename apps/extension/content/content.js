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
      chrome.storage.sync.get(
        ["terouva.serverUrl", "terouva.token", "terouva.watchEnabled"],
        (out) => {
          const serverUrl = out["terouva.serverUrl"];
          const token = out["terouva.token"];
          const enabled = out["terouva.watchEnabled"] !== false;
          if (!serverUrl || !token || !enabled) return;
          const data = extractFromNextData() ?? extractFromMeta();
          if (!data?.url) return;
          fetch(`${serverUrl.replace(/\/+$/, "")}/ingest/listing`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              app: "terouva",
              type: "listing-detail",
              version: 1,
              captured_at: new Date().toISOString(),
              data,
            }),
          }).catch(() => {
            /* app fermée → best-effort, on ignore */
          });
        },
      );
    } catch {
      /* hors contexte extension → ignore */
    }
  }

  // Laisse le temps au __NEXT_DATA__ d'être présent (document_idle suffit en général).
  if (document.readyState === "complete") autoSendDetail();
  else window.addEventListener("load", autoSendDetail, { once: true });
})();
