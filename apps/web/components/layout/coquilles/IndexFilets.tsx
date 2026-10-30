import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LigneIndex = {
  /** Le numéro dans la marge. Absent : la ligne n'en porte pas. */
  numero?: string;
  titre: string;
  description?: ReactNode;
  /** La mention alignée à droite : un état, un type, une durée. */
  mention?: ReactNode;
  href?: string;
  id?: string;
};

/**
 * Coquille C : l'index à filets.
 *
 * Partout où il y a une liste, ce sont des lignes séparées par des filets,
 * avec un numéro à gauche et une mention alignée à droite. Plus jamais trois
 * cartes arrondies en rang. Chaque ligne : numéro en Fraunces (colonne 1),
 * titre en Archivo 500 (colonnes 2 à 5), description en note de marge
 * (colonnes 6 à 9), mention (colonne 12), et un filet de 1 px dessous qui se
 * trace au défilement. Au survol, le fond passe au papier teinté et la
 * mention glisse de 4 px. Rien d'autre ne bouge.
 */
export function IndexFilets({
  lignes,
  entete,
  nuit = false,
  ariaLabel,
  className,
}: {
  lignes: LigneIndex[];
  /** Ce qui précède la liste : un titre, une mention. Il s'aligne sur la même grille. */
  entete?: ReactNode;
  nuit?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  const filet = nuit ? "bg-night-rule" : "bg-rule";
  const titre = nuit ? "text-night-ink" : "text-ink";
  const texte = nuit ? "text-night-ink-2" : "text-ink-3";

  return (
    <div className={cn("cadre", className)}>
      {entete}
      <ol aria-label={ariaLabel} className="relative">
        {/* Le filet du haut, que la première ligne n'a pas à porter. */}
        <span aria-hidden className={cn("filet-trace block h-px", filet)} />
        {lignes.map((l, i) => {
          const contenu = (
            <>
              <span className="numero col-span-2 text-[1.375rem] sm:col-span-1 sm:text-[1.625rem]">
                {l.numero}
              </span>
              <span className={cn("col-span-10 text-titre-3 leading-tight font-medium sm:col-span-4", titre)}>
                {l.titre}
              </span>
              {l.description && (
                <span className={cn("marge col-span-10 col-start-3 sm:col-span-4 sm:col-start-6", texte)}>
                  {l.description}
                </span>
              )}
              {l.mention && (
                <span
                  className={cn(
                    "index-mention champ col-span-10 col-start-3 mt-1 sm:col-span-2 sm:col-start-11 sm:mt-1 sm:text-right",
                    texte,
                  )}
                >
                  {l.mention}
                </span>
              )}
            </>
          );
          const grille =
            "index-ligne grid grid-cols-12 items-baseline gap-x-4 py-5 sm:gap-x-6 sm:py-6 lg:-mx-4 lg:px-4";

          return (
            <li key={l.id ?? l.titre} id={l.id} className="relative">
              {l.href ? (
                <Link href={l.href} className={cn(grille, "block")}>
                  {contenu}
                </Link>
              ) : (
                <div className={grille}>{contenu}</div>
              )}
              <span
                aria-hidden
                className={cn("filet-trace absolute inset-x-0 bottom-0 h-px", filet)}
                style={{ animationDelay: `${(i % 5) * 60}ms` }}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
