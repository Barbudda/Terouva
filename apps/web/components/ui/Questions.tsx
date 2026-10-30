import { cn } from "@/lib/utils";

export type Question = { q: string; a: string };

/**
 * Questions fréquentes, affichées et balisées à partir de la **même** liste.
 *
 * Ce composant existe à cause d'un défaut trouvé en production : les guides
 * publiaient un balisage `FAQPage` sans afficher une seule des questions. Google
 * demande explicitement que le contenu balisé soit visible par la personne qui
 * arrive sur la page ; un balisage sans contrepartie visible n'apporte rien et
 * expose à une action manuelle. Passer par un composant unique rend l'écart
 * impossible à reproduire : la liste qui part dans le JSON-LD est celle qui
 * s'affiche.
 *
 * Forme : une liste séparée par des filets, pas une pile de cartes. Une carte
 * par question, arrondie et ombrée, répétée sept fois, c'est un motif de
 * gabarit, et sept chevrons magenta, ce n'est plus un accent, c'est une frise.
 * Le chevron est à l'encre ; seul celui de la question ouverte prend l'accent,
 * ce qui est son rôle : signaler l'état actif.
 *
 * Le `<details>` natif est délibéré : il est accessible, navigable au clavier,
 * et son contenu reste présent dans le HTML même replié, donc lisible par un
 * robot comme par la recherche du navigateur.
 */
export function Questions({
  questions,
  titre = "Questions fréquentes",
  className = "",
  ouvrirPremiere = false,
}: {
  questions: Question[];
  /** `null` quand la section porte déjà son titre au-dessus. */
  titre?: string | null;
  className?: string;
  ouvrirPremiere?: boolean;
}) {
  if (questions.length === 0) return null;

  const liste = (
    <div className="divide-y divide-rule border-y border-rule">
      {questions.map((item, i) => (
        <details key={item.q} className="group" open={ouvrirPremiere && i === 0}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-[17px] font-medium text-ink transition-colors hover:text-accent [-webkit-tap-highlight-color:transparent]">
            <span>{item.q}</span>
            <svg
              viewBox="0 0 16 16"
              aria-hidden
              className="mt-1.5 size-4 shrink-0 text-ink-3 transition-[transform,color] duration-200 group-open:rotate-180 group-open:text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3.5 6 4.5 4.5L12.5 6" />
            </svg>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );

  if (titre === null) return <div className={className}>{liste}</div>;

  return (
    <section className={cn(className)}>
      <h2 className="display text-2xl text-ink">{titre}</h2>
      <div className="mt-6">{liste}</div>
    </section>
  );
}
