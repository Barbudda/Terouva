/**
 * Génération de message via le **bot interne Terouva**.
 *
 * Plus aucune clé API côté utilisateur : l'app POST le contexte au backend
 * Terouva (voir src-tauri/src/ai.rs → /api/message sur Vercel), qui détient le
 * crédit IA. Une préférence locale `ai_enabled` permet juste de basculer entre
 * le bot (par défaut) et les templates locaux hors-ligne.
 */

import { invoke } from "@tauri-apps/api/core";
import { getSetting, setSetting } from "@/lib/db";
import type { Listing, MessageTone, UserProfile } from "@/types";

const KEY_ENABLED = "ai_enabled";

/** Le bot interne est activé par défaut (pas de configuration requise). */
export async function getAiEnabled(): Promise<boolean> {
  const v = await getSetting(KEY_ENABLED);
  return v !== "0"; // défaut = activé
}

export async function setAiEnabled(on: boolean): Promise<void> {
  await setSetting(KEY_ENABLED, on ? "1" : "0");
}

interface AiMessageOutput {
  text: string;
  model: string;
}

export async function generateMessageAI(
  listing: Listing,
  profile: UserProfile,
  tone: MessageTone,
): Promise<AiMessageOutput> {
  return invoke<AiMessageOutput>("generate_message_ai", {
    input: {
      tone,
      listing: {
        title: listing.title,
        price: listing.price,
        surface: listing.surface,
        rooms: listing.rooms,
        city: listing.city,
        postal_code: listing.postal_code,
        furnished: listing.furnished === null ? null : listing.furnished === 1,
        property_type: listing.property_type,
        description: listing.description,
        publisher_type: listing.publisher_type,
      },
      profile: {
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        phone: profile.phone,
        situation: profile.situation,
        income_monthly: profile.income_monthly,
        guarantors: profile.guarantors,
        contract_type: profile.contract_type,
        intro_message: profile.intro_message,
        preferred_contact: profile.preferred_contact,
      },
    },
  });
}
