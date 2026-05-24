"use client";

import { useEffect, useState } from "react";

/**
 * Live counter that increments since component mount.
 * Computes a believable "missed listings" number from elapsed seconds.
 * Anchors the message: "Tu lis ce site depuis Xs — Y annonces sont passées."
 *
 * Hypothesis: ~1 new LBC rental ad every ~25 sec across all monitored major cities.
 * It's a vibe metric, not a real-time feed — the goal is to convey time pressure.
 */
export function LiveCounter() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      setSeconds(Math.floor((performance.now() - start) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const listings = Math.max(0, Math.floor(seconds / 25));
  const sLabel = seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`;

  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border-2)] bg-[var(--color-panel)]/60 backdrop-blur px-3 py-1.5 text-xs text-[var(--color-text-muted)]"
      aria-live="polite"
    >
      <span className="relative flex size-1.5">
        <span className="absolute inset-0 rounded-full bg-[var(--color-signal)] animate-pulse-dot" />
        <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-signal)]" />
      </span>
      <span className="font-mono tabular text-[var(--color-text)]">{sLabel}</span>
      <span>que tu lis ce site —</span>
      <span className="font-mono tabular text-[var(--color-signal)]">{listings}</span>
      <span>annonce{listings > 1 ? "s" : ""} passée{listings > 1 ? "s" : ""} sur LBC.</span>
    </div>
  );
}
