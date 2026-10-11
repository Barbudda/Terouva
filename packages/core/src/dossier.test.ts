import { describe, expect, it } from "vitest";
import {
  compterPieces,
  dossierEnTexte,
  dossierRequis,
  GARANTIES,
  INTERDITS,
  LOGEMENTS,
  SITUATIONS,
  type Demande,
} from "./dossier";

const base: Demande = { situation: "salarie", logement: "locataire", garantie: "personne" };

/** Tous les libellés du dossier, à plat. */
function libelles(d: ReturnType<typeof dossierRequis>): string {
  return [...d.vous, ...d.garant]
    .flatMap((c) => c.pieces.map((p) => `${p.libelle} ${p.precision ?? ""}`))
    .join(" | ");
}

describe("dossierRequis", () => {
  it("donne les quatre catégories du décret, quelle que soit la situation", () => {
    for (const s of SITUATIONS) {
      for (const l of LOGEMENTS) {
        const d = dossierRequis({ situation: s.valeur, logement: l.valeur, garantie: "aucune" });
        expect(d.vous.map((c) => c.titre)).toEqual([
          "Identité",
          "Domicile actuel",
          "Activité professionnelle",
          "Ressources",
        ]);
        for (const c of d.vous) expect(c.pieces.length).toBeGreaterThan(0);
      }
    }
  });

  it("ne demande pas de bulletins de salaire à qui n'en a pas", () => {
    for (const s of ["independant", "etudiant", "retraite", "demandeur"] as const) {
      const texte = libelles(dossierRequis({ ...base, situation: s, garantie: "aucune" }));
      expect(texte).not.toContain("bulletins de salaire");
      expect(texte).not.toContain("Contrat de travail");
    }
  });

  it("demande des bilans à un indépendant, et jamais plus de deux", () => {
    const texte = libelles(dossierRequis({ ...base, situation: "independant", garantie: "aucune" }));
    expect(texte).toContain("deux derniers bilans");
  });

  it("demande un certificat de scolarité à un étudiant", () => {
    const texte = libelles(dossierRequis({ ...base, situation: "etudiant", garantie: "aucune" }));
    expect(texte).toContain("certificat de scolarité");
  });

  it("donne à l'alternant à la fois son contrat et sa scolarité", () => {
    const texte = libelles(dossierRequis({ ...base, situation: "alternant", garantie: "aucune" }));
    expect(texte).toContain("Contrat d'alternance");
    expect(texte).toContain("certificat de scolarité");
    expect(texte).toContain("bulletins de salaire");
  });

  it("adapte le justificatif de domicile au logement actuel", () => {
    const attendus: Record<string, string> = {
      locataire: "quittances de loyer",
      heberge: "attestation sur l'honneur",
      proprietaire: "taxe foncière",
    };
    for (const [logement, mot] of Object.entries(attendus)) {
      const d = dossierRequis({ ...base, logement: logement as Demande["logement"], garantie: "aucune" });
      const domicile = d.vous.find((c) => c.titre === "Domicile actuel")!;
      expect(domicile.pieces.length).toBe(1);
      expect(`${domicile.pieces[0].libelle} ${domicile.pieces[0].precision ?? ""}`.toLowerCase()).toContain(mot);
    }
  });

  it("ne demande aucune pièce de garant avec Visale, et l'explique", () => {
    const d = dossierRequis({ ...base, garantie: "visale" });
    expect(d.garant).toHaveLength(0);
    expect(d.note).toContain("visa");
  });

  it("détaille les pièces du garant quand il y en a un", () => {
    const d = dossierRequis({ ...base, garantie: "personne" });
    expect(d.garant.length).toBe(4);
    expect(d.note).toBeNull();
  });

  it("signale l'absence de garant sans en faire un obstacle", () => {
    const d = dossierRequis({ ...base, garantie: "aucune" });
    expect(d.garant).toHaveLength(0);
    expect(d.note).toContain("Visale");
  });

  it("joint toujours la liste des documents interdits", () => {
    const d = dossierRequis(base);
    expect(d.interdits).toBe(INTERDITS);
    expect(d.interdits.join(" ")).toContain("carte Vitale");
    expect(d.interdits.join(" ")).toContain("relevé de compte");
  });

  it("ne propose jamais une pièce interdite", () => {
    for (const s of SITUATIONS) {
      for (const g of GARANTIES) {
        const texte = libelles(dossierRequis({ situation: s.valeur, logement: "locataire", garantie: g.valeur }));
        expect(texte).not.toMatch(/\bRIB\b/);
        expect(texte).not.toContain("carte Vitale");
        expect(texte).not.toContain("casier judiciaire");
        expect(texte).not.toContain("relevé de compte");
      }
    }
  });
});

describe("dossierEnTexte", () => {
  it("produit une liste copiable, avec la source", () => {
    const texte = dossierEnTexte(dossierRequis(base));
    expect(texte).toContain("VOTRE DOSSIER");
    expect(texte).toContain("POUR VOTRE GARANT");
    expect(texte).toContain("CE QU'ON NE PEUT PAS VOUS DEMANDER");
    expect(texte).toContain("2015-1437");
    expect(texte).not.toContain("undefined");
  });

  it("omet le bloc garant quand il n'y en a pas", () => {
    const texte = dossierEnTexte(dossierRequis({ ...base, garantie: "visale" }));
    expect(texte).not.toContain("POUR VOTRE GARANT");
    expect(texte).toContain("Action Logement");
  });
});

describe("compterPieces", () => {
  it("ne compte pas les variantes", () => {
    const d = dossierRequis({ situation: "salarie", logement: "locataire", garantie: "aucune" });
    const brut = d.vous.reduce((n, c) => n + c.pieces.length, 0);
    expect(compterPieces(d.vous)).toBeLessThan(brut);
    // Identité (1 + 1 variante), domicile (1), activité (1), ressources (3).
    expect(compterPieces(d.vous)).toBe(6);
  });

  it("compte zéro sur une liste vide", () => {
    expect(compterPieces([])).toBe(0);
  });
});
