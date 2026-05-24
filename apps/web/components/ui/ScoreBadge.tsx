"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  target: number;
  className?: string;
  /** Px size, default 64. */
  size?: number;
  /** Recommendation label below the score. */
  label?: string;
}

/**
 * Animated radial score gauge. When entering viewport, animates from 0 → target
 * with a non-linear easing. Color shifts from neutral → signal as score climbs.
 */
export function ScoreBadge({ target, className, size = 64, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduce = useReducedMotion();

  const value = useMotionValue(reduce ? target : 0);
  const display = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) return;
    if (!inView) return;
    const controls = animate(value, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, target, value, reduce]);

  // Stroke offset: 0 (full) → ring fully drawn.
  const circumference = 2 * Math.PI * 26;
  const strokeOffset = useTransform(value, (v) => circumference * (1 - v / 100));

  const color =
    target >= 80
      ? "var(--color-signal)"
      : target >= 65
        ? "var(--color-urgent)"
        : "var(--color-text-faint)";

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex flex-col items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="rotate-[-90deg]"
        aria-hidden
      >
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke="var(--color-border)"
          strokeWidth="3"
          fill="none"
        />
        <motion.circle
          cx="32"
          cy="32"
          r="26"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: strokeOffset }}
        />
      </svg>
      <motion.span
        className="absolute inset-0 grid place-items-center font-mono tabular text-[15px] font-semibold"
        style={{ color }}
      >
        {display}
      </motion.span>
      {label && (
        <span className="absolute -bottom-5 text-[10px] uppercase tracking-wider text-[var(--color-text-faint)] whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
