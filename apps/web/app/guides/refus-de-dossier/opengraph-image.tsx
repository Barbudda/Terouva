import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Un propriétaire peut-il refuser votre dossier de location ?";

export default function Image() {
  return imageOG({
    surtitre: "Guide",
    titre: "Un propriétaire peut-il refuser votre dossier ?",
  });
}
