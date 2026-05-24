"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Bell, Circle, Layers, MessageSquare, Search, User2 } from "lucide-react";
import { ScoreBadge } from "./ScoreBadge";

/**
 * Faux-screenshot of the Terouva desktop dashboard. SVG/HTML, not a real screenshot,
 * so it scales crisp at any size and animates smoothly.
 */
export function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-5xl">
      {/* Ambient halo */}
      <div
        aria-hidden
        className="absolute -inset-x-20 -top-10 -bottom-10 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(126,232,200,0.10), transparent 70%)",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, rotateX: -4 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1200 }}
        className="rounded-xl border border-[var(--color-border-2)] bg-[var(--color-panel)]/85 backdrop-blur shadow-2xl overflow-hidden"
      >
        {/* Title bar */}
        <div className="h-9 border-b border-[var(--color-border)] bg-[var(--color-bg-2)]/80 flex items-center px-4 gap-2">
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="ml-3 text-[11px] font-mono text-[var(--color-text-faint)]">
            terouva://dashboard
          </span>
          <span className="ml-auto text-[10px] font-mono text-[var(--color-text-faint)]">
            v0.1.0
          </span>
        </div>

        <div className="grid grid-cols-[200px_1fr] min-h-[420px]">
          {/* Sidebar */}
          <div className="border-r border-[var(--color-border)] p-3 space-y-1 text-xs bg-[var(--color-bg-2)]/40">
            <div className="px-2 pt-1 pb-3 flex items-center gap-2">
              <span className="size-6 rounded-md bg-gradient-to-br from-[var(--color-signal)] to-[var(--color-signal-strong)] grid place-items-center text-[10px] font-bold text-[var(--color-bg)]">
                T
              </span>
              <div className="text-[var(--color-text)] font-semibold tracking-tight text-[13px]">
                Terouva
              </div>
            </div>
            <NavRow icon={<Search size={13} />} label="Dashboard" active />
            <NavRow icon={<Circle size={13} />} label="Recherches" badge="4" />
            <NavRow icon={<Layers size={13} />} label="Annonces" badge="42" />
            <NavRow icon={<MessageSquare size={13} />} label="Candidatures" badge="11" />
            <NavRow icon={<User2 size={13} />} label="Profil" />
          </div>

          {/* Main */}
          <div className="p-5 space-y-5">
            <div className="grid grid-cols-4 gap-3">
              <Stat label="Annonces" value="42" delta="+9 24h" />
              <Stat label="Hot" value="6" delta="score ≥ 80" accent />
              <Stat label="Brouillons" value="3" />
              <Stat label="Envoyées" value="11" />
            </div>

            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-2)]/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                  Top à traiter
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-faint)]">
                  <Bell size={11} />
                  <span>seuil notif : 70</span>
                </div>
              </div>
              <div className="space-y-2.5">
                <MockListing
                  score={92}
                  title="Studio lumineux 28m² · Paris 11e"
                  meta="1 240€ · 28m² · 1p · particulier"
                  hot
                />
                <MockListing
                  score={87}
                  title="2 pièces refait à neuf · Lyon 3e"
                  meta="980€ · 42m² · 2p · particulier"
                  hot
                />
                <MockListing
                  score={74}
                  title="T1 meublé balcon · Bordeaux Bastide"
                  meta="720€ · 22m² · 1p · agence"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating "candidature préparée" toast */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: 40, y: 10 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex absolute -bottom-6 -right-2 lg:right-6 items-center gap-3 rounded-lg border border-[var(--color-signal)]/40 bg-[var(--color-panel)]/95 backdrop-blur px-4 py-3 glow-signal max-w-[280px]"
      >
        <ScoreBadge target={92} size={48} />
        <div className="text-[11px] leading-tight">
          <div className="text-[var(--color-signal)] font-semibold mb-0.5">
            Candidature prête
          </div>
          <div className="text-[var(--color-text-muted)]">
            Message rédigé · 20 sec pour copier-coller.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function NavRow({
  icon,
  label,
  active,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={
        "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md " +
        (active
          ? "bg-[var(--color-panel-2)] text-[var(--color-text)]"
          : "text-[var(--color-text-muted)]")
      }
    >
      <span className="text-[var(--color-text-faint)]">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="font-mono tabular text-[10px] text-[var(--color-text-faint)]">
          {badge}
        </span>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
  accent,
}: {
  label: string;
  value: string;
  delta?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-2)]/60 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-faint)]">
        {label}
      </div>
      <div
        className={
          "text-[20px] font-semibold leading-tight tabular " +
          (accent ? "text-[var(--color-signal)]" : "text-[var(--color-text)]")
        }
      >
        {value}
      </div>
      {delta && (
        <div className="text-[10px] font-mono text-[var(--color-text-faint)] mt-0.5">
          {delta}
        </div>
      )}
    </div>
  );
}

function MockListing({
  score,
  title,
  meta,
  hot,
}: {
  score: number;
  title: string;
  meta: string;
  hot?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-panel-2)]/60 p-2.5">
      <ScoreBadge target={score} size={40} />
      <div className="flex-1 min-w-0">
        <div className="text-[12px] text-[var(--color-text)] truncate">{title}</div>
        <div className="text-[10px] font-mono text-[var(--color-text-faint)] truncate">
          {meta}
        </div>
      </div>
      {hot && (
        <span className="text-[9px] uppercase tracking-wider font-mono rounded border border-[var(--color-signal)]/40 bg-[var(--color-signal-soft)] text-[var(--color-signal)] px-1.5 py-0.5">
          contacter vite
        </span>
      )}
    </div>
  );
}
