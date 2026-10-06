"use client";

import { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import App from "@app/App";
import { connectExtension } from "@app/lib/extBridge";
import { ensurePersistentStorage, registerAppServiceWorker } from "@app/lib/pwa";
import { useDemoStore } from "@app/store/useDemoStore";
import { useWatchStore } from "@app/store/useWatchStore";

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
    // Enregistre le handler d'ingestion (journal + refresh du feed), puis tente
    // de se connecter à l'extension (no-op si absente).
    void useWatchStore.getState().init();
    void connectExtension();
    // Le site peut ouvrir directement la démonstration : /app?demo=1
    void (async () => {
      const demo = useDemoStore.getState();
      await demo.init();
      const wanted = new URLSearchParams(window.location.search).get("demo") === "1";
      if (wanted && !useDemoStore.getState().active) await demo.start();
      if (wanted) {
        window.history.replaceState(null, "", `/app${window.location.hash || "#/"}`);
      }
    })();
  }, []);

  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
