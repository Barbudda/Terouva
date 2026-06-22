import { useState } from "react";
import { Button } from "@app/components/ui/Button";
import { Badge, Card, CardBody, CardFooter, CardHeader, CardTitle } from "@app/components/ui/Card";
import { Field, Input, Select, Textarea } from "@app/components/ui/Input";
import {
  createSearchProfile,
  deleteSearchProfile,
  updateSearchProfile,
} from "@app/lib/db";
import { openExternal } from "@app/lib/tauri";
import { buildLbcSearchUrlAsync } from "@app/lib/lbcUrl";
import { useStore } from "@app/store/useStore";
import type { SearchProfile } from "@app/types";

const EMPTY: Partial<SearchProfile> & { name: string } = {
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

export default function Recherches() {
  const searches = useStore((s) => s.searches);
  const refresh = useStore((s) => s.refreshSearches);
  const [editing, setEditing] = useState<(Partial<SearchProfile> & { id?: number; name: string }) | null>(null);
  const [genBusy, setGenBusy] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          {searches.length} recherche{searches.length > 1 ? "s" : ""} —{" "}
          {searches.filter((s) => s.is_active).length} active
          {searches.filter((s) => s.is_active).length > 1 ? "s" : ""}
        </p>
        <Button onClick={startNew}>+ Nouvelle recherche</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {searches.map((s) => (
          <Card key={s.id}>
            <CardHeader className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CardTitle>{s.name}</CardTitle>
                {s.is_active ? (
                  <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/40">
                    active
                  </Badge>
                ) : (
                  <Badge className="bg-zinc-700/40 text-zinc-400 border-zinc-600/40">
                    pause
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardBody className="text-sm text-zinc-400 space-y-1">
              <div>
                {s.city ?? "—"} • ≤ {s.price_max ?? "—"}€ • ≥ {s.surface_min ?? "—"}m² • ≥{" "}
                {s.rooms_min ?? "—"} pièces
              </div>
              {s.keywords_must && (
                <div className="text-xs">
                  <span className="text-emerald-400">must :</span> {s.keywords_must}
                </div>
              )}
              {s.keywords_exclude && (
                <div className="text-xs">
                  <span className="text-red-400">exclus :</span> {s.keywords_exclude}
                </div>
              )}
            </CardBody>
            <CardFooter>
              {s.lbc_search_url && (
                <Button variant="ghost" size="sm" onClick={() => openExternal(s.lbc_search_url!)}>
                  Ouvrir LBC
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => toggleActive(s)}>
                {s.is_active ? "Pause" : "Activer"}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => startEdit(s)}>
                Modifier
              </Button>
              <Button variant="danger" size="sm" onClick={() => remove(s.id)}>
                Supprimer
              </Button>
            </CardFooter>
          </Card>
        ))}
        {searches.length === 0 && (
          <Card className="md:col-span-2">
            <CardBody className="text-center py-10 text-zinc-500">
              Aucune recherche. Crée-en une pour commencer.
            </CardBody>
          </Card>
        )}
      </div>

      {editing && (
        <Card>
          <CardHeader>
            <CardTitle>{editing.id ? `Modifier — ${editing.name}` : "Nouvelle recherche"}</CardTitle>
          </CardHeader>
          <CardBody className="grid grid-cols-2 gap-4">
            <Field label="Nom">
              <Input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </Field>
            <Field label="Ville">
              <Input
                value={editing.city ?? ""}
                onChange={(e) => setEditing({ ...editing, city: e.target.value })}
              />
            </Field>
            <Field label="Quartiers" hint="CSV (ex: 11e, 12e, 20e)">
              <Input
                value={editing.neighborhoods ?? ""}
                onChange={(e) => setEditing({ ...editing, neighborhoods: e.target.value })}
              />
            </Field>
            <Field label="Rayon (km)">
              <Input
                type="number"
                min={0}
                step="0.5"
                value={editing.radius_km ?? ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    radius_km: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </Field>
            <Field label="Prix max (€)">
              <Input
                type="number"
                min={0}
                value={editing.price_max ?? ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    price_max: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </Field>
            <Field label="Surface min (m²)">
              <Input
                type="number"
                min={0}
                value={editing.surface_min ?? ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    surface_min: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </Field>
            <Field label="Pièces min">
              <Input
                type="number"
                min={1}
                value={editing.rooms_min ?? ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    rooms_min: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </Field>
            <Field label="Meublé">
              <Select
                value={editing.furnished ?? "any"}
                onChange={(e) =>
                  setEditing({ ...editing, furnished: e.target.value as "yes" | "no" | "any" })
                }
              >
                <option value="any">Indifférent</option>
                <option value="yes">Meublé</option>
                <option value="no">Vide</option>
              </Select>
            </Field>
            <Field label="Type">
              <Select
                value={editing.property_type ?? "any"}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    property_type: e.target.value as "apartment" | "house" | "any",
                  })
                }
              >
                <option value="any">Indifférent</option>
                <option value="apartment">Appartement</option>
                <option value="house">Maison</option>
              </Select>
            </Field>
            <Field label="Vérification toutes les (min)">
              <Input
                type="number"
                min={5}
                value={editing.check_frequency_minutes ?? 30}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    check_frequency_minutes: e.target.value ? Number(e.target.value) : 30,
                  })
                }
              />
            </Field>
            <Field label="Mots-clés obligatoires" hint="CSV (ex: balcon, lumineux)">
              <Input
                value={editing.keywords_must ?? ""}
                onChange={(e) => setEditing({ ...editing, keywords_must: e.target.value })}
              />
            </Field>
            <Field label="Mots-clés exclus" hint="CSV (ex: colocation, RDC)">
              <Input
                value={editing.keywords_exclude ?? ""}
                onChange={(e) => setEditing({ ...editing, keywords_exclude: e.target.value })}
              />
            </Field>
            <Field
              label="URL de recherche Leboncoin"
              hint="Générée automatiquement depuis tes critères — modifiable, et vérifiable en 1 clic."
            >
              <Textarea
                rows={2}
                placeholder="Clique « Générer depuis mes critères »…"
                value={editing.lbc_search_url ?? ""}
                onChange={(e) => setEditing({ ...editing, lbc_search_url: e.target.value })}
              />
              <div className="mt-2 flex items-center gap-2">
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
                  {genBusy ? "Génération…" : "Générer depuis mes critères"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={!editing.lbc_search_url}
                  onClick={() => editing.lbc_search_url && openExternal(editing.lbc_search_url)}
                >
                  Ouvrir sur Leboncoin ↗
                </Button>
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-2 col-span-2">
              {(
                [
                  ["must_have_elevator", "Ascenseur"],
                  ["must_have_balcony", "Balcon"],
                  ["must_have_parking", "Parking"],
                  ["must_have_cave", "Cave"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={!!editing[key]}
                    onChange={(e) =>
                      setEditing({ ...editing, [key]: e.target.checked ? 1 : 0 })
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Annuler
            </Button>
            <Button onClick={save} disabled={!editing.name.trim()}>
              {editing.id ? "Mettre à jour" : "Créer"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
