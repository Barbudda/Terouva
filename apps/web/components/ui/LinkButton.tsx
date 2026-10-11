import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark" | "onDark";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-ink",
  secondary: "border border-rule bg-card text-ink hover:border-ink",
  dark: "bg-ink text-white hover:bg-night-2",
  onDark: "border border-night-rule bg-night-2 text-night-ink hover:border-night-ink-2",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

/** Bouton en pilule : la forme du thème (rayon plein) et la seule du site. */
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
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
