import Link from "next/link";
import { FOOTER } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-rule px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs leading-relaxed text-ink-2">{FOOTER.signature}</p>
          <p className="text-sm text-accent">{FOOTER.local}</p>
        </div>

        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-[13px] font-bold tracking-wider text-ink uppercase">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-ink-2 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-rule pt-6 text-sm text-ink-3">
        <p>Terouva · © {new Date().getFullYear()}</p>
        <p>{FOOTER.disclaimer}</p>
      </div>
    </footer>
  );
}
