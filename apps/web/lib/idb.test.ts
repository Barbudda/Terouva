import { beforeEach, describe, expect, it } from "vitest";
import type { ParsedListing, ScoreReasons } from "@terouva/core";
import {
  _resetDbForTests,
  createSearchProfile,
  deleteListing,
  deleteSearchProfile,
  enrichListing,
  getApplicationByListing,
  getListing,
  getListingByUrl,
  getSearchProfile,
  getSetting,
  getUserProfile,
  insertListingFromParsed,
  listApplications,
  listDocuments,
  listListings,
  listSearchProfiles,
  setApplicationStatus,
  setDocumentAvailable,
  setSetting,
  updateListingScore,
  updateListingStatus,
  updateUserProfile,
  upsertApplication,
} from "./idb";
import { exportBackup, importBackup } from "./backup";

beforeEach(async () => {
  await _resetDbForTests();
});

function parsed(url: string, over: Partial<ParsedListing> = {}): ParsedListing {
  return {
    url,
    external_id: null,
    title: null,
    price: null,
    city: null,
    postal_code: null,
    surface: null,
    rooms: null,
    furnished: null,
    property_type: null,
    description: null,
    images: [],
    publisher_name: null,
    publisher_type: null,
    published_at: null,
    raw_html_size: 0,
    ...over,
  };
}

describe("seed (≡ INSERT du schéma 0001)", () => {
  it("crée le profil utilisateur id=1", async () => {
    const p = await getUserProfile();
    expect(p.id).toBe(1);
    expect(p.first_name).toBeNull();
  });

  it("seed 10 documents, triés required DESC", async () => {
    const docs = await listDocuments();
    expect(docs).toHaveLength(10);
    expect(docs[0].required).toBe(1);
    expect(docs[docs.length - 1].required).toBe(0);
  });

  it("seed les réglages par défaut", async () => {
    expect(await getSetting("theme")).toBe("dark");
    expect(await getSetting("default_message_tone")).toBe("pro");
    expect(await getSetting("notification_min_score")).toBe("70");
    expect(await getSetting("inconnu")).toBeNull();
  });
});

describe("listings — insert, dedup, tri", () => {
  it("insère et relit par id et par url", async () => {
    const id = await insertListingFromParsed(parsed("https://lbc/ad/1", { title: "T1", price: 900 }), null);
    const byId = await getListing(id);
    const byUrl = await getListingByUrl("https://lbc/ad/1");
    expect(byId?.title).toBe("T1");
    expect(byId?.price).toBe(900);
    expect(byId?.source).toBe("leboncoin");
    expect(byId?.status).toBe("new");
    expect(byUrl?.id).toBe(id);
  });

  it("url UNIQUE : un doublon est rejeté (comme SQLite)", async () => {
    await insertListingFromParsed(parsed("https://lbc/ad/dup"), null);
    await expect(insertListingFromParsed(parsed("https://lbc/ad/dup"), null)).rejects.toBeTruthy();
  });

  it("sérialise images et furnished correctement", async () => {
    const id = await insertListingFromParsed(
      parsed("https://lbc/ad/2", { images: ["a", "b"], furnished: true }),
      null,
    );
    const l = await getListing(id);
    expect(l?.images).toBe('["a","b"]');
    expect(l?.furnished).toBe(1);
  });

  it("trie COALESCE(score,0) DESC puis discovered_at DESC, applique limit", async () => {
    const a = await insertListingFromParsed(parsed("https://lbc/ad/a"), null);
    const b = await insertListingFromParsed(parsed("https://lbc/ad/b"), null);
    const c = await insertListingFromParsed(parsed("https://lbc/ad/c"), null);
    await updateListingScore(a, 90, {});
    await updateListingScore(b, 50, {});
    // c reste score=null → traité comme 0, donc dernier
    const sorted = await listListings();
    expect(sorted.map((l) => l.id)).toEqual([a, b, c]);
    expect(await listListings({ limit: 2 })).toHaveLength(2);
  });

  it("filtre par status", async () => {
    const a = await insertListingFromParsed(parsed("https://lbc/ad/x"), null);
    await insertListingFromParsed(parsed("https://lbc/ad/y"), null);
    await updateListingStatus(a, "favorite");
    const fav = await listListings({ status: "favorite" });
    expect(fav).toHaveLength(1);
    expect(fav[0].id).toBe(a);
  });

  it("préserve score_reasons (objet complet dont confidence) verbatim", async () => {
    const id = await insertListingFromParsed(parsed("https://lbc/ad/sr"), null);
    const reasons: ScoreReasons = {
      positive: ["prix ok"],
      negative: [],
      recommendation: "interesting",
      breakdown: [{ rule: "price", delta: 10 }],
      confidence: 0.66,
    };
    await updateListingScore(id, 77, reasons);
    const l = await getListing(id);
    expect(l?.score).toBe(77);
    expect(JSON.parse(l!.score_reasons!)).toEqual(reasons);
  });
});

describe("cascades de clés étrangères", () => {
  it("deleteListing supprime ses candidatures (ON DELETE CASCADE)", async () => {
    const lid = await insertListingFromParsed(parsed("https://lbc/ad/c1"), null);
    await upsertApplication({ listing_id: lid, message: "m", message_tone: "pro" });
    expect(await getApplicationByListing(lid)).toBeDefined();
    await deleteListing(lid);
    expect(await getApplicationByListing(lid)).toBeUndefined();
    expect(await listApplications()).toHaveLength(0);
  });

  it("deleteSearchProfile met search_profile_id à null sur les annonces (ON DELETE SET NULL)", async () => {
    const sid = await createSearchProfile({ name: "Paris" });
    const lid = await insertListingFromParsed(parsed("https://lbc/ad/sp"), sid);
    await deleteSearchProfile(sid);
    expect(await getSearchProfile(sid)).toBeUndefined();
    const l = await getListing(lid);
    expect(l?.search_profile_id).toBeNull();
  });
});

describe("enrichListing — ne remplit que les champs vides", () => {
  it("remplit un champ vide et signale le changement", async () => {
    const id = await insertListingFromParsed(parsed("https://lbc/ad/e1"), null);
    const changed = await enrichListing(id, parsed("https://lbc/ad/e1", { title: "Joli T2", city: "Lyon" }));
    expect(changed).toBe(true);
    const l = await getListing(id);
    expect(l?.title).toBe("Joli T2");
    expect(l?.city).toBe("Lyon");
  });

  it("n'écrase jamais un champ déjà rempli et renvoie false si rien ne change", async () => {
    const id = await insertListingFromParsed(parsed("https://lbc/ad/e2", { title: "Original" }), null);
    const changed = await enrichListing(id, parsed("https://lbc/ad/e2", { title: "Nouveau" }));
    expect(changed).toBe(false);
    expect((await getListing(id))?.title).toBe("Original");
  });
});

describe("applications — COALESCE & dernier en date", () => {
  it("upsert conserve le status existant si non fourni (COALESCE)", async () => {
    const lid = await insertListingFromParsed(parsed("https://lbc/ad/ap"), null);
    const aid = await upsertApplication({ listing_id: lid, message: "v1", message_tone: "pro" });
    await setApplicationStatus(aid, "sent");
    // upsert sans status → garde 'sent'
    await upsertApplication({ listing_id: lid, message: "v2", message_tone: "warm" });
    const app = await getApplicationByListing(lid);
    expect(app?.status).toBe("sent");
    expect(app?.message).toBe("v2");
    expect(app?.message_tone).toBe("warm");
  });

  it("setApplicationStatus conserve sent_at si non fourni (COALESCE)", async () => {
    const lid = await insertListingFromParsed(parsed("https://lbc/ad/ap2"), null);
    const aid = await upsertApplication({ listing_id: lid, message: "m", message_tone: "pro", sent_at: "2026-06-01 10:00:00" });
    await setApplicationStatus(aid, "replied");
    const app = await getApplicationByListing(lid);
    expect(app?.status).toBe("replied");
    expect(app?.sent_at).toBe("2026-06-01 10:00:00");
  });
});

describe("documents & settings — COALESCE / upsert", () => {
  it("setDocumentAvailable conserve file_path si non fourni", async () => {
    const docs = await listDocuments();
    const id = docs[0].id;
    await setDocumentAvailable(id, true, "/chemin/cni.pdf");
    await setDocumentAvailable(id, false);
    const after = (await listDocuments()).find((d) => d.id === id);
    expect(after?.available).toBe(0);
    expect(after?.file_path).toBe("/chemin/cni.pdf");
  });

  it("setSetting fait un upsert par clé", async () => {
    await setSetting("notification_min_score", "85");
    expect(await getSetting("notification_min_score")).toBe("85");
    await setSetting("nouvelle_cle", "x");
    expect(await getSetting("nouvelle_cle")).toBe("x");
  });
});

describe("user_profile", () => {
  it("met à jour les champs fournis (et remet les autres à null, comme le desktop)", async () => {
    await updateUserProfile({ first_name: "Hugo", phone: "0600000000" });
    let p = await getUserProfile();
    expect(p.first_name).toBe("Hugo");
    expect(p.phone).toBe("0600000000");
    expect(p.last_name).toBeNull();
    // un update partiel ré-écrit les 10 champs : phone non fourni repasse à null
    await updateUserProfile({ first_name: "Hugo" });
    p = await getUserProfile();
    expect(p.phone).toBeNull();
  });
});

describe("search_profiles — tri", () => {
  it("trie is_active DESC puis updated_at DESC", async () => {
    const inactive = await createSearchProfile({ name: "Vieux", is_active: 0 });
    const active = await createSearchProfile({ name: "Actif", is_active: 1 });
    const list = await listSearchProfiles();
    expect(list[0].id).toBe(active);
    expect(list[list.length - 1].id).toBe(inactive);
  });
});

describe("backup — round-trip export/import (pont desktop↔web)", () => {
  it("réimporte fidèlement après reset (mode replace)", async () => {
    const sid = await createSearchProfile({ name: "Paris 11e", is_active: 1, price_max: 1200 });
    const lid = await insertListingFromParsed(parsed("https://lbc/ad/r1", { title: "Studio" }), sid);
    await updateListingScore(lid, 88, {
      positive: ["x"],
      negative: [],
      recommendation: "interesting",
      breakdown: [],
      confidence: 0.7,
    });
    await upsertApplication({ listing_id: lid, message: "Bonjour", message_tone: "pro" });

    const backup = await exportBackup();
    expect(backup.app).toBe("terouva");

    await _resetDbForTests();
    const stats = await importBackup(JSON.stringify(backup), "replace");
    expect(stats.imported).toEqual({ searches: 1, listings: 1, applications: 1 });
    expect(stats.skipped.listings).toBe(0);

    const listings = await listListings();
    expect(listings).toHaveLength(1);
    expect(listings[0].score).toBe(88);
    expect(JSON.parse(listings[0].score_reasons!).confidence).toBe(0.7);
    expect(listings[0].search_profile_id).not.toBeNull();
    expect(await listApplications()).toHaveLength(1);
    expect(await listSearchProfiles()).toHaveLength(1);
  });

  it("ignore les annonces dont l'URL existe déjà (mode merge)", async () => {
    await insertListingFromParsed(parsed("https://lbc/ad/dupimport", { title: "déjà là" }), null);
    const backup = await exportBackup();
    // réimporte le même backup en merge → l'annonce existe déjà → skip
    const stats = await importBackup(JSON.stringify(backup), "merge");
    expect(stats.skipped.listings).toBe(1);
    expect(stats.imported.listings).toBe(0);
  });
});
