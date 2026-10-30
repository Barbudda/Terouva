import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Coquille F : le pied logotype.
 *
 * Le mot TEROUVA en Fraunces, réglé pour remplir la largeur, posé au bas de la
 * page et coupé par le bord inférieur d'environ un tiers de sa hauteur. C'est
 * le troisième chevauchement du site, et le seul endroit où la typographie
 * est traitée comme une matière. Au-dessus : les liens en quatre colonnes
 * avec leurs intitulés en `.champ`, puis une ligne pour l'éditeur et l'année.
 */
export function PiedLogotype({
  colonnes,
  ligne,
}: {
  colonnes: Array<{ titre: string; liens: Array<{ label: string; href: string }> }>;
  /** La ligne du bas : éditeur, mentions, année. */
  ligne: ReactNode;
}) {
  return (
    <footer className="plein-cadre overflow-hidden border-t border-rule-fort">
      <div className="cadre pt-demi-pas">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {colonnes.map((col) => (
            <nav key={col.titre} aria-label={col.titre}>
              <p className="champ text-ink-3">{col.titre}</p>
              <span aria-hidden className="mt-2 block h-px bg-rule" />
              <ul className="mt-3">
                {col.liens.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="inline-block py-1.5 text-[15px] leading-snug text-ink-2 transition-colors duration-150 hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="marge mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule pt-5">
          {ligne}
        </div>
      </div>

      {/* Le logotype : interligne réduit à la hauteur de capitale, puis
          remonté d'un tiers sous le bord. Le `overflow: hidden` du pied fait
          la coupe. */}
      <p
        aria-hidden
        className="cadre mt-6 -mb-[0.3em] font-serif text-[clamp(4rem,14vw,13rem)] leading-[0.78] tracking-[-0.04em] text-ink select-none [font-variation-settings:'SOFT'_0,'WONK'_1,'opsz'_144]"
      >
        TEROUVA
      </p>
    </footer>
  );
}
