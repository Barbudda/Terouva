"use client";

import dynamic from "next/dynamic";

/**
 * Route catch-all de l'application Terouva (local-first).
 *
 * `ssr: false` est NON négociable : il garantit qu'AUCUN rendu serveur n'a lieu
 * pour l'app — le serveur ne voit jamais IndexedDB, aucun mismatch d'hydratation,
 * cohérent avec la promesse « 100 % local, zéro serveur ». Tout le routing réel
 * se fait côté client (HashRouter), donc cette page rend simplement le shell.
 */
const AppRoot = dynamic(() => import("@/components/app/AppRoot"), {
  ssr: false,
  loading: () => null,
});

export default function TerouvaAppPage() {
  return <AppRoot />;
}
