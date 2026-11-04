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

/**
 * Le parcours, juste sous le haut de page : les quatre étapes numérotées
 * comme celles de Rushlot (« 01 / Import… »), chacune avec sa phrase et son
 * panneau. Les flèches font défiler les six annonces de la démonstration, et
 * les quatre panneaux suivent la même annonce, de sa publication à l'envoi.
 */
export function Parcours() {
  return (
    <section id="parcours" aria-labelledby="parcours-titre" className="cadre scroll-mt-20 py-pas">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mention">{PARCOURS.mention}</p>
          <h2 id="parcours-titre" className="titre mt-3 max-w-[22ch] text-titre-2 text-ink">
            {PARCOURS.titre}
          </h2>
        </div>
        <Controles />
      </div>

      <ol className="mt-12 grid items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {PARCOURS.etapes.map((etape, i) => {
          const Panneau = PANNEAUX[i];
          return (
            <li key={etape.nom} className={cn("flex min-w-0 flex-col", i === 1 && "lg:mt-8", i === 3 && "lg:mt-8")}>
              <div className="border-t border-rule-fort pt-5">
                <p className="champ text-accent">
                  {String(i + 1).padStart(2, "0")} <span className="text-ink-3">/</span>{" "}
                  <span className="text-ink">{etape.nom}</span>
                </p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{etape.texte}</p>
              </div>
              <div className="mt-6">
                <Panneau />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
