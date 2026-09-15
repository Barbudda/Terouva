import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@app/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: "bg-accent text-card border border-accent hover:bg-accent-ink hover:border-accent-ink",
  secondary: "bg-card text-ink border border-field hover:border-ink",
  ghost: "bg-transparent text-ink-2 border border-transparent hover:bg-paper-2 hover:text-ink",
  danger: "bg-transparent text-bad border border-transparent hover:bg-bad-wash hover:border-bad/30",
  success: "bg-good text-card border border-good hover:bg-good/90",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-[15px]",
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
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-150",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
});
