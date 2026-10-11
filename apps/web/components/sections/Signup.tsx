import { SIGNUP } from "@/lib/content";
import { Assurances, SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

/**
 * Bloc sombre de fin de page : les deux plateformes annoncées comme « bientôt »,
 * et l'inscription pour être prévenu. C'est le seul bloc nuit de la page.
 */
export function Signup() {
  return (
    <section id="inscription" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="night-glow mx-auto max-w-6xl rounded-xl px-5 py-14 text-center sm:px-10 md:py-20">
        <SectionHeading
          eyebrow={SIGNUP.eyebrow}
          lead={SIGNUP.titleLead}
          tail={SIGNUP.titleTail}
          align="center"
          dark
        >
          {SIGNUP.body}
        </SectionHeading>

        <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
          {SIGNUP.platforms.map((p) => (
            <div
              key={p.name}
              className="rounded-lg border border-night-rule bg-night-2 px-5 py-4 text-left"
            >
              <p className="text-[13px] text-night-ink-2">Télécharger pour</p>
              <p className="display mt-1 text-2xl text-night-ink">{p.name}</p>
              <p className="mt-1 text-[13px] text-night-ink-2">{p.detail}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-xl">
          <WaitlistForm dark />
        </div>

        <div className="mt-8 flex justify-center">
          <Assurances items={SIGNUP.assurances} dark />
        </div>
      </div>
    </section>
  );
}
