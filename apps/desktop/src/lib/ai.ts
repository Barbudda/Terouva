/**
 * Claude API wrapper used to generate adaptive candidature messages.
 * The actual HTTP call happens in Rust (see src-tauri/src/ai.rs) so the
 * API key never crosses the JS network stack and we get a proper timeout.
 *
 * Storage: the user's API key + model preference live in `app_settings`.
 * We never log them — even error messages from Anthropic are surfaced as-is.
 */

import { invoke } from "@tauri-apps/api/core";
import { getSetting, setSetting } from "@/lib/db";
import type { Listing, MessageTone, UserProfile } from "@/types";

export const DEFAULT_MODEL = "claude-sonnet-4-6";
export const AVAILABLE_MODELS = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 — rapide, équilibré (recommandé)" },
  { value: "claude-opus-4-7", label: "Claude Opus 4.7 — plus créatif, plus cher" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 — le moins cher" },
];

const KEY_API = "claude_api_key";
const KEY_MODEL = "claude_model";
const KEY_ENABLED = "claude_enabled";

// ────────────────────────────── settings helpers ──────────────────────────────

export async function getClaudeApiKey(): Promise<string> {
  return (await getSetting(KEY_API)) ?? "";
}

export async function setClaudeApiKey(key: string): Promise<void> {
  await setSetting(KEY_API, key.trim());
}

export async function getClaudeModel(): Promise<string> {
  return (await getSetting(KEY_MODEL)) ?? DEFAULT_MODEL;
}

export async function setClaudeModel(model: string): Promise<void> {
  await setSetting(KEY_MODEL, model);
}

export async function getClaudeEnabled(): Promise<boolean> {
  const v = await getSetting(KEY_ENABLED);
  return v === "1";
}

export async function setClaudeEnabled(on: boolean): Promise<void> {
  await setSetting(KEY_ENABLED, on ? "1" : "0");
}

// ────────────────────────────── invocations ──────────────────────────────

interface AiMessageOutput {
  text: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
}

export async function generateMessageAI(
  listing: Listing,
  profile: UserProfile,
  tone: MessageTone,
): Promise<AiMessageOutput> {
  const [apiKey, model] = await Promise.all([getClaudeApiKey(), getClaudeModel()]);
  if (!apiKey) {
    throw new Error(
      "Clé API Claude manquante. Configure-la dans Réglages → Génération AI.",
    );
  }
  return invoke<AiMessageOutput>("generate_message_ai", {
    input: {
      api_key: apiKey,
      model,
      tone,
      listing: {
        title: listing.title,
        price: listing.price,
        surface: listing.surface,
        rooms: listing.rooms,
        city: listing.city,
        postal_code: listing.postal_code,
        furnished:
          listing.furnished === null ? null : listing.furnished === 1,
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

/**
 * Hits the Anthropic API with a 1-token request to validate the key + model.
 * Used by the "Test connexion" button in Réglages.
 */
export async function testClaudeConnection(): Promise<{
  ok: boolean;
  model: string;
  error?: string;
}> {
  const [apiKey, model] = await Promise.all([getClaudeApiKey(), getClaudeModel()]);
  if (!apiKey) {
    return { ok: false, model, error: "Clé API absente." };
  }
  try {
    const res = await invoke<AiMessageOutput>("generate_message_ai", {
      input: {
        api_key: apiKey,
        model,
        tone: "direct",
        listing: {
          title: "Test connexion",
          price: 800,
          surface: 25,
          rooms: 1,
          city: "Paris",
          postal_code: null,
          furnished: null,
          property_type: null,
          description: null,
          publisher_type: null,
        },
        profile: {
          first_name: "Test",
          last_name: "User",
          email: null,
          phone: null,
          situation: null,
          income_monthly: null,
          guarantors: null,
          contract_type: null,
          intro_message: null,
          preferred_contact: null,
        },
      },
    });
    return { ok: true, model: res.model };
  } catch (e) {
    return { ok: false, model, error: String(e) };
  }
}
