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

export const ARTICLES: Article[] = [];

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
