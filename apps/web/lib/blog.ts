import type { ComponentType } from "react";

/**
 * Les articles du blog, source unique.
 *
 * La page de rubrique, les pages d'article, le plan du site, le flux RSS et
 * `llms.txt` lisent cette liste et rien d'autre. Un article publié ici apparaît
 * partout à la fois ; un brouillon n'apparaît nulle part, et son adresse
 * répond 404.
 *
 * Fichier à part de `catalogue.ts` : celui-ci dépasse déjà la taille que le
 * projet s'autorise, et un article n'a pas la même vie qu'un guide (il est
 * daté, il ne se réécrit que pour suivre l'actualité qu'il traite).
 *
 * **Ajouter un article** : écrire son corps dans
 * `components/blog/articles/<slug>.tsx` (un composant par défaut, de la prose
 * en JSX : `<h2 id>`, `<p>`, `<Link>`), puis ajouter une entrée à `ARTICLES`
 * ci-dessous avec `statut: "brouillon"`. Passer à `"publie"` le jour de la
 * mise en ligne. Les tests de `blog.test.ts` vérifient le reste.
 */

export type Pilier = "A" | "B" | "C" | "D";

/** Les piliers de la ligne éditoriale (`docs/seo/blog/LIGNE-EDITORIALE.md`). */
export const PILIERS: Record<Pilier, string> = {
  A: "Répondre vite et bien",
  B: "Le dossier et vos droits",
  C: "Garant et garanties",
  D: "Le bail et le loyer",
};

export type Format =
  | "actualite"
  | "rendez-vous"
  | "question"
  | "cas-pratique"
  | "etude"
  | "modele"
  | "comparatif";

export type Article = {
  /** Adresse : `/blog/<slug>`. En français, sans date, et elle ne change plus. */
  slug: string;
  titre: string;
  /** Titre pour les moteurs : 60 signes maximum, suffixe « · Terouva » compris. */
  titreSeo: string;
  /** Meta description, 70 à 155 signes. */
  description: string;
  /** Le chapeau-réponse, 40 à 60 mots, qui répond seul à la question du titre. */
  chapeau: string;
  /** AAAA-MM-JJ. La date de publication ne bouge plus une fois l'article en ligne. */
  publieLe: string;
  /** AAAA-MM-JJ, seulement si le contenu a changé ; va avec une entrée de `misesAJour`. */
  modifieLe?: string;
  /** Ce qui a changé, et quand : affiché en tête de l'article. */
  misesAJour?: Array<{ le: string; quoi: string }>;
  pilier: Pilier;
  format: Format;
  /** Temps de lecture affiché, en minutes. */
  lecture: number;
  /** Chemin du guide pilier, « /guides/... ». */
  guidePilier: string;
  /** Un ou deux guides voisins. */
  guidesLies: string[];
  /** L'outil qui fait ce que l'article décrit, s'il existe. */
  outilLie?: string;
  /** Chaque source avec sa date de relevé (et sa ligne dans `docs/seo/FAITS.md`). */
  sources: Array<{ titre: string; url: string; releveLe: string }>;
  /** Affichées dans la page ; balisées en `FAQPage` seulement parce qu'elles le sont. */
  questions?: Array<{ q: string; a: string }>;
  /** Titres de section, dans l'ordre. `id` doit exister dans le corps. */
  sommaire?: Array<{ id: string; titre: string }>;
  statut: "brouillon" | "publie";
  /** Le corps, chargé seulement pour rendre la page. */
  corps: () => Promise<{ default: ComponentType }>;
};

export const ARTICLES: Article[] = [
  {
    // Brief : docs/seo/blog/briefs/encadrement-des-loyers-novembre-2026.md. L'adresse
    // du brief portait l'année, que les tests interdisent ; celle-ci couvre
    // les deux issues du vote et ne changera pas.
    slug: "encadrement-des-loyers-fin-ou-prolongation",
    titre: "Encadrement des loyers fin novembre 2026 : ce qui est sûr, ce qui dépend du vote",
    titreSeo: "Encadrement des loyers : fin ou prolongation",
    description:
      "Le plafonnement des loyers arrive à son terme fin novembre 2026. Ce qui est acquis, ce qui dépend du vote, et comment vérifier le loyer d'une annonce.",
    chapeau:
      "L'expérimentation qui plafonne le niveau des loyers dans neuf territoires arrive à son terme fin novembre 2026. Le Sénat a voté le 21 octobre une prolongation de deux ans, mais l'Assemblée nationale ne l'a pas encore adoptée. Quoi qu'il arrive, la hausse de loyer entre deux locataires reste encadrée en zone tendue jusqu'au 31 juillet 2027.",
    publieLe: "2026-11-13",
    pilier: "D",
    format: "actualite",
    lecture: 6,
    guidePilier: "/guides/preavis-location",
    guidesLies: ["/guides/repondre-a-une-annonce-de-location", "/guides/dossier-de-location"],
    sources: [
      {
        titre: "Légifrance · Article 140 de la loi n° 2018-1021 du 23 novembre 2018 (loi Elan)",
        url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043977071",
        releveLe: "2026-11-04",
      },
      {
        titre: "Sénat · Proposition de loi pour retrouver la confiance et l'équilibre dans les rapports locatifs",
        url: "https://www.senat.fr/travaux-parlementaires/textes-legislatifs/la-loi-en-clair/proposition-de-loi-pour-retrouver-la-confiance-et-lequilibre-dans-les-rapports-locatifs.html",
        releveLe: "2026-11-04",
      },
      {
        titre: "Sénat · Dossier législatif de la proposition de loi",
        url: "https://www.senat.fr/dossier-legislatif/ppl25-217.html",
        releveLe: "2026-11-04",
      },
      {
        titre: "Service-public.gouv.fr · Encadrement des loyers",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1314",
        releveLe: "2026-11-04",
      },
      {
        titre: "Service-public.gouv.fr · Encadrement de l'évolution des loyers reconduit",
        url: "https://www.service-public.gouv.fr/particuliers/actualites/A17566",
        releveLe: "2026-11-04",
      },
    ],
    questions: [
      {
        q: "Quand l'encadrement des loyers prend-il fin ?",
        a: "L'expérimentation créée par la loi Elan dure huit ans à compter de sa publication au Journal officiel du 24 novembre 2018. Le Sénat écrit qu'elle « arrive à son terme le 23 novembre 2026 » ; Service-public indique qu'elle s'applique à Paris « jusqu'au 24 novembre 2026 ». Une prolongation de deux ans est votée au Sénat, pas encore adoptée.",
      },
      {
        q: "L'encadrement des loyers est-il prolongé ?",
        a: "Pas encore. Le Sénat a adopté le 21 octobre 2026, en première lecture, une prolongation de deux ans à périmètre constant. Le texte a été transmis à l'Assemblée nationale et n'est pas adopté définitivement : tant qu'il ne l'est pas, il ne s'applique pas.",
      },
      {
        q: "La hausse de loyer entre deux locataires est-elle toujours limitée ?",
        a: "Oui, dans les communes en zone tendue. Un décret du 20 juillet 2026 reconduit l'encadrement de l'évolution des loyers du 1er août 2026 au 31 juillet 2027, indépendamment du vote sur le plafonnement. Des exceptions existent, notamment après des travaux importants.",
      },
      {
        q: "Combien de temps pour contester un complément de loyer ?",
        a: "Aujourd'hui, trois mois à partir de la signature du bail, devant la commission départementale de conciliation, gratuitement. Le texte voté au Sénat porterait ce délai à un an, mais il ne s'applique pas tant qu'il n'est pas adopté définitivement.",
      },
    ],
    sommaire: [
      { id: "terme", titre: "Ce qui s'arrête fin novembre" },
      { id: "territoires", titre: "Les territoires encadrés" },
      { id: "vote", titre: "La prolongation en discussion" },
      { id: "evolution", titre: "La hausse entre deux locataires" },
      { id: "bail", titre: "Un bail signé cet hiver" },
      { id: "verifier", titre: "Vérifier le loyer d'une annonce" },
      { id: "contester", titre: "Contester un loyer trop haut" },
      { id: "recherche", titre: "Ce que ça change pour vous" },
    ],
    statut: "brouillon",
    corps: () => import("@/components/blog/articles/encadrement-des-loyers-fin-ou-prolongation"),
  },
];

/** Préfixe des adresses du blog. */
export const BLOG = "/blog";

export function cheminArticle(a: Pick<Article, "slug">): string {
  return `${BLOG}/${a.slug}`;
}

/** Les articles en ligne, du plus récemment publié au plus ancien. */
export function articlesPublies(liste: Article[] = ARTICLES): Article[] {
  return liste
    .filter((a) => a.statut === "publie")
    .sort((a, b) => b.publieLe.localeCompare(a.publieLe));
}

export function articlePublie(slug: string, liste: Article[] = ARTICLES): Article | undefined {
  return articlesPublies(liste).find((a) => a.slug === slug);
}

/**
 * La rubrique ne s'annonce qu'une fois habitée : sans article, `/blog` reste en
 * `noindex`, hors du plan du site, du flux et de `llms.txt`, et rien n'y mène.
 * Une page vide indexée serait une page mince de plus, et une promesse.
 */
export function blogOuvert(liste: Article[] = ARTICLES): boolean {
  return articlesPublies(liste).length > 0;
}

/** Dernière modification de la rubrique : celle de l'article le plus récent. */
export function blogModifieLe(liste: Article[] = ARTICLES): string | undefined {
  return articlesPublies(liste)
    .map((a) => a.modifieLe ?? a.publieLe)
    .sort()
    .at(-1);
}

/** Date longue affichée : « 23 novembre 2026 ». */
export function dateLongue(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
