import Image from "next/image";
import { HERO } from "@/lib/content";
import { Assurances } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function Hero() {
  return (
    <section className="px-4 pt-10 pb-14 sm:px-6 md:pt-16 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-wash px-4 py-1.5 text-[13px] font-bold tracking-[0.12em] text-accent-ink uppercase">
            <span aria-hidden className="size-1.5 animate-breathe rounded-full bg-accent" />
            {HERO.eyebrow}
          </p>

          <h1 className="display mt-6 text-[2.6rem] text-ink sm:text-6xl lg:text-[4.6rem]">
            {HERO.titleLead}{" "}
            <span className="block text-accent">{HERO.titleTail}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            {HERO.subtitle}
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <WaitlistForm />
          </div>

          <div className="mt-8 flex justify-center">
            <Assurances items={HERO.assurances} />
          </div>
        </div>

        <figure className="mt-14 md:mt-20">
          <div className="card-soft overflow-hidden rounded-xl p-2 sm:p-3">
            <Image
              src="/apercu-annonces.png"
              alt="Aperçu de Terouva : une liste d'annonces de location notées sur 100, la mieux notée étant signalée comme à contacter en priorité."
              width={1440}
              height={900}
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="h-auto w-full rounded-lg"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-ink-3">{HERO.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
