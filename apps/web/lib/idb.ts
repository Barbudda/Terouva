/**
 * Couche de stockage de l'app web Terouva — **IndexedDB via Dexie**, miroir exact
 * de la base SQLite du desktop (`apps/desktop/src/lib/db.ts` + migration 0001).
 *
 * Objectif : **drop-in**. Les 22 fonctions exposées ont les MÊMES signatures que
 * `db.ts`, pour que `useStore`, le pont d'ingestion et toutes les pages réutilisées
 * du desktop fonctionnent sans changement. Le schéma est préservé bit à bit :
 * - `score` reste `number | null` ;
 * - `score_reasons` reste une **string JSON** (l'objet ScoreReasons complet, dont
 *   `confidence`), sérialisée verbatim et relue à l'identique → parité de tri/reco ;
 * - `images` reste une **string JSON** ;
 * - les booléens `furnished`/`is_active`/`required`/`available`/`must_have_*`
 *   restent des entiers `0 | 1 | null` (scoring.ts teste `=== 1`).
 *
 * Les contraintes SQL absentes d'IndexedDB sont réimplémentées en code :
 * `COALESCE(score,0) DESC` (tri JS), `url UNIQUE` (index `&url` → throw sur doublon,
 * comme SQLite), et les cascades de clés étrangères (transactions Dexie).
 *
 * 100 % local : aucune donnée ne quitte le navigateur.
 */
import Dexie, { type Table } from "dexie";
import type {
  Application,
  ApplicationStatus,
  DocumentItem,
  Listing,
  ListingStatus,
  MessageTone,
  ParsedListing,
  SearchProfile,
  UserProfile,
} from "@terouva/core";

interface SettingRow {
  key: string;
  value: string | null;
  updated_at?: string;
}

/** Format de SQLite `datetime('now')` : `YYYY-MM-DD HH:MM:SS` en UTC (triable lexicographiquement). */
function nowSql(): string {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

// ────────────────────────────── seeds (≡ INSERT du 0001_init.sql) ──────────────────────────────

const SEED_DOCUMENTS: Omit<DocumentItem, "id" | "created_at">[] = [
  { name: "Pièce d'identité", category: "identité", file_path: null, required: 1, available: 0, notes: null },
  { name: "3 derniers bulletins de salaire", category: "revenus", file_path: null, required: 1, available: 0, notes: null },
  { name: "Contrat de travail", category: "pro", file_path: null, required: 1, available: 0, notes: null },
  { name: "Dernier avis d'imposition", category: "fiscal", file_path: null, required: 1, available: 0, notes: null },
  { name: "Justificatif de domicile", category: "logement", file_path: null, required: 1, available: 0, notes: null },
  { name: "Quittance de loyer (3 derniers mois)", category: "logement", file_path: null, required: 0, available: 0, notes: null },
  { name: "Pièce d'identité du garant", category: "garant", file_path: null, required: 0, available: 0, notes: null },
  { name: "3 derniers bulletins de salaire du garant", category: "garant", file_path: null, required: 0, available: 0, notes: null },
  { name: "Dernier avis d'imposition du garant", category: "garant", file_path: null, required: 0, available: 0, notes: null },
  { name: "RIB", category: "autre", file_path: null, required: 0, available: 0, notes: null },
];

const SEED_SETTINGS: { key: string; value: string }[] = [
  { key: "theme", value: "dark" },
  { key: "default_message_tone", value: "pro" },
  { key: "notification_min_score", value: "70" },
];

const EMPTY_PROFILE: Omit<UserProfile, "created_at" | "updated_at"> = {
  id: 1,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  situation: null,
  income_monthly: null,
  guarantors: null,
  contract_type: null,
  intro_message: null,
  preferred_contact: null,
};

// ────────────────────────────── Dexie ──────────────────────────────

class TerouvaDB extends Dexie {
  user_profile!: Table<UserProfile, number>;
  search_profiles!: Table<SearchProfile, number>;
  listings!: Table<Listing, number>;
  applications!: Table<Application, number>;
  documents!: Table<DocumentItem, number>;
  app_settings!: Table<SettingRow, string>;

  constructor() {
    super("terouva");
    // Index = colonnes interrogées/triées dans db.ts. `&url` = contrainte UNIQUE.
    this.version(1).stores({
      user_profile: "id",
      search_profiles: "++id, is_active, updated_at",
      listings: "++id, &url, status, score, discovered_at, search_profile_id",
      applications: "++id, listing_id, status, updated_at",
      documents: "++id, required, category, name",
      app_settings: "key",
    });
    // `populate` ne s'exécute qu'à la création de la base (≡ les INSERT du schéma).
    this.on("populate", (tx) => {
      const t = nowSql();
      void tx.table("user_profile").add({ ...EMPTY_PROFILE, created_at: t, updated_at: t });
      void tx.table("documents").bulkAdd(SEED_DOCUMENTS.map((d) => ({ ...d, created_at: t })));
      void tx.table("app_settings").bulkAdd(SEED_SETTINGS.map((s) => ({ ...s, updated_at: t })));
    });
  }
}

let _db: TerouvaDB | null = null;

export async function getDb(): Promise<TerouvaDB> {
  if (_db) return _db;
  _db = new TerouvaDB();
  await _db.open();
  return _db;
}

/** Réinitialise la base — réservé aux tests (recrée la base → re-seed via `populate`). */
export async function _resetDbForTests(): Promise<void> {
  if (_db) {
    await _db.delete();
    _db.close();
    _db = null;
  }
  await getDb();
}

// ────────────────────────────── user_profile ──────────────────────────────

const USER_FIELDS: (keyof UserProfile)[] = [
  "first_name", "last_name", "email", "phone", "situation",
  "income_monthly", "guarantors", "contract_type", "intro_message", "preferred_contact",
];

export async function getUserProfile(): Promise<UserProfile> {
  const db = await getDb();
  return (await db.user_profile.get(1)) as UserProfile;
}

export async function updateUserProfile(p: Partial<UserProfile>): Promise<void> {
  const db = await getDb();
  const cur = (await db.user_profile.get(1)) as UserProfile;
  // Comme le desktop : on (ré)écrit les 10 champs (un champ absent repasse à null).
  const next: UserProfile = { ...cur, id: 1 };
  for (const f of USER_FIELDS) (next as unknown as Record<string, unknown>)[f] = p[f] ?? null;
  next.updated_at = nowSql();
  await db.user_profile.put(next);
}

// ────────────────────────────── search_profiles ──────────────────────────────

const SEARCH_FIELDS: (keyof SearchProfile)[] = [
  "name", "city", "neighborhoods", "radius_km", "price_max", "surface_min", "rooms_min",
  "furnished", "property_type", "keywords_must", "keywords_exclude",
  "must_have_elevator", "must_have_balcony", "must_have_parking", "must_have_cave",
  "floor_min", "floor_max", "lbc_search_url", "check_frequency_minutes", "is_active",
];

export async function listSearchProfiles(): Promise<SearchProfile[]> {
  const db = await getDb();
  const all = await db.search_profiles.toArray();
  // ORDER BY is_active DESC, updated_at DESC
  return all.sort(
    (a, b) => b.is_active - a.is_active || b.updated_at.localeCompare(a.updated_at),
  );
}

export async function getSearchProfile(id: number): Promise<SearchProfile | undefined> {
  const db = await getDb();
  return db.search_profiles.get(id);
}

export async function createSearchProfile(
  p: Partial<SearchProfile> & { name: string },
): Promise<number> {
  const db = await getDb();
  const t = nowSql();
  const row: Record<string, unknown> = { created_at: t, updated_at: t };
  for (const f of SEARCH_FIELDS) row[f] = p[f] ?? null;
  return (await db.search_profiles.add(row as unknown as SearchProfile)) as number;
}

export async function updateSearchProfile(
  id: number,
  p: Partial<SearchProfile>,
): Promise<void> {
  const db = await getDb();
  const cur = await db.search_profiles.get(id);
  if (!cur) return;
  const next: Record<string, unknown> = { ...cur, id };
  for (const f of SEARCH_FIELDS) next[f] = p[f] ?? null;
  next.updated_at = nowSql();
  await db.search_profiles.put(next as unknown as SearchProfile);
}

export async function deleteSearchProfile(id: number): Promise<void> {
  const db = await getDb();
  // FK: listings.search_profile_id REFERENCES search_profiles(id) ON DELETE SET NULL
  await db.transaction("rw", db.search_profiles, db.listings, async () => {
    await db.listings.where("search_profile_id").equals(id).modify({ search_profile_id: null });
    await db.search_profiles.delete(id);
  });
}

// ────────────────────────────── listings ──────────────────────────────

export async function listListings(opts?: {
  status?: ListingStatus;
  search_profile_id?: number;
  limit?: number;
}): Promise<Listing[]> {
  const db = await getDb();
  let arr = await db.listings.toArray();
  if (opts?.status) arr = arr.filter((l) => l.status === opts.status);
  if (opts?.search_profile_id) arr = arr.filter((l) => l.search_profile_id === opts.search_profile_id);
  // ORDER BY COALESCE(score, 0) DESC, discovered_at DESC
  arr.sort(
    (a, b) =>
      (b.score ?? 0) - (a.score ?? 0) || b.discovered_at.localeCompare(a.discovered_at),
  );
  return arr.slice(0, opts?.limit ?? 500);
}

export async function getListing(id: number): Promise<Listing | undefined> {
  const db = await getDb();
  return db.listings.get(id);
}

export async function getListingByUrl(url: string): Promise<Listing | undefined> {
  const db = await getDb();
  return db.listings.where("url").equals(url).first();
}

export async function insertListingFromParsed(
  parsed: ParsedListing,
  search_profile_id: number | null,
): Promise<number> {
  const db = await getDb();
  const row: Omit<Listing, "id"> = {
    search_profile_id,
    external_id: parsed.external_id,
    source: "leboncoin",
    url: parsed.url,
    title: parsed.title,
    price: parsed.price,
    city: parsed.city,
    postal_code: parsed.postal_code,
    surface: parsed.surface,
    rooms: parsed.rooms,
    furnished: parsed.furnished === null ? null : parsed.furnished ? 1 : 0,
    property_type: parsed.property_type,
    description: parsed.description,
    images: JSON.stringify(parsed.images ?? []),
    publisher_name: parsed.publisher_name,
    publisher_type: parsed.publisher_type,
    published_at: parsed.published_at,
    discovered_at: nowSql(),
    status: "new",
    score: null,
    score_reasons: null,
    notes: null,
    raw_html: null,
  };
  // `&url` UNIQUE → Dexie lève ConstraintError sur doublon, comme la contrainte SQLite.
  return (await db.listings.add(row as unknown as Listing)) as number;
}

export async function updateListingScore(
  id: number,
  score: number,
  reasons: unknown,
): Promise<void> {
  const db = await getDb();
  await db.listings.update(id, { score, score_reasons: JSON.stringify(reasons) });
}

export async function updateListingStatus(id: number, status: ListingStatus): Promise<void> {
  const db = await getDb();
  await db.listings.update(id, { status });
}

export async function updateListingNotes(id: number, notes: string): Promise<void> {
  const db = await getDb();
  await db.listings.update(id, { notes });
}

export async function deleteListing(id: number): Promise<void> {
  const db = await getDb();
  // FK: applications.listing_id REFERENCES listings(id) ON DELETE CASCADE
  await db.transaction("rw", db.listings, db.applications, async () => {
    await db.applications.where("listing_id").equals(id).delete();
    await db.listings.delete(id);
  });
}

/**
 * Enrichit une annonce existante : ne remplit QUE les champs vides (jamais
 * d'écrasement). Retourne true si quelque chose a changé (→ re-scorer en amont).
 */
export async function enrichListing(id: number, p: ParsedListing): Promise<boolean> {
  const db = await getDb();
  const cur = await db.listings.get(id);
  if (!cur) return false;
  const patch: Record<string, unknown> = {};
  const fill = (col: keyof Listing, curVal: unknown, newVal: unknown) => {
    const empty = curVal === null || curVal === undefined || curVal === "";
    const has = newVal !== null && newVal !== undefined && newVal !== "";
    if (empty && has) patch[col] = newVal;
  };
  fill("title", cur.title, p.title);
  fill("price", cur.price, p.price);
  fill("city", cur.city, p.city);
  fill("postal_code", cur.postal_code, p.postal_code);
  fill("surface", cur.surface, p.surface);
  fill("rooms", cur.rooms, p.rooms);
  fill("furnished", cur.furnished, p.furnished === null ? null : p.furnished ? 1 : 0);
  fill("property_type", cur.property_type, p.property_type);
  fill("description", cur.description, p.description);
  fill("publisher_name", cur.publisher_name, p.publisher_name);
  fill("publisher_type", cur.publisher_type, p.publisher_type);
  fill("published_at", cur.published_at, p.published_at);
  const curImagesEmpty = !cur.images || cur.images === "[]";
  if (curImagesEmpty && p.images && p.images.length > 0) {
    patch.images = JSON.stringify(p.images);
  }
  if (Object.keys(patch).length === 0) return false;
  await db.listings.update(id, patch);
  return true;
}

// ────────────────────────────── applications ──────────────────────────────

export async function listApplications(): Promise<Application[]> {
  const db = await getDb();
  const all = await db.applications.toArray();
  return all.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export async function getApplicationByListing(
  listing_id: number,
): Promise<Application | undefined> {
  const db = await getDb();
  // WHERE listing_id = ? ORDER BY id DESC LIMIT 1
  const rows = await db.applications.where("listing_id").equals(listing_id).toArray();
  return rows.sort((a, b) => b.id - a.id)[0];
}

export async function upsertApplication(a: {
  listing_id: number;
  message: string;
  message_tone: MessageTone;
  status?: ApplicationStatus;
  sent_at?: string | null;
  follow_up_at?: string | null;
  notes?: string | null;
}): Promise<number> {
  const db = await getDb();
  const existing = await getApplicationByListing(a.listing_id);
  const t = nowSql();
  if (existing) {
    await db.applications.update(existing.id, {
      message: a.message,
      message_tone: a.message_tone,
      status: a.status ?? existing.status, // COALESCE(?, status)
      sent_at: a.sent_at ?? null,
      follow_up_at: a.follow_up_at ?? null,
      notes: a.notes ?? null,
      updated_at: t,
    });
    return existing.id;
  }
  const row: Omit<Application, "id"> = {
    listing_id: a.listing_id,
    message: a.message,
    message_tone: a.message_tone,
    status: a.status ?? "prepared",
    sent_at: a.sent_at ?? null,
    follow_up_at: a.follow_up_at ?? null,
    notes: a.notes ?? null,
    created_at: t,
    updated_at: t,
  };
  return (await db.applications.add(row as unknown as Application)) as number;
}

export async function setApplicationStatus(
  id: number,
  status: ApplicationStatus,
  sent_at?: string | null,
): Promise<void> {
  const db = await getDb();
  const cur = await db.applications.get(id);
  if (!cur) return;
  await db.applications.update(id, {
    status,
    sent_at: sent_at ?? cur.sent_at, // COALESCE(?, sent_at)
    updated_at: nowSql(),
  });
}

// ────────────────────────────── documents ──────────────────────────────

export async function listDocuments(): Promise<DocumentItem[]> {
  const db = await getDb();
  const all = await db.documents.toArray();
  // ORDER BY required DESC, category, name
  return all.sort(
    (a, b) =>
      b.required - a.required ||
      (a.category ?? "").localeCompare(b.category ?? "") ||
      a.name.localeCompare(b.name),
  );
}

export async function setDocumentAvailable(
  id: number,
  available: boolean,
  file_path?: string | null,
): Promise<void> {
  const db = await getDb();
  const cur = await db.documents.get(id);
  if (!cur) return;
  await db.documents.update(id, {
    available: available ? 1 : 0,
    file_path: file_path ?? cur.file_path, // COALESCE(?, file_path)
  });
}

// ────────────────────────────── app_settings ──────────────────────────────

export async function getSetting(key: string): Promise<string | null> {
  const db = await getDb();
  return (await db.app_settings.get(key))?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  await db.app_settings.put({ key, value, updated_at: nowSql() });
}
