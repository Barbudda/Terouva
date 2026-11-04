import Link from "next/link";
import { HERO } from "@/lib/content";
import { PleinCadre } from "@/components/layout/coquilles/PleinCadre";
import {
  ControlesMobiles,
  Fleche,
  PanneauAnnonce,
  PanneauEnvoi,
  PanneauMessage,
  PanneauNote,
} from "@/components/sections/HeroExemples";

/**
 * L'accueil, sur la référence d'Hugo (31 octobre) : le titre en deux lignes
 * au sommet, finissant en italique ; dessous, la phrase et le bouton rond,
 * entre deux flèches ; en bas, les panneaux en perspective qui mordent sur la
 * section suivante.
 *
 * Le 4 novembre, les chiffres de part et d'autre (« 0 compte, 0 serveur… »)
 * laissent la place au parcours lui-même : quatre panneaux, de l'annonce
 * publiée sur Leboncoin à la candidature envoyée. Les flèches font défiler
 * les six annonces de la démonstration, et les quatre panneaux suivent.
 */
export function Hero() {
  const [annonce, reperee, message, envoi] = HERO.etapes;
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
      gauche={<Fleche sens={-1} className="hidden lg:inline-flex" />}
      droite={
        <div className="flex justify-end">
          <Fleche sens={1} className="hidden lg:inline-flex" />
        </div>
      }
      controles={<ControlesMobiles />}
      panneaux={[
        { legende: annonce, contenu: <PanneauAnnonce /> },
        { legende: reperee, contenu: <PanneauNote /> },
        { legende: message, contenu: <PanneauMessage /> },
        { legende: envoi, contenu: <PanneauEnvoi /> },
      ]}
    >
      <p
        className="entree mx-auto max-w-[40rem] font-mono text-[13px] leading-relaxed text-ink sm:text-sm"
        style={{ "--rang": 2 } as React.CSSProperties}
      >
        {HERO.panneau}
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
