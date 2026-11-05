import type { CSSProperties } from "react";
import { PARCOURS } from "@/lib/content";
import {
  Controles,
  PanneauAnnonce,
  PanneauEnvoi,
  PanneauMessage,
  PanneauNote,
} from "@/components/sections/HeroExemples";
import { cn } from "@/lib/utils";

const PANNEAUX = [PanneauAnnonce, PanneauNote, PanneauMessage, PanneauEnvoi];

/** Les couleurs du rail, étape par étape : du bleu de l'annonce à l'orange de l'envoi. */
const TEINTES = [
  "var(--color-blue)",
  "var(--color-blue-clair)",
  "color-mix(in oklch, var(--color-blue-clair) 45%, var(--color-action))",
  "var(--color-action)",
];

/**
 * Le parcours, juste sous le haut de page : une ligne de lumière.
 *
 * Pôle Design, 5 novembre : la section quitte sa scène bleu nuit, la même
 * matière que tout le bas de page. Le rail porte seul la lecture. Il se trace
 * du bleu de l'annonce à l'orange de l'envoi quand on arrive, allume les
 * pastilles une à une, puis file jusqu'au bord de l'écran après l'envoi : la
 * suite se passe chez vous. Une lueur d'horizon, très basse, l'éclaire par
 * derrière. Sur téléphone, le rail descend le long des étapes. Sur grand
 * écran, la lueur du rideau du haut de page déborde d'une centaine de pixels
 * dans la section : le haut est plus aéré pour que le titre n'y passe pas.
 * Les flèches font défiler les six annonces de la démonstration, et les
 * quatre panneaux suivent la même.
 */
export function Parcours() {
  return (
    <section
      id="parcours"
      aria-labelledby="parcours-titre"
      className="recit-parcours cadre scroll-mt-20 py-demi-pas lg:pt-[calc(var(--spacing-demi-pas)+4rem)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="parcours-titre" className="titre max-w-[22ch] text-titre-2 text-ink">
          {PARCOURS.titre}
        </h2>
        <Controles />
      </div>

      <ol className="recit-rail relative mt-12 grid gap-y-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-6">
        {/* Après l'envoi, la lumière continue jusqu'au bord de l'écran. */}
        <span aria-hidden className="recit-rail-fuite filet-trace hidden lg:block" style={{ "--decalage": 4 } as CSSProperties} />

        {PARCOURS.etapes.map((etape, i) => {
          const Panneau = PANNEAUX[i];
          const derniere = i === PARCOURS.etapes.length - 1;
          return (
            <li key={etape.nom} className="relative flex min-w-0 gap-5 lg:flex-col lg:gap-0">
              {/* Le tronçon de rail vers l'étape suivante : il se trace à son tour. */}
              {!derniere && (
                <>
                  <span
                    aria-hidden
                    className="recit-troncon recit-troncon--v filet-trace absolute top-11 -bottom-10 left-5 w-0.5 -translate-x-1/2 lg:hidden"
                    style={{ background: `linear-gradient(180deg, ${TEINTES[i]}, ${TEINTES[i + 1]})`, "--decalage": i, "--lueur": TEINTES[i] } as CSSProperties}
                  />
                  <span
                    aria-hidden
                    className="recit-troncon filet-trace absolute top-5 left-12 -right-4 hidden h-0.5 -translate-y-1/2 lg:block"
                    style={{ background: `linear-gradient(90deg, ${TEINTES[i]}, ${TEINTES[i + 1]})`, "--decalage": i, "--lueur": TEINTES[i] } as CSSProperties}
                  />
                </>
              )}

              <span
                aria-hidden
                className={cn(
                  "recit-pastille monte relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-[13px] tabular-nums",
                  derniere ? "recit-pastille--envoi border-action bg-action text-action-ink" : "bg-paper text-ink",
                )}
                style={{ "--decalage": i, "--lueur": TEINTES[i], borderColor: derniere ? undefined : TEINTES[i] } as CSSProperties}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1 lg:mt-7">
                <h3 className="text-[17px] leading-snug font-medium text-ink">{etape.nom}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{etape.texte}</p>
                <div
                  className={cn(
                    "carte-levee mt-5 rounded-[0.875rem] transition-transform duration-300 ease-[var(--ease-terouva)] hover:-translate-y-1",
                    derniere && "ring-1 ring-action/50",
                  )}
                >
                  <Panneau />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
