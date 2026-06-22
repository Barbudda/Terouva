/**
 * Construit une URL de recherche Leboncoin à partir des critères de l'utilisateur,
 * et géocode la ville côté navigateur via la **Base Adresse Nationale**
 * (api-adresse.data.gouv.fr) — API publique de l'État, gratuite, sans clé,
 * **CORS ouvert** (vérifié). Aucune requête vers Leboncoin : on ne fait que
 * CONSTRUIRE l'URL, c'est l'utilisateur qui l'ouvre.
 */
import type { SearchProfile } from "@app/types";

const LBC_BASE = "https://www.leboncoin.fr/recherche";
const BAN = "https://api-adresse.data.gouv.fr/search/";
const BAN_FALLBACK = "https://data.geopf.fr/geocodage/search/";

export interface GeoPoint {
  label: string;
  postcode: string;
  lat: number;
  lon: number;
}

async function fetchGeo(base: string, city: string, signal: AbortSignal): Promise<GeoPoint | null> {
  const u = `${base}?q=${encodeURIComponent(city)}&type=municipality&limit=1`;
  const res = await fetch(u, { signal });
  if (!res.ok) return null;
  const data = await res.json();
  const f = data?.features?.[0];
  if (!f?.geometry?.coordinates) return null;
  const [lon, lat] = f.geometry.coordinates as [number, number];
  return {
    label: f.properties?.city ?? f.properties?.name ?? city,
    postcode: f.properties?.postcode ?? "",
    lat,
    lon,
  };
}

/**
 * Géocode une ville (BAN, fallback Géoplateforme IGN). Cache localStorage pour
 * éviter de re-requêter. Sans réseau/échec → null (l'URL retombe sur le nom brut).
 */
export async function geocodeCity(city: string): Promise<GeoPoint | null> {
  const q = city.trim();
  if (!q) return null;
  const cacheKey = `terouva.geo.${q.toLowerCase()}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached) as GeoPoint;
  } catch {
    /* localStorage indisponible → on ignore le cache */
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    let geo = await fetchGeo(BAN, q, ctrl.signal).catch(() => null);
    if (!geo) geo = await fetchGeo(BAN_FALLBACK, q, ctrl.signal).catch(() => null);
    if (geo) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(geo));
      } catch {
        /* quota/refus → tant pis */
      }
    }
    return geo;
  } finally {
    clearTimeout(timer);
  }
}

type Criteria = Pick<
  SearchProfile,
  | "city"
  | "radius_km"
  | "price_max"
  | "surface_min"
  | "rooms_min"
  | "furnished"
  | "property_type"
  | "keywords_must"
>;

/**
 * Construit l'URL à partir des critères + (optionnel) point géocodé. Pure et
 * déterministe. Sans géo, on retombe sur le nom de ville brut (l'URL reste ouvrable).
 */
export function buildLbcSearchUrl(c: Criteria, geo?: GeoPoint | null): string {
  const p = new URLSearchParams();
  p.set("category", "10"); // Locations

  if (c.property_type === "apartment") p.set("real_estate_type", "2");
  else if (c.property_type === "house") p.set("real_estate_type", "1");

  if (c.price_max && c.price_max > 0) p.set("price", `min-${c.price_max}`);
  if (c.surface_min && c.surface_min > 0) p.set("square", `${c.surface_min}-max`);
  if (c.rooms_min && c.rooms_min > 0) p.set("rooms", `${c.rooms_min}-max`);

  if (c.furnished === "yes") p.set("furnished", "1");
  else if (c.furnished === "no") p.set("furnished", "2");

  const kw = (c.keywords_must || "")
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (kw.length) p.set("text", kw.join(" "));

  if (geo) {
    const radiusM = Math.round((c.radius_km && c.radius_km > 0 ? c.radius_km : 10) * 1000);
    const label = geo.postcode ? `${geo.label}_${geo.postcode}` : geo.label;
    p.set("locations", `${label}__${geo.lat.toFixed(5)}_${geo.lon.toFixed(5)}_${radiusM}`);
  } else if (c.city && c.city.trim()) {
    p.set("locations", c.city.trim());
  }

  return `${LBC_BASE}?${p.toString()}`;
}

/** Géocode la ville puis construit l'URL. Helper async pour l'UI. */
export async function buildLbcSearchUrlAsync(c: Criteria): Promise<string> {
  const geo = c.city ? await geocodeCity(c.city) : null;
  return buildLbcSearchUrl(c, geo);
}
