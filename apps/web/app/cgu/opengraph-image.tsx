import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Conditions générales d'utilisation";

/*
 * `pageMetadata` annonce `/cgu/opengraph-image` pour cette page : sans ce
 * fichier, l'adresse répondait 404 et un lien partagé s'affichait sans image.
 */
export default function Image() {
  return imageOG({
    surtitre: "Informations légales",
    titre: "Conditions générales d'utilisation",
  });
}
