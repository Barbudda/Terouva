import { describe, expect, it } from "vitest";
import { cheminPour, clefPour, inscritsRecents, versCsv, type Inscrit } from "@/lib/inscriptions";

const inscrit = (email: string, date: string): Inscrit => ({
  clef: clefPour(email),
  email,
  date,
});

describe("clefPour", () => {
  it("donne la même clé quelle que soit la casse ou les espaces", () => {
    expect(clefPour("  Camille.Martin@Example.FR ")).toBe(clefPour("camille.martin@example.fr"));
  });

  it("distingue deux adresses différentes", () => {
    expect(clefPour("a@example.fr")).not.toBe(clefPour("b@example.fr"));
  });

  it("ne laisse pas l'adresse apparaître dans la clé", () => {
    const clef = clefPour("camille@example.fr");
    expect(clef).toMatch(/^[0-9a-f]{40}$/);
    expect(clef).not.toContain("camille");
    expect(clef).not.toContain("example");
  });
});

describe("cheminPour", () => {
  it("range sous le préfixe, avec une extension json", () => {
    expect(cheminPour("camille@example.fr")).toMatch(/^inscriptions\/[0-9a-f]{40}\.json$/);
  });
});

describe("inscritsRecents", () => {
  const maintenant = Date.parse("2026-10-20T12:00:00.000Z");

  it("compte ce qui tombe dans la fenêtre", () => {
    const liste = [
      inscrit("a@example.fr", "2026-10-20T08:00:00.000Z"),
      inscrit("b@example.fr", "2026-10-15T08:00:00.000Z"),
      inscrit("c@example.fr", "2026-09-01T08:00:00.000Z"),
    ];
    expect(inscritsRecents(liste, 1, maintenant)).toBe(1);
    expect(inscritsRecents(liste, 7, maintenant)).toBe(2);
    expect(inscritsRecents(liste, 365, maintenant)).toBe(3);
  });

  it("ignore une date illisible au lieu de la compter", () => {
    const liste = [inscrit("a@example.fr", "pas une date")];
    expect(inscritsRecents(liste, 7, maintenant)).toBe(0);
  });
});

describe("versCsv", () => {
  it("écrit un en-tête et une ligne par inscrit", () => {
    const csv = versCsv([
      inscrit("camille@example.fr", "2026-10-20T08:00:00.000Z"),
      inscrit("dominique@example.fr", "2026-10-19T08:00:00.000Z"),
    ]);
    const lignes = csv.split("\r\n");
    expect(lignes[0]).toBe("email;date");
    expect(lignes[1]).toBe('"camille@example.fr";"2026-10-20T08:00:00.000Z"');
    expect(lignes).toHaveLength(3);
  });

  it("échappe les guillemets au lieu de casser la colonne", () => {
    const csv = versCsv([inscrit('bizarre"adresse@example.fr', "2026-10-20T08:00:00.000Z")]);
    expect(csv).toContain('"bizarre""adresse@example.fr"');
  });

  it("ne rend qu'un en-tête quand la liste est vide", () => {
    expect(versCsv([])).toBe("email;date");
  });
});
