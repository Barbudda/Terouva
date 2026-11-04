// GABARIT D'ARTICLE AU FORMAT SÉRIE. Copier ce fichier en `content/blog/<slug>.ts` (le nom commence
// sans « _ »), remplir, puis `npm run blog:verifier` dans apps/web jusqu'au vert. Rien d'autre à lire
// ni à toucher : sources, sommaire, temps de lecture et FAQ balisée se calculent (lib/blog-format.ts).
//
// Règles que le vérificateur NE PEUT PAS juger, donc à tenir soi-même :
// - une seule requête réelle, prise dans la ligne de mission (registre), et l'angle qui la sert ;
// - l'apport : ce que les trois premiers résultats Google ne disent pas, dit dès le chapeau ;
// - chaque phrase vraie aujourd'hui ; un fait qui dépend d'un vote ou d'une date le dit.

import { article } from "@/lib/blog-format";

export default article({
  slug: "slug-en-minuscules-sans-accent-ni-date",
  titre: "Le titre affiché, formulé comme la question qu'on tape",
  titreSeo: "≤ 60 signes avec « · Terouva »",
  description: "70 à 155 signes : la réponse en une phrase, et ce que la page donne en plus.",
  chapeau:
    "40 à 60 mots qui répondent seuls à la question du titre, chiffre ou règle compris, sans préambule.",
  publieLe: "AAAA-MM-JJ",
  pilier: "A", // A répondre vite · B dossier et droits · C garant et garanties · D bail et loyer
  format: "question", // actualite | rendez-vous | question | cas-pratique | etude | modele | comparatif
  guidePilier: "/guides/…", // obligatoire, et lié dans le corps
  guidesLies: ["/guides/…"],
  // outilLie: "/outils/…",
  statut: "brouillon", // le chef passe à "publie" au moment du lot
  requete: "la requête-mère telle qu'on la tape",
  faits: [
    // Un objet par chiffre ou règle publié. `citation` : 6 à 30 mots copiés mot pour mot de la source,
    // que `npm run blog:sources` retrouve dans la page. Sources officielles d'abord.
    {
      fait: "ce que l'article affirme",
      valeur: "la valeur publiée, telle qu'écrite dans le corps (montants et % compris)",
      source: "https://www.service-public.gouv.fr/…",
      titreSource: "Service-public.gouv.fr · Titre de la fiche",
      releveLe: "AAAA-MM-JJ",
      citation: "extrait exact de la source qui prouve la valeur",
    },
  ],
  // Markdown restreint : `## Question ? {#ancre}`, `### Sous-titre`, paragraphes, listes `- ` et `1. `,
  // **gras**, *italique*, [texte](/lien-interne) ou [texte](https://…). Sous chaque intertitre-question,
  // un premier paragraphe de 35 à 70 mots qui répond seul (il devient la FAQ balisée), puis le détail
  // sans le répéter. Vouvoiement, pas d'emoji ni de tiret cadratin. Au moins trois intertitres.
  corps: `
## Première question que le lecteur se pose ? {#premiere-question}
Réponse autonome de 35 à 70 mots, avec la règle et sa condition, et un lien vers le [guide pilier](/guides/…).

Le détail, l'exemple concret, ce qui change selon les cas.

## Deuxième question ? {#deuxieme-question}
…
`,
});
