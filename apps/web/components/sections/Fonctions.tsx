"use client";

import { useEffect, useState } from "react";
import { FEATURES } from "@/lib/content";
import { ANNONCES } from "@/lib/exemples";
import { useEnVue } from "@/components/ui/useEnVue";
import { cn } from "@/lib/utils";

type Cle = (typeof FEATURES)[number]["icon"];

/**
 * Ce que fait l'outil : le moment « produit » de l'accueil (pôle Design,
 * 5 novembre). Jusqu'ici, cinq cartes levées au même grain que le reste de la
 * page ; désormais une seule plaque d'instrument dont les cinq fonctions sont
 * les modules, séparés par des filets d'un pixel. Une seule matière, un seul
 * objet : on lit une machine, pas une grille de cartes.
 *
 * Ce qui vit : l'heure du bandeau, et le fil des annonces où une nouvelle
 * arrive en tête et pousse les autres (le seul geste en boucle de la section).
 * Ce qui se remplit une fois, en descendant : le cadran compte jusqu'à la note,
 * les barres du suivi avancent. Les données sont celles de la démonstration
 * (`lib/exemples.ts`), rien n'est inventé pour l'effet.
 *
 * La mention d'état dit quand le visiteur en profite, dans ses mots (pôle
 * Commerce, 4 novembre) : c'est ce qui rend la liste honnête.
 */
const ETAT: Record<Cle, string> = {
  bell: "Après l'ouverture",
  gauge: "À l'ouverture",
  pen: "Gratuit aujourd'hui",
  send: "À l'ouverture",
  lock: "Dès aujourd'hui",
};

/** Le fil prend deux rangées à gauche ; les quatre autres modules se rangent à droite. */
const PLACE: Record<Cle, string> = {
  bell: "lg:col-span-3 lg:row-span-2",
  gauge: "lg:col-span-3",
  pen: "lg:col-span-3",
  send: "lg:col-span-3",
  lock: "lg:col-span-3",
};

type Etat = "attente" | "joue" | "fixe";

export function Fonctions() {
  const { ref, vu, direct } = useEnVue<HTMLDivElement>();
  const [monte, setMonte] = useState(false);
  useEffect(() => setMonte(true), []);

  // Sans JavaScript (et au rendu serveur), aucun attribut : tout est à son
  // état final. Après montage, la plaque attend hors de l'écran, joue en
  // entrant par le bas, ou se montre finie si l'on remonte (règle du 1er nov.).
  const etat: Etat | undefined = !monte ? undefined : !vu ? "attente" : direct ? "fixe" : "joue";

  return (
    <section id="fonctions" aria-labelledby="fonctions-titre" className="cadre scroll-mt-20 py-demi-pas">
      <p className="mention">Ce que fait Terouva</p>
      <h2 id="fonctions-titre" className="titre mt-3 text-titre-2 text-ink">
        Moins de recherche, <em className="font-normal italic text-blue-clair">plus de visites.</em>
      </h2>

      <div ref={ref} data-etat={etat} className="instrument mt-10">
        <Bandeau actif={vu} />
        <ul className="instrument-grille grid grid-cols-1 lg:grid-cols-6">
          {FEATURES.map((f) => (
            <li key={f.icon} className={cn("instrument-module flex min-w-0 flex-col", PLACE[f.icon])}>
              <div
                aria-hidden
                className={cn(
                  "relative flex flex-1 flex-col justify-center overflow-hidden p-5 sm:p-6",
                  f.icon === "bell" ? "instrument-scene min-h-[19rem]" : "min-h-[9rem]",
                )}
              >
                <Illustration cle={f.icon} etat={etat} />
              </div>
              <div className="border-t border-rule px-5 pt-5 pb-6 sm:px-6">
                <p className={cn("champ flex items-center gap-2", ETAT[f.icon] === "Après l'ouverture" ? "text-ink-3" : "text-action")}>
                  <span aria-hidden className="instrument-voyant" />
                  {ETAT[f.icon]}
                </p>
                <h3 className="mt-2 text-[19px] leading-snug font-medium text-ink">{f.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Le bandeau de la plaque : un voyant, l'heure qui tourne, des graduations.
 * L'heure ne s'affiche qu'après montage, pour que le rendu serveur et le
 * client disent la même chose ; elle ne tourne que si la plaque est à l'écran.
 */
function Bandeau({ actif }: { actif: boolean }) {
  const [heure, setHeure] = useState<string | null>(null);
  useEffect(() => {
    const maj = () => setHeure(new Date().toLocaleTimeString("fr-FR"));
    maj();
    if (!actif) return;
    const t = window.setInterval(maj, 1000);
    return () => window.clearInterval(t);
  }, [actif]);

  return (
    <div aria-hidden className="instrument-bandeau flex items-center gap-4 px-5 sm:px-6">
      <span className="instrument-veille" />
      <span className="champ w-[8ch] text-ink-2 tabular-nums">{heure ?? "--:--:--"}</span>
      <span className="instrument-graduations h-3 flex-1" />
    </div>
  );
}

function Illustration({ cle, etat }: { cle: Cle; etat?: Etat }) {
  switch (cle) {
    case "bell":
      return <Fil />;
    case "gauge":
      return <Cadran etat={etat} />;
    case "pen":
      return <Tons />;
    case "send":
      return <Suivi />;
    case "lock":
      return <Local />;
  }
}

/* ─────────────────────────── Le fil des annonces ─────────────────────────── */

/** « il y a 3 min » → 3 ; « il y a 1 h » → 60. */
function minutes(publie: string) {
  const m = publie.match(/(\d+)\s*(min|h)/);
  if (!m) return 0;
  return Number(m[1]) * (m[2] === "h" ? 60 : 1);
}

function horodatage(d: Date) {
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

/**
 * L'ordre du fil : de la plus récente à la plus ancienne, d'après l'âge
 * affiché de chaque annonce. Les heures du fil initial descendent donc bien
 * de haut en bas ; ensuite, chaque arrivée est horodatée « maintenant ».
 */
const ORDRE = ANNONCES.map((a, i) => ({ i, age: minutes(a.publie) }))
  .sort((x, y) => x.age - y.age)
  .map((x) => x.i);

const VISIBLES = 3;
const CADENCE = 3600;

/**
 * Le fil des notifications. La plus récente en tête et en avant ; les autres
 * reculent et s'estompent, la quatrième sort par le fond. Toutes les 3,6 s,
 * tant que le fil est à l'écran, une annonce de la démonstration arrive en
 * tête, horodatée à l'heure du visiteur. Sous `prefers-reduced-motion`, le fil
 * reste immobile sur ses trois premières annonces.
 */
function Fil() {
  const { ref, vu } = useEnVue<HTMLDivElement>({ une: false, marge: "0px" });
  const n = ORDRE.length;
  const [tete, setTete] = useState(0);
  const [arrivee, setArrivee] = useState<number | null>(null);
  const [heures, setHeures] = useState<Record<number, string>>({});

  // Après montage, chaque annonce reçoit une heure : maintenant moins son âge.
  useEffect(() => {
    const maintenant = Date.now();
    setHeures(
      Object.fromEntries(ANNONCES.map((a, i) => [i, horodatage(new Date(maintenant - minutes(a.publie) * 60_000))])),
    );
  }, []);

  useEffect(() => {
    if (!vu || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      setTete((h) => {
        const suivante = (h - 1 + n) % n;
        setArrivee(ORDRE[suivante]);
        setHeures((hs) => ({ ...hs, [ORDRE[suivante]]: horodatage(new Date()) }));
        return suivante;
      });
    }, CADENCE);
    return () => window.clearInterval(t);
  }, [vu, n]);

  // Quatre places : trois visibles et celle qui sort par le fond.
  const places = Array.from({ length: VISIBLES + 1 }, (_, p) => ORDRE[(tete + p) % n]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[28rem]">
      <p className="champ text-ink-3">Aujourd&apos;hui</p>
      <ol className="fil mt-3">
        {places.map((i, place) => {
          const a = ANNONCES[i];
          const haute = a.note >= 80;
          return (
            <li key={i} data-place={place} className={cn("fil-notif", arrivee === i && place === 0 && "fil-arrive")}>
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue text-[13px] font-semibold text-white">
                  T
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline justify-between gap-2 text-[13px] text-ink">
                    <span className="truncate font-medium">Terouva · nouvelle annonce</span>
                    <span className="champ shrink-0 text-ink-3 tabular-nums">
                      {heures[i] ?? a.publie.replace("il y a ", "")}
                    </span>
                  </p>
                  <p className="truncate text-[13px] text-ink-2">
                    {a.titre} · {a.prix} €
                  </p>
                </div>
                <span className={cn("w-[2ch] text-right font-mono text-[15px] tabular-nums", haute ? "text-action" : "text-ink-3")}>
                  {a.note}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ─────────────────────────────── Le cadran ─────────────────────────────── */

/**
 * La note de l'annonce vedette, sur un cadran gradué. L'arc se remplit une
 * fois (900 ms, la courbe du site) et le chiffre compte avec lui. `pathLength`
 * ramène le périmètre à 100 : l'offset de l'arc est directement 100 − note.
 */
function Cadran({ etat }: { etat?: Etat }) {
  const a = ANNONCES[0];
  const [affiche, setAffiche] = useState(a.note);

  useEffect(() => {
    if (etat === "attente") {
      setAffiche(0);
      return;
    }
    if (etat !== "joue" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAffiche(a.note);
      return;
    }
    const debut = performance.now();
    let image = 0;
    const pas = (t: number) => {
      const p = Math.min(1, (t - debut) / 900);
      // Même allure que --ease-terouva : rapide au départ, posé à l'arrivée.
      setAffiche(Math.round(a.note * (1 - Math.pow(1 - p, 3))));
      if (p < 1) image = requestAnimationFrame(pas);
    };
    image = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(image);
  }, [etat, a.note]);

  return (
    <div className="flex items-center gap-5">
      <div className="relative size-24 shrink-0">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90">
          {Array.from({ length: 40 }, (_, i) => {
            const angle = (i / 40) * 2 * Math.PI;
            const majeure = i % 4 === 0;
            const r1 = majeure ? 29 : 30;
            // Arrondi au centième : Node et le navigateur ne donnent pas les
            // mêmes derniers chiffres de cos/sin, ce qui casse l'hydratation.
            const c = (v: number) => Math.round(v * 100) / 100;
            return (
              <line
                key={i}
                x1={c(32 + r1 * Math.cos(angle))}
                y1={c(32 + r1 * Math.sin(angle))}
                x2={c(32 + 31.5 * Math.cos(angle))}
                y2={c(32 + 31.5 * Math.sin(angle))}
                stroke={majeure ? "var(--color-ink-3)" : "var(--color-rule-fort)"}
                strokeWidth="0.6"
              />
            );
          })}
          <circle cx="32" cy="32" r="24" fill="none" stroke="var(--color-rule-fort)" strokeWidth="3" />
          <circle
            className="cadran-arc"
            cx="32"
            cy="32"
            r="24"
            fill="none"
            stroke="var(--color-action)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            style={{ "--plein": 100 - a.note } as React.CSSProperties}
          />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-ink tabular-nums">{affiche}</p>
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

/** Trois candidatures et leur avancée ; les barres avancent une fois, l'une après l'autre. */
function Suivi() {
  const lignes = [
    { titre: ANNONCES[0].titre, pas: 3 },
    { titre: ANNONCES[1].titre, pas: 2 },
    { titre: ANNONCES[2].titre, pas: 1 },
  ];
  return (
    <ul className="space-y-3">
      {lignes.map((l, i) => (
        <li key={l.titre} className="flex items-center gap-4">
          <span className="min-w-0 flex-1 truncate text-[13px] text-ink-2">{l.titre}</span>
          <span className="flex shrink-0 gap-1">
            {[1, 2, 3].map((n) => (
              <span key={n} className="h-1.5 w-7 overflow-hidden rounded-full bg-rule-fort">
                {n <= l.pas && (
                  <span
                    className="suivi-barre block h-full bg-action"
                    style={{ "--rang": i * 3 + n } as React.CSSProperties}
                  />
                )}
              </span>
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
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-rule-fort bg-paper text-blue-clair">
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
