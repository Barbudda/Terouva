import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Ce qui change quand on cherche un logement";

export default function Image() {
  return imageOG({
    surtitre: "Blog",
    titre: "Ce qui change quand on cherche un logement",
  });
}
