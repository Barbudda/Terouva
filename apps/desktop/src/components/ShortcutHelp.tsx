import { SHORTCUTS } from "@/lib/shortcuts";

export function ShortcutHelp({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[480px] max-w-[92vw] rounded-xl border border-zinc-800 bg-zinc-900/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-100">Raccourcis clavier</div>
            <div className="text-[11px] text-zinc-500 font-mono">
              fermer avec Échap ou ?
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 text-sm"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
        <ul className="px-5 py-4 space-y-2 text-sm">
          {SHORTCUTS.map((s) => (
            <li
              key={s.combo}
              className="flex items-center justify-between gap-3 py-1"
            >
              <span className="text-zinc-300">{s.description}</span>
              <kbd className="inline-flex items-center gap-1 rounded border border-zinc-700 bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-zinc-200">
                {s.combo}
              </kbd>
            </li>
          ))}
        </ul>
        <div className="px-5 py-3 border-t border-zinc-800 text-[11px] text-zinc-500">
          Les raccourcis ne se déclenchent pas quand tu tapes dans un champ.
        </div>
      </div>
    </div>
  );
}
