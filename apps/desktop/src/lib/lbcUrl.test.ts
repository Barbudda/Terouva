import { describe, expect, it } from "vitest";
import { buildLbcSearchUrl, type GeoPoint } from "./lbcUrl";

const PARIS: GeoPoint = {
  label: "Paris",
  postcode: "75000",
  lat: 48.8566,
  lon: 2.3522,
};

// Critères minimaux réutilisables (le builder ne lit qu'un sous-ensemble de SearchProfile).
function crit(over: Record<string, unknown> = {}) {
  return {
    city: "Paris",
    radius_km: null,
    price_max: null,
    surface_min: null,
    rooms_min: null,
    furnished: "any",
    property_type: "any",
    keywords_must: null,
    ...over,
  } as never;
}

describe("buildLbcSearchUrl", () => {
  it("met toujours category=10 (locations)", () => {
    const u = new URL(buildLbcSearchUrl(crit()));
    expect(u.searchParams.get("category")).toBe("10");
  });

  it("encode prix / surface / pièces dans les bons formats", () => {
    const u = new URL(
      buildLbcSearchUrl(crit({ price_max: 1200, surface_min: 25, rooms_min: 2 })),
    );
    expect(u.searchParams.get("price")).toBe("min-1200");
    expect(u.searchParams.get("square")).toBe("25-max");
    expect(u.searchParams.get("rooms")).toBe("2-max");
  });

  it("mappe le type de bien (appartement=2, maison=1)", () => {
    expect(
      new URL(buildLbcSearchUrl(crit({ property_type: "apartment" }))).searchParams.get(
        "real_estate_type",
      ),
    ).toBe("2");
    expect(
      new URL(buildLbcSearchUrl(crit({ property_type: "house" }))).searchParams.get(
        "real_estate_type",
      ),
    ).toBe("1");
    expect(
      new URL(buildLbcSearchUrl(crit({ property_type: "any" }))).searchParams.has(
        "real_estate_type",
      ),
    ).toBe(false);
  });

  it("mappe meublé (oui=1, non=2, indifférent=absent)", () => {
    expect(
      new URL(buildLbcSearchUrl(crit({ furnished: "yes" }))).searchParams.get("furnished"),
    ).toBe("1");
    expect(
      new URL(buildLbcSearchUrl(crit({ furnished: "no" }))).searchParams.get("furnished"),
    ).toBe("2");
    expect(
      new URL(buildLbcSearchUrl(crit({ furnished: "any" }))).searchParams.has("furnished"),
    ).toBe(false);
  });

  it("transforme les mots-clés CSV en text séparé par espaces", () => {
    const u = new URL(buildLbcSearchUrl(crit({ keywords_must: "balcon, lumineux ; calme" })));
    expect(u.searchParams.get("text")).toBe("balcon lumineux calme");
  });

  it("construit le token de localisation géocodé avec le rayon (défaut 10 km)", () => {
    const u = new URL(buildLbcSearchUrl(crit(), PARIS));
    expect(u.searchParams.get("locations")).toBe("Paris_75000__48.85660_2.35220_10000");
  });

  it("respecte le rayon personnalisé", () => {
    const u = new URL(buildLbcSearchUrl(crit({ radius_km: 5 }), PARIS));
    expect(u.searchParams.get("locations")).toContain("_5000");
  });

  it("retombe sur le nom de ville brut sans géo", () => {
    const u = new URL(buildLbcSearchUrl(crit({ city: "Lyon" })));
    expect(u.searchParams.get("locations")).toBe("Lyon");
  });

  it("ignore les valeurs nulles / zéro", () => {
    const u = new URL(buildLbcSearchUrl(crit({ price_max: 0, surface_min: null })));
    expect(u.searchParams.has("price")).toBe(false);
    expect(u.searchParams.has("square")).toBe(false);
  });
});
