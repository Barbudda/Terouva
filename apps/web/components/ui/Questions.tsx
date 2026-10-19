export type Question = { q: string; a: string };

/**
 * Questions fréquentes, affichées et balisées à partir de la **même** liste.
 *
 * Ce composant existe à cause d'un défaut trouvé en production : les guides
 * publiaient un balisage `FAQPage` sans afficher une seule des questions. Google
 * demande explicitement que le contenu balisé soit visible par la personne qui
 * arrive sur la page ; un balisage sans contrepartie visible n'apporte rien et
 * expose à une action manuelle. Les pages d'outils, elles, affichaient bien
 * leur FAQ, avec un bloc recopié.
 *
 * Passer par un composant unique rend l'écart impossible à reproduire : la
 * liste qui part dans le JSON-LD est celle qui s'affiche.
 *
 * Le `<details>` natif est délibéré : il est accessible, navigable au clavier,
 * et son contenu reste présent dans le HTML même replié, donc lisible par un
 * robot comme par la recherche du navigateur.
 */
export function Questions({
  questions,
  titre = "Questions fréquentes",
  className = "",
}: {
  questions: Question[];
  titre?: string;
  className?: string;
}) {
  if (questions.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="display text-2xl text-ink">{titre}</h2>
      <div className="mt-6 space-y-3">
        {questions.map((item) => (
          <details key={item.q} className="group card-soft px-6">
            <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-[17px] font-bold text-ink transition-colors hover:text-accent">
              <span>{item.q}</span>
              <svg
                viewBox="0 0 16 16"
                aria-hidden
                className="mt-1.5 size-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3.5 6 4.5 4.5L12.5 6" />
              </svg>
            </summary>
            <p className="max-w-2xl pb-5 leading-relaxed text-ink-2">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
