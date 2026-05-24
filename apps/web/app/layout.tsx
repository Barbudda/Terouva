import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Terouva — Le premier dossier reçu, c'est le seul qui sera lu.",
    template: "%s · Terouva",
  },
  description:
    "Terouva surveille Leboncoin, classe les annonces selon tes critères et te prépare ton message de candidature pendant que les autres lisent encore l'annonce. App desktop local-first.",
  keywords: [
    "leboncoin",
    "recherche appartement",
    "location",
    "copilote",
    "desktop app",
    "local-first",
    "Terouva",
  ],
  authors: [{ name: "Terouva" }],
  openGraph: {
    title: "Terouva — Le premier dossier reçu, c'est le seul qui sera lu.",
    description:
      "Copilote desktop local-first pour Leboncoin. Surveille, score, prépare ton message. Tu cliques. C'est parti.",
    type: "website",
    locale: "fr_FR",
    siteName: "Terouva",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terouva",
    description:
      "Le copilote local qui te fait répondre en premier sur Leboncoin.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-noise">{children}</body>
    </html>
  );
}
