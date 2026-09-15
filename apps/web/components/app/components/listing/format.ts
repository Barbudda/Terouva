import type { ApplicationStatus, ListingStatus, ScoreReasons } from "@app/types";
import type { Tone } from "@app/components/ui/Card";

/** Présentation des recommandations du moteur de note (libellés et teintes de marque). */
export const RECOMMENDATION: Record<ScoreReasons["recommendation"], { text: string; tone: Tone }> = {
  to_contact_fast: { text: "À contacter vite", tone: "accent" },
  interesting: { text: "Intéressante", tone: "good" },
  average: { text: "Moyenne", tone: "warn" },
  ignore: { text: "Peu adaptée", tone: "muted" },
};

export const LISTING_STATUS: Record<ListingStatus, { text: string; tone: Tone }> = {
  new: { text: "Nouvelle", tone: "neutral" },
  to_review: { text: "À vérifier", tone: "warn" },
  favorite: { text: "Favorite", tone: "accent" },
  applied: { text: "Candidature envoyée", tone: "good" },
  ignored: { text: "Écartée", tone: "muted" },
  expired: { text: "Expirée", tone: "muted" },
};

export const LISTING_FILTERS: Record<ListingStatus | "all", string> = {
  all: "Toutes",
  new: "Nouvelles",
  to_review: "À vérifier",
  favorite: "Favorites",
  applied: "Candidature envoyée",
  ignored: "Écartées",
  expired: "Expirées",
};

export const APPLICATION_STATUS: Record<ApplicationStatus, { text: string; tone: Tone }> = {
  prepared: { text: "Brouillon", tone: "warn" },
  sent: { text: "Envoyée", tone: "neutral" },
  replied: { text: "Réponse reçue", tone: "good" },
  rejected: { text: "Refusée", tone: "bad" },
  no_answer: { text: "Sans réponse", tone: "muted" },
};

/** Recommandation déduite d'une note seule (journal de l'extension). */
export function recommendationFromScore(score: number): ScoreReasons["recommendation"] {
  if (score >= 80) return "to_contact_fast";
  if (score >= 65) return "interesting";
  if (score >= 45) return "average";
  return "ignore";
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-good";
  if (score >= 65) return "text-ink";
  return "text-ink-3";
}

const euro = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export function formatPrice(price: number, perMonth = true): string {
  return `${euro.format(price)} €${perMonth ? " par mois" : ""}`;
}

export function formatDateTime(iso: string | number): string {
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function safeParse<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export function parseImages(raw: string | null): string[] {
  if (!raw) return [];
  const v = safeParse<unknown>(raw);
  return Array.isArray(v) ? (v as string[]) : [];
}

export function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + "…" : s;
}
