import { HERO } from "@/lib/content";
import { PleinCadre } from "@/components/layout/coquilles/PleinCadre";

/**
 * L'accueil, sur la référence d'Hugo (31 octobre) : le titre en deux lignes
 * au sommet, finissant en italique ; dessous, la proposition de valeur et le
 * bouton rond, qui mène à la liste d'attente (Hugo, 4 novembre : la
 * démonstration ne doit plus être mise en avant).
 *
 * Le 4 novembre, Hugo veut un haut de page encore plus clair : deux phrases,
 * ce que fait Terouva puis ce que vous y gagnez, dans le corps de lecture et
 * non plus en monospace. Les quatre panneaux du parcours descendent dans la
 * section suivante (`Parcours`).
 */
export function Hero() {
  const [quoi, gain] = HERO.description;
  return (
    <PleinCadre
      entete={
        <>
          <p
            className="entree champ text-ink"
            style={{ "--rang": 0 } as React.CSSProperties}
          >
            {HERO.eyebrow}
          </p>
          <h1
            className="entree titre mx-auto mt-6 max-w-[14ch] text-[clamp(2.6rem,1.2rem+4.4vw,4.75rem)] text-ink lg:max-w-none"
            style={{ "--rang": 1 } as React.CSSProperties}
          >
            {HERO.titleLead} <br className="hidden lg:inline" />
            <em className="font-normal italic">{HERO.titleTail}</em>
          </h1>
        </>
      }
    >
      {/* La phrase dans une vitre légère (Hugo, 4 novembre) : assez teintée et
          floutée pour se lire sur la lueur claire du champ, assez claire pour
          laisser voir le dégradé derrière. */}
      <p
        className="entree mx-auto max-w-[44rem] rounded-[1.5rem] border border-white/20 bg-night/25 px-6 py-5 text-[1.25rem] leading-relaxed text-balance text-ink shadow-[0_24px_60px_-30px_rgb(0_0_0/0.5)] backdrop-blur-[3px] [text-shadow:0_1px_10px_rgb(8_17_32/0.55)] sm:px-8 sm:py-6 sm:text-[1.5rem]"
        style={{ "--rang": 2 } as React.CSSProperties}
      >
        {quoi} {gain}
      </p>
      <div
        className="entree mt-10 flex justify-center"
        style={{ "--rang": 3 } as React.CSSProperties}
      >
        <a href="#inscription" className="bouton-rond">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="size-5"
          >
            <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z" />
            <path d="M10 20.5a2 2 0 0 0 4 0" />
          </svg>
          <span className="mt-1.5 text-[13px] font-medium">Être prévenu</span>
        </a>
      </div>
    </PleinCadre>
  );
}
