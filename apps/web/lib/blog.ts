import type { ComponentType } from "react";
import { ARTICLES_INDEX } from "./blog-index";

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
 * **Ajouter un article** : deux fichiers à son nom, et rien d'autre.
 * - `components/blog/articles/<slug>.tsx` : le corps, un composant par défaut, de la prose en JSX
 *   (`<h2 id>`, `<p>`, `<Link>`) ;
 * - `components/blog/articles/<slug>.meta.ts` : la fiche, `export default` d'un `ArticleMeta`
 *   (tout le type `Article` sauf `corps`), avec `statut: "brouillon"`.
 * Puis `npm run blog:index` régénère `lib/blog-index.ts`. Passer à `"publie"` le jour de la mise
 * en ligne. Les tests de `blog.test.ts` vérifient le reste, dont un index à jour.
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
  /**
   * Format série : questions tirées des intertitres du corps qui finissent par « ? » et de leur
   * premier paragraphe. Déjà visibles dans le corps, donc balisées sans bloc en double (R81).
   */
  faqCorps?: Array<{ q: string; a: string }>;
  /** Photo propre à l'article (carte du blog). Sans elle, une photo du site est attribuée. */
  photo?: { src: string; alt: string };
  /** Titres de section, dans l'ordre. `id` doit exister dans le corps. */
  sommaire?: Array<{ id: string; titre: string }>;
  statut: "brouillon" | "publie";
  /** Le corps, chargé seulement pour rendre la page. */
  corps: () => Promise<{ default: ComponentType }>;
};

/** La fiche d'un article telle qu'elle s'écrit dans `<slug>.meta.ts` : tout sauf le corps. */
export type ArticleMeta = Omit<Article, "corps">;

/**
 * La liste vient de `lib/blog-index.ts`, généré par `npm run blog:index` à partir des fiches
 * `components/blog/articles/<slug>.meta.ts` : un article tient dans ses deux fichiers à lui, si bien
 * que plusieurs rédacteurs écrivent en même temps sans toucher un fichier commun. Le générateur
 * tourne aussi avant chaque build, et un test refuse un index en retard sur les fiches.
 */
export const ARTICLES: Article[] = ARTICLES_INDEX;

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

/**
 * Le lien de navigation vers la rubrique, ou rien tant qu'elle est vide. Le pied de page le lit :
 * le même déploiement qui publie le premier article allume le lien, et aucun lien ne mène avant à
 * une page en `noindex`.
 */
export function lienBlog(liste: Article[] = ARTICLES): { label: string; href: string } | null {
  return blogOuvert(liste) ? { label: "Le blog", href: BLOG } : null;
}

/**
 * Les articles publiés qui se rattachent à un guide : ceux dont il est le pilier d'abord, puis ceux
 * qui le citent comme guide voisin, chaque groupe du plus récent au plus ancien. C'est le lien retour
 * du guide vers ses satellites ; l'article, lui, lie déjà son pilier.
 */
export function articlesLies(cheminGuide: string, liste: Article[] = ARTICLES, max = 4): Article[] {
  const publies = articlesPublies(liste);
  return [
    ...publies.filter((a) => a.guidePilier === cheminGuide),
    ...publies.filter((a) => a.guidePilier !== cheminGuide && a.guidesLies.includes(cheminGuide)),
  ].slice(0, max);
}

/**
 * Pages de pilier. Une page par pilier n'existe qu'à partir de `SEUIL_PAGE_PILIER` articles publiés :
 * en dessous, ce serait une page mince qui répète la liste de `/blog`. Au-delà, elle porte le pilier
 * entier, et `/blog` n'en montre que les derniers.
 */
export const SEUIL_PAGE_PILIER = 5;

/** Combien d'articles `/blog` montre par pilier quand le pilier a sa page. */
export const APERCU_PILIER = 4;

export const PAGES_PILIERS: Record<
  Pilier,
  { slug: string; titreSeo: string; description: string; intro: string; guide: string }
> = {
  A: {
    slug: "repondre-vite",
    titreSeo: "Répondre à une annonce de location : articles",
    description:
      "Le premier message, la relance, le bon moment pour écrire : les articles du blog pour répondre plus vite et mieux à une annonce de location.",
    intro: "Ce qui fait qu'un propriétaire répond à votre message, et ce qui le fait passer au suivant.",
    guide: "/guides/repondre-a-une-annonce-de-location",
  },
  B: {
    slug: "dossier-et-droits",
    titreSeo: "Dossier de location et droits du candidat",
    description:
      "Les pièces qu'on peut vous demander, celles qu'on ne peut pas exiger, et ce que prévoit la loi quand un dossier est refusé : les articles du blog.",
    intro: "Ce qu'un propriétaire peut vous demander, et ce que vous pouvez refuser.",
    guide: "/guides/dossier-de-location",
  },
  C: {
    slug: "garant-et-garanties",
    titreSeo: "Garant, caution et Visale : articles",
    description:
      "Trouver un garant, s'en passer, obtenir la garantie Visale : les articles du blog sur les garanties demandées aux candidats à une location.",
    intro: "Les solutions quand un propriétaire demande un garant, et ce que chacune engage.",
    guide: "/guides/garant-caution",
  },
  D: {
    slug: "bail-et-loyer",
    titreSeo: "Bail et loyer : l'actualité pour les locataires",
    description:
      "Encadrement des loyers, révision, modèles de bail, zones tendues : ce qui change dans les règles de la location, daté et sourcé, pour les candidats.",
    intro: "Les règles du bail et du loyer qui changent, et ce qu'elles changent pour votre recherche.",
    guide: "/guides/preavis-location",
  },
};

export function cheminPilier(p: Pilier): string {
  return `${BLOG}/pilier/${PAGES_PILIERS[p].slug}`;
}

export function pilierParSlug(slug: string): Pilier | undefined {
  return (Object.keys(PAGES_PILIERS) as Pilier[]).find((p) => PAGES_PILIERS[p].slug === slug);
}

/** Les articles publiés d'un pilier, du plus récent au plus ancien. */
export function articlesDuPilier(p: Pilier, liste: Article[] = ARTICLES): Article[] {
  return articlesPublies(liste).filter((a) => a.pilier === p);
}

/** Les piliers qui ont au moins un article publié, dans l'ordre de la ligne éditoriale. */
export function piliersHabites(liste: Article[] = ARTICLES): Pilier[] {
  return (Object.keys(PILIERS) as Pilier[]).filter((p) => articlesDuPilier(p, liste).length > 0);
}

/** Les piliers assez fournis pour avoir leur page. */
export function piliersAvecPage(liste: Article[] = ARTICLES): Pilier[] {
  return piliersHabites(liste).filter((p) => articlesDuPilier(p, liste).length >= SEUIL_PAGE_PILIER);
}

/** Date de dernière modification d'un pilier : son article le plus récemment modifié. */
export function pilierModifieLe(p: Pilier, liste: Article[] = ARTICLES): string | undefined {
  return blogModifieLe(articlesDuPilier(p, liste));
}

/** Date longue affichée : « 23 novembre 2026 ». */
export function dateLongue(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
