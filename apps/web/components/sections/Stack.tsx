"use client";

import { STACK_ITEMS } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Stack() {
  return (
    <section className="relative py-24 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">
                Pour les curieux
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                Une stack ennuyeuse.{" "}
                <span className="text-[var(--color-text-muted)]">
                  Volontairement.
                </span>
              </h2>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] max-w-md">
              Pas de framework expérimental, pas de pile « innovante » qui casse dans 6 mois.
              Du code lisible, qui survit.
            </p>
          </div>
        </Reveal>

        <Stagger
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-px rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]"
          staggerChildren={0.04}
        >
          {STACK_ITEMS.map((s) => (
            <StaggerItem
              key={s.name}
              className="bg-[var(--color-bg)] hover:bg-[var(--color-panel)]/60 transition-colors p-5"
            >
              <div className="font-mono text-[var(--color-signal)] text-sm">
                {s.name}
              </div>
              <div className="mt-2 text-[13px] text-[var(--color-text-muted)]">
                {s.role}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
