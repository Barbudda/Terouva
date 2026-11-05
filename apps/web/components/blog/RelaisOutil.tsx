import Link from "next/link";
import { typographier } from "@/components/blog/typographie";
import { OUTILS } from "@/lib/catalogue";

/**
 * Le relais vers l'outil qui fait ce que la page décrit, après le texte.
 *
 * Partagé par les articles et les guides : une page de contenu qui renvoie à
 * l'outil gratuit fait passer le lecteur de la lecture à l'action, et le même
 * bloc aux deux endroits évite que les deux gabarits divergent.
 */
export function RelaisOutil({ chemin }: { chemin?: string }) {
  const outil = OUTILS.find((o) => o.chemin === chemin);
  if (!outil) return null;
  return (
    <aside aria-label="Outil gratuit" className="relais-outil mt-14 bg-night p-6 text-night-ink sm:p-8">
      <p className="champ text-blue-clair">Outil gratuit</p>
      <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="max-w-[30rem]">
          <p className="text-[1.375rem] leading-tight font-medium">{outil.court}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-night-ink-2">{typographier(outil.resume)}</p>
        </div>
        <Link
          href={outil.chemin}
          className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-full bg-action px-6 text-[15px] font-medium text-action-ink transition-[filter] duration-200 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-clair sm:self-auto"
        >
          Ouvrir l&apos;outil
        </Link>
      </div>
    </aside>
  );
}
