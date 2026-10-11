import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Des outils gratuits, qui ne gardent rien";

export default function Image() {
  return imageOG({
    surtitre: "Outils gratuits",
    titre: "Des outils gratuits, qui ne gardent rien",
  });
}
