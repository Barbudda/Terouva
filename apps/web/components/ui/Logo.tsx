import { cn } from "@/lib/utils";

/**
 * Marque Terouva : un toit et un point (l'annonce qui vous est signalée),
 * posés sur un carré rose. Même dessin que `app/icon.svg`, aux couleurs des
 * jetons du thème : aucune valeur en dur dans les composants.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8 shrink-0", className)}>
      <rect width="32" height="32" rx="7" fill="var(--color-accent)" />
      <path
        d="M8.5 16.5 16 9.5l7.5 7"
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="21.5" r="2.4" fill="var(--color-paper)" />
    </svg>
  );
}

/**
 * Le logotype : le mot en Fraunces. En grand (masthead), la hauteur de
 * capitale atteint 48 px sur grand écran ; en petit, il tient dans une barre.
 */
export function Logo({
  className,
  dark = false,
  grand = false,
}: {
  className?: string;
  dark?: boolean;
  grand?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center", grand ? "gap-3" : "gap-2.5", className)}>
      <LogoMark className={grand ? "size-9 lg:size-11" : undefined} />
      <span
        className={cn(
          "titre titre--petit leading-none tracking-[-0.03em]",
          grand ? "text-[1.75rem] lg:text-[2.6rem]" : "text-[1.3rem]",
          dark ? "text-night-ink" : "text-ink",
        )}
      >
        Terouva
      </span>
    </span>
  );
}
