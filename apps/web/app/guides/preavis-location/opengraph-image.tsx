import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Préavis de location : durée et lettre de congé";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "Préavis de location : combien de temps, et quoi écrire",
  });
}
