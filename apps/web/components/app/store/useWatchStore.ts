import { create } from "zustand";
import {
  onWatchIngest,
  type WatchEventPayload,
  type WatchIngestResult,
} from "@app/lib/watchBridge";
import { useStore } from "./useStore";

export interface WatchLogEntry {
  at: number;
  result: WatchIngestResult;
  payload: WatchEventPayload;
}

interface WatchState {
  bootstrapped: boolean;
  recent: WatchLogEntry[];
  totalDetected: number;
  notifiedCount: number;
  duplicateCount: number;

  init: () => Promise<void>;
  clearLog: () => void;
}

const MAX_LOG = 50;

/**
 * Journal des annonces reçues de l'extension. La connexion réelle au pont est
 * gérée par `extBridge` (cf. AppRoot) ; ce store ne fait qu'enregistrer chaque
 * détection pour l'afficher (page « État extension ») et rafraîchir le feed.
 */
export const useWatchStore = create<WatchState>((set, get) => ({
  bootstrapped: false,
  recent: [],
  totalDetected: 0,
  notifiedCount: 0,
  duplicateCount: 0,

  init: async () => {
    if (get().bootstrapped) return;
    onWatchIngest((result, payload) => {
      set((s) => {
        const entry: WatchLogEntry = { at: Date.now(), result, payload };
        const recent = [entry, ...s.recent].slice(0, MAX_LOG);
        return {
          recent,
          totalDetected: s.totalDetected + 1,
          duplicateCount: s.duplicateCount + (result.status === "duplicate" ? 1 : 0),
          notifiedCount: s.notifiedCount + (result.notified ? 1 : 0),
        };
      });
      // Rafraîchit le feed pour que la page Annonces voie la nouvelle ligne.
      useStore.getState().refreshListings().catch(() => {});
    });
    set({ bootstrapped: true });
  },

  clearLog: () => {
    set({ recent: [], totalDetected: 0, notifiedCount: 0, duplicateCount: 0 });
  },
}));
