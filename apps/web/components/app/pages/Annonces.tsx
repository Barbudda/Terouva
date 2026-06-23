import { useEffect, useMemo, useState } from "react";
import { Button } from "@app/components/ui/Button";
import { Badge, Card, CardBody, CardFooter, CardHeader, CardTitle } from "@app/components/ui/Card";
import { Field, Input, Select, Textarea } from "@app/components/ui/Input";
import {
  deleteListing,
  getApplicationByListing,
  getListing,
  getSetting,
  insertListingFromParsed,
  updateListingNotes,
  updateListingScore,
  updateListingStatus,
  upsertApplication,
} from "@app/lib/db";
import { generateMessage, TONE_LABELS } from "@app/lib/messageGen";
import { recommendationLabel, scoreListing } from "@app/lib/scoring";
import {
  copyToClipboard,
  notifyDesktop,
  openExternal,
  parseListingUrl,
} from "@app/lib/tauri";
import {
  type EmailImportSummary,
  importLbcAlertEmail,
  ingestParsedListing,
} from "@app/lib/watchBridge";
import { DEMO_LISTINGS } from "@app/lib/demoListings";
import { useStore } from "@app/store/useStore";
import type {
  Application,
  Listing,
  ListingStatus,
  MessageTone,
  ScoreReasons,
  SearchProfile,
} from "@app/types";

type IngestResult = { url: string; ok: boolean; error?: string; id?: number };

interface ClipboardPayload {
  app: string;
  type: string;
  version: number;
  captured_at?: string;
  data: {
    url: string;
    external_id: string | null;
    title: string | null;
    price: number | null;
    city: string | null;
    postal_code: string | null;
    surface: number | null;
    rooms: number | null;
    furnished: boolean | null;
    property_type: string | null;
    description: string | null;
    images: string[];
    publisher_name: string | null;
    publisher_type: string | null;
    published_at: string | null;
  };
}

export default function Annonces() {
  const listings = useStore((s) => s.listings);
  const searches = useStore((s) => s.searches);
  const profile = useStore((s) => s.profile);
  const refresh = useStore((s) => s.refreshListings);

  const [mode, setMode] = useState<"single" | "bulk" | "email">("single");
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
      return (
        new Date(b.discovered_at).getTime() - new Date(a.discovered_at).getTime()
      );
    });
    return sorted;
  }, [listings, statusFilter, searchFilter, query, minScore, sortBy]);

  const ingestOne = async (rawUrl: string): Promise<IngestResult> => {
    const u = rawUrl.trim();
    if (!u) return { url: u, ok: false, error: "URL vide" };
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
      setError("Collez une URL Leboncoin");
      return;
    }
    setAdding(true);
    const r = await ingestOne(url);
    setAdding(false);
    await refresh();
    if (!r.ok) {
      setError(r.error ?? "Erreur");
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
        setError("Presse-papiers vide");
        return;
      }
      let payload: ClipboardPayload;
      try {
        payload = JSON.parse(text);
      } catch {
        setError("Le presse-papiers ne contient pas de données copiées depuis l'extension Terouva");
        return;
      }
      if (payload?.app !== "terouva" || payload?.type !== "listing-clipboard") {
        setError(
          "Données non reconnues. Capturez une annonce avec l'extension Terouva avant.",
        );
        return;
      }
      const d = payload.data;
      if (!d?.url) {
        setError("Données copiées sans URL d'annonce");
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
        setError(`Insertion échouée : ${e}`);
      } finally {
        setAdding(false);
      }
    } catch (e) {
      setError(`Lecture du presse-papiers impossible : ${e}`);
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
      setError("Aucune URL valide détectée (une par ligne)");
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
      setError("Collez le contenu d'un email d'alerte Leboncoin");
      return;
    }
    setAdding(true);
    try {
      const summary = await importLbcAlertEmail(email);
      await refresh();
      setEmailReport(summary);
      if (summary.found === 0) {
        setError(
          "Aucun lien d'annonce détecté dans cet email. Collez l'email d'alerte Leboncoin en entier (HTML d'origine de préférence).",
        );
      } else {
        setEmail("");
      }
    } catch (e) {
      setError(`Import échoué : ${e}`);
    } finally {
      setAdding(false);
    }
  };

  // Démo : charge des annonces d'exemple (riches) pour découvrir Terouva en un clic.
  const loadDemo = async () => {
    setError(null);
    setAdding(true);
    try {
      for (const parsed of DEMO_LISTINGS) {
        await ingestParsedListing(parsed, { pageNotif: false });
      }
      await refresh();
    } catch (e) {
      setError(`Chargement des exemples échoué : ${e}`);
    } finally {
      setAdding(false);
    }
  };

  const rescoreAll = async () => {
    if (!searches.length) return;
    if (!confirm("Re-scorer toutes les annonces selon leur recherche associée ?")) return;
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Ajouter une annonce</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={addFromClipboard}
              disabled={adding}
              title="Importe les données copiées depuis l'extension Chrome Terouva"
            >
              📋 Depuis le presse-papiers
            </Button>
            <div className="flex gap-1">
              <button
                onClick={() => setMode("single")}
                className={tabClass(mode === "single")}
              >
                URL simple
              </button>
              <button
                onClick={() => setMode("bulk")}
                className={tabClass(mode === "bulk")}
              >
                Multi-URL
              </button>
              <button
                onClick={() => setMode("email")}
                className={tabClass(mode === "email")}
                title="Collez un email d'alerte Leboncoin : Terouva en extrait les annonces"
              >
                ✉ Email d'alerte
              </button>
            </div>
          </div>
        </CardHeader>
        {mode === "single" && (
          <CardBody className="grid grid-cols-[1fr_240px_auto] gap-3 items-end">
            <Field label="URL Leboncoin">
              <Input
                placeholder="https://www.leboncoin.fr/locations/…"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addUrl()}
              />
            </Field>
            <Field label="Associer à la recherche">
              <Select
                value={searchId ?? ""}
                onChange={(e) =>
                  setSearchId(e.target.value ? Number(e.target.value) : null)
                }
              >
                <option value="">(sans recherche)</option>
                {searches.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Button onClick={addUrl} disabled={adding}>
              {adding ? "Récup…" : "Ajouter & scorer"}
            </Button>
          </CardBody>
        )}
        {mode === "bulk" && (
          <CardBody className="space-y-3">
            <Field
              label="URLs Leboncoin (une par ligne)"
              hint="Toutes les URLs seront ajoutées et scorées avec la recherche sélectionnée."
            >
              <Textarea
                rows={6}
                placeholder={"https://…\nhttps://…\nhttps://…"}
                value={bulk}
                onChange={(e) => setBulk(e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-[240px_auto] gap-3 items-end">
              <Field label="Associer à la recherche">
                <Select
                  value={searchId ?? ""}
                  onChange={(e) =>
                    setSearchId(e.target.value ? Number(e.target.value) : null)
                  }
                >
                  <option value="">(sans recherche)</option>
                  {searches.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Button onClick={addBulk} disabled={adding}>
                {adding ? "Traitement…" : "Importer en série"}
              </Button>
            </div>
            {bulkReport && (
              <div className="text-xs space-y-1 pt-2 border-t border-[var(--color-border)]">
                <div className="text-[var(--color-text-muted)]">
                  {bulkReport.filter((r) => r.ok).length}/{bulkReport.length}{" "}
                  importées
                </div>
                {bulkReport
                  .filter((r) => !r.ok)
                  .map((r, i) => (
                    <div key={i} className="text-[var(--color-danger)]">
                      ✗ {truncate(r.url, 60)} — {r.error}
                    </div>
                  ))}
              </div>
            )}
          </CardBody>
        )}
        {mode === "email" && (
          <CardBody className="space-y-3">
            <Field
              label="Email d'alerte Leboncoin"
              hint="Ouvrez l'email d'alerte Leboncoin, copiez-le entièrement (ou « Afficher l'original » dans Gmail) et collez-le ici. Terouva en extrait les annonces — aucune requête vers Leboncoin."
            >
              <Textarea
                rows={7}
                placeholder="Collez ici le contenu de l'email d'alerte « Nouvelles annonces pour votre recherche »…"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] text-[var(--color-text-faint)] max-w-md">
                Chaque annonce de l'email arrive en « provisoire » : ouvrez-la pour
                l'enrichir et préciser son score. L'envoi de candidature reste 100 %
                vous.
              </p>
              <Button onClick={addFromEmail} disabled={adding}>
                {adding ? "Extraction…" : "Importer les annonces"}
              </Button>
            </div>
            {emailReport && (
              <div className="text-xs space-y-1 pt-2 border-t border-[var(--color-border)] text-[var(--color-text-muted)]">
                <div>
                  {emailReport.found} annonce(s) trouvée(s) :{" "}
                  <span className="text-[var(--color-signal)]">{emailReport.added} nouvelle(s)</span>
                  {emailReport.enriched > 0 && (
                    <span className="text-[var(--color-signal)]"> · {emailReport.enriched} enrichie(s)</span>
                  )}
                  {emailReport.duplicates > 0 && (
                    <span className="text-[var(--color-text-faint)]"> · {emailReport.duplicates} déjà présente(s)</span>
                  )}
                  {emailReport.notified > 0 && (
                    <span className="text-[var(--color-signal)]"> · {emailReport.notified} alerte(s) ★</span>
                  )}
                </div>
              </div>
            )}
          </CardBody>
        )}
        {error && (
          <CardFooter>
            <span className="text-xs text-[var(--color-danger)]">{error}</span>
          </CardFooter>
        )}
      </Card>

      <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2">
        <Input
          data-shortcut-target="search"
          placeholder="Recherche (titre, description, ville, annonceur)… —  '/' pour focus rapide"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Input
          type="number"
          min={0}
          max={100}
          value={minScore || ""}
          onChange={(e) => setMinScore(Number(e.target.value) || 0)}
          placeholder="score min"
          className="w-28"
        />
        <Select
          className="w-44"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "score" | "date" | "price")}
        >
          <option value="score">Tri : score ↓</option>
          <option value="date">Tri : date ↓</option>
          <option value="price">Tri : prix ↑</option>
        </Select>
        {(query || minScore > 0) && (
          <button
            onClick={() => {
              setQuery("");
              setMinScore(0);
            }}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] px-2 py-1"
            title="Réinitialiser la recherche / score min"
          >
            Effacer
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            "all",
            "new",
            "to_review",
            "favorite",
            "applied",
            "ignored",
            "expired",
          ] as const
        ).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={pillClass(statusFilter === s)}
          >
            {STATUS_LABELS[s] ?? s}{" "}
            {s !== "all" && counts[s] ? `(${counts[s]})` : ""}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {searches.length > 0 && (
            <Select
              className="w-48"
              value={searchFilter}
              onChange={(e) =>
                setSearchFilter(
                  e.target.value === "all" ? "all" : Number(e.target.value),
                )
              }
            >
              <option value="all">Toutes recherches</option>
              {searches.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
          )}
          {listings.length > 0 && (
            <Button variant="secondary" size="sm" onClick={rescoreAll} disabled={adding}>
              Rescore tout
            </Button>
          )}
        </div>
      </div>
      <div className="text-xs text-[var(--color-text-faint)] font-mono">
        {filtered.length} / {listings.length} annonce{listings.length > 1 ? "s" : ""} ·
        appuyez sur <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border-2)] bg-[var(--color-bg)] text-[10px]">?</kbd> pour les raccourcis
      </div>

      <div className="space-y-4">
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
              if (!confirm("Supprimer cette annonce ?")) return;
              await deleteListing(l.id);
              await refresh();
              setOpenId(null);
            }}
            profile={profile}
          />
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardBody className="text-center py-12 text-[var(--color-text-muted)] space-y-4">
              {listings.length === 0 ? (
                <>
                  <div className="text-base text-[var(--color-text-muted)]">
                    Aucune annonce pour l'instant.
                  </div>
                  <p className="text-sm text-[var(--color-text-faint)] max-w-md mx-auto">
                    Pour découvrir Terouva tout de suite, chargez quelques annonces
                    d'exemple : vous pourrez voir les scores, générer des messages et
                    tester toutes les fonctions, sans rien installer.
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Button onClick={loadDemo} disabled={adding}>
                      {adding ? "Chargement…" : "Charger des annonces d'exemple"}
                    </Button>
                    {firstSearchUrl && (
                      <Button variant="secondary" onClick={() => openExternal(firstSearchUrl)}>
                        Ouvrir ma recherche sur Leboncoin ↗
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-faint)] max-w-md mx-auto">
                    En vrai, vos annonces arrivent toutes seules quand vous gardez une
                    page de recherche Leboncoin ouverte.
                  </p>
                </>
              ) : (
                "Aucune annonce dans ce filtre."
              )}
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

async function maybeNotifyHot(listing: Listing, score: number) {
  const threshold = Number((await getSetting("notification_min_score")) ?? 70);
  if (score < threshold) return;
  await notifyDesktop({
    title: `★ ${score}/100 — ${listing.title ?? "Nouvelle annonce"}`,
    body: [
      listing.price ? `${listing.price}€` : null,
      listing.surface ? `${listing.surface}m²` : null,
      listing.city,
    ]
      .filter(Boolean)
      .join(" • "),
  });
}

const STATUS_LABELS: Record<string, string> = {
  all: "Toutes",
  new: "Nouvelles",
  to_review: "À vérifier",
  favorite: "Favoris",
  applied: "Candidatées",
  ignored: "Ignorées",
  expired: "Expirées",
};

function tabClass(active: boolean) {
  return (
    "px-3 py-1 rounded text-xs border " +
    (active
      ? "bg-[var(--color-signal)] border-[var(--color-signal)] text-white"
      : "bg-[var(--color-bg-2)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]")
  );
}

function pillClass(active: boolean) {
  return (
    "px-3 py-1 rounded-md text-xs border transition-colors " +
    (active
      ? "bg-[var(--color-signal)] border-[var(--color-signal)] text-white"
      : "bg-[var(--color-bg-2)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]")
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

function parseImages(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? (v as string[]) : [];
  } catch {
    return [];
  }
}

function ListingCard({
  listing,
  searches,
  isOpen,
  onToggle,
  onStatusChange,
  onRescore,
  onDelete,
  profile,
}: {
  listing: Listing;
  searches: SearchProfile[];
  isOpen: boolean;
  onToggle: () => void;
  onStatusChange: (s: ListingStatus) => Promise<void>;
  onRescore: (searchProfileId: number) => Promise<void>;
  onDelete: () => Promise<void>;
  profile: ReturnType<typeof useStore.getState>["profile"];
}) {
  const reasons: ScoreReasons | null = listing.score_reasons
    ? safeParse(listing.score_reasons)
    : null;
  const rec = reasons ? recommendationLabel(reasons.recommendation) : null;
  const images = parseImages(listing.images);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          {images[0] && (
            <button
              onClick={onToggle}
              className="w-24 h-20 shrink-0 rounded-md overflow-hidden bg-[var(--color-bg-2)] border border-[var(--color-border)]"
            >
              <img
                src={images[0]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <button
              onClick={onToggle}
              className="text-left w-full hover:text-[var(--color-signal)] transition-colors"
            >
              <CardTitle className="truncate">{listing.title ?? "Sans titre"}</CardTitle>
            </button>
            <div className="mt-1 text-xs text-[var(--color-text-muted)] flex flex-wrap gap-x-3 gap-y-1">
              {listing.price !== null && <span>{listing.price}€/mois</span>}
              {listing.surface !== null && <span>{listing.surface}m²</span>}
              {listing.rooms !== null && <span>{listing.rooms} pièces</span>}
              {listing.city && <span>{listing.city}</span>}
              {listing.publisher_type && <span>{listing.publisher_type}</span>}
              <span className="text-[var(--color-text-faint)]">
                vu {new Date(listing.discovered_at).toLocaleString("fr-FR")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {listing.score !== null && (
              <Badge className="bg-[var(--color-panel-2)] border-[var(--color-border-2)] text-[var(--color-text)] text-base px-3">
                {listing.score}
              </Badge>
            )}
            {rec && <Badge className={rec.className}>{rec.text}</Badge>}
            {reasons && reasons.confidence !== undefined && reasons.confidence < 0.5 && (
              <span title="Score provisoire : peu d'infos sur la carte Leboncoin. Ouvrez l'annonce pour le confirmer.">
                <Badge className="bg-[var(--color-urgent-soft)] text-[var(--color-urgent)]/90 border-[var(--color-urgent)]/30">
                  provisoire
                </Badge>
              </span>
            )}
            <StatusBadge status={listing.status} />
          </div>
        </div>
      </CardHeader>

      {isOpen && (
        <CardBody className="space-y-4 border-t border-[var(--color-border)] pt-4">
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.slice(0, 8).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-24 w-32 object-cover rounded-md border border-[var(--color-border)] shrink-0"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {reasons && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[var(--color-signal)] font-semibold mb-2">+ Pour</div>
                <ul className="text-xs text-[var(--color-text-muted)] space-y-1">
                  {reasons.positive.map((r, i) => (
                    <li key={i}>· {r}</li>
                  ))}
                  {reasons.positive.length === 0 && (
                    <li className="text-[var(--color-text-faint)]">aucun</li>
                  )}
                </ul>
              </div>
              <div>
                <div className="text-xs text-[var(--color-danger)] font-semibold mb-2">- Contre</div>
                <ul className="text-xs text-[var(--color-text-muted)] space-y-1">
                  {reasons.negative.map((r, i) => (
                    <li key={i}>· {r}</li>
                  ))}
                  {reasons.negative.length === 0 && (
                    <li className="text-[var(--color-text-faint)]">aucun</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {listing.description && (
            <details className="text-sm text-[var(--color-text-muted)]">
              <summary className="cursor-pointer text-xs text-[var(--color-text-muted)]">
                Description
              </summary>
              <p className="mt-2 whitespace-pre-wrap text-[var(--color-text-muted)] text-xs leading-relaxed">
                {listing.description}
              </p>
            </details>
          )}

          {profile && <CandidaturePanel listing={listing} profile={profile} />}

          <NotesEditor listing={listing} />

          <div className="flex flex-wrap items-center gap-2 pt-3">
            <Button variant="secondary" size="sm" onClick={() => openExternal(listing.url)}>
              Ouvrir l'annonce
            </Button>
            <Button
              variant={listing.status === "favorite" ? "primary" : "ghost"}
              size="sm"
              onClick={() => onStatusChange(listing.status === "favorite" ? "new" : "favorite")}
            >
              ★ Favori
            </Button>
            <Button
              variant={listing.status === "ignored" ? "danger" : "ghost"}
              size="sm"
              onClick={() => onStatusChange(listing.status === "ignored" ? "new" : "ignored")}
            >
              Ignorer
            </Button>
            <Button
              variant={listing.status === "applied" ? "success" : "ghost"}
              size="sm"
              onClick={() => onStatusChange(listing.status === "applied" ? "new" : "applied")}
            >
              ✓ Marquer candidaté
            </Button>
            <div className="ml-auto flex items-center gap-2">
              {searches.length > 0 && (
                <Select
                  className="w-48"
                  value={listing.search_profile_id ?? ""}
                  onChange={(e) => {
                    const v = e.target.value ? Number(e.target.value) : null;
                    if (v) void onRescore(v);
                  }}
                >
                  <option value="">re-scorer avec…</option>
                  {searches.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              )}
              <Button variant="danger" size="sm" onClick={onDelete}>
                Supprimer
              </Button>
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}

function StatusBadge({ status }: { status: ListingStatus }) {
  const map: Record<ListingStatus, string> = {
    new: "bg-[var(--color-panel-2)] text-[var(--color-text)] border-[var(--color-border-2)]",
    to_review: "bg-[var(--color-urgent)]/15 text-[var(--color-urgent)] border-[var(--color-urgent)]/40",
    favorite: "bg-[var(--color-signal)]/15 text-[var(--color-signal)] border-[var(--color-signal)]/40",
    applied: "bg-[var(--color-signal)]/15 text-[var(--color-signal)] border-[var(--color-signal)]/40",
    ignored: "bg-[var(--color-border-2)]/40 text-[var(--color-text-muted)] border-[var(--color-border-2)]/40",
    expired: "bg-[var(--color-panel-2)] text-[var(--color-text-faint)] border-[var(--color-border-2)]",
  };
  const label: Record<ListingStatus, string> = {
    new: "nouvelle",
    to_review: "à vérifier",
    favorite: "favori",
    applied: "candidatée",
    ignored: "ignorée",
    expired: "expirée",
  };
  return <Badge className={map[status]}>{label[status]}</Badge>;
}

function NotesEditor({ listing }: { listing: Listing }) {
  const refresh = useStore((s) => s.refreshListings);
  const [notes, setNotes] = useState(listing.notes ?? "");
  const [saving, setSaving] = useState(false);
  const dirty = notes !== (listing.notes ?? "");
  return (
    <Field label="Notes">
      <Textarea
        rows={2}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Vos remarques perso sur cette annonce…"
      />
      {dirty && (
        <div className="mt-2 flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              await updateListingNotes(listing.id, notes);
              await refresh();
              setSaving(false);
            }}
          >
            {saving ? "…" : "Sauver notes"}
          </Button>
        </div>
      )}
    </Field>
  );
}

function CandidaturePanel({
  listing,
  profile,
}: {
  listing: Listing;
  profile: NonNullable<ReturnType<typeof useStore.getState>["profile"]>;
}) {
  const [tone, setTone] = useState<MessageTone>("pro");
  const [message, setMessage] = useState<string>(() =>
    generateMessage(listing, profile, "pro"),
  );
  const [app, setApp] = useState<Application | undefined>(undefined);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    getApplicationByListing(listing.id)
      .then((a) => {
        if (a) {
          setApp(a);
          if (a.message) setMessage(a.message);
          if (a.message_tone) setTone(a.message_tone);
        }
      })
      .catch(() => {});
  }, [listing.id]);

  // Clic sur un ton = (re)génère le message ; recliquer le même ton donne une
  // autre variante de formulation. 100 % local, instantané.
  const regenerate = (newTone: MessageTone) => {
    setTone(newTone);
    setMessage(generateMessage(listing, profile, newTone));
  };

  const saveDraft = async () => {
    await upsertApplication({
      listing_id: listing.id,
      message,
      message_tone: tone,
      status: app?.status ?? "prepared",
    });
    setSavedAt(Date.now());
  };

  const copyMessage = async () => {
    await copyToClipboard(message);
    await saveDraft();
  };

  // 1-clic : rédige+copie le message, sauve le brouillon, et ouvre l'annonce LBC.
  // L'envoi reste HUMAIN (coller + Envoyer) — principe non négociable de Terouva
  // (pas d'envoi auto = pas de bot = pas de ban du compte LBC). Mais en 1 clic /
  // ~1 s, pour rester le premier à candidater.
  const prepareAndContact = async () => {
    await copyToClipboard(message);
    await saveDraft();
    await openExternal(listing.url);
  };

  const markSent = async () => {
    await upsertApplication({
      listing_id: listing.id,
      message,
      message_tone: tone,
      status: "sent",
      sent_at: new Date().toISOString(),
    });
    await updateListingStatus(listing.id, "applied");
    setSavedAt(Date.now());
  };

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-panel)]/50 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="text-xs font-semibold text-[var(--color-text-muted)]">
          Préparer la candidature
          <span className="ml-2 font-normal text-[10px] text-[var(--color-text-faint)]">
            recliquez un ton pour une autre version
          </span>
        </div>
        <div className="flex gap-1">
          {(Object.keys(TONE_LABELS) as MessageTone[]).map((t) => (
            <button
              key={t}
              onClick={() => regenerate(t)}
              className={
                "px-2 py-1 rounded text-xs transition-colors " +
                (tone === t
                  ? "bg-[var(--color-signal)] text-white"
                  : "bg-[var(--color-panel-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]")
              }
            >
              {TONE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>
      <Textarea
        rows={10}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          onClick={prepareAndContact}
          title="Copie le message + ouvre l'annonce Leboncoin en 1 clic — il ne reste qu'à coller (Ctrl+V) et Envoyer"
        >
          ⚡ Préparer &amp; contacter
        </Button>
        <Button size="sm" variant="secondary" onClick={copyMessage}>
          Copier le message
        </Button>
        <Button size="sm" variant="secondary" onClick={() => openExternal(listing.url)}>
          Ouvrir sur Leboncoin
        </Button>
        <Button size="sm" variant="ghost" onClick={saveDraft}>
          Sauver brouillon
        </Button>
        <Button size="sm" variant="success" onClick={markSent}>
          Marquer envoyé
        </Button>
        {savedAt && (
          <span className="text-xs text-[var(--color-signal)] ml-auto">
            Sauvé {new Date(savedAt).toLocaleTimeString("fr-FR")}
          </span>
        )}
      </div>
    </div>
  );
}

function safeParse<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}
