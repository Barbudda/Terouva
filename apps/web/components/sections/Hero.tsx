import Link from "next/link";
import { CHIFFRES, HERO } from "@/lib/content";
import { PleinCadre } from "@/components/layout/coquilles/PleinCadre";
import {
  ControlesMobiles,
  Fleche,
  PanneauAnnonce,
  PanneauMessage,
  PanneauNote,
} from "@/components/sections/HeroExemples";
import { cn } from "@/lib/utils";

/**
 * L'accueil, copié sur la référence d'Hugo (31 octobre) : le titre en deux
 * lignes au sommet, finissant en italique ; dessous, une rangée avec une
 * flèche ronde et deux chiffres de chaque côté, le texte en DM Mono et le
 * bouton rond au centre ; en bas, trois panneaux en perspective qui mordent
 * sur la section suivante. Les flèches font défiler les six annonces de la
 * démonstration dans les panneaux.
 */
export function Hero() {
  const [c1, c2, c3, c4] = CHIFFRES;
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
      gauche={
        <div className="flex items-center gap-8">
          <Fleche sens={-1} className="hidden lg:inline-flex" />
          <dl className="space-y-7">
            <Chiffre valeur={c1.valeur} unite={c1.unite} />
            <Chiffre valeur={c2.valeur} unite={c2.unite} />
          </dl>
        </div>
      }
      droite={
        <div className="flex items-center justify-end gap-8">
          <dl className="space-y-7">
            <Chiffre valeur={c3.valeur} unite={c3.unite} droite />
            <Chiffre valeur={c4.valeur} unite={c4.unite} droite />
          </dl>
          <Fleche sens={1} className="hidden lg:inline-flex" />
        </div>
      }
      controles={<ControlesMobiles />}
      panneaux={[
        {
          legende: "Une annonce, lue par Terouva",
          contenu: <PanneauAnnonce />,
        },
        { legende: "Sa note, et pourquoi", contenu: <PanneauNote /> },
        { legende: "Le message, prêt à relire", contenu: <PanneauMessage /> },
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
          <span className="mt-1.5 text-[13px] font-medium">Voir la démo</span>
        </Link>
      </div>
    </PleinCadre>
  );
}

/** Un chiffre clé, comme sur la référence : la valeur en Fraunces blanc, le libellé dessous. */
function Chiffre({
  valeur,
  unite,
  droite = false,
}: {
  valeur: string;
  unite: string;
  droite?: boolean;
}) {
  return (
    <div
      className={cn("flex flex-col-reverse", droite && "items-end text-right")}
    >
      <dt className="mt-1.5 text-[13px] text-ink first-letter:uppercase">
        {unite}
      </dt>
      <dd className="titre text-[2rem] leading-none text-ink lg:text-[2.375rem]">
        {valeur}
      </dd>
    </div>
  );
}
