import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Accès à la page privée /liste (qui a réservé).
 *
 * Un seul mot de passe, dans `ADMIN_PASSWORD` côté Vercel. Le cookie ne contient
 * pas ce mot de passe mais sa signature : même lu, il ne le révèle pas.
 */
export const COOKIE_NAME = "terouva_liste";
/** Trente jours : on ne se reconnecte pas à chaque visite. */
export const COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

/** Signature du mot de passe. Changer cette phrase invalide tous les cookies. */
export function tokenFor(password: string): string {
  return createHmac("sha256", password).update("terouva-liste-v1").digest("hex");
}

/**
 * Comparaison à durée constante : sans elle, le temps de réponse laisserait
 * deviner le jeton caractère par caractère.
 */
export function sameToken(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b) return false;
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Un mot de passe vide ou trop court ne protège rien : la page reste fermée. */
export function usablePassword(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length >= 8;
}
