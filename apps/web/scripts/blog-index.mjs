// Génère lib/blog-index.ts à partir des articles présents dans le dépôt.
//
// Deux formats cohabitent :
// - format JSX (les premiers articles) : components/blog/articles/<slug>.tsx (corps) + <slug>.meta.ts ;
// - format série (tous les nouveaux) : content/blog/<slug>.ts, un seul fichier, corps en Markdown
//   (voir lib/blog-format.tsx).
// Un article tient dans ses propres fichiers, si bien que plusieurs rédacteurs écrivent en même temps
// sans fichier commun. Le test de blog.test.ts refuse un index en retard.
//
// Usage : node scripts/blog-index.mjs  (lancé aussi par « prebuild »)

import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ici = dirname(fileURLToPath(import.meta.url));
export const DOSSIER = join(ici, "..", "components", "blog", "articles");
export const DOSSIER_SERIE = join(ici, "..", "content", "blog");
export const SORTIE = join(ici, "..", "lib", "blog-index.ts");

/** Slugs au format JSX (une fiche .meta.ts), triés pour un résultat stable. */
export function slugs(dossier = DOSSIER) {
  return readdirSync(dossier)
    .filter((f) => f.endsWith(".meta.ts"))
    .map((f) => f.slice(0, -".meta.ts".length))
    .sort();
}

/** Slugs au format série (content/blog/<slug>.ts ; un nom qui commence par « _ » est ignoré). */
export function slugsSerie(dossier = DOSSIER_SERIE) {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier)
    .filter((f) => f.endsWith(".ts") && !f.startsWith("_") && !f.endsWith(".test.ts"))
    .map((f) => f.slice(0, -".ts".length))
    .sort();
}

/** Le contenu attendu de lib/blog-index.ts. */
export function genererIndex(dossier = DOSSIER, dossierSerie = DOSSIER_SERIE) {
  const jsx = slugs(dossier);
  const serie = slugsSerie(dossierSerie);
  const imports = [
    ...jsx.map((s, i) => `import m${i} from "@/components/blog/articles/${s}.meta";`),
    ...serie.map((s, i) => `import s${i} from "@/content/blog/${s}";`),
  ];
  const entrees = [
    ...jsx.map((s, i) => `  { ...m${i}, corps: () => import("@/components/blog/articles/${s}") },`),
    ...serie.map(
      (_, i) =>
        `  { ...s${i}, corps: () => import("@/components/blog/Markdown").then((m) => ({ default: m.corpsDe(s${i}.markdown) })) },`,
    ),
  ];
  return [
    "// Fichier généré par scripts/blog-index.mjs (npm run blog:index) : ne pas éditer à la main.",
    'import type { Article } from "./blog";',
    ...imports,
    "",
    "export const ARTICLES_INDEX: Article[] = [",
    ...entrees,
    "];",
    "",
  ].join("\n");
}

const estScript = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (estScript) {
  writeFileSync(SORTIE, genererIndex());
  console.log(`lib/blog-index.ts : ${slugs().length} article(s) JSX, ${slugsSerie().length} au format série.`);
}
