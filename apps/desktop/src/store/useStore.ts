import { create } from "zustand";
import {
  getUserProfile,
  listDocuments,
  listListings,
  listSearchProfiles,
} from "@/lib/db";
import type {
  DocumentItem,
  Listing,
  SearchProfile,
  UserProfile,
} from "@/types";

interface AppState {
  profile: UserProfile | null;
  searches: SearchProfile[];
  listings: Listing[];
  documents: DocumentItem[];
  loading: boolean;

  refreshAll: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshSearches: () => Promise<void>;
  refreshListings: () => Promise<void>;
  refreshDocuments: () => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  profile: null,
  searches: [],
  listings: [],
  documents: [],
  loading: false,

  refreshAll: async () => {
    set({ loading: true });
    const [profile, searches, listings, documents] = await Promise.all([
      getUserProfile(),
      listSearchProfiles(),
      listListings(),
      listDocuments(),
    ]);
    set({ profile, searches, listings, documents, loading: false });
  },
  refreshProfile: async () => {
    const profile = await getUserProfile();
    set({ profile });
  },
  refreshSearches: async () => {
    const searches = await listSearchProfiles();
    set({ searches });
  },
  refreshListings: async () => {
    const listings = await listListings();
    set({ listings });
  },
  refreshDocuments: async () => {
    const documents = await listDocuments();
    set({ documents });
  },
}));
