"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Le sommaire d'un guide, collé en colonne de gauche sur grand écran, avec la
 * section courante marquée. C'est un repère de lecture, pas un menu : Archivo
 * en note de marge, et l'accent sur la seule entrée active, qui est l'un des
 * quatre emplois autorisés de la couleur.
 */
export function Sommaire({ entrees }: { entrees: Array<{ id: string; titre: string }> }) {
  const [actif, setActif] = useState<string | null>(null);

  useEffect(() => {
    const cibles = entrees
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (cibles.length === 0 || typeof IntersectionObserver === "undefined") return;

    // La section courante est la dernière dont le titre est passé sous le
    // tiers haut de l'écran : c'est celle qu'on est en train de lire.
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActif(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    cibles.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [entrees]);

  return (
    <nav aria-label="Sommaire">
      <p className="champ text-ink-3">Sur cette page</p>
      {/* Numérotées comme les sections de la prose : 01, 02… */}
      <ol className="mt-3 text-[14px] leading-snug">
        {entrees.map((e, i) => (
          <li key={e.id} className="border-b border-rule last:border-b-0">
            <a
              href={`#${e.id}`}
              aria-current={actif === e.id ? "location" : undefined}
              className={cn(
                "flex gap-3 py-2.5 transition-colors duration-150",
                actif === e.id ? "font-medium text-accent-ink" : "text-ink-3 hover:text-ink",
              )}
            >
              <span className="champ shrink-0 pt-px text-[11px]">{String(i + 1).padStart(2, "0")}</span>
              {e.titre}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
