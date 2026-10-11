import Link from "next/link";
import { PRIVACY } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Privacy() {
  return (
    <section id="donnees" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
        <div className="monte md:col-span-5">
          <SectionHeading eyebrow={PRIVACY.eyebrow} lead={PRIVACY.titleLead} tail={PRIVACY.titleTail}>
            {PRIVACY.body}
          </SectionHeading>
          <Link
            href="/confidentialite"
            className="mt-6 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-[6px] hover:decoration-accent"
          >
            Lire la politique de confidentialité
          </Link>
        </div>

        <dl className="monte card-soft divide-y divide-rule px-6 md:col-span-6 md:col-start-7">
          {PRIVACY.points.map((p) => (
            <div key={p.label} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="text-[15px] text-ink-3">{p.label}</dt>
              <dd className="font-medium text-ink">{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
