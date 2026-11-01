"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/** Ce qui apparaît au défilement, sur tout le site. */
const CIBLES = ".monte, .filet-trace, .encadre";

/**
 * Le révélateur : les blocs apparaissent quand on descend, jamais quand on
 * remonte. Demande d'Hugo du 1er novembre : les animations liées au
 * défilement se rejouaient à l'envers en remontant, et cette friction se
 * sentait à chaque retour en arrière.
 *
 * Un seul observateur pour toute la page. Un bloc qui entre dans l'écran
 * pendant qu'on descend joue son apparition, une fois. Un bloc qui entre
 * pendant qu'on remonte (après un saut d'ancre ou un rechargement au milieu
 * de la page) est déjà là, sans animation. Le sens se lit sur le défilement
 * lui-même : la position du bloc ne suffit pas, un filet d'un pixel entre en
 * entier dans l'écran au premier cran de molette, d'où qu'il vienne. Ce qui
 * est à l'écran ou au-dessus quand la page s'ouvre est visible d'emblée :
 * rien ne clignote au chargement.
 *
 * L'état passe par des attributs `data-` que React ne gère pas, pour qu'un
 * nouveau rendu ne les efface jamais. Sans JavaScript, sans
 * IntersectionObserver ou avec `prefers-reduced-motion`, la racine ne reçoit
 * pas `data-revele` et tout reste visible : le CSS ne cache rien de lui-même.
 */
export function Revelateur() {
  const chemin = usePathname();

  // Avant la peinture : un bloc déjà à l'écran est marqué avant d'être caché.
  useLayoutEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const marquer = (el: HTMLElement, etat: "joue" | "direct", decalage = 0) => {
      if (el.dataset.vu) return;
      // Cinq blocs entrés ensemble au plus se décalent ; au-delà, ils partent avec le cinquième.
      if (etat === "joue") el.style.setProperty("--decalage", String(Math.min(decalage, 4)));
      el.dataset.vu = etat;
    };

    // Le sens du dernier défilement. Les événements de défilement passent avant
    // le calcul des intersections dans la même image : il est toujours à jour.
    let dernierY = window.scrollY;
    let descend = true;
    const surDefilement = () => {
      const y = window.scrollY;
      if (y !== dernierY) descend = y > dernierY;
      dernierY = y;
    };
    window.addEventListener("scroll", surDefilement, { passive: true });

    const observateur = new IntersectionObserver(
      (entrees) => {
        let rang = 0;
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          const el = entree.target as HTMLElement;
          marquer(el, descend ? "joue" : "direct", rang++);
          observateur.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    const prendre = (el: HTMLElement) => {
      if (el.dataset.vu) return;
      if (el.getBoundingClientRect().top < window.innerHeight) marquer(el, "direct");
      else observateur.observe(el);
    };

    document.querySelectorAll<HTMLElement>(CIBLES).forEach(prendre);
    document.documentElement.dataset.revele = "pret";

    // Les blocs montés plus tard (contenu client, changement de page) suivent la même règle.
    const mutations = new MutationObserver((liste) => {
      for (const m of liste) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches(CIBLES)) prendre(n);
          n.querySelectorAll<HTMLElement>(CIBLES).forEach(prendre);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    // Une impression ne défile pas : tout doit être là avant de partir.
    const toutMontrer = () =>
      document.querySelectorAll<HTMLElement>(CIBLES).forEach((el) => marquer(el, "direct"));
    window.addEventListener("beforeprint", toutMontrer);

    return () => {
      observateur.disconnect();
      mutations.disconnect();
      window.removeEventListener("beforeprint", toutMontrer);
      window.removeEventListener("scroll", surDefilement);
    };
  }, [chemin]);

  return null;
}
