"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type State = { kind: "idle" | "sending" | "done" } | { kind: "error"; message: string };

/**
 * Inscription pour être prévenu du lancement.
 *
 * La seule donnée qui quitte le navigateur sur tout le site. Elle part vers
 * `/api/waitlist`, qui la confie à Resend. Le champ « website » est un piège à
 * robots : invisible, il doit rester vide.
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
          "rounded-full px-6 py-4 text-center font-semibold",
          dark ? "bg-night-2 text-night-ink" : "bg-good-wash text-good",
          className,
        )}
      >
        C'est noté. Vous recevrez un e-mail le jour du lancement.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={cn("w-full", className)} noValidate>
      <div
        className={cn(
          "flex flex-col gap-2 rounded-full p-2 sm:flex-row",
          dark ? "bg-night-2" : "card-soft !rounded-full",
        )}
      >
        <label className="flex-1">
          <span className="sr-only">Votre adresse e-mail</span>
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
              "h-12 w-full rounded-full bg-transparent px-5 text-base outline-none",
              dark ? "text-night-ink placeholder:text-night-ink-2" : "text-ink placeholder:text-ink-3",
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
          className="h-12 shrink-0 rounded-full bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-ink disabled:opacity-60"
        >
          {state.kind === "sending" ? "Enregistrement…" : "Me prévenir"}
        </button>
      </div>

      {state.kind === "error" && (
        <p role="alert" className={cn("mt-3 text-[15px]", dark ? "text-accent-wash" : "text-bad")}>
          {state.message}
        </p>
      )}

      <p className={cn("mt-3 text-sm leading-relaxed", dark ? "text-night-ink-2" : "text-ink-3")}>
        Un seul e-mail, au lancement. Pas de publicité.{" "}
        <Link
          href="/confidentialite"
          className="underline underline-offset-4 hover:opacity-80"
        >
          Politique de confidentialité
        </Link>
      </p>
    </form>
  );
}
