"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-32 md:py-40 border-t border-[var(--color-border)]"
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Les questions qu'on pose en vrai."
        />

        <Stagger className="mt-16 space-y-2" staggerChildren={0.06}>
          {FAQ_ITEMS.map((item, i) => (
            <StaggerItem key={item.q}>
              <FAQItem
                {...item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FAQItem({
  q,
  a,
  index,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "rounded-xl border bg-[var(--color-panel)]/40 overflow-hidden",
        isOpen
          ? "border-[var(--color-border-2)]"
          : "border-[var(--color-border)] hover:border-[var(--color-border-2)]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
      >
        <span className="font-mono text-xs text-[var(--color-text-faint)] tabular">
          0{index + 1}
        </span>
        <span className="flex-1 text-[15px] font-medium text-[var(--color-text)]">
          {q}
        </span>
        <Plus
          size={16}
          className={cn(
            "shrink-0 text-[var(--color-text-faint)] group-hover:text-[var(--color-signal)] transition-all",
            isOpen && "rotate-45 text-[var(--color-signal)]",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-12 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
