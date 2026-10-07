import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LogoMark } from "@/components/ui/Logo";
import { Button } from "@app/components/ui/Button";
import { Textarea } from "@app/components/ui/Input";
import { formatPrice } from "@app/components/listing/format";
import { getDemoListing } from "@app/lib/demo";
import { getApplicationByListing, updateListingStatus, upsertApplication } from "@app/lib/db";
import type { Listing } from "@app/types";

/**
 * Page d'annonce d'exemple, utilisée par la démonstration pour montrer le
 * dernier geste : coller le message préparé, puis cliquer sur « Envoyer ».
 *
 * Volontairement neutre : elle n'imite aucun site existant, le dit en haut de
 * page, et n'envoie évidemment rien à personne.
 */
export default function ExempleAnnonce() {
  const { n } = useParams<{ n: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    void getDemoListing(Number(n ?? 0)).then((l) => {
      setListing(l);
      setLoaded(true);
    });
  }, [n]);

  const facts = listing
    ? [
        listing.price !== null ? formatPrice(listing.price) : null,
        listing.surface !== null ? `${listing.surface} m²` : null,
        listing.rooms !== null ? `${listing.rooms} pièce${listing.rooms > 1 ? "s" : ""}` : null,
        listing.city,
      ].filter(Boolean)
    : [];

  return (
    <div className="app-root app-scroll h-dvh overflow-y-auto bg-paper text-ink">
      <div className="border-b border-warn/40 bg-warn-wash">
        <p className="mx-auto max-w-3xl px-4 py-2.5 text-[15px] text-ink-2 sm:px-6">
          <span className="font-semibold text-warn">Page d'exemple.</span> Elle sert à montrer le
          dernier geste. Ce n'est pas un vrai site d'annonces, et rien n'est envoyé à personne.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {!loaded && (
          <p role="status" className="text-[15px] text-ink-3">
            Chargement…
          </p>
        )}

        {loaded && !listing && (
          <div className="rounded-md border border-dashed border-field px-6 py-12 text-center">
            <p className="font-serif text-2xl font-medium">Cette annonce d'exemple n'existe plus</p>
            <p className="mt-2 text-[15px] text-ink-2">
              La démonstration a sans doute été effacée.
            </p>
            <Link
              to="/"
              className="mt-5 inline-block text-[15px] text-ink underline decoration-field underline-offset-4 hover:decoration-ink"
            >
              Revenir à Terouva
            </Link>
          </div>
        )}

        {listing && (
          <>
            <article className="rounded-md border border-rule bg-card p-5 sm:p-7">
              <h1 className="font-serif text-3xl font-medium leading-tight">{listing.title}</h1>
              <p className="mt-2 text-lg text-ink-2 tabular">{facts.join(" · ")}</p>
              <p className="mt-1 text-[15px] text-ink-3">{listing.publisher_type}</p>
              {listing.description && (
                <p className="mt-5 max-w-prose leading-relaxed text-ink-2">{listing.description}</p>
              )}
            </article>

            <section className="mt-6 rounded-md border border-rule bg-card p-5 sm:p-7">
              <h2 className="font-serif text-2xl font-medium">Contacter l'annonceur</h2>
              {sent ? (
                <div className="mt-4 rounded-md bg-good-wash px-4 py-5 text-center">
                  <p className="text-[17px] font-semibold text-good">Message envoyé, pour de faux.</p>
                  <p className="mt-1 text-[15px] text-ink-2">
                    Dans la vraie vie, c'est exactement là que votre candidature part, et c'est vous
                    qui appuyez sur le bouton.
                  </p>
                  <Link
                    to="/"
                    className="mt-4 inline-block text-[15px] text-ink underline decoration-field underline-offset-4 hover:decoration-ink"
                  >
                    Revenir à Terouva
                  </Link>
                </div>
              ) : (
                <>
                  <p className="mt-1 text-[15px] text-ink-2">
                    Votre message est déjà dans le presse-papiers : collez-le avec Ctrl + V (Cmd + V
                    sur Mac), puis envoyez.
                  </p>
                  <Textarea
                    rows={9}
                    className="mt-4"
                    aria-label="Votre message"
                    placeholder="Collez votre message ici"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setHint(null);
                    }}
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Button
                      onClick={async () => {
                        if (!message.trim()) {
                          setHint("Collez d'abord votre message avec Ctrl + V (Cmd + V sur Mac).");
                          return;
                        }
                        setSent(true);
                        // Comme dans la vraie vie : la candidature passe en
                        // « envoyée » et se retrouve dans « Mes candidatures ».
                        const existing = await getApplicationByListing(listing.id);
                        await upsertApplication({
                          listing_id: listing.id,
                          message,
                          message_tone: existing?.message_tone ?? "pro",
                          status: "sent",
                          sent_at: new Date().toISOString(),
                        });
                        await updateListingStatus(listing.id, "applied");
                      }}
                    >
                      Envoyer le message
                    </Button>
                    {hint && (
                      <span role="status" className="text-[15px] text-warn">
                        {hint}
                      </span>
                    )}
                  </div>
                </>
              )}
            </section>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 text-[15px] text-ink-2 hover:text-ink"
            >
              <LogoMark className="size-5" />
              Revenir à Terouva
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
