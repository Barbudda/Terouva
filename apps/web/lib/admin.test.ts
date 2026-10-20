import { describe, expect, it } from "vitest";
import { sameToken, tokenFor, usablePassword } from "./admin";

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
