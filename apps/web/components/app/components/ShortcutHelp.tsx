import { X } from "lucide-react";
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
      className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcut-help-title"
        className="w-[460px] max-w-full rounded-md border border-rule bg-card shadow-[0_12px_40px_-12px_rgb(31_29_26/0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-4">
          <div>
            <h2 id="shortcut-help-title" className="font-serif text-xl font-medium text-ink">
              Raccourcis clavier
            </h2>
            <p className="mt-0.5 text-[13px] text-ink-3">Fermer avec Échap ou la touche ?</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-3 transition-colors hover:bg-paper-2 hover:text-ink"
            aria-label="Fermer"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>
        <ul className="space-y-1 px-5 py-4 text-[15px]">
          {SHORTCUTS.map((s) => (
            <li key={s.combo} className="flex items-center justify-between gap-3 py-1">
              <span className="text-ink-2">{s.description}</span>
              <kbd className="rounded border border-field bg-paper px-2 py-0.5 font-mono text-[13px] text-ink">
                {s.combo}
              </kbd>
            </li>
          ))}
        </ul>
        <p className="border-t border-rule px-5 py-3 text-[13px] text-ink-3">
          Les raccourcis ne se déclenchent pas quand vous écrivez dans un champ.
        </p>
      </div>
    </div>
  );
}
