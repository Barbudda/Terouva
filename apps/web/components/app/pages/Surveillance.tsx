import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@app/components/ui/Button";
import { Badge, Card, EmptyState, StatPill } from "@app/components/ui/Card";
import { Field, Input } from "@app/components/ui/Input";
import { useBridgeState } from "@app/components/Sidebar";
import {
  formatPrice,
  RECOMMENDATION,
  recommendationFromScore,
} from "@app/components/listing/format";
import { connectExtension, getExtId, pingExtension, setExtId } from "@app/lib/extBridge";
import { cn } from "@app/lib/cn";
import { useWatchStore } from "@app/store/useWatchStore";

/**
 * « Connexion avec l'extension » : diagnostic du pont externally_connectable.
 * Statut de la connexion, identifiant (mode développeur), test, et journal des
 * annonces reçues. 100 % local.
 */
export default function Surveillance() {
  const navigate = useNavigate();
  const recent = useWatchStore((s) => s.recent);
  const bridge = useBridgeState();
  const [extIdInput, setExtIdInput] = useState("");
  const [ping, setPing] = useState<"idle" | "testing" | "ok" | "ko">("idle");
  const isDev = typeof window !== "undefined" && window.location.hostname === "localhost";

  useEffect(() => {
    void getExtId().then(setExtIdInput);
  }, []);

  const saveAndConnect = async () => {
    await setExtId(extIdInput);
    await connectExtension();
  };

  const testConnection = async () => {
    setPing("testing");
    const ok = await pingExtension();
    setPing(ok ? "ok" : "ko");
    setTimeout(() => setPing("idle"), 2500);
  };

  const { connected, available } = bridge;

  const status = connected
    ? { tone: "good" as const, text: "Connectée", detail: "Les nouvelles annonces repérées sur Leboncoin arrivent automatiquement dans « Mes annonces »." }
    : bridge.error === "ext-id-manquant"
      ? { tone: "warn" as const, text: "À configurer", detail: "L'extension est présente, mais son identifiant n'est pas encore renseigné." }
      : bridge.error === "connexion-refusée"
        ? { tone: "bad" as const, text: "Connexion refusée", detail: "L'extension n'a pas accepté la connexion. Vérifiez qu'elle est bien installée et activée dans Chrome." }
        : available
          ? { tone: "warn" as const, text: "Connexion en cours", detail: "L'extension est détectée, la connexion s'établit." }
          : { tone: "muted" as const, text: "Non détectée", detail: "L'extension Terouva n'est pas détectée dans ce navigateur." };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3 px-4 pt-5 sm:px-5">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl font-medium text-ink">Extension Chrome</h2>
            <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{status.detail}</p>
          </div>
          <Badge tone={status.tone} className="text-[15px]">
            <span
              aria-hidden
              className={cn(
                "mr-2 size-2 rounded-full",
                connected ? "animate-breathe bg-good" : status.tone === "bad" ? "bg-bad" : status.tone === "warn" ? "bg-warn" : "bg-field",
              )}
            />
            {status.text}
          </Badge>
        </div>

        <div className="space-y-5 px-4 py-5 sm:px-5">
          {!available && (
            <div className="rounded-md bg-paper-2 p-4 text-[15px] leading-relaxed text-ink-2">
              {isDev ? (
                <ol className="list-decimal space-y-1 pl-5">
                  <li>
                    Chargez le dossier <code className="font-mono text-[13px] text-ink">apps/extension/</code> dans{" "}
                    <code className="font-mono text-[13px] text-ink">chrome://extensions</code> (mode développeur).
                  </li>
                  <li>Revenez ici : la connexion se fait toute seule.</li>
                </ol>
              ) : (
                <p>
                  Une fois l'extension Terouva ajoutée à Chrome, revenez sur cette page : la connexion
                  se fait toute seule. En attendant, vous pouvez coller vos e-mails d'alerte
                  Leboncoin dans « Mes annonces ».
                </p>
              )}
            </div>
          )}

          {isDev && (
            <Field
              label="Identifiant de l'extension (mode développeur)"
              hint="Visible sur chrome://extensions sous l'extension Terouva. Ce champ n'apparaît qu'en local."
            >
              <div className="flex gap-2">
                <Input
                  value={extIdInput}
                  onChange={(e) => setExtIdInput(e.target.value)}
                  placeholder="abcdefghijklmnopabcdefghijklmnop"
                  className="font-mono text-sm"
                />
                <Button variant="secondary" onClick={saveAndConnect} className="h-10">
                  Connecter
                </Button>
              </div>
            </Field>
          )}

          <div className="flex flex-wrap items-center gap-2 border-t border-rule pt-4">
            <Button variant="secondary" size="sm" onClick={() => connectExtension()}>
              Relancer la connexion
            </Button>
            <Button variant="ghost" size="sm" onClick={testConnection} disabled={ping === "testing"}>
              {ping === "testing" ? "Test en cours…" : "Tester"}
            </Button>
            {ping === "ok" && (
              <span role="status" className="text-[15px] text-good">
                L'extension répond.
              </span>
            )}
            {ping === "ko" && (
              <span role="status" className="text-[15px] text-bad">
                Pas de réponse de l'extension.
              </span>
            )}
          </div>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatPill label="Annonces reçues" value={bridge.received} hint="depuis l'ouverture de Terouva" />
        <StatPill
          label="Dernière réception"
          value={
            bridge.lastSyncAt
              ? new Date(bridge.lastSyncAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
              : "Aucune"
          }
        />
        <StatPill label="Dans le journal" value={recent.length} hint="50 dernières au maximum" />
      </div>

      <section aria-labelledby="journal-title">
        <h2 id="journal-title" className="mb-3 font-serif text-2xl font-medium text-ink">
          Dernières annonces reçues
        </h2>
        {recent.length === 0 ? (
          <EmptyState title="Rien pour l'instant">
            Gardez une page de recherche Leboncoin ouverte dans Chrome. Les nouvelles annonces
            s'afficheront ici au fur et à mesure.
          </EmptyState>
        ) : (
          <Card>
            <ul className="divide-y divide-rule">
              {recent.map((entry, i) => {
                const r = entry.result;
                const d = entry.payload.data;
                const reco = r.score === null ? null : RECOMMENDATION[recommendationFromScore(r.score)];
                return (
                  <li key={`${r.listingId}-${entry.at}-${i}`} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
                    <div className="w-10 font-serif text-2xl font-medium text-ink tabular">{r.score ?? ""}</div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-medium text-ink">{d.title ?? "Annonce sans titre"}</div>
                      <div className="text-[13px] text-ink-3">
                        {[
                          d.price !== null ? formatPrice(d.price) : null,
                          d.surface !== null ? `${d.surface} m²` : null,
                          d.city,
                          new Date(entry.at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
                          r.matchedSearchName ? `Recherche : ${r.matchedSearchName}` : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                    </div>
                    {reco && <Badge tone={reco.tone}>{reco.text}</Badge>}
                    <Button size="sm" variant="ghost" onClick={() => navigate("/")}>
                      Voir
                    </Button>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </section>
    </div>
  );
}
