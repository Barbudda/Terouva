import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/LinkButton";

/** Barre flottante en pilule, posée au-dessus du contenu. */
export function Nav({ home = true }: { home?: boolean }) {
  // Les ancres (#comment) ne mènent nulle part hors de l'accueil : on les
  // préfixe. Les chemins absolus (/guides) sont laissés tels quels.
  const href = (lien: string) =>
    lien.startsWith("#") && !home ? `/${lien}` : lien;

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 rounded-lg border border-rule bg-card/92 px-4 shadow-[0_8px_30px_-20px_rgb(27_29_30/0.3)] backdrop-blur-sm sm:px-6">
        <Link href="/" aria-label="Terouva, accueil">
          <Logo />
        </Link>

        <nav aria-label="Sections" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={href(l.href)}
                  className="inline-flex h-11 items-center text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LinkButton href={href("#inscription")} variant="dark">
          Être prévenu
        </LinkButton>
      </div>
    </header>
  );
}
