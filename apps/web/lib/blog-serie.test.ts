import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { ARTICLES, cheminArticle } from "./blog";
import { article, compterMots, lireBlocs, texteBrut, type FicheSerie } from "./blog-format";
import { GUIDES, OUTILS } from "./catalogue";

/**
 * Le vérificateur des articles au format série (`npm run blog:verifier`).
 *
 * Tout ce qu'une machine peut juger est jugé ici, pour que la relecture humaine ne lise plus que ce
 * qu'elle seule peut juger (le fond, l'apport, la justesse d'une nuance). Un rédacteur fait passer
 * ce fichier au vert avant de rendre son article ; un relecteur ne relit jamais un article rouge.
 */

const SERIE = ARTICLES.filter((a) => (a as Partial<FicheSerie>).format_source === "serie") as unknown as FicheSerie[];
const date = /^\d{4}-\d{2}-\d{2}$/;

/** Tournures que la ligne éditoriale et la checklist pas-IA de BONDS refusent dans un texte public. */
const INTERDITS: Array<[RegExp, string]> = [
  [/—/, "tiret cadratin"],
  [/\p{Extended_Pictographic}/u, "emoji"],
  [/ce n['’]est pas [^.]{1,60}, c['’]est /i, "« ce n'est pas X, c'est Y »"],
  [/il est (important|essentiel|crucial) de (noter|souligner|rappeler)/i, "remplissage « il est important de noter »"],
  [/n['’]hésitez pas/i, "« n'hésitez pas »"],
  [/dans cet article/i, "« dans cet article »"],
  [/en (conclusion|résumé),/i, "conclusion qui répète"],
  [/\b(incontournable|crucial|primordial)\b/i, "mot creux"],
  [/plongeons|découvrons ensemble/i, "tournure d'introduction générée"],
  // Vague 8 : le rédacteur racontait sa recherche (« les fiches officielles lues ») ; le lecteur
  // veut la règle. « décision lue » reste permis : la méthode l'enseigne pour borner une décision.
  [/\b(fiches?|pages?|sources?) (officielles? )?lues?\b/i, "le rédacteur raconte sa recherche"],
  [/lorem ipsum|TODO|à compléter/i, "texte provisoire"],
  // Pièges juridiques déjà relevés plusieurs fois en relecture : chaque erreur qui revient devient une
  // règle ici, pour ne plus coûter une relecture (METHODE-SERIE.md, « Pièges connus »).
  [/(?:moins de|avant(?: ses)?) 30 ans/i, "âge Visale : écrire « 30 ans ou moins » (visale.fr), sinon la personne de 30 ans n'entre dans aucune case"],
  [/mention manuscrite/i, "la mention de la caution (art. 2297 C. civ.) n'est plus manuscrite depuis le 1er janvier 2022"],
  [/hors de l['’]Hexagone/i, "art. 22-1 : « territoire métropolitain », qui comprend la Corse"],
  // `\b` ne connaît pas les lettres accentuées (« bâton » contiendrait « ton ») : bornes Unicode.
  [/(?<!\p{L})(?:tu|ton|ta|tes|toi)(?!\p{L})/iu, "tutoiement (le brief impose le vouvoiement)"],
];

/** Toutes les adresses internes qui existent pour un article publié. */
function adressesExistantes(): Set<string> {
  const base = new Set<string>(["/", "/guides", "/outils", "/blog", "/liste", "/app", "/confidentialite", "/cgu", "/mentions-legales"]);
  for (const g of GUIDES) base.add(g.chemin);
  for (const o of OUTILS) base.add(o.chemin);
  for (const a of ARTICLES) if (a.statut === "publie") base.add(cheminArticle(a));
  for (const s of sitemap()) base.add(new URL(s.url).pathname.replace(/\/$/, "") || "/");
  return base;
}

describe("format série : ce qui se déduit", () => {
  const exemple = article({
    slug: "exemple",
    titre: "Exemple",
    titreSeo: "Exemple",
    description: "Description",
    chapeau: "Chapeau",
    publieLe: "2026-11-05",
    pilier: "A",
    format: "question",
    guidePilier: "/guides/dossier-de-location",
    guidesLies: [],
    statut: "brouillon",
    requete: "exemple",
    faits: [
      { fait: "a", valeur: "1", source: "https://a.fr/x", titreSource: "A", releveLe: "2026-11-05", citation: "c" },
      { fait: "b", valeur: "2", source: "https://a.fr/x", titreSource: "A", releveLe: "2026-11-05", citation: "c" },
      { fait: "c", valeur: "3", source: "https://b.fr/y", titreSource: "B", releveLe: "2026-11-05", citation: "c" },
    ],
    corps: `## Première question ? {#premiere}
La **réponse** avec un [lien](/guides/dossier-de-location).

- un
- deux

## Deuxième partie
Texte.`,
  });

  it("une source par URL, un sommaire par intertitre, une FAQ par intertitre-question", () => {
    expect(exemple.sources.map((s) => s.url)).toEqual(["https://a.fr/x", "https://b.fr/y"]);
    expect(exemple.sommaire).toEqual([
      { id: "premiere", titre: "Première question ?" },
      { id: "deuxieme-partie", titre: "Deuxième partie" },
    ]);
    expect(exemple.faqCorps).toEqual([{ q: "Première question ?", a: "La réponse avec un lien." }]);
    expect(exemple.lecture).toBeGreaterThanOrEqual(2);
  });

  it("lit les listes et les paragraphes du Markdown restreint", () => {
    expect(lireBlocs(exemple.markdown).map((b) => b.type)).toEqual(["h2", "p", "ul", "h2", "p"]);
  });
});

describe("articles au format série : vérifications mécaniques", () => {
  const existantes = adressesExistantes();
  const brouillonsSerie = new Set(SERIE.map((a) => cheminArticle(a)));

  it("chaque requête-mère n'est visée qu'une fois", () => {
    const requetes = SERIE.map((a) => a.requete.trim().toLowerCase());
    const doublons = requetes.filter((r, i) => requetes.indexOf(r) !== i);
    expect(doublons, "même requête dans deux articles : cannibalisation").toEqual([]);
  });

  for (const a of SERIE) {
    describe(cheminArticle(a), () => {
      const blocs = lireBlocs(a.markdown);

      it("a une requête, au moins 3 faits sourcés, datés et cités", () => {
        expect(a.requete.trim().length).toBeGreaterThan(3);
        expect(a.faits.length).toBeGreaterThanOrEqual(3);
        for (const f of a.faits) {
          expect(f.source, f.fait).toMatch(/^https:\/\//);
          expect(f.releveLe, f.fait).toMatch(date);
          const mots = f.citation.trim().split(/\s+/).length;
          expect(mots, `citation de « ${f.fait} » : 6 à 30 mots`).toBeGreaterThanOrEqual(6);
          expect(mots, `citation de « ${f.fait} » : 6 à 30 mots`).toBeLessThanOrEqual(30);
        }
      });

      it("a au moins 3 intertitres, et sous chaque question une réponse autonome de 35 à 70 mots", () => {
        const h2 = blocs.filter((b) => b.type === "h2");
        expect(h2.length).toBeGreaterThanOrEqual(3);
        blocs.forEach((b, i) => {
          if (b.type !== "h2" || !b.texte.trim().endsWith("?")) return;
          const suivant = blocs[i + 1];
          expect(suivant?.type, `« ${b.texte} » doit être suivi d'un paragraphe`).toBe("p");
          if (suivant?.type !== "p") return;
          const n = compterMots(suivant.texte);
          expect(n, `réponse à « ${b.texte} » : ${n} mots`).toBeGreaterThanOrEqual(35);
          expect(n, `réponse à « ${b.texte} » : ${n} mots`).toBeLessThanOrEqual(70);
        });
      });

      it("a des ancres d'intertitres uniques", () => {
        const ids = blocs.flatMap((b) => (b.type === "h2" ? [b.id] : []));
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("n'emploie aucune tournure interdite", () => {
        const texte = [a.titre, a.description, a.chapeau, texteBrut(a.markdown)].join(" \n ");
        const trouves = INTERDITS.filter(([re]) => re.test(texte)).map(([, nom]) => nom);
        expect(trouves).toEqual([]);
      });

      it("ne lie que des pages qui existent (et, publié, aucun brouillon)", () => {
        const liens = [...a.markdown.matchAll(/\]\((\/[^)\s#]*)/g)].map((m) => m[1].replace(/\/$/, "") || "/");
        const morts = liens.filter((l) => {
          if (existantes.has(l)) return false;
          // Un brouillon peut viser un autre brouillon de la série : ils partiront dans le même lot.
          return !(a.statut === "brouillon" && brouillonsSerie.has(l));
        });
        expect(morts).toEqual([]);
        expect(liens.some((l) => l === a.guidePilier), "lien vers le guide pilier dans le corps").toBe(true);
      });

      it("ne publie aucun montant ou pourcentage absent de ses faits", () => {
        const preuves = a.faits.map((f) => `${f.valeur} ${f.citation}`).join(" ").replace(/[\s  ]/g, "");
        const montants = [...`${a.chapeau} ${a.markdown}`.matchAll(/\d[\d\s  ]*(?:,\d+)?\s?(?:€|%)/g)]
          .map((m) => m[0].replace(/[\s  €%]/g, ""));
        const orphelins = [...new Set(montants)].filter((m) => !preuves.includes(m));
        expect(orphelins, "chiffre sans fait qui le porte").toEqual([]);
      });
    });
  }
});
