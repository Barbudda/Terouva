import { MESSAGES, type MessageExemple } from "@/lib/exemples";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * Les messages que Terouva écrit. Vague 2 du pôle Design (15 novembre,
 * docs/design/VAGUE-2.md) : sur crème, une lettre entière au premier plan, les
 * deux autres en pile derrière elle, en partie cachées, comme la carte de
 * FanClaw qui laisse deviner la suivante. Un seul point focal ; sur téléphone,
 * la lettre du dessus seule.
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
        <p className="mx-auto mt-4 max-w-[38rem] text-center text-[17px] leading-relaxed text-ink-2">
          Qui vous êtes, vos revenus, votre garant, quand vous pouvez visiter : tout ce que le
          propriétaire veut savoir, en quelques lignes.
        </p>
      </div>

      {/* La première lettre est devant ; les deux autres dépassent derrière,
          à gauche et à droite. Sur téléphone, elles disparaissent. */}
      <ul className="messages-pile" aria-label="Exemples de messages écrits par Terouva">
        {LETTRES.map((m, i) => (
          <Lettre key={m.annonce} message={m} place={i} />
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

function Lettre({ message, place }: { message: MessageExemple; place: number }) {
  return (
    <li className="messages-lettre" data-place={place}>
      <p className="flex items-baseline justify-between gap-3 border-b border-rule pb-3">
        <span className="truncate font-serif text-[22px] italic text-ink">{expediteur(message.texte)}</span>
        <span className="shrink-0 text-[13px] text-ink-3">Ton {message.ton.toLowerCase()}</span>
      </p>
      {/* Un paragraphe par bloc, à 6 px d'écart au lieu d'une ligne blanche
          entière : la lettre garde ses respirations et perd un tiers de hauteur. */}
      <div className="mt-3 space-y-1.5 text-[15px] leading-[1.55] text-ink">
        {message.texte.split("\n\n").map((bloc) => (
          <p key={bloc} className="whitespace-pre-line">
            {bloc}
          </p>
        ))}
      </div>
    </li>
  );
}
