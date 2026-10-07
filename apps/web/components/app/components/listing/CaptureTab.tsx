import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { bookmarkletHref } from "@app/lib/bookmarklet";
import { openExternal } from "@app/lib/tauri";
import type { EmailImportSummary } from "@app/lib/watchBridge";

/**
 * « Depuis Leboncoin » : le marque-page à glisser dans la barre de favoris.
 *
 * C'est la voie qui fait entrer de VRAIES annonces sans rien installer. Le lien
 * doit être posé avec `setAttribute` : React refuse une adresse `javascript:`
 * passée par la propriété `href`.
 */
export function CaptureTab({
  onPaste,
  busy,
  searchUrl,
  report,
}: {
  onPaste: () => void;
  busy: boolean;
  searchUrl?: string | null;
  report?: EmailImportSummary | null;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    ref.current?.setAttribute("href", bookmarkletHref());
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-md bg-paper p-4">
        <p className="text-[15px] font-medium text-ink">Une seule fois : installez le bouton</p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink-2">
          Affichez la barre de favoris de votre navigateur (Ctrl + Maj + B, ou Cmd + Maj + B sur
          Mac), puis glissez le bouton ci-dessous dedans.
        </p>
        <a
          ref={ref}
          draggable
          onClick={(e) => e.preventDefault()}
          className="mt-3 inline-flex cursor-grab items-center gap-2 rounded-md border border-field bg-card px-4 py-2 text-[15px] font-medium text-ink select-none hover:border-ink"
          title="Glissez ce bouton dans votre barre de favoris"
        >
          Capter les annonces
        </a>
      </div>

      <div>
        <p className="text-[15px] font-medium text-ink">Ensuite, à chaque fois</p>
        <ol className="mt-2 space-y-1.5 text-[15px] leading-snug text-ink-2">
          <li>1. Ouvrez votre recherche sur Leboncoin et faites défiler les annonces.</li>
          <li>2. Cliquez sur « Capter les annonces » dans vos favoris.</li>
          <li>3. Revenez ici et collez avec Ctrl + V. Les annonces arrivent notées.</li>
        </ol>
        <p className="mt-2 text-[13px] leading-snug text-ink-3">
          Le bouton lit seulement la page que vous avez sous les yeux. Il n'interroge jamais
          Leboncoin et ne fait rien tout seul.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-rule pt-4">
        {searchUrl && (
          <Button variant="secondary" onClick={() => openExternal(searchUrl)}>
            <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
            Ouvrir ma recherche sur Leboncoin
          </Button>
        )}
        <Button variant="ghost" onClick={onPaste} disabled={busy}>
          {busy ? "Ajout…" : "Coller ce qui a été capté"}
        </Button>
      </div>

      {report && (
        <p role="status" className="text-[15px] text-ink-2">
          {report.found} annonce(s) captée(s) :{" "}
          <span className="font-medium text-good">{report.added} nouvelle(s)</span>
          {report.enriched > 0 && <span> · {report.enriched} complétée(s)</span>}
          {report.duplicates > 0 && (
            <span className="text-ink-3"> · {report.duplicates} déjà dans votre liste</span>
          )}
          {report.notified > 0 && <span> · {report.notified} alerte(s)</span>}
        </p>
      )}
    </div>
  );
}
