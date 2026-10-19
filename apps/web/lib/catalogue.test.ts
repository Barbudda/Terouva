import { describe, expect, it } from "vitest";
import { GUIDES, OUTILS } from "./catalogue";

/**
 * Garde-fous sur le catalogue.
 *
 * Un titre trop long se fait couper au milieu d'un mot dans les résultats de
 * recherche, et une description trop longue perd sa fin, souvent l'argument.
 * Ces limites sont des ordres de grandeur observés, pas une règle officielle :
 * aucun moteur ne publie de maximum. Elles évitent surtout de dériver sans s'en
 * apercevoir au fil des pages ajoutées.
 */
const SUFFIXE = " · Terouva".length;
const TITRE_MAX = 60;
const DESC_MIN = 70;
// 160 est la limite au-delà de laquelle Google tronque ; 155 laisse la marge
// qu'il faut pour qu'un rendu mobile ou un suffixe ajouté ne coupe pas la
// phrase en son milieu. Toutes les pages tiennent déjà sous ce seuil.
const DESC_MAX = 155;

const TOUT = [
  ...GUIDES.map((g) => ({ quoi: `guide ${g.chemin}`, ...g })),
  ...OUTILS.map((o) => ({ quoi: `outil ${o.chemin}`, ...o })),
];

describe("catalogue", () => {
  for (const page of TOUT) {
    describe(page.quoi, () => {
      it("a un titre de recherche qui tient dans la limite", () => {
        expect(page.titreSeo.length + SUFFIXE).toBeLessThanOrEqual(TITRE_MAX);
      });

      it("a une description de longueur utile", () => {
        expect(page.description.length).toBeGreaterThanOrEqual(DESC_MIN);
        expect(page.description.length).toBeLessThanOrEqual(DESC_MAX);
      });

      it("a un chemin en minuscules, sans accent ni barre finale", () => {
        expect(page.chemin).toMatch(/^\/[a-z0-9/-]+$/);
        expect(page.chemin).not.toMatch(/\/$/);
      });

      it("a un titre affiché distinct du titre de recherche ou plus riche", () => {
        expect(page.titre.length).toBeGreaterThanOrEqual(page.titreSeo.length);
      });
    });
  }

  it("n'a pas deux pages au même chemin", () => {
    const chemins = TOUT.map((p) => p.chemin);
    expect(new Set(chemins).size).toBe(chemins.length);
  });

  it("donne à chaque guide une date de publication lisible", () => {
    for (const g of GUIDES) {
      expect(g.publieLe).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(g.publieLe))).toBe(false);
    }
  });

  it("ne renvoie que vers des sources en HTTPS", () => {
    for (const g of GUIDES) {
      for (const s of g.sources ?? []) expect(s.url).toMatch(/^https:\/\//);
    }
  });

  it("donne un sommaire dont les ancres sont des identifiants valides", () => {
    for (const g of GUIDES) {
      for (const s of g.sommaire ?? []) expect(s.id).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
