import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Garantie Visale : qui peut l'avoir, et comment l'obtenir";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "Garantie Visale : qui peut l'avoir, et comment l'obtenir",
  });
}
