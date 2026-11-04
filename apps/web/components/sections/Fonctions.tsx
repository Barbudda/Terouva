import { FEATURES } from "@/lib/content";
import { ANNONCES } from "@/lib/exemples";
import { cn } from "@/lib/utils";

type Cle = (typeof FEATURES)[number]["icon"];

/**
 * Ce que fait l'outil, en mosaïque (Hugo, 4 novembre : la liste à filets
 * manquait de profondeur). Cinq cartes levées, la première deux fois plus
 * haute : c'est le gain principal, ne plus rater une annonce. Chaque carte
 * montre la chose avant de la dire, avec les annonces de la démonstration.
 *
 * La mention d'état reste, et c'est ce qui rend la liste honnête :
 * « Disponible » marche aujourd'hui, « En démo » se voit dans la
 * démonstration, « Bientôt » attend l'application.
 */
const ETAT: Record<Cle, string> = {
  bell: "Bientôt",
  gauge: "En démo",
  pen: "Disponible",
  send: "En démo",
  lock: "Disponible",
};

const PLACE: Record<Cle, string> = {
  bell: "lg:col-span-3 lg:row-span-2",
  gauge: "lg:col-span-3",
  pen: "lg:col-span-3",
  send: "lg:col-span-3",
  lock: "lg:col-span-3",
};

export function Fonctions() {
  return (
    <section id="fonctions" aria-labelledby="fonctions-titre" className="cadre scroll-mt-20 py-demi-pas">
      <p className="mention">Ce que fait Terouva</p>
      <h2 id="fonctions-titre" className="titre mt-3 text-titre-2 text-ink">
        Moins de recherche, <em className="font-normal italic text-blue-clair">plus de visites.</em>
      </h2>

      <ul className="mt-10 grid gap-5 lg:grid-cols-6">
        {FEATURES.map((f) => (
          <li
            key={f.icon}
            className={cn(
              "carte-levee flex flex-col overflow-hidden rounded-[1.5rem] border border-rule bg-card",
              PLACE[f.icon],
            )}
          >
            <div
              aria-hidden
              className={cn(
                "relative flex flex-1 flex-col justify-center overflow-hidden border-b border-rule bg-[radial-gradient(80%_90%_at_0%_0%,color-mix(in_oklch,var(--color-blue)_16%,transparent),transparent_70%)] p-6",
                f.icon === "bell" ? "min-h-[18rem]" : "min-h-[9.5rem]",
              )}
            >
              <Illustration cle={f.icon} />
            </div>
            <div className="p-6">
              <p className={cn("champ", ETAT[f.icon] === "Bientôt" ? "text-ink-3" : "text-action")}>{ETAT[f.icon]}</p>
              <h3 className="mt-2 text-[19px] leading-snug font-medium text-ink">{f.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Illustration({ cle }: { cle: Cle }) {
  switch (cle) {
    case "bell":
      return <Notifications />;
    case "gauge":
      return <Note />;
    case "pen":
      return <Tons />;
    case "send":
      return <Suivi />;
    case "lock":
      return <Local />;
  }
}

/**
 * Le fil des notifications, la plus récente en haut et en avant ; les plus
 * anciennes reculent et s'estompent. C'est le recul qui donne la profondeur.
 */
function Notifications() {
  const fil = ANNONCES.slice(0, 3);
  return (
    <div className="mx-auto flex h-full max-w-[28rem] flex-col justify-center gap-3">
      <p className="champ text-ink-3">Aujourd&apos;hui</p>
      {fil.map((a, i) => (
        <div
          key={a.titre}
          className={cn(
            "rounded-[1rem] border border-rule-fort bg-paper-2/95 p-4 backdrop-blur-sm",
            i === 0 && "shadow-[0_20px_40px_-18px_rgb(0_0_0/0.85)] ring-1 ring-blue-clair/30",
            i === 1 && "scale-[0.97] opacity-75",
            i === 2 && "scale-[0.94] opacity-45",
          )}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue text-[13px] font-semibold text-white">T</span>
            <div className="min-w-0 flex-1">
              <p className="flex items-baseline justify-between gap-2 text-[13px] text-ink">
                <span className="font-medium">Terouva · nouvelle annonce</span>
                <span className="champ shrink-0 text-ink-3">{a.publie.replace("il y a ", "")}</span>
              </p>
              <p className="truncate text-[13px] text-ink-2">
                {a.titre} · {a.prix} €
              </p>
            </div>
            <span className="font-mono text-[15px] text-action tabular-nums">{a.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Note() {
  const a = ANNONCES[0];
  const rayon = 22;
  const perimetre = 2 * Math.PI * rayon;
  return (
    <div className="flex items-center gap-5">
      <div className="relative size-16 shrink-0">
        <svg viewBox="0 0 56 56" className="size-full -rotate-90">
          <circle cx="28" cy="28" r={rayon} fill="none" stroke="var(--color-rule-fort)" strokeWidth="3" />
          <circle
            cx="28"
            cy="28"
            r={rayon}
            fill="none"
            stroke="var(--color-action)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={perimetre}
            strokeDashoffset={perimetre * (1 - a.note / 100)}
          />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center font-mono text-lg text-ink tabular-nums">{a.note}</p>
      </div>
      <div className="min-w-0 space-y-1.5 text-[13px] leading-snug text-ink-2">
        <p className="truncate font-medium text-ink">{a.titre}</p>
        <p>
          <span className="champ mr-1.5 text-blue-clair">Pour</span>
          {a.pour}
        </p>
      </div>
    </div>
  );
}

function Tons() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["Direct", "Chaleureux", "Professionnel"].map((t, i) => (
          <span
            key={t}
            className={cn(
              "champ rounded-full border px-3 py-1",
              i === 0 ? "border-blue-clair text-blue-clair" : "border-rule-fort text-ink-3",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
        Bonjour, votre annonce m&apos;intéresse beaucoup, en particulier pour le balcon. Je suis
        infirmière en CDI…
      </p>
    </div>
  );
}

function Suivi() {
  const lignes = [
    { titre: ANNONCES[0].titre, pas: 3 },
    { titre: ANNONCES[1].titre, pas: 2 },
    { titre: ANNONCES[2].titre, pas: 1 },
  ];
  return (
    <ul className="space-y-3">
      {lignes.map((l) => (
        <li key={l.titre} className="flex items-center gap-4">
          <span className="min-w-0 flex-1 truncate text-[13px] text-ink-2">{l.titre}</span>
          <span className="flex shrink-0 gap-1">
            {[1, 2, 3].map((n) => (
              <span key={n} className={cn("h-1.5 w-7 rounded-full", n <= l.pas ? "bg-action" : "bg-rule-fort")} />
            ))}
          </span>
        </li>
      ))}
      <li className="champ flex justify-end gap-3 text-ink-3">
        <span>Envoyée</span>
        <span>Réponse</span>
        <span>Visite</span>
      </li>
    </ul>
  );
}

function Local() {
  return (
    <div className="flex items-center gap-4">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-rule-fort bg-paper-2 text-blue-clair">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7">
          <rect x="5" y="10.5" width="14" height="10" rx="2" />
          <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
        </svg>
      </span>
      <div className="flex flex-wrap gap-2">
        {["Sur votre ordinateur", "Aucun compte", "Aucune publicité"].map((t) => (
          <span key={t} className="champ rounded-full border border-rule-fort px-3 py-1 text-ink-2">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
