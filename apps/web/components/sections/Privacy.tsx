import Link from "next/link";
import { PRIVACY } from "@/lib/content";

export function Privacy() {
  return (
    <section id="donnees" className="border-t border-rule py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 rounded-md border border-rule bg-card p-6 sm:p-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-[2.5rem]">
              {PRIVACY.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{PRIVACY.body}</p>
            <Link
              href="/confidentialite"
              className="mt-6 inline-block text-base text-ink underline decoration-field underline-offset-[6px] hover:decoration-ink"
            >
              Lire la politique de confidentialité
            </Link>
          </div>

          <dl className="md:col-span-6 md:col-start-7">
            {PRIVACY.points.map((p) => (
              <div
                key={p.label}
                className="grid gap-1 border-t border-rule py-4 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className="text-[15px] text-ink-3">{p.label}</dt>
                <dd className="text-base text-ink">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
