/**
 * Construit une URL de recherche Leboncoin (locations) à partir des critères
 * structurés de l'utilisateur — pour ne plus avoir à coller une URL à la main.
 *
 * Le schéma de query LBC n'est pas documenté et peut bouger ; on s'appuie sur
 * les paramètres stables depuis des années (category, price, square, rooms,
 * real_estate_type, furnished, text) et on géocode la ville pour le paramètre
 * `locations` (qui attend un token lat/lon/rayon). L'URL générée est toujours
 * affichée à l'utilisateur : un clic « Ouvrir sur Leboncoin » permet de vérifier.
 */

import { invoke } from "@tauri-apps/api/core";
import type { SearchProfile } from "@/types";

const LBC_BASE = "https://www.leboncoin.fr/recherche";

export interface GeoPoint {
  label: string;
  postcode: string;
  lat: number;
  lon: number;
}

/** Géocode une ville via la commande Rust (API Base Adresse Nationale). */
export async function geocodeCity(city: string): Promise<GeoPoint | null> {
  const q = city.trim();
  if (!q) return null;
  try {
    return (await invoke<GeoPoint | null>("geocode_city", { city: q })) ?? null;
  } catch (e) {
    console.warn("geocode_city a échoué:", e);
    return null;
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
 * déterministe → testable. Sans géo, on retombe sur le nom de ville brut
 * (moins fiable côté LBC, mais l'URL reste ouvrable).
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
