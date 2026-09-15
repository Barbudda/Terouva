import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FolderOpen, List, Send, Settings } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@app/lib/cn";
import { type BridgeState, getBridgeState, onBridgeState } from "@app/lib/extBridge";

export const NAV = [
  { to: "/", label: "Mes annonces", short: "Annonces", icon: List },
  { to: "/candidatures", label: "Mes candidatures", short: "Candidatures", icon: Send },
  { to: "/dossier", label: "Mon dossier", short: "Dossier", icon: FolderOpen },
  { to: "/reglages", label: "Réglages", short: "Réglages", icon: Settings },
];

/** État réel de la connexion avec l'extension Chrome (et non un simple « prêt »). */
export function useBridgeState(): BridgeState {
  const [state, setState] = useState<BridgeState>(getBridgeState);
  useEffect(() => onBridgeState(setState), []);
  return state;
}

export function ExtensionStatus({ compact = false }: { compact?: boolean }) {
  const { connected, available: detected, error } = useBridgeState();
  // « En cours » seulement si l'extension est là et qu'aucune erreur n'est remontée.
  const available = detected && !error;
  const label = connected
    ? "Extension connectée"
    : available
      ? "Connexion en cours"
      : "Extension non connectée";
  return (
    <NavLink
      to="/surveillance"
      title="Voir l'état de la connexion avec l'extension Chrome"
      className={cn(
        "flex items-center gap-2 rounded-md text-sm transition-colors hover:bg-card",
        compact ? "px-2 py-1.5" : "px-3 py-2.5",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 shrink-0 rounded-full",
          connected ? "animate-breathe bg-good" : available ? "bg-warn" : "bg-field",
        )}
      />
      <span className={cn(compact && "text-[13px]", connected ? "text-good" : "text-ink-2")}>{label}</span>
    </NavLink>
  );
}

function navClass(isActive: boolean) {
  return cn(
    "flex items-center gap-3 rounded-md px-3 py-2 text-[15px] transition-colors",
    isActive ? "bg-card font-medium text-ink ring-1 ring-rule" : "text-ink-2 hover:bg-card/60 hover:text-ink",
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-rule bg-paper-2 md:flex">
      <a href="/" className="flex items-center gap-2.5 px-6 pt-5 pb-6" title="Retour au site Terouva">
        <LogoMark />
        <span className="font-serif text-[1.35rem] font-semibold leading-none tracking-tight text-ink">
          Terouva
        </span>
      </a>

      <nav aria-label="Navigation principale" className="flex-1 space-y-0.5 px-3">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => navClass(isActive)}>
            <Icon size={18} strokeWidth={1.75} aria-hidden />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-rule px-3 py-3">
        <ExtensionStatus />
        <p className="px-3 pb-1 text-[13px] leading-snug text-ink-3">
          Vos données restent sur cet ordinateur.
        </p>
      </div>
    </aside>
  );
}

/** Navigation mobile : barre du haut + onglets défilants. */
export function MobileNav() {
  return (
    <div className="border-b border-rule bg-paper-2 md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2" title="Retour au site Terouva">
          <LogoMark className="size-6" />
          <span className="font-serif text-xl font-semibold leading-none text-ink">Terouva</span>
        </a>
        <ExtensionStatus compact />
      </div>
      <nav aria-label="Navigation principale" className="-mb-px flex overflow-x-auto overflow-y-hidden no-scrollbar px-2">
        {NAV.map(({ to, short }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "whitespace-nowrap border-b-2 px-3 py-2.5 text-[15px] transition-colors",
                isActive ? "border-accent font-medium text-ink" : "border-transparent text-ink-2",
              )
            }
          >
            {short}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
