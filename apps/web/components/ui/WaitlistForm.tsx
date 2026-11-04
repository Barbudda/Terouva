"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type State = { kind: "idle" | "sending" | "done" } | { kind: "error"; message: string };

/**
 * Inscription pour être prévenu du lancement.
 *
 * La seule donnée qui quitte le navigateur sur tout le site. Elle part vers
 * `/api/waitlist`, qui l'enregistre dans le stockage du site. Le champ
 * « website » est un piège à robots : invisible, il doit rester vide.
 *
 * Forme : un champ unique à filet bas, pas une boîte, et le bouton. Dans le
 * monde nuit, le bouton prend l'accent nuit avec son texte à l'encre (le blanc
 * n'y tiendrait pas le contraste) ; dans le monde papier, l'accent de marque.
 */
export function WaitlistForm({ className, dark = false }: { className?: string; dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.kind === "sending") return;
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && data?.ok) {
        setState({ kind: "done" });
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
  };

  if (state.kind === "done") {
    return (
      <p
        role="status"
        className={cn(
          "border-y py-4 text-[15px] font-medium",
          dark ? "border-night-rule text-night-ink" : "border-rule-fort text-ink",
          className,
        )}
      >
        C&apos;est noté. Vous recevrez un e-mail quand votre tour arrivera.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={cn("w-full", className)} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className={cn("champ block", dark ? "text-night-ink-2" : "text-ink-3")}>
            Votre adresse e-mail
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.fr"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state.kind === "error") setState({ kind: "idle" });
            }}
            className={cn(
              "h-12 w-full border-b bg-transparent text-base outline-none transition-colors duration-150",
              dark
                ? "border-night-ink-2 text-night-ink placeholder:text-night-ink-2 focus:border-blue"
                : "border-rule-fort text-ink placeholder:text-ink-3 focus:border-accent-ink",
            )}
          />
        </label>

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
          disabled={state.kind === "sending"}
          className={cn("bouton shrink-0 disabled:opacity-60", dark ? "bouton--nuit" : "bouton--accent")}
        >
          {state.kind === "sending" ? "Enregistrement…" : "Me prévenir"}
        </button>
      </div>

      {state.kind === "error" && (
        <p role="alert" className={cn("mt-3 text-[15px]", dark ? "text-night-ink" : "text-bad")}>
          {state.message}
        </p>
      )}

      <p className={cn("champ mt-4", dark ? "text-night-ink-2" : "text-ink-3")}>
        Pas de publicité ·{" "}
        <Link href="/confidentialite" className="underline underline-offset-4 hover:opacity-80">
          Confidentialité
        </Link>
      </p>
    </form>
  );
}
