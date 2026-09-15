import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { Card } from "@app/components/ui/Card";
import { Field, Input, Select } from "@app/components/ui/Input";
import { ExtensionStatus } from "@app/components/Sidebar";
import { downloadBackup, exportBackup, importBackup } from "@app/lib/backup";
import { getSetting, setSetting } from "@app/lib/db";
import { ensureNotificationPermission, notifyDesktop } from "@app/lib/tauri";
import { useStore } from "@app/store/useStore";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-rule pt-6 md:grid-cols-[16rem_1fr] md:gap-8">
      <div>
        <h2 className="font-serif text-2xl font-medium text-ink">{title}</h2>
        {description && <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{description}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}

export default function Reglages() {
  const navigate = useNavigate();
  const refreshAll = useStore((s) => s.refreshAll);
  const [defaultTone, setDefaultTone] = useState<string>("pro");
  const [minScore, setMinScore] = useState<number>(70);
  const [alertMaxAge, setAlertMaxAge] = useState<number>(60);
  const [prefsSaved, setPrefsSaved] = useState(false);
  const [notifMsg, setNotifMsg] = useState<string | null>(null);
  const [importBusy, setImportBusy] = useState(false);
  const [importMode, setImportMode] = useState<"merge" | "replace">("merge");
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void (async () => {
      const tone = (await getSetting("default_message_tone")) ?? "pro";
      const min = Number((await getSetting("notification_min_score")) ?? 70);
      const age = Number((await getSetting("alert_max_age_minutes")) ?? 60);
      setDefaultTone(tone);
      setMinScore(min);
      setAlertMaxAge(age);
    })();
  }, []);

  const saveDefaults = async () => {
    await setSetting("default_message_tone", defaultTone);
    await setSetting("notification_min_score", String(minScore));
    await setSetting("alert_max_age_minutes", String(alertMaxAge));
    setPrefsSaved(true);
  };

  const testNotif = async () => {
    const ok = await ensureNotificationPermission();
    if (!ok) {
      setNotifMsg(
        "Les notifications sont bloquées pour ce site. Autorisez-les dans les réglages de votre navigateur (icône à gauche de l'adresse).",
      );
      return;
    }
    setNotifMsg("Notification envoyée. Si rien ne s'affiche, vérifiez les notifications de votre ordinateur.");
    await notifyDesktop({
      title: "Terouva",
      body: "Les notifications fonctionnent. Vous serez prévenu des annonces qui vous correspondent.",
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
          "Toutes vos données actuelles seront remplacées par celles du fichier. Continuer ?",
        );
        if (!ok) {
          setImportBusy(false);
          return;
        }
      }
      const stats = await importBackup(file, importMode);
      await refreshAll();
      setImportMsg(
        `Fichier importé : ${stats.imported.searches} recherche(s), ${stats.imported.listings} annonce(s), ${stats.imported.applications} candidature(s)` +
          (stats.skipped.listings > 0
            ? `. ${stats.skipped.listings} annonce(s) déjà présente(s) ont été ignorées.`
            : "."),
      );
    } catch (e) {
      setImportMsg(`Erreur : ce fichier n'a pas pu être importé (${e}).`);
    } finally {
      setImportBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const markDirty = () => setPrefsSaved(false);

  return (
    <div className="space-y-8">
      <Section title="Extension Chrome" description="La connexion qui fait arriver les annonces toutes seules.">
        <Card className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
          <ExtensionStatus />
          <Button variant="ghost" onClick={() => navigate("/surveillance")}>
            Détails et journal
            <ChevronRight size={16} strokeWidth={1.75} aria-hidden />
          </Button>
        </Card>
      </Section>

      <Section title="Alertes et messages" description="Quand être prévenu, et le ton proposé par défaut.">
        <Card>
          <div className="grid gap-4 px-4 py-5 sm:grid-cols-2 sm:px-5">
            <Field label="Ton des messages par défaut">
              <Select
                value={defaultTone}
                onChange={(e) => {
                  setDefaultTone(e.target.value);
                  markDirty();
                }}
              >
                <option value="direct">Direct</option>
                <option value="warm">Chaleureux</option>
                <option value="pro">Professionnel</option>
              </Select>
            </Field>
            <Field label="Me prévenir à partir de la note" hint="Sur 100. Par défaut : 70.">
              <Input
                type="number"
                min={0}
                max={100}
                value={minScore}
                onChange={(e) => {
                  setMinScore(Number(e.target.value));
                  markDirty();
                }}
              />
            </Field>
            <Field
              className="sm:col-span-2"
              label="Ne prévenir que pour les annonces publiées depuis moins de (minutes)"
              hint="Les annonces plus anciennes restent dans votre liste, sans notification. Mettez 0 pour être prévenu quelle que soit l'ancienneté."
            >
              <Input
                type="number"
                min={0}
                max={1440}
                className="sm:max-w-40"
                value={alertMaxAge}
                onChange={(e) => {
                  setAlertMaxAge(Number(e.target.value));
                  markDirty();
                }}
              />
            </Field>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-rule px-4 py-3 sm:px-5">
            {prefsSaved && (
              <span role="status" className="mr-auto text-[15px] text-good">
                Réglages enregistrés
              </span>
            )}
            <Button variant="ghost" onClick={testNotif}>
              Tester une notification
            </Button>
            <Button onClick={saveDefaults}>Enregistrer</Button>
          </div>
          {notifMsg && (
            <p role="status" className="border-t border-rule px-4 py-3 text-[15px] text-ink-2 sm:px-5">
              {notifMsg}
            </p>
          )}
        </Card>
      </Section>

      <Section
        title="Sauvegarde"
        description="Vos données ne sont que dans ce navigateur. Enregistrez-les dans un fichier pour les garder ou changer d'ordinateur."
      >
        <Card className="divide-y divide-rule">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
            <div>
              <p className="text-[15px] font-medium text-ink">Enregistrer mes données</p>
              <p className="text-[13px] text-ink-3">Profil, recherches, annonces et candidatures.</p>
            </div>
            <Button variant="secondary" onClick={doExport}>
              Télécharger le fichier
            </Button>
          </div>
          <div className="space-y-3 px-4 py-4 sm:px-5">
            <p className="text-[15px] font-medium text-ink">Reprendre des données enregistrées</p>
            <div className="flex flex-wrap items-center gap-2">
              <Select
                className="w-auto"
                aria-label="Façon d'importer"
                value={importMode}
                onChange={(e) => setImportMode(e.target.value as "merge" | "replace")}
              >
                <option value="merge">Ajouter à mes données actuelles</option>
                <option value="replace">Remplacer toutes mes données</option>
              </Select>
              <Button variant="secondary" disabled={importBusy} onClick={() => fileRef.current?.click()} className="h-10">
                {importBusy ? "Import en cours…" : "Choisir le fichier"}
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void doImport(f);
                }}
              />
            </div>
            {importMsg && (
              <p
                role="status"
                className={"text-[15px] " + (importMsg.startsWith("Erreur") ? "text-bad" : "text-good")}
              >
                {importMsg}
              </p>
            )}
          </div>
        </Card>
      </Section>

      <Section title="À propos">
        <div className="space-y-2 text-[15px] leading-relaxed text-ink-2">
          <p>
            Terouva vous aide à suivre les annonces de location Leboncoin et à y répondre vite.
            Il ne fait rien à votre place : c'est toujours vous qui envoyez vos messages.
          </p>
          <p>
            Vos données sont enregistrées dans ce navigateur, sur cet ordinateur. Aucune n'est
            envoyée à un serveur.{" "}
            <a href="/confidentialite" className="text-ink underline decoration-field underline-offset-4 hover:decoration-ink">
              Politique de confidentialité
            </a>
          </p>
          <p className="text-[13px] text-ink-3">Terouva n'a aucun lien avec Leboncoin.</p>
        </div>
      </Section>
    </div>
  );
}
