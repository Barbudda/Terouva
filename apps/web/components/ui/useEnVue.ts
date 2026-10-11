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
 * une page sans animation qu'une page vide.
 */
export function useEnVue<T extends HTMLElement>({
  une = true,
  marge = "0px 0px -12% 0px",
}: { une?: boolean; marge?: string } = {}) {
  const ref = useRef<T>(null);
  const [vu, setVu] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVu(true);
      return;
    }

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
    return () => obs.disconnect();
  }, [une, marge]);

  return { ref, vu };
}
