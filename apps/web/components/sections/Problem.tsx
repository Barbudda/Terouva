import type { CSSProperties } from "react";
import { PROBLEM } from "@/lib/content";

/** « Vous la découvrez le soir. » devient « …, vous la découvrez le soir. » */
const enSuite = (phrase: string) => phrase.charAt(0).toLowerCase() + phrase.slice(1);

/**
 * Le temps gagné, en bande nuit (vague 2 du pôle Design, 15 novembre).
 *
 * Première version : « 2 sur 3 » en géant puis deux barres « sans / avec ».
 * Les deux critiques ont tranché : personne ne comprenait la barre grise, et
 * la barre « avec », trop courte, devenait une pastille qu'on prenait pour un
 * bouton. Les barres partent : il n'y a aucune durée sourcée pour leur donner
 * une échelle honnête. Reste ce que Rushlot fait avec « 48 h gagnées » : le
 * chiffre géant, sa phrase en petit, puis le gain du visiteur, aussi gros que
 * possible, en orange. La phrase « sans » le précède en gris, plus petite :
 * c'est le contraste qui fait comprendre, pas un schéma.
 *
 * Deux voix seulement (grotesque, et le mono de l'étiquette) ; le chiffre seul
 * est masqué aux lecteurs d'écran, le `h2` porte la phrase complète.
 */
export function Problem() {
  const { sans, avec } = PROBLEM.vie;
  return (
    <section id="gains" aria-labelledby="gains-titre" className="temps cadre scroll-mt-20 py-20 text-center lg:py-32">
      <p className="etiquette-section">{PROBLEM.eyebrow}</p>
      <p aria-hidden className="temps-chiffre monte mt-6">
        2<span className="temps-chiffre__sur">sur</span>3
      </p>
      <h2
        id="gains-titre"
        className="temps-phrase monte mx-auto mt-5 max-w-3xl text-ink-2"
        style={{ "--decalage": 1 } as CSSProperties}
      >
        {PROBLEM.titreLead} {PROBLEM.titreTail}
      </h2>

      <div className="mx-auto mt-16 max-w-5xl lg:mt-24">
        <p className="temps-sans monte text-ink-3" style={{ "--decalage": 2 } as CSSProperties}>
          {sans.nom}, {enSuite(sans.titre)}
        </p>
        <p className="temps-gain monte mt-3" style={{ "--decalage": 3 } as CSSProperties}>
          {avec.nom}, {enSuite(avec.titre)}
        </p>
      </div>

      {/* Le chiffre se vérifie en un clic : c'est ce qui le distingue d'une accroche. */}
      <p className="mt-14 lg:mt-20">
        <a
          href={PROBLEM.source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="lien inline-block text-[15px] text-ink-2"
        >
          Source : {PROBLEM.source.label}
        </a>
      </p>
    </section>
  );
}
