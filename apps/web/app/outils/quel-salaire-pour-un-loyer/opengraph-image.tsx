import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Quel salaire pour un loyer : le calculateur gratuit de Terouva";

export default function Image() {
  return imageOG({
    surtitre: "Outil gratuit",
    titre: "Quel salaire pour quel loyer, et ce que Visale accepte",
  });
}
