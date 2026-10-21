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
 */
export function SceneAnnonces() {
  const { ref, vu } = useEnVue<HTMLDivElement>({ une: true, marge: "0px" });

  return (
    <div
      ref={ref}
      data-joue={vu ? "oui" : "non"}
      className="scene card-soft overflow-hidden rounded-xl p-3 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4">
        <p className="display text-lg text-ink">Mes annonces</p>
        <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-3">
          <span aria-hidden className="size-1.5 animate-breathe rounded-full bg-accent" />
          4 nouvelles
        </p>
      </div>

      <ol className="flex flex-col gap-2">
        {ANNONCES_SCENE.map((annonce, i) => (
          <Carte key={annonce.titre} annonce={annonce} rang={i} premiere={i === 0} />
        ))}
      </ol>

      <p className="scene-pied mt-4 px-1 text-sm text-ink-3">
        Message de candidature préparé pour la première. Vous le relisez, vous l&apos;envoyez.
      </p>
    </div>
  );
}

function Carte({
  annonce,
  rang,
  premiere,
}: {
  annonce: AnnonceExemple;
  rang: number;
  premiere: boolean;
}) {
  // Mêmes seuils que dans l'application (`scoreColor`), pour ne pas raconter
  // une autre histoire que le produit.
  const couleur =
    annonce.note >= 80 ? "text-good" : annonce.note >= 65 ? "text-ink" : "text-ink-3";

  return (
    <li
      className={cn(
        "scene-carte relative rounded-lg border bg-card p-3 sm:p-4",
        premiere ? "border-accent-wash" : "border-rule",
      )}
      style={{ "--rang": rang } as React.CSSProperties}
    >
      {premiere && (
        <span className="scene-sceau mb-2 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent-wash px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] text-accent-ink uppercase">
          À contacter en priorité
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{annonce.titre}</p>
          <p className="tabular mt-1 text-sm text-ink-2">
            {annonce.prix} € · {annonce.surface} m² · {annonce.ville}
          </p>
          <p className="mt-0.5 text-[13px] text-ink-3">
            {annonce.auteur} · {annonce.publie}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className={cn("display tabular text-2xl sm:text-3xl", couleur)}>
            {annonce.note}
            <span className="sr-only"> sur 100</span>
          </p>
        </div>
      </div>

      {/* Jauge de la note : elle se remplit à l'arrivée de la carte. */}
      <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-muted">
        <span
          aria-hidden
          className={cn(
            "scene-jauge block h-full origin-left rounded-full",
            annonce.note >= 80 ? "bg-good" : annonce.note >= 65 ? "bg-ink-3" : "bg-field",
          )}
          style={{ width: `${annonce.note}%` }}
        />
      </div>

      {(annonce.pour || annonce.contre) && (
        <p className="mt-2.5 text-[13px] leading-snug text-ink-3">
          {annonce.pour && <span className="text-good">{annonce.pour}</span>}
          {annonce.pour && annonce.contre && " · "}
          {annonce.contre}
        </p>
      )}
    </li>
  );
}
