"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { generateMessage, TONE_LABELS, type Listing, type MessageTone, type UserProfile } from "@terouva/core";

/**
 * Générateur de message de candidature, gratuit et sans inscription.
 *
 * C'est le moteur de Terouva, celui de l'application, exécuté dans le
 * navigateur : **rien n'est envoyé nulle part**, il n'y a pas de route serveur
 * derrière cette page. Le formulaire sert aussi de démonstration honnête : ce
 * qu'on voit ici est exactement ce que produit l'outil.
 */
const TONS: MessageTone[] = ["direct", "warm", "pro"];

const SITUATIONS = [
  "salarié en CDI",
  "salariée en CDI",
  "en CDD",
  "en alternance",
  "étudiant",
  "étudiante",
  "indépendant",
  "fonctionnaire",
  "retraité",
];

type Champs = {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  situation: string;
  contrat: string;
  revenu: string;
  garant: string;
  aPlu: string;
};

const VIDE: Champs = {
  prenom: "",
  nom: "",
  telephone: "",
  email: "",
  situation: "",
  contrat: "",
  revenu: "",
  garant: "",
  aPlu: "",
};

/**
 * Le moteur lit la description de l'annonce pour repérer ce qui a plu. Ici on
 * n'a pas l'annonce : on fabrique une description minimale à partir du seul mot
 * choisi par la personne. Aucune autre donnée de l'annonce n'est utilisée, et
 * c'est voulu : un message ne récite pas l'annonce à qui l'a écrite.
 */
const AGREMENTS = [
  { valeur: "", libelle: "Rien de particulier" },
  { valeur: "balcon", libelle: "Le balcon" },
  { valeur: "terrasse", libelle: "La terrasse" },
  { valeur: "lumineux", libelle: "La lumière" },
  { valeur: "calme", libelle: "Le calme" },
  { valeur: "vue dégagée", libelle: "La vue" },
  { valeur: "rénové", libelle: "La rénovation" },
  { valeur: "parquet cachet", libelle: "Le cachet" },
  { valeur: "jardin", libelle: "Le jardin" },
];

export function GenerateurMessage() {
  const [champs, setChamps] = useState<Champs>(VIDE);
  const [ton, setTon] = useState<MessageTone>("direct");
  const [variante, setVariante] = useState(0);
  const [copie, setCopie] = useState(false);

  const set = (cle: keyof Champs) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setChamps((c) => ({ ...c, [cle]: e.target.value }));
    setCopie(false);
  };

  const message = useMemo(() => {
    const profil: UserProfile = {
      id: 1,
      first_name: champs.prenom.trim() || null,
      last_name: champs.nom.trim() || null,
      email: champs.email.trim() || null,
      phone: champs.telephone.trim() || null,
      situation: champs.situation.trim() || null,
      income_monthly: Number(champs.revenu.replace(/[^\d]/g, "")) || null,
      guarantors: champs.garant.trim() || null,
      contract_type: champs.contrat.trim() || null,
      intro_message: null,
      preferred_contact: null,
      created_at: "",
      updated_at: "",
    };

    const annonce = {
      id: 1,
      search_profile_id: null,
      external_id: null,
      source: "outil",
      url: "",
      title: "",
      price: null,
      city: null,
      postal_code: null,
      surface: null,
      rooms: null,
      furnished: null,
      property_type: null,
      description: champs.aPlu,
      images: null,
      publisher_name: null,
      publisher_type: null,
      published_at: null,
      discovered_at: "",
      status: "new",
      score: null,
      score_reasons: null,
      notes: null,
      raw_html: null,
    } as unknown as Listing;

    return generateMessage(annonce, profil, ton, variante);
  }, [champs, ton, variante]);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      setCopie(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <form
        className="card-soft p-6 sm:p-7"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Vos informations"
      >
        <p className="eyebrow">Vos informations</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          Elles ne quittent pas votre navigateur : cette page n&apos;envoie rien, à personne.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Champ label="Prénom" value={champs.prenom} onChange={set("prenom")} placeholder="Camille" />
          <Champ label="Nom" value={champs.nom} onChange={set("nom")} placeholder="Martin" />
          <Champ
            label="Téléphone"
            value={champs.telephone}
            onChange={set("telephone")}
            placeholder="06 12 34 56 78"
            type="tel"
          />
          <Champ
            label="Adresse e-mail"
            value={champs.email}
            onChange={set("email")}
            placeholder="camille@exemple.fr"
            type="email"
            aide="Reprise seulement dans le ton professionnel."
          />

          <Liste
            label="Votre situation"
            value={champs.situation}
            onChange={set("situation")}
            options={SITUATIONS}
            placeholder="Choisissez ou écrivez"
          />
          <Champ
            label="Contrat"
            value={champs.contrat}
            onChange={set("contrat")}
            placeholder="CDI"
            aide="CDI, CDD, alternance, fonctionnaire…"
          />
          <Champ
            label="Revenu net mensuel"
            value={champs.revenu}
            onChange={set("revenu")}
            placeholder="2400"
            inputMode="numeric"
            aide="En euros, sans centimes."
          />
          <Champ
            label="Garant ou garantie"
            value={champs.garant}
            onChange={set("garant")}
            placeholder="garantie Visale"
            aide="« garantie Visale », « mes parents »…"
          />
        </div>

        <div className="mt-5">
          <label className="block">
            <span className="text-[13px] font-semibold text-ink-2">
              Ce qui vous a plu dans l&apos;annonce
            </span>
            <select
              value={champs.aPlu}
              onChange={set("aPlu")}
              className="mt-1.5 h-12 w-full rounded-md border border-field bg-card px-3 text-base text-ink outline-none focus-visible:border-accent"
            >
              {AGREMENTS.map((a) => (
                <option key={a.libelle} value={a.valeur}>
                  {a.libelle}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-1.5 text-[13px] text-ink-3">
            Une seule phrase l&apos;évoquera. Le message ne répète jamais la surface, le prix ni le
            quartier : la personne qui le reçoit a écrit l&apos;annonce.
          </p>
        </div>
      </form>

      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-2">
          {TONS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTon(t);
                setCopie(false);
              }}
              aria-pressed={ton === t}
              className={
                ton === t
                  ? "h-11 rounded-full bg-accent px-4 text-[15px] font-semibold text-white"
                  : "h-11 rounded-full border border-rule bg-card px-4 text-[15px] font-semibold text-ink-2 transition-colors hover:text-ink"
              }
            >
              {TONE_LABELS[t]}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setVariante((v) => (v + 1) % 6);
              setCopie(false);
            }}
            className="ml-auto inline-flex h-11 items-center gap-2 rounded-full border border-rule bg-card px-4 text-[15px] font-semibold text-ink-2 transition-colors hover:text-ink"
          >
            <Rejouer />
            Autre version
          </button>
        </div>

        <output
          className="card-soft mt-4 flex-1 overflow-auto p-6 text-[15px] leading-relaxed whitespace-pre-line text-ink"
          aria-live="polite"
        >
          {message}
        </output>

        <button
          type="button"
          onClick={copier}
          className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-ink"
        >
          {copie ? (
            <Check aria-hidden className="size-4" strokeWidth={2} />
          ) : (
            <Copy aria-hidden className="size-4" strokeWidth={1.75} />
          )}
          {copie ? "Message copié" : "Copier le message"}
        </button>

        <p className="mt-3 text-[13px] leading-relaxed text-ink-3">
          Relisez-le avant de l&apos;envoyer : c&apos;est un brouillon, et c&apos;est vous qui
          écrivez au propriétaire.
        </p>
      </div>
    </div>
  );
}

/** Flèche circulaire, dessinée ici plutôt qu'importée : une icône de plus ne
 *  justifie pas une dépendance, et le trait suit celui du reste du site. */
function Rejouer() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="size-4 text-accent" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 8.5a6.5 6.5 0 1 0 .3 3.2" />
      <path d="M16.8 4.2v4.4h-4.4" />
    </svg>
  );
}

function Champ({
  label,
  aide,
  ...props
}: { label: string; aide?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-ink-2">{label}</span>
      <input
        {...props}
        className="mt-1.5 h-12 w-full rounded-md border border-field bg-card px-3 text-base text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
      />
      {aide && <span className="mt-1.5 block text-[13px] text-ink-3">{aide}</span>}
    </label>
  );
}

/** Champ libre avec des suggestions : on propose sans enfermer. */
function Liste({
  label,
  options,
  ...props
}: { label: string; options: string[] } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `liste-${label.replace(/\s/g, "-")}`;
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-ink-2">{label}</span>
      <input
        {...props}
        list={id}
        className="mt-1.5 h-12 w-full rounded-md border border-field bg-card px-3 text-base text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
      />
      <datalist id={id}>
        {options.map((o) => (
          <option key={o} value={o} />
        ))}
      </datalist>
    </label>
  );
}
