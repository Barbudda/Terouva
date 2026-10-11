import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Chercher un logement sans y perdre son temps ni ses droits";

export default function Image() {
  return imageOG({
    surtitre: "Guides",
    titre: "Chercher un logement sans y perdre son temps ni ses droits",
  });
}
