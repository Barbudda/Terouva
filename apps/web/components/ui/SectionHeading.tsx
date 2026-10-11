import { cn } from "@/lib/utils";

/**
 * En-tête de section : sur-titre en capitales, puis un titre très gras dont la
 * fin passe en rose. C'est la signature de la page, reprise partout.
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
        {lead}{" "}
        {tail && <span className={dark ? "text-accent-wash" : "text-accent"}>{tail}</span>}
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

/** Ligne de réassurances, avec une coche rose devant chaque élément. */
export function Assurances({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2 text-[15px]", dark ? "text-night-ink-2" : "text-ink-2")}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <svg viewBox="0 0 16 16" aria-hidden className="size-4 shrink-0 text-accent">
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
