import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";

const NAV = [
  { to: "/", label: "Dashboard", icon: "▦" },
  { to: "/recherches", label: "Recherches", icon: "◎" },
  { to: "/annonces", label: "Annonces", icon: "▤" },
  { to: "/candidatures", label: "Candidatures", icon: "✉" },
  { to: "/profil", label: "Profil locataire", icon: "◔" },
  { to: "/reglages", label: "Réglages", icon: "⚙" },
];

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col">
      <div className="px-5 py-5 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center text-white text-sm font-bold">
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
      <div className="p-3 border-t border-zinc-800 text-xs text-zinc-600">
        v0.1 • local-first
      </div>
    </aside>
  );
}
