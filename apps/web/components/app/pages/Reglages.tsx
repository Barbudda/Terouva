import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@app/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@app/components/ui/Card";
import { Field, Input, Select } from "@app/components/ui/Input";
import { downloadBackup, exportBackup, importBackup } from "@app/lib/backup";
import { getSetting, setDocumentAvailable, setSetting } from "@app/lib/db";
import { ensureNotificationPermission, notifyDesktop } from "@app/lib/tauri";
import { useStore } from "@app/store/useStore";

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

  useEffect(() => {
    void (async () => {
      const tone = (await getSetting("default_message_tone")) ?? "pro";
      const min = Number((await getSetting("notification_min_score")) ?? 70);
      setDefaultTone(tone);
      setMinScore(min);
    })();
  }, []);

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
          <p className="text-sm text-[var(--color-text-muted)]">
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
          <CardTitle>Messages de candidature</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-[var(--color-text-muted)]">
            Terouva rédige automatiquement un message adapté à chaque annonce (il en
            cite les détails) à partir de ton profil, en 3 tons.{" "}
            <strong>Rien à configurer</strong> : tout est local, aucune clé, aucun
            compte, aucune donnée envoyée à un serveur. Tu choisis le ton au moment de
            candidater.
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
              className="flex items-center gap-3 py-2 border-b border-[var(--color-border)]/50 last:border-b-0"
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
                <div className="text-sm text-[var(--color-text)]">{d.name}</div>
                <div className="text-xs text-[var(--color-text-faint)]">
                  {d.category} {d.required ? "• obligatoire" : "• optionnel"}
                </div>
              </div>
              <span
                className={
                  "text-xs " +
                  (d.available ? "text-[var(--color-signal)]" : "text-[var(--color-text-faint)]")
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
            <span className="text-xs text-[var(--color-text-faint)]">
              Télécharge un fichier contenant profil, recherches, annonces et candidatures.
            </span>
          </div>
          <div className="space-y-2 pt-3 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--color-text-muted)]">Importer depuis JSON</span>
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
                  (importMsg.startsWith("Erreur") ? "text-[var(--color-danger)]" : "text-[var(--color-signal)]")
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
        <CardBody className="text-sm text-[var(--color-text-muted)] space-y-2">
          <p>Terouva v0.1 — copilote local de recherche d'appartement.</p>
          <p className="text-xs text-[var(--color-text-faint)]">
            Les données sont stockées localement dans <code className="text-[var(--color-text-muted)]">terouva.db</code>.
            Aucune donnée n'est envoyée à un serveur tiers.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
