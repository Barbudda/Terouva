"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Accès à l'animation de présentation.
 *
 * **Un ruban, pas un bloc.** Un grand rectangle noir avec un bouton au milieu
 * casse la page en deux et crie « vidéo ». Ici c'est une bande fine qui va d'un
 * bord à l'autre, où l'image de l'animation passe en filigrane : on la remarque
 * sans qu'elle prenne toute la place, et elle fait office de respiration entre
 * deux sections.
 *
 * **Et un vrai plein écran.** Au clic, la vidéo occupe l'écran entier, pas un
 * panneau centré avec le site autour. On demande même le plein écran du
 * navigateur quand il l'accepte, pour faire disparaître sa barre d'adresse.
 *
 * Rien n'est chargé avant le clic : le ruban n'affiche qu'une image.
 */
const CLE_REPRISE = "terouva:promo:seconde";
const DUREE = 29;

export function Video() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <>
      {/* Pleine largeur : le ruban traverse la page, sans marge latérale. */}
      <section id="video" className="mb-16 md:mb-24">
        <button
          type="button"
          onClick={() => setOuvert(true)}
          aria-label="Regarder la présentation de Terouva, 29 secondes, sans son"
          className="group relative block w-full overflow-hidden border-y border-rule bg-ash"
        >
          {/* L'image de l'animation, en filigrane : on devine le produit sans
              que la bande devienne un écran. */}
          <img
            src="/promo/affiche.jpg"
            alt=""
            aria-hidden
            width={1280}
            height={720}
            // Léger flou : sans lui, les titres des annonces restent lisibles et
            // concurrencent le libellé du ruban. Flouté, c'est une matière.
            className="absolute inset-0 size-full scale-110 object-cover opacity-[0.3] blur-[3px] transition-opacity duration-300 group-hover:opacity-40"
          />
          <span className="absolute inset-0 bg-gradient-to-r from-paper via-transparent to-paper" />

          <span className="relative flex h-[112px] items-center justify-center gap-5 px-4 sm:h-[132px] sm:gap-7">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-white shadow-accent transition-transform duration-200 group-hover:scale-110 sm:size-14">
              <IconeLecture />
            </span>
            <span className="text-left">
              <span className="display block text-xl text-ink sm:text-2xl">
                Voir Terouva <span className="text-accent">en 29 secondes</span>
              </span>
              <span className="mt-1 block text-[15px] text-ink-2">
                Une animation courte, sans son. Elle s&apos;ouvre en grand.
              </span>
            </span>
          </span>
        </button>
      </section>

      {ouvert && <PleinEcran fermer={() => setOuvert(false)} />}
    </>
  );
}

/** La vidéo seule, sur tout l'écran. */
function PleinEcran({ fermer }: { fermer: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const boite = useRef<HTMLDivElement>(null);
  const [enLecture, setEnLecture] = useState(false);
  const [progression, setProgression] = useState(0);
  const [duree, setDuree] = useState(DUREE);
  const [finie, setFinie] = useState(false);
  const [visible, setVisible] = useState(false);

  const basculer = useCallback(() => {
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
  }, [finie]);

  // Ouverture : on bloque le défilement de la page, on demande le plein écran
  // du navigateur, et on lance la lecture là où on s'était arrêté.
  useEffect(() => {
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => setVisible(true));

    // Refusé sur certains navigateurs (iOS notamment) : le panneau couvre déjà
    // l'écran, donc l'échec est sans conséquence.
    boite.current?.requestFullscreen?.().catch(() => {});

    const v = video.current;
    if (v) {
      try {
        const t = Number(localStorage.getItem(CLE_REPRISE));
        if (t > 1 && t < DUREE - 2) v.currentTime = t;
      } catch {
        /* navigation privée : on repart du début. */
      }
      void v.play();
    }

    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        basculer();
      }
    };
    // Quitter le plein écran du navigateur ferme aussi le panneau : sinon on se
    // retrouve avec une vidéo géante au milieu d'une page figée.
    const sortiePleinEcran = () => {
      if (!document.fullscreenElement) fermer();
    };
    document.addEventListener("keydown", touche);
    document.addEventListener("fullscreenchange", sortiePleinEcran);
    boite.current?.focus();

    return () => {
      document.body.style.overflow = avant;
      document.removeEventListener("keydown", touche);
      document.removeEventListener("fullscreenchange", sortiePleinEcran);
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
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
  }, []);

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
      className={`fixed inset-0 z-50 flex flex-col bg-night outline-none transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={fermer}
        aria-label="Fermer la vidéo"
        className="absolute top-3 right-3 z-10 grid size-12 place-items-center rounded-md text-night-ink-2 transition-colors hover:bg-white/10 hover:text-white sm:top-5 sm:right-5"
      >
        <IconeFermer />
      </button>

      {/* La vidéo prend toute la place disponible, sans jamais être rognée. */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <video
          ref={video}
          className="max-h-full max-w-full cursor-pointer"
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
            className="absolute inset-0 grid place-items-center bg-night/55"
          >
            <span className="grid size-20 place-items-center rounded-full bg-accent text-white shadow-accent">
              <IconeRejouer />
            </span>
          </button>
        )}
      </div>

      {/* Commandes dans la zone sombre, sous l'image : elles ne mangent jamais
          la vidéo. */}
      <div className="flex shrink-0 items-center gap-4 px-4 py-4 sm:px-8 sm:py-5">
        <button
          type="button"
          onClick={basculer}
          aria-label={enLecture ? "Mettre en pause" : "Reprendre"}
          className="grid size-11 shrink-0 place-items-center rounded-md bg-white text-ink transition-colors hover:bg-night-ink-2"
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
          className="h-2 flex-1 cursor-pointer rounded-full bg-white/25"
        >
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${progression * 100}%` }}
          />
        </div>

        <span className="tabular w-12 shrink-0 text-right text-sm font-semibold text-night-ink-2">
          {restant} s
        </span>
      </div>
    </div>
  );

  // Hors de la section : un parent avec `overflow` ou `transform` empêcherait
  // le positionnement fixe de couvrir l'écran.
  return typeof document === "undefined" ? null : createPortal(contenu, document.body);
}

function IconeLecture({ petite = false }: { petite?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={petite ? "size-4 translate-x-[1px]" : "size-6 translate-x-[2px]"}
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
