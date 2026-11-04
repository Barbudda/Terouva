import { articlesPublies, cheminArticle } from "@/lib/blog";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { getSiteUrl } from "@/lib/site";

/**
 * Les dix derniers articles publiés, avec leur date. Rien tant que le blog est
 * vide : une section sans entrée annoncerait un contenu qui n'existe pas.
 */
function sectionArticles(base: string): string {
  const recents = articlesPublies().slice(0, 10);
  if (recents.length === 0) return "";
  return `## Articles récents

${recents.map((a) => `- [${a.titre}](${base}${cheminArticle(a)}) (${a.publieLe}) : ${a.description}`).join("\n")}

`;
}

/**
 * `llms.txt` : une description du site en texte clair, pour les assistants qui
 * répondent aux questions à la place d'un moteur de recherche.
 *
 * Ce n'est pas un standard imposé, et aucun assistant ne garantit le lire. Mais
 * le fichier ne coûte rien, il dit en une page ce que fait Terouva et où sont
 * les sources, et il évite qu'un assistant décrive l'outil de travers. On n'y
 * écrit que des choses vraies : un fichier qui gonfle le produit se retourne
 * contre lui dès qu'un lecteur vérifie.
 */
export const dynamic = "force-static";

export function GET() {
  const base = getSiteUrl();

  const corps = `# Terouva

> Outil qui aide un particulier à répondre parmi les premiers aux annonces de location
> Leboncoin : il trie les annonces des alertes que l'utilisateur reçoit, dit lesquelles
> valent le coup, et prépare le message de candidature et le dossier. Il s'ouvre dans le
> navigateur, sur l'ordinateur de l'utilisateur. Pas de compte, aucune donnée transmise.

## État du produit

L'application n'est pas encore ouverte au public (novembre 2026). Une liste
d'attente prévient de l'ouverture.

Modèle prévu : une base gratuite et des options payantes, dont le prix sera
annoncé avant tout paiement. Les outils de ce site (générateur de
message, checklist de dossier) restent gratuits et sans inscription.

## Ce que Terouva ne fait pas

- Il ne consulte pas les sites d'annonces à la place de l'utilisateur et ne les requête jamais.
- Il n'envoie aucun message automatiquement : l'humain relit, colle et envoie lui-même.
- Il ne demande ni compte ni mot de passe de site d'annonces.
- Il n'a aucun lien avec Leboncoin.

## Outils gratuits, sans inscription

${OUTILS.map((o) => `- [${o.titre}](${base}${o.chemin}) : ${o.description}`).join("\n")}

## Guides

${GUIDES.map(
  (g) =>
    `- [${g.titre}](${base}${g.chemin}) : ${g.description}${
      g.sources?.length ? ` Sources : ${g.sources.map((s) => s.url).join(", ")}.` : ""
    }`,
).join("\n")}

${sectionArticles(base)}## Pages

- [Accueil](${base}/)
- [Outils gratuits](${base}/outils)
- [Guides](${base}/guides)
- [Confidentialité](${base}/confidentialite)
- [Mentions légales](${base}/mentions-legales)

## Contact

Terouva est édité par Blue Lake Dev, entreprise individuelle de Hugo Moëne (voir les
mentions légales). Les informations juridiques citées dans les guides renvoient
à service-public.gouv.fr et à Légifrance ; vérifier la version en vigueur avant de s'en servir.
`;

  return new Response(corps, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
