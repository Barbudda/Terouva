"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { NAV_LINKS } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Terouva — accueil"
        >
          <span className="relative grid size-7 place-items-center rounded-md bg-gradient-to-br from-[var(--color-signal)] to-[var(--color-signal-strong)] text-[var(--color-bg)] text-sm font-bold transition-transform group-hover:scale-105">
            T
          </span>
          <span className="font-semibold tracking-tight">Terouva</span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-[var(--color-text-faint)] border border-[var(--color-border)] rounded px-1.5 py-0.5 ml-1">
            essai gratuit
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticButton href="/app" variant="primary" size="md" pull={6}>
            Ouvrir Terouva
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
}
