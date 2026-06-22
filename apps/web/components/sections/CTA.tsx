"use client";

import { ArrowRight } from "lucide-react";
import { CTA_FINAL } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section
      id="download"
      className="relative py-32 md:py-40 border-t border-[var(--color-border)] overflow-hidden"
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(126,232,200,0.10), transparent 70%)",
        }}
      />
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-50" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1]">
            {CTA_FINAL.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-base md:text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
            {CTA_FINAL.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
            <MagneticButton
              href={CTA_FINAL.primary.href}
              variant="primary"
              size="lg"
            >
              {CTA_FINAL.primary.label}
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              href={CTA_FINAL.secondary.href}
              variant="ghost"
              size="lg"
            >
              {CTA_FINAL.secondary.label}
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-faint)]">
            <span className="size-1.5 rounded-full bg-[var(--color-signal)] animate-pulse-dot" />
            <span>Pour Windows · environ 4 Mo · version d'essai gratuite</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
