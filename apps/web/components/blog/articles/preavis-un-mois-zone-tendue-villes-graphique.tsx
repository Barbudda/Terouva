/**
 * Le graphique de l'étude « préavis d'un mois et zones tendues » : les 42
 * communes de 100 000 habitants ou plus, par population, et la durée du
 * préavis d'une location vide dessinée en longueur de trait.
 *
 * Spécification : docs/seo/blog/donnees/zones-tendues/GRAPHIQUE.md. Données :
 * resultats/grandes-villes.csv, sortie de etude.py (relevé du 2026-11-04). Les
 * lignes sont recopiées ici plutôt que lues au rendu : la page reste statique,
 * et un changement de liste au 1er janvier 2027 passera par une nouvelle
 * exécution de l'étude puis une mise à jour datée de l'article.
 *
 * Choix tenus :
 * - la longueur dit la durée, la couleur la redit, et le texte « 1 mois » ou
 *   « 3 mois » la dit une troisième fois : rien ne repose sur la seule couleur ;
 * - tout le texte est du HTML (une liste ordonnée), lisible par les moteurs et
 *   les assistants ; seuls les traits sont en SVG, cachés aux lecteurs d'écran ;
 * - monde papier : bleu `accent-ink` (5,22:1) pour un mois, encre `ink-2`
 *   (7,23:1) pour trois mois, pas d'orange (réservé au bouton d'action) ;
 * - les classes portent `!` parce que `.article ol` et `.article li + li`,
 *   hors couche dans globals.css, l'emporteraient sinon sur les utilitaires.
 */

type Ville = readonly [nom: string, departement: string, population: number, preavisMois: 1 | 3];

const VILLES: readonly Ville[] = [
  ["Paris", "75", 2103778, 1],
  ["Marseille", "13", 886040, 1],
  ["Lyon", "69", 519127, 1],
  ["Toulouse", "31", 514819, 1],
  ["Nice", "06", 357737, 1],
  ["Nantes", "44", 327734, 1],
  ["Montpellier", "34", 310240, 1],
  ["Strasbourg", "67", 293771, 1],
  ["Bordeaux", "33", 267991, 1],
  ["Lille", "59", 238246, 1],
  ["Rennes", "35", 230890, 1],
  ["Toulon", "83", 179116, 1],
  ["Reims", "51", 177674, 3],
  ["Saint-Étienne", "42", 173136, 3],
  ["Le Havre", "76", 166687, 3],
  ["Villeurbanne", "69", 163684, 1],
  ["Dijon", "21", 161830, 3],
  ["Angers", "49", 159022, 3],
  ["Grenoble", "38", 156140, 1],
  ["Saint-Denis (La Réunion)", "974", 155634, 1],
  ["Nîmes", "30", 151839, 1],
  ["Aix-en-Provence", "13", 149695, 1],
  ["Saint-Denis (Seine-Saint-Denis)", "93", 149077, 1],
  ["Clermont-Ferrand", "63", 146351, 3],
  ["Le Mans", "72", 146249, 3],
  ["Brest", "29", 142346, 3],
  ["Tours", "37", 139259, 3],
  ["Amiens", "80", 136449, 3],
  ["Annecy", "74", 132117, 1],
  ["Limoges", "87", 129937, 3],
  ["Metz", "57", 122572, 3],
  ["Perpignan", "66", 121616, 3],
  ["Boulogne-Billancourt", "92", 119019, 1],
  ["Besançon", "25", 118489, 3],
  ["Rouen", "76", 117662, 3],
  ["Orléans", "45", 116357, 1],
  ["Montreuil", "93", 111934, 1],
  ["Caen", "14", 109400, 1],
  ["Saint-Paul", "974", 108088, 1],
  ["Argenteuil", "95", 106130, 1],
  ["Mulhouse", "68", 104978, 3],
  ["Nancy", "54", 103671, 3],
];

const TROIS_MOIS = VILLES.filter((v) => v[3] === 3).length;
const habitants = new Intl.NumberFormat("fr-FR");

/** Le trait : un tiers de la piste pour un mois, la piste entière pour trois. */
function Trait({ mois }: { mois: 1 | 3 }) {
  return (
    <svg viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden className="block h-1.5 w-full">
      <rect
        x="0"
        y="0"
        width={mois === 1 ? 40 : 120}
        height="8"
        className={mois === 1 ? "fill-accent-ink" : "fill-ink-2"}
      />
    </svg>
  );
}

/** Colonnes d'une ligne : rang, ville, piste du trait, durée écrite. */
const LIGNE =
  "grid grid-cols-[1.75rem_minmax(0,1fr)_minmax(3.5rem,6rem)_3.75rem] items-center gap-x-3 sm:grid-cols-[2rem_minmax(0,1fr)_8rem_4rem]";

export function GraphiquePreavisGrandesVilles() {
  return (
    <figure aria-labelledby="graphique-preavis-titre" aria-describedby="graphique-preavis-resume">
      <p id="graphique-preavis-titre" className="font-serif text-[1.375rem] leading-snug text-ink">
        Dans {TROIS_MOIS} des {VILLES.length} plus grandes villes, le préavis d&apos;une location vide
        reste de trois mois
      </p>
      <p className="mt-2! text-[15px] leading-relaxed text-ink-3">
        Communes de 100 000 habitants ou plus, de la plus peuplée à la moins peuplée. Un mois en zone
        tendue, trois mois ailleurs, sauf autre motif prévu par la loi.
      </p>

      {/* La règle graduée, alignée sur la piste des traits. */}
      <div aria-hidden className={`${LIGNE} mt-6! pb-2 text-[12px] text-ink-3`}>
        <span />
        <span />
        <span className="flex justify-between tabular-nums">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </span>
        <span>mois</span>
      </div>

      <ol className="mt-0! list-none! border-b border-rule pl-0!">
        {VILLES.map(([nom, dep, pop, mois], i) => (
          <li
            key={`${nom}-${dep}`}
            className={`${LIGNE} mt-0! border-t border-rule py-2 text-[15px] leading-snug`}
          >
            <span className="tabular-nums text-ink-3">{i + 1}.</span>
            <span className="min-w-0 text-ink">
              {nom} <span className="text-ink-3">({dep})</span>
              <span className="sr-only">, {habitants.format(pop)} habitants : préavis de</span>
            </span>
            <Trait mois={mois} />
            <span className={`tabular-nums ${mois === 1 ? "text-accent-ink" : "text-ink"}`}>
              {mois} mois
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="mt-4! text-[14px] leading-relaxed text-ink-3">
        <span id="graphique-preavis-resume">
          Sur les {VILLES.length} communes de 100 000 habitants ou plus, {VILLES.length - TROIS_MOIS}{" "}
          sont en zone tendue, avec un préavis d&apos;un mois en location vide, et {TROIS_MOIS} restent à
          trois mois, dont Reims, Saint-Étienne, Le Havre, Dijon, Angers, Tours et Rouen.
        </span>{" "}
        Source : zonage du ministère de la Transition écologique après le décret n° 2025-1267 du
        22 décembre 2025 (Licence Ouverte) ; populations municipales de l&apos;Insee au 1er janvier
        2023. Calcul Terouva, relevé le 4 novembre 2026. Location vide seulement.
      </figcaption>
    </figure>
  );
}
