import { cn } from "@/lib/utils";

/**
 * En-tête de section : une mention discrète, puis un titre.
 *
 * Ce composant portait le défaut central du site. Il rendait un titre très gras
 * dont la seconde moitié passait en magenta, et il est appelé par toutes les
 * sections : le même effet se répétait donc une dizaine de fois en descendant la
 * page, ce qui donnait l'impression d'une page produit générée.
 *
 * Le titre se lit maintenant d'un seul tenant, en serif, à l'encre. `tail` est
 * conservé parce que les appelants l'utilisent pour couper leur phrase, mais il
 * n'est plus qu'un morceau de texte comme un autre. Voir DESIGN.md.
 */
export function SectionHeading({
  eyebrow,
  lead,
  tail,
  children,
  align = "left",
  dark = false,
  className,
  size = "section",
}: {
  eyebrow?: string;
  lead: string;
  tail?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  size?: "section" | "hero";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", dark && "text-accent-wash")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "display mt-3",
          size === "hero"
            ? "text-[2.6rem] sm:text-6xl lg:text-[4.5rem]"
            : "text-[2rem] sm:text-4xl lg:text-[3rem]",
          dark ? "text-night-ink" : "text-ink",
        )}
      >
        {lead}
        {tail ? ` ${tail}` : null}
      </h2>
      {children && (
        <div
          className={cn(
            "mt-5 text-lg leading-relaxed",
            align === "center" && "mx-auto max-w-2xl",
            dark ? "text-night-ink-2" : "text-ink-2",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** Ligne de réassurances. Les coches étaient roses : à l'encre, elles disent la
 *  même chose sans ajouter de couleur à un écran qui en avait déjà partout. */
export function Assurances({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2 text-[15px]", dark ? "text-night-ink-2" : "text-ink-2")}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <svg viewBox="0 0 16 16" aria-hidden className="size-4 shrink-0 text-ink-3">
            <path
              d="M3 8.5l3.2 3.2L13 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
