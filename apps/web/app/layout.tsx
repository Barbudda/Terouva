import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Fraunces } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import { Revelateur } from "@/components/ui/Revelateur";
import "./globals.css";

/**
 * Trois voix, une par fonction. Aucune n'assure le rôle d'une autre.
 *
 * Fraunces porte les titres du monde papier. C'est une serif variable dont
 * l'axe WONK ne sert jamais par défaut. Réglée à WONK 1 dans `globals.css`,
 * elle prend des formes irrégulières sur le g, le a et le y qu'aucune serif
 * d'écran n'a. L'axe opsz fait son travail de taille optique : gros titre
 * réglé gros, petit texte réglé petit. L'axe SOFT n'est pas chargé : le site
 * le règle partout à 0, sa valeur par défaut, et il alourdissait le fichier
 * préchargé sur chaque page (LCP mobile, 5 novembre).
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["WONK", "opsz"],
  // Le secours calculé par Next suit la Fraunces par défaut ; réglée en titre
  // (opsz 120, WONK 1), elle est 20 % plus étroite, et les titres prenaient
  // une ligne de plus le temps du chargement : CLS 0,2 sur les guides. Le
  // secours « Fraunces Secours » (`globals.css`) est réglé sur les titres.
  adjustFontFallback: false,
  fallback: ["Fraunces Secours", "Georgia", "serif"],
});

/** Archivo : le texte, la navigation, les boutons, les libellés. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

/**
 * DM Mono : la voix de l'instrument. Monde nuit seulement (champs, scores,
 * horodatages), plus les références d'articles de loi dans les guides, où
 * une référence composée en monospace se lit comme ce qu'elle est.
 */
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
  // Secours monospace : Courier New a exactement sa chasse (0,6 em, mesuré le
  // 5 novembre), là où le secours calculé sur Arial élargissait les capitales
  // des étiquettes, qui passaient sur deux lignes le temps du chargement.
  adjustFontFallback: false,
  fallback: ["Courier New", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Terouva · Trouvez votre logement sans y passer vos journées",
    template: "%s · Terouva",
  },
  description:
    "Terouva trie vos alertes Leboncoin et écrit votre message de candidature : vous répondez parmi les premiers. Tout reste sur votre ordinateur.",
  keywords: [
    "Leboncoin",
    "alerte Leboncoin",
    "recherche logement",
    "recherche appartement",
    "location",
    "Terouva",
  ],
  authors: [{ name: "Terouva" }],
  alternates: {
    canonical: "/",
    // Déclare le flux : les lecteurs et les robots le découvrent sans qu'il
    // faille connaître son adresse.
    types: { "application/rss+xml": "/flux.xml" },
  },
  openGraph: {
    title: "Terouva · Trouvez votre logement sans y passer vos journées",
    description:
      "Terouva trie vos alertes Leboncoin et écrit votre message de candidature : vous répondez parmi les premiers. Tout reste sur votre ordinateur.",
    type: "website",
    locale: "fr_FR",
    siteName: "Terouva",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Terouva · Trouvez votre logement sans y passer vos journées",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terouva · Trouvez votre logement sans y passer vos journées",
    description:
      "Terouva trie vos alertes Leboncoin et écrit votre message de candidature : vous répondez parmi les premiers. Tout reste sur votre ordinateur.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#02070a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Terouva",
        description:
          "Terouva trie vos alertes Leboncoin et écrit votre message de candidature : vous répondez parmi les premiers. Tout reste sur votre ordinateur.",
        inLanguage: "fr-FR",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Terouva",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/icon.svg`,
      },
    ],
  };

  return (
    <html lang="fr" className={`${fraunces.variable} ${archivo.variable} ${dmMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Revelateur />
      </body>
    </html>
  );
}
