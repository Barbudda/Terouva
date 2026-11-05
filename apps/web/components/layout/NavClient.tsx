"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NAV_COLONNES } from "@/lib/content";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Les destinations de la barre. Les sous-liens vivent dans le menu et le pied. */
const LIENS = [
  { href: "#gains", label: "Ce que vous y gagnez" },
  { href: "#fonctions", label: "Ce que fait Terouva" },
  { href: "/outils", label: "Outils gratuits" },
  { href: "/guides", label: "Guides" },
];

/**
 * Le masthead, en une ligne : le logotype à gauche, les destinations au
 * centre, l'action à droite. Il défile avec la page.
 *
 * Après 70 vh, deux barres selon la taille d'écran :
 * - au bureau, une barre compacte en haut (logo et action) ;
 * - au téléphone, une barre de pouce en bas, « Menu » et « Être prévenu ».
 *   L'ancienne barre du haut n'avait pas de menu : passé le premier écran, on
 *   ne pouvait plus naviguer sans remonter, et son bouton était hors de portée
 *   du pouce. La barre se retire dès que le formulaire de la page ou le pied
 *   entre à l'écran : elle ne double jamais ce qu'on voit déjà.
 *
 * « Être prévenu » vise le formulaire de la page (`#prevenu`, posé par
 * `FinDePage`) quand il existe : avant, le bouton d'un guide renvoyait au bas
 * de l'accueil et faisait quitter la lecture alors que le formulaire était là.
 */
export function NavClient({
  home = true,
  blog = null,
}: {
  home?: boolean;
  /** Le lien vers le blog, calculé côté serveur par `Nav` ; `null` tant que le blog est vide. */
  blog?: { label: string; href: string } | null;
}) {
  // La cible de l'action : l'inscription de l'accueil par défaut, le
  // formulaire de la page s'il y en a un (connu seulement après le rendu).
  const [cible, setCible] = useState(home ? "#inscription" : "/#inscription");
  useEffect(() => {
    if (!home && document.getElementById("prevenu")) setCible("#prevenu");
  }, [home]);

  const href = (lien: string) => {
    if (lien === "#inscription") return cible;
    return lien.startsWith("#") && !home ? `/${lien}` : lien;
  };

  // Le blog entre dans la barre dès qu'il existe : 84 articles sans repère
  // « vous êtes ici », c'était la rubrique la plus visitée sans point orange.
  const liens = blog ? [...LIENS, { href: blog.href, label: blog.label }] : LIENS;

  // Le point orange marque où l'on est : la rubrique en cours, ou, sur
  // l'accueil, le premier pas.
  const chemin = usePathname();
  const actif = (lien: string) =>
    lien.startsWith("#")
      ? home && lien === LIENS[0].href
      : chemin.startsWith(lien);

  const [compacte, setCompacte] = useState(false);
  const [pouce, setPouce] = useState(false);
  useEffect(() => {
    const lire = () => {
      const h = window.innerHeight;
      const loin = window.scrollY > h * 0.7;
      setCompacte(loin);
      // Le formulaire visé ou le pied à l'écran (ou déjà passé) : la barre
      // de pouce se retire.
      const id = cible.split("#")[1];
      const formulaire = cible.startsWith("#") ? document.getElementById(id) : null;
      const pied = document.querySelector("footer");
      const atteint = (el: Element | null) => !!el && el.getBoundingClientRect().top < h;
      setPouce(loin && !atteint(formulaire) && !atteint(pied));
    };
    lire();
    window.addEventListener("scroll", lire, { passive: true });
    window.addEventListener("resize", lire);
    return () => {
      window.removeEventListener("scroll", lire);
      window.removeEventListener("resize", lire);
    };
  }, [cible]);

  // Le menu s'ouvre depuis l'en-tête ou depuis la barre de pouce ; le focus
  // revient au bouton qui l'a ouvert.
  const [ouvert, setOuvert] = useState(false);
  const declencheur = useRef<HTMLElement | null>(null);
  const ouvrir = useCallback(() => {
    declencheur.current = document.activeElement as HTMLElement | null;
    setOuvert(true);
  }, []);
  // Stable : l'effet du panneau en dépend et ne doit pas rejouer à chaque défilement.
  const fermer = useCallback(() => setOuvert(false), []);
  const idPanneau = useId();

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
          <ul className="flex items-center gap-7 xl:gap-8">
            {liens.map((l) => (
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
          <a href={cible} className="bouton bouton--clair h-10 px-4 text-[14px]">
            Être prévenu
          </a>
        </div>

        <BoutonMenu
          ouvert={ouvert}
          controle={idPanneau}
          onOuvrir={ouvrir}
          className="-mr-2 lg:hidden"
        />
      </header>

      {compacte && (
        <div className="barre-compacte fixed inset-x-0 top-0 z-40 hidden border-b border-rule bg-paper/90 backdrop-blur-sm lg:block">
          <div className="cadre flex h-14 items-center justify-between gap-6">
            <Link href="/" aria-label="Terouva, accueil">
              <Logo />
            </Link>
            <a href={cible} className="bouton bouton--clair h-10 px-4 text-[14px]">
              Être prévenu
            </a>
          </div>
        </div>
      )}

      {/* Toujours rendue pour pouvoir glisser ; `inert` la sort du clavier et
          des lecteurs d'écran tant qu'elle est rangée. */}
      <div
        className="barre-pouce fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/92 backdrop-blur-sm lg:hidden"
        data-visible={pouce || undefined}
        inert={!pouce}
      >
        <div className="cadre flex h-16 items-center gap-3">
          <BoutonMenu ouvert={ouvert} controle={idPanneau} onOuvrir={ouvrir} className="-ml-2" />
          <a href={cible} className="bouton bouton--accent h-11 flex-1">
            Être prévenu
          </a>
        </div>
      </div>

      {ouvert && (
        <Panneau
          id={idPanneau}
          href={href}
          blog={blog}
          onFermer={fermer}
          declencheur={declencheur}
        />
      )}
    </>
  );
}

/** Le bouton « Menu », dans l'en-tête et dans la barre de pouce. */
function BoutonMenu({
  ouvert,
  controle,
  onOuvrir,
  className,
}: {
  ouvert: boolean;
  controle: string;
  onOuvrir: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-expanded={ouvert}
      aria-controls={controle}
      onClick={onOuvrir}
      className={cn("champ inline-flex h-11 items-center gap-3 px-2 text-ink", className)}
    >
      Menu
      <span aria-hidden className="flex flex-col gap-[5px]">
        <span className="block h-px w-5 bg-ink" />
        <span className="block h-px w-5 bg-ink" />
      </span>
    </button>
  );
}

/**
 * Le panneau plein écran du petit écran. Le focus reste dedans tant qu'il est
 * ouvert, Échap le ferme, le défilement de la page est bloqué derrière, et le
 * focus revient au bouton qui l'a ouvert.
 */
function Panneau({
  id,
  href,
  blog,
  onFermer,
  declencheur,
}: {
  id: string;
  href: (lien: string) => string;
  blog: { label: string; href: string } | null;
  onFermer: () => void;
  declencheur: React.RefObject<HTMLElement | null>;
}) {
  // Le blog rejoint la colonne des guides, comme dans le pied de page.
  const colonnes = NAV_COLONNES.map((col) =>
    blog && col.titre === "Les guides" ? { ...col, liens: [...col.liens, blog] } : col,
  );
  const panneau = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const retour = declencheur.current;
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
        onFermer();
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
      retour?.focus();
    };
  }, [onFermer, declencheur]);

  return (
    <div
      ref={panneau}
      id={id}
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
          onClick={onFermer}
          className="champ -mr-2 inline-flex h-11 items-center px-2 text-night-ink"
        >
          Fermer
        </button>
      </div>

      <nav aria-label="Plan du site" className="cadre flex-1 pt-6 pb-10">
        {colonnes.map((col) => (
          <div key={col.titre} className="mt-8 first:mt-0">
            <p className="champ text-blue-clair">{col.titre}</p>
            <span aria-hidden className="mt-2 block h-px bg-night-rule" />
            <ul>
              {col.liens.map((l) => (
                <li key={l.href} className="border-b border-night-rule">
                  <a
                    href={href(l.href)}
                    onClick={onFermer}
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
          onClick={onFermer}
          className="bouton bouton--accent mt-10 w-full"
        >
          Être prévenu
        </a>
      </nav>
    </div>
  );
}
