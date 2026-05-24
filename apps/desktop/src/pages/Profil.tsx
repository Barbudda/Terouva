import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { updateUserProfile } from "@/lib/db";
import { useStore } from "@/store/useStore";
import type { UserProfile } from "@/types";

export default function Profil() {
  const profile = useStore((s) => s.profile);
  const refresh = useStore((s) => s.refreshProfile);
  const [form, setForm] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(profile ? { ...profile } : null);
  }, [profile]);

  if (!form) return <div className="text-zinc-500">Chargement…</div>;

  const update = (patch: Partial<UserProfile>) => {
    setForm({ ...form, ...patch });
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    try {
      await updateUserProfile(form);
      await refresh();
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  const completeness = computeCompleteness(form);

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Complétude du dossier</CardTitle>
          <span className="text-sm text-zinc-400">{completeness}%</span>
        </CardHeader>
        <CardBody>
          <div className="h-2 bg-zinc-800 rounded">
            <div
              className="h-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Plus ton profil est complet, plus les messages générés seront convaincants.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Identité</CardTitle>
        </CardHeader>
        <CardBody className="grid grid-cols-2 gap-4">
          <Field label="Prénom">
            <Input
              value={form.first_name ?? ""}
              onChange={(e) => update({ first_name: e.target.value })}
            />
          </Field>
          <Field label="Nom">
            <Input
              value={form.last_name ?? ""}
              onChange={(e) => update({ last_name: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={form.email ?? ""}
              onChange={(e) => update({ email: e.target.value })}
            />
          </Field>
          <Field label="Téléphone">
            <Input
              value={form.phone ?? ""}
              onChange={(e) => update({ phone: e.target.value })}
            />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Situation</CardTitle>
        </CardHeader>
        <CardBody className="grid grid-cols-2 gap-4">
          <Field label="Situation actuelle" hint="ex: salarié CDI, étudiant, freelance…">
            <Input
              value={form.situation ?? ""}
              onChange={(e) => update({ situation: e.target.value })}
            />
          </Field>
          <Field label="Revenus mensuels nets (€)">
            <Input
              type="number"
              min={0}
              value={form.income_monthly ?? ""}
              onChange={(e) =>
                update({
                  income_monthly: e.target.value ? Number(e.target.value) : null,
                })
              }
            />
          </Field>
          <Field label="Type de contrat" hint="recherche: meublé, vide, indifférent…">
            <Input
              value={form.contract_type ?? ""}
              onChange={(e) => update({ contract_type: e.target.value })}
            />
          </Field>
          <Field label="Contact préféré">
            <Select
              value={form.preferred_contact ?? ""}
              onChange={(e) => update({ preferred_contact: e.target.value || null })}
            >
              <option value="">—</option>
              <option value="phone">Téléphone</option>
              <option value="email">Email</option>
              <option value="lbc-message">Message LBC</option>
            </Select>
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Garants & dossier</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <Field label="Garant(s)" hint="ex: Parents, garantie Visale, GarantMe…">
            <Textarea
              rows={2}
              value={form.guarantors ?? ""}
              onChange={(e) => update({ guarantors: e.target.value })}
            />
          </Field>
          <Field label="Message de présentation" hint="Sera utilisé dans le ton 'chaleureux'">
            <Textarea
              rows={4}
              value={form.intro_message ?? ""}
              onChange={(e) => update({ intro_message: e.target.value })}
            />
          </Field>
        </CardBody>
        <CardFooter>
          {saved && <span className="text-xs text-emerald-400 mr-auto">Enregistré ✓</span>}
          <Button onClick={save} disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function computeCompleteness(p: UserProfile): number {
  const fields = [
    p.first_name,
    p.last_name,
    p.email,
    p.phone,
    p.situation,
    p.income_monthly,
    p.contract_type,
    p.guarantors,
    p.intro_message,
    p.preferred_contact,
  ];
  const filled = fields.filter((v) => v !== null && v !== "" && v !== undefined).length;
  return Math.round((filled / fields.length) * 100);
}
