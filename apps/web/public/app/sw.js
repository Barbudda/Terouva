/*
 * Service worker de l'app Terouva — scopé UNIQUEMENT à /app.
 *
 * Rôle : cache de l'app-shell pour un fonctionnement HORS-LIGNE (les données
 * vivent dans IndexedDB, donc l'app reste utilisable sans réseau).
 *
 * Lignes rouges respectées : AUCUNE synchronisation réseau, AUCUN Web Push,
 * AUCUN cache cross-origin (les appels au géocodage gouv.fr passent en direct).
 * Le SW ne fait que servir des fichiers déjà chargés par l'utilisateur.
 */
const CACHE = "terouva-app-v1";
const APP_SHELL = "/app";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((c) => c.add(APP_SHELL).catch(() => {})),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }
  // Jamais de cache cross-origin (BAN/géocodage, etc.) : on laisse passer.
  if (url.origin !== self.location.origin) return;

  // Navigations : network-first, repli sur le shell /app en cache (offline).
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(APP_SHELL, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(APP_SHELL).then((r) => r || caches.match(req))),
    );
    return;
  }

  // Assets statiques same-origin : cache-first + revalidation en arrière-plan.
  if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/app/")) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || network;
      }),
    );
  }
});
