"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { parseWaitlistInput } from "@/lib/waitlist";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  /** `neuf` : l'inscription vient d'avoir lieu (le billet s'ouvre) ; sinon on revient déjà inscrit. */
  | { kind: "done"; adresse: string; neuf: boolean };

/**
 * Mémoire locale « déjà inscrit ». La route répond `ok` pour une adresse déjà
 * présente (voir `app/api/waitlist/route.ts`) : le serveur ne distingue donc
 * pas ce cas, et n'a pas à le faire. C'est ce navigateur qui se souvient
 * qu'il a déjà laissé une adresse, pour ne pas reproposer le formulaire à
 * chaque visite. On n'y garde que l'adresse masquée : de quoi la reconnaître,
 * pas de quoi la lire par-dessus une épaule.
 */
const CLEF = "terouva:inscription";

function masquer(email: string): string {
  const [nom, domaine] = email.split("@");
  if (!nom || !domaine) return email;
  return `${nom.slice(0, 2)}${"•".repeat(Math.max(1, Math.min(nom.length - 2, 6)))}@${domaine}`;
}

function lireMemoire(): string | null {
  try {
    const brut = window.localStorage.getItem(CLEF);
    if (!brut) return null;
    const { adresse } = JSON.parse(brut) as { adresse?: unknown };
    return typeof adresse === "string" ? adresse : null;
  } catch {
    return null;
  }
}

function ecrireMemoire(adresse: string | null) {
  try {
    if (adresse) window.localStorage.setItem(CLEF, JSON.stringify({ adresse }));
    else window.localStorage.removeItem(CLEF);
  } catch {
    // Navigation privée ou stockage bloqué : le formulaire reste utilisable.
  }
}

/**
 * Inscription pour être prévenu du lancement.
 *
 * La seule donnée qui quitte le navigateur sur tout le site. Elle part vers
 * `/api/waitlist`, qui l'enregistre dans le stockage du site. Le champ
 * « website » est un piège à robots : invisible, il doit rester vide.
 *
 * Forme : un guichet. Au pouce, champ et bouton empilés en pleine largeur ;
 * dès 640 px, une seule pilule où le bouton se loge. Cinq états dessinés
 * (`app/styles/arrivee.css`) : saisie, envoi (un filet se trace sous la
 * saisie), erreur (bordure et message reliés au champ), succès (la pilule
 * s'ouvre en billet de place) et déjà inscrit (le même billet, sans le
 * moment). L'adresse est vérifiée ici avec la règle même du serveur
 * (`lib/waitlist.ts`) : une faute de frappe se dit sans aller-retour.
 */
export function WaitlistForm({ className, dark = false }: { className?: string; dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const champ = useRef<HTMLInputElement>(null);
  const billet = useRef<HTMLDivElement>(null);
  const ids = useId();
  const idMessage = `${ids}-message`;

  // Retour d'un visiteur déjà inscrit. Lu après le montage : le serveur ne
  // connaît pas ce navigateur, le premier rendu est donc toujours le guichet.
  useEffect(() => {
    const adresse = lireMemoire();
    if (adresse) setState({ kind: "done", adresse, neuf: false });
  }, []);

  // Le billet prend le focus quand il remplace le formulaire : sans cela, le
  // focus tomberait sur le bouton disparu et le clavier repartirait du haut.
  useEffect(() => {
    if (state.kind === "done" && state.neuf) billet.current?.focus();
  }, [state]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.kind === "sending") return;

    const verif = parseWaitlistInput({ email, website });
    if (verif.kind === "invalid") {
      setState({ kind: "error", message: verif.message });
      champ.current?.focus();
      return;
    }

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && data?.ok) {
        const adresse = masquer(email.trim().toLowerCase());
        ecrireMemoire(adresse);
        setState({ kind: "done", adresse, neuf: true });
        setEmail("");
        return;
      }
      setState({
        kind: "error",
        message: data?.error ?? "L'inscription n'a pas pu être enregistrée.",
      });
    } catch {
      setState({
        kind: "error",
        message: "Connexion impossible. Vérifiez votre réseau et réessayez.",
      });
    }
    champ.current?.focus();
  };

  const reassurance = (
    <p className={cn("champ mt-4", dark ? "text-night-ink-2" : "text-ink-3")}>
      Pas de publicité ·{" "}
      <Link
        href="/confidentialite"
        className="inline-flex min-h-11 items-center underline underline-offset-4 hover:opacity-80"
      >
        Confidentialité
      </Link>
    </p>
  );

  if (state.kind === "done") {
    return (
      <div className={cn("w-full", className)}>
        <div
          ref={billet}
          role="status"
          tabIndex={-1}
          className="billet"
          data-neuf={state.neuf ? "" : undefined}
        >
          <div className="billet-corps">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="billet-coche"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
            </svg>
            <p className="billet-message">
              {/* Trait d'union insécable : « e-mail » ne se coupe pas en fin de ligne. */}
              C&apos;est noté. Vous recevrez un e‑mail quand votre tour arrivera.
            </p>
          </div>
          <div className="billet-talon">
            <span className="champ billet-adresse">{state.adresse}</span>
            <button
              type="button"
              className="billet-autre"
              onClick={() => {
                ecrireMemoire(null);
                setState({ kind: "idle" });
                // Le champ n'existe qu'au rendu suivant.
                requestAnimationFrame(() => champ.current?.focus());
              }}
            >
              Inscrire une autre adresse
            </button>
          </div>
        </div>
        {reassurance}
      </div>
    );
  }

  const enErreur = state.kind === "error";

  return (
    <form onSubmit={submit} className={cn("w-full", className)} noValidate>
      <label
        htmlFor={`${ids}-email`}
        className={cn("champ mb-3 block", dark ? "text-night-ink-2" : "text-ink-3")}
      >
        Votre adresse e-mail
      </label>
      <div
        className="guichet"
        data-etat={state.kind === "sending" ? "envoi" : enErreur ? "erreur" : undefined}
      >
        <span className="guichet-saisie">
          <input
            ref={champ}
            id={`${ids}-email`}
            type="email"
            name="email"
            required
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="send"
            placeholder="vous@exemple.fr"
            value={email}
            aria-invalid={enErreur || undefined}
            aria-describedby={enErreur ? idMessage : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state.kind === "error") setState({ kind: "idle" });
            }}
            className="guichet-champ"
          />
        </span>

        {/* Piège à robots : hors écran et hors tabulation, jamais rempli par un humain. */}
        <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label>
            Ne remplissez pas ce champ
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <button
          type="submit"
          aria-disabled={state.kind === "sending" || undefined}
          className="bouton bouton--accent guichet-bouton shrink-0 aria-disabled:opacity-70"
        >
          {state.kind === "sending" ? "Enregistrement…" : "Me prévenir"}
        </button>
      </div>

      {enErreur && (
        <p id={idMessage} role="alert" className="mt-3 text-[15px] text-bad">
          {state.message}
        </p>
      )}

      {reassurance}
    </form>
  );
}
