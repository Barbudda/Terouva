import { describe, expect, it } from "vitest";
import { calculerLoyer, formatEuros, lireMontant, LOYER_MAX, resumeEnTexte, type Entrees } from "./loyer";

/** Les espaces insécables d'Intl rendent les comparaisons illisibles : on les aplatit. */
const plat = (s: string | null) => (s ?? "").replace(/[  ]/g, " ");

const BASE: Entrees = {
  loyer: null,
  ressources: null,
  aides: null,
  ressourcesGarant: null,
  zone: "region-1575",
  profil: "autre",
};

describe("lireMontant", () => {
  it("accepte les écritures françaises et anglaises", () => {
    expect(lireMontant("1 200", LOYER_MAX).valeur).toBe(1200);
    expect(lireMontant("1200,50", LOYER_MAX).valeur).toBe(1200.5);
    expect(lireMontant("1 200.50 €", LOYER_MAX).valeur).toBe(1200.5);
    expect(lireMontant("1 200", LOYER_MAX).valeur).toBe(1200);
  });

  it("laisse un champ vide sans erreur", () => {
    expect(lireMontant("  ", LOYER_MAX)).toEqual({ valeur: null, erreur: null });
  });

  it("refuse le texte, le négatif et l'excès", () => {
    expect(lireMontant("abc", LOYER_MAX).erreur).not.toBeNull();
    expect(lireMontant("-700", LOYER_MAX).erreur).not.toBeNull();
    expect(lireMontant("25000", LOYER_MAX).erreur).not.toBeNull();
  });
});

describe("repère « trois fois le loyer »", () => {
  it("700 € de loyer : 2 100 € attendus", () => {
    const r = calculerLoyer({ ...BASE, loyer: 700 });
    expect(r.ressourcesAttendues).toBe(2100);
    expect(r.tauxEffort).toBeNull();
  });

  it("mesure l'écart et le taux d'effort", () => {
    const r = calculerLoyer({ ...BASE, loyer: 700, ressources: 1800 });
    expect(r.manqueRepere).toBe(300);
    expect(r.tauxEffort).toBe(39);
    expect(calculerLoyer({ ...BASE, loyer: 700, ressources: 2150 }).manqueRepere).toBe(0);
  });

  it("dans l'autre sens, donne le loyer qui tient le repère, arrondi vers le bas", () => {
    expect(calculerLoyer({ ...BASE, ressources: 2000 }).loyerRepere).toBe(666);
  });

  it("ressources à zéro : pas de division, tout le repère manque", () => {
    const r = calculerLoyer({ ...BASE, loyer: 600, ressources: 0 });
    expect(r.tauxEffort).toBeNull();
    expect(r.manqueRepere).toBe(1800);
  });

  it("calcule le taux avec les aides à part", () => {
    const r = calculerLoyer({ ...BASE, loyer: 600, ressources: 1500, aides: 300 });
    expect(r.tauxEffort).toBe(40);
    expect(r.tauxAvecAides).toBe(33);
  });

  it("applique le même repère au garant", () => {
    const r = calculerLoyer({ ...BASE, loyer: 800, ressourcesGarant: 2000 });
    expect(r.garant).toEqual({ attendu: 2400, manque: 400 });
  });
});

describe("Visale (F33453)", () => {
  it("hors étudiant : loyer au plus la moitié des ressources", () => {
    expect(calculerLoyer({ ...BASE, loyer: 700, ressources: 1400 }).visale.statut).toBe("accordable");
    const r = calculerLoyer({ ...BASE, loyer: 700, ressources: 1300 });
    expect(r.visale).toMatchObject({ statut: "ressources-insuffisantes", manque: 100 });
  });

  it("refuse au-dessus du plafond de la zone, même avec de grosses ressources", () => {
    const r = calculerLoyer({ ...BASE, zone: "region-1365", loyer: 1400, ressources: 9000 });
    expect(r.visale).toEqual({ statut: "hors-plafond", plafond: 1365 });
    expect(calculerLoyer({ ...BASE, zone: "idf", loyer: 1400, ressources: 9000 }).visale.statut).toBe(
      "accordable",
    );
  });

  it("borne le loyer couvert par le plafond", () => {
    expect(calculerLoyer({ ...BASE, zone: "idf", ressources: 5000 }).loyerVisale).toBe(1940);
    expect(calculerLoyer({ ...BASE, ressources: 1500 }).loyerVisale).toBe(750);
  });

  it("étudiant sous le seuil : aucune condition de ressources", () => {
    const r = calculerLoyer({ ...BASE, profil: "etudiant", zone: "idf", loyer: 1000, ressources: 0 });
    expect(r.visale).toEqual({ statut: "sans-condition", seuil: 1000 });
  });

  it("étudiant au-dessus du seuil : ressources à dépasser strictement", () => {
    const e = { ...BASE, profil: "etudiant" as const, loyer: 900 };
    expect(calculerLoyer({ ...e, ressources: 1700 }).visale.statut).toBe("accordable");
    expect(calculerLoyer({ ...e, ressources: 1680 }).visale).toMatchObject({
      statut: "ressources-insuffisantes",
      manque: 1,
    });
  });

  it("outre-mer : mêmes seuils que le plafond de 1 575 €", () => {
    const r = calculerLoyer({ ...BASE, profil: "etudiant", zone: "outre-mer", loyer: 840, ressources: 0 });
    expect(r.visale.statut).toBe("sans-condition");
  });

  it("sans loyer, rien à dire", () => {
    expect(calculerLoyer({ ...BASE, ressources: 2000 }).visale.statut).toBe("a-completer");
  });
});

describe("texte à copier", () => {
  it("reprend les montants saisis, sans verdict", () => {
    const e = { ...BASE, loyer: 700, ressources: 2150, ressourcesGarant: 3000 };
    expect(plat(resumeEnTexte(e, calculerLoyer(e)))).toBe(
      "Ressources du foyer : 2 150 € nets par mois, pour un loyer de 700 € charges comprises (taux d'effort de 33 %). Garant : 3 000 € nets par mois.",
    );
  });

  it("ne produit rien tant qu'il manque un montant", () => {
    const e = { ...BASE, loyer: 700 };
    expect(resumeEnTexte(e, calculerLoyer(e))).toBeNull();
  });

  it("formate les euros à la française", () => {
    expect(plat(formatEuros(1940))).toBe("1 940 €");
  });
});
