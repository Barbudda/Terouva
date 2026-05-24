"use client";

import { TICKER_LISTINGS } from "@/lib/content";

/**
 * Horizontal infinite ticker — pure CSS animation for perf.
 * Rendered very low opacity behind the hero to create background motion.
 */
export function ListingTicker() {
  // Duplicate the list once so the loop is seamless.
  const list = [...TICKER_LISTINGS, ...TICKER_LISTINGS];
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[60%] -z-10 overflow-hidden opacity-[0.13]"
      aria-hidden
    >
      <div className="flex gap-3 animate-ticker w-max">
        {list.map((l, i) => (
          <TickerItem key={i} title={l.title} price={l.price} score={l.score} />
        ))}
      </div>
    </div>
  );
}

function TickerItem({
  title,
  price,
  score,
}: {
  title: string;
  price: number;
  score: number;
}) {
  const hot = score >= 80;
  return (
    <div className="flex items-center gap-3 whitespace-nowrap rounded-md border border-[var(--color-border)] bg-[var(--color-panel)]/70 px-4 py-2 text-xs">
      <span
        className={
          "font-mono tabular " +
          (hot ? "text-[var(--color-signal)]" : "text-[var(--color-urgent)]")
        }
      >
        {score}
      </span>
      <span className="text-[var(--color-text-muted)]">{title}</span>
      <span className="text-[var(--color-text-faint)]">·</span>
      <span className="font-mono tabular text-[var(--color-text)]">{price}€</span>
    </div>
  );
}
