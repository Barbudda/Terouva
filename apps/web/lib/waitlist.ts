/**
 * Validation des inscriptions à la liste d'attente.
 *
 * Isolée de la route pour être testable sans réseau : tout ce qui arrive du
 * formulaire est contrôlé ici, avant le moindre appel externe.
 */

/** Volontairement simple : on refuse l'évidemment faux, pas on ne devine pas. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export type WaitlistInput =
  | { kind: "ok"; email: string }
  /** Champ piège rempli : c'est un robot. On ne dit rien et on n'enregistre rien. */
  | { kind: "bot" }
  | { kind: "invalid"; message: string };

export function parseWaitlistInput(body: unknown): WaitlistInput {
  if (!body || typeof body !== "object") {
    return { kind: "invalid", message: "Requête illisible." };
  }
  const { email, website } = body as { email?: unknown; website?: unknown };

  if (typeof website === "string" && website.trim() !== "") return { kind: "bot" };

  if (typeof email !== "string") {
    return { kind: "invalid", message: "Indiquez votre adresse e-mail." };
  }
  const clean = email.trim().toLowerCase();
  if (clean.length === 0) {
    return { kind: "invalid", message: "Indiquez votre adresse e-mail." };
  }
  if (clean.length > 254 || !EMAIL.test(clean)) {
    return { kind: "invalid", message: "Cette adresse e-mail ne semble pas valide." };
  }
  return { kind: "ok", email: clean };
}
