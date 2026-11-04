import Link from "next/link";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

/**
 * Pied de contenu commun aux guides et aux outils : on a rendu service, on
 * propose la suite. Pas de bandeau criard : un bloc sobre, et le lecteur décide.
 */
export function FinDePage({
  titre = "Les bonnes locations, avant les autres.",
  texte = "Terouva vous signale les locations Leboncoin qui vous correspondent dès qu'elles paraissent, avec votre message de candidature déjà écrit. Il sort bientôt : laissez votre adresse pour être prévenu.",
}: {
  titre?: string;
  texte?: string;
}) {
  return (
    <aside id="prevenu" className="mt-16 scroll-mt-24 border-y border-rule-fort py-8">
      <p className="mention">Bientôt disponible</p>
      <h2 className="titre titre--petit mt-3 text-[1.75rem] text-ink sm:text-[2rem]">{titre}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{texte}</p>

      <div className="mt-6 max-w-xl">
        <WaitlistForm />
      </div>

      <p className="mt-5 text-sm text-ink-3">
        Vous pouvez aussi{" "}
        <Link href="/app?demo=1" className="lien">
          essayer la démonstration
        </Link>{" "}
        tout de suite, sans rien installer.
      </p>
    </aside>
  );
}
