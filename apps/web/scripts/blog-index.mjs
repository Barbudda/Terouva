// Génère lib/blog-index.ts à partir des fiches components/blog/articles/<slug>.meta.ts.
//
// Pourquoi un fichier généré : un article tient dans deux fichiers à lui (corps et fiche), si bien
// que plusieurs rédacteurs écrivent en même temps sans jamais toucher un fichier commun. La liste
// des articles se déduit du dossier ; le test de blog.test.ts refuse un index en retard.
//
// Usage : node scripts/blog-index.mjs  (lancé aussi par « prebuild »)

import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ici = dirname(fileURLToPath(import.meta.url));
export const DOSSIER = join(ici, "..", "components", "blog", "articles");
export const SORTIE = join(ici, "..", "lib", "blog-index.ts");

/** Les slugs qui ont une fiche, triés pour un résultat stable. */
export function slugs(dossier = DOSSIER) {
  return readdirSync(dossier)
    .filter((f) => f.endsWith(".meta.ts"))
    .map((f) => f.slice(0, -".meta.ts".length))
    .sort();
}

/** Le contenu attendu de lib/blog-index.ts. */
export function genererIndex(dossier = DOSSIER) {
  const liste = slugs(dossier);
  const imports = liste.map((s, i) => `import m${i} from "@/components/blog/articles/${s}.meta";`);
  const entrees = liste.map(
    (s, i) => `  { ...m${i}, corps: () => import("@/components/blog/articles/${s}") },`,
  );
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
  console.log(`lib/blog-index.ts : ${slugs().length} article(s).`);
}
