import { invoke } from "@tauri-apps/api/core";
import { openUrl } from "@tauri-apps/plugin-opener";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";
import type { ParsedListing } from "@/types";

export async function parseListingUrl(url: string): Promise<ParsedListing> {
  return invoke<ParsedListing>("parse_listing_url", { url });
}

export async function openExternal(url: string): Promise<void> {
  await openUrl(url);
}

export async function ensureNotificationPermission(): Promise<boolean> {
  let granted = await isPermissionGranted();
  if (!granted) {
    const perm = await requestPermission();
    granted = perm === "granted";
  }
  return granted;
}

export async function notifyDesktop(opts: { title: string; body: string }) {
  const ok = await ensureNotificationPermission();
  if (!ok) return;
  sendNotification(opts);
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}
