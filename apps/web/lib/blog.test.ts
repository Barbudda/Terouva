import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { GET as flux } from "@/app/flux.xml/route";
import { GET as llms } from "@/app/llms.txt/route";
import {
  ARTICLES,
  BLOG,
  articlePublie,
  articlesPublies,
  blogModifieLe,
  blogOuvert,
  cheminArticle,
  type Article,
} from "./blog";
import { GUIDES, OUTILS } from "./catalogue";

/**
 * Garde-fous du blog.
 *
 * Deux familles : la rubrique vide ne doit s'annoncer nulle part (une page
 * `noindex` listée au plan du site, ou un lien de menu vers une page vide,
 * sont des contradictions qu'un moteur relève), et chaque article ajouté doit
 * tenir les règles de la ligne éditoriale (`docs/seo/blog/LIGNE-EDITORIALE.md`).
 */

const corps = async () => ({ default: () => null });
const base: Article = {
  slug: "exemple",
  titre: "Titre",
  titreSeo: "Titre",
  description: "Description",
  chapeau: "Chapeau",
  publieLe: "2026-11-20",
  pilier: "A",
  format: "question",
  lecture: 4,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: [],
  sources: [],
  statut: "publie",
  corps,
};

describe("blog : sélection des articles", () => {
  const liste: Article[] = [
    { ...base, slug: "ancien", publieLe: "2026-11-10" },
    { ...base, slug: "recent", publieLe: "2026-11-20", modifieLe: "2026-11-25" },
    { ...base, slug: "brouillon", publieLe: "2026-11-30", statut: "brouillon" },
  ];

  it("écarte les brouillons et trie du plus récent au plus ancien", () => {
    expect(articlesPublies(liste).map((a) => a.slug)).toEqual(["recent", "ancien"]);
    expect(articlePublie("brouillon", liste)).toBeUndefined();
  });

  it("n'ouvre la rubrique qu'avec un article publié", () => {
    expect(blogOuvert([])).toBe(false);
    expect(blogOuvert([{ ...base, statut: "brouillon" }])).toBe(false);
    expect(blogOuvert(liste)).toBe(true);
  });

  it("date la rubrique par son article le plus récemment modifié", () => {
    expect(blogModifieLe(liste)).toBe("2026-11-25");
    expect(blogModifieLe([])).toBeUndefined();
  });
});

describe("blog : rien n'est annoncé avant le premier article", () => {
  const ouvert = blogOuvert();
  const publies = articlesPublies().map(cheminArticle);
  const brouillons = ARTICLES.filter((a) => a.statut !== "publie").map(cheminArticle);

  it("le plan du site suit l'état de la rubrique", () => {
    const chemins = sitemap().map((e) => new URL(e.url).pathname);
    expect(chemins.includes(BLOG)).toBe(ouvert);
    for (const c of publies) expect(chemins).toContain(c);
    for (const c of brouillons) expect(chemins).not.toContain(c);
  });

  it("le flux suit l'état de la rubrique", async () => {
    const xml = await flux().text();
    expect(xml.includes(`${BLOG}/`)).toBe(ouvert);
    for (const c of brouillons) expect(xml).not.toContain(c);
  });

  it("llms.txt suit l'état de la rubrique", async () => {
    const txt = await llms().text();
    expect(txt.includes("## Articles récents")).toBe(ouvert);
    for (const c of brouillons) expect(txt).not.toContain(c);
  });

  it("aucune page hors du blog ne lie vers lui tant qu'il est vide", () => {
    if (ouvert) return;
    const racine = join(__dirname, "..");
    const fichiers = [...lister(join(racine, "app")), ...lister(join(racine, "components"))].filter(
      (f) => !/[\\/](app|components)[\\/]blog[\\/]/.test(f),
    );
    const fautifs = fichiers.filter((f) => /href=\{?["'`]\/blog/.test(readFileSync(f, "utf8")));
    expect(fautifs).toEqual([]);
  });
});

describe("blog : chaque article tient les règles", () => {
  const SUFFIXE = " · Terouva".length;
  const guides = new Set(GUIDES.map((g) => g.chemin));
  const outils = new Set(OUTILS.map((o) => o.chemin));
  const date = /^\d{4}-\d{2}-\d{2}$/;

  it("les adresses sont uniques", () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const a of ARTICLES) {
    describe(cheminArticle(a), () => {
      it("a une adresse en minuscules, sans accent ni date", () => {
        expect(a.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        expect(a.slug).not.toMatch(/20\d\d/);
      });

      it("a un titre et une description dans les limites", () => {
        expect(a.titreSeo.length + SUFFIXE).toBeLessThanOrEqual(60);
        expect(a.description.length).toBeGreaterThanOrEqual(70);
        expect(a.description.length).toBeLessThanOrEqual(155);
      });

      it("a un chapeau-réponse de 40 à 60 mots", () => {
        const mots = a.chapeau.trim().split(/\s+/).length;
        expect(mots).toBeGreaterThanOrEqual(40);
        expect(mots).toBeLessThanOrEqual(60);
      });

      it("a des dates valides et une mise à jour expliquée", () => {
        expect(a.publieLe).toMatch(date);
        if (a.modifieLe) {
          expect(a.modifieLe).toMatch(date);
          expect(a.modifieLe >= a.publieLe).toBe(true);
          if (a.modifieLe !== a.publieLe) {
            expect(a.misesAJour?.some((m) => m.le === a.modifieLe)).toBe(true);
          }
        }
      });

      it("renvoie vers un guide pilier, des guides et un outil qui existent", () => {
        expect(guides.has(a.guidePilier)).toBe(true);
        for (const g of a.guidesLies) expect(guides.has(g)).toBe(true);
        if (a.outilLie) expect(outils.has(a.outilLie)).toBe(true);
      });

      it("cite des sources datées", () => {
        if (a.statut === "publie") expect(a.sources.length).toBeGreaterThan(0);
        for (const s of a.sources) {
          expect(s.url).toMatch(/^https:\/\//);
          expect(s.releveLe).toMatch(date);
        }
      });

      it("a un corps qui se charge", async () => {
        const charge = await a.corps();
        expect(typeof charge.default).toBe("function");
      });
    });
  }
});

function lister(dossier: string): string[] {
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) return lister(chemin);
    return /\.(tsx?|mdx?)$/.test(nom) ? [chemin] : [];
  });
}
