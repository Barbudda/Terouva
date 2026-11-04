import Image from "next/image";
import Link from "next/link";
import { RUBRIQUES, type Guide } from "@/components/guides/CadreGuide";
import { PHOTOS } from "@/lib/guides-resumes";

/**
 * Un guide en carte : sa photo, sa rubrique, son titre, son chapô, son temps
 * de lecture. Sert à « À lire aussi » sous chaque guide et au bas de la page
 * des outils ; les jetons de couleur suivent le monde de la page, clair ou
 * sombre.
 */
export function CarteGuide({ guide: g }: { guide: Guide }) {
  const photo = PHOTOS[g.chemin];
  return (
    <Link
      href={g.chemin}
      className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-rule bg-card transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-rule-fort focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
    >
      {photo && (
        <span className="relative block aspect-[16/10] overflow-hidden bg-paper-2">
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-terouva)] group-hover:scale-[1.03]"
          />
        </span>
      )}
      <span className="flex flex-1 flex-col p-5">
        <span className="champ text-accent-ink">{RUBRIQUES[g.etape]}</span>
        <span className="mt-2 text-[17px] leading-snug font-medium text-ink">{g.titreSeo}</span>
        <span className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-2">{g.description}</span>
        <span className="champ mt-auto pt-4 text-ink-3">{g.lecture} min de lecture</span>
      </span>
    </Link>
  );
}
