/**
 * Sauvegarde / restauration de l'app web (IndexedDB). Produit/consomme le MÊME
 * format `BackupFile` v1 que le desktop (`apps/desktop/src/lib/backup.ts`) — c'est
 * le **pont de migration** : un export desktop se réimporte ici, et inversement.
 *
 * Sync multi-appareils volontairement absente (promesse « 100 % local ») : l'export
 * JSON manuel est le filet pour changer de navigateur/machine.
 */
import { getDb } from "@/lib/idb";
import type {
  Application,
  DocumentItem,
  Listing,
  SearchProfile,
  UserProfile,
} from "@terouva/core";

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
    db.user_profile.get(1),
    db.search_profiles.toArray(),
    db.listings.toArray(),
    db.applications.toArray(),
    db.documents.toArray(),
    db.app_settings.toArray(),
  ]);
  return {
    app: "terouva",
    version: 1,
    exported_at: new Date().toISOString(),
    user_profile: up ?? null,
    search_profiles: sp,
    listings: l,
    applications: a,
    documents: d,
    settings: s.map((row) => ({ key: row.key, value: row.value ?? "" })),
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

/**
 * Réimporte un backup. `replace` efface tout d'abord ; `merge` ajoute par-dessus.
 * On réinsère séquentiellement en remappant les id auto-incrémentés (search →
 * listings → applications), en ignorant les annonces dont l'URL existe déjà.
 */
export async function importBackup(
  file: File | string,
  mode: "merge" | "replace",
): Promise<{
  imported: { searches: number; listings: number; applications: number };
  skipped: { listings: number };
}> {
  const text = typeof file === "string" ? file : await file.text();
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
    await Promise.all([
      db.applications.clear(),
      db.listings.clear(),
      db.search_profiles.clear(),
      db.documents.clear(),
      db.app_settings.clear(),
    ]);
  }

  // user_profile (id=1 toujours écrasé)
  if (data.user_profile) {
    const p = data.user_profile;
    const cur = await db.user_profile.get(1);
    await db.user_profile.put({
      ...(cur ?? ({} as UserProfile)),
      id: 1,
      first_name: p.first_name,
      last_name: p.last_name,
      email: p.email,
      phone: p.phone,
      situation: p.situation,
      income_monthly: p.income_monthly,
      guarantors: p.guarantors,
      contract_type: p.contract_type,
      intro_message: p.intro_message,
      preferred_contact: p.preferred_contact,
      created_at: cur?.created_at ?? p.created_at,
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    });
  }

  // search_profiles (remap old id → new id)
  const searchIdMap = new Map<number, number>();
  for (const s of data.search_profiles) {
    const { id: oldId, ...rest } = s;
    const newId = (await db.search_profiles.add(rest as unknown as SearchProfile)) as number;
    searchIdMap.set(oldId, newId);
    stats.imported.searches++;
  }

  // listings (remap search_profile_id ; skip doublons d'URL)
  const listingIdMap = new Map<number, number>();
  for (const l of data.listings) {
    const { id: oldId, ...rest } = l;
    const remapped: Omit<Listing, "id"> = {
      ...rest,
      search_profile_id: l.search_profile_id
        ? searchIdMap.get(l.search_profile_id) ?? null
        : null,
    };
    try {
      const newId = (await db.listings.add(remapped as unknown as Listing)) as number;
      listingIdMap.set(oldId, newId);
      stats.imported.listings++;
    } catch {
      stats.skipped.listings++;
    }
  }

  // applications (remap listing_id ; ignore les orphelines)
  for (const a of data.applications) {
    const newListingId = listingIdMap.get(a.listing_id);
    if (!newListingId) continue;
    const { id: _id, ...rest } = a;
    void _id;
    await db.applications.add({ ...rest, listing_id: newListingId } as unknown as Application);
    stats.imported.applications++;
  }

  // documents — réinsérés seulement en mode replace (merge dédoublonnerait)
  if (mode === "replace") {
    for (const d of data.documents) {
      const { id: _id, ...rest } = d;
      void _id;
      await db.documents.add(rest as unknown as DocumentItem);
    }
  }

  // settings (upsert par clé)
  const t = new Date().toISOString().slice(0, 19).replace("T", " ");
  for (const s of data.settings) {
    await db.app_settings.put({ key: s.key, value: s.value, updated_at: t });
  }

  return stats;
}
