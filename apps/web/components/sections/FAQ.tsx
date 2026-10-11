import { FAQ_ITEMS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  return (
    <section id="questions" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-12">
        <SectionHeading lead="Questions" tail="fréquentes." className="monte md:col-span-4" />

        <div className="monte space-y-3 md:col-span-8">
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.q} className="group card-soft px-6" open={i === 0}>
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
      </div>
    </section>
  );
}
