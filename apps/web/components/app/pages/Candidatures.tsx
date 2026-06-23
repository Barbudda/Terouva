import { useEffect, useState } from "react";
import { Button } from "@app/components/ui/Button";
import { Badge, Card, CardBody, CardHeader, CardTitle } from "@app/components/ui/Card";
import { getListing, listApplications, setApplicationStatus } from "@app/lib/db";
import { openExternal } from "@app/lib/tauri";
import { useStore } from "@app/store/useStore";
import type { Application, ApplicationStatus, Listing } from "@app/types";

interface Row {
  app: Application;
  listing?: Listing;
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  prepared: "Brouillon",
  sent: "Envoyé",
  replied: "Réponse reçue",
  rejected: "Refusé",
  no_answer: "Sans réponse",
};

const STATUS_CLASS: Record<ApplicationStatus, string> = {
  prepared: "bg-[var(--color-urgent-soft)] text-[var(--color-urgent)] border-[var(--color-urgent)]/40",
  sent: "bg-[var(--color-panel-2)] text-[var(--color-text)] border-[var(--color-border-2)]",
  replied: "bg-[var(--color-signal-soft)] text-[var(--color-signal)] border-[var(--color-signal)]/40",
  rejected: "bg-[var(--color-danger-soft)] text-[var(--color-danger)] border-[var(--color-danger)]/40",
  no_answer: "bg-[var(--color-border-2)]/40 text-[var(--color-text-muted)] border-[var(--color-border-2)]/40",
};

export default function Candidatures() {
  const refreshListings = useStore((s) => s.refreshListings);
  const [rows, setRows] = useState<Row[]>([]);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "prepared", "sent", "replied", "rejected", "no_answer"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={
              "px-3 py-1 rounded-md text-xs border transition-colors " +
              (filter === s
                ? "bg-[var(--color-signal)] border-[var(--color-signal)] text-white"
                : "bg-[var(--color-bg-2)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]")
            }
          >
            {s === "all" ? "Toutes" : STATUS_LABELS[s]}{" "}
            {s !== "all" && counts[s] ? `(${counts[s]})` : ""}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardBody className="text-center py-10 text-[var(--color-text-faint)]">
            Aucune candidature. Allez sur la page Annonces pour en préparer une.
          </CardBody>
        </Card>
      )}

      <div className="space-y-3">
        {filtered.map(({ app, listing }) => (
          <Card key={app.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <CardTitle className="truncate">
                    {listing?.title ?? `Annonce #${app.listing_id}`}
                  </CardTitle>
                  <div className="mt-1 text-xs text-[var(--color-text-muted)] flex flex-wrap gap-x-3">
                    {listing?.price !== undefined && listing?.price !== null && (
                      <span>{listing.price}€</span>
                    )}
                    {listing?.city && <span>{listing.city}</span>}
                    {app.sent_at && (
                      <span>envoyé {new Date(app.sent_at).toLocaleString("fr-FR")}</span>
                    )}
                    {app.message_tone && <span>ton: {app.message_tone}</span>}
                  </div>
                </div>
                <Badge className={STATUS_CLASS[app.status]}>{STATUS_LABELS[app.status]}</Badge>
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              {app.message && (
                <details>
                  <summary className="cursor-pointer text-xs text-[var(--color-text-muted)]">
                    Voir le message
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs text-[var(--color-text)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded p-3">
                    {app.message}
                  </pre>
                </details>
              )}
              <div className="flex flex-wrap items-center gap-2">
                {listing && (
                  <Button size="sm" variant="secondary" onClick={() => openExternal(listing.url)}>
                    Ouvrir l'annonce
                  </Button>
                )}
                {app.status !== "sent" && (
                  <Button size="sm" variant="success" onClick={() => changeStatus(app, "sent")}>
                    Marquer envoyé
                  </Button>
                )}
                {app.status !== "replied" && (
                  <Button size="sm" variant="secondary" onClick={() => changeStatus(app, "replied")}>
                    Réponse reçue
                  </Button>
                )}
                {app.status !== "rejected" && (
                  <Button size="sm" variant="ghost" onClick={() => changeStatus(app, "rejected")}>
                    Refusé
                  </Button>
                )}
                {app.status !== "no_answer" && (
                  <Button size="sm" variant="ghost" onClick={() => changeStatus(app, "no_answer")}>
                    Sans réponse
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
