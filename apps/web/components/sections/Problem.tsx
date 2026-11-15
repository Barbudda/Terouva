import type { CSSProperties } from "react";
import { PROBLEM } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Le temps gagné, en bande nuit (vague 2 du pôle Design, 15 novembre).
 *
 * Hugo, sur la frise d'avant (règle graduée, deux pistes, étiquettes) : « on
 * ne la comprend pas ». La section copie la manière du « 48 h gagnées » de
 * Rushlot : un chiffre géant qu'on lit sans rien d'autre, puis deux barres
 * nettes, sans règle, sans graduation, sans légende. La longueur d'une barre,
 * c'est le moment où vous arrivez sur l'annonce : la grise presque au bout,
 * l'orange dès le début. La phrase au bout de chaque barre suffit à le dire.
 *
 * Le chiffre reprend le fait sourcé du titre (« près de deux sur trois ») ; la
 * phrase complète reste le `h2`, et le chiffre seul est masqué aux lecteurs
 * d'écran pour qu'ils n'entendent pas deux fois la même chose.
 */
export function Problem() {
  const { sans, avec } = PROBLEM.vie;
  return (
    <section id="gains" aria-labelledby="gains-titre" className="temps cadre scroll-mt-20 py-20 lg:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <p className="etiquette-section">{PROBLEM.eyebrow}</p>
        <p aria-hidden className="temps-chiffre monte mt-6">
          2<span className="temps-chiffre__sur">sur</span>3
        </p>
        <h2 id="gains-titre" className="temps-phrase monte mt-4 text-ink" style={{ "--decalage": 1 } as CSSProperties}>
          {PROBLEM.titreLead} <span className="temps-phrase__accent">{PROBLEM.titreTail}</span>
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-10 lg:mt-24 lg:gap-12">
        <Barre nom={sans.nom} titre={sans.titre} position={sans.position} />
        <Barre nom={avec.nom} titre={avec.titre} position={avec.position} chaud />
      </div>

      {/* Le chiffre se vérifie en un clic : c'est ce qui le distingue d'une accroche. */}
      <p className="mt-14 text-center lg:mt-20">
        <a
          href={PROBLEM.source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="lien inline-block text-[13px] text-ink-3"
        >
          Source : {PROBLEM.source.label}
        </a>
      </p>
    </section>
  );
}

/** Une arrivée : son nom, la phrase qui la dit, et la barre jusqu'à elle. */
function Barre({
  nom,
  titre,
  position,
  chaud = false,
}: {
  nom: string;
  titre: string;
  position: number;
  chaud?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className={cn("champ", chaud ? "text-action" : "text-ink-3")}>{nom}</p>
        <p className={cn("temps-quand", chaud ? "text-ink" : "text-ink-2")}>{titre}</p>
      </div>
      <div
        aria-hidden
        className={cn("temps-barre filet-trace mt-4", chaud && "temps-barre--chaud")}
        style={{ width: `${position}%`, "--decalage": chaud ? 2 : 1 } as CSSProperties}
      />
    </div>
  );
}
