"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Printer } from "lucide-react";
import {
  compterPieces,
  dossierEnTexte,
  dossierRequis,
  GARANTIES,
  LOGEMENTS,
  SITUATIONS,
  type Categorie,
  type Garantie,
  type Logement,
  type Situation,
} from "@terouva/core";

/**
 * Checklist de dossier de location, adaptée à la situation.
 *
 * Tout est calculé dans le navigateur, à partir du décret du 5 novembre 2015 :
 * cette page n'envoie rien et ne garde rien. Les trois questions suffisent,
 * parce que ce sont les trois seules choses dont dépend la liste.
 *
 * L'outil vit dans le monde nuit : libellés en `.champ`, compte en monospace,
 * choix marqués par un filet, un seul bouton coloré. À l'impression, la bande
 * redevient claire (voir `globals.css`).
 */
export function ListeDossier() {
  const [situation, setSituation] = useState<Situation>("salarie");
  const [logement, setLogement] = useState<Logement>("locataire");
  const [garantie, setGarantie] = useState<Garantie>("personne");
  const [copie, setCopie] = useState(false);

  const dossier = useMemo(
    () => dossierRequis({ situation, logement, garantie }),
    [situation, logement, garantie],
  );

  // Les variantes ne comptent pas : on fournit l'une ou l'autre.
  const total = compterPieces(dossier.vous) + compterPieces(dossier.garant);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(dossierEnTexte(dossier));
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      setCopie(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-12">
      <form
        className="h-fit border border-night-rule bg-night-2 p-6 lg:sticky lg:top-20"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Votre situation"
      >
        <p className="champ text-night-ink-2">Votre situation</p>
        <p className="mt-3 text-[15px] leading-relaxed text-night-ink-2">
          Trois questions. Rien n&apos;est envoyé, rien n&apos;est conservé.
        </p>

        <Choix
          legende="Vous êtes"
          valeur={situation}
          options={SITUATIONS}
          onChange={(v) => setSituation(v as Situation)}
        />
        <Choix
          legende="Aujourd'hui"
          valeur={logement}
          options={LOGEMENTS}
          onChange={(v) => setLogement(v as Logement)}
        />
        <Choix
          legende="Vous avez"
          valeur={garantie}
          options={GARANTIES}
          onChange={(v) => setGarantie(v as Garantie)}
        />
      </form>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            {/* Vrai titre de niveau 2 : sans lui la page sautait de H1 à H3,
                ce qui désoriente un lecteur d'écran. */}
            <h2 className="champ text-night-ink-2">Votre dossier</h2>
            <p className="mt-2 font-mono text-[2rem] leading-none tabular-nums text-night-ink">
              {total} <span className="text-base text-night-ink-2">{total > 1 ? "pièces" : "pièce"}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 print:hidden">
            <button type="button" onClick={copier} className="bouton bouton--nuit h-11 gap-2 px-5">
              {copie ? (
                <Check aria-hidden className="size-4" strokeWidth={2} />
              ) : (
                <Copy aria-hidden className="size-4" strokeWidth={1.75} />
              )}
              {copie ? "Liste copiée" : "Copier la liste"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="bouton h-11 gap-2 border border-night-rule px-5 text-night-ink-2 hover:bg-night-2 hover:text-night-ink"
            >
              <Printer aria-hidden className="size-4" strokeWidth={1.5} />
              Imprimer
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {dossier.vous.map((c) => (
            <Bloc key={c.titre} categorie={c} />
          ))}
        </div>

        {dossier.garant.length > 0 && (
          <>
            <h2 className="mt-12 text-[1.25rem] font-medium text-night-ink">Et pour votre garant</h2>
            <div className="mt-6 space-y-8">
              {dossier.garant.map((c) => (
                <Bloc key={c.titre} categorie={c} />
              ))}
            </div>
          </>
        )}

        {dossier.note && (
          <p className="mt-10 border-t border-night-rule pt-4 text-[15px] leading-relaxed text-night-ink-2">
            {dossier.note}{" "}
            {garantie !== "personne" && (
              <Link href="/guides/garantie-visale" className="lien">
                Comment obtenir la garantie Visale
              </Link>
            )}
          </p>
        )}

        <section className="mt-12 border border-night-rule p-6 sm:p-7">
          <h2 className="text-[1.25rem] font-medium text-night-ink">
            Ce qu&apos;on ne peut pas vous demander
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-night-ink-2">
            La liste des pièces autorisées est limitative : tout ce qui n&apos;y figure pas est
            interdit. Ceux-ci sont nommés par la loi, parce qu&apos;ils étaient réclamés couramment.
          </p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {dossier.interdits.map((i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-snug text-night-ink-2">
                <Croix />
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] leading-relaxed text-night-ink-2">
            Une demande hors liste expose le propriétaire à une amende pouvant atteindre 3 000 €,
            et 15 000 € s&apos;il s&apos;agit d&apos;une agence.{" "}
            <Link href="/guides/dossier-de-location" className="lien">
              Comment refuser sans perdre le logement
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

function Bloc({ categorie }: { categorie: Categorie }) {
  return (
    <section className="border-t border-night-rule pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[15px] font-medium text-night-ink">{categorie.titre}</h3>
        <p className="champ text-night-ink-2">{categorie.regle}</p>
      </div>
      <ul className="mt-4 space-y-4">
        {categorie.pieces.map((p) => (
          <li key={p.libelle} className={p.alternative ? "flex items-start gap-3 pl-7" : "flex items-start gap-3"}>
            {!p.alternative && (
              <span aria-hidden className="mt-1 size-4 shrink-0 border border-night-ink-2" />
            )}
            <span>
              <span className={p.alternative ? "text-night-ink-2" : "font-medium text-night-ink"}>
                {p.libelle}
              </span>
              {p.precision && (
                <span className="mt-1 block text-[14px] leading-relaxed text-night-ink-2">
                  {p.precision}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Croix() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className="mt-1 size-3.5 shrink-0 text-night-ink-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/** Groupe de boutons radio, dessinés comme des lignes à filet. */
function Choix({
  legende,
  valeur,
  options,
  onChange,
}: {
  legende: string;
  valeur: string;
  options: ReadonlyArray<{ valeur: string; libelle: string }>;
  onChange: (v: string) => void;
}) {
  const nom = legende.replace(/\s/g, "-").toLowerCase();
  return (
    <fieldset className="mt-7">
      <legend className="champ text-night-ink-2">{legende}</legend>
      <div className="mt-2.5 border-t border-night-rule">
        {options.map((o) => (
          <label
            key={o.valeur}
            className={
              valeur === o.valeur
                ? "flex cursor-pointer items-center gap-3 border-b border-night-rule py-2.5 text-[15px] font-medium text-night-ink"
                : "flex cursor-pointer items-center gap-3 border-b border-night-rule py-2.5 text-[15px] text-night-ink-2 transition-colors duration-150 hover:text-night-ink"
            }
          >
            <input
              type="radio"
              name={nom}
              value={o.valeur}
              checked={valeur === o.valeur}
              onChange={() => onChange(o.valeur)}
              className="size-4 accent-night-accent"
            />
            {o.libelle}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
