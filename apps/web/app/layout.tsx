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
  },
  openGraph: {
    title: "Terouva — trouvez votre logement sans y passer vos journées",
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
        alt: "Terouva — trouvez votre logement sans y passer vos journées",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terouva — trouvez votre logement sans y passer vos journées",
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
  themeColor: "#0a0a0b",
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
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-noise">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
