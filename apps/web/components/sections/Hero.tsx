import { HERO } from "@/lib/content";
import { Assurances } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { SceneAnnonces } from "@/components/sections/SceneAnnonces";
import { LinkButton } from "@/components/ui/LinkButton";

/**
 * Introduction en deux colonnes : le titre et les deux actions à gauche, le
 * produit en action à droite.
 *
 * Le hero centré que nous avions est la mise en page de toutes les pages de
 * produit. En deux colonnes, l'œil lit le titre puis tombe sur la
 * démonstration, qui prouve la promesse au lieu de l'illustrer. Le visuel de
 * droite n'est pas une photographie : c'est l'outil lui-même, en HTML.
 *
 * Deux actions, et leur rang a changé. Tant que l'application n'est pas
 * téléchargeable, la seule promesse que le site peut tenir tout de suite est
 * l'outil gratuit ; il était traité en note de bas de page, sous le
 * formulaire, en lien maigre. Il passe en premier, en vrai bouton. Le
 * formulaire garde le seul bouton magenta de l'écran, parce que c'est lui
 * l'engagement qu'on demande.
 */
export function Hero() {
  return (
    <section className="px-4 pt-8 pb-16 sm:px-6 md:pt-14 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div className="min-w-0">
          <p className="flex items-center gap-3 text-ink-3">
            <span aria-hidden className="h-px w-8 bg-rule" />
            <span className="eyebrow">{HERO.eyebrow}</span>
          </p>

          <h1 className="display mt-6 text-[2.6rem] text-ink sm:text-[3.6rem] lg:text-[4.9rem]">
            {HERO.titleLead} {HERO.titleTail}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{HERO.subtitle}</p>

          <div className="mt-8 flex flex-col items-start gap-2">
            <LinkButton href="/outils/message-de-candidature" variant="dark" size="lg">
              Écrire votre message de candidature
            </LinkButton>
            <p className="text-sm text-ink-3">Gratuit, sans compte, à utiliser tout de suite.</p>
          </div>

          <div className="mt-8 max-w-xl">
            <WaitlistForm />
          </div>

          <div className="mt-6 max-w-xl">
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
