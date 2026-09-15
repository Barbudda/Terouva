import { STEPS } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="comment" className="border-t border-rule bg-paper-2 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-[2.75rem]">
            Comment ça marche
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Quelques minutes pour tout préparer. Ensuite, Terouva s'occupe de vous prévenir.
          </p>
        </div>

        <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t border-ink pt-5">
              <span className="font-serif text-5xl font-medium leading-none text-accent tabular">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold leading-snug text-ink">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
