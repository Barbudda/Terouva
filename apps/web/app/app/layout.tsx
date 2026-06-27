import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
// CSS de l'app (Tailwind + thème sombre Terouva). Importé ici (layout) car le
// CSS global ne peut l'être que dans un layout/page. Scopé au segment /app.
import "../../components/app/index.css";

// PWA : manifest + méta installable, scopés à /app. La zone reste non indexée
// (robots Disallow /app). Aucune route serveur, aucune donnée côté serveur.
export const metadata: Metadata = {
  title: "Terouva",
  manifest: "/app/manifest.webmanifest",
  // Défense en profondeur : la zone privée /app ne doit jamais être indexée,
  // même si une URL était découverte autrement que par le robots.txt.
  robots: { index: false, follow: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Terouva",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return children;
}
