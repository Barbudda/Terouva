import { create } from "zustand";
import {
  getLocalServerPort,
  getLocalServerToken,
  onWatchIngest,
  regenerateLocalServerToken,
  startWatchBridge,
  type WatchEventPayload,
  type WatchIngestResult,
} from "@/lib/watchBridge";
import { useStore } from "./useStore";

export interface WatchLogEntry {
  at: number;
  result: WatchIngestResult;
  payload: WatchEventPayload;
}

interface WatchState {
  port: number | null;
  token: string | null;
  bootstrapped: boolean;
  recent: WatchLogEntry[];
  totalDetected: number;
  notifiedCount: number;
  duplicateCount: number;

  init: () => Promise<void>;
  rotateToken: () => Promise<void>;
  clearLog: () => void;
}

const MAX_LOG = 50;

export const useWatchStore = create<WatchState>((set, get) => ({
  port: null,
  token: null,
  bootstrapped: false,
  recent: [],
  totalDetected: 0,
  notifiedCount: 0,
  duplicateCount: 0,

  init: async () => {
    if (get().bootstrapped) return;
    const [token, port] = await Promise.all([
      getLocalServerToken(),
      getLocalServerPort(),
    ]);
    await startWatchBridge();
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
      // Trigger a global refresh so the Annonces page sees the new row.
      useStore.getState().refreshListings().catch(() => {});
    });
    set({ token, port, bootstrapped: true });
  },

  rotateToken: async () => {
    const fresh = await regenerateLocalServerToken();
    set({ token: fresh });
  },

  clearLog: () => {
    set({ recent: [], totalDetected: 0, notifiedCount: 0, duplicateCount: 0 });
  },
}));
