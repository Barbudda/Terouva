"use client";

import { FEATURES } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const ACCENT_BORDER = {
  signal: "hover:border-[var(--color-signal)]/40",
  urgent: "hover:border-[var(--color-urgent)]/40",
  neutral: "hover:border-[var(--color-border-2)]",
};

const ACCENT_ICON = {
  signal: "text-[var(--color-signal)] bg-[var(--color-signal-soft)]",
  urgent: "text-[var(--color-urgent)] bg-[var(--color-urgent-soft)]",
  neutral: "text-[var(--color-text)] bg-[var(--color-panel-2)]",
};

export function Features() {
  return (
    <section
      id="features"
      className="relative py-32 md:py-40 border-t border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Features"
          title={
            <>
              Tout pour gagner la course.{" "}
              <span className="text-[var(--color-text-muted)]">
                Rien pour t'encombrer.
              </span>
            </>
          }
          subtitle="L'objectif n'est pas de faire 200 features. C'est de faire les 8 qui comptent vraiment, et de les rendre rapides."
        />

        <Stagger
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
          staggerChildren={0.05}
        >
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <FeatureCard {...f} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  accent,
}: (typeof FEATURES)[number]) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)]/40 p-5 h-full",
        "transition-all duration-300 hover:bg-[var(--color-panel)]/70 hover:-translate-y-0.5",
        ACCENT_BORDER[accent],
      )}
    >
      <div
        className={cn(
          "inline-flex items-center justify-center size-9 rounded-md",
          ACCENT_ICON[accent],
        )}
      >
        <Icon size={16} />
      </div>
      <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
        {body}
      </p>
    </div>
  );
}
