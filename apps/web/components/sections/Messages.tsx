"use client";

import Link from "next/link";
import { MESSAGES, type MessageExemple } from "@/lib/exemples";
import { Mosaique, gabarit } from "@/components/layout/coquilles/Mosaique";
import { useEnVue } from "@/components/ui/useEnVue";

/**
 * Les messages que Terouva écrit, coquille E : la mosaïque défilante.
 *
 * Ce ne sont pas des avis de clients : le produit n'est pas sorti, et inventer
 * des témoignages tromperait les visiteurs. Ce sont les brouillons produits par
 * le moteur pour six profils, recopiés tels quels. On montre le travail, pas
 * un compliment.
 *
 * Les fiches : fond papier teinté, un filet, aucun arrondi, aucune ombre, le
 * nom de l'expéditeur en `.champ`, le message en Archivo 400. Hauteurs et
 * largeurs inégales d'une fiche à l'autre, par le gabarit de la coquille.
 */
export function Messages() {
  const { ref, vu } = useEnVue<HTMLDivElement>({ une: false, marge: "200px" });

  return (
    <section id="messages" className="py-pas">
      <div className="grille">
        <div className="col-span-12 md:col-span-6 md:col-start-5">
          <p className="mention">Le message</p>
          <h2 className="titre mt-3 text-titre-2 text-ink">Un message qui donne envie de vous répondre.</h2>
          <p className="mt-5 max-w-[34rem] leading-relaxed text-ink-2">
            Qui vous êtes, votre dossier, votre date d&apos;entrée, quand vous pouvez visiter : ce
            que le propriétaire cherche, dans le ton de votre choix.
          </p>
        </div>
      </div>

      <Mosaique
        refExterne={ref}
        joue={vu}
        ariaLabel="Exemples de messages écrits par Terouva"
        className="mt-12"
        tuiles={MESSAGES.map((m, i) => (
          <Fiche key={m.annonce} message={m} rang={i} />
        ))}
      />

      <div className="grille mt-8">
        <div className="col-span-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 md:col-span-6 md:col-start-5">
          <p className="marge">
            Six messages écrits par Terouva pour les annonces d&apos;exemple.
          </p>
          <Link href="/outils/message-de-candidature" className="lien text-[15px]">
            Écrire le vôtre, gratuitement
          </Link>
        </div>
      </div>
    </section>
  );
}

function Fiche({ message, rang }: { message: MessageExemple; rang: number }) {
  const [, ...corps] = message.texte.split("\n\n");
  const signature = corps.at(-1)?.split("\n")[0] ?? "";
  return (
    <li className="ruban-fiche flex flex-col border border-rule bg-paper-2 p-5" style={gabarit(rang)}>
      <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-3">
        <p className="champ truncate text-ink">{signature}</p>
        <p className="champ shrink-0 text-ink-3">Ton {message.ton.toLowerCase()}</p>
      </div>

      <p className="ruban-texte mt-4 text-[14px] leading-relaxed whitespace-pre-line text-ink-2">
        {message.texte}
      </p>

      <p className="champ mt-3 shrink-0 text-ink-3">
        Pour « {message.annonce} » · {message.note}/100
      </p>
    </li>
  );
}
