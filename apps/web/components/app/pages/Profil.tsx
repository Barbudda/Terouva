import { useEffect, useState } from "react";
import { Card } from "@app/components/ui/Card";
import { Field, Input, Select, Textarea } from "@app/components/ui/Input";
import { Button } from "@app/components/ui/Button";
import { updateUserProfile } from "@app/lib/db";
import { useStore } from "@app/store/useStore";
import type { UserProfile } from "@app/types";

export default function Profil() {
  const profile = useStore((s) => s.profile);
  const refresh = useStore((s) => s.refreshProfile);
  const [form, setForm] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(profile ? { ...profile } : null);
  }, [profile]);

  if (!form) {
    return (
      <p role="status" className="text-[15px] text-ink-3">
        Chargement de votre profil…
      </p>
    );
  }

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
    <Card>
      <div className="border-b border-rule px-4 py-4 sm:px-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[15px] font-medium text-ink">Profil complété à {completeness} %</p>
          <p className="hidden text-[13px] text-ink-3 sm:block">
            Plus il est complet, plus vos messages sont convaincants.
          </p>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-2"
          role="progressbar"
          aria-valuenow={completeness}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Profil complété"
        >
          <div className="h-full rounded-full bg-good transition-[width]" style={{ width: `${completeness}%` }} />
        </div>
      </div>

      <FormGroup title="Identité">
        <Field label="Prénom">
          <Input autoComplete="given-name" value={form.first_name ?? ""} onChange={(e) => update({ first_name: e.target.value })} />
        </Field>
        <Field label="Nom">
          <Input autoComplete="family-name" value={form.last_name ?? ""} onChange={(e) => update({ last_name: e.target.value })} />
        </Field>
        <Field label="E-mail">
          <Input type="email" autoComplete="email" value={form.email ?? ""} onChange={(e) => update({ email: e.target.value })} />
        </Field>
        <Field label="Téléphone">
          <Input type="tel" autoComplete="tel" value={form.phone ?? ""} onChange={(e) => update({ phone: e.target.value })} />
        </Field>
      </FormGroup>

      <FormGroup title="Situation">
        <Field label="Situation actuelle" hint="Par exemple : salarié, étudiant, indépendant">
          <Input value={form.situation ?? ""} onChange={(e) => update({ situation: e.target.value })} />
        </Field>
        <Field label="Revenus nets par mois (€)">
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            value={form.income_monthly ?? ""}
            onChange={(e) => update({ income_monthly: e.target.value ? Number(e.target.value) : null })}
          />
        </Field>
        <Field label="Contrat de travail" hint="Par exemple : CDI, CDD, intérim">
          <Input value={form.contract_type ?? ""} onChange={(e) => update({ contract_type: e.target.value })} />
        </Field>
        <Field label="Comment préférez-vous être contacté ?">
          <Select
            value={form.preferred_contact ?? ""}
            onChange={(e) => update({ preferred_contact: e.target.value || null })}
          >
            <option value="">Sans préférence</option>
            <option value="phone">Par téléphone</option>
            <option value="email">Par e-mail</option>
            <option value="lbc-message">Par la messagerie Leboncoin</option>
          </Select>
        </Field>
      </FormGroup>

      <FormGroup title="Garant et présentation" single>
        <Field label="Garant" hint="Par exemple : parents, garantie Visale">
          <Textarea rows={2} value={form.guarantors ?? ""} onChange={(e) => update({ guarantors: e.target.value })} />
        </Field>
        <Field
          label="Quelques mots sur vous"
          hint="Repris dans les messages au ton chaleureux. Laissez vide pour une présentation simple."
        >
          <Textarea rows={4} value={form.intro_message ?? ""} onChange={(e) => update({ intro_message: e.target.value })} />
        </Field>
      </FormGroup>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-rule px-4 py-3 sm:px-5">
        {saved && (
          <span role="status" className="mr-auto text-[15px] text-good">
            Profil enregistré
          </span>
        )}
        <Button onClick={save} disabled={saving}>
          {saving ? "Enregistrement…" : "Enregistrer le profil"}
        </Button>
      </div>
    </Card>
  );
}

function FormGroup({
  title,
  single = false,
  children,
}: {
  title: string;
  single?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-b border-rule px-4 py-5 last:border-b-0 sm:px-5">
      <legend className="float-left mb-4 w-full text-[15px] font-semibold text-ink">{title}</legend>
      <div className={single ? "clear-both space-y-4" : "clear-both grid gap-4 sm:grid-cols-2"}>{children}</div>
    </fieldset>
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
