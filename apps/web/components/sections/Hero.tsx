import Image from "next/image";
import { HERO } from "@/lib/content";
import { LinkButton } from "@/components/ui/LinkButton";

export function Hero() {
  return (
    <section className="pt-14 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="text-[15px] text-ink-2">{HERO.kicker}</p>
            <h1 className="mt-5 font-serif text-[2.9rem] font-medium leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[5.25rem]">
              {HERO.title}
            </h1>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-ink-2 sm:text-3xl lg:text-[2.35rem]">
              {HERO.titleSecond}
            </p>
          </div>

          <div className="md:col-span-5 md:self-end">
            <p className="text-lg leading-relaxed text-ink-2">{HERO.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <LinkButton href={HERO.ctaPrimary.href} size="lg">
                {HERO.ctaPrimary.label}
              </LinkButton>
              <a
                href={HERO.ctaSecondary.href}
                className="text-base text-ink underline decoration-field underline-offset-[6px] transition-colors hover:decoration-ink"
              >
                {HERO.ctaSecondary.label}
              </a>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink-3">{HERO.meta}</p>
          </div>
        </div>

        <figure className="mt-14 md:mt-20">
          <div className="overflow-hidden rounded-md border border-rule bg-card">
            <Image
              src="/apercu-annonces.png"
              alt="Aperçu de l'application Terouva : une liste d'annonces de location notées sur 100, la mieux notée étant signalée comme à contacter en priorité."
              width={1440}
              height={900}
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-3">{HERO.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
