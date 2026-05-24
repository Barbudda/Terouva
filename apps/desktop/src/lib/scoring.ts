import type { Listing, ScoreReasons, SearchProfile } from "@/types";

type Rule = {
  rule: string;
  delta: number;
  positive: boolean;
};

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

  // PRICE
  if (profile.price_max && listing.price) {
    if (listing.price <= profile.price_max) {
      const margin = (profile.price_max - listing.price) / profile.price_max;
      const bonus = 25 + Math.round(margin * 10);
      rules.push({ rule: `Prix dans le budget (${listing.price}€ ≤ ${profile.price_max}€)`, delta: bonus, positive: true });
    } else {
      const over = listing.price - profile.price_max;
      const penalty = Math.min(50, Math.round((over / profile.price_max) * 100));
      rules.push({ rule: `Prix au-dessus du budget (+${over}€)`, delta: -penalty, positive: false });
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

  // KEYWORDS EXCLUDE
  const excl = parseCsv(profile.keywords_exclude);
  if (excl.length > 0) {
    const text = `${listing.title ?? ""} ${listing.description ?? ""}`;
    const hit = hasAnyKeyword(text, excl);
    if (hit) {
      rules.push({ rule: `Mot-clé exclu présent ("${hit}")`, delta: -50, positive: false });
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

  // Aggregate
  const total = rules.reduce((acc, r) => acc + r.delta, 0);
  const score = Math.max(0, Math.min(100, 50 + total));

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
