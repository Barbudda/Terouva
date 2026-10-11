import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark" | "onDark" | "lien";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  // L'ombre colorée est réservée à l'action principale : c'est elle qui la
  // distingue, pas une couleur de plus.
  primary: "rounded-md bg-accent text-white shadow-accent hover:bg-accent-ink",
  secondary: "rounded-md border border-rule bg-card text-ink hover:border-ink",
  dark: "rounded-md bg-ink text-white hover:bg-night-2",
  onDark: "rounded-md border border-night-rule bg-night-2 text-night-ink hover:border-night-ink-2",
  // Lien secondaire : pas de fond, une flèche fine qui avance au survol.
  lien: "group gap-2 px-0 text-ink hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

/**
 * Rectangle légèrement arrondi, pas une pilule.
 *
 * La pilule est la forme par défaut de toutes les pages de produit ; le
 * rectangle arrondi tient mieux à côté d'une typographie serrée et de grandes
 * images. La variante « lien » sert d'action secondaire : elle ne concurrence
 * pas le bouton principal.
 */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-colors duration-150",
        variant === "lien" ? "h-11 text-[15px]" : sizes[size],
        variants[variant],
        className,
      )}
    >
      {children}
      {variant === "lien" && <Fleche />}
    </a>
  );
}

/** Flèche fine, qui avance de 2 px au survol. Dessinée, pas importée. */
export function Fleche({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={cn(
        "size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
