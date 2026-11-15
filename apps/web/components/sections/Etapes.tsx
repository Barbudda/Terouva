import type { CSSProperties } from "react";
import { PARCOURS } from "@/lib/content";
import { TitreSection } from "@/components/ui/TitreSection";
import {
  PanneauAnnonce,
  PanneauEnvoi,
  PanneauMessage,
  PanneauNote,
} from "@/components/sections/HeroExemples";

/** L'interface montrée à chaque étape : les panneaux du haut de page, en grand. */
const ECRANS = [PanneauAnnonce, PanneauNote, PanneauMessage, PanneauEnvoi];

/**
 * La lumière de chaque scène : le bleu pour ce que Terouva trouve et trie,
 * l'orange pour ce que vous faites. Pas de mélange entre les deux : en oklch,
 * le chemin du bleu à l'orange passe par le violet.
 */
const TEINTES = [
  "var(--color-blue-clair)",
  "var(--color-blue-clair)",
  "var(--color-action)",
  "var(--color-action)",
];

/**
 * Le récit produit, vague 2 du pôle Design (15 novembre). Il remplace le rail
 * du parcours et la plaque des fonctions, qui disaient la même chose en deux
 * fois et en petit. À la manière de Rushlot : une grande carte claire par
 * étape, l'une sous l'autre ; à gauche un titre court et une phrase, à droite
 * la vraie interface, agrandie. Les panneaux sont ceux du haut de page et
 * partagent son exemple : si le visiteur a changé d'annonce avec les flèches,
 * les quatre étapes racontent la même.
 *
 * Le bouton « Être prévenu » revient une fois, à la fin du récit (règle 8 de
 * docs/design/REFERENCE.md).
 */
export function Etapes() {
  return (
    <section
      id="fonctions"
      aria-labelledby="etapes-titre"
      className="etapes monde-papier scroll-mt-20"
    >
      <div className="cadre">
      <TitreSection
        id="etapes-titre"
        etiquette="Ce que fait Terouva"
        titre="De l'alerte à votre réponse,"
        accent="sans y passer la soirée."
      />

      <ol className="etapes-liste">
        {PARCOURS.etapes.map((etape, i) => {
          const Ecran = ECRANS[i];
          return (
            <li key={etape.nom} className="etape" style={{ "--teinte": TEINTES[i] } as CSSProperties}>
              <div className="etape-texte">
                <h3 className="etape-titre">{etape.nom}</h3>
                {/* Une phrase par étape : la seconde de la dernière est coupée (journal v2-etapes). */}
                <p className="etape-phrase">{etape.texte.split(". ")[0].replace(/\.?$/, ".")}</p>
              </div>
              <div className="etape-scene">
                <div className="etape-ecran">
                  <Ecran />
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="etapes-fin">
        <a href="#inscription" className="bouton bouton--accent h-14 px-8 text-[17px]">
          Être prévenu
        </a>
      </p>
      </div>
    </section>
  );
}
