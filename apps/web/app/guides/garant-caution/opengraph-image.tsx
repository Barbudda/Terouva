import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Garant de location : qui peut s'engager, et jusqu'à quand";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "Garant de location : qui peut s'engager, et jusqu'à quand",
  });
}
