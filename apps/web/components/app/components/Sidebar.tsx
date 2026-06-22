import { NavLink } from "react-router-dom";
import { cn } from "@app/lib/cn";

// Navigation grand public : 3 entrées principales + Réglages (avancé) en bas.
const NAV = [
  { to: "/", label: "Mes annonces", icon: "▤" },
  { to: "/candidatures", label: "Mes candidatures", icon: "✉" },
  { to: "/dossier", label: "Mon dossier", icon: "◔" },
];

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col">
      <div className="px-5 py-5 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-gradient-to-br from-[var(--color-signal)] to-[var(--color-signal)] grid place-items-center text-[var(--color-bg)] text-sm font-bold">
            T
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">Terouva</div>
            <div className="text-[10px] text-[var(--color-text-faint)] uppercase tracking-wider">
              local copilot
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-[var(--color-panel-2)] text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-2)] hover:text-[var(--color-text)]",
              )
            }
          >
            <span className="text-[var(--color-text-faint)]">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-[var(--color-border)]">
        <NavLink
          to="/reglages"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              isActive
                ? "bg-[var(--color-panel-2)] text-[var(--color-text)]"
                : "text-[var(--color-text-faint)] hover:bg-[var(--color-bg-2)] hover:text-[var(--color-text)]",
            )
          }
        >
          <span>⚙</span>
          <span>Réglages</span>
        </NavLink>
        <div className="px-3 pt-2 text-[10px] text-[var(--color-text-faint)]">v0.2 • local-first</div>
      </div>
    </aside>
  );
}
