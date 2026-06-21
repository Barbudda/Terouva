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

  it("includes the income when set, with the right unit", () => {
    const msg = generateMessage(buildListing(), buildProfile(), "pro");
    expect(msg).toContain("3200");
    expect(msg.toLowerCase()).toContain("€");
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
