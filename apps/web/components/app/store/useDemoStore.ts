import { create } from "zustand";
import {
  addNextDemoListing,
  demoProgress,
  isDemoActive,
  startDemo,
  stopDemo,
} from "@app/lib/demo";
import type { Listing } from "@app/types";
import { useStore } from "./useStore";

interface DemoState {
  /** La démonstration tourne-t-elle ? */
  active: boolean;
  /** Nombre d'annonces d'exemple déjà arrivées. */
  step: number;
  /** L'état a-t-il été lu en base (évite un clignotement au montage) ? */
  ready: boolean;

  init: () => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  /** Fait arriver l'annonce suivante ; renvoie celle qui vient d'être ajoutée. */
  next: () => Promise<Listing | null>;
}

/**
 * Source unique de vérité du mode démonstration : le bandeau, la liste
 * d'annonces et la page d'exemple lisent tous le même état.
 */
export const useDemoStore = create<DemoState>((set) => ({
  active: false,
  step: 0,
  ready: false,

  init: async () => {
    set({ active: await isDemoActive(), step: await demoProgress(), ready: true });
  },

  start: async () => {
    await startDemo();
    await useStore.getState().refreshAll();
    set({ active: true, step: await demoProgress() });
  },

  stop: async () => {
    await stopDemo();
    await useStore.getState().refreshAll();
    set({ active: false, step: 0 });
  },

  next: async () => {
    const listing = await addNextDemoListing();
    if (!listing) return null;
    await useStore.getState().refreshListings();
    set({ step: await demoProgress() });
    return listing;
  },
}));
