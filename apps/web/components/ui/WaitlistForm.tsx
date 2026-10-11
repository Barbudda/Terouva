"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type State = { kind: "idle" | "sending" | "done" } | { kind: "error"; message: string };

/**
 * Inscription pour être prévenu du lancement.
 *
 * La seule donnée qui quitte le navigateur sur tout le site, et elle part vers
 * notre route `/api/waitlist`, qui la confie à Resend. Le champ « website » est
 * un piège à robots : invisible, il doit rester vide.
 */
export function WaitlistForm({ className }: { className?: string }) {
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
      <p role="status" className={cn("rounded-md bg-good-wash px-4 py-3 text-base text-good", className)}>
        C'est noté. Vous recevrez un e-mail dès que Terouva sera téléchargeable.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={cn("w-full", className)} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
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
            className="h-12 w-full rounded-md border border-field bg-card px-4 text-base text-ink placeholder:text-ink-3 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none"
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
          className="h-12 shrink-0 rounded-md bg-accent px-6 text-base font-medium text-card transition-colors hover:bg-accent-ink disabled:opacity-60"
        >
          {state.kind === "sending" ? "Enregistrement…" : "Me prévenir du lancement"}
        </button>
      </div>

      {state.kind === "error" && (
        <p role="alert" className="mt-2 text-[15px] text-bad">
          {state.message}
        </p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-ink-3">
        Votre adresse sert uniquement à vous prévenir du lancement. Pas de publicité, et vous
        pouvez demander sa suppression à tout moment.{" "}
        <Link href="/confidentialite" className="underline decoration-field underline-offset-4 hover:text-ink-2">
          Politique de confidentialité
        </Link>
      </p>
    </form>
  );
}
