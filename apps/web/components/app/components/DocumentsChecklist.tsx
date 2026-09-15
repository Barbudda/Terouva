import { Card } from "@app/components/ui/Card";
import { setDocumentAvailable } from "@app/lib/db";
import { useStore } from "@app/store/useStore";

/** Liste à cocher des pièces du dossier locataire (rien n'est téléversé). */
export function DocumentsChecklist() {
  const documents = useStore((s) => s.documents);
  const refreshDocs = useStore((s) => s.refreshDocuments);
  const ready = documents.filter((d) => d.available).length;
  const requiredMissing = documents.filter((d) => d.required && !d.available).length;

  return (
    <Card>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule px-4 py-4 sm:px-5">
        <p className="text-[15px] font-medium text-ink">
          {ready} pièce{ready > 1 ? "s" : ""} prête{ready > 1 ? "s" : ""} sur {documents.length}
        </p>
        <p className="text-[13px] text-ink-3">
          {requiredMissing === 0
            ? "Toutes les pièces indispensables sont prêtes."
            : `${requiredMissing} pièce${requiredMissing > 1 ? "s" : ""} indispensable${requiredMissing > 1 ? "s" : ""} à préparer`}
        </p>
      </div>
      <ul className="divide-y divide-rule">
        {documents.map((d) => (
          <li key={d.id}>
            <label className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-paper sm:px-5">
              <input
                type="checkbox"
                checked={!!d.available}
                onChange={async (e) => {
                  await setDocumentAvailable(d.id, e.target.checked);
                  await refreshDocs();
                }}
              />
              <span className={"flex-1 text-[15px] " + (d.available ? "text-ink-3 line-through decoration-field" : "text-ink")}>
                {d.name}
              </span>
              <span className="text-[13px] text-ink-3">{d.required ? "Indispensable" : "Utile"}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="border-t border-rule px-4 py-3 text-[13px] text-ink-3 sm:px-5">
        Cochez les pièces que vous avez déjà en main. Aucun fichier n'est envoyé.
      </p>
    </Card>
  );
}
