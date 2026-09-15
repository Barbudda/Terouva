import { useEffect, useState } from "react";
import {
  listPendingPairings,
  onPairRequest,
  respondPairing,
  type PairRequestEvent,
} from "@app/lib/pairing";

/**
 * Modale d'appairage. Montée en permanence dans le Layout. Quand une extension
 * Chrome demande à se connecter (event `pair:request`), on affiche
 * « Autoriser cette extension ? ». Un clic suffit, aucun code à manipuler.
 */
export function PairingModal() {
  const [queue, setQueue] = useState<PairRequestEvent[]>([]);

  useEffect(() => {
    let unlisten: (() => void) | undefined;
    // Demandes déjà en attente (si la modale se monte après l'event).
    listPendingPairings().then((pending) => {
      if (pending.length) setQueue((q) => mergeUnique(q, pending));
    });
    onPairRequest((e) => setQueue((q) => mergeUnique(q, [e]))).then((fn) => {
      unlisten = fn;
    });
    return () => unlisten?.();
  }, []);

  const current = queue[0];
  if (!current) return null;

  const respond = async (approve: boolean) => {
    try {
      await respondPairing(current.id, approve);
    } catch (e) {
      console.error("respond_pairing a échoué:", e);
    } finally {
      setQueue((q) => q.filter((p) => p.id !== current.id));
    }
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/30 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pairing-title"
        className="w-[420px] max-w-full overflow-hidden rounded-md border border-rule bg-card shadow-[0_12px_40px_-12px_rgb(31_29_26/0.35)]"
      >
        <div className="p-6">
          <h2 id="pairing-title" className="font-serif text-2xl font-medium text-ink">
            Connecter l'extension Chrome ?
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
            Une extension de votre navigateur demande à se connecter à Terouva pour
            suivre vos recherches Leboncoin. Il suffit de l'autoriser une fois.
          </p>
          <div className="mt-4 rounded-md border border-rule bg-paper px-4 py-3">
            <div className="text-[15px] text-ink">{current.label}</div>
            <div className="mt-0.5 truncate font-mono text-[12px] text-ink-3">{current.ext_id}</div>
          </div>
          <p className="mt-3 text-[13px] text-ink-3">
            N'autorisez que si vous venez d'installer l'extension Terouva.
          </p>
        </div>
        <div className="flex justify-end gap-2 border-t border-rule px-6 py-4">
          <button
            onClick={() => respond(false)}
            className="h-9 rounded-md px-4 text-[15px] text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            Refuser
          </button>
          <button
            onClick={() => respond(true)}
            className="h-9 rounded-md bg-accent px-4 text-[15px] font-medium text-card transition-colors hover:bg-accent-ink"
          >
            Autoriser
          </button>
        </div>
        {queue.length > 1 && (
          <div className="border-t border-rule px-6 py-2 text-[13px] text-ink-3">
            {queue.length - 1} autre(s) demande(s) en attente
          </div>
        )}
      </div>
    </div>
  );
}

function mergeUnique(a: PairRequestEvent[], b: PairRequestEvent[]): PairRequestEvent[] {
  const seen = new Set(a.map((x) => x.id));
  return [...a, ...b.filter((x) => !seen.has(x.id))];
}
