"use client";

import { MESSAGES, type MessageExemple } from "@/lib/exemples";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useEnVue } from "@/components/ui/useEnVue";

/**
 * Les messages que Terouva écrit, qui défilent.
 *
 * Ce ne sont pas des avis de clients : le produit n'est pas sorti, et inventer
 * des témoignages tromperait les visiteurs qui laissent leur adresse. Ce sont
 * les brouillons produits par le moteur de messages pour les annonces de la
 * section précédente, recopiés tels quels. C'est à la fois plus honnête et plus
 * convaincant : on montre le travail, pas un compliment.
 */
export function Messages() {
  const { ref, vu } = useEnVue<HTMLDivElement>({ une: false, marge: "200px" });

  return (
    <section id="messages" className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Le plus pénible, en moins"
          lead="Terouva écrit le message,"
          tail="vous le relisez."
          align="center"
          className="monte max-w-3xl"
        >
          Chaque brouillon cite l&apos;annonce : la surface, le quartier, ce qui vous a plu.
          Trois tons au choix. Vous corrigez si vous voulez, puis vous l&apos;envoyez vous-même.
        </SectionHeading>
      </div>

      <div
        ref={ref}
        data-joue={vu ? "oui" : "non"}
        className="ruban monte mt-12"
        role="group"
        aria-label="Exemples de messages écrits par Terouva"
      >
        <div className="ruban-piste">
          <ul className="ruban-jeu">
            {MESSAGES.map((m) => (
              <Fiche key={m.annonce} message={m} />
            ))}
          </ul>
          {/* Deuxième jeu : il n'existe que pour que la boucle soit continue. */}
          <ul className="ruban-jeu ruban-double" aria-hidden>
            {MESSAGES.map((m) => (
              <Fiche key={`bis-${m.annonce}`} message={m} />
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl px-4 text-center text-sm text-ink-3 sm:px-6">
        Six brouillons, écrits par Terouva pour les annonces d&apos;exemple. Aucun n&apos;est
        envoyé sans vous.
      </p>
    </section>
  );
}

function Fiche({ message }: { message: MessageExemple }) {
  return (
    <li className="ruban-fiche card-soft flex flex-col p-5">
      <div className="flex items-start justify-between gap-3 border-b border-rule pb-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{message.annonce}</p>
          <p className="tabular mt-0.5 text-[13px] text-ink-3">
            {message.lieu} · {message.prix} €
          </p>
        </div>
        <p className="tabular display shrink-0 text-xl text-ink-2">{message.note}</p>
      </div>

      <p className="ruban-texte mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink-2">
        {message.texte}
      </p>

      <p className="mt-3 shrink-0 text-[12px] font-bold tracking-[0.08em] text-accent-ink uppercase">
        Ton {message.ton.toLowerCase()}
      </p>
    </li>
  );
}
