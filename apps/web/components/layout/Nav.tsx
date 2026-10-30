"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { NAV_COLONNES } from "@/lib/content";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/**
 * Le masthead : un en-tête de publication, pas une barre d'application.
 *
 * Le logotype à gauche, en Fraunces, haut de 48 px sur grand écran. À droite,
 * non pas une rangée de liens mais trois colonnes intitulées (l'outil, les
 * guides, vos droits), chaque intitulé en `.champ` suivi d'un filet. L'en-tête
 * n'est pas collant : il défile avec la page et laisse le plein cadre occuper
 * l'écran. Une barre compacte, logotype et bouton, réapparaît en position fixe
 * après 70 vh de défilement, en montant du bord haut en 220 ms.
 *
 * Sur petit écran, les colonnes se replient en un bouton de menu qui ouvre un
 * panneau plein écran sur fond nuit, liens en Fraunces, un par ligne. Le
 * panneau piège le focus et se ferme à Échap. La rangée horizontale qui
 * défilait est partie : à trois colonnes et douze destinations, elle ne
 * suffisait plus.
 */
export function Nav({ home = true }: { home?: boolean }) {
  // Les ancres (#comment) ne mènent nulle part hors de l'accueil : on les préfixe.
  const href = (lien: string) => (lien.startsWith("#") && !home ? `/${lien}` : lien);

  const [compacte, setCompacte] = useState(false);
  useEffect(() => {
    const lire = () => setCompacte(window.scrollY > window.innerHeight * 0.7);
    lire();
    window.addEventListener("scroll", lire, { passive: true });
    return () => window.removeEventListener("scroll", lire);
  }, []);

  return (
    <>
      <header className="cadre flex items-start justify-between gap-6 pt-5 pb-6 lg:pt-7 lg:pb-8">
        <Link href="/" aria-label="Terouva, accueil" className="shrink-0 pt-1">
          <Logo grand />
        </Link>

        <nav aria-label="Plan du site" className="hidden lg:block">
          <ul className="flex gap-10 xl:gap-14">
            {NAV_COLONNES.map((col) => (
              <li key={col.titre} className="w-44 xl:w-48">
                <p className="champ text-ink-3">{col.titre}</p>
                <span aria-hidden className="mt-2 block h-px bg-rule" />
                <ul className="mt-2.5">
                  {col.liens.map((l) => (
                    <li key={l.href}>
                      <a
                        href={href(l.href)}
                        className="marge inline-block leading-[1.9] text-ink-2 transition-colors duration-150 hover:text-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <Menu href={href} />
      </header>

      {compacte && (
        <div className="barre-compacte fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur-sm">
          <div className="cadre flex h-14 items-center justify-between gap-6">
            <Link href="/" aria-label="Terouva, accueil">
              <Logo />
            </Link>
            <a href={href("#inscription")} className="bouton bouton--encre h-10 px-4 text-[14px]">
              Être prévenu
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Le menu de petit écran : un bouton, un panneau plein écran. Le focus reste
 * dans le panneau tant qu'il est ouvert, Échap le ferme, et le défilement de
 * la page est bloqué derrière.
 */
function Menu({ href }: { href: (lien: string) => string }) {
  const [ouvert, setOuvert] = useState(false);
  const panneau = useRef<HTMLDivElement>(null);
  const bouton = useRef<HTMLButtonElement>(null);
  const idPanneau = useId();

  useEffect(() => {
    if (!ouvert) return;
    // Le bouton qui a ouvert le panneau : on y rend le focus à la fermeture.
    const declencheur = bouton.current;
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panneau.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    focusables()[0]?.focus();

    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOuvert(false);
        return;
      }
      if (e.key !== "Tab") return;
      const liste = focusables();
      if (liste.length === 0) return;
      const premier = liste[0];
      const dernier = liste[liste.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };
    document.addEventListener("keydown", touche);
    return () => {
      document.body.style.overflow = avant;
      document.removeEventListener("keydown", touche);
      declencheur?.focus();
    };
  }, [ouvert]);

  return (
    <div className="lg:hidden">
      <button
        ref={bouton}
        type="button"
        aria-expanded={ouvert}
        aria-controls={idPanneau}
        onClick={() => setOuvert(true)}
        className="champ -mr-2 inline-flex h-11 items-center gap-3 px-2 text-ink"
      >
        Menu
        <span aria-hidden className="flex flex-col gap-[5px]">
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
        </span>
      </button>

      {ouvert && (
        <div
          ref={panneau}
          id={idPanneau}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="nuit fixed inset-0 z-50 flex flex-col overflow-y-auto bg-night text-night-ink"
        >
          <div className="cadre flex h-16 shrink-0 items-center justify-between">
            <span className="inline-flex items-center gap-2.5">
              <LogoMark />
              <span className="font-medium">Terouva</span>
            </span>
            <button
              type="button"
              onClick={() => setOuvert(false)}
              className="champ -mr-2 inline-flex h-11 items-center px-2 text-night-ink"
            >
              Fermer
            </button>
          </div>

          <nav aria-label="Plan du site" className="cadre flex-1 pt-6 pb-10">
            {NAV_COLONNES.map((col) => (
              <div key={col.titre} className="mt-8 first:mt-0">
                <p className="champ text-night-ink-2">{col.titre}</p>
                <span aria-hidden className="mt-2 block h-px bg-night-rule" />
                <ul>
                  {col.liens.map((l) => (
                    <li key={l.href} className="border-b border-night-rule">
                      <a
                        href={href(l.href)}
                        onClick={() => setOuvert(false)}
                        className={cn(
                          "titre titre--petit block py-3 text-[clamp(1.5rem,1rem+2.4vw,2rem)] text-night-ink",
                          "active:text-night-accent",
                        )}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
