import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Les vignettes des outils et des guides (pôle Design, session visuels,
 * 5 novembre 2026). DESIGN.md exclut la photographie : chaque vignette dessine
 * l'objet dont parle la page (le dossier, le message, la clé, le plan de la
 * pièce) en papier chaud, posé sur la nuit, au-dessus d'un petit rideau de
 * bâtons. Les bâtons reprennent le graphique du hero ; leur courbe est tirée du
 * chemin de la page, si bien que deux vignettes au même objet restent
 * distinctes.
 *
 * Règle pour un nouveau guide : lui choisir un motif dans `MOTIFS` (clé dans
 * `MOTIF_DES_PAGES`) ; sans entrée, sa rubrique donne le motif par défaut.
 * Un motif nouveau tient dans le repère local (x de -120 à 120, y de -90 à
 * 90), est dessiné en feuilles (`Feuille`) et porte **un seul** élément orange.
 * Les couleurs sont des classes de `app/styles/visuels.css`, qui suivent le
 * monde nuit ou papier de la page.
 */

export type Motif =
  | "dossier"
  | "visale"
  | "message"
  | "depot"
  | "garant"
  | "refus"
  | "cles"
  | "plan"
  | "calendrier"
  | "outil-liste"
  | "outil-message"
  | "outil-salaire";

export type Etape = "avant" | "candidature" | "apres";

/** Le motif de chaque page qui en a un à elle. */
export const MOTIF_DES_PAGES: Record<string, Motif> = {
  "/guides/dossier-de-location": "dossier",
  "/guides/garantie-visale": "visale",
  "/guides/repondre-a-une-annonce-de-location": "message",
  "/guides/depot-de-garantie": "depot",
  "/guides/garant-caution": "garant",
  "/guides/refus-de-dossier": "refus",
  "/guides/louer-sans-garant": "cles",
  "/guides/etat-des-lieux": "plan",
  "/guides/preavis-location": "calendrier",
  "/outils/dossier-de-location": "outil-liste",
  "/outils/message-de-candidature": "outil-message",
  "/outils/quel-salaire-pour-un-loyer": "outil-salaire",
};

/** Le motif d'une page sans entrée, d'après sa rubrique. */
const MOTIF_PAR_ETAPE: Record<Etape, Motif> = {
  avant: "dossier",
  candidature: "message",
  apres: "cles",
};

export function motifDe(chemin: string, etape: Etape = "avant"): Motif {
  return MOTIF_DES_PAGES[chemin] ?? MOTIF_PAR_ETAPE[etape];
}

/**
 * La vignette, en 16:10 par défaut ; `slice` la recadre sans la déformer dans
 * un cadre d'un autre rapport. Décorative : le titre de la carte dit tout.
 */
export function Vignette({ motif, graine, className }: { motif: Motif; graine: string; className?: string }) {
  const Dessin = MOTIFS[motif];
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
      className={cn("vg block size-full", className)}
    >
      <rect width="400" height="250" className="vg-fond" />
      <Batons graine={graine} />
      <g transform="translate(200 124)">
        <g className="vg-objet">
          <Dessin />
        </g>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- Bâtons */

/** FNV-1a : une graine stable par chemin, sans hasard au rendu (pas d'écart serveur / client). */
function hache(texte: string): number {
  let h = 2166136261;
  for (let i = 0; i < texte.length; i++) {
    h ^= texte.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const NB_BATONS = 46;

/** Le petit rideau : montée, pic, descente, comme le hero, pic placé par la graine. */
function Batons({ graine }: { graine: string }) {
  const pic = 0.28 + (hache(graine) % 44) / 100;
  const hauteurs = Array.from({ length: NB_BATONS }, (_, i) => {
    const t = i / (NB_BATONS - 1);
    const cloche = Math.exp(-((t - pic) ** 2) / (2 * 0.17 ** 2));
    const alea = (hache(`${graine}:${i}`) % 100) / 100;
    return Math.round(14 + 104 * (cloche * 0.82 + alea * 0.16));
  });
  const seuil = [...hauteurs].sort((a, b) => b - a)[2];
  const pas = 384 / NB_BATONS;
  return (
    <g>
      {hauteurs.map((h, i) => {
        const x = 8 + i * pas + (pas - 3.5) / 2;
        return (
          <g key={i}>
            <rect x={x} y={250 - h} width="3.5" height={h} rx="1.75" className="vg-baton" />
            {h >= seuil && <rect x={x} y={250 - h} width="3.5" height="9" rx="1.75" className="vg-action" />}
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------- Primitives */

/** Une forme et sa portée : l'ombre douce, d'une seule direction, en bas à droite. */
function Pose({ children }: { children: ReactNode }) {
  return (
    <>
      <g className="vg-portee" transform="translate(5 8)">
        {children}
      </g>
      {children}
    </>
  );
}

/** Une feuille de papier chaud, inclinée ; ses enfants sont dans son repère (0, 0 en haut à gauche). */
function Feuille({
  x,
  y,
  l,
  h,
  r = 0,
  children,
}: {
  x: number;
  y: number;
  l: number;
  h: number;
  r?: number;
  children?: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r} ${l / 2} ${h / 2})`}>
      <Pose>
        <rect width={l} height={h} rx="4" className="vg-feuille" />
      </Pose>
      {children}
    </g>
  );
}

/** Des lignes de texte suggérées : la première plus forte si `titre`. */
function Lignes({
  x,
  y,
  largeurs,
  pas = 13,
  titre = false,
  surBleu = false,
}: {
  x: number;
  y: number;
  largeurs: number[];
  pas?: number;
  titre?: boolean;
  /** Dans une bulle bleue, les lignes sont en papier. */
  surBleu?: boolean;
}) {
  return (
    <>
      {largeurs.map((l, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * pas + (titre && i > 0 ? 6 : 0)}
          width={l}
          height={titre && i === 0 ? 7 : 4}
          rx="2"
          className={surBleu ? "vg-ligne-bleu" : titre && i === 0 ? "vg-ligne-forte" : "vg-ligne"}
        />
      ))}
    </>
  );
}

const coche = (x: number, y: number, t = 1) => `M${x} ${y + 5 * t}l${5 * t} ${5 * t}l${10 * t} -${11 * t}`;

/* ----------------------------------------------------------------- Motifs */

/** Le dossier : trois feuilles en pile, un trombone. */
function Dossier() {
  return (
    <>
      <Feuille x={-80} y={-80} l={136} h={162} r={-9} />
      <Feuille x={-56} y={-84} l={136} h={162} r={6} />
      <Feuille x={-68} y={-86} l={136} h={164} r={-1.5}>
        <Lignes x={18} y={26} largeurs={[72, 100, 88, 104, 60, 96, 78]} titre />
        <path d="M22 -12v36a7 7 0 0 0 14 0v-40a4.5 4.5 0 0 0-9 0v34" className="vg-action-trait" strokeWidth="3.5" />
      </Feuille>
    </>
  );
}

/** La garantie Visale : un contrat, son tampon de garantie, une signature. */
function Visale() {
  return (
    <Feuille x={-74} y={-86} l={148} h={168} r={-3}>
      <Lignes x={18} y={22} largeurs={[80, 112, 96, 108, 70]} titre />
      <g transform="rotate(-8 104 124)">
        <rect x={76} y={102} width={56} height={44} rx={5} className="vg-bleu-trait" strokeWidth="3" />
        <path d={coche(91, 113, 1.3)} className="vg-bleu-trait" strokeWidth="3.5" />
      </g>
      <path d="M18 138c8-16 14-16 16 0s8 12 14-2 10-10 22 4" className="vg-action-trait" strokeWidth="2.75" />
    </Feuille>
  );
}

/** Répondre à une annonce : l'annonce derrière, le message devant. */
function Message() {
  return (
    <>
      <Feuille x={-112} y={-84} l={130} h={154} r={-6}>
        <rect x={10} y={10} width={110} height={62} rx={3} className="vg-photo" />
        <path d="M44 56l21-20 21 20" className="vg-encre-trait" strokeWidth="2.5" />
        <Lignes x={12} y={86} largeurs={[86, 100, 64]} titre />
      </Feuille>
      <g transform="translate(-12 -14) rotate(3)">
        <Pose>
          <path d="M14 0h104a14 14 0 0 1 14 14v58a14 14 0 0 1-14 14H34l-20 16v-16a14 14 0 0 1-14-14V14A14 14 0 0 1 14 0z" className="vg-bleu" />
        </Pose>
        <Lignes x={18} y={20} largeurs={[84, 96, 60]} pas={14} surBleu />
        <rect x={96} y={52} width={26} height={26} rx={8} className="vg-action" />
        <path d="M103 65h12M110 59l6 6-6 6" className="vg-encre-trait" strokeWidth="2.25" />
      </g>
    </>
  );
}

/** Le dépôt de garantie : un reçu en euros, et la flèche du retour. */
function Depot() {
  const dents = Array.from({ length: 10 }, (_, i) => `L${124 - (i + 0.5) * 12.4} ${i % 2 ? 152 : 144}L${124 - (i + 1) * 12.4} ${i % 2 ? 144 : 152}`).join("");
  const recu = `M4 0H120a4 4 0 0 1 4 4V152${dents}V4a4 4 0 0 1 4-4z`;
  return (
    <>
      <g transform="translate(-86 -82) rotate(-4 62 76)">
        <Pose>
          <path d={recu} className="vg-feuille" />
        </Pose>
        <text x={62} y={82} textAnchor="middle" className="vg-glyphe">
          €
        </text>
        <Lignes x={22} y={104} largeurs={[80, 60, 72]} pas={11} />
      </g>
      <path d="M50-56c46 6 62 62 26 98" className="vg-action-trait" strokeWidth="4" />
      <path d="M90 36l-14 6 2-15" className="vg-action-trait" strokeWidth="4" />
    </>
  );
}

/** Le garant et la caution : deux engagements liés. */
function Garant() {
  return (
    <>
      <Feuille x={-116} y={-74} l={112} h={144} r={-5}>
        <Lignes x={14} y={20} largeurs={[60, 84, 72, 80, 50]} titre />
      </Feuille>
      <Feuille x={4} y={-82} l={112} h={144} r={4}>
        <Lignes x={14} y={20} largeurs={[54, 84, 76, 64]} titre />
        <path d="M14 116c8-16 14-16 16 0s8 12 14-2 10-10 22 4" className="vg-encre-trait" strokeWidth="2.5" />
      </Feuille>
      <rect x={-24} y={-16} width={28} height={18} rx={9} className="vg-action-trait" strokeWidth="3.5" />
      <rect x={-6} y={-16} width={28} height={18} rx={9} className="vg-action-trait" strokeWidth="3.5" />
    </>
  );
}

/** Le refus de dossier : un dossier, un tampon. */
function Refus() {
  return (
    <>
      <Feuille x={-84} y={-82} l={140} h={164} r={-7} />
      <Feuille x={-70} y={-86} l={146} h={166} r={-1}>
        <Lignes x={18} y={22} largeurs={[76, 110, 96, 104, 64, 88]} titre />
        <g transform="translate(92 120) rotate(-12)">
          <rect x={-40} y={-24} width={80} height={48} rx={5} className="vg-action-trait" strokeWidth="3.5" />
          <path d="M-12-11l24 22M12-11l-24 22" className="vg-action-trait" strokeWidth="4" />
        </g>
      </Feuille>
    </>
  );
}

/** Louer sans garant : la clé posée sur un dossier accepté. */
function Cles() {
  const cle = (
    <>
      <rect x={-34} y={-30} width={56} height={56} rx={17} className="vg-bleu" />
      <rect x={-15} y={-11} width={18} height={18} rx={6} className="vg-trou" />
      <rect x={20} y={-7} width={98} height={14} rx={3} className="vg-bleu" />
      <rect x={86} y={6} width={10} height={17} rx={2} className="vg-bleu" />
      <rect x={102} y={6} width={10} height={11} rx={2} className="vg-bleu" />
    </>
  );
  return (
    <>
      <Feuille x={-100} y={-82} l={124} h={150} r={-7}>
        <path d={coche(16, 14, 1.2)} className="vg-action-trait" strokeWidth="4" />
        <Lignes x={44} y={20} largeurs={[56]} />
        <Lignes x={16} y={46} largeurs={[92, 80, 98, 62, 86]} />
      </Feuille>
      <g transform="translate(-14 34) rotate(-24)">
        <Pose>{cle}</Pose>
      </g>
    </>
  );
}

/** L'état des lieux : le plan de la pièce, les murs vérifiés, un défaut noté. */
function Plan() {
  return (
    <Feuille x={-108} y={-84} l={216} h={164} r={-2}>
      <path d="M86 140H22V22H194V140H120" className="vg-encre-trait" strokeWidth="5" />
      <path d="M128 22V82" className="vg-encre-trait" strokeWidth="4" />
      <path d="M86 140V108A32 32 0 0 1 118 140" className="vg-encre-trait" strokeWidth="1.5" />
      <rect x={58} y={18} width={52} height={8} className="vg-feuille vg-fenetre" />
      <path d={coche(36, 34)} className="vg-bleu-trait" strokeWidth="3" />
      <path d={coche(164, 34)} className="vg-bleu-trait" strokeWidth="3" />
      <path d={coche(164, 112)} className="vg-bleu-trait" strokeWidth="3" />
      <rect x={44} y={98} width={14} height={14} rx={3} className="vg-action" />
    </Feuille>
  );
}

/** Le préavis : un calendrier, la période qui court, le jour du départ. */
function Calendrier() {
  const cases = Array.from({ length: 35 }, (_, i) => ({ x: 14 + (i % 7) * 23, y: 46 + Math.floor(i / 7) * 21, i }));
  return (
    <Feuille x={-94} y={-86} l={188} h={162} r={-3}>
      <path d="M4 0h180a4 4 0 0 1 4 4v28H0V4a4 4 0 0 1 4-4z" className="vg-bleu" />
      <rect x={40} y={-8} width={8} height={18} rx={3} className="vg-encre" />
      <rect x={140} y={-8} width={8} height={18} rx={3} className="vg-encre" />
      {cases.map((c) => (
        <rect
          key={c.i}
          x={c.x}
          y={c.y}
          width={19}
          height={17}
          rx={3}
          className={c.i === 31 ? "vg-action" : c.i >= 9 && c.i < 31 ? "vg-case-pleine" : "vg-case"}
        />
      ))}
    </Feuille>
  );
}

/** Outil : la liste du dossier, pièces cochées et pièce interdite barrée. */
function OutilListe() {
  const rangs = [92, 78, 104, 70, 86];
  return (
    <Feuille x={-90} y={-88} l={180} h={170} r={-2}>
      <Lignes x={18} y={20} largeurs={[88]} titre />
      {rangs.map((l, i) => {
        const y = 46 + i * 23;
        const interdit = i === 4;
        return (
          <g key={i}>
            <rect
              x={18}
              y={y - 5}
              width={15}
              height={15}
              rx={3}
              className={interdit ? "vg-action" : i < 3 ? "vg-bleu" : "vg-case-trait"}
              strokeWidth="2"
            />
            {i < 3 && <path d={coche(20.5, y - 3.5, 0.75)} className="vg-feuille-trait" strokeWidth="2.25" />}
            {interdit && <path d={`M21.5 ${y - 1.5}l8 8m0-8l-8 8`} className="vg-encre-trait" strokeWidth="2.25" />}
            <rect x={44} y={y} width={l} height={5} rx={2.5} className="vg-ligne" />
            {interdit && <rect x={40} y={y + 1} width={l + 8} height={3} rx={1.5} className="vg-action" />}
          </g>
        );
      })}
    </Feuille>
  );
}

/** Outil : le message, ses trois tons, le bouton d'envoi. */
function OutilMessage() {
  return (
    <>
      {[-112, -38, 36].map((x, i) => (
        <g key={x}>
          <rect x={x} y={-84} width={68} height={26} rx={13} className={i === 0 ? "vg-feuille" : "vg-puce"} strokeWidth="2" />
          <rect x={x + 16} y={-73} width={36} height={4} rx={2} className={i === 0 ? "vg-ligne-forte" : "vg-ligne-claire"} />
        </g>
      ))}
      <g transform="translate(-112 -42)">
        <Pose>
          <path d="M16 0h192a16 16 0 0 1 16 16v86a16 16 0 0 1-16 16H40l-22 18v-18h-2a16 16 0 0 1-16-16V16A16 16 0 0 1 16 0z" className="vg-bleu" />
        </Pose>
        <Lignes x={20} y={22} largeurs={[168, 184, 150, 96]} pas={15} surBleu />
        <rect x={180} y={76} width={30} height={30} rx={9} className="vg-action" />
        <path d="M188 91h14M196 84l7 7-7 7" className="vg-encre-trait" strokeWidth="2.5" />
      </g>
    </>
  );
}

/** Outil : les ressources face au loyer, le repère des trois fois. */
function OutilSalaire() {
  const seg = 62;
  return (
    <g transform="rotate(-2)">
      <Pose>
        <rect x={-124} y={-76} width={248} height={150} rx={8} className="vg-panneau" />
      </Pose>
      <rect x={-104} y={-56} width={70} height={4} rx={2} className="vg-ligne-claire" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={-104 + i * (seg + 6)} y={-42} width={seg} height={26} rx={4} className="vg-bleu" />
      ))}
      <rect x={-104} y={6} width={52} height={4} rx={2} className="vg-ligne-claire" />
      <rect x={-104} y={20} width={seg} height={26} rx={4} className="vg-action" />
      <rect x={-104 + seg + 6} y={20} width={seg * 2 + 6} height={26} rx={4} className="vg-piste" strokeWidth="1.5" />
      {[1, 2].map((i) => (
        <path key={i} d={`M${-104 + i * (seg + 6) - 3} -48V54`} className="vg-repere" strokeWidth="1.5" />
      ))}
    </g>
  );
}

const MOTIFS: Record<Motif, () => ReactNode> = {
  dossier: Dossier,
  visale: Visale,
  message: Message,
  depot: Depot,
  garant: Garant,
  refus: Refus,
  cles: Cles,
  plan: Plan,
  calendrier: Calendrier,
  "outil-liste": OutilListe,
  "outil-message": OutilMessage,
  "outil-salaire": OutilSalaire,
};
