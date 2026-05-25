import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Badge, Card, CardBody, CardHeader, CardTitle, StatPill } from "@/components/ui/Card";
import { Field } from "@/components/ui/Input";
import { copyToClipboard, openExternal } from "@/lib/tauri";
import { recommendationLabel } from "@/lib/scoring";
import { useStore } from "@/store/useStore";
import { useWatchStore } from "@/store/useWatchStore";

export default function Surveillance() {
  const navigate = useNavigate();
  const recent = useWatchStore((s) => s.recent);
  const port = useWatchStore((s) => s.port);
  const token = useWatchStore((s) => s.token);
  const totalDetected = useWatchStore((s) => s.totalDetected);
  const notifiedCount = useWatchStore((s) => s.notifiedCount);
  const duplicateCount = useWatchStore((s) => s.duplicateCount);
  const rotateToken = useWatchStore((s) => s.rotateToken);
  const clearLog = useWatchStore((s) => s.clearLog);
  const searches = useStore((s) => s.searches);
  const activeSearches = searches.filter((s) => s.is_active === 1);

  const [tokenVisible, setTokenVisible] = useState(false);
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);
  const serverUrl = port ? `http://127.0.0.1:${port}` : null;

  const handleCopy = async (label: string, value: string) => {
    await copyToClipboard(value);
    setCopiedTarget(label);
    setTimeout(() => setCopiedTarget((c) => (c === label ? null : c)), 1600);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatPill
          label="Détectées"
          value={totalDetected}
          hint="depuis l'ouverture"
        />
        <StatPill
          label="Notifiées"
          value={notifiedCount}
          hint="score ≥ seuil"
        />
        <StatPill
          label="Doublons"
          value={duplicateCount}
          hint="déjà connues"
        />
        <StatPill
          label="Recherches actives"
          value={activeSearches.length}
          hint={`${searches.length} au total`}
        />
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Pont local Tauri ↔ extension Chrome</CardTitle>
            <p className="mt-1.5 text-xs text-zinc-500">
              L'extension Chrome détecte les annonces dans tes onglets Leboncoin ouverts et
              les envoie ici. Aucun trafic ne sort de ta machine.
            </p>
          </div>
          <Badge
            className={
              serverUrl
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                : "bg-zinc-700/40 text-zinc-400 border-zinc-600/40"
            }
          >
            {serverUrl ? "● actif" : "● off"}
          </Badge>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="URL du serveur local">
              <button
                disabled={!serverUrl}
                onClick={() => serverUrl && handleCopy("url", serverUrl)}
                className="w-full text-left rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-xs hover:border-zinc-700 disabled:opacity-50"
              >
                {serverUrl ?? "—"}
                {copiedTarget === "url" && (
                  <span className="ml-2 text-emerald-400">copié</span>
                )}
              </button>
            </Field>
            <Field label="Token de jumelage (Bearer)">
              <div className="flex items-center gap-2">
                <button
                  disabled={!token}
                  onClick={() => token && handleCopy("token", token)}
                  className="flex-1 text-left rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-xs hover:border-zinc-700 disabled:opacity-50 truncate"
                >
                  {token ? (tokenVisible ? token : maskToken(token)) : "—"}
                  {copiedTarget === "token" && (
                    <span className="ml-2 text-emerald-400">copié</span>
                  )}
                </button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setTokenVisible((v) => !v)}
                >
                  {tokenVisible ? "Masquer" : "Afficher"}
                </Button>
              </div>
            </Field>
          </div>

          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4 text-xs text-zinc-400 space-y-2">
            <div className="text-zinc-300 font-medium">Brancher l'extension</div>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Charge le dossier <code className="text-zinc-200">apps/extension/</code> dans <code className="text-zinc-200">chrome://extensions</code> en mode développeur.</li>
              <li>Clique l'icône Terouva → onglet <strong>Réglages</strong> du popup.</li>
              <li>Colle l'URL du serveur et le token ci-dessus, puis active la surveillance.</li>
              <li>Ouvre une page de résultats Leboncoin (ex&nbsp;: <code className="text-zinc-200">leboncoin.fr/recherche?...</code>). Les nouvelles annonces tombent ici en direct.</li>
            </ol>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={clearLog}>
              Vider le journal
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (
                  confirm(
                    "Régénérer un nouveau token ? L'extension perdra la connexion jusqu'à ce que tu y colles le nouveau token.",
                  )
                ) {
                  rotateToken();
                }
              }}
            >
              Régénérer le token
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Journal des détections récentes</CardTitle>
          <span className="text-xs text-zinc-500">{recent.length} entrée{recent.length > 1 ? "s" : ""}</span>
        </CardHeader>
        <CardBody>
          {recent.length === 0 && (
            <div className="text-center py-10 text-sm text-zinc-500">
              Aucune annonce détectée pour l'instant. Garde une page de résultats Leboncoin
              ouverte dans Chrome — les nouvelles annonces apparaîtront ici à mesure qu'elles
              sortent.
            </div>
          )}
          {recent.length > 0 && (
            <ul className="space-y-2">
              {recent.map((entry, i) => (
                <WatchRow
                  key={`${entry.result.listingId}-${entry.at}-${i}`}
                  entry={entry}
                  onOpenAnnonce={() => navigate("/annonces")}
                />
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function WatchRow({
  entry,
  onOpenAnnonce,
}: {
  entry: import("@/store/useWatchStore").WatchLogEntry;
  onOpenAnnonce: () => void;
}) {
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
    <li className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2">
      <div className="w-12 text-center font-mono tabular text-sm font-semibold text-zinc-100">
        {r.score ?? "—"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-zinc-100 truncate">
          {d.title ?? "(sans titre)"}
        </div>
        <div className="text-[11px] text-zinc-500 flex flex-wrap gap-x-3 gap-y-0.5">
          {d.price !== null && <span>{d.price}€</span>}
          {d.surface !== null && <span>{d.surface}m²</span>}
          {d.rooms !== null && <span>{d.rooms}p</span>}
          {d.city && <span>{d.city}</span>}
          <span className="text-zinc-600">
            {new Date(entry.at).toLocaleTimeString("fr-FR")}
          </span>
          {r.matchedSearchName && (
            <span className="text-violet-300">→ {r.matchedSearchName}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {r.status === "duplicate" && (
          <Badge className="bg-zinc-700/40 text-zinc-400 border-zinc-600/40">déjà vue</Badge>
        )}
        {r.notified && (
          <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/40">notif</Badge>
        )}
        {reco && <Badge className={reco.className}>{reco.text}</Badge>}
        <Button size="sm" variant="ghost" onClick={() => openExternal(d.url)}>
          LBC ↗
        </Button>
        <Button size="sm" variant="secondary" onClick={onOpenAnnonce}>
          Ouvrir
        </Button>
      </div>
    </li>
  );
}

function maskToken(t: string): string {
  if (t.length < 12) return "•".repeat(t.length);
  return `${t.slice(0, 4)}…${"•".repeat(28)}…${t.slice(-4)}`;
}
