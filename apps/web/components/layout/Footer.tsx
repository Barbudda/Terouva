import { lienBlog } from "@/lib/blog";
import { EDITEUR, FOOTER } from "@/lib/content";
import { PiedLogotype } from "@/components/layout/coquilles/PiedLogotype";

/**
 * Le pied de page consomme la coquille F. Les quatre colonnes viennent de
 * `FOOTER.columns` ; la ligne du bas nomme l'éditeur, renvoie aux textes
 * légaux et rappelle que Terouva n'a aucun lien avec Leboncoin.
 *
 * Les trois textes légaux ne sont plus répétés dans la ligne du bas : la
 * colonne « Mentions légales » les porte déjà, et sur téléphone ces liens
 * de 13 px serrés sur une ligne étaient trop petits pour le pouce.
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
            <span>{FOOTER.disclaimer}</span>
            <span>{new Date().getFullYear()}</span>
          </p>
        </>
      }
    />
  );
}
