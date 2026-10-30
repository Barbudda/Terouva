import Link from "next/link";
import { ANNONCE_PIECE, CHIFFRES, HERO } from "@/lib/content";
import { DECOMPOSITION } from "@/lib/exemples";
import { PleinCadre } from "@/components/layout/coquilles/PleinCadre";

/**
 * L'accueil, coquille A.
 *
 * Le visuel plein cadre est fait de la matière du produit : une annonce de
 * location affichée en grand, légèrement inclinée, partiellement sortie du
 * cadre à droite, avec ce que Terouva en extrait souligné par des filets et
 * des libellés en `.champ`. Ce n'est pas une décoration, c'est la pièce à
 * conviction. Pas de photographie : trois professionnels souriants en photo
 * de stock, c'est le signal n°37.
 *
 * Par-dessus, en bas à gauche, le panneau chevauchant : la mention, le titre,
 * trois lignes, et le bouton magenta, un seul. À sa droite, une vignette
 * carrée : la note de l'annonce, sur fond nuit, premier signe de l'instrument
 * qu'on trouvera plus bas. Sous le visuel, les chiffres clés deviennent une
 * ligne de base sur un filet fort, en trois cellules inégales.
 */
export function Hero() {
  return (
    <PleinCadre
      visuel={<AnnoncePiece />}
      vignette={<Vignette />}
      ligneDeBase={<LigneDeBase />}
    >
      <p className="champ text-ink-3">{HERO.mention}</p>
      <h1 className="titre mt-4 text-[clamp(2.5rem,1.2rem+5.2vw,5.25rem)] text-ink">
        {HERO.titleLead} {HERO.titleTail}
      </h1>
      <p className="marge mt-5 max-w-[34rem] text-ink-2">{HERO.panneau}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href="#inscription" className="bouton bouton--accent">
          Être prévenu du lancement
        </a>
        <Link href="/outils/message-de-candidature" className="lien text-[15px]">
          Ou écrire votre message de candidature, gratuit
        </Link>
      </div>
    </PleinCadre>
  );
}

/**
 * La note de l'annonce vedette, sur un carré nuit. Le seul morceau du monde
 * nuit au-dessus de la ligne de flottaison : il annonce l'instrument.
 */
function Vignette() {
  return (
    <div className="nuit flex size-28 flex-col justify-between bg-night p-3 text-night-ink lg:size-32">
      <span className="champ text-night-ink-2">Note</span>
      <span className="flex items-baseline gap-1">
        <span className="font-mono text-[2.5rem] leading-none tabular-nums lg:text-[3rem]">
          {DECOMPOSITION.note}
        </span>
        <span className="champ text-night-ink-2">/100</span>
      </span>
    </div>
  );
}

/**
 * L'annonce, composée en HTML. Une feuille claire posée sur le papier teinté,
 * inclinée de deux degrés, qui sort du cadre à droite. À sa gauche, la
 * colonne des extraits : ce que l'outil lit, dans l'ordre où il le lit, et
 * un filet qui relie chaque libellé à la feuille.
 */
function AnnoncePiece() {
  const a = ANNONCE_PIECE;
  return (
    <div className="cadre relative h-full min-h-[inherit]" aria-label="Une annonce de location, et ce que Terouva en lit">
      {/* Les extraits. Sur petit écran ils passent au-dessus de la feuille. */}
      <dl className="relative z-10 grid max-w-[22rem] gap-y-3 pt-8 lg:absolute lg:top-[14%] lg:left-[clamp(1rem,0.5rem+2vw,3.5rem)] lg:max-w-[26rem] lg:gap-y-4 lg:pt-0">
        {a.extraits.map((e, i) => (
          <div key={e.champ} className="flex items-baseline gap-3">
            <dt className="champ w-[7.5rem] shrink-0 text-ink-3 lg:w-[8.5rem]">{e.champ}</dt>
            <dd className="champ shrink-0 text-ink">{e.valeur}</dd>
            <span
              aria-hidden
              className="filet-trace hidden h-px flex-1 self-center bg-rule-fort lg:block"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          </div>
        ))}
      </dl>

      {/* La feuille. `rotate` et `translate` séparés : l'inclinaison reste
          lisible dans le code et la feuille garde ses bords nets. */}
      <article
        className="relative mt-8 ml-auto w-[min(40rem,96%)] origin-top-left rotate-[-2deg] border border-rule bg-card p-6 text-ink sm:p-8 lg:absolute lg:top-[18%] lg:right-[-6%] lg:mt-0 lg:ml-0 lg:w-[46rem] lg:p-10"
        aria-hidden
      >
        <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="text-[1.375rem] leading-tight font-medium sm:text-2xl">{a.titre}</h2>
          <p className="text-[1.75rem] leading-none font-medium tabular-nums sm:text-[2rem]">
            {a.loyer}&nbsp;€ <span className="text-base text-ink-3">CC</span>
          </p>
        </header>

        <p className="marge mt-2 text-ink-3">
          {a.auteur} · {a.ville} · {a.publie}
        </p>

        <div className="mt-6 grid grid-cols-[1fr_1fr] gap-x-6 gap-y-3 border-y border-rule py-4 text-[15px] sm:grid-cols-4">
          <Attribut nom="Surface" valeur={`${a.surface} m²`} />
          <Attribut nom="Pièces" valeur={`${a.pieces}`} />
          <Attribut nom="Étage" valeur={a.etage} />
          <Attribut nom="Charges" valeur={`${a.charges} € incluses`} />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-[9rem_1fr]">
          {/* Pas d'image : un emplacement qui dit ce qu'il contiendrait. */}
          <div className="champ hidden aspect-[4/3] items-end border border-rule bg-paper-2 p-3 text-ink-3 sm:flex">
            Photos · {a.photos}
          </div>
          <div className="space-y-3 text-[15px] leading-relaxed text-ink-2">
            {a.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function Attribut({ nom, valeur }: { nom: string; valeur: string }) {
  return (
    <div>
      <p className="champ text-ink-3">{nom}</p>
      <p className="mt-1 font-medium">{valeur}</p>
    </div>
  );
}

/**
 * Trois faits sur le produit, aucun n'est une statistique d'usage. Sur un
 * filet fort, en trois cellules inégales : 5, 4 et 3 colonnes.
 */
function LigneDeBase() {
  const cellules = ["lg:col-span-5", "lg:col-span-4", "lg:col-span-3"];
  return (
    <dl className="grille mt-demi-pas">
      <span aria-hidden className="filet-trace col-span-12 block h-px bg-rule-fort" />
      {CHIFFRES.slice(0, 3).map((c, i) => (
        <div key={c.unite} className={`col-span-12 border-rule py-5 sm:col-span-4 ${cellules[i]}`}>
          <dt className="sr-only">{c.unite}</dt>
          <dd className="flex items-baseline gap-3">
            <span className="titre text-titre-2 text-ink">{c.valeur}</span>
            <span className="champ text-ink">{c.unite}</span>
          </dd>
          <dd className="marge mt-1.5">{c.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
