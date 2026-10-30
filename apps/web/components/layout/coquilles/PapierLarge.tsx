import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Coquille B : le papier large.
 *
 * Un paragraphe-énoncé seul, calé en colonne 2 ou 3, précédé d'une mention en
 * Fraunces italique. Puis, plus bas et à droite, une seconde voix, plus
 * petite et plus grise, qui dit autre chose : une réserve, une source, un
 * chiffre. Ce décalage à deux vitesses donne le ton éditorial, et il ne coûte
 * rien. La section doit paraître vide : c'est ce vide qui donne sa valeur au
 * plein cadre d'avant et à la bande sombre d'après.
 */
export function PapierLarge({
  id,
  mention,
  secondeVoix,
  depart = 2,
  children,
  className,
}: {
  id?: string;
  mention: string;
  /** La seconde voix, colonnes 8 à 12. */
  secondeVoix?: ReactNode;
  /** Colonne de départ de l'énoncé : 2 ou 3, jamais 1 (c'est la colonne des index). */
  depart?: 2 | 3;
  /** L'énoncé, en `.enonce`. */
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("grille py-pas", className)}>
      <div
        className={cn(
          "monte col-span-12 md:col-span-7",
          depart === 2 ? "md:col-start-2" : "md:col-start-3",
        )}
      >
        <p className="mention">{mention}</p>
        <div className="enonce mt-5 text-ink">{children}</div>
      </div>

      {secondeVoix && (
        <aside className="monte col-span-12 mt-10 md:col-span-4 md:col-start-9 md:mt-demi-pas">
          <span aria-hidden className="filet-trace mb-4 block h-px w-12 bg-rule-fort" />
          <div className="marge">{secondeVoix}</div>
        </aside>
      )}
    </section>
  );
}
