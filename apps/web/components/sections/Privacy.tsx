"use client";

import { PRIVACY } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Lock } from "lucide-react";

export function Privacy() {
  return (
    <section
      id="privacy"
      className="relative py-32 md:py-40 border-t border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow={PRIVACY.eyebrow}
          title={PRIVACY.title}
          subtitle={PRIVACY.body}
        />

        <div className="mt-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <Reveal>
            <ServerErrorCard />
          </Reveal>

          <Stagger
            className="space-y-px rounded-xl border border-[var(--color-border)] overflow-hidden"
            staggerChildren={0.06}
          >
            {PRIVACY.points.map((p) => (
              <StaggerItem
                key={p.label}
                className="grid grid-cols-[120px_1fr_auto] items-center gap-4 px-5 py-4 bg-[var(--color-panel)]/50 hover:bg-[var(--color-panel)]/80 transition-colors"
              >
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-faint)]">
                  {p.label}
                </div>
                <div className="text-sm text-[var(--color-text)]">{p.value}</div>
                <div className="text-[11px] font-mono text-[var(--color-text-faint)] text-right">
                  {p.mono}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function ServerErrorCard() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)]/40 overflow-hidden">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-2)]/60 px-4 py-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-[var(--color-danger)] animate-pulse-dot" />
        <span className="text-[11px] font-mono text-[var(--color-text-faint)] uppercase tracking-wider">
          Request log
        </span>
      </div>
      <div className="p-6 font-mono text-sm space-y-2">
        <div className="text-[var(--color-text-faint)]">
          <span className="text-[var(--color-text-muted)]">$</span> curl -X POST{" "}
          <span className="text-[var(--color-text)]">api.terouva.app/sync</span>
        </div>
        <div className="text-[var(--color-danger)] pl-3 border-l-2 border-[var(--color-danger)]/40 py-2">
          <div className="text-xs uppercase tracking-wider mb-1 opacity-80">Error</div>
          <div className="text-sm">404 — no such server exists</div>
        </div>
        <div className="text-[var(--color-text-faint)] text-xs leading-relaxed pt-3">
          Il n'y a pas d'API Terouva. Pas par éthique seulement —{" "}
          <span className="text-[var(--color-text)]">par construction</span>.
          L'app n'envoie rien dehors parce qu'il n'y a personne pour la recevoir.
        </div>
        <div className="mt-4 flex items-center gap-2 pt-3 border-t border-[var(--color-border)] text-xs">
          <Lock size={12} className="text-[var(--color-signal)]" />
          <span className="text-[var(--color-text-muted)]">
            Données stockées dans <span className="text-[var(--color-text)]">terouva.db</span> uniquement.
          </span>
        </div>
      </div>
    </div>
  );
}
