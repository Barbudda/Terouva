import type { MetadataRoute } from "next";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { getSiteUrl } from "@/lib/site";

/**
 * Plan du site, construit depuis le catalogue : une page publiée y entre
 * automatiquement. Les zones privées (`/app`, `/liste`) n'y figurent pas, et
 * sont en plus refusées dans `robots.txt`.
 *
 * **Les dates ne sont pas celles du build.** Elles l'étaient, et c'était une
 * faute : seize déploiements en trois jours annonçaient seize fois à Google que
 * l'accueil, les deux rubriques, les deux outils et la page de confidentialité
 * venaient d'être modifiés, alors que la plupart n'avaient pas bougé d'une
 * ligne. Google documente explicitement ce cas : un `lastmod` démenti par le
 * contenu lui fait cesser de tenir compte du signal pour tout le site. On
 * demandait donc de la fraîcheur à un moteur à qui on avait appris à ne plus
 * nous croire sur la fraîcheur.
 *
 * Chaque page fixe porte maintenant sa vraie date de dernière modification de
 * contenu, à tenir à jour **quand le contenu change**, pas quand on redéploie.
 * Les guides, eux, tiraient déjà leur date du catalogue : c'était le seul
 * endroit correct.
 */

/**
 * Dernière modification réelle des pages qui ne sont pas dans le catalogue.
 * Relevées dans l'historique git ; à corriger à la main lors d'une refonte.
 */
const MODIFIE_LE: Record<string, string> = {
  "/": "2026-10-21", // refonte typographique, chiffres clés réécrits
  "/outils": "2026-10-21",
  "/guides": "2026-10-21",
  "/confidentialite": "2026-10-11",
};

/** La rubrique change quand son contenu change : on prend la page la plus récente. */
function plusRecent(dates: string[], defaut: string): Date {
  const tri = [...dates].sort();
  return new Date(tri[tri.length - 1] ?? defaut);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const datesGuides = GUIDES.map((g) => g.modifieLe ?? g.publieLe);

  return [
    // La barre finale n'est pas cosmétique. Sans elle, le plan du site annonce
    // « https://domaine » quand tous les liens de la page et la canonique
    // pointent vers « https://domaine/ ». Un auditeur y voit deux adresses, et
    // signale l'accueil comme une page orpheline du plan du site, c'est-à-dire
    // sans aucun lien entrant, alors qu'elle en a plus de cent.
    {
      url: `${base}/`,
      lastModified: new Date(MODIFIE_LE["/"]!),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/outils`,
      lastModified: new Date(MODIFIE_LE["/outils"]!),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // La rubrique Guides bouge à chaque guide ajouté ou revérifié.
      url: `${base}/guides`,
      lastModified: plusRecent(datesGuides, MODIFIE_LE["/guides"]!),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...OUTILS.map((o) => ({
      url: `${base}${o.chemin}`,
      lastModified: new Date(MODIFIE_LE["/outils"]!),
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
      lastModified: new Date(MODIFIE_LE["/confidentialite"]!),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
