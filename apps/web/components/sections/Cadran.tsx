"use client";

import { DECOMPOSITION } from "@/lib/exemples";
import { useEnVue } from "@/components/ui/useEnVue";

/** Rayon de l'anneau dans la boîte de 128 unités. Le trait fait 2 px. */
const RAYON = 58;
const PERIMETRE = 2 * Math.PI * RAYON;

/**
 * Le cadran : la note sur 100 dans un anneau dont l'arc se remplit une fois,
 * à l'entrée dans la bande nuit, puis la décomposition qui s'inscrit ligne
 * après ligne. Un cercle, parce que c'est la seule forme non rectangulaire
 * du site, et qu'une seule forme singulière suffit à ancrer une page.
 *
 * Le chiffre est à l'encre claire, pas en couleur : un score se dit par sa
 * valeur et sa jauge. Seul l'arc, et les barres, prennent l'accent nuit.
 */
export function Cadran() {
  const { ref, vu } = useEnVue<HTMLDivElement>({ une: true, marge: "0px 0px -10% 0px" });
  const { note, lignes, reste } = DECOMPOSITION;
  const max = Math.max(...lignes.map((l) => l.delta));

  return (
    <div
      ref={ref}
      data-joue={vu ? "oui" : "non"}
      className="instrument border border-night-rule bg-night-2 p-6 sm:p-8"
    >
      <div className="flex items-center gap-6 sm:gap-8">
        <div className="relative size-[7.5rem] shrink-0 sm:size-36">
          <svg viewBox="0 0 128 128" className="size-full -rotate-90" aria-hidden>
            <circle cx="64" cy="64" r={RAYON} fill="none" stroke="var(--color-night-rule)" strokeWidth="2" />
            <circle
              cx="64"
              cy="64"
              r={RAYON}
              fill="none"
              stroke="var(--color-night-accent)"
              strokeWidth="2"
              strokeLinecap="butt"
              className="cadran-arc"
              style={
                {
                  "--perimetre": PERIMETRE,
                  "--reste": PERIMETRE * (1 - note / 100),
                } as React.CSSProperties
              }
            />
          </svg>
          <p className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-nuit-chiffre leading-none tabular-nums">{note}</span>
            <span className="sr-only"> sur 100</span>
          </p>
        </div>

        <div className="min-w-0">
          <p className="champ text-night-ink-2">Score</p>
          <p className="mt-1 text-[15px] leading-snug font-medium">T2 lumineux avec balcon, Croix-Rousse</p>
          <p className="champ mt-2 text-night-ink-2">890 € · 42 m² · Lyon 4e</p>
        </div>
      </div>

      <dl className="mt-7 border-t border-night-rule">
        {lignes.map((l, i) => (
          <div
            key={l.critere}
            className="decomp-ligne grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-b border-night-rule py-3 sm:grid-cols-[11rem_1fr_3rem]"
            style={{ "--rang": i } as React.CSSProperties}
          >
            <dt className="champ text-night-ink-2">
              {l.critere}
              <span className="sr-only">, {l.detail}</span>
            </dt>
            <dd className="col-span-2 order-last h-px bg-night-rule sm:order-none sm:col-span-1">
              <span
                aria-hidden
                className="instrument-jauge block h-full bg-night-accent"
                style={{ width: `${(l.delta / max) * 100}%` }}
              />
            </dd>
            <dd className="font-mono text-[15px] tabular-nums sm:text-right">+{l.delta}</dd>
          </div>
        ))}
      </dl>
      <p className="marge mt-3 text-night-ink-2">{reste}</p>
    </div>
  );
}
