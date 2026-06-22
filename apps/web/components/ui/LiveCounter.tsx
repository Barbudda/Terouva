/**
 * Petit bandeau rassurant affiché au-dessus du titre. Volontairement calme et
 * sans pression : pas de compte à rebours, pas de « vous ratez des annonces ».
 */
export function LiveCounter() {
  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border-2)] bg-[var(--color-panel)]/60 backdrop-blur px-3.5 py-1.5 text-xs text-[var(--color-text-muted)]"
    >
      <span className="relative flex size-1.5">
        <span className="absolute inset-0 rounded-full bg-[var(--color-signal)] animate-pulse-dot" />
        <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-signal)]" />
      </span>
      <span>
        Gratuit, sans inscription — vos données restent sur votre ordinateur.
      </span>
    </div>
  );
}
