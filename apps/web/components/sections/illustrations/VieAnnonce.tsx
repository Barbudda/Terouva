import { PROBLEM } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Les étapes posées sur la piste, en pourcentage de sa longueur. */
const POSITIONS = [0, 100 / 3, 200 / 3, 100];
/** Où l'on arrive : tôt avec Terouva, après les visites sans. */
const AVEC = 8;
const SANS = 82;

/**
 * Le cadre de « Pourquoi Terouva » : la vie d'une bonne annonce sur une
 * piste, de sa publication à son retrait, et les deux moments où l'on peut
 * y arriver. Aucune heure ni aucun chiffre : ils changent trop d'une ville à
 * l'autre pour être affichés sans source.
 *
 * À l'apparition, la piste se trace de gauche à droite, les étapes s'y
 * posent une à une, puis les deux arrivées descendent sur la piste.
 */
export function VieAnnonce() {
  const v = PROBLEM.vie;
  return (
    <figure className="encadre p-6 sm:p-8">
      <figcaption className="champ text-ink-3">{v.titre}</figcaption>

      <div className="mt-8 px-1 sm:px-3">
        {/* Les deux arrivées. Jusqu'au grand écran, celle sans Terouva monte plus
            haut, pour que les deux textes ne se chevauchent pas. */}
        <div className="relative h-[12.5rem] lg:h-[7.5rem]">
          <Arrivee position={AVEC} nom={v.avec.nom} texte={v.avec.texte} chaud rang={5} />
          <Arrivee position={SANS} nom={v.sans.nom} texte={v.sans.texte} rang={6} />
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="encadre-trait piste-annonce block h-px w-full"
            style={{ "--rang": 0 } as React.CSSProperties}
          />
          {POSITIONS.map((p, i) => (
            <span
              key={p}
              aria-hidden
              className="encadre-pas absolute top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-3 bg-paper-2"
              style={{ left: `${p}%`, "--rang": i + 1 } as React.CSSProperties}
            />
          ))}
        </div>

        <ol className="relative mt-4 h-10 sm:h-6">
          {v.etapes.map((etape, i) => (
            <li
              key={etape}
              className={cn(
                "encadre-pas absolute top-0 max-w-[5.5rem] text-[12px] leading-tight text-ink-3 sm:max-w-none sm:text-[13px]",
                i === 0 && "left-0 text-left",
                i === POSITIONS.length - 1 && "right-0 text-right",
                i > 0 && i < POSITIONS.length - 1 && "-translate-x-1/2 text-center",
              )}
              style={
                {
                  ...(i > 0 && i < POSITIONS.length - 1 ? { left: `${POSITIONS[i]}%` } : {}),
                  "--rang": i + 1,
                } as React.CSSProperties
              }
            >
              {etape}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

/**
 * Une arrivée sur la piste : le nom, la phrase, une tige qui descend jusqu'à
 * un point posé sur la piste. Avant le milieu, le texte part vers la droite ;
 * après, vers la gauche, pour ne jamais sortir du cadre.
 */
function Arrivee({
  position,
  nom,
  texte,
  chaud = false,
  rang,
}: {
  position: number;
  nom: string;
  texte: string;
  chaud?: boolean;
  rang: number;
}) {
  const aGauche = position < 50;
  return (
    <div
      className={cn(
        "encadre-pas absolute bottom-0 flex flex-col",
        aGauche ? "items-start" : "items-end text-right",
      )}
      style={
        {
          left: aGauche ? `${position}%` : undefined,
          right: aGauche ? undefined : `${100 - position}%`,
          "--rang": rang,
        } as React.CSSProperties
      }
    >
      <p className={cn("champ", chaud ? "text-action" : "text-ink-3")}>{nom}</p>
      <p className="mt-1.5 w-[12rem] text-[14px] leading-snug text-ink-2 sm:w-[15rem]">{texte}</p>
      <span
        aria-hidden
        className={cn(
          "mt-3 block w-px",
          chaud ? "h-5 bg-action" : "h-[6.5rem] bg-ink-3/60 lg:h-5",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "-mb-[5px] block size-2.5 rounded-full",
          aGauche ? "-ml-[4.5px]" : "-mr-[4.5px]",
          chaud ? "bg-action shadow-[0_0_14px_rgb(252_115_77/0.7)]" : "bg-ink-3",
        )}
      />
    </div>
  );
}
