"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Lecteur de l'animation de présentation.
 *
 * Trois règles tenues ici :
 *
 * 1. **Rien ne démarre sans qu'on le demande.** Pas de lecture automatique, pas
 *    de plein écran imposé. On voit une affiche et un bouton ; le reste n'arrive
 *    que si on clique.
 * 2. **Rien n'est téléchargé avant.** `preload="none"` : le fichier d'un
 *    mégaoctet ne part qu'au premier clic, donc il ne pèse sur le chargement de
 *    personne.
 * 3. **Une fois lancée, elle prend tout l'écran.** Une vidéo qui occupe la
 *    moitié de la page, avec le reste du site autour, se regarde mal. Elle
 *    s'ouvre donc par-dessus, sur un fond sombre, et se referme à l'échappement
 *    ou en cliquant à côté.
 *
 * La transition passe par l'API View Transition quand le navigateur la connaît :
 * la vignette grandit jusqu'au plein écran en un seul mouvement, au lieu de
 * disparaître d'un coup pour réapparaître ailleurs. Ailleurs, un simple fondu,
 * et personne ne voit la différence.
 *
 * L'animation est muette : il n'y a pas de piste sonore, donc pas de bouton de
 * son. On le dit en toutes lettres plutôt que de laisser quelqu'un chercher.
 */
const CLE_REPRISE = "terouva:promo:seconde";
const DUREE = 29;

type Transition = { finished: Promise<void> };
type DocumentAvecTransition = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => Transition;
};

/** Enveloppe le changement d'état dans une transition, quand c'est possible. */
function avecTransition(changer: () => void) {
  const d = document as DocumentAvecTransition;
  const anime = window.matchMedia("(prefers-reduced-motion: reduce)").matches === false;
  if (!anime || typeof d.startViewTransition !== "function") {
    changer();
    return;
  }
  d.startViewTransition(changer);
}

export function Video() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <section id="video" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="En 29 secondes"
          lead="Si vous préférez"
          tail="qu'on vous montre."
          align="center"
          className="monte max-w-2xl"
        >
          Une animation courte, sans commentaire et sans son. Elle ne se lance que si vous le
          demandez, et elle s&apos;ouvre en grand.
        </SectionHeading>

        <figure className="monte mt-10">
          <button
            type="button"
            onClick={() => avecTransition(() => setOuvert(true))}
            aria-label="Regarder la présentation de Terouva, 29 secondes, sans son"
            className="group relative block w-full overflow-hidden rounded-xl border border-rule bg-ash"
            style={{ viewTransitionName: ouvert ? "none" : "promo" }}
          >
            {/* Image fixe : tant qu'on ne clique pas, la vidéo n'est pas chargée. */}
            <img
              src="/promo/affiche.jpg"
              alt="Terouva classe quatre annonces de location et leur donne une note sur cent."
              width={1280}
              height={720}
              className="block aspect-video w-full object-cover"
            />

            <span className="absolute inset-0 grid place-items-center bg-ink/[0.06] transition-colors group-hover:bg-ink/[0.12]">
              <span className="flex flex-col items-center gap-4">
                <span className="grid size-20 place-items-center rounded-full bg-accent text-white shadow-accent transition-transform duration-200 group-hover:scale-105 sm:size-24">
                  <IconeLecture />
                </span>
                <span className="rounded-md bg-ink/85 px-4 py-2 text-[15px] font-semibold text-white backdrop-blur-sm">
                  Regarder · 29 s, sans son
                </span>
              </span>
            </span>
          </button>

          <figcaption className="mt-3 text-center text-sm text-ink-3">
            Les annonces, les notes et le message sont ceux que produit l&apos;outil.
          </figcaption>
        </figure>
      </div>

      {ouvert && <PleinEcran fermer={() => avecTransition(() => setOuvert(false))} />}
    </section>
  );
}

/** La vidéo par-dessus la page, sur fond sombre. */
function PleinEcran({ fermer }: { fermer: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const boite = useRef<HTMLDivElement>(null);
  const [enLecture, setEnLecture] = useState(false);
  const [progression, setProgression] = useState(0);
  const [duree, setDuree] = useState(DUREE);
  const [finie, setFinie] = useState(false);
  const [monte, setMonte] = useState(false);

  useEffect(() => setMonte(true), []);

  // Reprise : on retrouve où on s'était arrêté, mais jamais à moins de deux
  // secondes de la fin — sinon on relance sur le générique.
  const reprendre = useCallback(() => {
    const v = video.current;
    if (!v) return;
    try {
      const t = Number(localStorage.getItem(CLE_REPRISE));
      if (t > 1 && t < (v.duration || DUREE) - 2) v.currentTime = t;
    } catch {
      /* navigation privée : on repart du début. */
    }
  }, []);

  // Pendant la lecture, la page derrière ne doit pas défiler.
  useEffect(() => {
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        basculer();
      }
    };
    document.addEventListener("keydown", touche);
    boite.current?.focus();
    return () => {
      document.body.style.overflow = avant;
      document.removeEventListener("keydown", touche);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    reprendre();
    void v.play();

    const maj = () => {
      setProgression(v.duration ? v.currentTime / v.duration : 0);
      try {
        localStorage.setItem(CLE_REPRISE, String(v.currentTime));
      } catch {
        /* sans importance */
      }
    };
    const chargee = () => setDuree(v.duration || DUREE);
    const lit = () => setEnLecture(true);
    const pause = () => setEnLecture(false);
    const finit = () => {
      setFinie(true);
      setEnLecture(false);
      try {
        localStorage.removeItem(CLE_REPRISE);
      } catch {
        /* sans importance */
      }
    };
    v.addEventListener("timeupdate", maj);
    v.addEventListener("loadedmetadata", chargee);
    v.addEventListener("play", lit);
    v.addEventListener("pause", pause);
    v.addEventListener("ended", finit);
    return () => {
      v.removeEventListener("timeupdate", maj);
      v.removeEventListener("loadedmetadata", chargee);
      v.removeEventListener("play", lit);
      v.removeEventListener("pause", pause);
      v.removeEventListener("ended", finit);
    };
  }, [reprendre]);

  const basculer = () => {
    const v = video.current;
    if (!v) return;
    if (finie) {
      v.currentTime = 0;
      setFinie(false);
      void v.play();
      return;
    }
    if (v.paused) void v.play();
    else v.pause();
  };

  const deplacer = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = video.current;
    if (!v) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * (v.duration || DUREE);
    setFinie(false);
  };

  const restant = Math.max(0, Math.ceil(duree - duree * progression));

  const contenu = (
    <div
      ref={boite}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Présentation de Terouva"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 outline-none sm:p-8"
    >
      {/* Fond : on clique à côté pour fermer. */}
      <div
        onClick={fermer}
        className={`absolute inset-0 bg-night/92 backdrop-blur-md transition-opacity duration-300 ${
          monte ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className="relative w-full max-w-[min(100%,calc((100vh-7rem)*16/9))]"
        style={{ viewTransitionName: "promo" }}
      >
        <div className="relative overflow-hidden rounded-xl bg-paper shadow-2xl">
          <video
            ref={video}
            className="block aspect-video w-full"
            poster="/promo/affiche.jpg"
            preload="auto"
            playsInline
            muted
            onClick={basculer}
          >
            <source src="/promo/terouva.mp4" type="video/mp4" />
          </video>

          {finie && (
            <button
              type="button"
              onClick={basculer}
              className="absolute inset-0 grid place-items-center bg-ink/25"
            >
              <span className="grid size-20 place-items-center rounded-full bg-accent text-white shadow-accent">
                <IconeRejouer />
              </span>
            </button>
          )}

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-paper via-paper/90 to-transparent px-4 pt-12 pb-4 sm:px-5">
            <button
              type="button"
              onClick={basculer}
              aria-label={enLecture ? "Mettre en pause" : "Reprendre"}
              className="grid size-11 shrink-0 place-items-center rounded-md bg-ink text-white transition-colors hover:bg-night-2"
            >
              {enLecture ? <IconePause /> : <IconeLecture petite />}
            </button>

            <div
              onClick={deplacer}
              role="progressbar"
              aria-label="Progression"
              aria-valuenow={Math.round(progression * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2 flex-1 cursor-pointer rounded-full bg-ink/15"
            >
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${progression * 100}%` }}
              />
            </div>

            <span className="tabular w-12 shrink-0 text-right text-sm font-semibold text-ink-2">
              {restant} s
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={fermer}
          aria-label="Fermer la vidéo"
          className="absolute -top-2 right-0 grid size-11 translate-y-[-100%] place-items-center rounded-md text-night-ink transition-colors hover:text-white sm:-top-3"
        >
          <IconeFermer />
        </button>
      </div>
    </div>
  );

  // Hors de la section : sinon un parent avec `overflow` ou `transform`
  // empêcherait le positionnement fixe de couvrir l'écran.
  return typeof document === "undefined" ? null : createPortal(contenu, document.body);
}

function IconeLecture({ petite = false }: { petite?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={petite ? "size-4 translate-x-[1px]" : "size-8 translate-x-[2px]"}
      fill="currentColor"
    >
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function IconePause() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
      <path d="M8 5h3.2v14H8zM12.8 5H16v14h-3.2z" />
    </svg>
  );
}

function IconeRejouer() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.5 10a8 8 0 1 0 .4 4" />
      <path d="M20 4.5V10h-5.5" />
    </svg>
  );
}

function IconeFermer() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
