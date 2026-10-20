"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { COOKIE_MAX_AGE, COOKIE_NAME, sameToken, tokenFor, usablePassword } from "@/lib/admin";
import { supprimer } from "@/lib/inscriptions";

/**
 * Ralentisseur en mémoire. Les instances serverless ne partagent rien : ce n'est
 * pas un rempart, juste de quoi rendre l'essai de mots de passe fastidieux.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60_000;

function tooManyAttempts(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function connexion(formData: FormData) {
  const expected = process.env.ADMIN_PASSWORD;
  const given = String(formData.get("motdepasse") ?? "");

  if (!usablePassword(expected)) redirect("/liste?erreur=config");
  if (tooManyAttempts("liste")) redirect("/liste?erreur=trop");

  if (given !== expected) redirect("/liste?erreur=refus");

  const jar = await cookies();
  jar.set(COOKIE_NAME, tokenFor(expected), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/liste",
    maxAge: COOKIE_MAX_AGE,
  });
  redirect("/liste");
}

/**
 * Retire une adresse, sur demande de la personne concernée.
 *
 * Une action serveur est appelable par n'importe qui connaissant son
 * identifiant : on revérifie donc le cookie ici, sans se reposer sur le fait
 * que le bouton ne s'affiche que pour une session ouverte.
 */
export async function retirer(formData: FormData) {
  const motDePasse = process.env.ADMIN_PASSWORD;
  if (!usablePassword(motDePasse)) redirect("/liste?erreur=config");

  const jar = await cookies();
  if (!sameToken(jar.get(COOKIE_NAME)?.value, tokenFor(motDePasse))) redirect("/liste");

  const clef = String(formData.get("clef") ?? "");
  await supprimer(clef);
  revalidatePath("/liste");
}

export async function deconnexion() {
  const jar = await cookies();
  jar.delete({ name: COOKIE_NAME, path: "/liste" });
  redirect("/liste");
}
