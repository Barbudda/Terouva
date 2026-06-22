import { useState } from "react";
import { Button } from "@app/components/ui/Button";
import { Field, Input } from "@app/components/ui/Input";
import { createSearchProfile, setSetting, updateUserProfile } from "@app/lib/db";
import { buildLbcSearchUrlAsync } from "@app/lib/lbcUrl";

/**
 * Assistant de premier lancement (3 écrans). Objectif : passer de « installé »
 * à « je surveille, je te préviens » en ~2 minutes, sans jargon. Écrit le profil
 * + une première recherche en DB, puis pose le flag `onboarded`.
 */
export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  // Étape 1 — profil express
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [situation, setSituation] = useState("");
  const [income, setIncome] = useState("");
  const [guarantors, setGuarantors] = useState("");

  // Étape 2 — première recherche
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
    <div className="min-h-screen grid place-items-center p-6 bg-zinc-950">
      <div className="w-full max-w-lg">
        {/* En-tête + progression */}
        <div className="flex items-center gap-3 mb-6">
          <div className="size-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-zinc-950 font-bold">
            T
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold tracking-tight text-zinc-100">
              Bienvenue sur Terouva
            </div>
            <div className="text-xs text-zinc-500">Configuration en 2 minutes</div>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={
                  "h-1.5 w-6 rounded-full " +
                  (i <= step ? "bg-emerald-400" : "bg-zinc-800")
                }
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-100">Qui es-tu ?</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Ces infos servent à pré-remplir tes messages de candidature.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Prénom">
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Field>
                <Field label="Nom">
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Field>
                <Field label="Téléphone">
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Field>
                <Field label="Revenus nets / mois (€)">
                  <Input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </Field>
                <Field label="Situation">
                  <Input
                    placeholder="ex: salarié CDI, étudiant…"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                  />
                </Field>
                <Field label="Garant">
                  <Input
                    placeholder="ex: parents, Visale…"
                    value={guarantors}
                    onChange={(e) => setGuarantors(e.target.value)}
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-100">Tu cherches quoi ?</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Une première recherche. Tu pourras en ajouter d'autres ensuite.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Ville">
                  <Input value={city} onChange={(e) => setCity(e.target.value)} />
                </Field>
                <Field label="Budget max (€)">
                  <Input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                  />
                </Field>
                <Field label="Surface min (m²)">
                  <Input
                    type="number"
                    value={surfaceMin}
                    onChange={(e) => setSurfaceMin(e.target.value)}
                  />
                </Field>
                <div />
              </div>
              <Field
                label="URL de ta recherche Leboncoin (optionnel)"
                hint="Laisse vide : Terouva construit la recherche depuis ta ville et ton budget. Colle une URL seulement si tu en as déjà une précise."
              >
                <Input
                  placeholder="https://www.leboncoin.fr/recherche?..."
                  value={lbcUrl}
                  onChange={(e) => setLbcUrl(e.target.value)}
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-100">
                  Connecte ton navigateur
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  L'extension Chrome surveille tes recherches Leboncoin et envoie les
                  nouvelles annonces à Terouva, en temps réel.
                </p>
              </div>
              <ol className="space-y-2 text-sm text-zinc-300">
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-mono">1.</span>
                  Installe l'extension Terouva pour Chrome.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-mono">2.</span>
                  Quand elle te le demande, une fenêtre Terouva s'ouvrira :
                  clique <strong>« Autoriser cette extension »</strong>.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-mono">3.</span>
                  Ouvre une page de recherche Leboncoin. C'est tout.
                </li>
              </ol>
              <p className="text-xs text-zinc-500">
                Pas besoin de copier de code : la connexion se fait en un clic.
                Tu peux faire cette étape plus tard, depuis Réglages.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              className="text-sm text-zinc-500 hover:text-zinc-300 disabled:opacity-40"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Retour
            </button>
            {step < 2 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Continuer</Button>
            ) : (
              <Button onClick={finish} disabled={saving}>
                {saving ? "…" : "C'est parti"}
              </Button>
            )}
          </div>
        </div>

        {step === 0 && (
          <p className="text-center text-xs text-zinc-600 mt-4">
            Tu peux passer des champs et les compléter plus tard.
          </p>
        )}
      </div>
    </div>
  );
}
