import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Les quatre gabarits de tuile, dans l'ordre où ils se répètent : une grande,
 * deux petites, une quatrième décalée vers le bas. Jamais trois tuiles de
 * taille égale en rang (signal n°17).
 */
const GABARITS: Array<{ largeur: string; hauteur: string; decalage?: string }> = [
  { largeur: "26rem", hauteur: "29rem" },
  { largeur: "20rem", hauteur: "24rem" },
  { largeur: "22rem", hauteur: "27rem", decalage: "2rem" },
  { largeur: "24rem", hauteur: "25rem" },
];

export function gabarit(i: number): CSSProperties {
  const g = GABARITS[i % GABARITS.length];
  return {
    "--largeur": g.largeur,
    "--hauteur": g.hauteur,
    "--decalage": g.decalage ?? "0",
  } as CSSProperties;
}

/**
 * Coquille E : la mosaïque dissymétrique.
 *
 * Des tuiles de tailles inégales. En version défilante, c'est le ruban : la
 * seule animation horizontale du site, et un geste propre au projet. Le
 * second jeu de tuiles n'existe que pour que la boucle soit continue ; sous
 * `prefers-reduced-motion`, il disparaît et le ruban se fait défiler au doigt.
 *
 * Chaque tuile reçoit son gabarit par variables CSS (`gabarit(i)`), ce qui
 * laisse la tuile décider de son contenu et la coquille de sa taille.
 */
export function Mosaique({
  tuiles,
  joue = true,
  ariaLabel,
  className,
  refExterne,
}: {
  tuiles: ReactNode[];
  /** Faux quand on ne regarde pas : le ruban se met en pause. */
  joue?: boolean;
  ariaLabel: string;
  className?: string;
  refExterne?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={refExterne}
      data-joue={joue ? "oui" : "non"}
      className={cn("ruban", className)}
      role="group"
      aria-label={ariaLabel}
    >
      <div className="ruban-piste">
        <ul className="ruban-jeu">{tuiles}</ul>
        <ul className="ruban-jeu ruban-double" aria-hidden>
          {tuiles}
        </ul>
      </div>
    </div>
  );
}
