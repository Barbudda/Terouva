import { CHIFFRES } from "@/lib/content";

/**
 * Chiffres clés, sur un gris très clair.
 *
 * Aucun n'est une statistique d'usage : Terouva n'est pas sorti, et inventer
 * « 10 000 utilisateurs » serait un mensonge qui se voit. Ce sont des faits
 * vérifiables sur le produit lui-même, dont deux valent zéro. C'est justement
 * l'argument : zéro compte, zéro serveur.
 */
export function Chiffres() {
  return (
    <section className="px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl rounded-xl bg-ash px-5 py-10 sm:px-10 md:py-14">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CHIFFRES.map((c) => (
            <div key={c.unite} className="monte">
              {/* Le nombre et son unité sur la même ligne de base : c'est ce
                  qui transforme « 0 » en « 0 compte à créer ». */}
              <dt className="flex items-baseline gap-2">
                <span className="display tabular text-[2.75rem] leading-none text-accent sm:text-[3.25rem]">
                  {c.valeur}
                </span>
                <span className="text-[17px] font-bold text-ink">{c.unite}</span>
              </dt>
              <dd className="mt-2.5 leading-snug text-ink-2">{c.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
