import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Terouva — trouvez votre logement sans y passer vos journées",
    template: "%s · Terouva",
  },
  description:
    "Terouva surveille Leboncoin pour vous, classe les annonces selon vos critères et prépare votre message de candidature. Vous êtes prévenu dès qu'une annonce vous correspond. Tout reste sur votre ordinateur.",
  keywords: [
    "leboncoin",
    "recherche appartement",
    "location",
    "alerte annonce",
    "logement",
    "Terouva",
  ],
  authors: [{ name: "Terouva" }],
  openGraph: {
    title: "Terouva — trouvez votre logement sans y passer vos journées",
    description:
      "Terouva surveille Leboncoin pour vous et prépare votre message de candidature. Vous êtes prévenu dès qu'une annonce vous correspond. Tout reste chez vous.",
    type: "website",
    locale: "fr_FR",
    siteName: "Terouva",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terouva",
    description:
      "Soyez prévenu dès qu'une annonce Leboncoin vous correspond, avec un message déjà prêt.",
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
