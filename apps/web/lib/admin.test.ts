import { describe, expect, it } from "vitest";
import { sameToken, tokenFor, usablePassword } from "./admin";
import { inscritsRecents, type Inscrit } from "./inscrits";

describe("tokenFor", () => {
  it("ne contient pas le mot de passe", () => {
    const jeton = tokenFor("mot-de-passe-tres-long");
    expect(jeton).not.toContain("mot-de-passe");
    expect(jeton).toMatch(/^[0-9a-f]{64}$/);
  });

  it("donne le même jeton pour le même mot de passe", () => {
    expect(tokenFor("abcdefgh")).toBe(tokenFor("abcdefgh"));
  });

  it("donne un jeton différent pour un autre mot de passe", () => {
    expect(tokenFor("abcdefgh")).not.toBe(tokenFor("abcdefgi"));
  });
});

describe("sameToken", () => {
  it("accepte deux jetons identiques", () => {
    expect(sameToken(tokenFor("abcdefgh"), tokenFor("abcdefgh"))).toBe(true);
  });

  it("refuse un jeton différent", () => {
    expect(sameToken(tokenFor("abcdefgh"), tokenFor("autre-mot"))).toBe(false);
  });

  it("refuse un cookie absent", () => {
    expect(sameToken(undefined, tokenFor("abcdefgh"))).toBe(false);
  });

  it("refuse une longueur différente sans lever d'erreur", () => {
    expect(sameToken("court", tokenFor("abcdefgh"))).toBe(false);
  });
});

describe("usablePassword", () => {
  it("refuse l'absence de mot de passe", () => {
    expect(usablePassword(undefined)).toBe(false);
    expect(usablePassword("")).toBe(false);
  });

  it("refuse un mot de passe trop court", () => {
    expect(usablePassword("court12")).toBe(false);
  });

  it("refuse une suite d'espaces", () => {
    expect(usablePassword("         ")).toBe(false);
  });

  it("accepte huit caractères ou plus", () => {
    expect(usablePassword("huitcars")).toBe(true);
  });
});

describe("inscritsRecents", () => {
  const maintenant = Date.parse("2026-10-11T12:00:00.000Z");
  const inscrit = (jours: number, desinscrit = false): Inscrit => ({
    id: `c${jours}${desinscrit}`,
    email: `a${jours}@exemple.fr`,
    date: new Date(maintenant - jours * 24 * 60 * 60 * 1000).toISOString(),
    desinscrit,
  });

  it("compte les inscriptions de la fenêtre", () => {
    const liste = [inscrit(0), inscrit(3), inscrit(6.5), inscrit(9)];
    expect(inscritsRecents(liste, 7, maintenant)).toBe(3);
  });

  it("ignore les désinscrits", () => {
    expect(inscritsRecents([inscrit(1), inscrit(2, true)], 7, maintenant)).toBe(1);
  });

  it("ignore une date illisible", () => {
    const casse: Inscrit = { id: "x", email: "x@exemple.fr", date: "pas-une-date", desinscrit: false };
    expect(inscritsRecents([casse], 7, maintenant)).toBe(0);
  });

  it("renvoie zéro sur une liste vide", () => {
    expect(inscritsRecents([], 7, maintenant)).toBe(0);
  });
});
