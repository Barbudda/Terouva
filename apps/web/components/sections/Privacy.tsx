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
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-2)]/60 px-4 py-3 flex items-center gap-2">
        <Lock size={14} className="text-[var(--color-signal)]" />
        <span className="text-sm font-medium text-[var(--color-text)]">
          Une promesse simple
        </span>
      </div>
      <div className="p-6 text-sm space-y-4 leading-relaxed text-[var(--color-text-muted)]">
        <p className="text-[var(--color-text)]">
          Terouva n'a pas de serveur. Il n'y a aucun endroit où vos informations
          pourraient être envoyées.
        </p>
        <p>
          Vos recherches, vos annonces, votre profil et vos messages sont
          enregistrés uniquement sur votre ordinateur. Vous restez seul à y avoir
          accès.
        </p>
        <p className="text-[var(--color-text)]">
          Pas de compte, pas de mot de passe, pas de publicité. Rien à régler pour
          que ce soit privé : ça l'est dès le départ.
        </p>
      </div>
    </div>
  );
}
