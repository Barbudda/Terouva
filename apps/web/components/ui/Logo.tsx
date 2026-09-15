import { cn } from "@/lib/utils";

/**
 * Marque Terouva : un toit et un point (l'annonce qui vous est signalée),
 * posés sur un carré terracotta. Même dessin que `app/icon.svg`.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7 shrink-0", className)}>
      <rect width="32" height="32" rx="6" fill="#A9482A" />
      <path
        d="M8.5 16.5 16 9.5l7.5 7"
        fill="none"
        stroke="#FBF9F4"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="21.5" r="2.4" fill="#FBF9F4" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-serif text-[1.35rem] font-semibold leading-none tracking-tight text-ink">
        Terouva
      </span>
    </span>
  );
}
