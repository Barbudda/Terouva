import { GUIDES, OUTILS } from "@/lib/catalogue";
import { getSiteUrl } from "@/lib/site";

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

> Outil local qui aide un particulier à trouver une location : il repère les annonces
> qui correspondent à sa recherche, les note, et prépare le message de candidature.
> L'application tourne sur l'ordinateur de l'utilisateur. Pas de compte, pas de serveur,
> aucune donnée transmise.

## État du produit

L'application n'est pas encore téléchargeable (octobre 2026). Une démonstration
fonctionne dans le navigateur, et une liste d'attente prévient du lancement.

Elle sera payante par abonnement, autour de 12 € par mois, avec un essai gratuit.
Le prix définitif sera annoncé au lancement. Les outils de ce site (générateur de
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

## Pages

- [Accueil](${base}/)
- [Outils gratuits](${base}/outils)
- [Guides](${base}/guides)
- [Confidentialité](${base}/confidentialite)

## Contact

Terouva, projet indépendant. Les informations juridiques citées dans les guides renvoient
à service-public.gouv.fr et à Légifrance ; vérifier la version en vigueur avant de s'en servir.
`;

  return new Response(corps, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
