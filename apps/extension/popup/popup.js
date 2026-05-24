const $ = (id) => document.getElementById(id);

function show(state) {
  for (const s of ["loading", "error", "ready"]) {
    $(s).classList.toggle("hidden", s !== state);
  }
}

function fail(msg) {
  $("error-text").textContent = msg;
  show("error");
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function extract(tabId) {
  // Inject the content script if it wasn't already (for direct pop on cached tabs).
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

function fmtMeta(d) {
  const bits = [];
  if (d.price != null) bits.push(`${d.price}€`);
  if (d.surface != null) bits.push(`${d.surface}m²`);
  if (d.rooms != null) bits.push(`${d.rooms} pièces`);
  if (d.city) bits.push(d.city);
  return bits.join(" · ");
}

async function init() {
  show("loading");
  try {
    const tab = await getActiveTab();
    if (!tab?.url || !/^https:\/\/(www\.)?leboncoin\.fr\//.test(tab.url)) {
      fail("Cette page n'est pas une annonce Leboncoin.");
      return;
    }
    const payload = await extract(tab.id);
    if (!payload || !payload.data?.url) {
      fail("Impossible de lire l'annonce sur cette page.");
      return;
    }

    $("title").textContent = payload.data.title || "(sans titre)";
    $("meta").textContent = fmtMeta(payload.data) || "—";
    show("ready");

    $("copy").addEventListener("click", async () => {
      try {
        const json = JSON.stringify(payload, null, 2);
        await navigator.clipboard.writeText(json);
        $("copied").classList.remove("hidden");
        $("copy").textContent = "Recopier";
      } catch (e) {
        fail("Impossible d'écrire dans le presse-papier : " + e.message);
      }
    });
  } catch (e) {
    fail(e.message || String(e));
  }
}

init();
