import { SIGNUP } from "@/lib/content";
import { Assurances, SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

/**
 * Bloc sombre de fin de page : les deux plateformes annoncées comme « bientôt »,
 * et l'inscription pour être prévenu. C'est le seul bloc nuit de la page, et
 * c'est un aplat : il tranche parce que tout le reste est clair, pas parce
 * qu'un halo le souligne.
 *
 * Les deux tuiles disaient « Télécharger pour Mac » sans qu'aucun lien n'existe.
 * Un bloc qui annonce un téléchargement qu'on ne peut pas faire est la faute
 * qu'on a relevée ailleurs ; ici il dit ce qu'il est, une plateforme prévue.
 */
export function Signup() {
  return (
    <section id="inscription" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="monte mx-auto max-w-6xl rounded-xl bg-night px-5 py-14 text-center sm:px-10 md:py-20">
        <SectionHeading
          eyebrow={SIGNUP.eyebrow}
          lead={SIGNUP.titleLead}
          tail={SIGNUP.titleTail}
          align="center"
          dark
        >
          {SIGNUP.body}
        </SectionHeading>

        <dl className="mx-auto mt-10 grid max-w-2xl gap-x-10 gap-y-6 sm:grid-cols-2">
          {SIGNUP.platforms.map((p) => (
            <div key={p.name} className="border-t border-night-rule pt-4 text-left">
              <dt className="text-[13px] text-night-ink-2">Prévu pour</dt>
              <dd className="display mt-1 text-2xl text-night-ink">{p.name}</dd>
              <dd className="mt-1 text-[13px] text-night-ink-2">{p.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mx-auto mt-10 max-w-xl">
          <WaitlistForm dark />
        </div>

        <div className="mx-auto mt-6 max-w-xl">
          <Assurances items={SIGNUP.assurances} dark />
        </div>
      </div>
    </section>
  );
}
