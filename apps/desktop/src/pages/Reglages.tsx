import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Field, Input, Select } from "@/components/ui/Input";
import {
  AVAILABLE_MODELS,
  DEFAULT_MODEL,
  getClaudeApiKey,
  getClaudeEnabled,
  getClaudeModel,
  setClaudeApiKey,
  setClaudeEnabled,
  setClaudeModel,
  testClaudeConnection,
} from "@/lib/ai";
import { downloadBackup, exportBackup, importBackup } from "@/lib/backup";
import { getSetting, setDocumentAvailable, setSetting } from "@/lib/db";
import { ensureNotificationPermission, notifyDesktop } from "@/lib/tauri";
import { useStore } from "@/store/useStore";

export default function Reglages() {
  const navigate = useNavigate();
  const refreshAll = useStore((s) => s.refreshAll);
  const documents = useStore((s) => s.documents);
  const refreshDocs = useStore((s) => s.refreshDocuments);
  const [defaultTone, setDefaultTone] = useState<string>("pro");
  const [minScore, setMinScore] = useState<number>(70);
  const [importBusy, setImportBusy] = useState(false);
  const [importMode, setImportMode] = useState<"merge" | "replace">("merge");
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── AI settings ──
  const [apiKey, setApiKey] = useState("");
  const [aiModel, setAiModel] = useState(DEFAULT_MODEL);
  const [aiOn, setAiOn] = useState(false);
  const [aiTesting, setAiTesting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [keyVisible, setKeyVisible] = useState(false);

  useEffect(() => {
    void (async () => {
      const tone = (await getSetting("default_message_tone")) ?? "pro";
      const min = Number((await getSetting("notification_min_score")) ?? 70);
      setDefaultTone(tone);
      setMinScore(min);
      setApiKey(await getClaudeApiKey());
      setAiModel(await getClaudeModel());
      setAiOn(await getClaudeEnabled());
    })();
  }, []);

  const saveAi = async () => {
    await setClaudeApiKey(apiKey);
    await setClaudeModel(aiModel);
    await setClaudeEnabled(aiOn);
    setAiFeedback({ ok: true, msg: "Enregistré." });
  };

  const testAi = async () => {
    setAiTesting(true);
    setAiFeedback(null);
    // Save first so the test uses the latest values.
    await setClaudeApiKey(apiKey);
    await setClaudeModel(aiModel);
    const res = await testClaudeConnection();
    setAiTesting(false);
    if (res.ok) {
      setAiFeedback({ ok: true, msg: `Connexion OK avec ${res.model}.` });
    } else {
      setAiFeedback({ ok: false, msg: res.error ?? "Échec inconnu" });
    }
  };

  const saveDefaults = async () => {
    await setSetting("default_message_tone", defaultTone);
    await setSetting("notification_min_score", String(minScore));
  };

  const testNotif = async () => {
    const ok = await ensureNotificationPermission();
    if (!ok) {
      alert("Permission notifications refusée.");
      return;
    }
    await notifyDesktop({
      title: "Terouva — test",
      body: "Si tu vois ça, les notifications fonctionnent.",
    });
  };

  const doExport = async () => {
    const b = await exportBackup();
    downloadBackup(b);
  };

  const doImport = async (file: File) => {
    setImportBusy(true);
    setImportMsg(null);
    try {
      if (importMode === "replace") {
        const ok = confirm(
          "Mode REMPLACER : toutes les données actuelles seront effacées. Continuer ?",
        );
        if (!ok) {
          setImportBusy(false);
          return;
        }
      }
      const stats = await importBackup(file, importMode);
      await refreshAll();
      setImportMsg(
        `Importé : ${stats.imported.searches} recherches, ${stats.imported.listings} annonces, ${stats.imported.applications} candidatures` +
          (stats.skipped.listings > 0
            ? ` (${stats.skipped.listings} annonces ignorées — URL déjà présente)`
            : ""),
      );
    } catch (e) {
      setImportMsg(`Erreur : ${e}`);
    } finally {
      setImportBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connexion & surveillance</CardTitle>
        </CardHeader>
        <CardBody className="flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            État du pont avec l'extension Chrome, token de jumelage, polling
            background et journal des détections.
          </p>
          <Button variant="secondary" onClick={() => navigate("/surveillance")}>
            Ouvrir →
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Préférences</CardTitle>
        </CardHeader>
        <CardBody className="grid grid-cols-2 gap-4">
          <Field label="Ton par défaut des messages">
            <Select value={defaultTone} onChange={(e) => setDefaultTone(e.target.value)}>
              <option value="direct">Direct</option>
              <option value="warm">Chaleureux</option>
              <option value="pro">Professionnel</option>
            </Select>
          </Field>
          <Field label="Score minimum pour notification">
            <Input
              type="number"
              min={0}
              max={100}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
            />
          </Field>
        </CardBody>
        <div className="px-5 pb-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={testNotif}>
            Tester une notification
          </Button>
          <Button onClick={saveDefaults}>Enregistrer</Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Génération AI — Claude</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <p className="text-xs text-zinc-500">
            Par défaut, Terouva génère les messages de candidature avec des templates locaux
            (gratuit, hors-ligne). Configure une clé API Anthropic pour activer la génération
            adaptative — Claude lit l'annonce + ton profil et écrit un message qui parle des
            détails spécifiques. Coût typique : moins de 0,5 centime par message.
          </p>
          <div className="grid grid-cols-[1fr_180px] gap-4">
            <Field label="Clé API Anthropic">
              <div className="flex items-center gap-2">
                <Input
                  type={keyVisible ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-…"
                  autoComplete="off"
                  spellCheck={false}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => setKeyVisible((v) => !v)}
                >
                  {keyVisible ? "Masquer" : "Afficher"}
                </Button>
              </div>
            </Field>
            <Field label="Modèle">
              <Select value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
                {AVAILABLE_MODELS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={aiOn}
              onChange={(e) => setAiOn(e.target.checked)}
              className="accent-violet-500"
            />
            <span>Utiliser Claude par défaut (sinon templates locaux)</span>
          </label>
          {aiFeedback && (
            <p
              className={
                "text-xs " +
                (aiFeedback.ok ? "text-emerald-400" : "text-red-400")
              }
            >
              {aiFeedback.msg}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={testAi} disabled={aiTesting || !apiKey}>
              {aiTesting ? "Test…" : "Tester la connexion"}
            </Button>
            <Button onClick={saveAi}>Enregistrer</Button>
          </div>
          <p className="text-[11px] text-zinc-600">
            La clé est stockée dans <code className="text-zinc-400">app_settings</code> (SQLite local) — elle ne
            quitte ta machine qu'en allant chez api.anthropic.com pour générer un message.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dossier locataire — pièces</CardTitle>
        </CardHeader>
        <CardBody className="space-y-1">
          {documents.map((d) => (
            <label
              key={d.id}
              className="flex items-center gap-3 py-2 border-b border-zinc-800/50 last:border-b-0"
            >
              <input
                type="checkbox"
                checked={!!d.available}
                onChange={async (e) => {
                  await setDocumentAvailable(d.id, e.target.checked);
                  await refreshDocs();
                }}
              />
              <div className="flex-1">
                <div className="text-sm text-zinc-200">{d.name}</div>
                <div className="text-xs text-zinc-500">
                  {d.category} {d.required ? "• obligatoire" : "• optionnel"}
                </div>
              </div>
              <span
                className={
                  "text-xs " +
                  (d.available ? "text-emerald-400" : "text-zinc-600")
                }
              >
                {d.available ? "✓ prêt" : "—"}
              </span>
            </label>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sauvegarde & restauration</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={doExport}>
              Exporter en JSON
            </Button>
            <span className="text-xs text-zinc-500">
              Télécharge un fichier contenant profil, recherches, annonces et candidatures.
            </span>
          </div>
          <div className="space-y-2 pt-3 border-t border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-300">Importer depuis JSON</span>
              <Select
                className="w-40"
                value={importMode}
                onChange={(e) => setImportMode(e.target.value as "merge" | "replace")}
              >
                <option value="merge">Fusionner</option>
                <option value="replace">Remplacer tout</option>
              </Select>
              <Button
                variant="secondary"
                disabled={importBusy}
                onClick={() => fileRef.current?.click()}
              >
                {importBusy ? "Import…" : "Choisir un fichier"}
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void doImport(f);
                }}
              />
            </div>
            {importMsg && (
              <p
                className={
                  "text-xs " +
                  (importMsg.startsWith("Erreur") ? "text-red-400" : "text-emerald-400")
                }
              >
                {importMsg}
              </p>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>À propos</CardTitle>
        </CardHeader>
        <CardBody className="text-sm text-zinc-400 space-y-2">
          <p>Terouva v0.1 — copilote local de recherche d'appartement.</p>
          <p className="text-xs text-zinc-500">
            Les données sont stockées localement dans <code className="text-zinc-300">terouva.db</code>.
            Aucune donnée n'est envoyée à un serveur tiers.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
