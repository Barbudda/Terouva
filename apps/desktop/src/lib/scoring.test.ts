import { describe, expect, it } from "vitest";
import type { Listing, SearchProfile } from "@/types";
import { extractFloor, scoreListing } from "./scoring";

// ────────────────────────────── fixtures ──────────────────────────────

function buildListing(over: Partial<Listing> = {}): Listing {
  return {
    id: 1,
    search_profile_id: null,
    external_id: "12345",
    source: "leboncoin",
    url: "https://www.leboncoin.fr/ad/12345",
    title: "Studio lumineux 28m²",
    price: 900,
    city: "Paris",
    postal_code: "75011",
    surface: 28,
    rooms: 1,
    furnished: 1,
    property_type: "apartment",
    description:
      "Magnifique studio au 3e étage, ascenseur, balcon plein sud, parking optionnel.",
    images: null,
    publisher_name: "Pierre",
    publisher_type: "private",
    published_at: new Date().toISOString(),
    discovered_at: new Date().toISOString(),
    status: "new",
    score: null,
    score_reasons: null,
    notes: null,
    raw_html: null,
    ...over,
  };
}

function buildProfile(over: Partial<SearchProfile> = {}): SearchProfile {
  return {
    id: 1,
    name: "Test",
    city: "Paris",
    neighborhoods: null,
    radius_km: null,
    price_max: 1200,
    surface_min: 25,
    rooms_min: 1,
    furnished: "any",
    property_type: "any",
    keywords_must: null,
    keywords_exclude: null,
    must_have_elevator: 0,
    must_have_balcony: 0,
    must_have_parking: 0,
    must_have_cave: 0,
    floor_min: null,
    floor_max: null,
    lbc_search_url: null,
    check_frequency_minutes: 30,
    is_active: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...over,
  };
}

// ────────────────────────────── tests ──────────────────────────────

describe("scoreListing", () => {
  it("matches a perfect listing with score ≥ 80", () => {
    const r = scoreListing(buildListing(), buildProfile());
    expect(r.score).toBeGreaterThanOrEqual(80);
    expect(r.reasons.recommendation).toBe("to_contact_fast");
  });

  it("penalizes overpriced listings", () => {
    const r = scoreListing(
      buildListing({ price: 1800 }),
      buildProfile({ price_max: 1000 }),
    );
    expect(r.score).toBeLessThan(50);
    expect(r.reasons.negative.some((s) => s.includes("au-dessus"))).toBe(true);
  });

  it("kills the score when an excluded keyword is present (-50 penalty)", () => {
    const r = scoreListing(
      buildListing({
        title: "Studio en colocation",
        description: "Colocation conviviale recherchée",
      }),
      buildProfile({ keywords_exclude: "colocation" }),
    );
    expect(r.score).toBeLessThan(50);
    expect(
      r.reasons.negative.some((s) => s.toLowerCase().includes("colocation")),
    ).toBe(true);
  });

  it("rewards recent listings (<2h)", () => {
    const r = scoreListing(
      buildListing({
        published_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      }),
      buildProfile(),
    );
    expect(r.reasons.positive.some((s) => s.includes("très récente"))).toBe(true);
  });

  it("flags older listings (>7d)", () => {
    const r = scoreListing(
      buildListing({
        published_at: new Date(
          Date.now() - 10 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        discovered_at: new Date(
          Date.now() - 10 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      }),
      buildProfile(),
    );
    expect(r.reasons.negative.some((s) => s.includes(">7j"))).toBe(true);
  });

  it("requires equipment when must_have_X is set", () => {
    const r = scoreListing(
      buildListing({ description: "Petit studio sans rien" }),
      buildProfile({ must_have_elevator: 1, must_have_balcony: 1 }),
    );
    expect(
      r.reasons.negative.some((s) => s.includes("Ascenseur")),
    ).toBe(true);
    expect(
      r.reasons.negative.some((s) => s.includes("Balcon")),
    ).toBe(true);
  });

  it("credits equipment when present and required", () => {
    const r = scoreListing(
      buildListing({ description: "Avec ascenseur, balcon plein sud, parking" }),
      buildProfile({
        must_have_elevator: 1,
        must_have_balcony: 1,
        must_have_parking: 1,
      }),
    );
    expect(r.reasons.positive.filter((s) => s.includes("présent")).length).toBe(3);
  });

  it("respects 'sans ascenseur' as a negator", () => {
    const r = scoreListing(
      buildListing({ description: "Studio sans ascenseur, 5e étage" }),
      buildProfile({ must_have_elevator: 1 }),
    );
    expect(
      r.reasons.negative.some((s) => s.includes("Ascenseur") && s.includes("non")),
    ).toBe(true);
  });

  it("penalizes floors below floor_min", () => {
    const r = scoreListing(
      buildListing({ description: "Studio au 1er étage" }),
      buildProfile({ floor_min: 3 }),
    );
    expect(r.reasons.negative.some((s) => s.includes("trop bas"))).toBe(true);
  });

  it("penalizes floors above floor_max", () => {
    const r = scoreListing(
      buildListing({ description: "8ème étage avec vue" }),
      buildProfile({ floor_max: 5 }),
    );
    expect(r.reasons.negative.some((s) => s.includes("trop haut"))).toBe(true);
  });

  it("rewards a neighborhood match from the CSV", () => {
    const r = scoreListing(
      buildListing({ city: "Paris", title: "Studio Oberkampf" }),
      buildProfile({ city: "Paris", neighborhoods: "Oberkampf, Bastille" }),
    );
    expect(
      r.reasons.positive.some((s) => s.toLowerCase().includes("oberkampf")),
    ).toBe(true);
  });

  it("clamps the score to [0, 100]", () => {
    const r1 = scoreListing(
      buildListing({ price: 99999 }),
      buildProfile({
        price_max: 500,
        keywords_exclude: "studio,lumineux,m²",
      }),
    );
    expect(r1.score).toBeGreaterThanOrEqual(0);
    expect(r1.score).toBeLessThanOrEqual(100);
  });
});

describe("scoreListing — robustesse (type, accents, récence, confiance)", () => {
  it("scores property_type match (maison voulue, maison trouvée)", () => {
    const r = scoreListing(
      buildListing({ property_type: "maison" }),
      buildProfile({ property_type: "house" }),
    );
    expect(r.reasons.positive.some((s) => s.includes("Type de bien correspondant"))).toBe(true);
  });

  it("penalizes property_type mismatch (appartement voulu, maison trouvée)", () => {
    const r = scoreListing(
      buildListing({ property_type: "maison" }),
      buildProfile({ property_type: "apartment" }),
    );
    expect(r.reasons.negative.some((s) => s.includes("Type de bien différent"))).toBe(true);
    expect(r.reasons.breakdown.find((b) => b.rule.includes("Type de bien différent"))?.delta).toBe(-30);
  });

  it("matches a city despite accents/case (Périgueux ≈ perigueux)", () => {
    const r = scoreListing(
      buildListing({ city: "Périgueux", title: "Maison", description: "Belle maison" }),
      buildProfile({ city: "perigueux" }),
    );
    expect(r.reasons.positive.some((s) => s.includes("Ville correspondante"))).toBe(true);
  });

  it("matches keywords ignoring accents (meublé ≈ meuble)", () => {
    const r = scoreListing(
      buildListing({ description: "Bel appartement meuble et lumineux" }),
      buildProfile({ keywords_must: "meublé" }),
    );
    expect(r.reasons.positive.some((s) => s.toLowerCase().includes("meubl"))).toBe(true);
  });

  it("does NOT assume a watch listing is fresh when published_at is unknown", () => {
    const r = scoreListing(
      buildListing({ published_at: null, discovered_at: new Date().toISOString() }),
      buildProfile(),
    );
    expect(r.reasons.positive.some((s) => s.includes("très récente"))).toBe(false);
    expect(r.reasons.positive.some((s) => s.includes("Fraîchement détectée"))).toBe(true);
  });

  it("keeps the strong recency bonus when published_at IS recent", () => {
    const r = scoreListing(
      buildListing({ published_at: new Date(Date.now() - 20 * 60 * 1000).toISOString() }),
      buildProfile(),
    );
    expect(r.reasons.positive.some((s) => s.includes("très récente"))).toBe(true);
  });

  it("downgrades 'à contacter vite' → 'intéressant' on partial data (low confidence)", () => {
    const r = scoreListing(
      buildListing({
        city: null,
        rooms: null,
        description: null,
        published_at: null,
        discovered_at: new Date().toISOString(),
        title: "Studio",
      }),
      buildProfile({ keywords_exclude: "colocation", must_have_elevator: 1 }),
    );
    expect(r.score).toBeGreaterThanOrEqual(80);
    expect(r.reasons.recommendation).toBe("interesting");
    expect(r.reasons.confidence).toBeLessThan(0.5);
    expect(r.reasons.negative.some((s) => s.includes("données partielles"))).toBe(true);
  });

  it("never recommends fast-contact when the price is unknown", () => {
    const r = scoreListing(
      buildListing({ price: null }),
      buildProfile({ price_max: 1200 }),
    );
    expect(r.reasons.recommendation).not.toBe("to_contact_fast");
    expect(r.reasons.negative.some((s) => s.includes("prix inconnu"))).toBe(true);
  });

  it("reports full confidence when every set criterion is evaluable", () => {
    const r = scoreListing(buildListing(), buildProfile());
    expect(r.reasons.confidence).toBe(1);
    expect(r.reasons.recommendation).toBe("to_contact_fast");
  });

  it("does not penalize a must-have equipment as absent when there is no description", () => {
    const r = scoreListing(
      buildListing({ description: null }),
      buildProfile({ must_have_parking: 1 }),
    );
    const entry = r.reasons.breakdown.find((b) => b.rule.includes("non vérifiable"));
    expect(entry).toBeDefined();
    expect(entry?.delta).toBe(0);
  });
});

describe("extractFloor", () => {
  it("returns 0 for RDC", () => {
    expect(extractFloor("Studio en RDC")).toBe(0);
    expect(extractFloor("Au rez-de-chaussée d'un immeuble")).toBe(0);
  });

  it("extracts numeric floors", () => {
    expect(extractFloor("3e étage avec ascenseur")).toBe(3);
    expect(extractFloor("8ème étage")).toBe(8);
    expect(extractFloor("au 1er étage")).toBe(1);
  });

  it("returns null when no floor is mentioned", () => {
    expect(extractFloor("Joli studio lumineux")).toBeNull();
    expect(extractFloor("")).toBeNull();
  });

  it("ignores absurd floor numbers", () => {
    expect(extractFloor("99e étage")).toBe(null);
  });
});
