import { beforeEach, describe, expect, it } from "vitest";
import { _resetDbForTests, createSearchProfile, listListings } from "@/lib/idb";
import { CaptureError, importCapture, looksLikeCapture, parseCapture } from "@app/lib/lbcCapture";

beforeEach(async () => {
  await _resetDbForTests();
});

function batch(items: unknown[]) {
  return JSON.stringify({
    app: "terouva",
    type: "listing-batch",
    version: 1,
    captured_at: new Date().toISOString(),
    source_url: "https://www.leboncoin.fr/recherche?category=10",
    items,
  });
}

const CARD = {
  url: "https://www.leboncoin.fr/ad/locations/2890123456",
  external_id: "2890123456",
  title: "T2 lumineux avec balcon",
  price: 890,
  surface: 42,
  rooms: 2,
  postal_code: "69004",
  images: ["https://img.leboncoin.fr/api/v1/photo.jpg"],
  published_at: "2026-10-07T06:00:00.000Z",
};

describe("parseCapture", () => {
  it("lit une capture du marque-page et garde les champs utiles", () => {
    const out = parseCapture(batch([CARD]));
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      url: CARD.url,
      external_id: "2890123456",
      title: "T2 lumineux avec balcon",
      price: 890,
      surface: 42,
      rooms: 2,
      postal_code: "69004",
    });
    expect(out[0].images).toEqual(CARD.images);
  });

  it("accepte aussi une annonce seule copiée depuis l'extension", () => {
    const one = JSON.stringify({
      app: "terouva",
      type: "listing-clipboard",
      version: 1,
      data: CARD,
    });
    expect(parseCapture(one)).toHaveLength(1);
  });

  it("déduplique les annonces répétées sur la page", () => {
    expect(parseCapture(batch([CARD, { ...CARD }, CARD]))).toHaveLength(1);
  });

  it("écarte ce qui ne pointe pas vers Leboncoin", () => {
    const out = parseCapture(
      batch([CARD, { ...CARD, url: "https://example.com/ad/1" }, { url: "pas une url" }]),
    );
    expect(out).toHaveLength(1);
  });

  it("nettoie les valeurs douteuses plutôt que de les propager", () => {
    const out = parseCapture(
      batch([{ ...CARD, price: "1 240 €", surface: "-5", rooms: {}, title: "   ", images: ["javascript:alert(1)"] }]),
    );
    expect(out[0].price).toBe(1240);
    expect(out[0].surface).toBe(5);
    expect(out[0].rooms).toBeNull();
    expect(out[0].title).toBeNull();
    expect(out[0].images).toEqual([]);
  });

  it("refuse un texte qui n'est pas une capture Terouva", () => {
    expect(() => parseCapture("bonjour")).toThrow(CaptureError);
    expect(() => parseCapture(JSON.stringify({ app: "autre" }))).toThrow(CaptureError);
    expect(() => parseCapture(batch([]))).toThrow(CaptureError);
  });
});

describe("looksLikeCapture", () => {
  it("reconnaît une capture et ignore un e-mail d'alerte", () => {
    expect(looksLikeCapture(batch([CARD]))).toBe(true);
    expect(looksLikeCapture("<html><a href='https://www.leboncoin.fr/ad/1'>x</a></html>")).toBe(false);
  });
});

describe("importCapture", () => {
  it("insère les annonces captées et les note avec la recherche active", async () => {
    await createSearchProfile({
      name: "Lyon",
      city: "Lyon",
      price_max: 950,
      surface_min: 30,
      rooms_min: 2,
      is_active: 1,
    });

    const summary = await importCapture(
      batch([CARD, { ...CARD, url: "https://www.leboncoin.fr/ad/locations/2890999888", external_id: "2890999888" }]),
    );

    expect(summary).toMatchObject({ found: 2, added: 2, duplicates: 0 });
    const listings = await listListings();
    expect(listings).toHaveLength(2);
    expect(listings[0].score).not.toBeNull();
  });

  it("ne crée pas de doublon quand on recolle la même page", async () => {
    await importCapture(batch([CARD]));
    const again = await importCapture(batch([CARD]));
    expect(again.added).toBe(0);
    expect(await listListings()).toHaveLength(1);
  });
});
