import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Répondre à une annonce de location : ce qui fait la différence";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "Répondre à une annonce de location : ce qui fait la différence",
  });
}
