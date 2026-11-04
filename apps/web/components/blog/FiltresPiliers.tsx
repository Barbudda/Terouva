import { BLOG, PILIERS, cheminPilier, type Pilier } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Les filtres de la rubrique, sans JavaScript : un lien par pilier habité. Un
 * pilier qui a sa page y mène ; les autres mènent à leur section de `/blog`.
 * `actif` marque le pilier de la page en cours, sur une page de pilier.
 */
export function FiltresPiliers({
  piliers,
  avecPage,
  actif,
  className,
}: {
  piliers: Pilier[];
  avecPage: Set<Pilier>;
  actif?: Pilier;
  className?: string;
}) {
  if (piliers.length < 2 && !actif) return null;
  const pastille =
    "inline-flex min-h-11 items-center rounded-full border px-4 text-[14px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink";
  return (
    <nav aria-label="Thèmes du blog" className={className}>
      <ul className="flex flex-wrap gap-2">
        {actif && (
          <li>
            <a href={BLOG} className={cn(pastille, "border-rule-fort bg-card text-ink hover:border-ink-3")}>
              Tous les articles
            </a>
          </li>
        )}
        {piliers.map((p) => (
          <li key={p}>
            <a
              href={avecPage.has(p) ? cheminPilier(p) : `${BLOG}#pilier-${p.toLowerCase()}`}
              aria-current={p === actif ? "page" : undefined}
              className={cn(
                pastille,
                p === actif
                  ? "border-ink bg-ink text-paper"
                  : "border-rule-fort bg-card text-ink hover:border-ink-3",
              )}
            >
              {PILIERS[p]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
