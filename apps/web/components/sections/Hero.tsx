import Link from "next/link";
import { ANNONCE_PIECE, CHIFFRES, HERO } from "@/lib/content";
import { DECOMPOSITION, MESSAGES } from "@/lib/exemples";
import { PleinCadre } from "@/components/layout/coquilles/PleinCadre";

/**
 * L'accueil, coquille A, dans la composition de la référence : le titre au
 * centre, le rideau de lumière en dessous, deux chiffres de chaque côté, un
 * bouton rond au sommet du rideau, et trois panneaux produit en perspective
 * qui mordent sur la section suivante. Pas de photographie : les trois
 * panneaux sont la matière du produit, une annonce lue, une note décomposée,
 * un message prêt.
 *
 * Le titre finit en italique, comme « of Thought. » sur la référence : c'est
 * la seule italique de titre du site, elle marque la promesse.
 */
export function Hero() {
  const [c1, c2, c3, c4] = CHIFFRES;
  return (
    <PleinCadre
      gauche={
        <dl className="space-y-6">
          <Chiffre valeur={c1.valeur} unite={c1.unite} detail={c1.detail} />
          <Chiffre valeur={c2.valeur} unite={c2.unite} detail={c2.detail} />
        </dl>
      }
      droite={
        <dl className="space-y-6">
          <Chiffre
            valeur={c3.valeur}
            unite={c3.unite}
            detail={c3.detail}
            droite
          />
          <Chiffre
            valeur={c4.valeur}
            unite={c4.unite}
            detail={c4.detail}
            droite
          />
        </dl>
      }
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
        className="entree champ text-blue-clair"
        style={{ "--rang": 0 } as React.CSSProperties}
      >
        {HERO.eyebrow}
      </p>
      <h1
        className="entree titre mx-auto mt-6 max-w-[14ch] text-[clamp(2.75rem,1.4rem+5.6vw,5.75rem)] text-ink"
        style={{ "--rang": 1 } as React.CSSProperties}
      >
        {HERO.titleLead}{" "}
        <em className="font-normal italic">{HERO.titleTail}</em>
      </h1>
      <p
        className="entree mx-auto mt-6 max-w-[32rem] font-mono text-[13px] leading-relaxed text-ink-2 sm:text-sm"
        style={{ "--rang": 2 } as React.CSSProperties}
      >
        {HERO.panneau}
      </p>
      {/* Le bouton rond, posé au sommet du rideau comme sur la référence ;
          l'inscription reste à portée, en dessous, et dans le masthead. */}
      <div
        className="entree mt-10 flex flex-col items-center gap-5"
        style={{ "--rang": 3 } as React.CSSProperties}
      >
        <Link href="/app?demo=1" className="bouton-rond champ">
          Voir
          <br />
          la démo
        </Link>
        <a href="#inscription" className="lien text-[14px] text-ink-2">
          Être prévenu du lancement
        </a>
      </div>
    </PleinCadre>
  );
}

/** Un chiffre clé : la valeur en Fraunces orange, l'unité en champ, le détail en marge. */
function Chiffre({
  valeur,
  unite,
  detail,
  droite = false,
}: {
  valeur: string;
  unite: string;
  detail: string;
  droite?: boolean;
}) {
  return (
    <div className={droite ? "text-right" : ""}>
      <dt className="sr-only">{unite}</dt>
      <dd className="titre text-[2.5rem] text-action lg:text-[2.75rem]">
        {valeur}
      </dd>
      <dd className="champ mt-1 text-ink">{unite}</dd>
      <dd className="marge mt-1 hidden lg:block">{detail}</dd>
    </div>
  );
}

/** Cadre commun des trois panneaux : une vitre arrondie, la légende est au-dessus. */
function Panneau({
  children,
  papier = false,
}: {
  children: React.ReactNode;
  papier?: boolean;
}) {
  return (
    <article
      className={
        papier
          ? "monde-papier h-full rounded-[0.75rem] border border-rule bg-card p-5 text-ink"
          : "h-full rounded-[0.75rem] border border-white/10 bg-night-2/75 p-5 text-night-ink backdrop-blur-md"
      }
    >
      {children}
    </article>
  );
}

/** L'annonce lue : une feuille de papier posée sur la nuit. */
function PanneauAnnonce() {
  const a = ANNONCE_PIECE;
  return (
    <Panneau papier>
      <p className="text-[15px] leading-snug font-medium">{a.titre}</p>
      <p className="marge mt-1">
        {a.auteur} · {a.ville} · {a.publie}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {a.extraits.slice(0, 4).map((e) => (
          <div key={e.champ}>
            <dt className="champ text-ink-3">{e.champ}</dt>
            <dd className="mt-0.5 text-[14px] font-medium">{e.valeur}</dd>
          </div>
        ))}
      </dl>
    </Panneau>
  );
}

/** La note, et ce qui la compose : l'instrument, en version courte. */
function PanneauNote() {
  const { note, lignes } = DECOMPOSITION;
  const max = Math.max(...lignes.map((l) => l.delta));
  const rayon = 26;
  const perimetre = 2 * Math.PI * rayon;
  return (
    <Panneau>
      <div className="flex items-center gap-5">
        <div className="relative size-16 shrink-0">
          <svg viewBox="0 0 64 64" className="size-full -rotate-90" aria-hidden>
            <circle
              cx="32"
              cy="32"
              r={rayon}
              fill="none"
              stroke="var(--color-night-rule)"
              strokeWidth="2"
            />
            <circle
              cx="32"
              cy="32"
              r={rayon}
              fill="none"
              stroke="var(--color-action)"
              strokeWidth="2"
              strokeDasharray={perimetre}
              strokeDashoffset={perimetre * (1 - note / 100)}
            />
          </svg>
          <p className="absolute inset-0 flex items-center justify-center font-mono text-xl tabular-nums">
            {note}
            <span className="sr-only"> sur 100</span>
          </p>
        </div>
        <dl className="min-w-0 flex-1">
          {lignes.slice(0, 4).map((l) => (
            <div
              key={l.critere}
              className="grid grid-cols-[1fr_2.5rem] items-center gap-x-3 py-1"
            >
              <dt className="champ truncate text-night-ink-2">{l.critere}</dt>
              <dd className="text-right font-mono text-[13px] tabular-nums">
                +{l.delta}
              </dd>
              <dd className="col-span-2 h-px bg-night-rule">
                <span
                  className="block h-full bg-blue"
                  style={{ width: `${(l.delta / max) * 100}%` }}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Panneau>
  );
}

/** Le message préparé : les premières lignes du brouillon réel. */
function PanneauMessage() {
  const m = MESSAGES[0];
  const lignes = m.texte.split("\n\n").slice(0, 3);
  return (
    <Panneau>
      <div className="space-y-2 text-[13px] leading-relaxed text-night-ink-2">
        {lignes.map((l) => (
          <p key={l} className="line-clamp-2">
            {l}
          </p>
        ))}
      </div>
      <p className="champ mt-4 text-blue-clair">
        Ton {m.ton.toLowerCase()} · vous l&apos;envoyez
      </p>
    </Panneau>
  );
}
