import { STEPS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section id="comment" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl rounded-xl bg-paper-2 px-5 py-12 sm:px-10 md:py-16">
        <SectionHeading eyebrow="Comment ça marche" lead="Trois étapes," tail="et c'est tout.">
          Quelques minutes pour tout préparer. Ensuite, Terouva travaille pendant que vous faites
          autre chose.
        </SectionHeading>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="card-soft p-6">
              <span className="display grid size-11 place-items-center rounded-full bg-accent-wash text-xl text-accent-ink tabular">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{step.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
