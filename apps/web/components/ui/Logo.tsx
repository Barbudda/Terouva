import { cn } from "@/lib/utils";

/**
 * Marque Terouva : un toit et un point (l'annonce qui vous est signalée),
 * posés sur un carré rose. Même dessin que `app/icon.svg`.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8 shrink-0", className)}>
      <rect width="32" height="32" rx="9" fill="#C92D6A" />
      <path
        d="M8.5 16.5 16 9.5l7.5 7"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="21.5" r="2.4" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "display text-[1.3rem] leading-none",
          dark ? "text-night-ink" : "text-ink",
        )}
      >
        Terouva
      </span>
    </span>
  );
}
