import Link from "next/link";
import { FOOTER } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-md text-[15px] leading-relaxed text-ink-2">{FOOTER.signature}</p>
          <p className="text-sm text-ink-3">{FOOTER.disclaimer}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <li>
            <Link href="/app" className="text-ink-2 underline-offset-4 hover:text-ink hover:underline">
              Ouvrir Terouva
            </Link>
          </li>
          <li>
            <Link
              href="/confidentialite"
              className="text-ink-2 underline-offset-4 hover:text-ink hover:underline"
            >
              Politique de confidentialité
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
