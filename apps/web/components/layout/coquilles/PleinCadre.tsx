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
      {/* Les bâtons se mesurent au bloc de contenu, pas aux panneaux : sur
          petit écran, ceux-ci s'empilent et les auraient cachés. */}
      <div className="relative">
        <Batons />
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
 * Les bâtons. Un graphique en bâtons, soixante traits verticaux épais qui
 * poussent depuis le bas du cadre ; leurs sommets dessinent la courbe :
 * montée progressive, montée en pic, descente en pic, descente progressive.
 * Bleus à la base, orange au sommet des plus hauts : la couleur vive au point
 * haut. Un fondu vers le haut (`mask-image`) les efface là où le texte passe,
 * pour qu'ils ne le cachent jamais.
 *
 * Demande d'Hugo du 31 octobre : « des traits verticaux, graphique en
 * bâtons », épais et visibles, « attention à ce que ça ne cache pas le
 * texte ». Les bâtons poussent à l'arrivée depuis le centre vers les bords,
 * puis l'ensemble ondule lentement ; `vector-effect` garde l'épaisseur du
 * trait quelle que soit la largeur de l'écran.
 */
const NOMBRE_BATONS = 60;
const LARGEUR = 1440;
const HAUTEUR = 720;

/** La hauteur d'un bâton selon sa position (u de -1 à 1) : queues douces, pic serré. */
function hauteurBaton(u: number) {
  return 110 + 410 * Math.exp(-Math.abs(u) / 0.3);
}

const BATONS = Array.from({ length: NOMBRE_BATONS }, (_, i) => {
  const x = ((i + 0.5) * LARGEUR) / NOMBRE_BATONS;
  const u = (x - LARGEUR / 2) / (LARGEUR / 2);
  return {
    x,
    sommet: HAUTEUR - hauteurBaton(u),
    rang: Math.abs(i - (NOMBRE_BATONS - 1) / 2),
  };
});

function Batons() {
  return (
    <svg
      className="batons"
      viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient
          id="baton-degrade"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={HAUTEUR}
          x2="0"
          y2="180"
        >
          <stop offset="0" stopColor="var(--color-blue)" />
          <stop offset="0.5" stopColor="var(--color-blue-clair)" />
          <stop offset="0.82" stopColor="var(--color-action)" />
          <stop offset="1" stopColor="var(--color-action)" />
        </linearGradient>
      </defs>
      <g className="batons-groupe">
        {BATONS.map((b) => (
          <line
            key={b.x}
            className="baton"
            x1={b.x}
            x2={b.x}
            y1={HAUTEUR}
            y2={b.sommet}
            vectorEffect="non-scaling-stroke"
            style={{ "--rang": b.rang } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
