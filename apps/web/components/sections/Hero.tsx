import Link from "next/link";
import { HERO } from "@/lib/content";
import { PleinCadre } from "@/components/layout/coquilles/PleinCadre";

/**
 * L'accueil, sur la référence d'Hugo (31 octobre) : le titre en deux lignes
 * au sommet, finissant en italique ; dessous, la proposition de valeur et le
 * bouton rond.
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
      {/* La phrase dans une vitre sombre et floutée (Hugo, 4 novembre) : sur la
          lueur claire du champ, même avec une ombre, elle se lisait mal. */}
      <p
        className="entree mx-auto max-w-[44rem] rounded-[1.5rem] border border-white/15 bg-night/55 px-6 py-5 text-[1.25rem] leading-relaxed text-balance text-ink shadow-[0_24px_60px_-30px_rgb(0_0_0/0.7)] backdrop-blur-md sm:px-8 sm:py-6 sm:text-[1.5rem]"
        style={{ "--rang": 2 } as React.CSSProperties}
      >
        {quoi} {gain}
      </p>
      <div
        className="entree mt-10 flex justify-center"
        style={{ "--rang": 3 } as React.CSSProperties}
      >
        <Link href="/app?demo=1" className="bouton-rond">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className="size-5"
          >
            <path d="M8 5.5v13a.75.75 0 0 0 1.14.64l10.4-6.5a.75.75 0 0 0 0-1.28L9.14 4.86A.75.75 0 0 0 8 5.5Z" />
          </svg>
          <span className="mt-1.5 text-[13px] font-medium">Essayer</span>
        </Link>
      </div>
    </PleinCadre>
  );
}
