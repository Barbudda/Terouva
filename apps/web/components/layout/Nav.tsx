"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/**
 * En-tête posé directement sur le fond papier.
 *
 * C'était une pilule flottante, bordée et ombrée : le motif de gabarit le
 * plus reconnaissable qui soit, et un cadre de plus sur une page qui en avait
 * déjà trop. La navigation vit maintenant à même le fond, et un filet de 1 px
 * apparaît en bas quand on a défilé, pour la séparer du contenu qui passe
 * dessous. Rien d'autre.
 *
 * Sous 1024 px, les quatre destinations ne disparaissaient pas derrière un
 * menu : elles disparaissaient tout court. Sur téléphone, personne ne pouvait
 * atteindre les guides ni les outils depuis le haut de page, alors que les uns
 * amènent le trafic et les autres convertissent. Elles tiennent désormais sur
 * une rangée qui défile sous la barre, visibles sans rien ouvrir : à quatre
 * liens, un bouton de menu cacherait plus qu'il ne rangerait.
 *
 * Le bouton « Être prévenu », noir, faisait doublon avec le bouton magenta du
 * formulaire trois lignes plus bas. Il devient un lien discret qui y mène.
 */
export function Nav({ home = true }: { home?: boolean }) {
  // Les ancres (#comment) ne mènent nulle part hors de l'accueil : on les
  // préfixe. Les chemins absolus (/guides) sont laissés tels quels.
  const href = (lien: string) => (lien.startsWith("#") && !home ? `/${lien}` : lien);

  const [defile, setDefile] = useState(false);
  useEffect(() => {
    const lire = () => setDefile(window.scrollY > 8);
    lire();
    window.addEventListener("scroll", lire, { passive: true });
    return () => window.removeEventListener("scroll", lire);
  }, []);

  const lien =
    "inline-flex h-11 items-center whitespace-nowrap text-[15px] font-medium text-ink-2 transition-colors hover:text-ink active:text-accent [-webkit-tap-highlight-color:transparent]";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-paper/95 backdrop-blur-sm transition-[border-color] duration-200",
        "border-b",
        defile ? "border-rule" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Terouva, accueil">
          <Logo />
        </Link>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={href(l.href)} className={lien}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={href("#inscription")} className={lien}>
          Être prévenu
        </a>
      </div>

      {/* Les mêmes destinations, à portée de pouce. La rangée défile si
          l'écran est trop étroit, et les deux bords s'estompent pour dire
          qu'il y a une suite. */}
      <nav aria-label="Sections" className="lg:hidden">
        <ul className="defile-x mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 pb-1 sm:px-6">
          {NAV_LINKS.map((l) => (
            <li key={l.href} className="shrink-0">
              <a href={href(l.href)} className={lien}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
