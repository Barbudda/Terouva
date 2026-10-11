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
