import { PROBLEM } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Problem() {
  return (
    <section id="pourquoi" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-12">
        <SectionHeading
          eyebrow={PROBLEM.eyebrow}
          lead={PROBLEM.titleLead}
          tail={PROBLEM.titleTail}
          className="md:col-span-5"
        />
        <div className="space-y-5 text-lg leading-relaxed text-ink-2 md:col-span-6 md:col-start-7">
          {PROBLEM.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
