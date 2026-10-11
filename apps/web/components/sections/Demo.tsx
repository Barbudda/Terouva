import { DEMO } from "@/lib/content";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Invitation à essayer la démonstration, qui tourne déjà dans le navigateur. */
export function Demo() {
  return (
    <section className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 rounded-xl border border-accent/25 bg-accent-wash/45 px-5 py-12 sm:px-10 md:flex-row md:items-center md:justify-between md:py-14">
        <SectionHeading
          eyebrow={DEMO.eyebrow}
          lead={DEMO.titleLead}
          tail={DEMO.titleTail}
          className="max-w-2xl"
        >
          {DEMO.body}
        </SectionHeading>
        <LinkButton href={DEMO.cta.href} size="lg" className="shrink-0">
          {DEMO.cta.label}
        </LinkButton>
      </div>
    </section>
  );
}
