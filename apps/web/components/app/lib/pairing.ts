/**
 * Surcharge web — STUBS.
 *
 * L'appairage poll-based (serveur local Tauri + events `pair:request`) n'existe
 * plus sur le web. Le pont extension est refait au LOT 5 via `externally_connectable`
 * + handshake à secret. Ces stubs gardent l'API pour que l'app compile d'ici là.
 */
export interface PairRequestEvent {
  id: string;
  ext_id: string;
  label: string;
}

export function onPairRequest(
  _handler: (e: PairRequestEvent) => void,
): Promise<() => void> {
  return Promise.resolve(() => {});
}

export async function respondPairing(
  _requestId: string,
  _approve: boolean,
): Promise<void> {}

export async function listPendingPairings(): Promise<PairRequestEvent[]> {
  return [];
}
