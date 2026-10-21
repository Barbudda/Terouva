import Link from "next/link";
import { OUTILS } from "@/lib/catalogue";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Fleche } from "@/components/ui/LinkButton";

/**
 * Les outils gratuits, sur la page d'accueil.
 *
 * Ils y ont leur place pour une raison simple : l'application n'est pas encore
 * téléchargeable, et un visiteur qui ne laisse pas son adresse repartait sans
 * rien. Ces deux pages rendent service tout de suite, elles se partagent, et
 * elles ramènent du monde en attendant le lancement.
 */
export function Outils() {
  return (
    <section id="outils" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Gratuit, sans inscription"
          lead="En attendant,"
          tail="deux outils qui servent déjà."
          className="monte max-w-2xl"
        >
          Ils tournent dans votre navigateur. Pas de compte, pas de limite, et rien
          n&apos;est envoyé à un serveur.
        </SectionHeading>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {OUTILS.map((o) => (
            <li key={o.chemin} className="monte">
              <Link
                href={o.chemin}
                className="groupe-carte flex h-full flex-col rounded-lg border border-rule bg-card p-6 transition-colors hover:border-field sm:p-7"
              >
                <h3 className="display text-xl text-ink">{o.titre}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{o.resume}</p>
                {/* La flèche était enfermée dans un cercle bordé qui s'allumait
                    au survol. Un cercle de plus, et un effet que toutes les
                    cartes de toutes les pages de produit ont déjà. */}
                <span className="mt-6 flex items-center gap-2 text-[15px] font-semibold text-ink-3 transition-colors group-hover:text-accent">
                  Ouvrir l&apos;outil
                  <Fleche />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
