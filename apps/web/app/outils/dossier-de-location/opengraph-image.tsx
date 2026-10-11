import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Checklist de dossier de location, selon votre situation";

export default function Image() {
  return imageOG({
    surtitre: "Outil gratuit",
    titre: "Les pièces de votre dossier de location, selon votre situation",
  });
}
