import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { Badge, Card } from "@app/components/ui/Card";
import { Field, Select, Textarea } from "@app/components/ui/Input";
import {
  getApplicationByListing,
  getSetting,
  updateListingNotes,
  updateListingStatus,
  upsertApplication,
} from "@app/lib/db";
import { generateMessage, TONE_LABELS } from "@app/lib/messageGen";
import { copyToClipboard, openExternal } from "@app/lib/tauri";
import { useStore } from "@app/store/useStore";
import type {
  Application,
  Listing,
  ListingStatus,
  MessageTone,
  ScoreReasons,
  SearchProfile,
} from "@app/types";
import { cn } from "@app/lib/cn";
import {
  formatDateTime,
  formatPrice,
  LISTING_STATUS,
  parseImages,
  RECOMMENDATION,
  safeParse,
  scoreColor,
} from "./format";

type Profile = ReturnType<typeof useStore.getState>["profile"];

export function ListingCard({
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
  profile: Profile;
}) {
  const reasons: ScoreReasons | null = listing.score_reasons
    ? safeParse(listing.score_reasons)
    : null;
  const rec = reasons ? RECOMMENDATION[reasons.recommendation] : null;
  const images = parseImages(listing.images);
  // Une annonce « chaude » (à contacter vite) et pas encore traitée = une alerte :
  // on la met en avant et on propose la préparation du message en un seul geste.
  const isHot =
    reasons?.recommendation === "to_contact_fast" &&
    (listing.status === "new" || listing.status === "to_review");
  const [quickDone, setQuickDone] = useState(false);
  const panelId = `listing-${listing.id}`;

  // 1 geste depuis la liste : le message prêt est copié et l'annonce s'ouvre sur
  // Leboncoin. L'envoi reste 100 % humain (coller puis cliquer « Envoyer »).
  const quickContact = async () => {
    if (!profile) return;
    const tone = ((await getSetting("default_message_tone")) as MessageTone) || "pro";
    const msg = generateMessage(listing, profile, tone);
    await copyToClipboard(msg);
    await upsertApplication({
      listing_id: listing.id,
      message: msg,
      message_tone: tone,
      status: "prepared",
    });
    await openExternal(listing.url);
    setQuickDone(true);
    setTimeout(() => setQuickDone(false), 4000);
  };

  const facts = [
    listing.price !== null ? formatPrice(listing.price) : null,
    listing.surface !== null ? `${listing.surface} m²` : null,
    listing.rooms !== null ? `${listing.rooms} pièce${listing.rooms > 1 ? "s" : ""}` : null,
    listing.city,
  ].filter(Boolean);

  const provisional = reasons?.confidence !== undefined && reasons.confidence < 0.5;

  return (
    <Card className={cn(isHot && "border-accent/50")}>
      <div className="flex gap-4 p-4 sm:p-5">
        {images[0] && (
          <button
            onClick={onToggle}
            tabIndex={-1}
            aria-hidden
            className="hidden h-24 w-28 shrink-0 overflow-hidden rounded-md border border-rule bg-paper-2 sm:block"
          >
            <img src={images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        )}

        <div className="min-w-0 flex-1">
          <button
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="group flex w-full items-start gap-2 text-left"
          >
            <h3 className="min-w-0 flex-1 text-[17px] font-semibold leading-snug text-ink group-hover:text-accent-ink">
              {listing.title ?? "Annonce sans titre"}
            </h3>
            <ChevronDown
              size={18}
              strokeWidth={1.75}
              aria-hidden
              className={cn("mt-0.5 shrink-0 text-ink-3 transition-transform", isOpen && "rotate-180")}
            />
          </button>

          {facts.length > 0 && (
            <p className="mt-1 text-[15px] text-ink-2 tabular">{facts.join(" · ")}</p>
          )}
          <p className="mt-0.5 text-[13px] text-ink-3">
            {listing.publisher_type ? `${listing.publisher_type} · ` : ""}
            Repérée le {formatDateTime(listing.discovered_at)}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {rec && <Badge tone={rec.tone}>{rec.text}</Badge>}
            {provisional && (
              <Badge
                tone="warn"
                title="Note provisoire : l'annonce contient peu d'informations. Ouvrez-la sur Leboncoin avec l'extension pour la compléter."
              >
                Note provisoire
              </Badge>
            )}
            <Badge tone={LISTING_STATUS[listing.status].tone}>
              {LISTING_STATUS[listing.status].text}
            </Badge>
          </div>

          {isHot && (
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <Button
                size="sm"
                onClick={() => void quickContact()}
                title="Copie le message déjà prêt et ouvre l'annonce sur Leboncoin. Il ne reste qu'à coller le message et cliquer sur « Envoyer »."
              >
                {quickDone ? "Message copié, collez-le sur Leboncoin" : "Copier le message et ouvrir l'annonce"}
              </Button>
              <span className="text-[13px] text-ink-3">L'envoi reste votre geste.</span>
            </div>
          )}
        </div>

        {listing.score !== null && (
          <div className="shrink-0 text-right" aria-label={`Note : ${listing.score} sur 100`}>
            <div className={cn("font-serif text-4xl font-medium leading-none tabular", scoreColor(listing.score))}>
              {listing.score}
            </div>
            <div className="mt-1 text-[13px] text-ink-3">sur 100</div>
          </div>
        )}
      </div>

      {isOpen && (
        <div id={panelId} className="space-y-6 border-t border-rule px-4 py-5 sm:px-5">
          {images.length > 1 && (
            <div className="app-scroll flex gap-2 overflow-x-auto overflow-y-hidden pb-1">
              {images.slice(0, 8).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-24 w-32 shrink-0 rounded-md border border-rule object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {reasons && (
            <div className="grid gap-5 sm:grid-cols-2">
              <ReasonList title="Points forts" items={reasons.positive} tone="text-good" />
              <ReasonList title="Points faibles" items={reasons.negative} tone="text-bad" />
            </div>
          )}

          {listing.description && (
            <details className="group">
              <summary className="inline-flex cursor-pointer items-center gap-1.5 text-[15px] font-medium text-ink hover:text-accent-ink">
                Description de l'annonce
                <ChevronDown size={16} strokeWidth={1.75} className="transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 max-w-prose whitespace-pre-wrap text-[15px] leading-relaxed text-ink-2">
                {listing.description}
              </p>
            </details>
          )}

          {profile && <CandidaturePanel listing={listing} profile={profile} />}

          <NotesEditor listing={listing} />

          <div className="flex flex-wrap items-center gap-2 border-t border-rule pt-4">
            <Button variant="secondary" size="sm" onClick={() => openExternal(listing.url)}>
              <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
              Voir sur Leboncoin
            </Button>
            <Button
              variant={listing.status === "favorite" ? "primary" : "ghost"}
              size="sm"
              aria-pressed={listing.status === "favorite"}
              onClick={() => onStatusChange(listing.status === "favorite" ? "new" : "favorite")}
            >
              {listing.status === "favorite" ? "Favorite" : "Mettre en favori"}
            </Button>
            <Button
              variant={listing.status === "applied" ? "success" : "ghost"}
              size="sm"
              aria-pressed={listing.status === "applied"}
              onClick={() => onStatusChange(listing.status === "applied" ? "new" : "applied")}
            >
              J'ai candidaté
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-pressed={listing.status === "ignored"}
              className={cn(listing.status === "ignored" && "bg-paper-2 text-ink")}
              onClick={() => onStatusChange(listing.status === "ignored" ? "new" : "ignored")}
            >
              {listing.status === "ignored" ? "Écartée" : "Écarter"}
            </Button>
            <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
              {searches.length > 0 && (
                <Select
                  className="h-8 w-full text-sm sm:w-64"
                  aria-label="Recalculer la note avec une recherche"
                  value={listing.search_profile_id ?? ""}
                  onChange={(e) => {
                    const v = e.target.value ? Number(e.target.value) : null;
                    if (v) void onRescore(v);
                  }}
                >
                  <option value="">Noter avec une recherche…</option>
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
        </div>
      )}
    </Card>
  );
}

/** Bandeau des annonces à contacter en priorité (non encore traitées). */
export function PriorityBanner({ count, onShow }: { count: number; onShow: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-accent/35 bg-accent-wash px-4 py-3.5 sm:px-5">
      <div>
        <p className="text-[15px] font-semibold text-accent-ink">
          {count} annonce{count > 1 ? "s" : ""} à contacter en priorité
        </p>
        <p className="text-[15px] text-ink-2">Le message est déjà prêt, il ne reste qu'à l'envoyer.</p>
      </div>
      <Button size="sm" variant="secondary" onClick={onShow}>
        Les afficher en premier
      </Button>
    </div>
  );
}

function ReasonList({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div>
      <h4 className={cn("text-[15px] font-semibold", tone)}>{title}</h4>
      <ul className="mt-2 space-y-1.5 text-[15px] leading-snug text-ink-2">
        {items.map((r, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="text-ink-3">
              ·
            </span>
            <span>{r}</span>
          </li>
        ))}
        {items.length === 0 && <li className="text-ink-3">Aucun</li>}
      </ul>
    </div>
  );
}

function NotesEditor({ listing }: { listing: Listing }) {
  const refresh = useStore((s) => s.refreshListings);
  const [notes, setNotes] = useState(listing.notes ?? "");
  const [saving, setSaving] = useState(false);
  const dirty = notes !== (listing.notes ?? "");
  return (
    <div>
      <Field label="Vos notes">
        <Textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Vos remarques sur ce logement…"
        />
      </Field>
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
            {saving ? "Enregistrement…" : "Enregistrer la note"}
          </Button>
        </div>
      )}
    </div>
  );
}

function CandidaturePanel({
  listing,
  profile,
}: {
  listing: Listing;
  profile: NonNullable<Profile>;
}) {
  const [tone, setTone] = useState<MessageTone>("pro");
  const [message, setMessage] = useState<string>(() => generateMessage(listing, profile, "pro"));
  const [app, setApp] = useState<Application | undefined>(undefined);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [savedLabel, setSavedLabel] = useState("Brouillon enregistré");

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

  const saveDraft = async (label = "Brouillon enregistré") => {
    await upsertApplication({
      listing_id: listing.id,
      message,
      message_tone: tone,
      status: app?.status ?? "prepared",
    });
    setSavedLabel(label);
    setSavedAt(Date.now());
  };

  const copyMessage = async () => {
    await copyToClipboard(message);
    await saveDraft("Message copié");
  };

  // 1 clic : copie le message, enregistre le brouillon et ouvre l'annonce LBC.
  // L'envoi reste HUMAIN (coller + Envoyer) : principe non négociable de Terouva.
  const prepareAndContact = async () => {
    await copyToClipboard(message);
    await saveDraft("Message copié");
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
    setSavedLabel("Candidature marquée comme envoyée");
    setSavedAt(Date.now());
  };

  return (
    <section className="rounded-md border border-rule bg-paper p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-serif text-xl font-medium text-ink">Votre message de candidature</h4>
          <p className="text-[13px] text-ink-3">Recliquez sur un ton pour obtenir une autre formulation.</p>
        </div>
        <div role="group" aria-label="Ton du message" className="flex rounded-md border border-field bg-card p-0.5">
          {(Object.keys(TONE_LABELS) as MessageTone[]).map((t) => (
            <button
              key={t}
              onClick={() => regenerate(t)}
              aria-pressed={tone === t}
              className={cn(
                "rounded px-3 py-1 text-sm transition-colors",
                tone === t ? "bg-ink text-card" : "text-ink-2 hover:text-ink",
              )}
            >
              {TONE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>
      <Textarea
        rows={10}
        aria-label="Message de candidature"
        className="mt-3 bg-card"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          onClick={prepareAndContact}
          title="Copie le message et ouvre l'annonce sur Leboncoin. Il ne reste qu'à coller et cliquer sur « Envoyer »."
        >
          Copier et ouvrir l'annonce
        </Button>
        <Button size="sm" variant="secondary" onClick={copyMessage}>
          Copier le message
        </Button>
        <Button size="sm" variant="ghost" onClick={() => void saveDraft()}>
          Enregistrer le brouillon
        </Button>
        <Button size="sm" variant="ghost" onClick={markSent}>
          Marquer comme envoyée
        </Button>
        {savedAt && (
          <span role="status" className="text-[13px] text-good sm:ml-auto">
            {savedLabel} à {new Date(savedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    </section>
  );
}
