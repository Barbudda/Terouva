import { FAQ_ITEMS, SIGNUP } from "@/lib/content";
import { BandeNuit } from "@/components/layout/coquilles/BandeNuit";
import { Questions } from "@/components/ui/Questions";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

/**
 * Questions et inscription, coquille D : la seconde et dernière bande nuit.
 *
 * La FAQ y devient un index numéroté à filets ; sur grand écran son titre
 * reste en place pendant qu'on parcourt les réponses. Le texte complet des
 * réponses reste dans le DOM (le `<details>` suffit) : le balisage `FAQPage`
 * exige que la réponse affichée soit la réponse balisée.
 *
 * Puis l'arrivée. C'est la seule composition centrée après le hero, et c'est
 * voulu : la fin du parcours lui répond (titre Fraunces, queue en italique,
 * un seul bouton orange). Le guichet est le point focal ; le succès l'ouvre
 * en billet (`WaitlistForm`, `app/styles/arrivee.css`).
 */
export function Inscription() {
  return (
    <BandeNuit id="questions" className="mt-pas">
      <div className="grille">
        <div className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <p className="champ text-night-ink-2">Questions fréquentes</p>
            <h2 className="mt-3 text-nuit-titre leading-[1.05] font-medium tracking-[-0.01em]">
              Avant de vous inscrire.
            </h2>
          </div>
        </div>
        <div className="col-span-12 mt-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
          <Questions questions={FAQ_ITEMS} titre={null} ouvrirPremiere nuit />
        </div>
      </div>

      <div id="inscription" className="grille mt-pas-nuit scroll-mt-20">
        <div className="col-span-12">
          <div aria-hidden className="filet-trace arrivee-filet h-px bg-night-rule" />
          <div className="mx-auto max-w-[60rem] pt-pas-nuit text-center">
            <h2 className="monte titre arrivee-titre text-night-ink">
              {SIGNUP.titleLead} <br className="hidden sm:inline" />
              <em className="font-normal italic">{SIGNUP.titleTail}</em>
            </h2>
            <div className="monte mx-auto mt-10 max-w-[34rem]" style={{ "--decalage": 1 } as React.CSSProperties}>
              <WaitlistForm dark />
            </div>
            <dl className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-3">
              {SIGNUP.platforms.map((p) => (
                <div key={p.name}>
                  <dt className="champ text-night-ink-2">Prévu pour</dt>
                  <dd className="mt-1 text-[15px] font-medium">{p.name}</dd>
                  <dd className="champ mt-0.5 text-night-ink-2">{p.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </BandeNuit>
  );
}
