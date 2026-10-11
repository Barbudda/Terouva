import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

/**
 * Métadonnées d'une page, au même endroit pour toutes.
 *
 * Trois choses comptent et sont faciles à oublier page par page : une balise
 * canonique (sans elle, une même page atteinte par deux adresses se fait
 * concurrence à elle-même), une description écrite pour la personne qui lira le
 * résultat de recherche, et une image de partage. Le reste est hérité du
 * `layout`.
 */
export function pageMetadata({
  titre,
  description,
  chemin,
  type = "website",
  publieLe,
  modifieLe,
  indexable = true,
}: {
  /** Sans « · Terouva » : le gabarit du layout l'ajoute. */
  titre: string;
  description: string;
  /** Chemin absolu depuis la racine, « /guides/dossier-de-location ». */
  chemin: string;
  type?: "website" | "article";
  publieLe?: string;
  modifieLe?: string;
  indexable?: boolean;
}): Metadata {
  const url = `${getSiteUrl()}${chemin}`;
  const image = `${chemin === "/" ? "" : chemin}/opengraph-image`;

  return {
    title: titre,
    description,
    alternates: { canonical: chemin },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: `${titre} · Terouva`,
      description,
      url,
      type,
      locale: "fr_FR",
      siteName: "Terouva",
      images: [{ url: image, width: 1200, height: 630, alt: titre }],
      ...(type === "article"
        ? { publishedTime: publieLe, modifiedTime: modifieLe ?? publieLe }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${titre} · Terouva`,
      description,
      images: [image],
    },
  };
}

/** Fil d'Ariane pour les moteurs : il s'affiche sous le titre dans les résultats. */
export function filAriane(etapes: Array<{ nom: string; chemin: string }>) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: etapes.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nom,
      item: `${base}${e.chemin}`,
    })),
  };
}

/** Bloc `<script type="application/ld+json">`, à poser dans une page. */
export function DonneesStructurees({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
