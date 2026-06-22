import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@app/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-signal)] hover:bg-[var(--color-signal)] text-white border border-[var(--color-signal)] shadow-sm shadow-[var(--color-signal)]/20",
  secondary:
    "bg-[var(--color-panel-2)] hover:bg-[var(--color-border-2)] text-[var(--color-text)] border border-[var(--color-border-2)]",
  ghost:
    "bg-transparent hover:bg-[var(--color-panel-2)] text-[var(--color-text)] border border-transparent",
  danger:
    "bg-[var(--color-danger)]/90 hover:bg-[var(--color-danger)] text-white border border-[var(--color-danger)]/70",
  success:
    "bg-[var(--color-signal)]/90 hover:bg-[var(--color-signal)] text-white border border-[var(--color-signal)]/70",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)]/60",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
});
