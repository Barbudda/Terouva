import { STEPS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Trois étapes, lues de gauche à droite sur une bande teintée.
 *
 * La section tenait dans une boîte arrondie posée au milieu de la page : un
 * cadre, là où le `DESIGN.md` dit que le fond teinté sert « à séparer une
 * section sans la cadrer ». La teinte occupe maintenant toute la largeur, et
 * le contenu s'aligne sur la grille du reste de la page. Le titre est
 * au-dessus, seul, puis les trois étapes en rang : une progression se lit à
 * l'horizontale, ce que deux colonnes titre-contenu ne savent pas dire.
 */
export function HowItWorks() {
  return (
    <section id="comment" className="bg-paper-2 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Comment ça marche"
          lead="Trois étapes,"
          tail="et c'est tout."
          className="monte max-w-2xl"
        >
          Quelques minutes pour tout préparer. Ensuite, Terouva travaille pendant que vous faites
          autre chose.
        </SectionHeading>

        <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            // Le numéro était un chiffre dans une pastille rose. Il est posé en
            // serif sur un filet, comme un numéro de paragraphe dans une notice,
            // et le filet qui court sur les trois colonnes fait la ligne de
            // temps.
            <li key={step.title} className="monte border-t border-rule pt-5">
              <span className="pastille block tabular">{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{step.title}</h3>
              <p className="mt-2.5 max-w-sm leading-relaxed text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
