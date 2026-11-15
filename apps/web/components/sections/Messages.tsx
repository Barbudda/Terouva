import { MESSAGES, type MessageExemple } from "@/lib/exemples";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * Les messages que Terouva écrit. Vague 2 du pôle Design (15 novembre,
 * docs/design/VAGUE-2.md) : sur crème, trois lettres entières, en grand, posées
 * côte à côte comme le fil d'actions de FanClaw. Plus de ruban qui défile ni de
 * panneau de lecture : la lettre se lit là où elle est.
 *
 * Ce ne sont pas des avis de clients : le produit n'est pas sorti, et inventer
 * des témoignages tromperait les visiteurs. Ce sont les brouillons produits par
 * le moteur pour trois profils, un par ton, recopiés tels quels. On montre le
 * travail, pas un compliment.
 */
const LETTRES = MESSAGES.slice(0, 3);

export function Messages() {
  return (
    <section id="messages" aria-labelledby="messages-titre" className="messages monde-papier scroll-mt-20">
      <div className="cadre">
        <TitreSection
          id="messages-titre"
          titre="Un message qui donne envie"
          accent="de vous répondre."
        />
        <p className="mx-auto mt-6 max-w-[38rem] text-center text-[17px] leading-relaxed text-ink-2">
          Qui vous êtes, vos revenus, votre garant, quand vous pouvez visiter : tout ce que le
          propriétaire veut savoir, en quelques lignes.
        </p>
      </div>

      {/* Sur téléphone, les lettres glissent au doigt ; sur ordinateur, elles
          tiennent toutes les trois, celle du milieu en avant. */}
      <ul className="messages-lettres" aria-label="Exemples de messages écrits par Terouva">
        {LETTRES.map((m) => (
          <Lettre key={m.annonce} message={m} />
        ))}
      </ul>
    </section>
  );
}

/** « Cordialement,\nCamille Martin\n06… » : le nom est la ligne qui suit la formule. */
function expediteur(texte: string) {
  const dernier = texte.split("\n\n").at(-1) ?? "";
  return dernier.split("\n")[1] ?? "";
}

function Lettre({ message }: { message: MessageExemple }) {
  return (
    <li className="messages-lettre">
      <p className="flex items-baseline justify-between gap-3 border-b border-rule pb-4">
        <span className="truncate font-serif text-[22px] italic text-ink">{expediteur(message.texte)}</span>
        <span className="shrink-0 text-[13px] text-ink-3">Ton {message.ton.toLowerCase()}</span>
      </p>
      <p className="mt-5 text-[15px] leading-[1.6] whitespace-pre-line text-ink">{message.texte}</p>
    </li>
  );
}
