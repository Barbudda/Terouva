import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "État des lieux de location : entrée et sortie";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "État des lieux : la demi-heure qui décide de votre dépôt",
  });
}
