"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Accès à l'animation de présentation, dans la bande nuit.
 *
 * Un cadre à filet, l'affiche en dessous, le libellé en `.champ` : pas de
 * bouton de lecture rond posé par-dessus. Le seul cercle du site est le
 * cadran, et un bouton n'a pas besoin d'être une forme pour être un bouton.
 * Au clic, la vidéo occupe l'écran entier, avec le plein écran du navigateur
 * quand il l'accepte. Rien n'est chargé avant le clic.
 */
const CLE_REPRISE = "terouva:promo:seconde";
const DUREE = 29;

export function Video() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        // Pas d'aria-label : le bouton porte déjà son texte, et un libellé
        // vocal différent du texte lu casse le pilotage à la voix.
        className="group block w-full border border-night-rule text-left transition-colors duration-150 hover:bg-night-2"
      >
        <span className="flex items-baseline justify-between gap-4 border-b border-night-rule px-4 py-3">
          <span className="text-[15px] font-medium text-night-ink">Voir Terouva en 29 secondes</span>
          <span className="champ shrink-0 text-night-ink-2">Vidéo · 0:29 · sans son</span>
        </span>
        <span className="relative block aspect-video overflow-hidden">
          {/* Une seule image, déjà compressée, chargée à la demande : le service
              d'optimisation d'images n'apporterait rien ici et facturerait. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/promo/affiche.jpg"
            alt=""
            aria-hidden
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="champ absolute right-3 bottom-3 border border-night-rule bg-night px-2 py-1 text-night-ink">
            Lire
          </span>
        </span>
      </button>

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
        className="absolute top-3 right-3 z-10 grid size-12 place-items-center text-night-ink-2 transition-colors hover:bg-white/10 hover:text-white sm:top-5 sm:right-5"
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
            aria-label="Rejouer la vidéo"
            className="absolute inset-0 grid place-items-center bg-night/55"
          >
            <span className="grid size-16 place-items-center bg-night-accent text-ink">
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
          className="grid size-11 shrink-0 place-items-center bg-night-ink text-ink transition-colors hover:bg-night-ink-2"
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
          className="h-1 flex-1 cursor-pointer bg-white/25"
        >
          <div
            className="h-full bg-night-accent"
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
