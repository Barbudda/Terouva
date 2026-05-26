import type { Listing, ScoreReasons, SearchProfile } from "@/types";

type Rule = {
  rule: string;
  delta: number;
  positive: boolean;
};

interface EquipmentSpec {
  keywords: string[];
  negators: string[];
}

const EQ_ELEVATOR: EquipmentSpec = {
  keywords: ["ascenseur"],
  negators: ["sans ascenseur", "pas d'ascenseur", "aucun ascenseur", "sans asc."],
};
const EQ_BALCONY: EquipmentSpec = {
  keywords: ["balcon", "terrasse", "loggia"],
  negators: ["sans balcon", "pas de balcon"],
};
const EQ_PARKING: EquipmentSpec = {
  keywords: ["parking", "garage", "box auto", "stationnement", "place de parking"],
  negators: ["sans parking", "pas de parking", "sans stationnement"],
};
const EQ_CAVE: EquipmentSpec = {
  keywords: ["cave"],
  negators: ["sans cave"],
};

function equipmentPresent(text: string, spec: EquipmentSpec): boolean {
  const lower = text.toLowerCase();
  if (spec.negators.some((n) => lower.includes(n))) return false;
  return spec.keywords.some((k) => {
    const idx = lower.indexOf(k);
    if (idx === -1) return false;
    // Avoid "cave" matching "cavet" or "cave-bières" false positives.
    const after = lower[idx + k.length];
    return !after || !/[a-zà-ÿ]/.test(after);
  });
}

function applyEquipment(
  rules: Rule[],
  label: string,
  required: boolean,
  text: string,
  spec: EquipmentSpec,
): void {
  if (!required) return;
  const present = equipmentPresent(text, spec);
  if (present) {
    rules.push({ rule: `${label} demandé et présent`, delta: 8, positive: true });
  } else {
    rules.push({
      rule: `${label} demandé mais non mentionné`,
      delta: -12,
      positive: false,
    });
  }
}

/**
 * Extract a floor number from free-form FR text.
 * Returns 0 for "RDC" / "rez-de-chaussée".
 * Returns null if no floor is mentioned.
 */
export function extractFloor(text: string): number | null {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (/\b(rdc|rez[\s-]de[\s-]chauss[ée]e)\b/.test(lower)) return 0;
  const m = lower.match(/(\d{1,2})\s*(?:e|er|ère|ème|ième)?\s*[ée]tage\b/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (!Number.isNaN(n) && n >= 0 && n < 50) return n;
  }
  return null;
}

function formatFloor(n: number): string {
  if (n === 0) return "RDC";
  return `${n}e étage`;
}

function hasAnyKeyword(text: string | null, keywords: string[]): string | null {
  if (!text || keywords.length === 0) return null;
  const lower = text.toLowerCase();
  for (const kw of keywords) {
    const trimmed = kw.trim().toLowerCase();
    if (trimmed && lower.includes(trimmed)) return trimmed;
  }
  return null;
}

function parseCsv(s: string | null): string[] {
  if (!s) return [];
  return s
    .split(/[,;\n]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function hoursSince(iso: string | null): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return (Date.now() - t) / 3_600_000;
}

export function scoreListing(
  listing: Listing,
  profile: SearchProfile,
): { score: number; reasons: ScoreReasons } {
  const rules: Rule[] = [];
  /** When true, the score is forced to 0 regardless of other rules. */
  let killed = false;

  // PRICE
  if (profile.price_max && listing.price) {
    if (listing.price <= profile.price_max) {
      const margin = (profile.price_max - listing.price) / profile.price_max;
      const bonus = 25 + Math.round(margin * 10);
      rules.push({ rule: `Prix dans le budget (${listing.price}€ ≤ ${profile.price_max}€)`, delta: bonus, positive: true });
    } else {
      const over = listing.price - profile.price_max;
      const ratio = over / profile.price_max;
      // Tiered: small overshoot = small penalty, big overshoot = kill.
      // < 10 % over: −15.
      // 10-25 % over: −35.
      // 25-50 % over: −60.
      // > 50 % over: kill.
      let penalty: number;
      if (ratio < 0.1) penalty = 15;
      else if (ratio < 0.25) penalty = 35;
      else if (ratio < 0.5) penalty = 60;
      else {
        penalty = 100;
        killed = true;
      }
      rules.push({
        rule: `Prix au-dessus du budget (+${over}€, ${Math.round(ratio * 100)}%)`,
        delta: -penalty,
        positive: false,
      });
    }
  }

  // SURFACE
  if (profile.surface_min && listing.surface) {
    if (listing.surface >= profile.surface_min) {
      rules.push({ rule: `Surface ≥ ${profile.surface_min}m² (${listing.surface}m²)`, delta: 20, positive: true });
    } else {
      rules.push({
        rule: `Surface inférieure (${listing.surface}m² < ${profile.surface_min}m²)`,
        delta: -25,
        positive: false,
      });
    }
  }

  // ROOMS
  if (profile.rooms_min && listing.rooms) {
    if (listing.rooms >= profile.rooms_min) {
      rules.push({ rule: `Pièces ≥ ${profile.rooms_min} (${listing.rooms})`, delta: 10, positive: true });
    } else {
      rules.push({ rule: `Pièces insuffisantes (${listing.rooms} < ${profile.rooms_min})`, delta: -15, positive: false });
    }
  }

  // CITY
  if (profile.city && listing.city) {
    if (listing.city.toLowerCase().includes(profile.city.toLowerCase())) {
      rules.push({ rule: `Ville correspondante (${listing.city})`, delta: 20, positive: true });
    } else {
      rules.push({ rule: `Ville différente (${listing.city})`, delta: -10, positive: false });
    }
  }

  // FURNISHED
  if (profile.furnished && profile.furnished !== "any" && listing.furnished !== null) {
    const want = profile.furnished === "yes" ? 1 : 0;
    if (listing.furnished === want) {
      rules.push({ rule: `Type meublé correspondant`, delta: 5, positive: true });
    } else {
      rules.push({ rule: `Type meublé non conforme`, delta: -10, positive: false });
    }
  }

  // KEYWORDS MUST
  const must = parseCsv(profile.keywords_must);
  if (must.length > 0) {
    const text = `${listing.title ?? ""} ${listing.description ?? ""}`;
    const found = must.filter((k) => text.toLowerCase().includes(k.toLowerCase()));
    if (found.length > 0) {
      rules.push({ rule: `Mots-clés positifs trouvés (${found.join(", ")})`, delta: 5 * found.length, positive: true });
    }
    const missing = must.filter((k) => !text.toLowerCase().includes(k.toLowerCase()));
    if (missing.length > 0) {
      rules.push({ rule: `Mots-clés positifs manquants (${missing.join(", ")})`, delta: -5 * missing.length, positive: false });
    }
  }

  // KEYWORDS EXCLUDE — KILL SWITCH: if the user explicitly said "I don't want X"
  // and X is in the listing, we force the score to 0. Surfacing it as a -100
  // delta keeps the breakdown transparent in the UI.
  const excl = parseCsv(profile.keywords_exclude);
  if (excl.length > 0) {
    const text = `${listing.title ?? ""} ${listing.description ?? ""}`;
    const hit = hasAnyKeyword(text, excl);
    if (hit) {
      rules.push({
        rule: `Mot-clé exclu présent ("${hit}") — annonce écartée`,
        delta: -100,
        positive: false,
      });
      killed = true;
    }
  }

  // RECENCY
  const h = hoursSince(listing.published_at) ?? hoursSince(listing.discovered_at);
  if (h !== null) {
    if (h < 2) rules.push({ rule: `Annonce très récente (<2h)`, delta: 20, positive: true });
    else if (h < 12) rules.push({ rule: `Annonce récente (<12h)`, delta: 15, positive: true });
    else if (h < 48) rules.push({ rule: `Annonce <48h`, delta: 8, positive: true });
    else if (h > 168) rules.push({ rule: `Annonce >7j (peut être prise)`, delta: -10, positive: false });
  }

  // PUBLISHER TYPE
  if (listing.publisher_type === "private" || listing.publisher_type === "particular") {
    rules.push({ rule: `Particulier (souvent plus rapide)`, delta: 5, positive: true });
  }

  // NEIGHBORHOODS — CSV list. Match if any token appears in title/desc/city/postcode.
  const neighborhoods = parseCsv(profile.neighborhoods);
  if (neighborhoods.length > 0) {
    const hay = `${listing.title ?? ""} ${listing.description ?? ""} ${listing.city ?? ""} ${listing.postal_code ?? ""}`.toLowerCase();
    const found = neighborhoods.filter((n) => hay.includes(n.toLowerCase()));
    if (found.length > 0) {
      rules.push({
        rule: `Quartier ciblé (${found.join(", ")})`,
        delta: 12,
        positive: true,
      });
    } else {
      rules.push({
        rule: `Aucun quartier ciblé trouvé`,
        delta: -8,
        positive: false,
      });
    }
  }

  // EQUIPMENTS — only scored when the user marked them as must-have.
  const descBag = `${listing.title ?? ""} ${listing.description ?? ""}`;
  applyEquipment(rules, "Ascenseur", profile.must_have_elevator === 1, descBag, EQ_ELEVATOR);
  applyEquipment(rules, "Balcon / terrasse", profile.must_have_balcony === 1, descBag, EQ_BALCONY);
  applyEquipment(rules, "Parking", profile.must_have_parking === 1, descBag, EQ_PARKING);
  applyEquipment(rules, "Cave", profile.must_have_cave === 1, descBag, EQ_CAVE);

  // FLOOR — only matters if the user set a min or a max.
  const floor = extractFloor(descBag);
  if (floor !== null && (profile.floor_min !== null || profile.floor_max !== null)) {
    if (profile.floor_min !== null && floor < profile.floor_min) {
      rules.push({
        rule: `Étage trop bas (${formatFloor(floor)}, min ${profile.floor_min})`,
        delta: -15,
        positive: false,
      });
    } else if (profile.floor_max !== null && floor > profile.floor_max) {
      rules.push({
        rule: `Étage trop haut (${formatFloor(floor)}, max ${profile.floor_max})`,
        delta: -8,
        positive: false,
      });
    } else {
      rules.push({
        rule: `Étage dans la fourchette (${formatFloor(floor)})`,
        delta: 6,
        positive: true,
      });
    }
  }

  // Aggregate
  const total = rules.reduce((acc, r) => acc + r.delta, 0);
  const aggregated = Math.max(0, Math.min(100, 50 + total));
  const score = killed ? 0 : aggregated;

  let recommendation: ScoreReasons["recommendation"];
  if (score >= 80) recommendation = "to_contact_fast";
  else if (score >= 65) recommendation = "interesting";
  else if (score >= 45) recommendation = "average";
  else recommendation = "ignore";

  const reasons: ScoreReasons = {
    positive: rules.filter((r) => r.positive).map((r) => r.rule),
    negative: rules.filter((r) => !r.positive).map((r) => r.rule),
    recommendation,
    breakdown: rules.map((r) => ({ rule: r.rule, delta: r.delta })),
  };
  return { score, reasons };
}

export function recommendationLabel(r: ScoreReasons["recommendation"]): {
  text: string;
  className: string;
} {
  switch (r) {
    case "to_contact_fast":
      return { text: "À contacter vite", className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40" };
    case "interesting":
      return { text: "Intéressant", className: "bg-violet-500/15 text-violet-300 border-violet-500/40" };
    case "average":
      return { text: "Moyen", className: "bg-amber-500/15 text-amber-300 border-amber-500/40" };
    case "ignore":
      return { text: "À ignorer", className: "bg-zinc-700/40 text-zinc-400 border-zinc-600/40" };
  }
}
