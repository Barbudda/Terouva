import type { CSSProperties } from "react";
import Image from "next/image";
import { PROBLEM } from "@/lib/content";
import { cn } from "@/lib/utils";
import { TempsCompteur } from "./TempsCompteur";

/** « Vous la découvrez le soir. » devient « …, vous la découvrez le soir. » */
const enSuite = (phrase: string) => phrase.charAt(0).toLowerCase() + phrase.slice(1);

/**
 * L'exemple de la scène de droite : une annonce inventée, signalée comme
 * telle (« Exemple »). Le nombre et les heures ne sont pas des faits : ils
 * illustrent ce que dit la phrase sourcée de gauche, une annonce prise
 * d'assaut et le premier message qui arrive avant les autres.
 */
const EXEMPLE = {
  site: { nom: "Leboncoin", icone: "/plateformes/leboncoin.png" },
  annonce: { titre: "T2 lumineux, 42 m²", lieu: "Lyon 7e", prix: "890 € / mois", publiee: "18:02" },
  candidatures: 230,
  file: [
    { qui: "Vous", heure: "18:04", texte: "Bonjour, votre T2 m'intéresse. Mon dossier est complet…", vous: true },
    { qui: "Autre candidat", heure: "18:21", texte: "Bonjour, toujours disponible ?" },
    { qui: "Autre candidat", heure: "18:47", texte: "Bonjour, est-il possible de visiter…" },
  ],
};

/**
 * Le temps gagné, en bande nuit (vague 2 du pôle Design, 15 novembre).
 *
 * Après un chiffre géant seul, Hugo a demandé deux colonnes. À gauche, tout le
 * texte de la section dans un grand cadre : « 2 sur 3 », sa phrase sourcée,
 * puis le gain du visiteur en orange. À droite, la même idée vue en vrai : une
 * annonce d'exemple dont les candidatures grimpent, et la file des messages où
 * le vôtre est arrivé premier. La scène est en verre (fond translucide, flou,
 * liseré clair en haut) posé sur une lueur bleue et orange, pour que le verre
 * ait quelque chose à réfracter.
 *
 * La scène est une illustration (`aria-hidden`) : le texte de gauche porte le
 * sens. Le chiffre géant seul est masqué aussi, le `h2` porte la phrase.
 */
export function Problem() {
  const { sans, avec } = PROBLEM.vie;
  return (
    <section id="gains" aria-labelledby="gains-titre" className="temps cadre scroll-mt-20 py-16 lg:py-24">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="temps-cadre">
          <p className="etiquette-section">{PROBLEM.eyebrow}</p>
          <p aria-hidden className="temps-chiffre monte mt-4">
            2<span className="temps-chiffre__sur">sur</span>3
          </p>
          <h2 id="gains-titre" className="temps-phrase monte mt-3 text-ink-2" style={{ "--decalage": 1 } as CSSProperties}>
            {PROBLEM.titreLead} {PROBLEM.titreTail}
          </h2>
          <p className="temps-sans monte mt-8 text-ink-3" style={{ "--decalage": 2 } as CSSProperties}>
            {sans.nom}, {enSuite(sans.titre)}
          </p>
          <p className="temps-gain monte mt-2" style={{ "--decalage": 3 } as CSSProperties}>
            {avec.nom}, {enSuite(avec.titre)}
          </p>
          {/* Le chiffre se vérifie en un clic : c'est ce qui le distingue d'une accroche. */}
          <a
            href={PROBLEM.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="lien mt-auto inline-block self-start pt-8 text-[14px] text-ink-2"
          >
            Source : {PROBLEM.source.label}
          </a>
        </div>

        <Scene />
      </div>
    </section>
  );
}

/** La scène en verre : l'annonce, son compteur, puis la file des messages. */
function Scene() {
  const { site, annonce, candidatures, file } = EXEMPLE;
  return (
    <div aria-hidden className="temps-scene">
      <div className="temps-verre">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2.5 text-[14px] font-semibold text-ink">
            <Image src={site.icone} alt="" width={28} height={28} className="size-7 rounded-lg" />
            {site.nom}
          </span>
          <span className="temps-exemple">Exemple</span>
        </div>

        <div className="temps-annonce mt-5">
          <div className="min-w-0">
            <p className="text-[17px] leading-snug font-bold text-ink">{annonce.titre}</p>
            <p className="mt-0.5 text-[14px] text-ink-2">
              {annonce.lieu} · {annonce.prix}
            </p>
            <p className="mt-0.5 text-[13px] text-ink-3">Publiée à {annonce.publiee}</p>
          </div>
          <p className="temps-compteur">
            <span className="temps-compteur__nombre">
              <TempsCompteur valeur={candidatures} />
            </span>
            <span className="text-[13px] text-ink-2">candidatures</span>
          </p>
        </div>

        <ol className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-2.5">
          {file.map((m, i) => (
            <li key={i} className={cn("temps-message", m.vous && "temps-message--vous")}>
              <span className="flex items-baseline justify-between gap-3">
                <span className={cn("text-[14px] font-bold", m.vous ? "text-action" : "text-ink-2")}>
                  {m.qui}
                  {m.vous && <span className="temps-premier">1er</span>}
                </span>
                <span className="text-[13px] tabular-nums text-ink-3">{m.heure}</span>
              </span>
              <span className="mt-1 block truncate text-[14px] text-ink-2">{m.texte}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
