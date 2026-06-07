import Database from "@tauri-apps/plugin-sql";
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
} from "@/types";

let _db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (_db) return _db;
  _db = await Database.load("sqlite:terouva.db");
  return _db;
}

// ────────────────────────────── user_profile ──────────────────────────────

export async function getUserProfile(): Promise<UserProfile> {
  const db = await getDb();
  const rows = await db.select<UserProfile[]>(
    "SELECT * FROM user_profile WHERE id = 1",
  );
  return rows[0];
}

export async function updateUserProfile(p: Partial<UserProfile>): Promise<void> {
  const db = await getDb();
  const fields: (keyof UserProfile)[] = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "situation",
    "income_monthly",
    "guarantors",
    "contract_type",
    "intro_message",
    "preferred_contact",
  ];
  const sets = fields.map((f) => `${f} = ?`).join(", ");
  const vals = fields.map((f) => (p[f] ?? null) as unknown);
  await db.execute(
    `UPDATE user_profile SET ${sets}, updated_at = datetime('now') WHERE id = 1`,
    vals,
  );
}

// ────────────────────────────── search_profiles ──────────────────────────────

export async function listSearchProfiles(): Promise<SearchProfile[]> {
  const db = await getDb();
  return db.select<SearchProfile[]>(
    "SELECT * FROM search_profiles ORDER BY is_active DESC, updated_at DESC",
  );
}

export async function getSearchProfile(id: number): Promise<SearchProfile | undefined> {
  const db = await getDb();
  const rows = await db.select<SearchProfile[]>(
    "SELECT * FROM search_profiles WHERE id = ?",
    [id],
  );
  return rows[0];
}

const SEARCH_FIELDS: (keyof SearchProfile)[] = [
  "name",
  "city",
  "neighborhoods",
  "radius_km",
  "price_max",
  "surface_min",
  "rooms_min",
  "furnished",
  "property_type",
  "keywords_must",
  "keywords_exclude",
  "must_have_elevator",
  "must_have_balcony",
  "must_have_parking",
  "must_have_cave",
  "floor_min",
  "floor_max",
  "lbc_search_url",
  "check_frequency_minutes",
  "is_active",
];

export async function createSearchProfile(
  p: Partial<SearchProfile> & { name: string },
): Promise<number> {
  const db = await getDb();
  const cols = SEARCH_FIELDS.join(", ");
  const placeholders = SEARCH_FIELDS.map(() => "?").join(", ");
  const vals = SEARCH_FIELDS.map((f) => (p[f] ?? null) as unknown);
  const res = await db.execute(
    `INSERT INTO search_profiles (${cols}) VALUES (${placeholders})`,
    vals,
  );
  return res.lastInsertId as number;
}

export async function updateSearchProfile(
  id: number,
  p: Partial<SearchProfile>,
): Promise<void> {
  const db = await getDb();
  const sets = SEARCH_FIELDS.map((f) => `${f} = ?`).join(", ");
  const vals = SEARCH_FIELDS.map((f) => (p[f] ?? null) as unknown);
  await db.execute(
    `UPDATE search_profiles SET ${sets}, updated_at = datetime('now') WHERE id = ?`,
    [...vals, id],
  );
}

export async function deleteSearchProfile(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM search_profiles WHERE id = ?", [id]);
}

// ────────────────────────────── listings ──────────────────────────────

export async function listListings(opts?: {
  status?: ListingStatus;
  search_profile_id?: number;
  limit?: number;
}): Promise<Listing[]> {
  const db = await getDb();
  const where: string[] = [];
  const args: unknown[] = [];
  if (opts?.status) {
    where.push("status = ?");
    args.push(opts.status);
  }
  if (opts?.search_profile_id) {
    where.push("search_profile_id = ?");
    args.push(opts.search_profile_id);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const limit = opts?.limit ?? 500;
  return db.select<Listing[]>(
    `SELECT * FROM listings ${whereSql}
     ORDER BY COALESCE(score, 0) DESC, discovered_at DESC
     LIMIT ?`,
    [...args, limit],
  );
}

export async function getListing(id: number): Promise<Listing | undefined> {
  const db = await getDb();
  const rows = await db.select<Listing[]>("SELECT * FROM listings WHERE id = ?", [id]);
  return rows[0];
}

export async function getListingByUrl(url: string): Promise<Listing | undefined> {
  const db = await getDb();
  const rows = await db.select<Listing[]>("SELECT * FROM listings WHERE url = ?", [url]);
  return rows[0];
}

export async function insertListingFromParsed(
  parsed: ParsedListing,
  search_profile_id: number | null,
): Promise<number> {
  const db = await getDb();
  const res = await db.execute(
    `INSERT INTO listings (
      search_profile_id, external_id, source, url, title, price,
      city, postal_code, surface, rooms, furnished, property_type,
      description, images, publisher_name, publisher_type, published_at
    ) VALUES (?, ?, 'leboncoin', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      search_profile_id,
      parsed.external_id,
      parsed.url,
      parsed.title,
      parsed.price,
      parsed.city,
      parsed.postal_code,
      parsed.surface,
      parsed.rooms,
      parsed.furnished === null ? null : parsed.furnished ? 1 : 0,
      parsed.property_type,
      parsed.description,
      JSON.stringify(parsed.images ?? []),
      parsed.publisher_name,
      parsed.publisher_type,
      parsed.published_at,
    ],
  );
  return res.lastInsertId as number;
}

export async function updateListingScore(
  id: number,
  score: number,
  reasons: unknown,
): Promise<void> {
  const db = await getDb();
  await db.execute(
    "UPDATE listings SET score = ?, score_reasons = ? WHERE id = ?",
    [score, JSON.stringify(reasons), id],
  );
}

export async function updateListingStatus(
  id: number,
  status: ListingStatus,
): Promise<void> {
  const db = await getDb();
  await db.execute("UPDATE listings SET status = ? WHERE id = ?", [status, id]);
}

export async function updateListingNotes(id: number, notes: string): Promise<void> {
  const db = await getDb();
  await db.execute("UPDATE listings SET notes = ? WHERE id = ?", [notes, id]);
}

export async function deleteListing(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM listings WHERE id = ?", [id]);
}

/**
 * Enrichit une annonce existante avec des champs plus complets (ex. quand
 * l'utilisateur ouvre l'annonce et que l'extension capte le détail complet).
 * On ne remplit QUE les champs vides — on n'écrase jamais une donnée déjà là.
 * Retourne true si quelque chose a changé (→ re-scorer en amont).
 */
export async function enrichListing(
  id: number,
  p: ParsedListing,
): Promise<boolean> {
  const cur = await getListing(id);
  if (!cur) return false;
  const sets: string[] = [];
  const vals: unknown[] = [];
  const fill = (col: string, curVal: unknown, newVal: unknown) => {
    const empty = curVal === null || curVal === undefined || curVal === "";
    const has = newVal !== null && newVal !== undefined && newVal !== "";
    if (empty && has) {
      sets.push(`${col} = ?`);
      vals.push(newVal);
    }
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
    sets.push("images = ?");
    vals.push(JSON.stringify(p.images));
  }
  if (sets.length === 0) return false;
  const db = await getDb();
  await db.execute(`UPDATE listings SET ${sets.join(", ")} WHERE id = ?`, [...vals, id]);
  return true;
}

// ────────────────────────────── applications ──────────────────────────────

export async function listApplications(): Promise<Application[]> {
  const db = await getDb();
  return db.select<Application[]>(
    "SELECT * FROM applications ORDER BY updated_at DESC",
  );
}

export async function getApplicationByListing(
  listing_id: number,
): Promise<Application | undefined> {
  const db = await getDb();
  const rows = await db.select<Application[]>(
    "SELECT * FROM applications WHERE listing_id = ? ORDER BY id DESC LIMIT 1",
    [listing_id],
  );
  return rows[0];
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
  if (existing) {
    await db.execute(
      `UPDATE applications SET
        message = ?, message_tone = ?, status = COALESCE(?, status),
        sent_at = ?, follow_up_at = ?, notes = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        a.message,
        a.message_tone,
        a.status ?? null,
        a.sent_at ?? null,
        a.follow_up_at ?? null,
        a.notes ?? null,
        existing.id,
      ],
    );
    return existing.id;
  }
  const res = await db.execute(
    `INSERT INTO applications (listing_id, message, message_tone, status, sent_at, follow_up_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      a.listing_id,
      a.message,
      a.message_tone,
      a.status ?? "prepared",
      a.sent_at ?? null,
      a.follow_up_at ?? null,
      a.notes ?? null,
    ],
  );
  return res.lastInsertId as number;
}

export async function setApplicationStatus(
  id: number,
  status: ApplicationStatus,
  sent_at?: string | null,
): Promise<void> {
  const db = await getDb();
  await db.execute(
    `UPDATE applications SET status = ?, sent_at = COALESCE(?, sent_at), updated_at = datetime('now') WHERE id = ?`,
    [status, sent_at ?? null, id],
  );
}

// ────────────────────────────── documents ──────────────────────────────

export async function listDocuments(): Promise<DocumentItem[]> {
  const db = await getDb();
  return db.select<DocumentItem[]>(
    "SELECT * FROM documents ORDER BY required DESC, category, name",
  );
}

export async function setDocumentAvailable(
  id: number,
  available: boolean,
  file_path?: string | null,
): Promise<void> {
  const db = await getDb();
  await db.execute(
    "UPDATE documents SET available = ?, file_path = COALESCE(?, file_path) WHERE id = ?",
    [available ? 1 : 0, file_path ?? null, id],
  );
}

// ────────────────────────────── app_settings ──────────────────────────────

export async function getSetting(key: string): Promise<string | null> {
  const db = await getDb();
  const rows = await db.select<{ value: string }[]>(
    "SELECT value FROM app_settings WHERE key = ?",
    [key],
  );
  return rows[0]?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  await db.execute(
    `INSERT INTO app_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
    [key, value],
  );
}
