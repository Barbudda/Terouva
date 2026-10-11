import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Le message qui accompagne votre dossier, écrit en une minute";

export default function Image() {
  return imageOG({
    surtitre: "Outil gratuit",
    titre: "Le message qui accompagne votre dossier, écrit en une minute",
  });
}
