import { X } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { Card } from "@app/components/ui/Card";
import { Field, Input, Select, Textarea } from "@app/components/ui/Input";
import type { EmailImportSummary } from "@app/lib/watchBridge";
import type { SearchProfile } from "@app/types";
import { cn } from "@app/lib/cn";
import { truncate } from "./format";

export type AddMode = "email" | "single" | "bulk" | "clipboard";
export type IngestResult = { url: string; ok: boolean; error?: string; id?: number };

const MODES: { id: AddMode; label: string }[] = [
  { id: "email", label: "E-mail d'alerte" },
  { id: "single", label: "Lien d'annonce" },
  { id: "bulk", label: "Plusieurs liens" },
  { id: "clipboard", label: "Depuis l'extension" },
];

interface Props {
  mode: AddMode;
  onModeChange: (m: AddMode) => void;
  onClose?: () => void;
  searches: SearchProfile[];
  searchId: number | null;
  onSearchIdChange: (id: number | null) => void;
  adding: boolean;
  error: string | null;
  url: string;
  onUrlChange: (v: string) => void;
  onAddUrl: () => void;
  bulk: string;
  onBulkChange: (v: string) => void;
  onAddBulk: () => void;
  bulkReport: IngestResult[] | null;
  email: string;
  onEmailChange: (v: string) => void;
  onAddEmail: () => void;
  emailReport: EmailImportSummary | null;
  onAddClipboard: () => void;
}

export function AddListingPanel(p: Props) {
  const searchSelect = (
    <Field label="Recherche utilisée pour la note">
      <Select
        value={p.searchId ?? ""}
        onChange={(e) => p.onSearchIdChange(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">Aucune</option>
        {p.searches.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </Select>
    </Field>
  );

  return (
    <Card>
      <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-5">
        <div>
          <h2 className="font-serif text-2xl font-medium text-ink">Ajouter des annonces</h2>
          <p className="mt-1 text-[15px] text-ink-2">
            Les annonces repérées par l'extension arrivent seules. Vous pouvez aussi les ajouter ici.
          </p>
        </div>
        {p.onClose && (
          <button
            onClick={p.onClose}
            aria-label="Fermer le panneau d'ajout"
            className="rounded-md p-1.5 text-ink-3 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        )}
      </div>

      <div role="tablist" aria-label="Façon d'ajouter" className="mt-4 flex gap-1 overflow-x-auto overflow-y-hidden no-scrollbar border-b border-rule px-3 sm:px-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={p.mode === m.id}
            onClick={() => p.onModeChange(m.id)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-2 px-2.5 py-2 text-[15px] transition-colors",
              p.mode === m.id ? "border-accent font-medium text-ink" : "border-transparent text-ink-2 hover:text-ink",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 px-4 py-5 sm:px-5">
        {p.mode === "email" && (
          <>
            <Field
              label="Contenu de l'e-mail d'alerte Leboncoin"
              hint="Ouvrez l'e-mail « Nouvelles annonces pour votre recherche », copiez tout son contenu et collez-le ici. Terouva retrouve les annonces qu'il contient."
            >
              <Textarea
                rows={6}
                placeholder="Collez ici le contenu de l'e-mail…"
                value={p.email}
                onChange={(e) => p.onEmailChange(e.target.value)}
              />
            </Field>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-md text-[13px] leading-snug text-ink-3">
                Les annonces d'un e-mail arrivent avec une note provisoire. Elle se précise quand
                vous ouvrez l'annonce sur Leboncoin avec l'extension.
              </p>
              <Button onClick={p.onAddEmail} disabled={p.adding}>
                {p.adding ? "Lecture de l'e-mail…" : "Ajouter les annonces"}
              </Button>
            </div>
            {p.emailReport && (
              <p role="status" className="border-t border-rule pt-3 text-[15px] text-ink-2">
                {p.emailReport.found} annonce(s) trouvée(s) :{" "}
                <span className="font-medium text-good">{p.emailReport.added} nouvelle(s)</span>
                {p.emailReport.enriched > 0 && <span> · {p.emailReport.enriched} complétée(s)</span>}
                {p.emailReport.duplicates > 0 && (
                  <span className="text-ink-3"> · {p.emailReport.duplicates} déjà dans votre liste</span>
                )}
                {p.emailReport.notified > 0 && <span> · {p.emailReport.notified} alerte(s)</span>}
              </p>
            )}
          </>
        )}

        {p.mode === "single" && (
          <>
            <div className="grid gap-3 sm:grid-cols-[1fr_15rem_auto] sm:items-end">
              <Field label="Lien de l'annonce Leboncoin">
                <Input
                  type="url"
                  placeholder="https://www.leboncoin.fr/ad/locations/…"
                  value={p.url}
                  onChange={(e) => p.onUrlChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && p.onAddUrl()}
                />
              </Field>
              {searchSelect}
              <Button onClick={p.onAddUrl} disabled={p.adding} className="h-10">
                {p.adding ? "Ajout…" : "Ajouter"}
              </Button>
            </div>
            <p className="text-[13px] leading-snug text-ink-3">
              L'annonce est ajoutée avec son lien. Son prix, sa surface et ses photos apparaissent
              quand l'extension la voit sur Leboncoin.
            </p>
          </>
        )}

        {p.mode === "bulk" && (
          <>
            <Field label="Liens d'annonces Leboncoin, un par ligne">
              <Textarea
                rows={5}
                placeholder={"https://www.leboncoin.fr/ad/locations/…\nhttps://www.leboncoin.fr/ad/locations/…"}
                value={p.bulk}
                onChange={(e) => p.onBulkChange(e.target.value)}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-[15rem_auto] sm:items-end sm:justify-start">
              {searchSelect}
              <Button onClick={p.onAddBulk} disabled={p.adding} className="h-10">
                {p.adding ? "Ajout en cours…" : "Ajouter les liens"}
              </Button>
            </div>
            {p.bulkReport && (
              <div role="status" className="space-y-1 border-t border-rule pt-3 text-[15px]">
                <p className="text-ink-2">
                  {p.bulkReport.filter((r) => r.ok).length} sur {p.bulkReport.length} ajoutée(s)
                </p>
                {p.bulkReport
                  .filter((r) => !r.ok)
                  .map((r, i) => (
                    <p key={i} className="text-[13px] text-bad">
                      {truncate(r.url, 60)} : {r.error}
                    </p>
                  ))}
              </div>
            )}
          </>
        )}

        {p.mode === "clipboard" && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-lg text-[15px] leading-relaxed text-ink-2">
              Sur une annonce Leboncoin, cliquez sur l'icône Terouva puis sur « Copier JSON ».
              Revenez ensuite ici pour l'ajouter.
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <div className="w-60">{searchSelect}</div>
              <Button onClick={p.onAddClipboard} disabled={p.adding} className="h-10">
                Coller l'annonce copiée
              </Button>
            </div>
          </div>
        )}

        {p.error && (
          <p role="alert" className="rounded-md bg-bad-wash px-3 py-2 text-[15px] text-bad">
            {p.error}
          </p>
        )}
      </div>
    </Card>
  );
}
