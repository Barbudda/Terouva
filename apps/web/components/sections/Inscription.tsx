import { FAQ_ITEMS, SIGNUP } from "@/lib/content";
import { BandeNuit } from "@/components/layout/coquilles/BandeNuit";
import { Questions } from "@/components/ui/Questions";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

/**
 * Questions et inscription, coquille D : la seconde et dernière bande nuit.
 *
 * La FAQ y devient un index à filets sur fond sombre. Le texte complet des
 * réponses reste dans le DOM (le `<details>` suffit) : le balisage `FAQPage`
 * exige que la réponse affichée soit la réponse balisée. L'inscription termine
 * la bande : champ à filet bas, bouton à l'accent nuit, réassurance en
 * `.champ`. C'est le seul bouton coloré de la moitié basse de la page.
 */
export function Inscription() {
  return (
    <BandeNuit id="questions" className="mt-pas">
      <div className="grille">
        <div className="col-span-12 lg:col-span-3">
          <p className="champ text-night-ink-2">Questions fréquentes</p>
          <h2 className="mt-3 text-nuit-titre leading-[1.05] font-medium tracking-[-0.01em]">
            Avant de vous inscrire.
          </h2>
        </div>
        <div className="col-span-12 mt-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
          <Questions questions={FAQ_ITEMS} titre={null} ouvrirPremiere nuit />
        </div>
      </div>

      <div id="inscription" className="grille mt-pas-nuit scroll-mt-20">
        <div className="col-span-12 border-t border-night-rule pt-10 lg:col-span-10 lg:col-start-2">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-nuit-titre leading-[1.05] font-medium tracking-[-0.01em]">
                {SIGNUP.titleLead} {SIGNUP.titleTail}
              </h2>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
                {SIGNUP.platforms.map((p) => (
                  <div key={p.name}>
                    <dt className="champ text-night-ink-2">Prévu pour</dt>
                    <dd className="mt-1 text-[15px] font-medium">{p.name}</dd>
                    <dd className="champ mt-0.5 text-night-ink-2">{p.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <WaitlistForm dark />
            </div>
          </div>
        </div>
      </div>
    </BandeNuit>
  );
}
