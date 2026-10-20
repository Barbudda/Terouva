import type { MetadataRoute } from "next";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { getSiteUrl } from "@/lib/site";

/**
 * Plan du site, construit depuis le catalogue : une page publiée y entre
 * automatiquement. Les zones privées (`/app`, `/liste`) n'y figurent pas, et
 * sont en plus refusées dans `robots.txt`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return [
    // La barre finale n'est pas cosmétique. Sans elle, le plan du site annonce
    // « https://domaine » quand tous les liens de la page et la canonique
    // pointent vers « https://domaine/ ». Un auditeur y voit deux adresses, et
    // signale l'accueil comme une page orpheline du plan du site, c'est-à-dire
    // sans aucun lien entrant, alors qu'elle en a plus de cent.
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/outils`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...OUTILS.map((o) => ({
      url: `${base}${o.chemin}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...GUIDES.map((g) => ({
      url: `${base}${g.chemin}`,
      lastModified: new Date(g.modifieLe ?? g.publieLe),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${base}/confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
