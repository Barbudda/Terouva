import Link from "next/link";
import { PRIVACY } from "@/lib/content";
import { PapierLarge } from "@/components/layout/coquilles/PapierLarge";
import { CetOrdinateur } from "@/components/sections/illustrations/CetOrdinateur";

/**
 * La confidentialité, coquille B, composée comme une note signée : le
 * paragraphe étroit, et dessous, en `.champ`, les faits techniques séparés
 * par des points médians. La seconde voix porte la fiche d'identité des
 * données, en quatre lignes, dans un cadre qui court sur la hauteur de la
 * section. Sous l'énoncé, le schéma : ce qui reste sur votre ordinateur, et
 * le serveur qui n'existe pas. La section paraissait vide (Hugo, 1er novembre).
 */
export function Privacy() {
  return (
    <PapierLarge
      id="donnees"
      mention={PRIVACY.eyebrow}
      depart={3}
      illustration={<CetOrdinateur />}
      disposition="colonne"
      secondeVoix={
        <>
          <dl>
          {PRIVACY.points.map((p) => (
            <div key={p.label} className="border-t border-white/[0.08] py-3.5 first:border-t-0 first:pt-0">
              <dt className="champ text-ink-3">{p.label}</dt>
              <dd className="mt-1 text-ink-2">{p.value}</dd>
            </div>
          ))}
          </dl>
          <p className="pt-5">
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
