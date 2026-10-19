import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/preavis-location");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
});

export default function GuidePreavisLocation() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        Partir d&apos;un logement se prépare deux à trois mois à l&apos;avance, et la plupart des
        erreurs coûtent exactement deux mois de loyer. Elles tiennent toutes à la même chose : une
        lettre envoyée trop tard, ou qui ne dit pas ce qu&apos;elle devait dire.
      </p>

      <h2 id="duree">La durée du préavis</h2>
      <ul>
        <li>
          <strong>Logement meublé</strong> : un mois, dans tous les cas, sans motif ni justificatif
          à fournir. Y compris pour un bail étudiant de neuf mois.
        </li>
        <li>
          <strong>Logement vide</strong> : trois mois par défaut, réduits à un mois dans une
          dizaine de situations.
        </li>
      </ul>
      <p>
        Aucun motif n&apos;a à être donné si vous acceptez le délai de trois mois. Le motif ne sert
        qu&apos;à obtenir le délai réduit.
      </p>

      <h2 id="reduit">Passer de trois mois à un mois</h2>
      <p>
        Le préavis réduit n&apos;est <strong>jamais automatique</strong>. Il faut l&apos;invoquer
        dans la lettre et joindre le justificatif. Les situations qui l&apos;ouvrent :
      </p>
      <ul>
        <li>le logement se situe en <strong>zone tendue</strong> ;</li>
        <li>un <strong>logement social</strong> vous a été attribué ;</li>
        <li>vous percevez le <strong>RSA</strong> ou l&apos;<strong>AAH</strong> (y avoir droit sans les percevoir ne suffit pas) ;</li>
        <li>
          votre <strong>état de santé</strong> rend le logement inadapté, justifié par un
          certificat médical ;
        </li>
        <li>
          vous êtes victime de <strong>violences</strong> de la part du conjoint, partenaire ou
          concubin, ou sur l&apos;enfant qui vit avec vous ;
        </li>
        <li>vous obtenez un <strong>premier emploi</strong> ;</li>
        <li>vous êtes muté, salarié ou fonctionnaire (<strong>changement de lieu de travail</strong>) ;</li>
        <li>
          vous avez <strong>perdu votre emploi</strong> : licenciement, rupture conventionnelle,
          fin de CDD ;
        </li>
        <li>
          vous retrouvez un <strong>nouvel emploi</strong> après une perte d&apos;emploi survenue
          pendant le même bail.
        </li>
      </ul>
      <p>
        Ne l&apos;ouvrent pas, malgré l&apos;idée reçue : la démission, le départ à la retraite, la
        fin des droits au chômage, l&apos;arrêt d&apos;une activité indépendante. Dans ces cas, le
        préavis reste de trois mois.
      </p>
      <div className="note">
        <p>
          Une lettre qui ne mentionne pas le motif vaut préavis de <strong>trois mois</strong>,
          même si vous remplissiez la condition au moment de l&apos;envoi. C&apos;est l&apos;erreur
          la plus fréquente et la plus chère du sujet : deux mois de loyer pour une phrase
          manquante.
        </p>
      </div>

      <h2 id="zone-tendue">La zone tendue</h2>
      <p>
        C&apos;est le motif le plus utilisé, et celui sur lequel on se trompe le plus, parce que la
        liste des communes concernées est fixée par décret et <strong>elle change</strong>. Elle a
        encore été revue fin 2025.
      </p>
      <p>
        Ne vous fiez pas à une liste recopiée sur un blog :{" "}
        <a
          href="https://www.service-public.gouv.fr/simulateur/calcul/zones-tendues"
          target="_blank"
          rel="noopener"
        >
          le simulateur officiel
        </a>{" "}
        répond pour votre commune. Vérifiez à la date de signature ou de renouvellement de votre
        bail, pas à celle du jour.
      </p>
      <p>
        Dans la lettre, mentionnez l&apos;adresse du logement et le bénéfice du délai réduit, avec
        le renvoi à l&apos;article 15 de la loi du 6 juillet 1989, et joignez le justificatif.
      </p>

      <h2 id="lettre">La lettre de congé</h2>
      <p>Elle contient :</p>
      <ul>
        <li>votre identité et l&apos;adresse du logement que vous quittez ;</li>
        <li>la volonté claire de donner congé, et la date de départ qui en découle ;</li>
        <li>
          si vous demandez le délai réduit : le motif invoqué, le renvoi à l&apos;article 15 de la
          loi du 6 juillet 1989, et la pièce justificative jointe.
        </li>
      </ul>
      <p>
        Trois modes de remise sont valables, et <strong>trois seulement</strong> :
      </p>
      <ul>
        <li>la lettre recommandée avec avis de réception ;</li>
        <li>l&apos;acte de commissaire de justice ;</li>
        <li>la remise en main propre contre émargement ou récépissé signé.</li>
      </ul>
      <p>
        <strong>Un simple courriel n&apos;est pas valable.</strong> La lettre recommandée
        électronique l&apos;est, mais uniquement si le propriétaire particulier a donné son accord
        préalable, qu&apos;il faut lui demander par écrit en lui laissant quinze jours pour
        répondre.
      </p>

      <h2 id="depart">Quand le préavis commence vraiment</h2>
      <p>
        <strong>À la réception, pas à l&apos;envoi.</strong> Pour une lettre recommandée, le délai
        court du jour où le propriétaire la reçoit. Si le courrier revient sans avoir été remis, le
        congé n&apos;est pas valable du tout, et vous recommencez.
      </p>
      <p>
        Pour un acte de commissaire de justice, c&apos;est le jour de la signification ; pour une
        remise en main propre, le jour de la remise.
      </p>
      <p>
        Le calcul est de date à date : un congé reçu le 5 septembre expire le 5 octobre à minuit
        pour un mois, le 5 décembre pour trois mois. Si le jour n&apos;existe pas dans le mois
        d&apos;échéance, le préavis expire le dernier jour de ce mois. Week-ends et jours fériés
        comptent.
      </p>
      <p>
        Conséquence pratique : comptez quelques jours d&apos;acheminement dans votre calendrier.
        Une lettre postée le 30 pour un départ calculé depuis le 30 vous fait perdre une semaine.
      </p>

      <h2 id="loyer">Le loyer pendant le préavis</h2>
      <p>
        Loyer et charges sont dus pendant toute la durée du préavis, <strong>même si vous avez déjà
        déménagé</strong>. Ils cessent si un nouveau locataire entre dans les lieux avant la fin.
      </p>
      <ul>
        <li>Un mois entamé se paie au prorata du nombre de jours d&apos;occupation.</li>
        <li>
          Le <Link href="/guides/depot-de-garantie">dépôt de garantie</Link> ne peut pas servir à
          régler ce dernier loyer : il doit être payé normalement et vous être restitué ensuite.
        </li>
        <li>
          Si vous rendez les clés en avance et que le propriétaire reloue ou engage de lourds
          travaux, le préavis peut être réduit d&apos;autant.
        </li>
      </ul>

      <h2 id="erreurs">Les erreurs qui coûtent deux mois</h2>
      <ol>
        <li>
          <strong>Ne pas mentionner le motif du délai réduit.</strong> Le préavis passe à trois
          mois, sans recours.
        </li>
        <li>
          <strong>Compter depuis la date d&apos;envoi.</strong> Le préavis part de la réception, et
          l&apos;écart se paie en jours de loyer.
        </li>
        <li>
          <strong>Envoyer un courriel.</strong> Il ne vaut rien, et le temps perdu ne se rattrape
          pas.
        </li>
        <li>
          <strong>Donner congé avant d&apos;avoir une solution ferme.</strong> Le congé est{" "}
          <strong>irrévocable</strong> une fois reçu, sauf accord du propriétaire.
        </li>
        <li>
          <strong>Partir sans état des lieux de sortie.</strong> Voir le guide de l&apos;
          <Link href="/guides/etat-des-lieux">état des lieux</Link> : c&apos;est lui qui décide de
          ce qu&apos;on vous retiendra.
        </li>
      </ol>

      <h2 id="ensuite">Pendant les trois mois</h2>
      <p>
        C&apos;est le moment où la recherche du logement suivant commence vraiment, et où le temps
        manque. Le{" "}
        <Link href="/outils/dossier-de-location">dossier se prépare d&apos;abord</Link>, la
        question du <Link href="/guides/louer-sans-garant">garant</Link> se règle ensuite, et le{" "}
        <Link href="/outils/message-de-candidature">message de candidature</Link> s&apos;écrit une
        fois pour toutes, pour être envoyé dans l&apos;heure qui suit une annonce.
      </p>
    </CadreGuide>
  );
}
