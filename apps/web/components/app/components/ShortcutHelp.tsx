import { SHORTCUTS } from "@app/lib/shortcuts";

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
      className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-bg)]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[480px] max-w-[92vw] rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)]/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-[var(--color-text)]">Raccourcis clavier</div>
            <div className="text-[11px] text-[var(--color-text-faint)] font-mono">
              fermer avec Échap ou ?
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-text-faint)] hover:text-[var(--color-text)] text-sm"
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
              <span className="text-[var(--color-text-muted)]">{s.description}</span>
              <kbd className="inline-flex items-center gap-1 rounded border border-[var(--color-border-2)] bg-[var(--color-bg)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-text)]">
                {s.combo}
              </kbd>
            </li>
          ))}
        </ul>
        <div className="px-5 py-3 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-faint)]">
          Les raccourcis ne se déclenchent pas quand tu tapes dans un champ.
        </div>
      </div>
    </div>
  );
}
