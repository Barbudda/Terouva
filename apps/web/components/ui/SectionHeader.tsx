"use client";

import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-3 text-3xl md:text-[44px] font-semibold tracking-tight leading-[1.05]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
