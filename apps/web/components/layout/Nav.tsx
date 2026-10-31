"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV_COLONNES } from "@/lib/content";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Les quatre destinations de la barre. Les sous-liens vivent dans le menu et le pied. */
const LIENS = [
  { href: "#comment", label: "Comment ça marche" },
  { href: "#fonctions", label: "Ce que fait Terouva" },
  { href: "/outils", label: "Outils gratuits" },
  { href: "/guides", label: "Guides" },
];

/**
 * Le masthead, en une ligne, comme la référence : le logotype à gauche, les
 * destinations au centre, deux boutons à droite (la démo en filet, l'action en
 * orange). Il défile avec la page ; une barre compacte revient en position
 * fixe après 70 vh. Sur petit écran, un bouton de menu ouvre un panneau plein
 * écran avec les trois colonnes complètes ; il piège le focus et se ferme à
 * Échap.
 */
export function Nav({ home = true }: { home?: boolean }) {
  const href = (lien: string) =>
    lien.startsWith("#") && !home ? `/${lien}` : lien;
  // Le point orange de la référence marque où l'on est : la page en cours,
  // ou, sur l'accueil, le premier pas.
  const chemin = usePathname();
  const actif = (lien: string) =>
    lien.startsWith("#")
      ? home && lien === LIENS[0].href
      : chemin.startsWith(lien);

  const [compacte, setCompacte] = useState(false);
  useEffect(() => {
    const lire = () => setCompacte(window.scrollY > window.innerHeight * 0.7);
    lire();
    window.addEventListener("scroll", lire, { passive: true });
    return () => window.removeEventListener("scroll", lire);
  }, []);

  return (
    <>
      <header
        className="cadre entree relative z-10 flex h-20 items-center justify-between gap-6"
        style={{ "--rang": 0 } as React.CSSProperties}
      >
        <Link href="/" aria-label="Terouva, accueil" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LIENS.map((l) => (
              <li key={l.href}>
                <a
                  href={href(l.href)}
                  aria-current={
                    actif(l.href) && !l.href.startsWith("#")
                      ? "page"
                      : undefined
                  }
                  className={cn(
                    "inline-flex h-10 items-center gap-2 text-[14px] transition-colors duration-150 hover:text-ink",
                    actif(l.href) ? "text-ink" : "text-ink-2",
                  )}
                >
                  {actif(l.href) && (
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-action"
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/app?demo=1"
            className="bouton bouton--filet h-10 px-4 text-[14px]"
          >
            Voir la démo
          </Link>
          <a
            href={href("#inscription")}
            className="bouton bouton--clair h-10 px-4 text-[14px]"
          >
            Être prévenu
          </a>
        </div>

        <Menu href={href} />
      </header>

      {compacte && (
        <div className="barre-compacte fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
          <div className="cadre flex h-14 items-center justify-between gap-6">
            <Link href="/" aria-label="Terouva, accueil">
              <Logo />
            </Link>
            <a
              href={href("#inscription")}
              className="bouton bouton--clair h-10 px-4 text-[14px]"
            >
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
                <p className="champ text-blue-clair">{col.titre}</p>
                <span aria-hidden className="mt-2 block h-px bg-night-rule" />
                <ul>
                  {col.liens.map((l) => (
                    <li key={l.href} className="border-b border-night-rule">
                      <a
                        href={href(l.href)}
                        onClick={() => setOuvert(false)}
                        className={cn(
                          "titre titre--petit block py-3 text-[clamp(1.5rem,1rem+2.4vw,2rem)] text-night-ink",
                          "active:text-action",
                        )}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href={href("#inscription")}
              onClick={() => setOuvert(false)}
              className="bouton bouton--accent mt-10 w-full"
            >
              Être prévenu du lancement
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
