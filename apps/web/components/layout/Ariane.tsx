import Link from "next/link";

/**
 * Fil d'Ariane visible. Il double le balisage `BreadcrumbList` : les moteurs
 * n'affichent le chemin sous le lien que s'il existe aussi sur la page, et le
 * lecteur gagne une sortie vers la rubrique parente.
 *
 * Sur téléphone, le dernier maillon (le titre, que le `<h1>` répète juste
 * dessous) tient sur une ligne et se coupe ; les liens gardent leur hauteur
 * visuelle mais leur zone de toucher atteint 44 px (`.ariane`, navigation.css).
 */
export function Ariane({ etapes }: { etapes: Array<{ nom: string; chemin: string }> }) {
  return (
    <nav aria-label="Fil d'Ariane" className="ariane text-[13px] text-ink-3">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {etapes.map((e, i) => (
          <li key={e.chemin} className="flex min-w-0 max-w-full items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === etapes.length - 1 ? (
              <span aria-current="page" className="truncate">
                {e.nom}
              </span>
            ) : (
              <Link href={e.chemin} className="inline-block py-1 transition-colors hover:text-accent-ink">
                {e.nom}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
