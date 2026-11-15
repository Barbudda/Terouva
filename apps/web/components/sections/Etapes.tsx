"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { PARCOURS } from "@/lib/content";
import { DECOMPOSITION, EXEMPLES_ACCUEIL } from "@/lib/exemples";
import { TitreSection } from "@/components/ui/TitreSection";

/** L'annonce de la démonstration que suivent les quatre écrans. */
const { annonce: A, message: M } = EXEMPLES_ACCUEIL[0];

const ECRANS = [EcranAnnonce, EcranNote, EcranMessage, EcranEnvoi];

/**
 * Le récit produit, vague 2 du pôle Design (15 novembre). Il remplace le rail
 * du parcours et la plaque des fonctions.
 *
 * Troisième version, après le retour d'Hugo (« c'est moche », page trop
 * longue) : la section tient dans un écran. Quatre onglets côte à côte, à la
 * manière du sélecteur de FanClaw, et une seule grande scène dessous qui
 * montre l'interface de l'étape choisie, avec son détail.
 *
 * Les onglets avancent seuls : la barre de progression de l'onglet actif est
 * une animation CSS de 5 s, et sa fin fait passer au suivant. Survol, focus
 * ou section hors de l'écran la mettent en pause ; un clic arrête la lecture
 * pour de bon. En mouvement réduit, la feuille retire l'animation : sans fin
 * d'animation, rien n'avance.
 */
export function Etapes() {
  const etapes = PARCOURS.etapes;
  const [actif, setActif] = useState(0);
  const [arrete, setArrete] = useState(false);
  const [survol, setSurvol] = useState(false);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  const rangee = useRef<HTMLDivElement>(null);
  const onglets = useRef<(HTMLButtonElement | null)[]>([]);

  // Hors de l'écran, la lecture attend : on ne veut pas arriver sur l'étape 3.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Sur téléphone, la rangée défile pour garder l'onglet actif visible, sans
  // faire bouger la page (pas de scrollIntoView).
  useEffect(() => {
    const r = rangee.current;
    const o = onglets.current[actif];
    if (!r || !o || r.scrollWidth <= r.clientWidth) return;
    const decalage = o.getBoundingClientRect().left - r.getBoundingClientRect().left;
    r.scrollTo({ left: r.scrollLeft + decalage - 16, behavior: "smooth" });
  }, [actif]);

  const choisir = (i: number, focus = false) => {
    setActif(i);
    setArrete(true);
    if (focus) onglets.current[i]?.focus();
  };

  const clavier = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = etapes.length;
    const cible =
      e.key === "ArrowRight" ? (i + 1) % n
      : e.key === "ArrowLeft" ? (i - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : null;
    if (cible === null) return;
    e.preventDefault();
    choisir(cible, true);
  };

  const enPause = arrete || survol || !visible;
  const Ecran = ECRANS[actif];

  return (
    <section
      ref={section}
      id="fonctions"
      aria-labelledby="etapes-titre"
      className="etapes monde-papier scroll-mt-20"
      data-pause={enPause || undefined}
      data-arrete={arrete || undefined}
    >
      <div className="cadre">
        <TitreSection
          id="etapes-titre"
          etiquette="Ce que fait Terouva"
          titre="De l'alerte à votre réponse,"
          accent="sans y passer la soirée."
        />

        <div
          className="etapes-corps"
          onMouseEnter={() => setSurvol(true)}
          onMouseLeave={() => setSurvol(false)}
          onFocus={() => setSurvol(true)}
          onBlur={() => setSurvol(false)}
        >
          <div ref={rangee} role="tablist" aria-label="Les quatre étapes" className="etapes-onglets">
            {etapes.map((etape, i) => (
              <button
                key={etape.nom}
                ref={(el) => {
                  onglets.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`etape-onglet-${i}`}
                aria-selected={i === actif}
                aria-controls="etape-scene"
                tabIndex={i === actif ? 0 : -1}
                className="etape-onglet"
                onClick={() => choisir(i)}
                onKeyDown={(e) => clavier(e, i)}
              >
                <span className="etape-onglet-num" aria-hidden>
                  {i + 1}
                </span>
                <span className="etape-onglet-titre">{etape.nom}</span>
                {/* Une phrase par étape : la seconde de la dernière est coupée (journal v2-etapes). */}
                <span className="etape-onglet-phrase">{etape.texte.split(". ")[0].replace(/\.?$/, ".")}</span>
                <span className="etape-onglet-piste" aria-hidden>
                  {i === actif && (
                    <span
                      key={actif}
                      className="etape-onglet-barre"
                      onAnimationEnd={() => setActif((actif + 1) % etapes.length)}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div
            id="etape-scene"
            role="tabpanel"
            aria-labelledby={`etape-onglet-${actif}`}
            className="etape-scene"
            data-etape={actif}
          >
            <div key={actif} className="etape-scene-entree">
              <Ecran />
            </div>
          </div>
        </div>
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
          <p className="annonce-site-lieu ecran-annonce-lieu">
            {A.surface} m² · {A.ville}
          </p>
          <p className="annonce-site-badge">{A.auteur}</p>
        </div>
      </div>
    </article>
  );
}

/** La note et ce qui la fait : l'anneau, puis les règles qui ont compté. */
function EcranNote() {
  const rayon = 26;
  const perimetre = 2 * Math.PI * rayon;
  return (
    <article className="etape-ecran ecran-note">
      <div className="ecran-note-tete">
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
      </div>
      <ul className="ecran-note-lignes">
        {DECOMPOSITION.lignes.map((l) => (
          <li key={l.critere}>
            <span className="ecran-note-critere">{l.critere}</span>
            <span className="ecran-note-detail">{l.detail}</span>
            <span className="ecran-note-delta">+{l.delta}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Le message prêt : le brouillon réel, en entier. */
function EcranMessage() {
  const paragraphes = M.texte.split("\n\n");
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

/** L'envoi : une coche, une phrase, l'annonce à laquelle on a répondu. */
function EcranEnvoi() {
  return (
    <article className="etape-ecran ecran-envoi">
      <span className="ecran-envoi-coche" aria-hidden>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-8">
          <path d="M3 8.5l3 3 7-7" />
        </svg>
      </span>
      <p className="ecran-envoi-titre">Candidature envoyée</p>
      <div data-site="leboncoin" className="annonce-site ecran-envoi-annonce">
        <p className="annonce-site-tete">
          <span className="annonce-site-nom">Leboncoin</span>
          <span>{A.publie}</span>
        </p>
        <p className="ecran-envoi-annonce-titre">{A.titre}</p>
        <p className="ecran-envoi-annonce-prix">
          {A.prix} €<span className="annonce-site-mois"> / mois</span>
          <span className="ecran-envoi-annonce-ville"> · {A.ville}</span>
        </p>
      </div>
    </article>
  );
}
