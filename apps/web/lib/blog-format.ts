import type { ArticleMeta } from "./blog";

/**
 * Format « série » des articles : un seul fichier `content/blog/<slug>.ts`, le corps en Markdown.
 *
 * Pourquoi : un blog en volume s'écrit à la chaîne, et chaque champ recopié coûte deux fois (à
 * l'écriture, puis à la relecture). Ici l'auteur ne donne que ce qui ne se déduit pas ; le reste se
 * calcule :
 * - `sources` vient des `faits` (une source par URL) ;
 * - `sommaire` vient des intertitres `##` ;
 * - `lecture` vient du nombre de mots (220 mots par minute) ;
 * - la FAQ balisée vient des intertitres qui finissent par « ? » et de leur premier paragraphe,
 *   déjà visibles dans la page (règle R81) : pas de bloc de questions en double en bas d'article.
 *
 * Chaque fait porte une `citation` courte, recopiée mot pour mot de sa source : un script la cherche
 * dans la page source, et la relecture ne rouvre que les sources où il ne la trouve pas.
 */

export type Fait = {
  /** Ce que la phrase de l'article affirme, en clair. */
  fait: string;
  /** La valeur publiée (« un mois de loyer hors charges », « 1 710 € nets »). */
  valeur: string;
  /** URL de la source officielle. */
  source: string;
  /** Titre court de la source, affiché dans « Sources ». */
  titreSource: string;
  /** AAAA-MM-JJ : jour où la source a été lue. */
  releveLe: string;
  /** Extrait mot pour mot de la source, 6 à 30 mots, qui prouve la valeur. */
  citation: string;
};

export type ArticleSerie = Omit<ArticleMeta, "sources" | "sommaire" | "lecture" | "questions"> & {
  /** La requête-mère du registre, telle qu'on la tape. Unique dans tout le blog. */
  requete: string;
  faits: Fait[];
  /** Le corps en Markdown restreint (voir `rendreMarkdown`). */
  corps: string;
};

export type FicheSerie = ArticleMeta & {
  format_source: "serie";
  requete: string;
  faits: Fait[];
  markdown: string;
};

const MOTS_PAR_MINUTE = 220;

/** Déclare un article au format série et calcule tout ce qui se déduit. */
export function article(a: ArticleSerie): FicheSerie {
  const { corps, faits, ...reste } = a;
  const blocs = lireBlocs(corps);
  const sommaire = blocs
    .filter((b): b is Extract<Bloc, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id, titre: b.texte }));
  const sources = [...new Map(faits.map((f) => [f.source, f])).values()].map((f) => ({
    titre: f.titreSource,
    url: f.source,
    releveLe: f.releveLe,
  }));
  return {
    ...reste,
    format_source: "serie",
    faits,
    markdown: corps,
    sources,
    sommaire,
    faqCorps: faqDepuisBlocs(blocs),
    lecture: Math.max(2, Math.round(compterMots(corps) / MOTS_PAR_MINUTE)),
  };
}

export function compterMots(texte: string): number {
  return texteBrut(texte).split(/\s+/).filter(Boolean).length;
}

// ── Markdown restreint ───────────────────────────────────────────────────────
//
// Volontairement petit : `## Titre {#id}`, `### Titre`, paragraphes, listes `- ` et `1. `,
// `**gras**`, `*italique*`, `[texte](/lien)`. Rien d'autre n'est reconnu, ce qui garde les articles
// homogènes et le rendu prévisible. Zéro dépendance. Ce fichier ne contient aucun JSX : le rendu vit dans
// `components/blog/Markdown.tsx`, chargé seulement à l'affichage d'une page, si bien que les tests
// et le vérificateur tournent sans charger `next/link`.

export type Bloc =
  | { type: "h2"; id: string; texte: string }
  | { type: "h3"; texte: string }
  | { type: "p"; texte: string }
  | { type: "ul" | "ol"; items: string[] };

export function lireBlocs(md: string): Bloc[] {
  const blocs: Bloc[] = [];
  for (const brut of md.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/)) {
    const lignes = brut.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lignes.length) continue;
    const premiere = lignes[0];
    const h2 = /^##\s+(.+?)(?:\s+\{#([a-z0-9-]+)\})?$/.exec(premiere);
    if (h2 && !premiere.startsWith("###")) {
      blocs.push({ type: "h2", id: h2[2] ?? ancre(h2[1]), texte: h2[1] });
      if (lignes.length > 1) blocs.push({ type: "p", texte: lignes.slice(1).join(" ") });
      continue;
    }
    if (premiere.startsWith("### ")) {
      blocs.push({ type: "h3", texte: premiere.slice(4) });
      if (lignes.length > 1) blocs.push({ type: "p", texte: lignes.slice(1).join(" ") });
      continue;
    }
    if (lignes.every((l) => l.startsWith("- "))) {
      blocs.push({ type: "ul", items: lignes.map((l) => l.slice(2)) });
      continue;
    }
    if (lignes.every((l) => /^\d+\.\s/.test(l))) {
      blocs.push({ type: "ol", items: lignes.map((l) => l.replace(/^\d+\.\s/, "")) });
      continue;
    }
    blocs.push({ type: "p", texte: lignes.join(" ") });
  }
  return blocs;
}

/** Le texte sans balisage : pour compter les mots et remplir la FAQ balisée. */
export function texteBrut(md: string): string {
  return md
    .replace(/\{#[a-z0-9-]+\}/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*#]/g, "")
    .replace(/^\s*(?:-|\d+\.)\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function faqDepuisBlocs(blocs: Bloc[]): Array<{ q: string; a: string }> {
  const faq: Array<{ q: string; a: string }> = [];
  blocs.forEach((b, i) => {
    const suivant = blocs[i + 1];
    if (b.type === "h2" && b.texte.trim().endsWith("?") && suivant?.type === "p") {
      faq.push({ q: texteBrut(b.texte), a: texteBrut(suivant.texte) });
    }
  });
  return faq;
}

function ancre(titre: string): string {
  return titre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48)
    .replace(/-$/, "");
}
