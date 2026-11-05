import { cn } from "@/lib/utils";

export type Question = { q: string; a: string };

/**
 * Questions fréquentes, affichées et balisées à partir de la **même** liste.
 *
 * Ce composant existe à cause d'un défaut trouvé en production : les guides
 * publiaient un balisage `FAQPage` sans afficher une seule des questions. Google
 * demande que le contenu balisé soit visible ; passer par un composant unique
 * rend l'écart impossible à reproduire : la liste qui part dans le JSON-LD est
 * celle qui s'affiche.
 *
 * Forme : un index à filets. Question en Archivo 500, réponse dépliée en gris,
 * chevron à l'encre. Un chevron est un repère, pas un accent : il tourne quand
 * la question est ouverte, il ne change pas de couleur. Le `<details>` natif
 * est délibéré : accessible, navigable au clavier, et son contenu reste dans
 * le HTML même replié.
 *
 * Dans le monde nuit (l'accueil), chaque question porte son numéro d'index en
 * DM Mono orange, comme les autres index de la page. Là où le navigateur sait
 * animer vers `auto`, la réponse se déplie au lieu d'apparaître d'un coup
 * (`app/styles/arrivee.css`, classe `questions`).
 */
export function Questions({
  questions,
  titre = "Questions fréquentes",
  className = "",
  ouvrirPremiere = false,
  nuit = false,
}: {
  questions: Question[];
  /** `null` quand la section porte déjà son titre au-dessus. */
  titre?: string | null;
  className?: string;
  ouvrirPremiere?: boolean;
  nuit?: boolean;
}) {
  if (questions.length === 0) return null;

  const filet = nuit ? "divide-night-rule border-night-rule" : "divide-rule border-rule";

  const liste = (
    <div className={cn("questions divide-y border-y", filet)}>
      {questions.map((item, i) => (
        <details key={item.q} className="group" open={ouvrirPremiere && i === 0}>
          <summary
            className={cn(
              "flex cursor-pointer items-start justify-between gap-6 py-5 text-[17px] font-medium [-webkit-tap-highlight-color:transparent]",
              nuit ? "text-night-ink" : "text-ink",
            )}
          >
            <span className="flex items-start gap-4">
              {nuit && (
                <span aria-hidden className="questions-numero w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span>{item.q}</span>
            </span>
            <svg
              viewBox="0 0 16 16"
              aria-hidden
              className={cn(
                "mt-1.5 size-4 shrink-0 transition-transform duration-200 group-open:rotate-180",
                nuit ? "text-night-ink-2" : "text-ink-3",
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3.5 6 4.5 4.5L12.5 6" />
            </svg>
          </summary>
          <p
            className={cn(
              "max-w-2xl pb-6 text-[15px] leading-relaxed",
              nuit && "pl-10",
              nuit ? "text-night-ink-2" : "text-ink-2",
            )}
          >
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );

  if (titre === null) return <div className={className}>{liste}</div>;

  return (
    <section className={cn(className)}>
      <h2 className="titre titre--petit text-[1.75rem] text-ink">{titre}</h2>
      <div className="mt-6">{liste}</div>
    </section>
  );
}
