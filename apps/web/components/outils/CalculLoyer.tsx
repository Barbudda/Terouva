"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import {
  calculerLoyer,
  formatEuros,
  lireMontant,
  LOYER_MAX,
  PROFILS,
  RESSOURCES_MAX,
  resumeEnTexte,
  ZONES,
  ZONES_VISALE,
  type ProfilVisale,
  type Resultat,
  type ZoneVisale,
} from "@/lib/loyer";

const SAISIE =
  "mt-1.5 h-11 w-full border-b border-night-ink-2 bg-transparent font-mono text-base tabular-nums text-night-ink outline-none transition-colors duration-150 placeholder:text-night-ink-2 focus:border-night-accent aria-[invalid=true]:border-night-accent";

/**
 * Calculateur « quel salaire pour quel loyer ».
 *
 * Une seule grille de champs pour les deux sens : on remplit le loyer, les
 * ressources, ou les deux, et le résultat s'adapte. Un bouton « sens du
 * calcul » ajoutait une question sans rien apprendre de plus.
 *
 * Tout tourne ici, dans le navigateur, avec `lib/loyer.ts` : aucune requête,
 * aucun stockage. Même monde nuit que les deux autres outils : libellés en
 * `.champ`, chiffres en monospace, un seul bouton coloré. Le loyer est
 * prérempli à 700 € pour que la page réponde dès l'arrivée, à la question
 * que l'autocomplétion pose le plus.
 */
export function CalculLoyer() {
  const [loyer, setLoyer] = useState("700");
  const [ressources, setRessources] = useState("");
  const [aides, setAides] = useState("");
  const [garant, setGarant] = useState("");
  const [profil, setProfil] = useState<ProfilVisale>("autre");
  const [zone, setZone] = useState<ZoneVisale>("region-1575");
  const [copie, setCopie] = useState(false);

  const saisies = {
    loyer: lireMontant(loyer, LOYER_MAX),
    ressources: lireMontant(ressources, RESSOURCES_MAX),
    aides: lireMontant(aides, RESSOURCES_MAX),
    garant: lireMontant(garant, RESSOURCES_MAX),
  };

  const entrees = {
    loyer: saisies.loyer.valeur,
    ressources: saisies.ressources.valeur,
    aides: saisies.aides.valeur,
    ressourcesGarant: saisies.garant.valeur,
    zone,
    profil,
  };
  // Quelques multiplications : pas de mémoïsation à entretenir.
  const r = calculerLoyer(entrees);
  const texte = resumeEnTexte(entrees, r);

  const modifie = (set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    set(e.target.value);
    setCopie(false);
  };

  const copier = async () => {
    if (!texte) return;
    try {
      await navigator.clipboard.writeText(texte);
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
        aria-label="Votre loyer et vos ressources"
      >
        <p className="champ text-night-ink-2">Vos montants</p>
        <p className="mt-3 text-[15px] leading-relaxed text-night-ink-2">
          Le loyer, vos ressources, ou les deux. Rien n&apos;est envoyé, rien n&apos;est conservé.
        </p>

        <div className="mt-6 space-y-6">
          <Montant
            label="Loyer charges comprises"
            aide="Par mois, tel qu'affiché dans l'annonce."
            valeur={loyer}
            onChange={modifie(setLoyer)}
            erreur={saisies.loyer.erreur}
          />
          <Montant
            label="Vos ressources nettes"
            aide="Par mois : salaire, pension, bourse, indemnités. En colocation, additionnez celles de chacun."
            valeur={ressources}
            onChange={modifie(setRessources)}
            erreur={saisies.ressources.erreur}
          />
          <Montant
            label="Aides au logement (facultatif)"
            aide="Le montant de votre simulation Caf ou MSA. Comptées à part."
            valeur={aides}
            onChange={modifie(setAides)}
            erreur={saisies.aides.erreur}
          />
          <Montant
            label="Ressources du garant (facultatif)"
            aide="Nettes, par mois."
            valeur={garant}
            onChange={modifie(setGarant)}
            erreur={saisies.garant.erreur}
          />
        </div>

        <Choix legende="Pour Visale, vous êtes" valeur={profil} options={PROFILS} onChange={(v) => setProfil(v as ProfilVisale)} />
        <Choix legende="Le logement est en" valeur={zone} options={ZONES} onChange={(v) => setZone(v as ZoneVisale)} />
        <p className="mt-3 text-[13px] leading-relaxed text-night-ink-2">
          En région, le plafond dépend de la commune : le{" "}
          <a href="https://www.visale.fr/" className="lien" rel="noopener" target="_blank">
            simulateur Visale
          </a>{" "}
          vous le donne.
        </p>
      </form>

      <div aria-live="polite">
        <Chiffre r={r} />

        <section className="mt-10 border-t border-night-rule pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="text-[15px] font-medium text-night-ink">Le repère des « trois fois le loyer »</h2>
            <p className="champ text-night-ink-2">Pratique courante, aucun texte</p>
          </div>
          <p className="mt-4 leading-relaxed text-night-ink-2">{phraseRepere(r)}</p>
          {r.tauxAvecAides !== null && (
            <p className="mt-3 text-[15px] leading-relaxed text-night-ink-2">
              Si le propriétaire compte vos aides au logement, le taux d&apos;effort descend à{" "}
              <span className="font-mono text-night-ink">{r.tauxAvecAides} %</span>. Il est libre de
              les compter ou non : posez-lui la question.
            </p>
          )}
          {r.garant && (
            <p className="mt-3 text-[15px] leading-relaxed text-night-ink-2">
              {r.garant.manque === 0
                ? `Votre garant atteint le même repère (${formatEuros(r.garant.attendu)} par mois).`
                : `Il manque ${formatEuros(r.garant.manque)} par mois à votre garant pour le même repère (${formatEuros(r.garant.attendu)}).`}
            </p>
          )}
        </section>

        <section className="mt-8 border-t border-night-rule pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="text-[15px] font-medium text-night-ink">La garantie Visale</h2>
            <p className="champ text-night-ink-2">Règle publiée, service-public</p>
          </div>
          <p className="mt-4 leading-relaxed text-night-ink-2">{phraseVisale(r, zone)}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-night-ink-2">
            Visale dépend aussi de votre âge et de votre situation : 30 ans et moins, ou salarié
            au-delà sous conditions.{" "}
            <Link href="/guides/garantie-visale" className="lien">
              Qui peut l&apos;obtenir
            </Link>
          </p>
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copier}
            disabled={!texte}
            className="bouton bouton--nuit h-11 gap-2 px-5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copie ? (
              <Check aria-hidden className="size-4" strokeWidth={2} />
            ) : (
              <Copy aria-hidden className="size-4" strokeWidth={1.75} />
            )}
            {copie ? "Phrase copiée" : "Copier pour mon dossier"}
          </button>
          <Link
            href="/outils/message-de-candidature"
            className="bouton h-11 border border-night-rule px-5 text-night-ink-2 hover:bg-night-2 hover:text-night-ink"
          >
            Écrire le message de candidature
          </Link>
        </div>
        {texte ? (
          <p className="mt-4 border-l border-night-rule pl-4 text-[14px] leading-relaxed text-night-ink-2">
            {texte}
          </p>
        ) : (
          <p className="mt-4 text-[14px] text-night-ink-2">
            Indiquez le loyer et vos ressources pour obtenir la phrase à glisser dans votre dossier.
          </p>
        )}
      </div>
    </div>
  );
}

/** Le chiffre principal change selon ce qui est saisi : c'est la réponse à la question posée. */
function Chiffre({ r }: { r: Resultat }) {
  let titre = "Votre résultat";
  let valeur: string | null = null;
  let legende = "Indiquez un loyer, vos ressources, ou les deux.";

  if (r.tauxEffort !== null) {
    titre = "Votre taux d'effort";
    valeur = `${r.tauxEffort} %`;
    legende = "La part de vos ressources qui partirait dans le loyer.";
  } else if (r.ressourcesAttendues !== null) {
    titre = "Ressources attendues";
    valeur = formatEuros(r.ressourcesAttendues);
    legende = "Nettes, par mois, pour un propriétaire qui applique les trois fois le loyer.";
  } else if (r.loyerRepere !== null) {
    titre = "Loyer qui tient le repère";
    valeur = formatEuros(r.loyerRepere);
    legende = "Charges comprises, par mois, pour vos ressources.";
  }

  return (
    <div>
      <h2 className="champ text-night-ink-2">{titre}</h2>
      {valeur && (
        <p className="mt-2 font-mono text-[2.5rem] leading-none tabular-nums text-night-ink">{valeur}</p>
      )}
      <p className="mt-3 text-[15px] leading-relaxed text-night-ink-2">{legende}</p>
    </div>
  );
}

function phraseRepere(r: Resultat): string {
  if (r.ressourcesAttendues !== null && r.manqueRepere !== null) {
    return r.manqueRepere === 0
      ? `Vos ressources atteignent le repère : ${formatEuros(r.ressourcesAttendues)} par mois pour ce loyer.`
      : `Il vous manque ${formatEuros(r.manqueRepere)} par mois pour atteindre ${formatEuros(r.ressourcesAttendues)}. Un garant, Visale ou une colocation peuvent compenser.`;
  }
  if (r.ressourcesAttendues !== null) {
    return `Un propriétaire qui applique ce repère attend ${formatEuros(r.ressourcesAttendues)} nets par mois. Aucun texte ne l'impose : certains demandent moins, d'autres plus.`;
  }
  if (r.loyerRepere !== null) {
    return `Avec ces ressources, le repère vous mène à un loyer de ${formatEuros(r.loyerRepere)} charges comprises au plus.`;
  }
  return "Aucun texte n'impose de gagner trois fois le loyer, mais beaucoup de propriétaires s'en servent pour trier les dossiers.";
}

function phraseVisale(r: Resultat, zone: ZoneVisale): string {
  const z = ZONES_VISALE[zone];
  const v = r.visale;
  switch (v.statut) {
    case "hors-plafond":
      return `Dans cette zone, Visale ne couvre pas un loyer au-delà de ${formatEuros(v.plafond)}.`;
    case "sans-condition":
      return `Étudiant ou alternant : jusqu'à ${formatEuros(v.seuil)} de loyer, Visale n'exige aucune condition de ressources.`;
    case "accordable":
      return v.remplie
        ? `Le loyer est sous le plafond de ${formatEuros(z.plafond)}, et la condition est remplie : ${v.condition}.`
        : `Le loyer est sous le plafond de ${formatEuros(z.plafond)}. Condition : ${v.condition}.`;
    case "ressources-insuffisantes":
      return `Le loyer est sous le plafond, mais il manque ${formatEuros(v.manque)} par mois pour la condition : ${v.condition}.`;
    case "a-completer":
      return r.loyerVisale !== null
        ? `Avec ces ressources, Visale couvre un loyer jusqu'à ${formatEuros(r.loyerVisale)}, plafond de la zone compris.`
        : `Dans cette zone, Visale couvre un loyer jusqu'à ${formatEuros(z.plafond)}.`;
  }
}

function Montant({
  label,
  aide,
  valeur,
  onChange,
  erreur,
}: {
  label: string;
  aide: string;
  valeur: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  erreur: string | null;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="champ text-night-ink-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={valeur}
          onChange={onChange}
          placeholder="0"
          aria-invalid={erreur ? true : undefined}
          aria-describedby={`${id}-aide`}
          className={`${SAISIE} pr-8`}
        />
        <span aria-hidden className="absolute bottom-3 right-0 font-mono text-night-ink-2">
          €
        </span>
      </div>
      <p id={`${id}-aide`} className="mt-1.5 text-[13px] leading-snug text-night-ink-2">
        {erreur ? <span className="text-night-ink">{erreur}</span> : aide}
      </p>
    </div>
  );
}

/** Groupe de boutons radio dessinés comme des lignes à filet, comme la checklist de dossier. */
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
  const nom = useId();
  return (
    <fieldset className="mt-7">
      <legend className="champ text-night-ink-2">{legende}</legend>
      <div className="mt-2.5 border-t border-night-rule">
        {options.map((o) => (
          <label
            key={o.valeur}
            className={
              valeur === o.valeur
                ? "flex min-h-11 cursor-pointer items-center gap-3 border-b border-night-rule py-2.5 text-[15px] font-medium text-night-ink"
                : "flex min-h-11 cursor-pointer items-center gap-3 border-b border-night-rule py-2.5 text-[15px] text-night-ink-2 transition-colors duration-150 hover:text-night-ink"
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
