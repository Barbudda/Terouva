import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useStore } from "@/store/useStore";

const TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/recherches": "Recherches",
  "/annonces": "Annonces",
  "/candidatures": "Candidatures",
  "/profil": "Profil locataire",
  "/reglages": "Réglages",
};

export function Layout() {
  const location = useLocation();
  const refreshAll = useStore((s) => s.refreshAll);
  const loading = useStore((s) => s.loading);
  const title = TITLES[location.pathname] ?? "Terouva";

  useEffect(() => {
    refreshAll().catch((e) => {
      console.error("Initial load failed:", e);
    });
  }, [refreshAll]);

  return (
    <div className="h-full flex">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/80 backdrop-blur">
          <h1 className="text-base font-semibold tracking-tight">{title}</h1>
          {loading && (
            <span className="text-xs text-zinc-500 animate-pulse">chargement…</span>
          )}
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
