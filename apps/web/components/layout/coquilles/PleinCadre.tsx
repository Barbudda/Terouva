import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Coquille A : le plein cadre, dans la composition de la référence qu'Hugo a
 * envoyée le 31 octobre (trois couches, dans cet ordre) :
 *
 * 1. Le rideau de lumière. Sous le titre, un mur de fins traits verticaux,
 *    serrés, bleu électrique, dont la silhouette dessine une courbe : montée
 *    progressive, pic au centre, descente progressive. Il se lève à l'arrivée
 *    et respire ensuite. Le titre reste au-dessus : rien ne passe derrière.
 * 2. Les chiffres de part et d'autre, et un bouton rond posé au sommet.
 * 3. La chaleur : le cœur du rideau vire à l'orange, et trois panneaux
 *    produit en perspective mordent sur la section suivante.
 *
 * Le rideau n'est que du CSS : un champ de couleur masqué deux fois, par une
 * silhouette SVG en escalier (chaque marche est un trait, avec sa propre
 * hauteur) et par un motif de barres au même pas. Pas un élément par trait,
 * donc rien à repeindre : seules des transformations bougent.
 */
export function PleinCadre({
  gauche,
  droite,
  panneaux,
  children,
  className,
}: {
  /** Les chiffres de gauche. */
  gauche?: ReactNode;
  /** Les chiffres de droite. */
  droite?: ReactNode;
  /** Les panneaux produit, en bas, avec leur légende au-dessus. */
  panneaux?: { legende: string; contenu: ReactNode }[];
  /** Le centre : mention, titre, texte, action. */
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("halo relative overflow-x-clip", className)}>
      {/* Le rideau se mesure au bloc de contenu, pas aux panneaux. */}
      <div className="relative">
        <Rideau className="rideau rideau--large hidden lg:block" />
        <div className="grille items-center pt-14 pb-10 sm:pt-20 lg:min-h-[min(40rem,calc(100vh-14rem))] lg:pt-16 lg:pb-14">
          <div className="order-1 col-span-12 text-center lg:order-2 lg:col-span-8 lg:col-start-3">
            {children}
          </div>
          {/* Sur petit écran, le rideau prend place entre le centre et les
              chiffres : aucun texte ne passe devant. */}
          <div className="relative order-2 col-span-12 mt-8 h-52 sm:h-64 lg:hidden">
            <Rideau className="rideau rideau--bande" bande />
          </div>
          {gauche && (
            <div
              className="entree order-3 col-span-6 mt-8 lg:order-1 lg:col-span-2 lg:col-start-1 lg:mt-0"
              style={{ "--rang": 5 } as React.CSSProperties}
            >
              {gauche}
            </div>
          )}
          {droite && (
            <div
              className="entree order-4 col-span-6 mt-8 text-right lg:order-3 lg:col-span-2 lg:col-start-11 lg:mt-0"
              style={{ "--rang": 6 } as React.CSSProperties}
            >
              {droite}
            </div>
          )}
        </div>
      </div>

      {panneaux && panneaux.length > 0 && (
        <div className="grille relative z-10 -mb-12 lg:-mb-20">
          <div className="col-span-12 grid gap-6 lg:grid-cols-12 lg:[perspective:1600px]">
            {panneaux.map((p, i) => (
              <div
                key={p.legende}
                className={cn(
                  "entree min-w-0",
                  i === 0 && "lg:col-span-4",
                  i === 1 && "flotte lg:col-span-5",
                  i === 2 && "lg:col-span-3",
                )}
                style={{ "--rang": 7 + i } as React.CSSProperties}
              >
                <p className="champ mb-3 inline-flex items-center gap-2 rounded-full bg-paper/70 py-1.5 pr-3 pl-2.5 text-ink backdrop-blur-sm">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-blue-clair"
                  />
                  {p.legende}
                </p>
                <div
                  className={cn(
                    "panneau-incline",
                    i === 0 && "panneau-incline--gauche",
                    i === 2 && "panneau-incline--droite",
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
