import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, CardTitle, StatPill } from "@app/components/ui/Card";
import { Button } from "@app/components/ui/Button";
import { listApplications } from "@app/lib/db";
import { recommendationLabel } from "@app/lib/scoring";
import { openExternal } from "@app/lib/tauri";
import { useStore } from "@app/store/useStore";
import type { Application, ScoreReasons } from "@app/types";

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const listings = useStore((s) => s.listings);
  const searches = useStore((s) => s.searches);
  const documents = useStore((s) => s.documents);
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    listApplications().then(setApps);
  }, [listings]);

  const stats = useMemo(() => {
    const total = listings.length;
    const fresh = listings.filter((l) => l.status === "new").length;
    const hot = listings.filter((l) => (l.score ?? 0) >= 80).length;
    const sent = apps.filter((a) => a.status === "sent").length;
    const prepared = apps.filter((a) => a.status === "prepared").length;
    return { total, fresh, hot, sent, prepared };
  }, [listings, apps]);

  const top = useMemo(() => {
    return [...listings]
      .filter((l) => l.status !== "ignored" && l.status !== "applied" && l.status !== "expired")
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, 5);
  }, [listings]);

  const docsReady = documents.filter((d) => d.available).length;
  const docsRequired = documents.filter((d) => d.required).length;
  const docsRequiredReady = documents.filter((d) => d.required && d.available).length;
  const dossierComplete = docsRequired > 0 && docsRequiredReady === docsRequired;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatPill label="Annonces" value={stats.total} hint={`${stats.fresh} nouvelles`} />
        <StatPill label="Hot" value={stats.hot} hint="score ≥ 80" />
        <StatPill label="Brouillons" value={stats.prepared} />
        <StatPill label="Envoyées" value={stats.sent} />
        <StatPill
          label="Recherches actives"
          value={searches.filter((s) => s.is_active).length}
          hint={`${searches.length} au total`}
        />
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Top annonces à traiter</CardTitle>
            <Link to="/annonces" className="text-xs text-[var(--color-signal)] hover:text-[var(--color-signal)]">
              voir tout →
            </Link>
          </CardHeader>
          <CardBody className="space-y-2">
            {top.length === 0 && (
              <div className="text-sm text-[var(--color-text-faint)] py-6 text-center">
                Aucune annonce prioritaire pour l'instant.
              </div>
            )}
            {top.map((l) => {
              const reasons = safeParse<ScoreReasons>(l.score_reasons);
              const rec = reasons ? recommendationLabel(reasons.recommendation) : null;
              return (
                <div
                  key={l.id}
                  className="flex items-center gap-3 p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-panel)]/40"
                >
                  <div className="text-2xl font-semibold text-[var(--color-text)] w-12 text-center shrink-0">
                    {l.score ?? "—"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[var(--color-text)] truncate">{l.title ?? "Sans titre"}</div>
                    <div className="text-xs text-[var(--color-text-faint)] flex flex-wrap gap-x-3">
                      {l.price !== null && <span>{l.price}€</span>}
                      {l.surface !== null && <span>{l.surface}m²</span>}
                      {l.rooms !== null && <span>{l.rooms}p</span>}
                      {l.city && <span>{l.city}</span>}
                    </div>
                  </div>
                  {rec && <Badge className={rec.className}>{rec.text}</Badge>}
                  <Button size="sm" variant="secondary" onClick={() => openExternal(l.url)}>
                    Ouvrir
                  </Button>
                </div>
              );
            })}
          </CardBody>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dossier locataire</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">
                  {docsReady}/{documents.length} documents prêts
                </span>
                {dossierComplete ? (
                  <Badge className="bg-[var(--color-signal-soft)] text-[var(--color-signal)] border-[var(--color-signal)]/40">
                    complet
                  </Badge>
                ) : (
                  <Badge className="bg-[var(--color-urgent-soft)] text-[var(--color-urgent)] border-[var(--color-urgent)]/40">
                    {docsRequired - docsRequiredReady} requis manquant
                    {docsRequired - docsRequiredReady > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
              <div className="mt-3 h-2 bg-[var(--color-panel-2)] rounded">
                <div
                  className="h-full rounded bg-gradient-to-r from-[var(--color-signal)] to-[var(--color-signal)]"
                  style={{
                    width: `${documents.length > 0 ? (docsReady / documents.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <Link
                to="/reglages"
                className="block mt-3 text-xs text-[var(--color-signal)] hover:text-[var(--color-signal)]"
              >
                Gérer les pièces →
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Raccourcis</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
              <Link
                to="/annonces"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-signal)] transition-colors"
              >
                + Ajouter une annonce par URL
              </Link>
              <Link
                to="/recherches"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-signal)] transition-colors"
              >
                + Créer une recherche
              </Link>
              <Link
                to="/profil"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-signal)] transition-colors"
              >
                ★ Compléter mon profil
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
