import { WaitlistForm } from "@/components/ui/WaitlistForm";

/**
 * Pied de contenu commun aux guides et aux outils : on a rendu service, on
 * propose la suite. Pas de bandeau criard : un bloc sobre, et le lecteur décide.
 */
export function FinDePage({
  titre = "Les bons logements, avant les autres.",
  texte = "Vous recevez une alerte Leboncoin : Terouva vous dit si le logement vaut le coup et écrit votre message. Terouva ouvre par vagues : laissez votre adresse pour prendre place.",
}: {
  titre?: string;
  texte?: string;
}) {
  return (
    <aside id="prevenu" className="mt-16 scroll-mt-24 border-y border-rule-fort py-8">
      <p className="mention">Liste d'attente</p>
      <h2 className="titre titre--petit mt-3 text-[1.75rem] text-ink sm:text-[2rem]">{titre}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{texte}</p>

      <div className="mt-6 max-w-xl">
        <WaitlistForm />
      </div>
    </aside>
  );
}
