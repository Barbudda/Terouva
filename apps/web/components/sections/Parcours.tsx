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
 * Le parcours, juste sous le haut de page, posé sur une scène (Hugo,
 * 4 novembre : les cartes flottaient sur le fond nuit, sans cadre).
 *
 * Un rail numéroté relie les quatre étapes et donne le sens de lecture : il
 * part du bleu de l'annonce publiée et finit sur l'orange de l'envoi, dont la
 * pastille est la seule pleine. Sur grand écran le rail est horizontal ; sur
 * téléphone il descend le long des étapes. Les flèches font défiler les six
 * annonces de la démonstration, et les quatre panneaux suivent la même.
 */
export function Parcours() {
  return (
    <section id="parcours" aria-labelledby="parcours-titre" className="cadre scroll-mt-20 py-demi-pas">
      <div className="scene px-5 py-10 sm:px-10 lg:px-12 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mention">{PARCOURS.mention}</p>
            <h2 id="parcours-titre" className="titre mt-3 max-w-[22ch] text-titre-2 text-ink">
              {PARCOURS.titre}
            </h2>
          </div>
          <Controles />
        </div>

        <ol className="mt-12 grid gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {PARCOURS.etapes.map((etape, i) => {
            const Panneau = PANNEAUX[i];
            const derniere = i === PARCOURS.etapes.length - 1;
            return (
              <li key={etape.nom} className="relative flex min-w-0 gap-5 lg:flex-col lg:gap-0">
                {/* Le tronçon de rail vers l'étape suivante. */}
                {!derniere && (
                  <>
                    <span
                      aria-hidden
                      className="absolute top-11 -bottom-10 left-5 w-px lg:hidden"
                      style={{ background: `linear-gradient(180deg, ${TEINTES[i]}, ${TEINTES[i + 1]})` }}
                    />
                    <span
                      aria-hidden
                      className="absolute top-5 left-12 -right-4 hidden h-px lg:block"
                      style={{ background: `linear-gradient(90deg, ${TEINTES[i]}, ${TEINTES[i + 1]})` }}
                    />
                  </>
                )}

                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-[13px] tabular-nums",
                    derniere
                      ? "border-action bg-action text-action-ink shadow-[0_0_0_6px_color-mix(in_oklch,var(--color-action)_18%,transparent)]"
                      : "bg-paper text-ink",
                  )}
                  style={derniere ? undefined : { borderColor: TEINTES[i] }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1 lg:mt-6">
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
      </div>
    </section>
  );
}
