import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MobileNav, Sidebar } from "./Sidebar";
import { ShortcutHelp } from "./ShortcutHelp";
import { PairingModal } from "./PairingModal";
import { useGlobalShortcuts } from "@app/lib/shortcuts";
import { useStore } from "@app/store/useStore";
import { useWatchStore } from "@app/store/useWatchStore";

const TITLES: Record<string, string> = {
  "/": "Mes annonces",
  "/candidatures": "Mes candidatures",
  "/dossier": "Mon dossier",
  "/reglages": "Réglages",
  "/surveillance": "Connexion avec l'extension",
  "/profil": "Profil",
  "/recherches": "Recherches",
};

export function Layout() {
  const location = useLocation();
  const refreshAll = useStore((s) => s.refreshAll);
  const loading = useStore((s) => s.loading);
  const initWatch = useWatchStore((s) => s.init);
  const title = TITLES[location.pathname] ?? (location.pathname.startsWith("/annonces") ? "Mes annonces" : "Terouva");
  const { helpOpen, closeHelp } = useGlobalShortcuts();

  useEffect(() => {
    refreshAll().catch((e) => {
      console.error("Initial load failed:", e);
    });
  }, [refreshAll]);

  useEffect(() => {
    initWatch().catch((e) => {
      console.error("Watch bridge init failed:", e);
    });
  }, [initWatch]);

  useEffect(() => {
    document.title = `${title} · Terouva`;
  }, [title]);

  return (
    <div className="app-root flex h-dvh flex-col bg-paper text-ink md:flex-row">
      <Sidebar />
      <MobileNav />
      <main className="app-scroll flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 pt-6 pb-16 sm:px-6 md:pt-10 lg:px-10">
          <header className="mb-6 flex items-baseline justify-between gap-4 md:mb-8">
            <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
              {title}
            </h1>
            {loading && (
              <span role="status" className="text-sm text-ink-3">
                Chargement…
              </span>
            )}
          </header>
          <Outlet />
        </div>
      </main>
      <ShortcutHelp open={helpOpen} onClose={closeHelp} />
      <PairingModal />
    </div>
  );
}
