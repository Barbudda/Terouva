import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Coquille A : le plein cadre.
 *
 * Un visuel qui touche les deux bords de l'écran, sans titre posé dessus au
 * centre. L'énoncé vit dans un panneau clair qui chevauche le bord bas-gauche
 * du visuel d'environ 80 px : c'est le premier des chevauchements du site, et
 * c'est lui qui empêche l'accueil de ressembler à un hero. Le panneau se
 * détache par le contraste du fond, pas par une ombre.
 *
 * Le visuel est fait de la matière du produit (une annonce, un écran), jamais
 * d'une photographie : Terouva n'en a pas et n'en achètera pas.
 */
export function PleinCadre({
  visuel,
  vignette,
  ligneDeBase,
  children,
  className,
}: {
  /** Le visuel plein cadre. Il reçoit toute la largeur et une hauteur minimale. */
  visuel: ReactNode;
  /** La vignette carrée à droite du panneau. */
  vignette?: ReactNode;
  /** Les chiffres clés, sur un filet fort, sous le visuel. */
  ligneDeBase?: ReactNode;
  /** Le contenu du panneau : mention, titre, texte, action. */
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative", className)}>
      <div className="plein-cadre relative min-h-[26rem] overflow-hidden bg-paper-2 sm:min-h-[32rem] lg:min-h-[min(40rem,calc(100vh-20rem))]">
        {visuel}
      </div>

      <div className="grille">
        {/* Le chevauchement : 80 px sur grand écran, 40 px sur petit, où un
            panneau trop haut cacherait le visuel au lieu de le mordre. */}
        <div className="relative z-10 col-span-12 -mt-10 flex flex-col gap-6 bg-paper pt-7 pr-6 pb-2 lg:col-span-10 lg:-mt-20 lg:flex-row lg:items-end lg:gap-10 lg:pt-10 lg:pr-12">
          <div className="min-w-0 flex-1">{children}</div>
          {vignette && <div className="shrink-0 self-start lg:self-end">{vignette}</div>}
        </div>
      </div>

      {ligneDeBase}
    </section>
  );
}
