import { FAQ_ITEMS, SIGNUP } from "@/lib/content";
import { BandeNuit } from "@/components/layout/coquilles/BandeNuit";
import { Questions } from "@/components/ui/Questions";
import { TitreSection } from "@/components/ui/TitreSection";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

/**
 * La fin de l'accueil, en deux temps (vague 2 du pôle Design, à la manière de
 * FanClaw : docs/design/REFERENCE.md).
 *
 * D'abord les questions, sur crème : une grande carte coiffée d'un bandeau
 * nuit qui porte le titre, puis une seule colonne de questions en grand. Le
 * texte complet des réponses reste dans le DOM (le `<details>` suffit) : le balisage `FAQPage` exige que la réponse
 * affichée soit la réponse balisée.
 *
 * Puis la clôture, seconde et dernière bande nuit : un titre géant, le
 * guichet en grand au centre, une ligne de réassurance. Rien d'autre, pour que
 * le seul geste possible soit de laisser son adresse. Le succès ouvre toujours
 * le billet (`WaitlistForm`, `app/styles/arrivee.css`).
 */
export function Inscription() {
  return (
    <>
      <section id="questions" className="monde-papier plein-cadre py-20 lg:py-32">
        <div className="cadre">
          {/* La carte de FanClaw : un bandeau nuit porte le titre et casse la
              longue suite crème, la liste vit dessous sur le fond carte. */}
          <div className="questions-carte monte mx-auto max-w-[67.5rem]">
            <div className="questions-carte__bandeau">
              <TitreSection etiquette="Questions fréquentes" titre="Avant de vous inscrire." />
            </div>
            <Questions
              questions={FAQ_ITEMS}
              titre={null}
              ouvrirPremiere
              grand
              className="questions-carte__liste"
            />
          </div>
        </div>
      </section>

      <BandeNuit id="inscription" className="arrivee scroll-mt-20">
        <div className="cadre py-10 lg:py-12">
          <TitreSection
            titre={SIGNUP.titleLead}
            accent={SIGNUP.titleTail}
            className="arrivee-tete monte"
          />
          <div
            className="monte mx-auto mt-12 max-w-[50rem] text-center lg:mt-16"
            style={{ "--decalage": 1 } as React.CSSProperties}
          >
            <WaitlistForm dark avant={SIGNUP.platforms[0]?.detail} />
          </div>
        </div>
      </BandeNuit>
    </>
  );
}
