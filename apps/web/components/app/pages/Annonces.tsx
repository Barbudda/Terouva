import { useEffect, useMemo, useState } from "react";
import { Button } from "@app/components/ui/Button";
import { EmptyState } from "@app/components/ui/Card";
import {
  AddListingPanel,
  type AddMode,
  type IngestResult,
} from "@app/components/listing/AddListingPanel";
import { ListingCard, PriorityBanner } from "@app/components/listing/ListingCard";
import { ListingToolbar } from "@app/components/listing/ListingToolbar";
import { safeParse } from "@app/components/listing/format";
import { maybeNotifyHot } from "@app/components/listing/ingest";
import {
  deleteListing,
  getListing,
  insertListingFromParsed,
  updateListingScore,
  updateListingStatus,
} from "@app/lib/db";
import { scoreListing } from "@app/lib/scoring";
import { openExternal, parseListingUrl } from "@app/lib/tauri";
import { type EmailImportSummary, importLbcAlertEmail } from "@app/lib/watchBridge";
import { CaptureError, importCapture, looksLikeCapture } from "@app/lib/lbcCapture";
import { useDemoStore } from "@app/store/useDemoStore";
import { useStore } from "@app/store/useStore";
import type { ListingStatus, ScoreReasons } from "@app/types";

export default function Annonces() {
  const listings = useStore((s) => s.listings);
  const searches = useStore((s) => s.searches);
  const profile = useStore((s) => s.profile);
  const refresh = useStore((s) => s.refreshListings);

  const [mode, setMode] = useState<AddMode>("email");
  const [addOpen, setAddOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [bulk, setBulk] = useState("");
  const [email, setEmail] = useState("");
  const [emailReport, setEmailReport] = useState<EmailImportSummary | null>(null);
  const [searchId, setSearchId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bulkReport, setBulkReport] = useState<IngestResult[] | null>(null);

  const [statusFilter, setStatusFilter] = useState<ListingStatus | "all">("all");
  const [searchFilter, setSearchFilter] = useState<number | "all">("all");
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState<"score" | "date" | "price">("score");
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    if (!searchId && searches.length > 0) setSearchId(searches[0].id);
  }, [searches, searchId]);

  // Coller un e-mail d'alerte n'importe où dans la page suffit : pas besoin
  // d'ouvrir le panneau ni de viser un champ. On ne touche à rien si la
  // personne colle dans un champ de saisie.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      const text = e.clipboardData?.getData("text") ?? "";
      if (looksLikeCapture(text)) {
        e.preventDefault();
        setMode("clipboard");
        setAddOpen(true);
        void addFromCapture(text);
        return;
      }
      if (text.length < 200 || !/leboncoin.fr/i.test(text)) return;
      e.preventDefault();
      setMode("email");
      setAddOpen(true);
      setEmail(text);
      void importPastedEmail(text);
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  });

  // URL de recherche à proposer dans l'état vide : 1re recherche active qui en a une.
  const firstSearchUrl =
    searches.find((s) => s.is_active === 1 && s.lbc_search_url)?.lbc_search_url ??
    searches.find((s) => s.lbc_search_url)?.lbc_search_url ??
    null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = listings.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (searchFilter !== "all" && l.search_profile_id !== searchFilter) return false;
      if (minScore > 0 && (l.score ?? 0) < minScore) return false;
      if (q) {
        const hay = [l.title, l.description, l.city, l.publisher_name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const sorted = [...base].sort((a, b) => {
      if (sortBy === "score") {
        return (b.score ?? -1) - (a.score ?? -1);
      }
      if (sortBy === "price") {
        return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
      }
      return new Date(b.discovered_at).getTime() - new Date(a.discovered_at).getTime();
    });
    return sorted;
  }, [listings, statusFilter, searchFilter, query, minScore, sortBy]);

  // Les annonces « à contacter en priorité » (alertes) pas encore traitées.
  const hotListings = useMemo(
    () =>
      listings.filter((l) => {
        if (l.status !== "new" && l.status !== "to_review") return false;
        const r = l.score_reasons ? safeParse<ScoreReasons>(l.score_reasons) : null;
        return r?.recommendation === "to_contact_fast";
      }),
    [listings],
  );

  const ingestOne = async (rawUrl: string): Promise<IngestResult> => {
    const u = rawUrl.trim();
    if (!u) return { url: u, ok: false, error: "Lien vide" };
    try {
      const parsed = await parseListingUrl(u);
      const id = await insertListingFromParsed(parsed, searchId);
      const search = searchId ? searches.find((s) => s.id === searchId) : null;
      if (search) {
        const listing = await getListing(id);
        if (listing) {
          const { score, reasons } = scoreListing(listing, search);
          await updateListingScore(id, score, reasons);
          await maybeNotifyHot(listing, score);
        }
      }
      return { url: u, ok: true, id };
    } catch (e) {
      return { url: u, ok: false, error: String(e) };
    }
  };

  const addUrl = async () => {
    setError(null);
    if (!url.trim()) {
      setError("Collez le lien d'une annonce Leboncoin.");
      return;
    }
    setAdding(true);
    const r = await ingestOne(url);
    setAdding(false);
    await refresh();
    if (!r.ok) {
      setError(r.error ?? "L'annonce n'a pas pu être ajoutée.");
      return;
    }
    setUrl("");
    if (r.id) setOpenId(r.id);
  };

  /** Colle ce que le marque-page (ou l'extension) a copié. */
  const addFromCapture = async (text?: string) => {
    setError(null);
    setEmailReport(null);
    let content = text;
    if (content === undefined) {
      try {
        content = await navigator.clipboard.readText();
      } catch {
        setError(
          "Votre navigateur n'a pas autorisé la lecture du presse-papiers. Collez directement avec Ctrl+V.",
        );
        return;
      }
    }
    setAdding(true);
    try {
      const summary = await importCapture(content);
      await refresh();
      setEmailReport(summary);
    } catch (e) {
      setError(e instanceof CaptureError ? e.message : `Import impossible : ${e}`);
    } finally {
      setAdding(false);
    }
  };

  const addBulk = async () => {
    setError(null);
    setBulkReport(null);
    const urls = bulk
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && /^https?:\/\//.test(s));
    if (urls.length === 0) {
      setError("Aucun lien valide. Mettez un lien par ligne, commençant par https://");
      return;
    }
    setAdding(true);
    const results: IngestResult[] = [];
    for (const u of urls) {
      results.push(await ingestOne(u));
      await refresh();
    }
    setAdding(false);
    setBulkReport(results);
    setBulk("");
  };

  const addFromEmail = async () => {
    if (!email.trim()) {
      setError("Collez le contenu d'un e-mail d'alerte Leboncoin.");
      return;
    }
    await importPastedEmail(email);
  };

  const importPastedEmail = async (content: string) => {
    setError(null);
    setEmailReport(null);
    setAdding(true);
    try {
      const summary = await importLbcAlertEmail(content);
      await refresh();
      setEmailReport(summary);
      if (summary.found === 0) {
        setError(
          "Aucune annonce trouvée dans ce texte. Copiez l'e-mail d'alerte Leboncoin en entier, puis recollez-le.",
        );
      } else {
        setEmail("");
      }
    } catch (e) {
      setError(`L'e-mail n'a pas pu être lu : ${e}`);
    } finally {
      setAdding(false);
    }
  };

  const rescoreAll = async () => {
    if (!searches.length) return;
    if (!confirm("Recalculer la note de toutes les annonces avec leur recherche ?")) return;
    setAdding(true);
    for (const l of listings) {
      const sp = l.search_profile_id
        ? searches.find((s) => s.id === l.search_profile_id)
        : searches[0];
      if (!sp) continue;
      const { score, reasons } = scoreListing(l, sp);
      await updateListingScore(l.id, score, reasons);
    }
    await refresh();
    setAdding(false);
  };

  const counts = useMemo(() => {
    const byStatus: Record<string, number> = {};
    for (const l of listings) byStatus[l.status] = (byStatus[l.status] ?? 0) + 1;
    return byStatus;
  }, [listings]);

  const demoActive = useDemoStore((s) => s.active);
  const demoStart = useDemoStore((s) => s.start);
  const wantsRealSetup = useDemoStore((s) => s.wantsRealSetup);
  const clearRealSetup = useDemoStore((s) => s.clearRealSetup);

  // Sortie de démonstration « je passe au réel » : on ouvre directement la
  // marche à suivre pour l'e-mail d'alerte Leboncoin.
  useEffect(() => {
    if (!wantsRealSetup) return;
    setMode("email");
    setAddOpen(true);
    clearRealSetup();
  }, [wantsRealSetup, clearRealSetup]);
  const [demoStarting, setDemoStarting] = useState(false);
  const startDemo = async () => {
    setDemoStarting(true);
    try {
      await demoStart();
    } finally {
      setDemoStarting(false);
    }
  };

  const showAdd = (addOpen || listings.length === 0) && !demoActive;
  const filtersActive = query !== "" || minScore > 0 || statusFilter !== "all" || searchFilter !== "all";

  return (
    <div className="space-y-6">
      {hotListings.length > 0 && (
        <PriorityBanner
          count={hotListings.length}
          onShow={() => {
            setSortBy("score");
            setMinScore(0);
            setQuery("");
            setStatusFilter("all");
          }}
        />
      )}

      {showAdd ? (
        <AddListingPanel
          mode={mode}
          onModeChange={(m) => {
            setMode(m);
            setError(null);
          }}
          onClose={listings.length > 0 ? () => setAddOpen(false) : undefined}
          searches={searches}
          searchId={searchId}
          onSearchIdChange={setSearchId}
          adding={adding}
          error={error}
          url={url}
          onUrlChange={setUrl}
          onAddUrl={addUrl}
          bulk={bulk}
          onBulkChange={setBulk}
          onAddBulk={addBulk}
          bulkReport={bulkReport}
          email={email}
          onEmailChange={setEmail}
          onAddEmail={addFromEmail}
          emailReport={emailReport}
          onAddClipboard={() => void addFromCapture()}
          searchUrl={firstSearchUrl}
        />
      ) : null}

      {listings.length > 0 && (
        <ListingToolbar
          total={listings.length}
          shown={filtered.length}
          counts={counts}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
          query={query}
          onQuery={setQuery}
          minScore={minScore}
          onMinScore={setMinScore}
          sortBy={sortBy}
          onSortBy={setSortBy}
          searches={searches}
          searchFilter={searchFilter}
          onSearchFilter={setSearchFilter}
          onRescoreAll={rescoreAll}
          busy={adding}
          showAddButton={!addOpen}
          onAdd={() => setAddOpen(true)}
        />
      )}

      <div className="space-y-3">
        {filtered.map((l) => (
          <ListingCard
            key={l.id}
            listing={l}
            searches={searches}
            isOpen={openId === l.id}
            onToggle={() => setOpenId(openId === l.id ? null : l.id)}
            onStatusChange={async (status) => {
              await updateListingStatus(l.id, status);
              await refresh();
            }}
            onRescore={async (searchProfileId) => {
              const s = searches.find((x) => x.id === searchProfileId);
              if (!s) return;
              const { score, reasons } = scoreListing(l, s);
              await updateListingScore(l.id, score, reasons);
              await refresh();
            }}
            onDelete={async () => {
              if (!confirm("Supprimer cette annonce de votre liste ?")) return;
              await deleteListing(l.id);
              await refresh();
              setOpenId(null);
            }}
            profile={profile}
          />
        ))}

        {listings.length === 0 && (
          <EmptyState
            title="Votre liste est vide"
            action={
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button onClick={() => void startDemo()} disabled={demoStarting}>
                  {demoStarting ? "Préparation…" : "Voir la démonstration"}
                </Button>
                {firstSearchUrl && (
                  <Button variant="secondary" onClick={() => openExternal(firstSearchUrl)}>
                    Créer mon alerte sur Leboncoin
                  </Button>
                )}
              </div>
            }
          >
            La démonstration fait arriver des annonces d'exemple, comme en vrai, et s'efface ensuite.
            Pour de vraies annonces, deux façons : le bouton « Capter les annonces » à glisser dans
            vos favoris (onglet « Depuis Leboncoin »), ou l'e-mail d'alerte Leboncoin, qui se colle
            n'importe où sur cette page.
          </EmptyState>
        )}

        {listings.length > 0 && filtered.length === 0 && (
          <EmptyState
            title="Aucune annonce ne correspond"
            action={
              filtersActive ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery("");
                    setMinScore(0);
                    setStatusFilter("all");
                    setSearchFilter("all");
                  }}
                >
                  Effacer les filtres
                </Button>
              ) : undefined
            }
          >
            Essayez une autre recherche ou retirez un filtre.
          </EmptyState>
        )}
      </div>
    </div>
  );
}
