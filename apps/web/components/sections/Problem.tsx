import { PROBLEM } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Où tombent les étapes sur la vie d'une annonce, en pourcentage. */
const POSITIONS = [0, 100 / 3, 200 / 3, 100];

/**
 * Le gain, en avant et après (Hugo, 4 novembre : un paragraphe, un encadré
 * et une frise posés côte à côte ne guidaient pas l'œil).
 *
 * Deux cartes, la même annonce : « sans » à gauche, éteinte, à filet
 * pointillé ; « avec » à droite, levée, à l'orange, là où la lecture finit.
 * Chacune porte la vie de l'annonce et le point où vous arrivez, si bien que
 * la différence se voit avant de se lire. Aucune heure ni aucun chiffre : ils
 * varient trop d'une ville à l'autre pour être affichés sans source.
 */
export function Problem() {
  const { sans, avec } = PROBLEM.vie;
  return (
    <section id="gains" aria-labelledby="gains-titre" className="cadre scroll-mt-20 py-demi-pas">
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="mention">{PROBLEM.eyebrow}</p>
          <h2 id="gains-titre" className="titre mt-3 text-titre-2 text-ink">
            {PROBLEM.titreLead} <em className="font-normal italic text-blue-clair">{PROBLEM.titreTail}</em>
          </h2>
        </div>
        <p className="max-w-[32rem] text-[16px] leading-relaxed text-ink-2 lg:col-span-5 lg:pb-2">
          {PROBLEM.texte}
        </p>
      </div>

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
        <Arrivee {...sans} />
        <Arrivee {...avec} chaud />
      </div>
    </section>
  );
}

function Arrivee({
  nom,
  titre,
  texte,
  position,
  chaud = false,
}: {
  nom: string;
  titre: string;
  texte: string;
  position: number;
  chaud?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-[1.75rem] p-6 sm:p-9",
        chaud
          ? "scene carte-levee ring-1 ring-action/40"
          : "border border-dashed border-rule-fort bg-paper/40",
      )}
    >
      <p className={cn("champ inline-flex items-center gap-2.5", chaud ? "text-action" : "text-ink-3")}>
        <span
          aria-hidden
          className={cn(
            "flex size-6 items-center justify-center rounded-full",
            chaud ? "bg-action text-action-ink" : "border border-rule-fort text-ink-3",
          )}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
            {chaud ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />}
          </svg>
        </span>
        {nom}
      </p>
      <h3 className={cn("titre titre--petit mt-5 text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)]", chaud ? "text-ink" : "text-ink-2")}>
        {titre}
      </h3>
      <p className={cn("mt-3 text-[15px] leading-relaxed", chaud ? "text-ink-2" : "text-ink-3")}>{texte}</p>

      <Vie position={position} chaud={chaud} />
    </article>
  );
}

/**
 * La vie de l'annonce, de sa publication à son retrait, et le point
 * d'arrivée. La partie déjà écoulée quand vous arrivez est tracée plus fort :
 * courte et chaude avec Terouva, longue et grise sans.
 */
function Vie({ position, chaud }: { position: number; chaud: boolean }) {
  const etapes = PROBLEM.vie.etapes;
  return (
    <div className="mt-auto pt-12">
      <div className="relative h-14">
        {/* Près d'un bord, l'étiquette s'aligne sur ce bord au lieu de se
            centrer sur le point : centrée, elle sortait de la carte sur
            téléphone. */}
        <span
          className={cn(
            "champ absolute bottom-3 rounded-full px-2.5 py-1 whitespace-nowrap",
            chaud ? "bg-action text-action-ink" : "bg-paper-2 text-ink-2",
          )}
          style={
            position < 25
              ? { left: `max(0px, calc(${position}% - 0.75rem))` }
              : position > 75
                ? { right: `max(0px, calc(${100 - position}% - 0.75rem))` }
                : { left: `${position}%`, transform: "translateX(-50%)" }
          }
        >
          Vous arrivez ici
        </span>
      </div>
      <div className="relative">
        <span aria-hidden className="block h-1 w-full rounded-full bg-rule" />
        <span
          aria-hidden
          className={cn("absolute inset-y-0 left-0 rounded-full", chaud ? "rail" : "bg-ink-3/60")}
          style={{ width: `${position}%` }}
        />
        {POSITIONS.map((p) => (
          <span
            key={p}
            aria-hidden
            className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-3 bg-paper"
            style={{ left: `${p}%` }}
          />
        ))}
        <span
          aria-hidden
          className={cn(
            "absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
            chaud
              ? "border-paper bg-action shadow-[0_0_0_6px_color-mix(in_oklch,var(--color-action)_25%,transparent)]"
              : "border-paper bg-ink-3",
          )}
          style={{ left: `${position}%` }}
        />
      </div>
      {/* Chaque libellé sous son point ; ceux des bords s'alignent sur le bord. */}
      <ol className="relative mt-3 h-8 text-[12px] leading-tight text-ink-3 sm:text-[13px]">
        {etapes.map((e, i) => (
          <li
            key={e}
            className={cn(
              "absolute top-0 max-w-[6rem]",
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
    </div>
  );
}
