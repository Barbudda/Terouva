/**
 * Mode démonstration : des annonces d'exemple arrivent en direct, comme si une
 * alerte Leboncoin venait de tomber. Tout est marqué `source: "demo"` et vit
 * dans la même base que le reste, mais s'efface en un geste (`stopDemo`) sans
 * toucher aux vraies données.
 *
 * Aucune requête vers Leboncoin : les annonces sont écrites ici, et leur lien
 * pointe vers la page d'exemple de Terouva (`#/exemple/:id`), jamais vers un
 * site réel. Le reste de l'app (note, message, candidature) fonctionne dessus
 * sans savoir qu'il s'agit d'une démonstration.
 */
import { getDb } from "@/lib/idb";
import {
  createSearchProfile,
  getSetting,
  getUserProfile,
  listDocuments,
  setDocumentAvailable,
  setSetting,
  updateListingStatus,
  updateUserProfile,
  upsertApplication,
} from "@app/lib/db";
import { generateMessage } from "@app/lib/messageGen";
import { scoreListing } from "@app/lib/scoring";
import type { Listing, SearchProfile, UserProfile } from "@app/types";

export const DEMO_SOURCE = "demo";
const KEY_ACTIVE = "demo_active";
const KEY_SEARCH_ID = "demo_search_id";
const KEY_PROFILE_SEEDED = "demo_profile_seeded";
const KEY_ONBOARD_SEEDED = "demo_onboarded_seeded";
const KEY_DOCS_SEEDED = "demo_docs_seeded";
const KEY_STEP = "demo_step";

/** Profil d'exemple, posé seulement si le dossier de l'utilisateur est vide. */
const DEMO_PROFILE: Partial<UserProfile> = {
  first_name: "Camille",
  last_name: "Martin",
  phone: "06 12 34 56 78",
  situation: "infirmière",
  income_monthly: 2400,
  contract_type: "CDI",
  guarantors: "garantie Visale",
};

const DEMO_SEARCH: Partial<SearchProfile> & { name: string } = {
  name: "Démonstration : 2 pièces à Lyon",
  city: "Lyon",
  price_max: 950,
  surface_min: 30,
  rooms_min: 2,
  furnished: "any",
  property_type: "apartment",
  keywords_must: "balcon, lumineux",
  must_have_elevator: 1,
  is_active: 1,
};

interface DemoSpec {
  title: string;
  price: number;
  surface: number;
  rooms: number;
  city: string;
  postal_code: string;
  furnished: 0 | 1;
  description: string;
  publisher_type: string;
  /** Ancienneté de publication, en minutes, au moment où l'annonce arrive. */
  publishedMinutesAgo: number;
}

/**
 * Six annonces d'exemple, volontairement inégales : la démonstration doit
 * montrer que Terouva trie, pas que tout est parfait.
 */
const DEMO_LISTINGS: DemoSpec[] = [
  {
    title: "2 pièces proche Part-Dieu",
    price: 930,
    surface: 38,
    rooms: 2,
    city: "Lyon 3e",
    postal_code: "69003",
    furnished: 0,
    description:
      "Deux pièces de 38 m² au 2e étage, chambre sur cour, cuisine séparée, double vitrage. Proche de la gare de la Part-Dieu et des commerces.",
    publisher_type: "Agence",
    publishedMinutesAgo: 95,
  },
  {
    title: "Grand studio avec cave, Monplaisir",
    price: 760,
    surface: 34,
    rooms: 1,
    city: "Lyon 8e",
    postal_code: "69008",
    furnished: 0,
    description:
      "Studio de 34 m² avec coin nuit séparé, cave et local à vélos. Quartier Monplaisir, commerces à pied, métro ligne D à cinq minutes.",
    publisher_type: "Particulier",
    publishedMinutesAgo: 140,
  },
  {
    title: "T2 lumineux avec balcon, Croix-Rousse",
    price: 890,
    surface: 42,
    rooms: 2,
    city: "Lyon 4e",
    postal_code: "69004",
    furnished: 0,
    description:
      "Appartement lumineux de 42 m² au 3e étage avec ascenseur, séjour exposé sud, balcon, cuisine équipée et une chambre. Métro Croix-Rousse à deux pas.",
    publisher_type: "Particulier",
    publishedMinutesAgo: 3,
  },
  {
    title: "T3 au dernier étage, Villeurbanne",
    price: 1080,
    surface: 61,
    rooms: 3,
    city: "Villeurbanne",
    postal_code: "69100",
    furnished: 0,
    description:
      "Trois pièces de 61 m² au dernier étage, deux chambres, grand séjour et parking en sous-sol. Charges comprises.",
    publisher_type: "Agence",
    publishedMinutesAgo: 220,
  },
  {
    title: "2 pièces rénové et lumineux, Guillotière",
    price: 845,
    surface: 40,
    rooms: 2,
    city: "Lyon 7e",
    postal_code: "69007",
    furnished: 1,
    description:
      "Deux pièces meublé de 40 m² entièrement rénové, très lumineux, balcon filant, immeuble avec ascenseur. Tram T1 à trois minutes.",
    publisher_type: "Particulier",
    publishedMinutesAgo: 2,
  },
  {
    title: "Studio meublé, Jean Macé",
    price: 640,
    surface: 28,
    rooms: 1,
    city: "Lyon 7e",
    postal_code: "69007",
    furnished: 1,
    description:
      "Studio meublé de 28 m², cuisine équipée, salle d'eau avec douche. Calme, sur cour, proche de la place Jean Macé.",
    publisher_type: "Particulier",
    publishedMinutesAgo: 8,
  },
];

/** Nombre total d'annonces jouées par la démonstration. */
export const DEMO_TOTAL = DEMO_LISTINGS.length;

/** Lien de la page d'exemple d'une annonce (jamais une adresse Leboncoin). */
export function demoListingUrl(index: number): string {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `${origin}/app#/exemple/${index + 1}`;
}

export async function isDemoActive(): Promise<boolean> {
  return (await getSetting(KEY_ACTIVE)) === "1";
}

export async function demoProgress(): Promise<number> {
  return Number((await getSetting(KEY_STEP)) ?? 0);
}

function sqlDate(d: Date): string {
  return d.toISOString().slice(0, 19).replace("T", " ");
}

async function demoSearch(): Promise<SearchProfile | null> {
  const id = Number((await getSetting(KEY_SEARCH_ID)) ?? 0);
  if (!id) return null;
  const db = await getDb();
  return (await db.search_profiles.get(id)) ?? null;
}

/**
 * Verrou de démarrage : deux appels simultanés (double rendu de React en
 * développement, double clic) créeraient deux recherches de démonstration.
 */
let starting: Promise<void> | null = null;

/** Démarre la démonstration : profil d'exemple si besoin, recherche, 2 annonces. */
export function startDemo(): Promise<void> {
  starting = starting ?? doStartDemo().finally(() => {
    starting = null;
  });
  return starting;
}

async function doStartDemo(): Promise<void> {
  if (await isDemoActive()) return;

  const profile = await getUserProfile();
  const empty = !profile.first_name && !profile.phone && !profile.situation && !profile.income_monthly;
  if (empty) {
    await updateUserProfile(DEMO_PROFILE);
    await setSetting(KEY_PROFILE_SEEDED, "1");
  }

  // La démonstration saute la configuration, mais ne doit pas la faire perdre :
  // si l'utilisateur ne l'avait jamais faite, elle lui sera reproposée à la sortie.
  if ((await getSetting("onboarded")) !== "1") {
    await setSetting("onboarded", "1");
    await setSetting(KEY_ONBOARD_SEEDED, "1");
  }

  const searchId = await createSearchProfile(DEMO_SEARCH);
  await setSetting(KEY_SEARCH_ID, String(searchId));
  await setSetting(KEY_STEP, "0");
  await setSetting(KEY_ACTIVE, "1");

  // Deux annonces déjà présentes : la liste ne doit jamais s'ouvrir vide.
  const first = await addNextDemoListing();
  const second = await addNextDemoListing();

  // Une candidature envoyée et une qui a reçu une réponse : « Mes candidatures »
  // doit montrer le suivi, pas une page vide.
  const who = await getUserProfile();
  const twoDaysAgo = sqlDate(new Date(Date.now() - 2 * 24 * 60 * 60_000));
  if (first) {
    await upsertApplication({
      listing_id: first.id,
      message: generateMessage(first, who, "pro"),
      message_tone: "pro",
      status: "sent",
      sent_at: twoDaysAgo,
    });
    await updateListingStatus(first.id, "applied");
  }
  if (second) {
    await upsertApplication({
      listing_id: second.id,
      message: generateMessage(second, who, "warm"),
      message_tone: "warm",
      status: "replied",
      sent_at: twoDaysAgo,
    });
    await updateListingStatus(second.id, "applied");
  }

  // Quelques pièces du dossier déjà cochées, pour montrer l'avancement. On ne
  // touche à rien si l'utilisateur en avait déjà coché.
  const docs = await listDocuments();
  if (docs.length > 0 && docs.every((d) => !d.available)) {
    const toCheck = docs.filter((d) => d.required).slice(0, 3);
    for (const d of toCheck) await setDocumentAvailable(d.id, true);
    await setSetting(KEY_DOCS_SEEDED, JSON.stringify(toCheck.map((d) => d.id)));
  }
}

/**
 * Ajoute l'annonce suivante et la note avec la recherche de démonstration.
 * Renvoie l'annonce insérée, ou null si la démonstration est terminée.
 */
export async function addNextDemoListing(): Promise<Listing | null> {
  const step = await demoProgress();
  if (step >= DEMO_LISTINGS.length) return null;
  const spec = DEMO_LISTINGS[step];
  const db = await getDb();
  const search = await demoSearch();
  const now = new Date();

  const row: Omit<Listing, "id"> = {
    search_profile_id: search?.id ?? null,
    external_id: `demo-${step + 1}`,
    source: DEMO_SOURCE,
    url: demoListingUrl(step),
    title: spec.title,
    price: spec.price,
    city: spec.city,
    postal_code: spec.postal_code,
    surface: spec.surface,
    rooms: spec.rooms,
    furnished: spec.furnished,
    property_type: "Appartement",
    description: spec.description,
    images: JSON.stringify([]),
    publisher_name: null,
    publisher_type: spec.publisher_type,
    published_at: sqlDate(new Date(now.getTime() - spec.publishedMinutesAgo * 60_000)),
    discovered_at: sqlDate(now),
    status: "new",
    score: null,
    score_reasons: null,
    notes: null,
    raw_html: null,
  };

  const id = (await db.listings.add(row as unknown as Listing)) as number;
  await setSetting(KEY_STEP, String(step + 1));

  if (search) {
    const listing = { ...row, id } as Listing;
    const { score, reasons } = scoreListing(listing, search);
    await db.listings.update(id, { score, score_reasons: JSON.stringify(reasons) });
    return { ...listing, score, score_reasons: JSON.stringify(reasons) };
  }
  return { ...row, id } as Listing;
}

/** Efface tout ce que la démonstration a créé. Les vraies données sont intactes. */
export async function stopDemo(): Promise<void> {
  const db = await getDb();

  const demoListings = (await db.listings.toArray()).filter((l) => l.source === DEMO_SOURCE);
  const ids = demoListings.map((l) => l.id);
  const apps = (await db.applications.toArray()).filter((a) => ids.includes(a.listing_id));
  await db.applications.bulkDelete(apps.map((a) => a.id));
  await db.listings.bulkDelete(ids);

  // On retire la recherche de démonstration par son identifiant, et par sécurité
  // toute recherche restée au même nom (démarrage interrompu).
  const searchId = Number((await getSetting(KEY_SEARCH_ID)) ?? 0);
  if (searchId) await db.search_profiles.delete(searchId);
  const strays = (await db.search_profiles.toArray()).filter((p) => p.name === DEMO_SEARCH.name);
  await db.search_profiles.bulkDelete(strays.map((p) => p.id));

  // Le profil d'exemple n'est retiré que s'il n'a pas été retouché depuis.
  if ((await getSetting(KEY_PROFILE_SEEDED)) === "1") {
    const p = await getUserProfile();
    const untouched = (Object.keys(DEMO_PROFILE) as (keyof UserProfile)[]).every(
      (k) => p[k] === DEMO_PROFILE[k],
    );
    if (untouched) {
      await updateUserProfile({
        first_name: null,
        last_name: null,
        phone: null,
        situation: null,
        income_monthly: null,
        contract_type: null,
        guarantors: null,
      });
    }
  }

  // Pièces cochées par la démonstration : on décoche exactement celles-là.
  const seededDocs = await getSetting(KEY_DOCS_SEEDED);
  if (seededDocs) {
    const ids: number[] = safeIds(seededDocs);
    for (const id of ids) await setDocumentAvailable(id, false);
    await setSetting(KEY_DOCS_SEEDED, "");
  }

  if ((await getSetting(KEY_ONBOARD_SEEDED)) === "1") {
    await setSetting("onboarded", "");
    await setSetting(KEY_ONBOARD_SEEDED, "");
  }

  await setSetting(KEY_PROFILE_SEEDED, "");
  await setSetting(KEY_SEARCH_ID, "");
  await setSetting(KEY_STEP, "0");
  await setSetting(KEY_ACTIVE, "");
}

function safeIds(raw: string): number[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

/** Retrouve une annonce de démonstration par son numéro (page d'exemple). */
export async function getDemoListing(index: number): Promise<Listing | null> {
  const db = await getDb();
  const all = await db.listings.toArray();
  return all.find((l) => l.source === DEMO_SOURCE && l.external_id === `demo-${index}`) ?? null;
}
