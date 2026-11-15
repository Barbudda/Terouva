"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Le compteur de candidatures de la scène « Exemple » (section temps).
 *
 * Rendu côté serveur à sa valeur finale : sans JavaScript ou en mouvement
 * réduit, on lit tout de suite le bon nombre. Sinon, il repart de zéro et
 * grimpe une fois, quand la scène entre dans l'écran. La courbe ralentit à
 * l'arrivée, comme une annonce qui se remplit vite puis plafonne.
 */
export function TempsCompteur({ valeur, duree = 1800 }: { valeur: number; duree?: number }) {
  const [n, setN] = useState(valeur);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // Déjà à l'écran à l'ouverture (ancre, rechargement) : on ne rejoue rien.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const debut = performance.now();
        const pas = (t: number) => {
          const p = Math.min(1, (t - debut) / duree);
          setN(Math.round(valeur * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(pas);
        };
        raf = requestAnimationFrame(pas);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valeur, duree]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}
