import { cn } from "@/lib/utils";

/**
 * Le titre de toutes les sections de l'accueil après le hero (vague 2 du pôle
 * Design, docs/design/VAGUE-2.md). Une étiquette discrète, une première ligne
 * très grasse, une seconde ligne en valeur : une seule chose à lire, en grand.
 * Le style vit dans globals.css (`.titre-section`) et suit le monde de la
 * section : sur crème, l'orange s'assombrit tout seul (`.monde-papier`).
 */
export function TitreSection({
  id,
  etiquette,
  titre,
  accent,
  aligne = "centre",
  className,
}: {
  id?: string;
  etiquette?: string;
  titre: string;
  accent?: string;
  aligne?: "centre" | "gauche";
  className?: string;
}) {
  return (
    <div className={cn(aligne === "centre" && "mx-auto text-center", "max-w-5xl", className)}>
      {etiquette && <p className="etiquette-section">{etiquette}</p>}
      <h2 id={id} className={cn("titre-section text-ink", etiquette && "mt-4")}>
        {titre}
        {accent && <span className="titre-section__accent">{accent}</span>}
      </h2>
    </div>
  );
}
