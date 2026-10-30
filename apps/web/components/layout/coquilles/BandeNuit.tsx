import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Coquille D : la bande nuit.
 *
 * Pleine largeur, fond encre. C'est le monde de l'instrument : grotesque et
 * monospace, petites tailles, densité, filets visibles. La serif n'y entre
 * pas. Un élément dépasse de la bande vers le haut, d'environ 40 px, et
 * recouvre le papier : c'est ce geste qui empêche la bande de ressembler à un
 * bloc posé.
 *
 * `.nuit` porte aussi les règles de focus et d'impression propres au monde
 * sombre (voir `globals.css`).
 */
export function BandeNuit({
  id,
  depassement,
  children,
  className,
}: {
  id?: string;
  /** L'élément qui mord sur la section précédente. Rendu en tête de bande. */
  depassement?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "nuit plein-cadre bg-night text-night-ink",
        depassement ? "pb-pas-nuit" : "py-pas-nuit",
        className,
      )}
    >
      {depassement && (
        // Le dépassement : 40 px sur grand écran, 16 px sur petit, en dessous
        // il se lit comme un défaut d'alignement.
        <div className="relative z-10 -mt-4 lg:-mt-10">{depassement}</div>
      )}
      {children}
    </section>
  );
}
