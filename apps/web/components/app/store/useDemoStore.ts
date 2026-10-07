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

  /**
   * Vrai quand on quitte la démonstration pour passer à ses vraies annonces :
   * « Mes annonces » ouvre alors directement le panneau de l'e-mail d'alerte.
   */
  wantsRealSetup: boolean;
  clearRealSetup: () => void;

  init: () => Promise<void>;
  start: () => Promise<void>;
  stop: (opts?: { thenSetUpReal?: boolean }) => Promise<void>;
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
  wantsRealSetup: false,

  clearRealSetup: () => set({ wantsRealSetup: false }),

  init: async () => {
    set({ active: await isDemoActive(), step: await demoProgress(), ready: true });
  },

  start: async () => {
    await startDemo();
    await useStore.getState().refreshAll();
    set({ active: true, step: await demoProgress() });
  },

  stop: async (opts) => {
    await stopDemo();
    await useStore.getState().refreshAll();
    set({ active: false, step: 0, wantsRealSetup: opts?.thenSetUpReal === true });
  },

  next: async () => {
    const listing = await addNextDemoListing();
    if (!listing) return null;
    await useStore.getState().refreshListings();
    set({ step: await demoProgress() });
    return listing;
  },
}));
