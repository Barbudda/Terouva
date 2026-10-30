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

/**
 * Les promesses du produit, en une ligne de prose.
 *
 * C'était une rangée de coches, une par promesse : le réflexe de toutes les
 * pages de vente générées, et le signal n°16 de la checklist pas-IA. Or ces
 * trois phrases sont les meilleures du site. Elles n'ont pas besoin d'un
 * glyphe de validation pour peser : séparées par des points médians, dans la
 * couleur du texte courant, c'est ce qui est dit qui porte.
 */
export function Assurances({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <p className={cn("text-[15px] leading-relaxed", dark ? "text-night-ink-2" : "text-ink-2")}>
      {items.join(" · ")}
    </p>
  );
}
