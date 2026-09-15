import { CTA_FINAL } from "@/lib/content";
import { LinkButton } from "@/components/ui/LinkButton";

export function CTA() {
  return (
    <section className="border-t border-rule py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-6xl">
          {CTA_FINAL.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{CTA_FINAL.subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <LinkButton href={CTA_FINAL.primary.href} size="lg">
            {CTA_FINAL.primary.label}
          </LinkButton>
          <a
            href={CTA_FINAL.secondary.href}
            className="text-base text-ink-2 underline decoration-field underline-offset-[6px] hover:text-ink hover:decoration-ink"
          >
            {CTA_FINAL.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
