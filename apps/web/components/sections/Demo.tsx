import { DEMO } from "@/lib/content";
import { Fleche } from "@/components/ui/LinkButton";

/**
 * L'unique encart rouge de la page.
 *
 * Le rouge sert partout ailleurs par touches : un sur-titre, un bouton, un
 * chiffre. Ici il prend tout le bloc, une seule fois, pour l'action qui compte
 * le plus avant le lancement : essayer l'outil sans rien installer. Un
 * deuxième aplat rouge dans la page lui ferait perdre ce poids.
 *
 * Contrastes vérifiés : blanc sur #C92D6A donne 5,16:1, au-dessus du minimum.
 */
export function Demo() {
  return (
    <section className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="monte mx-auto flex max-w-6xl flex-col items-start gap-8 overflow-hidden rounded-xl bg-accent px-6 py-12 sm:px-10 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.16em] text-white uppercase">
            {DEMO.eyebrow}
          </p>
          <h2 className="display mt-3 text-[2rem] text-white sm:text-4xl lg:text-[2.75rem]">
            {DEMO.titleLead} {DEMO.titleTail}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white">{DEMO.body}</p>
        </div>

        <a
          href={DEMO.cta.href}
          className="group inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-7 font-semibold text-accent-ink transition-colors hover:bg-accent-wash"
        >
          {DEMO.cta.label}
          <Fleche />
        </a>
      </div>
    </section>
  );
}
