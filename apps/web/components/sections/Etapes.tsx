import type { CSSProperties } from "react";
import { PARCOURS } from "@/lib/content";
import { EXEMPLES_ACCUEIL } from "@/lib/exemples";
import { TitreSection } from "@/components/ui/TitreSection";

/** L'annonce de la démonstration que suivent les quatre écrans. */
const { annonce: A, message: M } = EXEMPLES_ACCUEIL[0];

/**
 * La lumière de chaque scène : le bleu pour ce que Terouva trouve et trie,
 * l'orange pour ce que vous faites. Pas de mélange entre les deux : en oklch,
 * le chemin du bleu à l'orange passe par le violet.
 */
const TEINTES = [
  "var(--color-blue-clair)",
  "var(--color-blue-clair)",
  "var(--color-action)",
  "var(--color-action)",
];

const ECRANS = [EcranAnnonce, EcranNote, EcranMessage, EcranEnvoi];

/**
 * Le récit produit, vague 2 du pôle Design (15 novembre). Il remplace le rail
 * du parcours et la plaque des fonctions, qui disaient la même chose en deux
 * fois et en petit. À la manière de Rushlot : une grande carte par étape,
 * l'une sous l'autre ; à gauche un titre court et une phrase, à droite
 * l'interface, sur plus de la moitié de la carte.
 *
 * Retour des deux critiques (même jour) : un seul élément par écran, rien qui
 * demande une légende (ni histogramme, ni barre d'avancement), pas de
 * capitales en chasse fixe. Les écrans sont donc dessinés ici, en grand, et
 * non plus repris des panneaux du haut de page, qui restent faits pour 13 px.
 * Tous racontent la première annonce de la démonstration (`lib/exemples.ts`).
 *
 * Le bouton « Être prévenu » revient une fois, à la fin du récit (règle 8 de
 * docs/design/REFERENCE.md).
 */
export function Etapes() {
  return (
    <section id="fonctions" aria-labelledby="etapes-titre" className="etapes monde-papier scroll-mt-20">
      <div className="cadre">
        <TitreSection
          id="etapes-titre"
          etiquette="Ce que fait Terouva"
          titre="De l'alerte à votre réponse,"
          accent="sans y passer la soirée."
        />

        <ol className="etapes-liste">
          {PARCOURS.etapes.map((etape, i) => {
            const Ecran = ECRANS[i];
            return (
              <li key={etape.nom} className="etape" style={{ "--teinte": TEINTES[i] } as CSSProperties}>
                <div className="etape-texte">
                  <h3 className="etape-titre">{etape.nom}</h3>
                  {/* Une phrase par étape : la seconde de la dernière est coupée (journal v2-etapes). */}
                  <p className="etape-phrase">{etape.texte.split(". ")[0].replace(/\.?$/, ".")}</p>
                </div>
                <div className="etape-scene">
                  <Ecran />
                </div>
              </li>
            );
          })}
        </ol>

        <p className="etapes-fin">
          <a href="#inscription" className="bouton bouton--accent h-14 px-8 text-[17px]">
            Être prévenu
          </a>
        </p>
      </div>
    </section>
  );
}

/** L'annonce telle que le site la publie : vignette dessinée, titre, loyer, vendeur. */
function EcranAnnonce() {
  return (
    <article data-site="leboncoin" className="annonce-site etape-ecran ecran-annonce">
      <p className="annonce-site-tete">
        <span className="annonce-site-nom">Leboncoin</span>
        <span>{A.publie}</span>
      </p>
      <div className="ecran-annonce-corps">
        <div className="annonce-site-vignette ecran-annonce-vignette" aria-hidden>
          <svg viewBox="0 0 48 48" fill="none" className="size-14">
            <rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M24 8v32M10 22h28" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="ecran-annonce-titre">{A.titre}</p>
          <p className="ecran-annonce-prix">
            {A.prix} €<span className="annonce-site-mois"> / mois</span>
          </p>
          <p className="annonce-site-badge">{A.auteur}</p>
        </div>
      </div>
      <p className="annonce-site-lieu ecran-annonce-lieu">
        {A.surface} m² · {A.ville}
      </p>
    </article>
  );
}

/** La note : un anneau et un chiffre, ce qui se comprend sans légende. */
function EcranNote() {
  const rayon = 26;
  const perimetre = 2 * Math.PI * rayon;
  return (
    <article className="etape-ecran ecran-note">
      <div className="ecran-note-anneau">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90" aria-hidden>
          <circle cx="32" cy="32" r={rayon} fill="none" stroke="var(--color-rule)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r={rayon}
            fill="none"
            stroke="var(--color-action)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={perimetre}
            strokeDashoffset={perimetre * (1 - A.note / 100)}
          />
        </svg>
        <p className="ecran-note-chiffre">
          {A.note}
          <span className="sr-only"> sur 100</span>
        </p>
      </div>
      <div className="min-w-0">
        <p className="ecran-note-titre">{A.titre}</p>
        <p className="ecran-note-pour">{A.pour}</p>
      </div>
    </article>
  );
}

/** Le message prêt : les premières lignes du brouillon réel. */
function EcranMessage() {
  const paragraphes = M.texte.split("\n\n").slice(0, 3);
  return (
    <article className="etape-ecran ecran-message">
      <p className="ecran-message-ton">Ton {M.ton.toLowerCase()}</p>
      <div className="ecran-message-texte">
        {paragraphes.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}

/** L'envoi : une coche, une phrase, l'annonce. */
function EcranEnvoi() {
  return (
    <article className="etape-ecran ecran-envoi">
      <span className="ecran-envoi-coche" aria-hidden>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-7">
          <path d="M3 8.5l3 3 7-7" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="ecran-envoi-titre">Candidature envoyée</p>
        <p className="ecran-envoi-annonce">{A.titre}</p>
      </div>
    </article>
  );
}
