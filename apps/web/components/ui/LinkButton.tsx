import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-card hover:bg-accent-ink",
  secondary: "border border-field bg-card text-ink hover:border-ink",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-[15px]",
  lg: "h-12 px-6 text-base",
};

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
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
