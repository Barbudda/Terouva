import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { Badge, Card, EmptyState } from "@app/components/ui/Card";
import {
  APPLICATION_STATUS,
  formatDateTime,
  formatPrice,
} from "@app/components/listing/format";
import { getListing, listApplications, setApplicationStatus } from "@app/lib/db";
import { TONE_LABELS } from "@app/lib/messageGen";
import { openExternal } from "@app/lib/tauri";
import { cn } from "@app/lib/cn";
import { useStore } from "@app/store/useStore";
import type { Application, ApplicationStatus, Listing } from "@app/types";

interface Row {
  app: Application;
  listing?: Listing;
}

const FILTERS = ["all", "prepared", "sent", "replied", "rejected", "no_answer"] as const;

export default function Candidatures() {
  const navigate = useNavigate();
  const refreshListings = useStore((s) => s.refreshListings);
  const [rows, setRows] = useState<Row[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");

  const load = async () => {
    const apps = await listApplications();
    const out: Row[] = await Promise.all(
      apps.map(async (app) => ({
        app,
        listing: await getListing(app.listing_id),
      })),
    );
    setRows(out);
    setLoaded(true);
  };

  useEffect(() => {
    void load();
  }, []);

  const changeStatus = async (app: Application, status: ApplicationStatus) => {
    await setApplicationStatus(
      app.id,
      status,
      status === "sent" && !app.sent_at ? new Date().toISOString() : null,
    );
    await load();
    await refreshListings();
  };

  const filtered = filter === "all" ? rows : rows.filter((r) => r.app.status === filter);
  const counts = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.app.status] = (acc[r.app.status] ?? 0) + 1;
    return acc;
  }, {});

  if (loaded && rows.length === 0) {
    return (
      <EmptyState
        title="Aucune candidature pour l'instant"
        action={<Button onClick={() => navigate("/")}>Voir mes annonces</Button>}
      >
        Quand vous préparez un message depuis une annonce, la candidature apparaît ici. Vous
        pourrez ensuite noter si elle est envoyée et si vous avez reçu une réponse.
      </EmptyState>
    );
  }

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label="Filtrer par état" className="flex gap-1 overflow-x-auto overflow-y-hidden no-scrollbar border-b border-rule">
        {FILTERS.filter((s) => s === "all" || counts[s] || filter === s).map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={filter === s}
            onClick={() => setFilter(s)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-2 px-2.5 py-2 text-[15px] transition-colors",
              filter === s ? "border-accent font-medium text-ink" : "border-transparent text-ink-2 hover:text-ink",
            )}
          >
            {s === "all" ? "Toutes" : APPLICATION_STATUS[s].text}
            <span className="ml-1.5 text-[13px] text-ink-3 tabular">
              {s === "all" ? rows.length : counts[s] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(({ app, listing }) => {
          const status = APPLICATION_STATUS[app.status];
          const facts = [
            listing?.price != null ? formatPrice(listing.price) : null,
            listing?.city ?? null,
            app.message_tone ? `Ton ${TONE_LABELS[app.message_tone].toLowerCase()}` : null,
          ].filter(Boolean);
          return (
            <Card key={app.id} className="p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[17px] font-semibold leading-snug text-ink">
                    {listing?.title ?? "Annonce retirée de votre liste"}
                  </h3>
                  {facts.length > 0 && <p className="mt-1 text-[15px] text-ink-2">{facts.join(" · ")}</p>}
                  {app.sent_at && (
                    <p className="mt-0.5 text-[13px] text-ink-3">Envoyée le {formatDateTime(app.sent_at)}</p>
                  )}
                </div>
                <Badge tone={status.tone}>{status.text}</Badge>
              </div>

              {app.message && (
                <details className="group mt-4">
                  <summary className="inline-flex cursor-pointer items-center gap-1.5 text-[15px] font-medium text-ink hover:text-accent-ink">
                    Voir le message
                    <ChevronDown size={16} strokeWidth={1.75} aria-hidden className="transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-prose whitespace-pre-wrap rounded-md border border-rule bg-paper p-4 text-[15px] leading-relaxed text-ink">
                    {app.message}
                  </p>
                </details>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-rule pt-4">
                <span className="mr-1 text-[13px] text-ink-3">Mettre à jour :</span>
                {app.status !== "sent" && (
                  <Button size="sm" variant="secondary" onClick={() => changeStatus(app, "sent")}>
                    Envoyée
                  </Button>
                )}
                {app.status !== "replied" && (
                  <Button size="sm" variant="secondary" onClick={() => changeStatus(app, "replied")}>
                    Réponse reçue
                  </Button>
                )}
                {app.status !== "no_answer" && (
                  <Button size="sm" variant="ghost" onClick={() => changeStatus(app, "no_answer")}>
                    Sans réponse
                  </Button>
                )}
                {app.status !== "rejected" && (
                  <Button size="sm" variant="ghost" onClick={() => changeStatus(app, "rejected")}>
                    Refusée
                  </Button>
                )}
                {listing && (
                  <Button size="sm" variant="ghost" className="sm:ml-auto" onClick={() => openExternal(listing.url)}>
                    <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
                    Voir sur Leboncoin
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
