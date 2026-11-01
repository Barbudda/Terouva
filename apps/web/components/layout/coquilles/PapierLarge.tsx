import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Coquille B : le papier large.
 *
 * Un paragraphe-énoncé, calé en colonne 2 ou 3, précédé d'une mention en
 * Fraunces italique, et une seconde voix à droite, plus petite, qui dit autre
 * chose : une réserve, une fiche, un chiffre.
 *
 * La coquille voulait paraître vide, pour faire valoir le plein cadre d'avant.
 * Le 1er novembre, Hugo trouve ces sections vides tout court : la seconde voix
 * passe dans un cadre (`.encadre`), et un cadre illustré occupe la place qui
 * restait libre. Deux dispositions :
 *
 * - `dessous` : la seconde voix en face de l'énoncé, l'illustration sur toute
 *   la largeur en dessous. Pour une illustration qui a besoin de place.
 * - `colonne` : l'illustration sous l'énoncé, la seconde voix sur la hauteur
 *   des deux. Pour une seconde voix longue.
 *
 * Sous le grand écran, tout s'empile : énoncé, seconde voix, illustration.
 * Les cadres apparaissent en descendant seulement (`Revelateur`).
 */
export function PapierLarge({
  id,
  mention,
  secondeVoix,
  illustration,
  disposition = "dessous",
  depart = 2,
  children,
  className,
}: {
  id?: string;
  mention: string;
  /** La seconde voix, colonnes 9 à 12, dans un cadre. */
  secondeVoix?: ReactNode;
  /** Le cadre illustré, sous l'énoncé. */
  illustration?: ReactNode;
  disposition?: "dessous" | "colonne";
  /** Colonne de départ de l'énoncé : 2 ou 3, jamais 1 (c'est la colonne des index). */
  depart?: 2 | 3;
  /** L'énoncé, en `.enonce`. */
  children: ReactNode;
  className?: string;
}) {
  const colonne = disposition === "colonne";
  // Les classes restent écrites en entier : Tailwind ne lit pas une classe composée.
  const colonnesEnonce =
    depart === 2 ? "lg:col-start-2 lg:col-span-7" : "lg:col-start-3 lg:col-span-6";
  const colonnesLarges =
    depart === 2 ? "lg:col-start-2 lg:col-span-11" : "lg:col-start-3 lg:col-span-10";

  return (
    <section id={id} className={cn("grille gap-y-10 py-pas lg:gap-y-14", className)}>
      <div className={cn("monte col-span-12 lg:row-start-1", colonnesEnonce)}>
        <p className="mention">{mention}</p>
        <div className="enonce mt-5 text-ink">{children}</div>
      </div>

      {secondeVoix && (
        <aside
          className={cn(
            "encadre col-span-12 p-6 text-[15px] leading-relaxed text-ink-2 sm:p-7 lg:col-span-4 lg:col-start-9 lg:row-start-1",
            colonne ? "lg:row-span-2 lg:self-start" : "lg:self-center",
          )}
        >
          {secondeVoix}
        </aside>
      )}

      {illustration && (
        <div
          className={cn(
            "col-span-12 lg:row-start-2",
            colonne ? colonnesEnonce : colonnesLarges,
          )}
        >
          {illustration}
        </div>
      )}
    </section>
  );
}
