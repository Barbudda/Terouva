import { BLOG, PILIERS, articlesPublies, cheminArticle } from "@/lib/blog";
import { GUIDES } from "@/lib/catalogue";
import { getSiteUrl } from "@/lib/site";

/**
 * Flux RSS des guides et des articles. Généré au build (`force-static`) :
 * c'est un fichier, pas un service. Il sert aux lecteurs de flux et aux
 * agrégateurs, qui restent une des rares façons d'être repris ailleurs sans
 * rien payer.
 *
 * Un seul flux pour tout le contenu. Tant qu'aucun article n'est publié, il
 * reste exactement celui des guides. Dès le premier article, les deux se
 * mêlent par **date de publication** : un article ou un guide mis à jour ne
 * remonte pas en tête, sinon chaque correction se ferait passer pour du neuf
 * auprès des abonnés.
 */
export const dynamic = "force-static";

function echappe(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Entree = {
  titre: string;
  chemin: string;
  description: string;
  publieLe: string;
  modifieLe?: string;
  /** Le pilier d'un article, en `<category>` : les lecteurs de flux savent filtrer dessus. */
  categorie?: string;
};

export function GET() {
  const base = getSiteUrl();
  const articles = articlesPublies();
  const avecBlog = articles.length > 0;

  const guides: Entree[] = GUIDES.map((g) => ({
    titre: g.titre,
    chemin: g.chemin,
    description: g.description,
    publieLe: g.publieLe,
    modifieLe: g.modifieLe,
  }));

  const recents: Entree[] = avecBlog
    ? [
        ...guides,
        ...articles.map((a) => ({
          titre: a.titre,
          chemin: cheminArticle(a),
          description: a.description,
          publieLe: a.publieLe,
          categorie: PILIERS[a.pilier],
          modifieLe: a.modifieLe,
        })),
      ].sort((a, b) => b.publieLe.localeCompare(a.publieLe))
    : // Ordre historique du flux des guides, inchangé tant que le blog est vide.
      [...guides].sort((a, b) => (b.modifieLe ?? b.publieLe).localeCompare(a.modifieLe ?? a.publieLe));

  const dernier = recents
    .map((e) => e.modifieLe ?? e.publieLe)
    .sort()
    .reverse()[0];

  const items = recents
    .map(
      (e) => `    <item>
      <title>${echappe(e.titre)}</title>
      <link>${base}${e.chemin}</link>
      <guid isPermaLink="true">${base}${e.chemin}</guid>
      <description>${echappe(e.description)}</description>
      <pubDate>${new Date(e.publieLe).toUTCString()}</pubDate>${
        e.categorie ? `\n      <category>${echappe(e.categorie)}</category>` : ""
      }
    </item>`,
    )
    .join("\n");

  const titre = avecBlog
    ? "Terouva · Guides et articles pour trouver une location"
    : "Terouva · Guides pour trouver une location";
  const lien = avecBlog ? `${base}${BLOG}` : `${base}/guides`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${titre}</title>
    <link>${lien}</link>
    <description>Le dossier, le garant, le message de candidature : ce qu'il faut savoir pour chercher un logement sans perdre de temps.</description>
    <language>fr-FR</language>
    <atom:link href="${base}/flux.xml" rel="self" type="application/rss+xml" />
${dernier ? `    <lastBuildDate>${new Date(dernier).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
