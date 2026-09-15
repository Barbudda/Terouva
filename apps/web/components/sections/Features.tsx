import { FEATURES } from "@/lib/content";

export function Features() {
  return (
    <section id="fonctions" className="border-t border-rule py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:sticky md:top-28 md:text-[2.75rem]">
            Ce que fait Terouva
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Peu de choses, mais celles qui font gagner du temps pendant une recherche.
          </p>
        </div>

        <dl className="grid gap-x-10 sm:grid-cols-2 md:col-span-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="border-t border-rule pt-5 pb-9">
              <dt className="font-serif text-[1.45rem] font-medium leading-snug text-ink">
                {f.title}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-ink-2">{f.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
