import { useState } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { Button } from "@app/components/ui/Button";
import { Field, Input } from "@app/components/ui/Input";
import { createSearchProfile, setSetting, updateUserProfile } from "@app/lib/db";
import { buildLbcSearchUrlAsync } from "@app/lib/lbcUrl";

const STEP_TITLES = ["Votre profil", "Votre recherche", "Votre navigateur"];

/**
 * Assistant de premier lancement (3 écrans). Objectif : passer de « installé »
 * à « je surveille, je te préviens » en ~2 minutes, sans jargon. Écrit le profil
 * + une première recherche en DB, puis pose le flag `onboarded`.
 */
export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  // Étape 1 : profil express
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [situation, setSituation] = useState("");
  const [income, setIncome] = useState("");
  const [guarantors, setGuarantors] = useState("");

  // Étape 2 : première recherche
  const [city, setCity] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [surfaceMin, setSurfaceMin] = useState("");
  const [lbcUrl, setLbcUrl] = useState("");

  const finish = async () => {
    setSaving(true);
    try {
      await updateUserProfile({
        first_name: firstName || null,
        last_name: lastName || null,
        phone: phone || null,
        situation: situation || null,
        income_monthly: income ? Number(income) : null,
        guarantors: guarantors || null,
      });
      if (city || priceMax || surfaceMin || lbcUrl) {
        // Si l'utilisateur n'a pas collé d'URL, on la construit depuis ses critères
        // (géocodage de la ville inclus). Plus besoin de coller quoi que ce soit.
        let url = lbcUrl || null;
        if (!url && city) {
          try {
            url = await buildLbcSearchUrlAsync({
              city,
              radius_km: null,
              price_max: priceMax ? Number(priceMax) : null,
              surface_min: surfaceMin ? Number(surfaceMin) : null,
              rooms_min: null,
              furnished: "any",
              property_type: "any",
              keywords_must: null,
            });
          } catch {
            /* géocodage indisponible → on crée la recherche sans URL */
          }
        }
        await createSearchProfile({
          name: city ? `Recherche ${city}` : "Ma recherche",
          city: city || null,
          price_max: priceMax ? Number(priceMax) : null,
          surface_min: surfaceMin ? Number(surfaceMin) : null,
          lbc_search_url: url,
          is_active: 1,
        });
      }
      await setSetting("onboarded", "1");
      onDone();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-root app-scroll h-dvh overflow-y-auto bg-paper text-ink">
      <div className="mx-auto w-full max-w-xl px-4 py-10 sm:py-16">
        <a href="/" className="inline-flex items-center gap-2.5" title="Retour au site Terouva">
          <LogoMark />
          <span className="font-serif text-[1.35rem] font-semibold leading-none tracking-tight">
            Terouva
          </span>
        </a>

        <ol className="mt-10 grid grid-cols-3 gap-2" aria-label="Étapes">
          {STEP_TITLES.map((t, i) => (
            <li key={t} aria-current={i === step ? "step" : undefined}>
              <span className={"block h-1 rounded-full " + (i <= step ? "bg-accent" : "bg-rule")} />
              <span
                className={
                  "mt-2 block text-[13px] " + (i === step ? "font-medium text-ink" : "text-ink-3")
                }
              >
                {i + 1}. {t}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-md border border-rule bg-card p-5 sm:p-7">
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h1 className="font-serif text-3xl font-medium leading-tight">
                  Bienvenue. Qui êtes-vous ?
                </h1>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  Ces informations servent à préparer vos messages de candidature. Elles restent
                  sur cet ordinateur.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Prénom">
                  <Input
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field>
                <Field label="Nom">
                  <Input
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>
                <Field label="Téléphone">
                  <Input
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Field>
                <Field label="Revenus nets par mois (€)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </Field>
                <Field label="Situation">
                  <Input
                    placeholder="Par exemple : salarié en CDI"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                  />
                </Field>
                <Field label="Garant">
                  <Input
                    placeholder="Par exemple : parents, Visale"
                    value={guarantors}
                    onChange={(e) => setGuarantors(e.target.value)}
                  />
                </Field>
              </div>
              <p className="text-[13px] text-ink-3">
                Vous pouvez laisser des champs vides et les compléter plus tard.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h1 className="font-serif text-3xl font-medium leading-tight">
                  Que cherchez-vous ?
                </h1>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  Une première recherche. Vous pourrez en ajouter d'autres ensuite.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Ville">
                  <Input
                    autoComplete="address-level2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Field>
                <Field label="Loyer maximum (€)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                  />
                </Field>
                <Field label="Surface minimum (m²)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={surfaceMin}
                    onChange={(e) => setSurfaceMin(e.target.value)}
                  />
                </Field>
              </div>
              <Field
                label="Adresse de votre recherche Leboncoin (facultatif)"
                hint="Vous pouvez laisser vide : Terouva prépare la recherche à partir de la ville et du loyer. Collez une adresse seulement si vous avez déjà une recherche précise sur Leboncoin."
              >
                <Input
                  type="url"
                  placeholder="https://www.leboncoin.fr/recherche?…"
                  value={lbcUrl}
                  onChange={(e) => setLbcUrl(e.target.value)}
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h1 className="font-serif text-3xl font-medium leading-tight">
                  Connectez votre navigateur
                </h1>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  L'extension Terouva pour Chrome repère les nouvelles annonces sur vos pages de
                  recherche Leboncoin et les transmet ici, au fil de l'eau.
                </p>
              </div>
              <ol className="space-y-3 text-[15px] leading-relaxed text-ink-2">
                {[
                  "Installez l'extension Terouva pour Chrome.",
                  "Quand une fenêtre Terouva vous le demande, cliquez sur « Autoriser ».",
                  "Ouvrez une page de recherche Leboncoin. C'est tout.",
                ].map((line, i) => (
                  <li key={line} className="flex gap-3">
                    <span className="font-serif text-xl leading-6 text-accent tabular">{i + 1}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
              <p className="border-t border-rule pt-4 text-[13px] leading-relaxed text-ink-3">
                Pas d'extension pour l'instant ? Vous pourrez aussi coller vos e-mails d'alerte
                Leboncoin dans « Mes annonces ». Cette étape reste disponible dans les Réglages.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-rule pt-5">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className={step === 0 ? "invisible" : undefined}
            >
              Retour
            </Button>
            {step < 2 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Continuer</Button>
            ) : (
              <Button onClick={finish} disabled={saving}>
                {saving ? "Enregistrement…" : "Commencer"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
