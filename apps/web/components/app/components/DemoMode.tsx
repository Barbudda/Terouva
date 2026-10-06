import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@app/components/ui/Button";
import { maybeNotifyHot } from "@app/components/listing/ingest";
import { DEMO_TOTAL } from "@app/lib/demo";
import { useDemoStore } from "@app/store/useDemoStore";

/** Intervalle entre deux arrivées d'annonces pendant la démonstration. */
const ARRIVAL_MS = 11_000;

/**
 * Bandeau de la démonstration : rappelle en permanence que les annonces sont
 * des exemples, affiche l'avancement et permet de tout effacer. C'est aussi lui
 * qui fait arriver les annonces suivantes (monté une seule fois, dans la coque).
 */
export function DemoBanner() {
  const navigate = useNavigate();
  const active = useDemoStore((s) => s.active);
  const step = useDemoStore((s) => s.step);
  const ready = useDemoStore((s) => s.ready);
  const init = useDemoStore((s) => s.init);
  const next = useDemoStore((s) => s.next);
  const stop = useDemoStore((s) => s.stop);
  const [leaving, setLeaving] = useState(false);

  // Le bandeau est le garde-fou de la démonstration : il doit apparaître même
  // si l'état n'a pas encore été lu ailleurs, sinon plus moyen d'en sortir.
  useEffect(() => {
    if (!ready) void init();
  }, [ready, init]);

  useEffect(() => {
    if (!active || step >= DEMO_TOTAL) return;
    const timer = window.setTimeout(async () => {
      const listing = await next();
      if (listing?.score != null) await maybeNotifyHot(listing, listing.score);
    }, ARRIVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, step, next]);

  if (!active) return null;

  const done = step >= DEMO_TOTAL;

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-warn/40 bg-warn-wash px-4 py-3">
      <div>
        <p className="text-[15px] font-semibold text-warn">Démonstration en cours</p>
        <p className="text-[15px] text-ink-2">
          Ces annonces sont des exemples, elles ne viennent pas de Leboncoin.{" "}
          {done
            ? "Les six annonces sont arrivées."
            : `${step} annonce${step > 1 ? "s" : ""} sur ${DEMO_TOTAL} pour l'instant, les suivantes arrivent toutes seules.`}
        </p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        disabled={leaving}
        onClick={async () => {
          setLeaving(true);
          try {
            await stop();
            navigate("/");
          } finally {
            setLeaving(false);
          }
        }}
      >
        {leaving ? "Effacement…" : "Quitter et tout effacer"}
      </Button>
    </div>
  );
}
