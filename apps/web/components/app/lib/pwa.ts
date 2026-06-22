/**
 * PWA — enregistrement du service worker (offline app-shell) et persistance du
 * stockage. 100 % local : le SW ne fait que du cache, jamais de sync/Push.
 */

/** Enregistre le service worker scopé /app (uniquement en production). */
export function registerAppServiceWorker(): void {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  // En dev, le SW interfère avec le HMR de Next → on ne l'active qu'en prod.
  if (process.env.NODE_ENV !== "production") return;
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/app/sw.js", { scope: "/app/" })
      .catch((e) => console.warn("[pwa] enregistrement du SW échoué:", e));
  });
}

/**
 * Demande au navigateur de PROTÉGER le stockage (IndexedDB) contre l'éviction.
 * Chrome accorde silencieusement selon des heuristiques (PWA installée +
 * permission notifications accordée augmentent les chances). Retourne l'état réel.
 */
export async function ensurePersistentStorage(): Promise<boolean> {
  try {
    if (typeof navigator === "undefined" || !navigator.storage?.persist) return false;
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}

/** True si le stockage est déjà protégé (pour afficher un éventuel bandeau). */
export async function isStoragePersisted(): Promise<boolean> {
  try {
    if (typeof navigator === "undefined" || !navigator.storage?.persisted) return false;
    return await navigator.storage.persisted();
  } catch {
    return false;
  }
}
