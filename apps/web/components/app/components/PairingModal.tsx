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
 * « Autoriser cette extension ? ». Un clic suffit — aucun token à manipuler.
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
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[var(--color-bg)]/75 backdrop-blur-sm">
      <div className="w-[420px] max-w-[92vw] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] shadow-2xl overflow-hidden">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-[var(--color-signal-soft)] text-[var(--color-signal)] text-2xl">
            🔗
          </div>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            Connecter l'extension Chrome ?
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
            Une extension navigateur demande à se connecter à Terouva pour
            surveiller vos recherches Leboncoin. Autorisez-la une seule fois.
          </p>
          <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-4 py-3 text-left">
            <div className="text-sm text-[var(--color-text)]">{current.label}</div>
            <div className="mt-0.5 font-mono text-[11px] text-[var(--color-text-faint)] truncate">
              id : {current.ext_id}
            </div>
          </div>
          <p className="mt-3 text-[11px] text-[var(--color-text-faint)]">
            N'autorisez que si vous venez d'installer l'extension Terouva.
          </p>
        </div>
        <div className="flex border-t border-[var(--color-border)]">
          <button
            onClick={() => respond(false)}
            className="flex-1 py-3 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-panel-2)]/60 transition-colors"
          >
            Refuser
          </button>
          <div className="w-px bg-[var(--color-panel-2)]" />
          <button
            onClick={() => respond(true)}
            className="flex-1 py-3 text-sm font-semibold text-[var(--color-signal)] hover:bg-[var(--color-signal-soft)] transition-colors"
          >
            Autoriser
          </button>
        </div>
        {queue.length > 1 && (
          <div className="px-6 py-2 text-center text-[11px] text-[var(--color-text-faint)] border-t border-[var(--color-border)]">
            {queue.length - 1} autre(s) demande(s) en attente
          </div>
        )}
      </div>
    </div>
  );
}

function mergeUnique(
  a: PairRequestEvent[],
  b: PairRequestEvent[],
): PairRequestEvent[] {
  const seen = new Set(a.map((x) => x.id));
  return [...a, ...b.filter((x) => !seen.has(x.id))];
}
