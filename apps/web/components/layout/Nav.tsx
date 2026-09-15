import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/LinkButton";

export function Nav({ home = true }: { home?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Terouva, accueil">
          <Logo />
        </Link>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={home ? l.href : `/${l.href}`}
                  className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LinkButton href="/app">Ouvrir Terouva</LinkButton>
      </div>
    </header>
  );
}
