"use client";

import { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import App from "@app/App";
import { ensurePersistentStorage, registerAppServiceWorker } from "@app/lib/pwa";

/**
 * Racine de l'application web Terouva (local-first). Montée uniquement côté client
 * (cf. app/app/[[...slug]]/page.tsx, ssr:false) : le serveur ne voit jamais
 * IndexedDB. Le routing se fait par hash (#/annonces/:id) → aucune route serveur,
 * cohérent avec la promesse « zéro serveur ».
 */
export default function AppRoot() {
  useEffect(() => {
    registerAppServiceWorker();
    // Protège IndexedDB de l'éviction (best-effort, non bloquant).
    void ensurePersistentStorage();
  }, []);

  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
