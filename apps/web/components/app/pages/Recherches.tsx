import { useEffect, useRef, useState } from "react";
import { ExternalLink, Plus } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { Badge, Card, EmptyState } from "@app/components/ui/Card";
import { Field, Input, Select, Textarea } from "@app/components/ui/Input";
import { formatPrice } from "@app/components/listing/format";
import { createSearchProfile, deleteSearchProfile, updateSearchProfile } from "@app/lib/db";
import { openExternal } from "@app/lib/tauri";
import { buildLbcSearchUrlAsync } from "@app/lib/lbcUrl";
import { useStore } from "@app/store/useStore";
import type { SearchProfile } from "@app/types";

type Draft = Partial<SearchProfile> & { id?: number; name: string };

const EMPTY: Draft = {
  name: "",
  city: "",
  neighborhoods: "",
  radius_km: null,
  price_max: null,
  surface_min: null,
  rooms_min: null,
  furnished: "any",
  property_type: "apartment",
  keywords_must: "",
  keywords_exclude: "",
  must_have_elevator: 0,
  must_have_balcony: 0,
  must_have_parking: 0,
  must_have_cave: 0,
  floor_min: null,
  floor_max: null,
  lbc_search_url: "",
  check_frequency_minutes: 30,
  is_active: 1,
};

const num = (v: string) => (v ? Number(v) : null);

function describe(s: SearchProfile): string {
  return [
    s.city,
    s.radius_km ? `${s.radius_km} km autour` : null,
    s.price_max ? `jusqu'à ${formatPrice(s.price_max)}` : null,
    s.surface_min ? `${s.surface_min} m² minimum` : null,
    s.rooms_min ? `${s.rooms_min} pièce${s.rooms_min > 1 ? "s" : ""} minimum` : null,
    s.furnished === "yes" ? "meublé" : s.furnished === "no" ? "vide" : null,
    s.property_type === "house" ? "maison" : s.property_type === "apartment" ? "appartement" : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export default function Recherches() {
  const searches = useStore((s) => s.searches);
  const refresh = useStore((s) => s.refreshSearches);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [genBusy, setGenBusy] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // On ne défile qu'à l'ouverture du formulaire, pas à chaque frappe.
  const openedKey = editing ? (editing.id ?? "new") : null;
  useEffect(() => {
    if (openedKey !== null) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [openedKey]);

  const startNew = () => setEditing({ ...EMPTY });
  const startEdit = (s: SearchProfile) => setEditing({ ...s });

  const save = async () => {
    if (!editing) return;
    // Cohérence : si l'utilisateur n'a pas d'URL mais a une ville, on la construit
    // automatiquement depuis ses critères (plus aucune URL à coller à la main).
    let toSave = editing;
    if (!editing.lbc_search_url && editing.city) {
      try {
        const url = await buildLbcSearchUrlAsync(editing as never);
        toSave = { ...editing, lbc_search_url: url };
      } catch {
        /* géocodage indisponible → on enregistre sans URL */
      }
    }
    if (toSave.id) {
      await updateSearchProfile(toSave.id, toSave);
    } else {
      await createSearchProfile(toSave);
    }
    await refresh();
    setEditing(null);
  };

  const remove = async (id: number) => {
    if (!confirm("Supprimer cette recherche ?")) return;
    await deleteSearchProfile(id);
    await refresh();
  };

  const toggleActive = async (s: SearchProfile) => {
    await updateSearchProfile(s.id, { ...s, is_active: s.is_active ? 0 : 1 });
    await refresh();
  };

  const set = (patch: Partial<Draft>) => editing && setEditing({ ...editing, ...patch });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-ink-2">
          {searches.length === 0
            ? "Aucune recherche enregistrée."
            : `${searches.length} recherche${searches.length > 1 ? "s" : ""}, dont ${
                searches.filter((s) => s.is_active).length
              } active${searches.filter((s) => s.is_active).length > 1 ? "s" : ""}`}
        </p>
        {!editing && (
          <Button variant="secondary" onClick={startNew}>
            <Plus size={16} strokeWidth={1.75} aria-hidden />
            Nouvelle recherche
          </Button>
        )}
      </div>

      {editing && (
        <div ref={formRef} className="scroll-mt-4">
          <Card>
            <div className="border-b border-rule px-4 py-4 sm:px-5">
              <h3 className="font-serif text-xl font-medium text-ink">
                {editing.id ? `Modifier « ${editing.name} »` : "Nouvelle recherche"}
              </h3>
            </div>
            <div className="grid gap-4 px-4 py-5 sm:grid-cols-2 sm:px-5">
              <Field label="Nom de la recherche">
                <Input
                  placeholder="Par exemple : Studio à Lyon"
                  value={editing.name}
                  onChange={(e) => set({ name: e.target.value })}
                />
              </Field>
              <Field label="Ville">
                <Input value={editing.city ?? ""} onChange={(e) => set({ city: e.target.value })} />
              </Field>
              <Field label="Quartiers" hint="Séparés par des virgules. Par exemple : 11e, 12e, 20e">
                <Input value={editing.neighborhoods ?? ""} onChange={(e) => set({ neighborhoods: e.target.value })} />
              </Field>
              <Field label="Distance autour de la ville (km)">
                <Input
                  type="number"
                  min={0}
                  step="0.5"
                  value={editing.radius_km ?? ""}
                  onChange={(e) => set({ radius_km: num(e.target.value) })}
                />
              </Field>
              <Field label="Loyer maximum (€)">
                <Input type="number" min={0} value={editing.price_max ?? ""} onChange={(e) => set({ price_max: num(e.target.value) })} />
              </Field>
              <Field label="Surface minimum (m²)">
                <Input type="number" min={0} value={editing.surface_min ?? ""} onChange={(e) => set({ surface_min: num(e.target.value) })} />
              </Field>
              <Field label="Nombre de pièces minimum">
                <Input type="number" min={1} value={editing.rooms_min ?? ""} onChange={(e) => set({ rooms_min: num(e.target.value) })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Meublé">
                  <Select
                    value={editing.furnished ?? "any"}
                    onChange={(e) => set({ furnished: e.target.value as "yes" | "no" | "any" })}
                  >
                    <option value="any">Peu importe</option>
                    <option value="yes">Meublé</option>
                    <option value="no">Vide</option>
                  </Select>
                </Field>
                <Field label="Type">
                  <Select
                    value={editing.property_type ?? "any"}
                    onChange={(e) => set({ property_type: e.target.value as "apartment" | "house" | "any" })}
                  >
                    <option value="any">Peu importe</option>
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                  </Select>
                </Field>
              </div>
              <Field label="Mots souhaités" hint="Séparés par des virgules. Par exemple : balcon, lumineux">
                <Input value={editing.keywords_must ?? ""} onChange={(e) => set({ keywords_must: e.target.value })} />
              </Field>
              <Field label="Mots à éviter" hint="Séparés par des virgules. Par exemple : colocation, rez-de-chaussée">
                <Input value={editing.keywords_exclude ?? ""} onChange={(e) => set({ keywords_exclude: e.target.value })} />
              </Field>

              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-medium text-ink-2">Indispensable</legend>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {(
                    [
                      ["must_have_elevator", "Ascenseur"],
                      ["must_have_balcony", "Balcon"],
                      ["must_have_parking", "Parking"],
                      ["must_have_cave", "Cave"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 text-[15px] text-ink">
                      <input
                        type="checkbox"
                        checked={!!editing[key]}
                        onChange={(e) => set({ [key]: e.target.checked ? 1 : 0 })}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field
                className="sm:col-span-2"
                label="Adresse de la recherche sur Leboncoin"
                hint="Préparée à partir de vos critères. Vous pouvez la modifier et la vérifier sur Leboncoin."
              >
                <Textarea
                  rows={2}
                  placeholder="Cliquez sur « Préparer depuis mes critères »"
                  value={editing.lbc_search_url ?? ""}
                  onChange={(e) => set({ lbc_search_url: e.target.value })}
                />
              </Field>
              <div className="-mt-2 flex flex-wrap items-center gap-2 sm:col-span-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={genBusy}
                  onClick={async () => {
                    setGenBusy(true);
                    try {
                      const url = await buildLbcSearchUrlAsync(editing as never);
                      setEditing({ ...editing, lbc_search_url: url });
                    } finally {
                      setGenBusy(false);
                    }
                  }}
                >
                  {genBusy ? "Préparation…" : "Préparer depuis mes critères"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={!editing.lbc_search_url}
                  onClick={() => editing.lbc_search_url && openExternal(editing.lbc_search_url)}
                >
                  <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
                  Vérifier sur Leboncoin
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-rule px-4 py-3 sm:px-5">
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Annuler
              </Button>
              <Button onClick={save} disabled={!editing.name.trim()}>
                {editing.id ? "Enregistrer" : "Créer la recherche"}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {searches.length === 0 && !editing ? (
        <EmptyState
          title="Aucune recherche"
          action={<Button onClick={startNew}>Créer une recherche</Button>}
        >
          Indiquez la ville, le loyer et la surface qui vous conviennent. Terouva s'en sert pour
          noter les annonces.
        </EmptyState>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {searches.map((s) => (
            <Card key={s.id} className="flex flex-col">
              <div className="flex-1 px-4 pt-4 pb-3 sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[17px] font-semibold leading-snug text-ink">{s.name}</h3>
                  <Badge tone={s.is_active ? "good" : "muted"}>{s.is_active ? "Active" : "En pause"}</Badge>
                </div>
                <p className="mt-1.5 text-[15px] leading-snug text-ink-2">
                  {describe(s) || "Aucun critère pour l'instant"}
                </p>
                {s.keywords_must && (
                  <p className="mt-2 text-[13px] text-ink-3">Mots souhaités : {s.keywords_must}</p>
                )}
                {s.keywords_exclude && (
                  <p className="mt-0.5 text-[13px] text-ink-3">Mots à éviter : {s.keywords_exclude}</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1 border-t border-rule px-3 py-2">
                <Button variant="ghost" size="sm" onClick={() => startEdit(s)}>
                  Modifier
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toggleActive(s)}>
                  {s.is_active ? "Mettre en pause" : "Réactiver"}
                </Button>
                {s.lbc_search_url && (
                  <Button variant="ghost" size="sm" onClick={() => openExternal(s.lbc_search_url!)}>
                    Leboncoin
                  </Button>
                )}
                <Button variant="danger" size="sm" className="ml-auto" onClick={() => remove(s.id)}>
                  Supprimer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
