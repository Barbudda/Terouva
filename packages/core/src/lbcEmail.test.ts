import { describe, it, expect } from "vitest";
import { parseLbcAlertEmail, lbcAlertEmailToListings } from "./lbcEmail";

// Fixture synthétique imitant la structure d'un mail d'alerte LBC : un lien direct,
// un lien de tracking (URL réelle encodée dans un param), un doublon, un lien hors-LBC.
const SAMPLE = `
<html><body>
  <h1>Nouvelles annonces pour ta recherche</h1>
  <a href="https://www.leboncoin.fr/ad/locations/2891234567">Studio 28 m² - Paris 11e - 900 €</a>
  <a href="https://clic.leboncoin.fr/r?u=https%3A%2F%2Fwww.leboncoin.fr%2Fad%2Flocations%2F2891999888%3Futm_source%3Dalert">T2 - Lyon - 750 €</a>
  <a href="https://www.leboncoin.fr/ad/locations/2891234567?utm=dup">doublon du 1er</a>
  <a href="https://example.com/newsletter">se désabonner</a>
</body></html>
`;

describe("parseLbcAlertEmail", () => {
  it("extrait les annonces et déduplique par id", () => {
    const r = parseLbcAlertEmail(SAMPLE);
    const ids = r.map((x) => x.external_id).sort();
    expect(ids).toEqual(["2891234567", "2891999888"]);
  });

  it("résout l'URL réelle depuis un lien de tracking encodé", () => {
    const r = parseLbcAlertEmail(SAMPLE);
    const tracked = r.find((x) => x.external_id === "2891999888");
    expect(tracked?.url).toBe("https://www.leboncoin.fr/ad/locations/2891999888");
  });

  it("nettoie les query params de l'URL canonique", () => {
    const r = parseLbcAlertEmail(SAMPLE);
    const direct = r.find((x) => x.external_id === "2891234567");
    expect(direct?.url).toBe("https://www.leboncoin.fr/ad/locations/2891234567");
  });

  it("ignore les liens non-LBC", () => {
    const r = parseLbcAlertEmail(SAMPLE);
    expect(r.some((x) => x.url.includes("example.com"))).toBe(false);
  });

  it("gère le format itemId-", () => {
    const r = parseLbcAlertEmail(
      `<a href="https://www.leboncoin.fr/locations/offres/ile_de_france/?itemId-2877111222">X</a>`,
    );
    expect(r[0]?.external_id).toBe("2877111222");
  });

  it("renvoie [] sur un contenu vide ou sans annonce", () => {
    expect(parseLbcAlertEmail("")).toEqual([]);
    expect(parseLbcAlertEmail("aucun lien ici")).toEqual([]);
  });

  it("mappe vers ParsedListing (champs détaillés à null, à enrichir)", () => {
    const listings = lbcAlertEmailToListings(SAMPLE);
    expect(listings).toHaveLength(2);
    expect(listings[0].url).toContain("leboncoin.fr/ad/");
    expect(listings[0].title).toBeNull();
    expect(listings[0].images).toEqual([]);
  });
});
