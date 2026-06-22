import { beforeEach, describe, expect, it } from "vitest";
import { _resetDbForTests, createSearchProfile, getListingByUrl, listListings } from "@/lib/idb";
import { importLbcAlertEmail, ingestParsedListing } from "@app/lib/watchBridge";
import type { ParsedListing } from "@terouva/core";

beforeEach(async () => {
  await _resetDbForTests();
});

function parsed(url: string): ParsedListing {
  return {
    url, external_id: null, title: null, price: null, city: null, postal_code: null,
    surface: null, rooms: null, furnished: null, property_type: null, description: null,
    images: [], publisher_name: null, publisher_type: null, published_at: null, raw_html_size: 0,
  };
}

describe("importLbcAlertEmail (web) — pont parser → IndexedDB", () => {
  it("extrait les annonces d'un email d'alerte et les insère dans le feed", async () => {
    const email = `
      <html><body>
        <p>Nouvelles annonces pour votre recherche</p>
        <a href="https://www.leboncoin.fr/ad/locations/2890123456">Studio Paris 11e</a>
        <a href="https://www.leboncoin.fr/ad/locations/2890999888">T2 lumineux</a>
        <a href="https://www.leboncoin.fr/account/unsubscribe">Se désabonner</a>
      </body></html>`;
    const summary = await importLbcAlertEmail(email);
    expect(summary.found).toBe(2);
    expect(summary.added).toBe(2);
    expect(summary.duplicates).toBe(0);
    const listings = await listListings();
    expect(listings).toHaveLength(2);
    expect(await getListingByUrl("https://www.leboncoin.fr/ad/locations/2890123456")).toBeDefined();
  });

  it("déduplique : une annonce déjà présente n'est pas ré-insérée", async () => {
    const email = `<a href="https://www.leboncoin.fr/ad/locations/2890123456">Studio</a>`;
    await importLbcAlertEmail(email);
    const second = await importLbcAlertEmail(email);
    expect(second.found).toBe(1);
    expect(second.added).toBe(0);
    expect(second.duplicates).toBe(1);
    expect(await listListings()).toHaveLength(1);
  });

  it("score l'annonce ingérée contre la recherche active", async () => {
    await createSearchProfile({ name: "Paris", is_active: 1, price_max: 1200, city: "Paris" });
    const r = await ingestParsedListing(parsed("https://www.leboncoin.fr/ad/locations/2891111222"));
    expect(r.status).toBe("new");
    // sans détails l'annonce a un score calculé (faible confiance), pas null
    expect(typeof r.score).toBe("number");
  });
});
