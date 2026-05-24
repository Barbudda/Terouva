"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface Props {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Strength of magnetic pull in px (default 8). */
  pull?: number;
  onClick?: () => void;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-signal)] text-[var(--color-bg)] hover:bg-[var(--color-signal-strong)] glow-signal",
  secondary:
    "bg-[var(--color-panel-2)] text-[var(--color-text)] border border-[var(--color-border-2)] hover:border-[var(--color-border-2)] hover:bg-[var(--color-panel)]",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/[0.03]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function MagneticButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  pull = 8,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 22, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(dx * pull);
    y.set(dy * pull);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight",
    "transition-colors duration-200 will-change-transform select-none",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = <span className="relative z-10">{children}</span>;

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: sx, y: sy }}
        className={classes}
        onClick={onClick}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={classes}
      onClick={onClick}
      type="button"
    >
      {inner}
    </motion.button>
  );
}
