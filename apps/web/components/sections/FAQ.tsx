import { FAQ_ITEMS } from "@/lib/content";

export function FAQ() {
  return (
    <section id="questions" className="border-t border-rule py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-12">
        <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:col-span-4 md:text-[2.75rem]">
          Questions fréquentes
        </h2>

        <div className="border-b border-rule md:col-span-8">
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.q} className="group border-t border-rule" open={i === 0}>
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-lg font-medium text-ink transition-colors hover:text-accent-ink">
                <span>{item.q}</span>
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="mt-1.5 size-4 shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-45"
                >
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="max-w-2xl pb-6 text-base leading-relaxed text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
