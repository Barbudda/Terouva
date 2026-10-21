import type { Metadata, Viewport } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

// DM Sans porte l'interface : navigation, boutons, étiquettes, texte courant.
// Inter et Geist sont exclues par les règles du projet.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Newsreader porte les titres. Le site n'avait qu'une police, en graisse 800 :
// c'est la silhouette la plus reconnaissable d'une page produit générée, un gros
// grotesque noir et serré sur fond clair. Une serif dessinée pour l'écran donne
// aux titres le ton d'une notice officielle, qui est le registre des guides, et
// n'a pas besoin d'être épaissie pour faire autorité. Voir DESIGN.md.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Terouva · Trouvez votre logement sans y passer vos journées",
    template: "%s · Terouva",
  },
  description:
    "Terouva surveille Leboncoin pour vous et prépare votre message. Vous êtes prévenu dès qu'une annonce vous correspond. Tout reste sur votre ordinateur.",
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
      "Terouva surveille Leboncoin pour vous et prépare votre message. Vous êtes prévenu dès qu'une annonce vous correspond. Tout reste chez vous.",
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
      "Terouva surveille Leboncoin pour vous et prépare votre message. Vous êtes prévenu dès qu'une annonce vous correspond. Tout reste chez vous.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfdfd",
  colorScheme: "light",
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
          "Terouva surveille Leboncoin pour vous et prépare votre message. Vous êtes prévenu dès qu'une annonce vous correspond. Tout reste sur votre ordinateur.",
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
    <html lang="fr" className={`${dmSans.variable} ${newsreader.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
