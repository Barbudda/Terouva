/**
 * Appairage « Autoriser cette extension » (style Bluetooth).
 *
 * L'extension Chrome, au premier lancement, POST /pair/request au serveur local
 * (sans token). Le serveur émet l'event Tauri `pair:request`. L'app affiche une
 * modale ; l'utilisateur clique « Autoriser » → `respond_pairing` attache le
 * token courant à la demande → l'extension le récupère via GET /pair/status/:id.
 * Zéro copier-coller de token côté utilisateur.
 */

import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";

export interface PairRequestEvent {
  id: string;
  ext_id: string;
  label: string;
}

export function onPairRequest(
  handler: (e: PairRequestEvent) => void,
): Promise<UnlistenFn> {
  return listen<PairRequestEvent>("pair:request", (ev) => handler(ev.payload));
}

export async function respondPairing(
  requestId: string,
  approve: boolean,
): Promise<void> {
  await invoke("respond_pairing", { requestId, approve });
}

export async function listPendingPairings(): Promise<PairRequestEvent[]> {
  return (await invoke<PairRequestEvent[]>("list_pending_pairings")) ?? [];
}
