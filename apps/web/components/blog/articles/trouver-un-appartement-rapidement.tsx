import Link from "next/link";

/**
 * Corps de l'article « comment trouver un appartement rapidement » (brief :
 * docs/seo/blog/briefs/trouver-un-appartement-rapidement.md).
 *
 * Un plan d'action dans l'ordre où il se joue, qui renvoie aux guides pour le
 * détail. Aucun délai moyen ni nombre de candidats : il n'en existe pas de
 * source publique. Faits : F1169, F33453, R51424, F34092.
 */
export default function TrouverUnAppartementRapidement() {
  return (
    <>
      <p>
        Chercher vite, c&apos;est surtout être prêt avant que l&apos;annonce paraisse. La plupart
        des conseils parlent d&apos;alertes et de réactivité, et ils ont raison. Ce qui fait gagner
        des jours se règle pourtant avant : le dossier, le garant, le message. Voici les gestes dans
        l&apos;ordre où ils comptent.
      </p>

      <h2 id="commencer">Par quoi commencer pour trouver vite ?</h2>
      <p>
        Par le dossier, avant de regarder la moindre annonce. Réunissez les pièces que le
        propriétaire a le droit de demander : une pièce d&apos;identité, un justificatif de
        domicile, des justificatifs d&apos;activité et de ressources. La liste est fixée par décret
        et elle est limitative ; la{" "}
        <Link href="/outils/dossier-de-location">checklist du dossier de location</Link> vous donne
        celles de votre situation en trois questions.
      </p>
      <p>
        Mettez-les dans un seul fichier, ou passez par{" "}
        <a href="https://www.dossierfacile.logement.gouv.fr/" target="_blank" rel="noopener">
          DossierFacile
        </a>
        , le service public gratuit qui vérifie que votre dossier est complet et vous donne un lien à
        envoyer. Le jour où le bon logement paraît, vous n&apos;aurez rien à chercher.
      </p>

      <h2 id="garant">Comment régler la question du garant avant de chercher ?</h2>
      <p>
        Si un proche peut se porter caution, réunissez aussi ses justificatifs dès maintenant. Sinon,
        regardez la garantie Visale : elle est gratuite, et elle se demande avant d&apos;avoir trouvé
        le logement. Service-public indique que le visa est délivré en quelques jours ouvrés. Vous
        arrivez alors avec la réponse à la question du garant, au lieu de la chercher entre la visite
        et la signature. Les autres solutions sont dans le guide{" "}
        <Link href="/guides/louer-sans-garant">louer sans garant</Link>.
      </p>

      <h2 id="repondre">Comment répondre plus vite que les autres ?</h2>
      <p>
        En n&apos;écrivant plus votre message au moment où l&apos;annonce tombe. Préparez un texte
        qui donne les informations qui servent au tri (métier et contrat, revenu, garant, nombre
        d&apos;occupants, date d&apos;arrivée, durée), et gardez seulement une phrase à adapter à
        chaque logement. Le guide{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        détaille ce message, et le{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>{" "}
        l&apos;écrit avec vous.
      </p>
      <p>
        Activez ensuite les alertes des sites d&apos;annonces que vous utilisez, avec des
        notifications sur votre téléphone. Une alerte reçue le soir ne sert à rien si vous ne
        pouvez répondre que le lendemain : c&apos;est le message prêt qui transforme l&apos;alerte
        en réponse.
      </p>

      <h2 id="criteres">Faut-il élargir ses critères ?</h2>
      <p>
        Souvent, oui. Une alerte trop précise ne se déclenche presque jamais. Distinguez ce qui est
        indispensable (budget, temps de trajet, nombre de pièces) de ce qui est souhaitable (étage,
        balcon, quartier exact), et ne filtrez que sur le premier. Un quartier voisin ou un
        logement un peu plus petit élargit beaucoup le choix, sans changer votre quotidien.
      </p>

      <h2 id="arnaques">Comment éviter les fausses annonces quand on est pressé ?</h2>
      <p>
        L&apos;urgence est ce que cherchent les auteurs de fausses annonces. Service-public en liste
        les signes : un loyer très bas pour la surface, des photos vues dans une autre annonce, un
        propriétaire qui refuse de vous rencontrer, une demande d&apos;argent avant la signature du
        bail, ou de documents officiels comme la carte d&apos;identité avant la visite. Retenez une
        règle : aucune somme ne peut vous être demandée avant la signature du bail.
      </p>
      <p>
        Une annonce suspecte peut être signalée sur la plateforme officielle THESEE, dont la{" "}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/F34092"
          target="_blank"
          rel="noopener"
        >
          fiche de Service-public sur les arnaques à la location
        </a>{" "}
        explique les conditions.
      </p>

      <h2 id="urgence">Et si rien n&apos;est trouvé à la date voulue ?</h2>
      <p>
        Prévoyez une solution d&apos;attente plutôt que d&apos;accepter n&apos;importe quel bail :
        un hébergement chez un proche, une location meublée de courte durée, une colocation le temps
        de chercher. Un logement signé dans la précipitation se quitte avec un préavis, et
        l&apos;adresse provisoire vous laisse le temps de bien choisir le suivant.
      </p>
      <p>
        Terouva fait la veille à votre place : il vous signale les annonces qui correspondent à
        votre recherche dès qu&apos;elles paraissent, et prépare votre réponse. Vous la relisez et
        vous l&apos;envoyez vous-même.{" "}
        <a href="#prevenu" className="lien">
          Être prévenu du lancement
        </a>
      </p>
    </>
  );
}
