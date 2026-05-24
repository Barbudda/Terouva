"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HERO } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LiveCounter } from "@/components/ui/LiveCounter";
import { ListingTicker } from "@/components/ui/ListingTicker";
import { DashboardMockup } from "@/components/ui/DashboardMockup";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      {/* Background grid + halo */}
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[700px] -z-20"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(126,232,200,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Subtle ticker behind */}
      <ListingTicker />

      <div className="max-w-6xl mx-auto px-6 text-center relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiveCounter />
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-[44px] sm:text-6xl md:text-[78px] font-semibold tracking-[-0.03em] leading-[0.98]"
        >
          {HERO.titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
          <span className="block mt-2 bg-gradient-to-r from-[var(--color-signal)] via-[#d2f8e8] to-[var(--color-urgent)] bg-clip-text text-transparent">
            {HERO.titleEmphasis}
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center justify-center gap-3 flex-wrap"
        >
          <MagneticButton href={HERO.ctaPrimary.href} variant="primary" size="lg">
            {HERO.ctaPrimary.label}
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton href={HERO.ctaSecondary.href} variant="secondary" size="lg">
            {HERO.ctaSecondary.label}
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-5 text-xs text-[var(--color-text-faint)] font-mono"
        >
          {HERO.meta}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
