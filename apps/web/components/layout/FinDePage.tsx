import { WaitlistForm } from "@/components/ui/WaitlistForm";

/**
 * La fin commune aux guides, aux articles et aux outils : on a rendu
 * service, on propose la suite.
 *
 * C'était un bloc entre deux filets, de la même matière que le texte au-dessus :
 * la page finissait sans arriver nulle part. La fin devient un cadre de nuit
 * (`.encadre`, la surface de verre du site, arête bleue puis orange, lueur
 * chaude au pied) : sur une page de papier, la feuille s'arrête et la nuit de
 * l'accueil revient au moment de s'inscrire. Le formulaire garde ses jetons ;
 * c'est `.fin-de-page` (navigation.css) qui les repasse au monde nuit.
 *
 * L'ancre `#prevenu` est la cible du bouton « Être prévenu » de la barre
 * (`NavClient`) et des liens posés dans le corps de certains articles.
 */
export function FinDePage({
  titre = "Les bons logements, avant les autres.",
  texte = "Vous recevez une alerte Leboncoin : Terouva vous dit si le logement vaut le coup et écrit votre message. Terouva ouvre par vagues : laissez votre adresse pour prendre place.",
}: {
  titre?: string;
  texte?: string;
}) {
  return (
    <aside
      id="prevenu"
      aria-labelledby="prevenu-titre"
      className="fin-de-page encadre mt-20 scroll-mt-24 px-5 pt-10 pb-8 sm:px-10 sm:pt-12 sm:pb-10"
    >
      <span aria-hidden className="fin-de-page__repere">
        <span className="size-1.5 rounded-full bg-action" />
      </span>
      <h2
        id="prevenu-titre"
        className="titre mt-5 max-w-[16ch] text-[clamp(2rem,1.5rem+2.4vw,2.75rem)] leading-[1.05] text-ink"
      >
        {titre}
      </h2>
      <p className="mt-4 max-w-[38rem] leading-relaxed text-ink-2">{texte}</p>

      <div className="mt-8 max-w-xl">
        <WaitlistForm />
      </div>
    </aside>
  );
}
