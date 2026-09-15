import { getSetting } from "@app/lib/db";
import { notifyDesktop } from "@app/lib/tauri";
import type { Listing } from "@app/types";
import { formatPrice } from "./format";

/** Données copiées par le bouton « Copier JSON » de l'extension. */
export interface ClipboardPayload {
  app: string;
  type: string;
  version: number;
  captured_at?: string;
  data: {
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
  };
}

/** Notification système si la note dépasse le seuil choisi dans les Réglages. */
export async function maybeNotifyHot(listing: Listing, score: number) {
  const threshold = Number((await getSetting("notification_min_score")) ?? 70);
  if (score < threshold) return;
  await notifyDesktop({
    title: `${score}/100 · ${listing.title ?? "Nouvelle annonce"}`,
    body: [
      listing.price ? formatPrice(listing.price, false) : null,
      listing.surface ? `${listing.surface} m²` : null,
      listing.city,
    ]
      .filter(Boolean)
      .join(" · "),
  });
}
