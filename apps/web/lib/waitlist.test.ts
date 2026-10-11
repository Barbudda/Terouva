import { describe, expect, it } from "vitest";
import { isAlreadyRegistered, parseWaitlistInput } from "@/lib/waitlist";

describe("parseWaitlistInput", () => {
  it("accepte une adresse normale et la normalise", () => {
    expect(parseWaitlistInput({ email: "  Camille.Martin@Example.FR " })).toEqual({
      kind: "ok",
      email: "camille.martin@example.fr",
    });
  });

  it("repère le champ piège sans rien enregistrer", () => {
    expect(parseWaitlistInput({ email: "robot@example.com", website: "http://spam" })).toEqual({
      kind: "bot",
    });
  });

  it("refuse ce qui n'est manifestement pas une adresse", () => {
    for (const email of ["", "   ", "camille", "camille@", "@example.fr", "a b@example.fr"]) {
      expect(parseWaitlistInput({ email }).kind).toBe("invalid");
    }
  });

  it("refuse une adresse démesurée", () => {
    expect(parseWaitlistInput({ email: "a".repeat(250) + "@example.fr" }).kind).toBe("invalid");
  });

  it("refuse un corps de requête qui n'est pas un objet", () => {
    expect(parseWaitlistInput(null).kind).toBe("invalid");
    expect(parseWaitlistInput("camille@example.fr").kind).toBe("invalid");
    expect(parseWaitlistInput({ email: 42 }).kind).toBe("invalid");
  });
});

describe("isAlreadyRegistered", () => {
  it("reconnaît un contact déjà présent", () => {
    expect(isAlreadyRegistered({ message: "Contact already exists" })).toBe(true);
    expect(isAlreadyRegistered({ name: "validation_error", message: "Email already in use" })).toBe(true);
  });

  it("laisse passer les vraies erreurs", () => {
    expect(isAlreadyRegistered(null)).toBe(false);
    expect(isAlreadyRegistered({ message: "Invalid API key" })).toBe(false);
  });
});
