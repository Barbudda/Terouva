import { FOOTER } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] mt-32">
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-50" />
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-[var(--color-signal)] to-[var(--color-signal-strong)] text-[var(--color-bg)] text-sm font-bold">
            T
          </span>
          <div className="leading-tight">
            <div className="text-[var(--color-text)] font-semibold tracking-tight">
              Terouva
            </div>
            <div className="text-xs text-[var(--color-text-faint)] font-mono">
              Gratuit · sans inscription
            </div>
          </div>
        </div>

        <p className="max-w-md text-xs text-[var(--color-text-muted)] leading-relaxed">
          {FOOTER.signature}{" "}
          <span className="text-[var(--color-text-faint)]">{FOOTER.disclaimer}</span>
        </p>
      </div>
    </footer>
  );
}
