import Link from "next/link";
import { PRIVACY } from "@/lib/content";
import { PapierLarge } from "@/components/layout/coquilles/PapierLarge";

/**
 * La confidentialité, coquille B, composée comme une note signée : le
 * paragraphe étroit, et dessous, en `.champ`, les faits techniques séparés
 * par des points médians. La seconde voix porte la fiche d'identité des
 * données, en quatre lignes.
 */
export function Privacy() {
  return (
    <PapierLarge
      id="donnees"
      mention={PRIVACY.eyebrow}
      depart={3}
      secondeVoix={
        <>
          <dl>
          {PRIVACY.points.map((p) => (
            <div key={p.label} className="border-t border-rule py-3 first:border-t-0 first:pt-0">
              <dt className="champ text-ink-3">{p.label}</dt>
              <dd className="mt-1 text-ink-2">{p.value}</dd>
            </div>
          ))}
          </dl>
          <p className="pt-4">
            <Link href="/confidentialite" className="lien">
              Lire la politique de confidentialité
            </Link>
          </p>
        </>
      }
    >
      <p>{PRIVACY.body}</p>
      <p className="champ mt-6 text-ink-3">Aucun serveur · Données locales · Aucun traceur</p>
    </PapierLarge>
  );
}
