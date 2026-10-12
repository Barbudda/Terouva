"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Lecteur de l'animation de présentation.
 *
 * Trois règles tenues ici :
 *
 * 1. **Rien ne démarre sans qu'on le demande.** Pas de lecture automatique, pas
 *    de plein écran imposé. On voit une affiche et un bouton ; le reste
 *    n'arrive que si on clique.
 * 2. **Rien n'est téléchargé avant.** `preload="none"` : le fichier d'un
 *    mégaoctet ne part qu'au premier clic, donc il ne pèse sur le chargement de
 *    personne.
 * 3. **Commandes dessinées**, pas celles du navigateur, qui changent d'allure
 *    d'un système à l'autre et cassent la page.
 *
 * L'animation est muette : il n'y a pas de piste sonore, donc pas de bouton de
 * son à afficher. On le dit en toutes lettres plutôt que de laisser quelqu'un
 * chercher le volume.
 */
const CLE_REPRISE = "terouva:promo:seconde";

export function Video() {
  const video = useRef<HTMLVideoElement>(null);
  const [demarree, setDemarree] = useState(false);
  const [enLecture, setEnLecture] = useState(false);
  const [progression, setProgression] = useState(0);
  const [duree, setDuree] = useState(24);
  const [finie, setFinie] = useState(false);

  // Reprise : on retrouve où on s'était arrêté, mais jamais à moins de deux
  // secondes de la fin — sinon on relance sur le générique.
  const reprendre = useCallback(() => {
    const v = video.current;
    if (!v) return;
    try {
      const t = Number(localStorage.getItem(CLE_REPRISE));
      if (t > 1 && t < (v.duration || 24) - 2) v.currentTime = t;
    } catch {
      /* navigation privée : on repart du début, ce n'est pas grave. */
    }
  }, []);

  const lire = () => {
    const v = video.current;
    if (!v) return;
    if (!demarree) {
      setDemarree(true);
      reprendre();
    }
    if (finie) {
      v.currentTime = 0;
      setFinie(false);
    }
    void v.play();
  };

  const basculer = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) lire();
    else v.pause();
  };

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
    const chargee = () => setDuree(v.duration || 24);
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
    v.addEventListener("play", () => setEnLecture(true));
    v.addEventListener("pause", () => setEnLecture(false));
    v.addEventListener("ended", finit);
    return () => {
      v.removeEventListener("timeupdate", maj);
      v.removeEventListener("loadedmetadata", chargee);
      v.removeEventListener("ended", finit);
    };
  }, []);

  /** Clic sur la barre : on va à cet instant. */
  const deplacer = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = video.current;
    if (!v || !demarree) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * (v.duration || 24);
  };

  const restant = Math.max(0, Math.ceil(duree - duree * progression));

  return (
    <section id="video" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="En 24 secondes"
          lead="Si vous préférez"
          tail="qu'on vous montre."
          align="center"
          className="monte max-w-2xl"
        >
          Une animation courte, sans commentaire et sans son. Elle ne se lance que si vous le
          demandez.
        </SectionHeading>

        <figure className="monte mt-10">
          <div className="relative overflow-hidden rounded-xl border border-rule bg-ash">
            <video
              ref={video}
              className="block aspect-video w-full"
              poster="/promo/affiche.jpg"
              preload="none"
              playsInline
              muted
              aria-label="Présentation de Terouva en vingt-quatre secondes, sans son"
            >
              <source src="/promo/terouva.mp4" type="video/mp4" />
            </video>

            {/* Voile d'invitation : il disparaît dès que la lecture commence. */}
            {(!demarree || finie) && (
              <button
                type="button"
                onClick={lire}
                className="absolute inset-0 grid place-items-center bg-ink/[0.06] transition-colors hover:bg-ink/[0.12]"
              >
                <span className="flex flex-col items-center gap-4">
                  <span className="grid size-20 place-items-center rounded-full bg-accent text-white shadow-accent sm:size-24">
                    {finie ? <IconeRejouer /> : <IconeLecture />}
                  </span>
                  <span className="rounded-md bg-ink/85 px-4 py-2 text-[15px] font-semibold text-white backdrop-blur-sm">
                    {finie ? "Revoir" : "Regarder · 24 s, sans son"}
                  </span>
                </span>
              </button>
            )}

            {/* Commandes, visibles une fois la lecture lancée. */}
            {demarree && !finie && (
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
            )}
          </div>

          <figcaption className="mt-3 text-center text-sm text-ink-3">
            Les annonces, les notes et le message sont ceux que produit l&apos;outil.
          </figcaption>
        </figure>
      </div>
    </section>
  );
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
