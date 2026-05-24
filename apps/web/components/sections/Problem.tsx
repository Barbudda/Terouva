"use client";

import { motion, useInView, useReducedMotion, animate, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { PROBLEM, PROBLEM_STATS } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Problem() {
  return (
    <section id="problem" className="relative py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow={PROBLEM.eyebrow}
          title={
            <>
              {PROBLEM.title}
              <br />
              <span className="text-[var(--color-text-muted)]">{PROBLEM.titleAccent}</span>
            </>
          }
          subtitle={PROBLEM.body}
        />

        <Stagger
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]"
          staggerChildren={0.12}
        >
          {PROBLEM_STATS.map((s, i) => (
            <StaggerItem key={i} className="bg-[var(--color-bg)]">
              <StatCard {...s} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mt-16 mx-auto max-w-2xl text-center text-xl md:text-2xl font-medium tracking-tight text-[var(--color-text)]">
            {PROBLEM.punch.split(" Pas ").map((part, i) =>
              i === 0 ? (
                <span key={i}>{part}</span>
              ) : (
                <span key={i}>
                  {" "}
                  <span className="text-[var(--color-text-faint)] line-through">
                    Pas {part}
                  </span>
                </span>
              ),
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function StatCard({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  // Animate numeric portion if present.
  const numeric = parseInt(value.replace(/[^\d]/g, ""), 10);
  const isNumeric = !Number.isNaN(numeric);
  const mv = useMotionValue(reduce ? numeric || 0 : 0);
  const display = useTransform(mv, (v) => {
    if (!isNumeric) return value;
    const prefix = value.startsWith("~") ? "~" : "";
    return `${prefix}${Math.round(v)}`;
  });

  useEffect(() => {
    if (!isNumeric || reduce || !inView) return;
    const ctrl = animate(mv, numeric, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => ctrl.stop();
  }, [inView, isNumeric, numeric, mv, reduce]);

  return (
    <div
      ref={ref}
      className="relative p-10 md:p-12 group hover:bg-[var(--color-bg-2)] transition-colors"
    >
      <motion.div className="font-mono tabular text-[72px] md:text-[88px] leading-none tracking-tight text-[var(--color-text)]">
        {display}
      </motion.div>
      <div className="mt-3 text-[var(--color-signal)] font-mono uppercase tracking-wider text-xs">
        {unit}
      </div>
      <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{label}</p>
      <div
        aria-hidden
        className="absolute top-6 right-6 size-2 rounded-full bg-[var(--color-signal)] opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
