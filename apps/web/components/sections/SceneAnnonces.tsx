"use client";

import { ANNONCES_SCENE, type AnnonceExemple } from "@/lib/exemples";
import { useEnVue } from "@/components/ui/useEnVue";
import { cn } from "@/lib/utils";

/**
 * Ce que fait Terouva, joué plutôt que raconté.
 *
 * Remplace la capture d'écran : les annonces arrivent une à une, leur note se
 * remplit, et la meilleure est signalée. Ce n'est pas une image, donc ça ne
 * vieillit pas quand l'application change ; et c'est du texte, donc ça se lit
 * et ça s'indexe. L'animation ne tourne que quand on la regarde, ne se joue
 * qu'une fois, et disparaît sous `prefers-reduced-motion` (tout est déjà en
 * place dans l'état final).
 *
 * Le panneau est le seul élément de la page qui garde une ombre : il flotte
 * vraiment au-dessus du reste. À l'intérieur, en revanche, plus de cartes
 * bordées dans la carte bordée : les annonces sont séparées par un filet,
 * comme des lignes d'une liste. Et la note, qui était le plus gros caractère
 * du panneau alors qu'elle n'est qu'une information secondaire, repasse sous
 * le titre de l'annonce. Le vert dit « bonne affaire » ; il ne doit pas
 * disputer la page au magenta de la marque.
 */
export function SceneAnnonces() {
  const { ref, vu } = useEnVue<HTMLDivElement>({ une: true, marge: "0px" });

  return (
    <div
      ref={ref}
      data-joue={vu ? "oui" : "non"}
      className="scene card-soft overflow-hidden rounded-xl px-4 py-3 sm:px-6 sm:py-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
        <p className="display text-lg text-ink">Mes annonces</p>
        <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-3">
          <span aria-hidden className="size-1.5 animate-breathe rounded-full bg-ink-3" />
          4 nouvelles
        </p>
      </div>

      <ol className="flex flex-col divide-y divide-rule border-t border-rule">
        {ANNONCES_SCENE.map((annonce, i) => (
          <Ligne key={annonce.titre} annonce={annonce} rang={i} premiere={i === 0} />
        ))}
      </ol>

      <p className="scene-pied mt-4 text-sm text-ink-3">
        Message de candidature préparé pour la première. Vous le relisez, vous l&apos;envoyez.
      </p>
    </div>
  );
}

function Ligne({
  annonce,
  rang,
  premiere,
}: {
  annonce: AnnonceExemple;
  rang: number;
  premiere: boolean;
}) {
  // Mêmes seuils que dans l'application (`scoreColor`), pour ne pas raconter
  // une autre histoire que le produit. Le vert d'encre du thème tient 5,4:1
  // sur la carte.
  const bonne = annonce.note >= 80;
  const couleur = bonne ? "text-good" : annonce.note >= 65 ? "text-ink" : "text-ink-3";

  return (
    <li className="scene-carte py-4" style={{ "--rang": rang } as React.CSSProperties}>
      {premiere && (
        <span className="scene-sceau mb-2 inline-flex items-center rounded-md border border-rule bg-paper-2 px-2 py-0.5 text-[12px] font-semibold text-ink">
          À contacter en priorité
        </span>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-ink">{annonce.titre}</p>
          <p className="tabular mt-1 text-sm text-ink-2">
            {annonce.prix} € · {annonce.surface} m² · {annonce.ville}
          </p>
          <p className="mt-0.5 text-[13px] text-ink-3">
            {annonce.auteur} · {annonce.publie}
          </p>
        </div>

        <p className={cn("display tabular shrink-0 text-lg sm:text-xl", couleur)}>
          {annonce.note}
          <span className="sr-only"> sur 100</span>
        </p>
      </div>

      {/* Jauge de la note : un filet de 2 px qui se remplit à l'arrivée. */}
      <div className="mt-3 h-[2px] overflow-hidden bg-muted">
        <span
          aria-hidden
          className={cn(
            "scene-jauge block h-full origin-left",
            bonne ? "bg-good" : annonce.note >= 65 ? "bg-ink-3" : "bg-field",
          )}
          style={{ width: `${annonce.note}%` }}
        />
      </div>

      {(annonce.pour || annonce.contre) && (
        <p className="mt-2.5 text-[13px] leading-snug text-ink-3">
          {annonce.pour && <span className="text-ink-2">{annonce.pour}</span>}
          {annonce.pour && annonce.contre && " · "}
          {annonce.contre}
        </p>
      )}
    </li>
  );
}
