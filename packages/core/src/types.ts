export type ID = number;

export interface UserProfile {
  id: 1;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  situation: string | null;
  income_monthly: number | null;
  guarantors: string | null;
  contract_type: string | null;
  intro_message: string | null;
  preferred_contact: string | null;
  created_at: string;
  updated_at: string;
}

export interface SearchProfile {
  id: ID;
  name: string;
  city: string | null;
  neighborhoods: string | null;
  radius_km: number | null;
  price_max: number | null;
  surface_min: number | null;
  rooms_min: number | null;
  furnished: "yes" | "no" | "any" | null;
  property_type: "apartment" | "house" | "any" | null;
  keywords_must: string | null;
  keywords_exclude: string | null;
  must_have_elevator: 0 | 1;
  must_have_balcony: 0 | 1;
  must_have_parking: 0 | 1;
  must_have_cave: 0 | 1;
  floor_min: number | null;
  floor_max: number | null;
  lbc_search_url: string | null;
  check_frequency_minutes: number;
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
}

export type ListingStatus =
  | "new"
  | "to_review"
  | "applied"
  | "ignored"
  | "favorite"
  | "expired";

export interface Listing {
  id: ID;
  search_profile_id: ID | null;
  external_id: string | null;
  source: string;
  url: string;
  title: string | null;
  price: number | null;
  city: string | null;
  postal_code: string | null;
  surface: number | null;
  rooms: number | null;
  furnished: 0 | 1 | null;
  property_type: string | null;
  description: string | null;
  images: string | null;
  publisher_name: string | null;
  publisher_type: string | null;
  published_at: string | null;
  discovered_at: string;
  status: ListingStatus;
  score: number | null;
  score_reasons: string | null;
  notes: string | null;
  raw_html: string | null;
}

export interface ScoringWeights {
  price: number;
  surface: number;
  rooms: number;
  location: number;
  property_type: number;
  furnished: number;
  keywords: number;
  equipment: number;
  recency: number;
  floor: number;
}

export interface ScoreReasons {
  positive: string[];
  negative: string[];
  recommendation: "to_contact_fast" | "interesting" | "average" | "ignore";
  breakdown: { rule: string; delta: number }[];
  /**
   * Part des critères du profil réellement évaluables sur cette annonce (0–1).
   * Bas = score calculé sur des données partielles (carte LBC) → recommandation
   * prudente. Optionnel : absent des scores calculés avant l'ajout du champ.
   */
  confidence?: number;
}

export type ApplicationStatus =
  | "prepared"
  | "sent"
  | "replied"
  | "rejected"
  | "no_answer";

export type MessageTone = "direct" | "warm" | "pro";

export interface Application {
  id: ID;
  listing_id: ID;
  message: string | null;
  message_tone: MessageTone | null;
  status: ApplicationStatus;
  sent_at: string | null;
  follow_up_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentItem {
  id: ID;
  name: string;
  category: string | null;
  file_path: string | null;
  required: 0 | 1;
  available: 0 | 1;
  notes: string | null;
  created_at: string;
}

export interface ParsedListing {
  url: string;
  external_id: string | null;
  title: string | null;
  price: number | null;
  city: string | null;
  postal_code: string | null;
  surface: number | null;
  rooms: number | null;
  furnished: boolean | null;
  property_type: string | null;
  description: string | null;
  images: string[];
  publisher_name: string | null;
  publisher_type: string | null;
  published_at: string | null;
  raw_html_size: number;
}
