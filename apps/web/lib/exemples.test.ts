import { describe, expect, it } from "vitest";
import { ANNONCES, EXEMPLES_ACCUEIL } from "./exemples";

/**
 * Les flèches de l'accueil font défiler six annonces et leurs messages. Si un
 * titre change d'un côté et pas de l'autre, l'annonce afficherait le message
 * d'une autre : ces deux tests l'empêchent.
 */
describe("exemples de l'accueil", () => {
  it("associe à chaque annonce un message qui lui est propre", () => {
    expect(EXEMPLES_ACCUEIL).toHaveLength(ANNONCES.length);
    expect(new Set(EXEMPLES_ACCUEIL.map((e) => e.message)).size).toBe(
      ANNONCES.length,
    );
  });

  it("garde la même note dans l'annonce et dans son message", () => {
    for (const { annonce, message } of EXEMPLES_ACCUEIL) {
      expect(message.note).toBe(annonce.note);
    }
  });
});
