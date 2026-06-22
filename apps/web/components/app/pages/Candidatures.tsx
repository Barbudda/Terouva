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
  prepared: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  sent: "bg-blue-500/15 text-blue-300 border-blue-500/40",
  replied: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  rejected: "bg-red-500/15 text-red-300 border-red-500/40",
  no_answer: "bg-zinc-700/40 text-zinc-400 border-zinc-600/40",
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
                ? "bg-violet-500 border-violet-400 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")
            }
          >
            {s === "all" ? "Toutes" : STATUS_LABELS[s]}{" "}
            {s !== "all" && counts[s] ? `(${counts[s]})` : ""}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardBody className="text-center py-10 text-zinc-500">
            Aucune candidature. Va sur la page Annonces pour en préparer une.
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
                  <div className="mt-1 text-xs text-zinc-400 flex flex-wrap gap-x-3">
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
                  <summary className="cursor-pointer text-xs text-zinc-400">
                    Voir le message
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs text-zinc-200 bg-zinc-950 border border-zinc-800 rounded p-3">
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
