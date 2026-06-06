import { useEffect, useState } from "react";
import {
  listPendingPairings,
  onPairRequest,
  respondPairing,
  type PairRequestEvent,
} from "@/lib/pairing";

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
    <div className="fixed inset-0 z-[60] grid place-items-center bg-zinc-950/75 backdrop-blur-sm">
      <div className="w-[420px] max-w-[92vw] rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-300 text-2xl">
            🔗
          </div>
          <h2 className="text-lg font-semibold text-zinc-100">
            Connecter l'extension Chrome ?
          </h2>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            Une extension navigateur demande à se connecter à Terouva pour
            surveiller tes recherches Leboncoin. Autorise-la une seule fois.
          </p>
          <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-left">
            <div className="text-sm text-zinc-200">{current.label}</div>
            <div className="mt-0.5 font-mono text-[11px] text-zinc-500 truncate">
              id : {current.ext_id}
            </div>
          </div>
          <p className="mt-3 text-[11px] text-zinc-500">
            N'autorise que si tu viens d'installer l'extension Terouva.
          </p>
        </div>
        <div className="flex border-t border-zinc-800">
          <button
            onClick={() => respond(false)}
            className="flex-1 py-3 text-sm text-zinc-400 hover:bg-zinc-800/60 transition-colors"
          >
            Refuser
          </button>
          <div className="w-px bg-zinc-800" />
          <button
            onClick={() => respond(true)}
            className="flex-1 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10 transition-colors"
          >
            Autoriser
          </button>
        </div>
        {queue.length > 1 && (
          <div className="px-6 py-2 text-center text-[11px] text-zinc-600 border-t border-zinc-800">
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
