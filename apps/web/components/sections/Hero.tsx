import Link from "next/link";
import { HERO } from "@/lib/content";
import { Assurances } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { SceneAnnonces } from "@/components/sections/SceneAnnonces";
import { Fleche } from "@/components/ui/LinkButton";

/**
 * Introduction en deux colonnes : le titre et l'inscription à gauche, le
 * produit en action à droite.
 *
 * Le hero centré que nous avions est la mise en page de toutes les pages de
 * produit. En deux colonnes, l'œil lit le titre puis tombe sur la
 * démonstration, qui prouve la promesse au lieu de l'illustrer. Le visuel de
 * droite n'est pas une photographie : c'est l'outil lui-même, en HTML.
 */
export function Hero() {
  return (
    <section className="px-4 pt-8 pb-16 sm:px-6 md:pt-14 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-rule bg-card px-3.5 py-1.5 text-[13px] font-bold tracking-[0.1em] text-accent-ink uppercase">
            <span aria-hidden className="size-1.5 animate-breathe rounded-full bg-accent" />
            {HERO.eyebrow}
          </p>

          <h1 className="display mt-6 text-[2.6rem] text-ink sm:text-[3.6rem] lg:text-[4.9rem]">
            {HERO.titleLead} <span className="text-accent">{HERO.titleTail}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{HERO.subtitle}</p>

          <div className="mt-8 max-w-xl">
            <WaitlistForm />
          </div>

          {/* Quelque chose à faire tout de suite : sans ça, un visiteur qui ne
              laisse pas son adresse repart sans rien, et ne revient jamais. */}
          <Link
            href="/outils/message-de-candidature"
            className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink transition-colors hover:text-accent"
          >
            Écrire votre message de candidature, gratuitement
            <Fleche />
          </Link>

          <div className="mt-8">
            <Assurances items={HERO.assurances} />
          </div>
        </div>

        <figure className="min-w-0 lg:-mr-4">
          <SceneAnnonces />
          <figcaption className="mt-3 text-sm text-ink-3">{HERO.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
