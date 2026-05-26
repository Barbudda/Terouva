import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge, Card, CardBody, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";
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
} from "@/lib/db";
import {
  generateMessageAI,
  getClaudeApiKey,
  getClaudeEnabled,
  setClaudeEnabled,
} from "@/lib/ai";
import { generateMessage, TONE_LABELS } from "@/lib/messageGen";
import { recommendationLabel, scoreListing } from "@/lib/scoring";
import {
  copyToClipboard,
  notifyDesktop,
  openExternal,
  parseListingUrl,
} from "@/lib/tauri";
import { useStore } from "@/store/useStore";
import type {
  Application,
  Listing,
  ListingStatus,
  MessageTone,
  ScoreReasons,
  SearchProfile,
} from "@/types";

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

  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [url, setUrl] = useState("");
  const [bulk, setBulk] = useState("");
  const [searchId, setSearchId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bulkReport, setBulkReport] = useState<IngestResult[] | null>(null);

  const [statusFilter, setStatusFilter] = useState<ListingStatus | "all">("all");
  const [searchFilter, setSearchFilter] = useState<number | "all">("all");
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    if (!searchId && searches.length > 0) setSearchId(searches[0].id);
  }, [searches, searchId]);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (searchFilter !== "all" && l.search_profile_id !== searchFilter) return false;
      return true;
    });
  }, [listings, statusFilter, searchFilter]);

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
      setError("Colle une URL Leboncoin");
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
        setError("Presse-papier vide");
        return;
      }
      let payload: ClipboardPayload;
      try {
        payload = JSON.parse(text);
      } catch {
        setError("Le presse-papier ne contient pas un payload JSON Terouva valide");
        return;
      }
      if (payload?.app !== "terouva" || payload?.type !== "listing-clipboard") {
        setError(
          "Payload non reconnu. Capture une annonce avec l'extension Terouva avant.",
        );
        return;
      }
      const d = payload.data;
      if (!d?.url) {
        setError("Payload sans URL");
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
      setError(`Lecture presse-papier impossible : ${e}`);
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
              title="Importe le payload JSON copié depuis l'extension Chrome Terouva"
            >
              📋 Depuis presse-papier
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
            </div>
          </div>
        </CardHeader>
        {mode === "single" ? (
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
        ) : (
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
              <div className="text-xs space-y-1 pt-2 border-t border-zinc-800">
                <div className="text-zinc-400">
                  {bulkReport.filter((r) => r.ok).length}/{bulkReport.length}{" "}
                  importées
                </div>
                {bulkReport
                  .filter((r) => !r.ok)
                  .map((r, i) => (
                    <div key={i} className="text-red-400">
                      ✗ {truncate(r.url, 60)} — {r.error}
                    </div>
                  ))}
              </div>
            )}
          </CardBody>
        )}
        {error && (
          <CardFooter>
            <span className="text-xs text-red-400">{error}</span>
          </CardFooter>
        )}
      </Card>

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
            <CardBody className="text-center py-10 text-zinc-500">
              {listings.length === 0
                ? "Aucune annonce. Colle une URL Leboncoin ci-dessus pour commencer."
                : "Aucune annonce dans ce filtre."}
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
      ? "bg-violet-500 border-violet-400 text-white"
      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")
  );
}

function pillClass(active: boolean) {
  return (
    "px-3 py-1 rounded-md text-xs border transition-colors " +
    (active
      ? "bg-violet-500 border-violet-400 text-white"
      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")
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
              className="w-24 h-20 shrink-0 rounded-md overflow-hidden bg-zinc-900 border border-zinc-800"
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
              className="text-left w-full hover:text-violet-300 transition-colors"
            >
              <CardTitle className="truncate">{listing.title ?? "Sans titre"}</CardTitle>
            </button>
            <div className="mt-1 text-xs text-zinc-400 flex flex-wrap gap-x-3 gap-y-1">
              {listing.price !== null && <span>{listing.price}€/mois</span>}
              {listing.surface !== null && <span>{listing.surface}m²</span>}
              {listing.rooms !== null && <span>{listing.rooms} pièces</span>}
              {listing.city && <span>{listing.city}</span>}
              {listing.publisher_type && <span>{listing.publisher_type}</span>}
              <span className="text-zinc-600">
                vu {new Date(listing.discovered_at).toLocaleString("fr-FR")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {listing.score !== null && (
              <Badge className="bg-zinc-800 border-zinc-700 text-zinc-200 text-base px-3">
                {listing.score}
              </Badge>
            )}
            {rec && <Badge className={rec.className}>{rec.text}</Badge>}
            <StatusBadge status={listing.status} />
          </div>
        </div>
      </CardHeader>

      {isOpen && (
        <CardBody className="space-y-4 border-t border-zinc-800 pt-4">
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.slice(0, 8).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-24 w-32 object-cover rounded-md border border-zinc-800 shrink-0"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {reasons && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-emerald-400 font-semibold mb-2">+ Pour</div>
                <ul className="text-xs text-zinc-300 space-y-1">
                  {reasons.positive.map((r, i) => (
                    <li key={i}>· {r}</li>
                  ))}
                  {reasons.positive.length === 0 && (
                    <li className="text-zinc-600">aucun</li>
                  )}
                </ul>
              </div>
              <div>
                <div className="text-xs text-red-400 font-semibold mb-2">- Contre</div>
                <ul className="text-xs text-zinc-300 space-y-1">
                  {reasons.negative.map((r, i) => (
                    <li key={i}>· {r}</li>
                  ))}
                  {reasons.negative.length === 0 && (
                    <li className="text-zinc-600">aucun</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {listing.description && (
            <details className="text-sm text-zinc-300">
              <summary className="cursor-pointer text-xs text-zinc-400">
                Description
              </summary>
              <p className="mt-2 whitespace-pre-wrap text-zinc-300 text-xs leading-relaxed">
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
    new: "bg-blue-500/15 text-blue-300 border-blue-500/40",
    to_review: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    favorite: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40",
    applied: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    ignored: "bg-zinc-700/40 text-zinc-400 border-zinc-600/40",
    expired: "bg-zinc-800 text-zinc-500 border-zinc-700",
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
        placeholder="Tes remarques perso sur cette annonce…"
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
  const [useAI, setUseAI] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiMeta, setAiMeta] = useState<{
    model: string;
    inTok: number;
    outTok: number;
  } | null>(null);

  useEffect(() => {
    Promise.all([getApplicationByListing(listing.id), getClaudeEnabled(), getClaudeApiKey()])
      .then(([a, on, key]) => {
        if (a) {
          setApp(a);
          if (a.message) setMessage(a.message);
          if (a.message_tone) setTone(a.message_tone);
        }
        setHasApiKey(!!key);
        setUseAI(on && !!key);
      })
      .catch(() => {});
  }, [listing.id]);

  const regenerate = async (newTone: MessageTone) => {
    setTone(newTone);
    setAiError(null);
    if (useAI && hasApiKey) {
      setAiLoading(true);
      try {
        const out = await generateMessageAI(listing, profile, newTone);
        setMessage(out.text);
        setAiMeta({
          model: out.model,
          inTok: out.input_tokens,
          outTok: out.output_tokens,
        });
      } catch (e) {
        setAiError(
          String(e).replace(/^Error:\s*/, "") + " — fallback sur le template.",
        );
        setMessage(generateMessage(listing, profile, newTone));
      } finally {
        setAiLoading(false);
      }
    } else {
      setMessage(generateMessage(listing, profile, newTone));
    }
  };

  const toggleAI = async (on: boolean) => {
    setUseAI(on);
    await setClaudeEnabled(on);
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
    <div className="rounded-md border border-zinc-800 bg-zinc-900/50 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-zinc-300">
            Préparer la candidature
          </div>
          {hasApiKey ? (
            <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useAI}
                onChange={(e) => toggleAI(e.target.checked)}
                className="accent-violet-500"
              />
              <span>{useAI ? "AI Claude" : "Template"}</span>
            </label>
          ) : (
            <span
              className="text-[11px] text-zinc-500"
              title="Configure ta clé API Claude dans Réglages → Génération AI pour activer la génération adaptative."
            >
              Template (AI désactivée)
            </span>
          )}
        </div>
        <div className="flex gap-1">
          {(Object.keys(TONE_LABELS) as MessageTone[]).map((t) => (
            <button
              key={t}
              onClick={() => regenerate(t)}
              disabled={aiLoading}
              className={
                "px-2 py-1 rounded text-xs transition-colors " +
                (tone === t
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-100") +
                (aiLoading ? " opacity-60 cursor-wait" : "")
              }
            >
              {TONE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>
      {aiLoading && (
        <div className="text-[11px] text-violet-300 animate-pulse">
          Claude rédige le message…
        </div>
      )}
      {aiError && (
        <div className="text-[11px] text-red-400 border border-red-500/30 bg-red-500/5 rounded px-2 py-1">
          {aiError}
        </div>
      )}
      {aiMeta && !aiError && (
        <div className="text-[10px] font-mono text-zinc-500">
          {aiMeta.model} · {aiMeta.inTok}↑ / {aiMeta.outTok}↓ tokens
        </div>
      )}
      <Textarea
        rows={10}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={copyMessage}>
          Copier le message
        </Button>
        <Button size="sm" variant="secondary" onClick={() => openExternal(listing.url)}>
          Ouvrir LBC
        </Button>
        <Button size="sm" variant="ghost" onClick={saveDraft}>
          Sauver brouillon
        </Button>
        <Button size="sm" variant="success" onClick={markSent}>
          Marquer envoyé
        </Button>
        {savedAt && (
          <span className="text-xs text-emerald-400 ml-auto">
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
