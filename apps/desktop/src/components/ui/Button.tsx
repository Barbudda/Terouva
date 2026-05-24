import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-violet-500 hover:bg-violet-400 text-white border border-violet-400 shadow-sm shadow-violet-500/20",
  secondary:
    "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700",
  ghost:
    "bg-transparent hover:bg-zinc-800 text-zinc-200 border border-transparent",
  danger:
    "bg-red-500/90 hover:bg-red-500 text-white border border-red-500/70",
  success:
    "bg-emerald-500/90 hover:bg-emerald-500 text-white border border-emerald-500/70",
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
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
});
