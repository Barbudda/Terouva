import Link from "next/link";
import { EDITEUR, FOOTER } from "@/lib/content";
import { PiedLogotype } from "@/components/layout/coquilles/PiedLogotype";

/**
 * Le pied de page consomme la coquille F. Les quatre colonnes viennent de
 * `FOOTER.columns` ; la ligne du bas nomme l'éditeur, renvoie aux textes
 * légaux et rappelle que Terouva n'a aucun lien avec Leboncoin.
 */
export function Footer() {
  return (
    <PiedLogotype
      colonnes={FOOTER.columns.map((c) => ({ titre: c.title, liens: c.links }))}
      ligne={
        <>
          <p>Édité par {EDITEUR.marque} · {FOOTER.local}</p>
          <p className="flex flex-wrap gap-x-4">
            <Link href="/mentions-legales" className="hover:text-ink">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-ink">
              Confidentialité
            </Link>
            <Link href="/cgu" className="hover:text-ink">
              Conditions d&apos;utilisation
            </Link>
            <span>{FOOTER.disclaimer}</span>
            <span>{new Date().getFullYear()}</span>
          </p>
        </>
      }
    />
  );
}
