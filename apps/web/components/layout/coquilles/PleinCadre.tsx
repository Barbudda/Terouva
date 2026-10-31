import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Coquille A : le plein cadre.
 *
 * Un champ de lumière qui touche les deux bords, et une composition centrée
 * posée dessus : la mention, le titre, le texte, l'action. De part et d'autre,
 * deux colonnes de chiffres. En bas, des panneaux produit qui mordent sur la
 * section suivante d'environ 80 px : c'est le premier chevauchement du site.
 *
 * Tout entre en scène à l'arrivée (`.entree`, décalages de 90 ms), et l'aurore
 * dérive lentement derrière (`.halo`). Décision d'Hugo du 30 octobre, d'après
 * la référence qu'il a envoyée : deux couleurs qui vont ensemble, une couleur
 * vive mélangée à tout ça, et du mouvement.
 */
export function PleinCadre({
  gauche,
  droite,
  panneaux,
  children,
  className,
}: {
  /** Les chiffres de gauche. */
  gauche?: ReactNode;
  /** Les chiffres de droite. */
  droite?: ReactNode;
  /** Les panneaux produit, en bas, qui chevauchent la section suivante. */
  panneaux?: ReactNode[];
  /** Le centre : mention, titre, texte, action. */
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("halo relative overflow-x-clip", className)}>
      {/* Les cordes se mesurent au bloc de contenu, pas aux panneaux : sur
          petit écran, ceux-ci s'empilent et les auraient cachées. */}
      <div className="relative">
        <Cordes />
        <div className="grille items-center pt-14 pb-10 sm:pt-20 lg:min-h-[min(40rem,calc(100vh-14rem))] lg:pt-16 lg:pb-14">
          {gauche && (
            <div
              className="entree order-2 col-span-6 mt-10 lg:order-1 lg:col-span-2 lg:mt-0"
              style={{ "--rang": 5 } as React.CSSProperties}
            >
              {gauche}
            </div>
          )}
          <div className="order-1 col-span-12 text-center lg:col-span-8 lg:col-start-3">
            {children}
          </div>
          {droite && (
            <div
              className="entree order-3 col-span-6 mt-10 text-right lg:col-span-2 lg:col-start-11 lg:mt-0"
              style={{ "--rang": 6 } as React.CSSProperties}
            >
              {droite}
            </div>
          )}
        </div>
      </div>

      {panneaux && panneaux.length > 0 && (
        <div className="grille relative z-10 -mb-12 lg:-mb-20">
          <div className="col-span-12 grid gap-4 lg:grid-cols-12 lg:gap-6">
            {panneaux.map((p, i) => (
              <div
                key={i}
                className={cn(
                  "entree min-w-0",
                  i === 0 && "lg:col-span-4",
                  i === 1 && "flotte lg:col-span-5",
                  i === 2 && "lg:col-span-3",
                )}
                style={{ "--rang": 7 + i } as React.CSSProperties}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Les cordes. Six traits épais tendus d'un bord à l'autre, qui suivent la
 * courbe d'un graphique : montée progressive, montée en pic, descente en pic,
 * descente progressive. Le pic passe derrière le titre. Chaque corde porte le
 * dégradé bleu, orange au sommet, bleu : la couleur vive au point haut.
 *
 * Demande d'Hugo du 31 octobre : « des lignes plus épaisses et visibles,
 * comme des cordes », à la place des rayons fins qui faisaient lignes de
 * cahier. Les cordes se tendent à l'arrivée (tracé du trait, 120 ms d'écart)
 * puis ondulent très lentement ; `vector-effect` garde l'épaisseur du trait
 * quelle que soit la largeur de l'écran, la forme s'étire avec le cadre.
 */
const CORDE =
  "M -20 605 C 240 598 420 570 520 480 C 610 410 680 300 720 160 C 760 300 830 410 920 480 C 1020 570 1200 598 1460 605";

/** Décalage vertical, épaisseur et opacité de chaque corde, du dessus au dessous. */
const CORDES = [
  { dy: 0, epaisseur: 3.5, opacite: 0.95 },
  { dy: 18, epaisseur: 3, opacite: 0.85 },
  { dy: 36, epaisseur: 2.5, opacite: 0.7 },
  { dy: 54, epaisseur: 2.5, opacite: 0.6 },
  { dy: 72, epaisseur: 2, opacite: 0.5 },
  { dy: 90, epaisseur: 2, opacite: 0.4 },
];

function Cordes() {
  return (
    <svg
      className="cordes"
      viewBox="0 0 1440 720"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient
          id="corde-degrade"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1440"
          y2="0"
        >
          <stop offset="0" stopColor="var(--color-blue)" />
          <stop offset="0.36" stopColor="var(--color-blue-clair)" />
          <stop offset="0.5" stopColor="var(--color-action)" />
          <stop offset="0.64" stopColor="var(--color-blue-clair)" />
          <stop offset="1" stopColor="var(--color-blue)" />
        </linearGradient>
      </defs>
      <g className="cordes-groupe">
        {/* La lueur de la première corde : le même trait, large et presque transparent. */}
        <path
          d={CORDE}
          className="corde corde--lueur"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
        {CORDES.map((c, i) => (
          <path
            key={c.dy}
            d={CORDE}
            className="corde"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            transform={`translate(0 ${c.dy})`}
            style={
              {
                "--rang": i,
                strokeWidth: c.epaisseur,
                opacity: c.opacite,
              } as React.CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}
