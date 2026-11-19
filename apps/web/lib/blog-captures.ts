import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Les captures de l'outil posées dans le corps des articles au format série (voir `FIGURE` dans
 * `lib/blog-format.ts`). Serveur seulement : le rendu et le vérificateur lisent les dimensions dans
 * le fichier lui-même, pour que `next/image` réserve la bonne place sans qu'on les recopie à la main.
 */

/** Le dossier public des captures, tel qu'il s'écrit dans un article. */
export const DOSSIER_CAPTURES = "/blog/captures/";

/** Le fichier sur disque derrière une adresse publique (`/blog/captures/x.webp`). */
export function fichierPublic(src: string): string {
  return path.join(process.cwd(), "public", ...src.split("/").filter(Boolean));
}

/**
 * Largeur et hauteur d'une image WebP, lues dans son en-tête (sans dépendance native : `sharp` ne
 * doit pas entrer dans le rendu d'une page). Les trois variantes du format sont couvertes : VP8
 * (avec perte), VP8L (sans perte) et VP8X (étendu). `null` si le fichier n'est pas un WebP lisible.
 */
export function dimensionsWebp(octets: Buffer): { largeur: number; hauteur: number } | null {
  if (octets.length < 30) return null;
  if (octets.toString("ascii", 0, 4) !== "RIFF" || octets.toString("ascii", 8, 12) !== "WEBP") return null;
  const bloc = octets.toString("ascii", 12, 16);
  if (bloc === "VP8 " && octets[23] === 0x9d && octets[24] === 0x01 && octets[25] === 0x2a) {
    return { largeur: octets.readUInt16LE(26) & 0x3fff, hauteur: octets.readUInt16LE(28) & 0x3fff };
  }
  if (bloc === "VP8L" && octets[20] === 0x2f) {
    const bits = octets.readUInt32LE(21);
    return { largeur: (bits & 0x3fff) + 1, hauteur: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (bloc === "VP8X") {
    return { largeur: octets.readUIntLE(24, 3) + 1, hauteur: octets.readUIntLE(27, 3) + 1 };
  }
  return null;
}

/** Les dimensions d'une capture, ou `null` si le fichier manque ou n'est pas un WebP. */
export function dimensionsCapture(src: string): { largeur: number; hauteur: number } | null {
  const fichier = fichierPublic(src);
  if (!existsSync(fichier)) return null;
  return dimensionsWebp(readFileSync(fichier));
}
