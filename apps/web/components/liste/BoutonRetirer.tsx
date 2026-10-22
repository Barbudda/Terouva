"use client";

import { X } from "lucide-react";

/**
 * Retrait d'une adresse, avec confirmation.
 *
 * Le bouton était immédiat et sans retour possible. Depuis que le journal de
 * sauvegarde est purgé en même temps que l'enregistrement, c'est encore plus
 * vrai : un clic de travers efface la seule et dernière trace de la personne.
 *
 * La confirmation n'est donc pas une politesse d'interface, c'est la seule
 * protection qui reste contre l'erreur de manipulation. Elle nomme l'adresse
 * concernée, parce qu'une question qui ne dit pas sur quoi elle porte
 * s'accepte sans la lire.
 */
export function BoutonRetirer({
  clef,
  email,
  action,
}: {
  clef: string;
  email: string;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={action}
      className="shrink-0"
      onSubmit={(e) => {
        const ok = window.confirm(
          `Retirer ${email} de la liste d'attente ?\n\n` +
            "C'est définitif. La copie de sauvegarde est supprimée en même temps, " +
            "comme le veut une demande de retrait.",
        );
        if (!ok) e.preventDefault();
      }}
    >
      <input type="hidden" name="clef" value={clef} />
      <button
        type="submit"
        aria-label={`Retirer ${email} de la liste`}
        className="grid size-11 place-items-center rounded-full text-ink-3 transition-colors hover:bg-muted hover:text-bad"
      >
        <X aria-hidden className="size-4" strokeWidth={1.75} />
      </button>
    </form>
  );
}
