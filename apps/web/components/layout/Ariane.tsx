import Link from "next/link";

/**
 * Fil d'Ariane visible. Il double le balisage `BreadcrumbList` : les moteurs
 * n'affichent le chemin sous le lien que s'il existe aussi sur la page, et le
 * lecteur gagne une sortie vers la rubrique parente.
 */
export function Ariane({ etapes }: { etapes: Array<{ nom: string; chemin: string }> }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-[13px] text-ink-3">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {etapes.map((e, i) => (
          <li key={e.chemin} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === etapes.length - 1 ? (
              <span aria-current="page">{e.nom}</span>
            ) : (
              <Link href={e.chemin} className="transition-colors hover:text-accent">
                {e.nom}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
