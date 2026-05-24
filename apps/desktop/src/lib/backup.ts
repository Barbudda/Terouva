import { getDb } from "@/lib/db";
import type {
  Application,
  DocumentItem,
  Listing,
  SearchProfile,
  UserProfile,
} from "@/types";

export interface BackupFile {
  app: "terouva";
  version: 1;
  exported_at: string;
  user_profile: UserProfile | null;
  search_profiles: SearchProfile[];
  listings: Listing[];
  applications: Application[];
  documents: DocumentItem[];
  settings: { key: string; value: string }[];
}

export async function exportBackup(): Promise<BackupFile> {
  const db = await getDb();
  const [up, sp, l, a, d, s] = await Promise.all([
    db.select<UserProfile[]>("SELECT * FROM user_profile WHERE id = 1"),
    db.select<SearchProfile[]>("SELECT * FROM search_profiles"),
    db.select<Listing[]>("SELECT * FROM listings"),
    db.select<Application[]>("SELECT * FROM applications"),
    db.select<DocumentItem[]>("SELECT * FROM documents"),
    db.select<{ key: string; value: string }[]>("SELECT key, value FROM app_settings"),
  ]);
  return {
    app: "terouva",
    version: 1,
    exported_at: new Date().toISOString(),
    user_profile: up[0] ?? null,
    search_profiles: sp,
    listings: l,
    applications: a,
    documents: d,
    settings: s,
  };
}

export function downloadBackup(b: BackupFile) {
  const json = JSON.stringify(b, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = b.exported_at.replace(/[:.]/g, "-").slice(0, 19);
  a.href = url;
  a.download = `terouva-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File, mode: "merge" | "replace"): Promise<{
  imported: { searches: number; listings: number; applications: number };
  skipped: { listings: number };
}> {
  const text = await file.text();
  const data: BackupFile = JSON.parse(text);
  if (data.app !== "terouva" || data.version !== 1) {
    throw new Error("Fichier non reconnu (pas un backup Terouva v1)");
  }

  const db = await getDb();
  const stats = {
    imported: { searches: 0, listings: 0, applications: 0 },
    skipped: { listings: 0 },
  };

  if (mode === "replace") {
    await db.execute("DELETE FROM applications");
    await db.execute("DELETE FROM listings");
    await db.execute("DELETE FROM search_profiles");
    await db.execute("DELETE FROM documents");
    await db.execute("DELETE FROM app_settings");
  }

  // user_profile (always overwrite id=1)
  if (data.user_profile) {
    const p = data.user_profile;
    await db.execute(
      `UPDATE user_profile SET
        first_name = ?, last_name = ?, email = ?, phone = ?,
        situation = ?, income_monthly = ?, guarantors = ?, contract_type = ?,
        intro_message = ?, preferred_contact = ?, updated_at = datetime('now')
       WHERE id = 1`,
      [
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.situation,
        p.income_monthly,
        p.guarantors,
        p.contract_type,
        p.intro_message,
        p.preferred_contact,
      ],
    );
  }

  // search_profiles
  const idMap = new Map<number, number>();
  for (const s of data.search_profiles) {
    const res = await db.execute(
      `INSERT INTO search_profiles (
        name, city, neighborhoods, radius_km, price_max, surface_min, rooms_min,
        furnished, property_type, keywords_must, keywords_exclude,
        must_have_elevator, must_have_balcony, must_have_parking, must_have_cave,
        floor_min, floor_max, lbc_search_url, check_frequency_minutes, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        s.name,
        s.city,
        s.neighborhoods,
        s.radius_km,
        s.price_max,
        s.surface_min,
        s.rooms_min,
        s.furnished,
        s.property_type,
        s.keywords_must,
        s.keywords_exclude,
        s.must_have_elevator,
        s.must_have_balcony,
        s.must_have_parking,
        s.must_have_cave,
        s.floor_min,
        s.floor_max,
        s.lbc_search_url,
        s.check_frequency_minutes,
        s.is_active,
      ],
    );
    idMap.set(s.id, res.lastInsertId as number);
    stats.imported.searches++;
  }

  // listings
  const listingIdMap = new Map<number, number>();
  for (const l of data.listings) {
    try {
      const res = await db.execute(
        `INSERT INTO listings (
          search_profile_id, external_id, source, url, title, price,
          city, postal_code, surface, rooms, furnished, property_type,
          description, images, publisher_name, publisher_type, published_at,
          discovered_at, status, score, score_reasons, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          l.search_profile_id ? idMap.get(l.search_profile_id) ?? null : null,
          l.external_id,
          l.source,
          l.url,
          l.title,
          l.price,
          l.city,
          l.postal_code,
          l.surface,
          l.rooms,
          l.furnished,
          l.property_type,
          l.description,
          l.images,
          l.publisher_name,
          l.publisher_type,
          l.published_at,
          l.discovered_at,
          l.status,
          l.score,
          l.score_reasons,
          l.notes,
        ],
      );
      listingIdMap.set(l.id, res.lastInsertId as number);
      stats.imported.listings++;
    } catch {
      stats.skipped.listings++;
    }
  }

  // applications
  for (const a of data.applications) {
    const newListingId = listingIdMap.get(a.listing_id);
    if (!newListingId) continue;
    await db.execute(
      `INSERT INTO applications (
        listing_id, message, message_tone, status, sent_at, follow_up_at, notes,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newListingId,
        a.message,
        a.message_tone,
        a.status,
        a.sent_at,
        a.follow_up_at,
        a.notes,
        a.created_at,
        a.updated_at,
      ],
    );
    stats.imported.applications++;
  }

  // documents — only insert in replace mode (merge would dedupe)
  if (mode === "replace") {
    for (const d of data.documents) {
      await db.execute(
        `INSERT INTO documents (name, category, file_path, required, available, notes)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [d.name, d.category, d.file_path, d.required, d.available, d.notes],
      );
    }
  }

  // settings
  for (const s of data.settings) {
    await db.execute(
      `INSERT INTO app_settings (key, value, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
      [s.key, s.value],
    );
  }

  return stats;
}
