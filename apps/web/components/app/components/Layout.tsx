import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
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
  "/surveillance": "Connexion & diagnostics",
  "/profil": "Profil",
  "/recherches": "Recherches",
};

export function Layout() {
  const location = useLocation();
  const refreshAll = useStore((s) => s.refreshAll);
  const loading = useStore((s) => s.loading);
  const watchBootstrapped = useWatchStore((s) => s.bootstrapped);
  const initWatch = useWatchStore((s) => s.init);
  const title = TITLES[location.pathname] ?? "Terouva";
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

  return (
    <div className="h-full flex">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-[var(--color-border)] flex items-center justify-between px-6 bg-[var(--color-bg)]/80 backdrop-blur">
          <h1 className="text-base font-semibold tracking-tight">{title}</h1>
          <div className="flex items-center gap-4">
            <WatchStatusBadge online={watchBootstrapped} />
            {loading && (
              <span className="text-xs text-[var(--color-text-faint)] animate-pulse">chargement…</span>
            )}
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
      <ShortcutHelp open={helpOpen} onClose={closeHelp} />
      <PairingModal />
    </div>
  );
}

function WatchStatusBadge({ online }: { online: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider " +
        (online
          ? "border-[var(--color-signal)]/40 bg-[var(--color-signal-soft)] text-[var(--color-signal)]"
          : "border-[var(--color-border-2)] bg-[var(--color-bg-2)] text-[var(--color-text-faint)]")
      }
      title={
        online
          ? "Le serveur local d'écoute est actif. L'extension peut envoyer des annonces."
          : "Le serveur local n'est pas encore prêt."
      }
    >
      <span
        className={
          "size-1.5 rounded-full " +
          (online ? "bg-[var(--color-signal)] animate-pulse" : "bg-[var(--color-border-2)]")
        }
      />
      Watch {online ? "ON" : "OFF"}
    </span>
  );
}
