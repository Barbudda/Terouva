import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/garant-caution");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
});

export default function GuideGarantCaution() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        « Avez-vous un garant ? » arrive presque toujours avant la visite. Le garant, ou{" "}
        <strong>caution</strong>, est la personne qui s&apos;engage par écrit à payer vos dettes
        locatives si vous ne les payez pas : loyer, charges, intérêts de retard et réparations
        locatives. Beaucoup le signent comme une pièce de dossier parmi d&apos;autres, alors que
        l&apos;engagement peut survivre de plusieurs mois à votre départ du logement.
      </p>

      <h2 id="qui">Qui peut se porter garant</h2>
      <p>
        N&apos;importe quelle <strong>personne physique</strong>, sans condition de lien de famille :
        un parent, un proche, un ami. Aucune règle n&apos;impose qu&apos;il soit propriétaire, ni
        qu&apos;il habite la même région, même si beaucoup d&apos;annonces le réclament.
      </p>
      <p>
        Ou une <strong>personne morale</strong> : Action Logement par la{" "}
        <Link href="/guides/garantie-visale">garantie Visale</Link>, un employeur, une banque. Pour
        qui n&apos;a personne à solliciter, Visale est la voie la plus courante, et elle se demande
        avant d&apos;avoir trouvé le logement.
      </p>

      <h2 id="simple-ou-solidaire">Caution simple ou caution solidaire</h2>
      <p>
        C&apos;est la distinction la plus lourde de conséquences, et elle tient en une ligne dans
        l&apos;acte. Le type choisi doit y figurer.
      </p>
      <ul>
        <li>
          <strong>Caution simple</strong> : le propriétaire doit d&apos;abord réclamer la somme au
          locataire, par un commandement de payer. Le commissaire de justice doit en adresser une
          copie à la caution ; sans cette copie, la caution n&apos;est pas tenue des intérêts de
          retard.
        </li>
        <li>
          <strong>Caution solidaire</strong> : le propriétaire peut se tourner vers la caution dès
          le premier impayé, sans passer par le locataire. C&apos;est la formule que demandent la
          plupart des bailleurs.
        </li>
      </ul>
      <p>
        Dans les deux cas, le propriétaire dispose de <strong>trois ans</strong> pour réclamer les
        loyers et charges impayés.
      </p>

      <h2 id="acte">L&apos;acte de cautionnement</h2>
      <p>
        Il doit être <strong>écrit</strong>, sous seing privé ou devant notaire, et signé par la
        caution. Le propriétaire doit en remettre un exemplaire au garant, sauf si l&apos;acte est
        intégré au bail. Ce qu&apos;il contient :
      </p>
      <ul>
        <li>le montant du loyer, en lettres et en chiffres, et ses conditions de révision ;</li>
        <li>s&apos;il s&apos;agit d&apos;une caution simple ou solidaire ;</li>
        <li>
          la reconnaissance, par la caution, de l&apos;avant-dernier alinéa de l&apos;article 22-1
          de la loi du 6 juillet 1989 et de l&apos;article 2297 du Code civil ;
        </li>
        <li>
          en colocation, le nom du colocataire dont le départ mettra fin à l&apos;engagement du
          garant.
        </li>
      </ul>
      <p>
        L&apos;acte indique aussi si l&apos;engagement est à <strong>durée déterminée</strong> ou{" "}
        <strong>indéterminée</strong>, et il est d&apos;usage d&apos;y plafonner le montant garanti.
        Ces deux lignes décident de tout ce qui suit.
      </p>
      <div className="note">
        <p>
          La mention manuscrite que l&apos;on voit souvent recopiée sur les forums concerne le
          cautionnement d&apos;un crédit à la consommation, pas celui d&apos;une location. Ce qui
          compte ici, ce sont les mentions ci-dessus et la signature.
        </p>
      </div>

      <h2 id="justificatifs">Les justificatifs du garant</h2>
      <p>
        La liste est fixée par le décret du 5 novembre 2015, elle est <strong>limitative</strong>,
        et elle n&apos;est pas la même que celle du locataire. Pour une caution personne physique :
      </p>
      <ul>
        <li>
          <strong>Identité</strong> : une pièce en cours de validité, carte d&apos;identité,
          passeport ou permis de conduire.
        </li>
        <li>
          <strong>Domicile</strong> : un seul justificatif, au choix entre la dernière quittance de
          loyer, une facture d&apos;eau, de gaz ou d&apos;électricité de moins de trois mois, une
          attestation d&apos;assurance logement de moins de trois mois, le dernier avis de taxe
          foncière ou le titre de propriété de la résidence principale.
        </li>
        <li>
          <strong>Situation professionnelle</strong> : contrat de travail ou attestation de
          l&apos;employeur, carte professionnelle, certificat d&apos;identification Insee, extrait
          D1 ou K bis de moins de trois mois selon l&apos;activité.
        </li>
        <li>
          <strong>Ressources</strong> : trois derniers bulletins de salaire, deux derniers bilans,
          justificatif de pensions ou de prestations, avis d&apos;imposition ou de non-imposition,
          titre de propriété, revenus fonciers.
        </li>
      </ul>
      <p>
        Pour une caution personne morale, deux pièces seulement : un extrait K bis original de moins
        de trois mois, ou les statuts, et une pièce d&apos;identité du représentant.
      </p>
      <p>
        Tout ce qui sort de cette liste peut être refusé. Les pièces interdites, la sanction
        encourue et la façon de les décliner sans perdre le logement sont détaillées dans le guide
        du <Link href="/guides/dossier-de-location">dossier de location</Link>.
      </p>

      <h2 id="cumul">Garant et assurance loyers impayés</h2>
      <p>Un propriétaire ne peut pas toujours cumuler les deux :</p>
      <ul>
        <li>
          <strong>Propriétaire particulier</strong> déjà couvert par une assurance contre les
          risques locatifs : il ne peut demander une caution que si le locataire est{" "}
          <strong>étudiant ou apprenti</strong>.
        </li>
        <li>
          <strong>Bailleur personne morale</strong> : il ne peut pas demander de caution à un
          étudiant boursier de l&apos;enseignement supérieur. L&apos;interdiction ne vaut pas pour
          une société civile familiale.
        </li>
      </ul>

      <h2 id="fin">Jusqu&apos;à quand il s&apos;engage</h2>
      <ul>
        <li>
          <strong>Vous partez</strong> : l&apos;engagement prend fin à l&apos;expiration de votre
          préavis.
        </li>
        <li>
          <strong>Le propriétaire donne congé</strong> : il prend fin à l&apos;expiration du bail.
        </li>
        <li>
          <strong>Engagement à durée déterminée</strong> : la caution ne peut pas y mettre fin plus
          tôt.
        </li>
        <li>
          <strong>Engagement à durée indéterminée</strong> : la caution peut résilier à tout moment
          par lettre recommandée, mais la résiliation ne prend effet qu&apos;à l&apos;expiration du
          bail en cours. Elle reste tenue des dettes nées pendant ce bail.
        </li>
        <li>
          <strong>Décès de la caution</strong> : si l&apos;acte ne prévoit rien, l&apos;engagement
          passe aux héritiers pour les dettes nées avant le décès.
        </li>
      </ul>
      <p>
        En <strong>colocation avec clause de solidarité</strong>, l&apos;engagement du colocataire
        qui part, et celui de son garant, se prolongent <strong>six mois</strong> après la fin de
        son préavis. Si un remplaçant est inscrit au bail pendant le préavis, il s&apos;arrête à la
        fin de ce préavis. Sans clause de solidarité, chacun ne doit que sa part.
      </p>

      <h2 id="sans-garant">Louer sans garant</h2>
      <p>
        Ne pas avoir de proche à solliciter est le cas le plus fréquent une fois passé le premier
        logement, et ce n&apos;est pas une impasse : <strong>aucune loi n&apos;oblige à fournir un
        garant</strong>. C&apos;est le propriétaire qui décide d&apos;en demander un, et trois
        voies permettent de répondre à sa place.
      </p>
      <h3>La garantie Visale</h3>
      <p>
        Gratuite, portée par Action Logement, et c&apos;est la seule qui se demande{" "}
        <strong>avant</strong> d&apos;avoir trouvé le logement : vous arrivez à la visite avec le
        visa en main, ce qui change l&apos;ordre de la conversation. Les conditions dépendent de
        l&apos;âge, du statut et du loyer ; le détail est dans le guide de la{" "}
        <Link href="/guides/garantie-visale">garantie Visale</Link>.
      </p>
      <h3>L&apos;assurance du propriétaire</h3>
      <p>
        Un propriétaire particulier qui souscrit une assurance contre les loyers impayés{" "}
        <strong>ne peut plus exiger de caution</strong>, sauf d&apos;un étudiant ou d&apos;un
        apprenti. Cela se dit : « si vous êtes assuré contre les impayés, mon dossier tient sans
        garant ». Beaucoup de bailleurs demandent les deux par habitude, sans savoir que le cumul
        leur est interdit.
      </p>
      <h3>Une société de cautionnement</h3>
      <p>
        Des sociétés privées se portent garant à la place d&apos;un proche, contre un pourcentage
        du loyer annuel. C&apos;est payant et le coût court sur toute la durée du bail : à
        regarder quand Visale ne s&apos;applique pas, pas en premier réflexe.
      </p>
      <div className="note">
        <p>
          Un dernier point, rarement dit : le <strong>lieu de résidence du garant est un critère
          protégé</strong>. Écarter un dossier parce que la caution habite une autre région, ou une
          commune jugée indésirable, est une discrimination. Le{" "}
          <Link href="/guides/refus-de-dossier">guide sur le refus de dossier</Link> détaille ce
          qui est interdit et comment le prouver.
        </p>
      </div>
      <p>
        Et quand le dossier est prêt, c&apos;est le premier message qui décide de la visite. La{" "}
        <Link href="/outils/dossier-de-location">checklist</Link> liste les pièces de votre
        situation et de celle de votre garant, le{" "}
        <Link href="/outils/message-de-candidature">générateur de message</Link> écrit la
        candidature, et le guide{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        explique ce qui s&apos;y joue.
      </p>
    </CadreGuide>
  );
}
