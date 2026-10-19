import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Dépôt de garantie : montant, retenues et restitution";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "Dépôt de garantie : montant, retenues et restitution",
  });
}
