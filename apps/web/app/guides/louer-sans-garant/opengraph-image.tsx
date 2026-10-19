import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Louer sans garant : les trois solutions, et ce qu'elles coûtent";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "Louer sans garant : les trois solutions",
  });
}
