import { OUTILS } from "@/lib/catalogue";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { cn } from "@/lib/utils";

/**
 * Les outils gratuits, sur la page d'accueil.
 *
 * Ils y ont leur place pour une raison simple : l'application n'est pas encore
 * téléchargeable, et un visiteur qui ne laisse pas son adresse repartait sans
 * rien. Ces deux pages rendent service tout de suite, elles se partagent, et
 * elles ramènent du monde en attendant le lancement.
 *
 * Deux outils, donc deux blocs larges, et non deux cartes côte à côte, la
 * composition de toutes les grilles de fonctionnalités. Chaque bloc montre ce
 * que l'outil **produit** : un extrait de message, un extrait de liste. Les
 * côtés s'inversent d'un bloc à l'autre, pour que la section ne répète ni le
 * hero ni la précédente.
 *
 * Les extraits sont réels. Le message est la sortie du moteur du produit pour
 * un profil d'exemple ; la liste reprend les catégories du décret du
 * 5 novembre 2015 et une pièce vérifiée dans chacune. Rien n'est écrit pour
 * faire joli.
 */

const MESSAGE_EXEMPLE = [
  "Bonjour,",
  "Votre annonce m'intéresse beaucoup, en particulier pour la lumière.",
  "Je suis en CDI. Mon dossier est complet.",
  "Je serais la seule personne à y vivre, et je peux emménager à partir du 1er décembre.",
];

const LISTE_EXEMPLE = [
  { categorie: "Identité", piece: "une pièce d'identité en cours de validité" },
  { categorie: "Domicile", piece: "la dernière quittance de loyer" },
  { categorie: "Situation", piece: "le contrat de travail ou une attestation" },
  { categorie: "Ressources", piece: "les trois derniers bulletins de salaire" },
];

export function Outils() {
  const [message, dossier] = [
    OUTILS.find((o) => o.chemin === "/outils/message-de-candidature"),
    OUTILS.find((o) => o.chemin === "/outils/dossier-de-location"),
  ];

  return (
    <section id="outils" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Gratuit, sans inscription"
          lead="En attendant,"
          tail="deux outils qui servent déjà."
          className="monte max-w-2xl"
        >
          Ils tournent dans votre navigateur. Pas de compte, pas de limite, et rien
          n&apos;est envoyé à un serveur.
        </SectionHeading>

        {message && (
          <Bloc
            titre={message.titre}
            resume={message.resume}
            href={message.chemin}
            action="Écrire mon message"
            cote="droite"
          >
            <div className="space-y-3 text-[15px] leading-relaxed text-ink-2">
              {MESSAGE_EXEMPLE.map((ligne) => (
                <p key={ligne}>{ligne}</p>
              ))}
              <p className="text-ink-3">…</p>
            </div>
          </Bloc>
        )}

        {dossier && (
          <Bloc
            titre={dossier.titre}
            resume={dossier.resume}
            href={dossier.chemin}
            action="Voir ma liste de pièces"
            cote="gauche"
          >
            <ul className="space-y-3 text-[15px] leading-relaxed">
              {LISTE_EXEMPLE.map((l) => (
                <li key={l.categorie} className="flex gap-3">
                  <span className="w-24 shrink-0 font-semibold text-ink">{l.categorie}</span>
                  <span className="text-ink-2">{l.piece}</span>
                </li>
              ))}
            </ul>
          </Bloc>
        )}
      </div>
    </section>
  );
}

/**
 * Un bloc : le texte d'un côté, ce que l'outil produit de l'autre. L'extrait
 * est tenu par un filet vertical, comme une citation, pas par un cadre.
 */
function Bloc({
  titre,
  resume,
  href,
  action,
  cote,
  children,
}: {
  titre: string;
  resume: string;
  href: string;
  action: string;
  cote: "gauche" | "droite";
  children: React.ReactNode;
}) {
  return (
    <article className="monte mt-14 grid items-center gap-8 border-t border-rule pt-10 md:grid-cols-12 md:gap-12">
      <div className={cn("md:col-span-5", cote === "gauche" && "md:order-2 md:col-start-8")}>
        <h3 className="display text-2xl text-ink">{titre}</h3>
        <p className="mt-3 leading-relaxed text-ink-2">{resume}</p>
        <LinkButton href={href} variant="lien" className="mt-5">
          {action}
        </LinkButton>
      </div>
      <figure
        aria-label="Exemple de ce que produit l'outil"
        className={cn(
          "border-l-2 border-rule pl-5 md:col-span-6 md:pl-7",
          cote === "gauche" ? "md:order-1 md:col-start-1" : "md:col-start-7",
        )}
      >
        {children}
      </figure>
    </article>
  );
}
