import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/LinkButton";

/** Barre flottante en pilule, posée au-dessus du contenu. */
export function Nav({ home = true }: { home?: boolean }) {
  const href = (anchor: string) => (home ? anchor : `/${anchor}`);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 rounded-full border border-rule bg-card/92 px-4 shadow-[0_8px_30px_-18px_rgb(27_29_30/0.35)] backdrop-blur-sm sm:px-6">
        <Link href="/" aria-label="Terouva, accueil">
          <Logo />
        </Link>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={href(l.href)}
                  className="text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
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
