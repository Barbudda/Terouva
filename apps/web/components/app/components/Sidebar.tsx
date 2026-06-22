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
    <aside className="w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col">
      <div className="px-5 py-5 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-zinc-950 text-sm font-bold">
            T
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">Terouva</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
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
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200",
              )
            }
          >
            <span className="text-zinc-500">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-zinc-800">
        <NavLink
          to="/reglages"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              isActive
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200",
            )
          }
        >
          <span>⚙</span>
          <span>Réglages</span>
        </NavLink>
        <div className="px-3 pt-2 text-[10px] text-zinc-700">v0.2 • local-first</div>
      </div>
    </aside>
  );
}
