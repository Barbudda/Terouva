import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@app/components/ui/Button";
import { Badge, Card, CardBody, CardHeader, CardTitle, StatPill } from "@app/components/ui/Card";
import { Field, Input } from "@app/components/ui/Input";
import { recommendationLabel } from "@app/lib/scoring";
import {
  type BridgeState,
  connectExtension,
  getExtId,
  onBridgeState,
  pingExtension,
  setExtId,
} from "@app/lib/extBridge";
import { useWatchStore } from "@app/store/useWatchStore";

/**
 * « État extension » — diagnostic du pont externally_connectable (remplace
 * l'ancien serveur local Tauri). Statut du handshake, EXT_ID (config dev), test de
 * connexion, et journal des détections reçues. 100 % local.
 */
export default function Surveillance() {
  const navigate = useNavigate();
  const recent = useWatchStore((s) => s.recent);
  const [bridge, setBridge] = useState<BridgeState | null>(null);
  const [extIdInput, setExtIdInput] = useState("");
  const [ping, setPing] = useState<"idle" | "testing" | "ok" | "ko">("idle");
  const isDev = typeof window !== "undefined" && window.location.hostname === "localhost";

  useEffect(() => {
    const off = onBridgeState(setBridge);
    void getExtId().then(setExtIdInput);
    return off;
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

  const connected = bridge?.connected ?? false;
  const available = bridge?.available ?? false;

  const statusBadge = connected
    ? { cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40", txt: "● connectée" }
    : available
    ? { cls: "bg-amber-500/15 text-amber-300 border-amber-500/40", txt: "● en attente" }
    : { cls: "bg-zinc-700/40 text-zinc-400 border-zinc-600/40", txt: "● non détectée" };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatPill label="Reçues" value={bridge?.received ?? 0} hint="depuis l'ouverture" />
        <StatPill
          label="Dernière synchro"
          value={bridge?.lastSyncAt ? new Date(bridge.lastSyncAt).toLocaleTimeString("fr-FR") : "—"}
          hint={connected ? "connectée" : "—"}
        />
        <StatPill label="Détections (journal)" value={recent.length} hint="50 dernières" />
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Connexion à l'extension Chrome</CardTitle>
            <p className="mt-1.5 text-xs text-zinc-500">
              L'extension détecte les annonces sur tes onglets Leboncoin et te les envoie
              ici, en direct. Tout reste sur ta machine — aucun serveur, aucun trafic vers
              un service tiers.
            </p>
          </div>
          <Badge className={statusBadge.cls}>{statusBadge.txt}</Badge>
        </CardHeader>
        <CardBody className="space-y-4">
          {!available && (
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4 text-xs text-zinc-400 space-y-2">
              <div className="text-zinc-300 font-medium">Installer l'extension</div>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Charge le dossier <code className="text-zinc-200">apps/extension/</code> dans{" "}
                  <code className="text-zinc-200">chrome://extensions</code> (mode développeur).
                </li>
                <li>Épingle l'icône Terouva, puis reviens ici : la connexion se fait toute seule.</li>
              </ol>
            </div>
          )}

          {isDev && (
            <Field
              label="ID de l'extension (mode développeur)"
              hint="Visible sur chrome://extensions sous l'extension Terouva. En production l'ID est fixe, ce champ disparaît."
            >
              <div className="flex items-center gap-2">
                <Input
                  value={extIdInput}
                  onChange={(e) => setExtIdInput(e.target.value)}
                  placeholder="ex: abcdefghijklmnopabcdefghijklmnop"
                  className="font-mono text-xs"
                />
                <Button variant="secondary" size="sm" onClick={saveAndConnect}>
                  Connecter
                </Button>
              </div>
            </Field>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-zinc-500">
              {bridge?.error === "ext-id-manquant"
                ? "ID d'extension manquant — renseigne-le ci-dessus (dev) ou installe l'extension publiée."
                : bridge?.error === "connexion-refusée"
                ? "Connexion refusée — vérifie l'ID et que l'extension est bien chargée."
                : connected
                ? "Pont actif : les nouvelles annonces arrivent automatiquement."
                : available
                ? "Extension détectée, handshake en attente…"
                : "En attente de l'extension."}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {ping === "ok" && <span className="text-xs text-emerald-400">répond ✓</span>}
              {ping === "ko" && <span className="text-xs text-red-400">pas de réponse</span>}
              <Button variant="ghost" size="sm" onClick={testConnection} disabled={ping === "testing"}>
                {ping === "testing" ? "Test…" : "Tester la connexion"}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => connectExtension()}>
                Reconnecter
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Journal des détections récentes</CardTitle>
          <span className="text-xs text-zinc-500">
            {recent.length} entrée{recent.length > 1 ? "s" : ""}
          </span>
        </CardHeader>
        <CardBody>
          {recent.length === 0 ? (
            <div className="text-center py-10 text-sm text-zinc-500">
              Aucune annonce détectée pour l'instant. Garde une page de résultats Leboncoin
              ouverte dans Chrome — les nouvelles annonces apparaîtront ici à mesure qu'elles
              sortent.
            </div>
          ) : (
            <ul className="space-y-2">
              {recent.map((entry, i) => {
                const r = entry.result;
                const d = entry.payload.data;
                const reco =
                  r.score === null
                    ? null
                    : r.score >= 80
                    ? recommendationLabel("to_contact_fast")
                    : r.score >= 65
                    ? recommendationLabel("interesting")
                    : r.score >= 45
                    ? recommendationLabel("average")
                    : recommendationLabel("ignore");
                return (
                  <li
                    key={`${r.listingId}-${entry.at}-${i}`}
                    className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2"
                  >
                    <div className="w-12 text-center font-mono text-sm font-semibold text-zinc-100">
                      {r.score ?? "—"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-zinc-100 truncate">{d.title ?? "(sans titre)"}</div>
                      <div className="text-[11px] text-zinc-500 flex flex-wrap gap-x-3 gap-y-0.5">
                        {d.price !== null && <span>{d.price}€</span>}
                        {d.surface !== null && <span>{d.surface}m²</span>}
                        {d.city && <span>{d.city}</span>}
                        <span className="text-zinc-600">{new Date(entry.at).toLocaleTimeString("fr-FR")}</span>
                        {r.matchedSearchName && <span className="text-violet-300">→ {r.matchedSearchName}</span>}
                      </div>
                    </div>
                    {reco && <Badge className={reco.className}>{reco.text}</Badge>}
                    <Button size="sm" variant="secondary" onClick={() => navigate("/")}>
                      Ouvrir
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
