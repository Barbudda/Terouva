import type { CSSProperties } from "react";
import { PROBLEM } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Où tombent les étapes sur la vie d'une annonce, en pourcentage. */
const POSITIONS = [0, 100 / 3, 200 / 3, 100];

/**
 * Le gain, mesuré sur une seule règle.
 *
 * Pôle Design, 5 novembre : les deux cartes « sans » et « avec » demandaient
 * de comparer deux frises de l'œil, et elles avaient la matière de tout le
 * bas de page. La section devient un instrument : une règle graduée, la vie
 * d'une même annonce, et les deux arrivées posées l'une sous l'autre. Le
 * temps que Terouva vous donne est l'intervalle hachuré d'orange entre votre
 * arrivée et celle d'avant ; un trait pointillé le relie à l'arrivée sans
 * Terouva. L'écart se voit avant de se lire. Aucune heure ni aucun chiffre :
 * ils varient trop d'une ville à l'autre pour être affichés sans source.
 *
 * La règle est une illustration (`aria-hidden`) : les deux phrases qui
 * suivent portent le sens, chacune précédée de son nom pour les lecteurs
 * d'écran.
 */
export function Problem() {
  const { sans, avec } = PROBLEM.vie;
  return (
    <section id="gains" aria-labelledby="gains-titre" className="recit-gains cadre scroll-mt-20 py-demi-pas">
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="mention">{PROBLEM.eyebrow}</p>
          <h2 id="gains-titre" className="titre mt-3 text-titre-2 text-ink">
            {PROBLEM.titreLead} <em className="font-normal italic text-blue-clair">{PROBLEM.titreTail}</em>
          </h2>
        </div>
        <div className="max-w-[32rem] lg:col-span-5 lg:pb-2">
          <p className="text-[16px] leading-relaxed text-ink-2">{PROBLEM.texte}</p>
          {/* Le chiffre du titre se vérifie en un clic : c'est ce qui le distingue d'une accroche. */}
          <a
            href={PROBLEM.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="lien mt-3 inline-block text-[13px] text-ink-3"
          >
            Source : {PROBLEM.source.label}
          </a>
        </div>
      </div>

      <Regle sans={sans.position} avec={avec.position} />

      <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:mt-12">
        <Arrivee {...sans} />
        <Arrivee {...avec} chaud />
      </div>
    </section>
  );
}

/**
 * La règle : les étapes en tête, la graduation, puis les deux pistes. Les
 * hauteurs sont fixées dans `accueil-recit.css` (`.recit-regle`) pour que le
 * trait qui relie les deux arrivées tombe juste d'une piste à l'autre.
 */
function Regle({ sans, avec }: { sans: number; avec: number }) {
  const etapes = PROBLEM.vie.etapes;
  return (
    <div aria-hidden className="recit-regle relative mt-12 lg:mt-16">
      {/* Chaque libellé au-dessus de son repère ; ceux des bords s'alignent sur le bord. */}
      <ol className="recit-regle-etapes">
        {etapes.map((e, i) => (
          <li
            key={e}
            className={cn(
              "absolute top-0 max-w-[6.5rem] text-[12px] leading-tight text-ink-3 sm:text-[13px]",
              i === 0 && "left-0 text-left",
              i === etapes.length - 1 && "right-0 text-right",
              i > 0 && i < etapes.length - 1 && "-translate-x-1/2 text-center",
            )}
            style={i > 0 && i < etapes.length - 1 ? { left: `${POSITIONS[i]}%` } : undefined}
          >
            {e}
          </li>
        ))}
      </ol>
      <div className="recit-graduation">
        {POSITIONS.map((p) => (
          <span key={p} className="recit-repere" style={{ left: `${p}%` }} />
        ))}
      </div>

      {/* Sans Terouva : la piste grise, presque pleine. */}
      <p className="recit-nom recit-nom--sans champ text-ink-3">
        <Signe /> {PROBLEM.vie.sans.nom}
      </p>
      <Etiquette position={sans} rang="sans" />
      <div className="recit-piste recit-piste--sans">
        <span className="recit-plein filet-trace" style={{ width: `${sans}%` }} />
        <span className="recit-point monte" style={{ left: `${sans}%`, "--decalage": 2 } as CSSProperties} />
      </div>

      {/* Le trait qui relie l'arrivée sans Terouva à la piste du dessous. */}
      <span className="recit-lien" style={{ left: `${sans}%` }} />

      {/* Avec Terouva : un trait d'orange, puis le temps gagné, hachuré. */}
      <p className="recit-nom recit-nom--avec champ text-action">
        <Signe chaud /> {PROBLEM.vie.avec.nom}
      </p>
      <div className="recit-piste recit-piste--avec">
        <span
          className="recit-gagne filet-trace"
          style={{ left: `${avec}%`, width: `${sans - avec}%`, "--decalage": 3 } as CSSProperties}
        />
        <span className="recit-plein recit-plein--chaud filet-trace" style={{ width: `${avec}%`, "--decalage": 1 } as CSSProperties} />
        <span className="recit-point recit-point--chaud monte" style={{ left: `${avec}%`, "--decalage": 2 } as CSSProperties} />
      </div>
      <Etiquette position={avec} rang="avec" chaud />
    </div>
  );
}

/**
 * « Vous arrivez ici », accroché à son point. Près d'un bord, l'étiquette
 * s'aligne sur ce bord au lieu de se centrer : centrée, elle sortait de
 * l'écran sur téléphone.
 */
function Etiquette({ position, rang, chaud = false }: { position: number; rang: "sans" | "avec"; chaud?: boolean }) {
  return (
    <span
      className={cn(
        "recit-etiquette monte champ rounded-full px-2.5 py-1 whitespace-nowrap",
        `recit-etiquette--${rang}`,
        // action-ink sur action : 7,42:1 ; ink-2 sur paper-2 : environ 9:1.
        chaud ? "bg-action text-action-ink" : "bg-paper-2 text-ink-2",
      )}
      style={{
        ...({ "--decalage": 4 } as CSSProperties),
        ...(position < 25
          ? { left: `max(0px, calc(${position}% - 0.75rem))` }
          : position > 75
            ? { right: `max(0px, calc(${100 - position}% - var(--r-debord, 0.75rem)))` }
            : { left: `${position}%`, translate: "-50% 0" }),
      }}
    >
      Vous arrivez ici
    </span>
  );
}

/** La croix grise ou la coche orange devant chaque nom. */
function Signe({ chaud = false }: { chaud?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full",
        chaud ? "bg-action text-action-ink" : "border border-rule-fort text-ink-3",
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
        {chaud ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />}
      </svg>
    </span>
  );
}

/** Une arrivée en toutes lettres, sous la règle : le nom reste pour les lecteurs d'écran. */
function Arrivee({ nom, titre, texte, chaud = false }: { nom: string; titre: string; texte: string; chaud?: boolean }) {
  return (
    <article className={cn("recit-arrivee border-t pt-5", chaud ? "border-action" : "border-rule-fort")}>
      <h3 className={cn("titre titre--petit text-[clamp(1.5rem,1.15rem+1.2vw,2.125rem)]", chaud ? "text-ink" : "text-ink-2")}>
        <span className="sr-only">{nom} : </span>
        {titre}
      </h3>
      {/* ink-2 sur nuit : 10:1 ; ink-3 sur nuit : 6,2:1. */}
      <p className={cn("mt-3 max-w-[34rem] text-[15px] leading-relaxed", chaud ? "text-ink-2" : "text-ink-3")}>{texte}</p>
    </article>
  );
}
