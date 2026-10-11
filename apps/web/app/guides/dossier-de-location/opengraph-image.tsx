import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Dossier de location : la liste exacte des pièces qu'on peut vous demander";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "Dossier de location : la liste exacte des pièces qu'on peut vous demander",
  });
}
