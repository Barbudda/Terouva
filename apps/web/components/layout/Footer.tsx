import Link from "next/link";
import { lienBlog } from "@/lib/blog";
import { EDITEUR, FOOTER } from "@/lib/content";
import { PiedLogotype } from "@/components/layout/coquilles/PiedLogotype";

/**
 * Le pied de page consomme la coquille F. Les quatre colonnes viennent de
 * `FOOTER.columns` ; la ligne du bas nomme l'éditeur, renvoie aux textes
 * légaux et rappelle que Terouva n'a aucun lien avec Leboncoin.
 *
 * Le blog s'ajoute à la colonne des guides dès son premier article publié, et
 * pas avant : le pied est sur toutes les pages, c'est le lien qui fait entrer
 * chaque nouvel article dans le maillage sans retoucher les autres pages.
 */
export function Footer() {
  const blog = lienBlog();
  const colonnes = FOOTER.columns.map((c) => ({
    titre: c.title,
    liens: blog && c.title === "Guides" ? [...c.links, blog] : c.links,
  }));
  return (
    <PiedLogotype
      colonnes={colonnes}
      ligne={
        <>
          <p>Édité par {EDITEUR.marque}</p>
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
