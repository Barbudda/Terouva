import { INSTRUMENT, STEPS } from "@/lib/content";
import { ANNONCES_SCENE } from "@/lib/exemples";
import { BandeNuit } from "@/components/layout/coquilles/BandeNuit";
import { Cadran } from "@/components/sections/Cadran";
import { Video } from "@/components/sections/Video";

/**
 * L'instrument, coquille D : la première bande nuit, et le cœur du parti pris.
 *
 * Le titre est en Archivo 500, pas en Fraunces : dans le monde nuit, la serif
 * n'entre pas. À gauche, le flux en trois temps, reliés par des filets qui se
 * tracent au défilement. À droite, le cadran, qui commence 40 px au-dessus du
 * bord haut de la bande et recouvre le papier. Dessous, les quatre annonces
 * de la démonstration, classées, en lignes denses ; puis la vidéo, dans un
 * cadre à filet, sans bouton de lecture décoratif par-dessus.
 */
export function Instrument() {
  return (
    <BandeNuit
      id="comment"
      depassement={
        <div className="grille">
          <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-8">
            <Cadran />
          </div>
        </div>
      }
    >
      <div className="grille mt-10 md:-mt-32 lg:-mt-[26rem]">
        <div className="col-span-12 md:col-span-5 lg:col-span-6">
          <p className="champ text-night-ink-2">Comment ça marche</p>
          <h2 className="mt-3 max-w-[22ch] text-nuit-titre leading-[1.05] font-medium tracking-[-0.01em]">
            {INSTRUMENT.titre}
          </h2>
          <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-night-ink-2">
            {INSTRUMENT.texte}
          </p>

          <ol className="mt-10 max-w-[34rem]">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-7">
                {/* Le filet vertical qui relie les temps, tracé à l'entrée. */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-7 bottom-0 left-[0.3rem] w-px bg-night-rule"
                  />
                )}
                <span className="champ pt-1 text-night-ink-2">0{i + 1}</span>
                <div>
                  <p className="champ text-night-ink-2">{INSTRUMENT.flux[i]}</p>
                  <p className="mt-1.5 text-[15px] leading-snug font-medium">{s.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-night-ink-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Les annonces classées, en lignes denses : rang, titre, prix, surface,
          note, jauge. C'est le tableau de bord, pas une liste de cartes. */}
      <div className="grille mt-demi-pas">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <div className="flex items-baseline justify-between gap-4">
            <p className="champ text-night-ink-2">Quatre annonces, classées</p>
            <p className="champ text-night-ink-2">2 pièces · Lyon · ≤ 950 €</p>
          </div>
          <ol className="mt-3 border-t border-night-rule">
            {ANNONCES_SCENE.map((a, i) => (
              <li
                key={a.titre}
                className="grid grid-cols-[2rem_1fr_3.5rem] items-center gap-x-4 border-b border-night-rule py-3.5 sm:grid-cols-[2rem_1fr_7rem_6rem_3.5rem_8rem] sm:gap-x-6"
              >
                <span className="champ text-night-ink-2">0{i + 1}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-medium">{a.titre}</span>
                  <span className="champ mt-0.5 block text-night-ink-2 sm:hidden">
                    {a.prix} € · {a.surface} m²
                  </span>
                </span>
                <span className="champ hidden text-night-ink-2 sm:block">{a.prix} €</span>
                <span className="champ hidden text-night-ink-2 sm:block">{a.surface} m²</span>
                <span className="font-mono text-[17px] tabular-nums sm:text-right">{a.note}</span>
                <span aria-hidden className="col-span-3 mt-2 h-px bg-night-rule sm:col-span-1 sm:mt-0">
                  <span className="block h-full bg-night-accent" style={{ width: `${a.note}%` }} />
                </span>
              </li>
            ))}
          </ol>
          <p className="marge mt-3 text-night-ink-2">
            Notes calculées par le moteur de Terouva pour le profil de démonstration. La première
            est à contacter en priorité : message déjà préparé, vous le relisez, vous l&apos;envoyez.
          </p>
        </div>
      </div>

      <div className="grille mt-demi-pas">
        <div className="col-span-12 lg:col-span-7 lg:col-start-1">
          <Video />
        </div>
        <div className="col-span-12 mt-8 flex flex-col justify-end lg:col-span-4 lg:col-start-9 lg:mt-0">
          <p className="champ text-night-ink-2">Sans rien installer</p>
          <p className="mt-3 text-[15px] leading-relaxed text-night-ink-2">
            La démonstration tourne dans votre navigateur avec des annonces d&apos;exemple qui
            arrivent en direct : la note, le message préparé, l&apos;envoi, le suivi. Elle
            s&apos;efface en un clic.
          </p>
          <a href={INSTRUMENT.cta.href} className="lien mt-4 self-start text-[15px]">
            {INSTRUMENT.cta.label}
          </a>
        </div>
      </div>
    </BandeNuit>
  );
}
