"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dit si un élément est entré dans l'écran.
 *
 * Deux usages : révéler un bloc à son arrivée (`une: true`, le bloc reste
 * visible ensuite) et mettre une animation en pause tant qu'on ne la regarde
 * pas (`une: false`), ce qui évite de faire tourner une boucle dans le vide.
 *
 * Avant l'hydratation, et si l'API manque, on répond « visible » : mieux vaut
 * une page sans animation qu'une page vide. La même règle vaut pour deux cas
 * qui manquaient : l'impression, où rien ne défile donc rien n'entrerait
 * jamais dans l'écran, et `prefers-reduced-motion`, où l'on a demandé à ne
 * rien voir bouger. Dans les deux, tout est visible d'emblée.
 */
export function useEnVue<T extends HTMLElement>({
  une = true,
  marge = "0px 0px -12% 0px",
}: { une?: boolean; marge?: string } = {}) {
  const ref = useRef<T>(null);
  const [vu, setVu] = useState(false);

  useEffect(() => {
    const el = ref.current;

    const statique =
      typeof window.matchMedia === "function" &&
      (window.matchMedia("print").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (!el || typeof IntersectionObserver === "undefined" || statique) {
      setVu(true);
      return;
    }

    // Une impression lancée après coup : on révèle tout avant que la page parte
    // vers l'imprimante ou le PDF.
    const avantImpression = () => setVu(true);
    window.addEventListener("beforeprint", avantImpression);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVu(true);
          if (une) obs.disconnect();
        } else if (!une) {
          setVu(false);
        }
      },
      { rootMargin: marge, threshold: 0.05 },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      window.removeEventListener("beforeprint", avantImpression);
    };
  }, [une, marge]);

  return { ref, vu };
}
