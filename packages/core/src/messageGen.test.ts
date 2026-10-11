import { describe, expect, it } from "vitest";
import type { Listing, UserProfile } from "./types";
import { generateMessage, TONE_LABELS } from "./messageGen";

function buildListing(): Listing {
  return {
    id: 42,
    search_profile_id: null,
    external_id: "999",
    source: "leboncoin",
    url: "https://www.leboncoin.fr/ad/999",
    title: "T2 lumineux",
    price: 1100,
    city: "Lyon",
    postal_code: "69003",
    surface: 42,
    rooms: 2,
    furnished: 0,
    property_type: "apartment",
    description: "Bel appartement avec balcon",
    images: null,
    publisher_name: null,
    publisher_type: "private",
    published_at: new Date().toISOString(),
    discovered_at: new Date().toISOString(),
    status: "new",
    score: null,
    score_reasons: null,
    notes: null,
    raw_html: null,
  };
}

function buildProfile(over: Partial<UserProfile> = {}): UserProfile {
  return {
    id: 1,
    first_name: "Hugo",
    last_name: "Poêné",
    email: "hugo@example.fr",
    phone: "06 12 34 56 78",
    situation: "Salarié CDI",
    income_monthly: 3200,
    guarantors: "Parents (cadres CDI)",
    contract_type: "non meublé",
    intro_message: "Locataire sérieux, calme, non fumeur.",
    occupants: null,
    move_in_date: null,
    intended_stay: null,
    visit_availability: null,
    preferred_contact: "phone",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...over,
  };
}

describe("generateMessage", () => {
  for (const tone of ["direct", "warm", "pro"] as const) {
    it(`returns a non-empty string in tone ${tone}`, () => {
      const msg = generateMessage(buildListing(), buildProfile(), tone);
      expect(msg.length).toBeGreaterThan(40);
    });
  }

  it("includes the full name in all tones", () => {
    for (const tone of ["direct", "warm", "pro"] as const) {
      const msg = generateMessage(buildListing(), buildProfile(), tone);
      expect(msg).toContain("Hugo");
    }
  });

  it("includes the phone number in all tones", () => {
    for (const tone of ["direct", "warm", "pro"] as const) {
      const msg = generateMessage(buildListing(), buildProfile(), tone);
      expect(msg).toContain("06 12 34 56 78");
    }
  });

  it("includes the income when set, formatted the French way", () => {
    const msg = generateMessage(buildListing(), buildProfile(), "pro");
    expect(msg).toContain("3 200 €");
    expect(msg).not.toContain("3200€");
  });

  it("falls back gracefully on an empty profile (no crash, still has structure)", () => {
    const emptyProfile = buildProfile({
      first_name: null,
      last_name: null,
      phone: null,
      email: null,
      income_monthly: null,
      situation: null,
      contract_type: null,
      guarantors: null,
      intro_message: null,
    });
    const msg = generateMessage(buildListing(), emptyProfile, "pro");
    expect(msg.length).toBeGreaterThan(40);
    expect(msg).toContain("[téléphone]"); // placeholder fallback
  });

  it("uses the intro_message in the warm tone when present", () => {
    const intro = "Je m'appelle Hugo, je cherche un studio dans le 11e.";
    const msg = generateMessage(
      buildListing(),
      buildProfile({ intro_message: intro }),
      "warm",
    );
    expect(msg).toContain(intro);
  });

  it("exposes labels for all three tones", () => {
    expect(TONE_LABELS.direct).toBeDefined();
    expect(TONE_LABELS.warm).toBeDefined();
    expect(TONE_LABELS.pro).toBeDefined();
  });
});

describe('écriture des messages', () => {
  const TONS = ['direct', 'warm', 'pro'] as const;

  it("n'écrit jamais de tiret cadratin", () => {
    // Signal « vibecodé » n° 9 : ces messages partent chez de vrais propriétaires.
    for (const ton of TONS) {
      for (let v = 0; v < 6; v += 1) {
        expect(generateMessage(buildListing(), buildProfile(), ton, v)).not.toContain('—');
      }
    }
  });

  it("ne récite jamais l'annonce à qui l'a écrite", () => {
    // Surface, prix, nombre de pièces, ville, code postal : la personne qui
    // reçoit le message les connaît déjà. Les répéter sent le texte fabriqué.
    const l = buildListing(); // T2 lumineux, 42 m², 1100 €, Lyon 69003
    for (const ton of TONS) {
      for (let v = 0; v < 6; v += 1) {
        const msg = generateMessage(l, buildProfile(), ton, v);
        expect(msg).not.toContain("42");
        expect(msg).not.toContain("m²");
        expect(msg).not.toContain("1100");
        expect(msg).not.toContain("1 100");
        expect(msg).not.toContain("69003");
        expect(msg).not.toContain("Lyon");
        expect(msg).not.toMatch(/\b2 pièces\b|\bT2\b/);
      }
    }
  });

  it("ne laisse jamais d'accord entre parenthèses", () => {
    // « intéressé(e) » : on ne connaît pas le genre de l'utilisateur, et ces
    // parenthèses signent un texte à trous.
    for (const ton of TONS) {
      for (let v = 0; v < 6; v += 1) {
        expect(generateMessage(buildListing(), buildProfile(), ton, v)).not.toMatch(/\(e\)|\(se\)|\(ve\)/);
      }
    }
  });

  it("cite ce qui a plu dans l'annonce, sans en faire une fiche", () => {
    const avecBalcon = { ...buildListing(), description: "Bel appartement avec balcon." };
    const sansRien = { ...buildListing(), title: "Appartement", description: "Libre de suite." };
    expect(generateMessage(avecBalcon, buildProfile(), "direct", 0)).toContain("le balcon");
    // Rien à signaler : on n'invente pas d'agrément.
    expect(generateMessage(sansRien, buildProfile(), "direct", 0)).not.toContain("en particulier pour");
  });

  it("donne six versions distinctes par ton", () => {
    for (const ton of TONS) {
      const versions = new Set(
        Array.from({ length: 6 }, (_, v) => generateMessage(buildListing(), buildProfile(), ton, v)),
      );
      expect(versions.size).toBeGreaterThanOrEqual(4);
    }
  });

  it("reste court : une candidature, pas une lettre", () => {
    for (const ton of TONS) {
      for (let v = 0; v < 6; v += 1) {
        const msg = generateMessage(buildListing(), buildProfile(), ton, v);
        expect(msg.split("\n").filter((l) => l.trim()).length).toBeLessThanOrEqual(9);
      }
    }
  });

  it('ne colle pas deux parenthèses de suite', () => {
    for (const ton of TONS) {
      for (let v = 0; v < 6; v += 1) {
        expect(generateMessage(buildListing(), buildProfile(), ton, v)).not.toMatch(/\)\s*\(/);
      }
    }
  });
});

describe('accords et tournures libres', () => {
  it("n'écrit pas « en fonctionnaire »", () => {
    const p = buildProfile({ situation: 'professeure', contract_type: 'fonctionnaire' });
    for (let v = 0; v < 6; v += 1) {
      const msg = generateMessage(buildListing(), p, 'direct', v);
      expect(msg).not.toContain('en fonctionnaire');
      expect(msg).toContain('professeure, fonctionnaire');
    }
  });

  it('garde « en CDI », qui se dit', () => {
    const p = buildProfile({ situation: 'infirmière', contract_type: 'CDI' });
    expect(generateMessage(buildListing(), p, 'direct', 0)).toContain('infirmière en CDI');
  });

  it('accorde un garant au pluriel', () => {
    const p = buildProfile({ guarantors: 'mes parents' });
    for (let v = 0; v < 6; v += 1) {
      const msg = generateMessage(buildListing(), p, 'warm', v);
      expect(msg).not.toContain('mon garant est mes parents');
      expect(msg.toLowerCase()).toContain('garant : mes parents');
    }
  });

  it('tourne autrement une garantie nommée', () => {
    const p = buildProfile({ guarantors: 'garantie Visale' });
    expect(generateMessage(buildListing(), p, 'direct', 0)).toContain('la garantie Visale');
  });

  it("ignore un champ contrat qui n'en est pas un", () => {
    const p = buildProfile({ situation: 'infirmière', contract_type: 'non meublé' });
    expect(generateMessage(buildListing(), p, 'direct', 0)).not.toContain('non meublé');
  });
});

describe("informations pratiques", () => {
  const TOUS_LES_TONS = ["direct", "warm", "pro"] as const;
  const complet = () =>
    buildProfile({
      occupants: 2,
      move_in_date: "2026-12-01",
      intended_stay: "durablement",
      visit_availability: "en semaine après 18 h",
    });

  it("dit combien de personnes, à partir de quand, et pour combien de temps", () => {
    const msg = generateMessage(buildListing(), complet(), "direct", 0);
    expect(msg).toContain("Nous serions 2 à y vivre");
    expect(msg).toContain("1er décembre");
    expect(msg).toContain("installer durablement");
    expect(msg).toContain("en semaine après 18 h");
  });

  it("accorde le pluriel quand on est plusieurs", () => {
    const msg = generateMessage(buildListing(), complet(), "direct", 0);
    expect(msg).toContain("nous pouvons emménager");
    expect(msg).not.toContain("je peux emménager");
    expect(msg).toContain("Nous cherchons à nous installer");
  });

  it("reste au singulier à une seule personne", () => {
    const msg = generateMessage(buildListing(), buildProfile({ occupants: 1 }), "direct", 0);
    expect(msg).toContain("Je serais la seule personne à y vivre");
    expect(msg).not.toContain("Nous serions");
  });

  it("ne laisse aucun trou quand les champs sont vides", () => {
    const vide = buildProfile({
      occupants: null,
      move_in_date: null,
      intended_stay: null,
      visit_availability: null,
    });
    for (const ton of TOUS_LES_TONS) {
      for (let v = 0; v < 6; v += 1) {
        const msg = generateMessage(buildListing(), vide, ton, v);
        expect(msg).not.toContain("à y vivre");
        expect(msg).not.toContain("à partir du");
        expect(msg).not.toMatch(/\bnull\b|undefined|NaN/);
      }
    }
  });

  it("ignore une date illisible plutôt que de l'afficher", () => {
    const msg = generateMessage(buildListing(), buildProfile({ move_in_date: "dès que possible" }), "direct", 0);
    expect(msg).not.toContain("dès que possible");
    expect(msg).not.toContain("à partir du");
  });

  it("écrit « 1er » et non « 1 » pour le premier du mois", () => {
    const msg = generateMessage(buildListing(), buildProfile({ move_in_date: "2026-03-01" }), "direct", 0);
    expect(msg).toContain("1er mars");
    const quinze = generateMessage(buildListing(), buildProfile({ move_in_date: "2026-03-15" }), "direct", 0);
    expect(quinze).toContain("15 mars");
  });

  it("ne répète pas le même verbe dans la phrase pratique", () => {
    for (let v = 0; v < 6; v += 1) {
      const msg = generateMessage(buildListing(), buildProfile({ occupants: 1, move_in_date: "2026-12-01" }), "warm", v);
      expect(msg).not.toMatch(/je serais[^.]*je serais/);
    }
  });

  it("préfère des créneaux réels à une formule vague", () => {
    const avec = generateMessage(buildListing(), complet(), "direct", 0);
    expect(avec).toContain("Pour la visite, je suis disponible");
    const sans = generateMessage(buildListing(), buildProfile({ visit_availability: null }), "direct", 0);
    expect(sans).not.toContain("Pour la visite");
  });
});

describe("justificatifs annoncés", () => {
  it("ne promet pas de bulletins de salaire à un indépendant", () => {
    const p = buildProfile({ situation: "graphiste", contract_type: "indépendant" });
    const msg = generateMessage(buildListing(), p, "pro", 0);
    expect(msg).not.toContain("contrat de travail");
    expect(msg).not.toContain("bulletins de salaire");
    expect(msg).toContain("bilans");
  });

  it("cite le certificat de scolarité pour un étudiant", () => {
    const p = buildProfile({ situation: "étudiant", contract_type: null });
    expect(generateMessage(buildListing(), p, "pro", 0)).toContain("certificat de scolarité");
  });

  it("garde contrat et bulletins pour un salarié, alternance comprise", () => {
    for (const c of ["CDI", "CDD", "alternance"]) {
      const p = buildProfile({ situation: "étudiant", contract_type: c });
      expect(generateMessage(buildListing(), p, "pro", 0)).toContain("bulletins de salaire");
    }
  });

  it("n'enchaîne pas « et » après une clause à deux points", () => {
    const p = buildProfile({ guarantors: "mes parents", income_monthly: 2000 });
    for (let v = 0; v < 6; v += 1) {
      const msg = generateMessage(buildListing(), p, "direct", v);
      expect(msg).not.toMatch(/garant : [^.]*\bet\b/);
    }
  });
});
