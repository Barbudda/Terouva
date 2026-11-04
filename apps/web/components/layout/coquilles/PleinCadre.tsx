import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Coquille A : le plein cadre, copié sur la référence qu'Hugo a envoyée le
 * 31 octobre (« je veux tout copier »).
 *
 * - Le champ : tout le cadre suit le dégradé, nuit au sommet, bleu électrique
 *   au milieu avec un faisceau cyan, orange et rose au pied (`.halo`).
 * - Les stries : de fins traits verticaux sur toute la hauteur (`.stries`),
 *   et au centre le rideau en dôme d'égaliseur, plus clair, sous le bouton.
 * - La composition : le titre seul au sommet ; dessous, une rangée flèche à
 *   gauche, texte et bouton rond au centre, flèche à droite ; en bas, les
 *   panneaux en perspective qui mordent sur la suite.
 *
 * Le rideau n'est que du CSS : un champ de couleur masqué deux fois, par une
 * silhouette SVG en escalier (chaque marche est un trait, avec sa propre
 * hauteur) et par un motif de barres au même pas. Pas un élément par trait,
 * donc rien à repeindre : seules des transformations bougent.
 */
export function PleinCadre({
  entete,
  gauche,
  droite,
  controles,
  panneaux,
  children,
  className,
}: {
  /** Le sommet : mention et titre. */
  entete: ReactNode;
  /** Flèche et chiffres de gauche. */
  gauche?: ReactNode;
  /** Chiffres et flèche de droite. */
  droite?: ReactNode;
  /** Les commandes des panneaux sur petit écran. */
  controles?: ReactNode;
  /** Les panneaux produit, en bas, avec leur légende au-dessus. */
  panneaux?: { legende: string; contenu: ReactNode }[];
  /** Le centre de la rangée : texte et bouton rond. */
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("halo relative overflow-x-clip", className)}>
      <div aria-hidden className="stries" />
      {/* Le rideau se mesure au bloc de contenu, pas aux panneaux. */}
      <div className="relative">
        <Rideau className="rideau rideau--large hidden lg:block" />
        <div className="cadre flex flex-col pt-14 pb-10 sm:pt-20 lg:min-h-[calc(100svh-15rem)] lg:justify-center lg:pt-8 lg:pb-20">
          <div className="text-center">{entete}</div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:mt-12 lg:grid-cols-[1fr_minmax(0,40rem)_1fr] lg:items-center lg:gap-x-10">
            {/* Calé sur la colonne du milieu, avec ou sans flèches sur les côtés. */}
            <div className="col-span-2 text-center lg:order-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
              {children}
            </div>
            {/* Sur petit écran, le rideau prend place entre le centre et les
                chiffres : aucun texte ne passe devant. */}
            <div className="relative col-span-2 h-52 sm:h-64 lg:hidden">
              <Rideau className="rideau rideau--bande" bande />
            </div>
            {/* Les côtés ne portent plus que les flèches, cachées sur petit
                écran : leurs cases ne doivent pas y creuser un vide. */}
            {gauche && (
              <div
                className="entree max-lg:hidden lg:order-1"
                style={{ "--rang": 4 } as React.CSSProperties}
              >
                {gauche}
              </div>
            )}
            {droite && (
              <div
                className="entree max-lg:hidden lg:order-3"
                style={{ "--rang": 5 } as React.CSSProperties}
              >
                {droite}
              </div>
            )}
          </div>
        </div>
      </div>

      {controles && (
        <div className="cadre relative z-10 mb-6 lg:hidden">{controles}</div>
      )}

      {panneaux && panneaux.length > 0 && (
        <div className="grille relative z-10 -mb-12 lg:-mb-20">
          {/* Quatre panneaux : deux par rangée sur tablette, en ligne sur grand
              écran, les deux du bord inclinés vers le centre. */}
          <div className="col-span-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:[perspective:1600px]">
            {panneaux.map((p, i) => (
              <div
                key={p.legende}
                className={cn(
                  "entree flex min-w-0 flex-col",
                  i === 1 && "flotte",
                )}
                style={{ "--rang": 7 + i } as React.CSSProperties}
              >
                <p className="champ mb-3 inline-flex items-center self-start gap-2 rounded-full bg-paper/70 py-1.5 pr-3 pl-2.5 text-ink backdrop-blur-sm">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-action"
                  />
                  {p.legende}
                </p>
                <div
                  className={cn(
                    "panneau-incline",
                    i === 0 && "panneau-incline--gauche",
                    i === panneaux.length - 1 && "panneau-incline--droite",
                  )}
                >
                  {p.contenu}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/** Nombre de traits : serrés sur grand écran, plus espacés sur la bande mobile. */
const TRAITS_LARGE = 200;
const TRAITS_BANDE = 72;

/**
 * La silhouette du rideau, en escalier : une marche par trait. La hauteur
 * suit une cloche à pic serré et à queues longues, plus un léger aléa fixe
 * d'un trait à l'autre, pour que le sommet vibre comme un égaliseur.
 */
function silhouette(n: number) {
  let d = "M0 100";
  for (let i = 0; i < n; i++) {
    const u = ((i + 0.5) / n) * 2 - 1;
    const cloche = 0.24 + 0.76 * Math.exp(-Math.pow(Math.abs(u) / 0.46, 1.6));
    const alea = (((i * 7919) % 101) / 101 - 0.5) * 0.08;
    const h = Math.min(1, Math.max(0.06, cloche + alea));
    d += `L${i} ${(100 - h * 100).toFixed(1)}H${i + 1}`;
  }
  return d + `L${n} 100Z`;
}

function masque(n: number) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${n} 100' preserveAspectRatio='none'><path d='${silhouette(n)}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const MASQUE_LARGE = masque(TRAITS_LARGE);
const MASQUE_BANDE = masque(TRAITS_BANDE);

/** Le rideau : le masque en escalier sur l'enveloppe, le motif de barres sur le champ de couleur. */
function Rideau({
  className,
  bande = false,
}: {
  className?: string;
  bande?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={
        {
          "--masque": bande ? MASQUE_BANDE : MASQUE_LARGE,
          "--traits": bande ? TRAITS_BANDE : TRAITS_LARGE,
        } as React.CSSProperties
      }
    >
      <div className="rideau-fond" />
      <div className="rideau-barres">
        <span className="rideau-lueur" />
      </div>
    </div>
  );
}
