import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { EmptyState } from "@app/components/ui/Card";
import { Input, Select } from "@app/components/ui/Input";
import {
  AddListingPanel,
  type AddMode,
  type IngestResult,
} from "@app/components/listing/AddListingPanel";
import { ListingCard, PriorityBanner } from "@app/components/listing/ListingCard";
import { LISTING_FILTERS, safeParse } from "@app/components/listing/format";
import { type ClipboardPayload, maybeNotifyHot } from "@app/components/listing/ingest";
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
import { cn } from "@app/lib/cn";
import { useStore } from "@app/store/useStore";
import type { ListingStatus, ScoreReasons } from "@app/types";

const FILTERS = ["all", "new", "to_review", "favorite", "applied", "ignored", "expired"] as const;

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

  const addFromClipboard = async () => {
    setError(null);
    try {
      const text = await navigator.clipboard.readText();
      if (!text.trim()) {
        setError("Rien n'a été copié pour l'instant.");
        return;
      }
      let payload: ClipboardPayload;
      try {
        payload = JSON.parse(text);
      } catch {
        setError("Ce que vous avez copié ne vient pas de l'extension Terouva.");
        return;
      }
      if (payload?.app !== "terouva" || payload?.type !== "listing-clipboard") {
        setError("Ce que vous avez copié n'est pas reconnu. Copiez d'abord une annonce avec l'extension Terouva.");
        return;
      }
      const d = payload.data;
      if (!d?.url) {
        setError("L'annonce copiée ne contient pas de lien.");
        return;
      }
      setAdding(true);
      const parsed = {
        url: d.url,
        external_id: d.external_id,
        title: d.title,
        price: d.price,
        city: d.city,
        postal_code: d.postal_code,
        surface: d.surface,
        rooms: d.rooms,
        furnished: d.furnished,
        property_type: d.property_type,
        description: d.description,
        images: d.images ?? [],
        publisher_name: d.publisher_name,
        publisher_type: d.publisher_type,
        published_at: d.published_at,
        raw_html_size: 0,
      };
      try {
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
        await refresh();
        setOpenId(id);
      } catch (e) {
        setError(`L'annonce n'a pas pu être ajoutée : ${e}`);
      } finally {
        setAdding(false);
      }
    } catch {
      setError("Votre navigateur n'a pas autorisé la lecture de ce que vous avez copié.");
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
    setError(null);
    setEmailReport(null);
    if (!email.trim()) {
      setError("Collez le contenu d'un e-mail d'alerte Leboncoin.");
      return;
    }
    setAdding(true);
    try {
      const summary = await importLbcAlertEmail(email);
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

  const showAdd = addOpen || listings.length === 0;
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
          onAddClipboard={addFromClipboard}
        />
      ) : null}

      {listings.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-0 flex-1 basis-64">
              <Search
                size={16}
                strokeWidth={1.75}
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-3"
              />
              <Input
                data-shortcut-target="search"
                aria-label="Chercher dans vos annonces"
                placeholder="Chercher un titre, une ville, un annonceur…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              className="w-auto"
              aria-label="Trier les annonces"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "score" | "date" | "price")}
            >
              <option value="score">Meilleure note d'abord</option>
              <option value="date">Plus récentes d'abord</option>
              <option value="price">Loyer le plus bas d'abord</option>
            </Select>
            <Input
              type="number"
              min={0}
              max={100}
              aria-label="Note minimum"
              value={minScore || ""}
              onChange={(e) => setMinScore(Number(e.target.value) || 0)}
              placeholder="Note min."
              className="w-28"
            />
            {!addOpen && (
              <Button variant="secondary" onClick={() => setAddOpen(true)} className="h-10">
                <Plus size={16} strokeWidth={1.75} aria-hidden />
                Ajouter
              </Button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-rule">
            <div role="tablist" aria-label="Filtrer par état" className="-mb-px flex flex-1 gap-1 overflow-x-auto overflow-y-hidden no-scrollbar">
              {FILTERS.filter((s) => s === "all" || counts[s] || statusFilter === s).map((s) => (
                <button
                  key={s}
                  role="tab"
                  aria-selected={statusFilter === s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "whitespace-nowrap border-b-2 px-2.5 py-2 text-[15px] transition-colors",
                    statusFilter === s
                      ? "border-accent font-medium text-ink"
                      : "border-transparent text-ink-2 hover:text-ink",
                  )}
                >
                  {LISTING_FILTERS[s]}
                  <span className="ml-1.5 text-[13px] text-ink-3 tabular">
                    {s === "all" ? listings.length : counts[s]}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pb-2">
              {searches.length > 1 && (
                <Select
                  className="h-8 w-48 text-sm"
                  aria-label="Filtrer par recherche"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
                >
                  <option value="all">Toutes les recherches</option>
                  {searches.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              )}
              <Button variant="ghost" size="sm" onClick={rescoreAll} disabled={adding || !searches.length}>
                Recalculer les notes
              </Button>
            </div>
          </div>

          <p className="text-[13px] text-ink-3">
            {filtered.length === listings.length
              ? `${listings.length} annonce${listings.length > 1 ? "s" : ""}`
              : `${filtered.length} sur ${listings.length} annonces`}
            <span className="hidden md:inline">
              {" "}· touche <kbd className="rounded border border-field bg-card px-1.5 font-mono text-[12px]">?</kbd>{" "}
              pour les raccourcis clavier
            </span>
          </p>
        </div>
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
            title="Aucune annonce pour l'instant"
            action={
              firstSearchUrl ? (
                <Button variant="secondary" onClick={() => openExternal(firstSearchUrl)}>
                  Ouvrir ma recherche sur Leboncoin
                </Button>
              ) : undefined
            }
          >
            Gardez une page de recherche Leboncoin ouverte avec l'extension Terouva : les nouvelles
            annonces arrivent ici dès leur publication. Vous pouvez aussi coller un e-mail d'alerte
            ci-dessus.
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
