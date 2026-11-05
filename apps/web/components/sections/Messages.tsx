"use client";

import { useEffect, useRef, useState } from "react";
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
 * Pôle Design, 5 novembre : les fiches deviennent des lettres. Papier chaud
 * dans la nuit (`.monde-papier`), le seul objet papier de l'accueil, parce
 * qu'un message se lit ; signées en Fraunces italique, au nom de l'expéditeur.
 * Le ruban n'en montre que l'accroche. Un clic ouvre la lettre entière dans un
 * panneau de lecture (dialog natif : focus piégé, Échap ferme), ce qui donne
 * le message complet sans transformer la section en mur de texte.
 */
export function Messages() {
  const { ref, vu } = useEnVue<HTMLDivElement>({ une: false, marge: "200px" });
  const [ouvert, setOuvert] = useState<number | null>(null);

  return (
    <section id="messages" className="py-pas">
      <div className="grille">
        <div className="col-span-12 md:col-span-6 md:col-start-5">
          <h2 className="titre text-titre-2 text-ink">Un message qui donne envie de vous répondre.</h2>
          <p className="mt-5 max-w-[34rem] leading-relaxed text-ink-2">
            Qui vous êtes, vos revenus, votre garant, quand vous pouvez visiter : tout ce que le
            propriétaire veut savoir, en quelques lignes.
          </p>
        </div>
      </div>

      <Mosaique
        refExterne={ref}
        joue={vu && ouvert === null}
        ariaLabel="Exemples de messages écrits par Terouva"
        className="mt-12"
        tuiles={MESSAGES.map((m, i) => (
          <Lettre key={m.annonce} message={m} rang={i} ouvrir={() => setOuvert(i)} />
        ))}
      />

      <Lecture message={ouvert === null ? null : MESSAGES[ouvert]} fermer={() => setOuvert(null)} />
    </section>
  );
}

/** « Cordialement,\nCamille Martin\n06… » : le nom est la ligne qui suit la formule. */
function expediteur(texte: string) {
  const dernier = texte.split("\n\n").at(-1) ?? "";
  return dernier.split("\n")[1] ?? "";
}

function Lettre({ message, rang, ouvrir }: { message: MessageExemple; rang: number; ouvrir: () => void }) {
  const bouton = useRef<HTMLButtonElement>(null);

  // La coquille rend les tuiles deux fois pour boucler ; le second jeu est
  // `aria-hidden` et ne doit pas recevoir le focus clavier.
  useEffect(() => {
    if (bouton.current?.closest(".ruban-double")) bouton.current.tabIndex = -1;
  }, []);

  const nom = expediteur(message.texte);
  return (
    <li className="ruban-fiche lettre monde-papier" style={gabarit(rang)}>
      <button
        ref={bouton}
        type="button"
        onClick={ouvrir}
        aria-haspopup="dialog"
        aria-label={`Lire le message de ${nom}`}
        className="lettre-feuille flex size-full flex-col p-5 text-left"
      >
        <span className="flex items-baseline justify-between gap-3 border-b border-rule pb-3">
          <span className="truncate font-serif text-[19px] italic text-ink">{nom}</span>
          <span className="shrink-0 text-[12px] text-ink-3">Ton {message.ton.toLowerCase()}</span>
        </span>

        <span className="ruban-texte mt-4 block text-[14px] leading-relaxed whitespace-pre-line text-ink-2">
          {message.texte}
        </span>

        <span className="mt-3 flex shrink-0 items-center justify-between gap-3 text-[12px] text-ink-3">
          <span className="truncate">Pour « {message.annonce} »</span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="tabular">{message.note}/100</span>
            {/* Le signe « ouvrir en grand » : sur mobile, sans survol, c'est lui qui dit que la lettre s'ouvre. */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lettre-ouvrir size-4" aria-hidden>
              <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
            </svg>
          </span>
        </span>
      </button>
    </li>
  );
}

/**
 * Le panneau de lecture : la lettre entière, posée sur la nuit. `showModal`
 * donne le piège à focus, Échap et l'arrière-plan inerte sans code de plus ;
 * un clic hors de la feuille ferme aussi.
 */
function Lecture({ message, fermer }: { message: MessageExemple | null; fermer: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (message && !d.open) d.showModal();
    if (!message && d.open) d.close();
  }, [message]);

  return (
    <dialog
      ref={ref}
      onClose={fermer}
      onClick={(e) => e.target === e.currentTarget && fermer()}
      aria-labelledby="lecture-nom"
      className="lecture"
    >
      {message && (
        <div className="lecture-feuille monde-papier">
          <div className="flex items-start justify-between gap-4 border-b border-rule pb-4">
            <div className="min-w-0">
              <p id="lecture-nom" className="font-serif text-[24px] leading-tight italic text-ink">
                {expediteur(message.texte)}
              </p>
              <p className="mt-1 text-[13px] text-ink-3">
                Ton {message.ton.toLowerCase()} · Pour « {message.annonce} » · <span className="tabular">{message.note}/100</span>
              </p>
            </div>
            <button type="button" onClick={fermer} aria-label="Fermer" className="lecture-fermer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="size-5" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <p className="mt-5 text-[16px] leading-[1.7] whitespace-pre-line text-ink">{message.texte}</p>
        </div>
      )}
    </dialog>
  );
}
