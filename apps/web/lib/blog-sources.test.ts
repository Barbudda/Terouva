import { describe, expect, it } from "vitest";
import { ARTICLES, cheminArticle } from "./blog";
import type { FicheSerie } from "./blog-format";

/**
 * Vérification des citations contre leurs sources, en ligne (`npm run blog:sources`).
 *
 * Chaque fait d'un article au format série porte un extrait mot pour mot de sa source. Ce test
 * télécharge la source et y cherche l'extrait : trouvé, le fait est prouvé sans qu'aucun relecteur ne
 * rouvre la page ; introuvable (texte changé, page bloquée aux robots), il part en relecture humaine.
 * Il ne tourne que par `npm run blog:sources`, jamais dans `npm test` (réseau, lenteur).
 */

const ACTIF = process.env.npm_lifecycle_event === "blog:sources";
const SERIE = ARTICLES.filter((a) => (a as Partial<FicheSerie>).format_source === "serie") as unknown as FicheSerie[];
const filtre = process.env.BLOG_SLUG;

function normaliser(t: string): string {
  return t
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;| | /g, " ")
    .replace(/&rsquo;|&#8217;|’/g, "'")
    .replace(/&laquo;|&raquo;|«|»|&quot;|“|”/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;|&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
}

const cache = new Map<string, Promise<string>>();
function lire(url: string): Promise<string> {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url, { headers: { "user-agent": "Mozilla/5.0 (verification des sources de terouva.com)" }, signal: AbortSignal.timeout(20_000) })
        .then(async (r) => (r.ok ? normaliser(await r.text()) : `__HTTP_${r.status}__`))
        .catch((e: Error) => `__ERREUR_${e.name}__`),
    );
  }
  return cache.get(url)!;
}

describe.runIf(ACTIF)("citations retrouvées dans leurs sources", () => {
  for (const a of SERIE.filter((x) => !filtre || x.slug === filtre)) {
    describe(cheminArticle(a), () => {
      for (const f of a.faits) {
        it(`${f.fait} (${new URL(f.source).hostname})`, async () => {
          const page = await lire(f.source);
          expect(page.startsWith("__"), `source illisible : ${page}`).toBe(false);
          expect(page.includes(normaliser(f.citation)), "citation introuvable dans la source").toBe(true);
        }, 30_000);
      }
    });
  }
});

it("vérification des sources : désactivée hors de npm run blog:sources", () => {
  expect(true).toBe(true);
});
