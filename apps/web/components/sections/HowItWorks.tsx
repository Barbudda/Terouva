"use client";

import { STEPS } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how" className="relative py-32 md:py-40 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Comment ça marche"
          title={
            <>
              Trois étapes.{" "}
              <span className="text-[var(--color-text-muted)]">Tout simplement.</span>
            </>
          }
          subtitle="Quelques minutes pour tout préparer. Ensuite, Terouva s'occupe de vous prévenir."
        />

        <div className="mt-20 relative">
          {/* Connector line — visible md+ */}
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[var(--color-border-2)] to-transparent"
          />

          <Stagger
            className="grid md:grid-cols-3 gap-5"
            staggerChildren={0.12}
          >
            {STEPS.map((step) => (
              <StaggerItem key={step.n}>
                <StepCard {...step} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  n,
  title,
  body,
  detail,
}: {
  n: string;
  title: string;
  body: string;
  detail: string;
}) {
  return (
    <div className="group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)]/40 p-7 transition-colors hover:border-[var(--color-border-2)] hover:bg-[var(--color-panel)]/70">
      <div className="flex items-start justify-between">
        <div className="font-mono tabular text-[var(--color-signal)] text-sm">
          {n}
        </div>
        <ArrowUpRight
          size={14}
          className="text-[var(--color-text-faint)] group-hover:text-[var(--color-signal)] transition-colors -translate-y-0.5 translate-x-0.5 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform"
        />
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
        {body}
      </p>
      <div className="mt-6 pt-4 border-t border-[var(--color-border)] font-mono text-[11px] text-[var(--color-text-faint)]">
        {detail}
      </div>
    </div>
  );
}
