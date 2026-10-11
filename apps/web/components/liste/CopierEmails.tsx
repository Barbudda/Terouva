"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copie toutes les adresses d'un coup, séparées par des virgules : de quoi les
 * coller dans le champ « Destinataires » d'un courriel ou dans Resend.
 */
export function CopierEmails({ emails }: { emails: string[] }) {
  const [copie, setCopie] = useState(false);

  if (emails.length === 0) return null;

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(emails.join(", "));
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      setCopie(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copier}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-rule bg-card px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-muted"
    >
      {copie ? (
        <Check aria-hidden className="size-4 text-good" strokeWidth={1.75} />
      ) : (
        <Copy aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
      )}
      {copie ? "Adresses copiées" : `Copier les ${emails.length} adresses`}
    </button>
  );
}
