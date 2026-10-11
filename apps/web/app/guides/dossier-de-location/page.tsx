import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/dossier-de-location");

export const metadata = pageMetadata({
  titre: GUIDE.titre,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
});

export default function GuideDossier() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        Quand on cherche un logement, on finit par envoyer son dossier sans trop regarder ce
        qu&apos;on y met. C&apos;est une erreur : la liste des pièces qu&apos;un propriétaire peut
        exiger est fixée par un décret, elle est <strong>limitative</strong>, et tout ce qui
        n&apos;y figure pas est interdit. Le savoir sert deux fois. Vous préparez un dossier
        complet du premier coup, et vous reconnaissez les demandes abusives.
      </p>

      <h2 id="ce-qui-peut-etre-demande">Ce qu&apos;un propriétaire peut demander</h2>
      <p>
        Les pièces se rangent en quatre catégories. Dans deux d&apos;entre elles, le propriétaire ne
        peut réclamer qu&apos;un seul document.
      </p>

      <h3>1. Votre identité : une seule pièce</h3>
      <p>
        Une pièce d&apos;identité en cours de validité : carte nationale d&apos;identité, passeport,
        ou permis de conduire français ou étranger avec photographie. Une carte de séjour
        temporaire, une carte de résident ou une carte de ressortissant d&apos;un État de
        l&apos;Union européenne ou de l&apos;Espace économique européen conviennent également.
      </p>

      <h3>2. Votre domicile actuel : un seul justificatif</h3>
      <ul>
        <li>Les trois dernières quittances de loyer, ou une attestation du précédent propriétaire.</li>
        <li>Une attestation sur l&apos;honneur de la personne qui vous héberge.</li>
        <li>Une attestation d&apos;élection de domicile.</li>
        <li>Le dernier avis de taxe foncière, ou le titre de propriété de votre résidence principale.</li>
      </ul>

      <h3>3. Votre activité professionnelle : un ou plusieurs documents</h3>
      <ul>
        <li>Le contrat de travail ou de stage, ou une attestation de l&apos;employeur.</li>
        <li>Un extrait K ou K bis de moins de trois mois, pour une entreprise commerciale.</li>
        <li>
          Une fiche d&apos;immatriculation au Registre national des entreprises de moins de trois
          mois, pour un artisan.
        </li>
        <li>La copie du certificat d&apos;identification de l&apos;Insee, pour un travailleur indépendant.</li>
        <li>La copie de la carte professionnelle, pour une profession libérale.</li>
        <li>La carte d&apos;étudiant ou le certificat de scolarité de l&apos;année en cours.</li>
        <li>Dans les autres cas, tout document récent attestant de l&apos;activité.</li>
      </ul>

      <h3>4. Vos ressources : un ou plusieurs documents</h3>
      <ul>
        <li>Le dernier ou l&apos;avant-dernier avis d&apos;imposition ou de non-imposition.</li>
        <li>Les trois dernières fiches de paie.</li>
        <li>Les deux derniers bilans, pour un professionnel non salarié.</li>
        <li>
          La justification du versement d&apos;indemnités, retraites, pensions ou prestations
          sociales des trois derniers mois, ou de l&apos;ouverture des droits.
        </li>
        <li>Un titre de propriété immobilière, ou le dernier avis de taxe foncière.</li>
        <li>
          La justification de revenus fonciers, de rentes viagères ou de revenus de valeurs et
          capitaux mobiliers.
        </li>
        <li>
          Une attestation de simulation d&apos;aide au logement, établie par la Caf, la MSA ou par
          vous-même.
        </li>
        <li>La justification du versement d&apos;indemnités de stage.</li>
        <li>L&apos;avis d&apos;attribution de bourse, pour un étudiant boursier.</li>
      </ul>

      <h2 id="ce-qui-est-interdit">Ce qu&apos;on ne peut pas vous demander</h2>
      <p>
        Le principe est simple : <strong>tout ce qui n&apos;est pas dans la liste ci-dessus est
        interdit.</strong> La loi nomme en plus explicitement une série de documents, parce
        qu&apos;ils étaient réclamés couramment :
      </p>
      <ul>
        <li>Une photographie d&apos;identité, sauf celle qui figure sur la pièce d&apos;identité.</li>
        <li>La carte d&apos;assuré social, donc la carte Vitale.</li>
        <li>Une copie de relevé de compte bancaire ou postal.</li>
        <li>Une attestation de bonne tenue de compte.</li>
        <li>Une attestation d&apos;absence de crédit en cours.</li>
        <li>Une autorisation de prélèvement automatique.</li>
        <li>Un jugement de divorce, hors le paragraphe commençant par « Par ces motifs ».</li>
        <li>Un contrat de mariage, un certificat de concubinage.</li>
        <li>Un chèque de réservation du logement.</li>
        <li>Le dossier médical personnel.</li>
        <li>Un extrait de casier judiciaire.</li>
        <li>
          Une attestation de non-inscription au fichier des incidents de remboursement des crédits
          aux particuliers.
        </li>
        <li>Plus de deux bilans, pour un travailleur indépendant.</li>
        <li>
          Une attestation du précédent bailleur ou de l&apos;employeur, quand vous pouvez fournir
          les justificatifs ordinaires.
        </li>
      </ul>
      <p>
        Le propriétaire ne peut pas non plus vous réclamer d&apos;argent avant la signature du bail.
      </p>

      <div className="note">
        <p>
          <strong>La sanction.</strong> Demander un document hors liste expose le propriétaire à une
          amende pouvant atteindre 3 000 €, et 15 000 € s&apos;il s&apos;agit d&apos;une personne
          morale, agence immobilière comprise.
        </p>
      </div>

      <h2 id="refuser">Comment refuser sans perdre le logement</h2>
      <p>
        C&apos;est la vraie difficulté : vous avez le droit pour vous, et en face une file
        d&apos;attente de candidats. Dans les faits, un refus sec vous élimine. Une réponse qui
        donne une alternative passe presque toujours :
      </p>
      <p>
        « Je ne peux pas transmettre mes relevés de compte, ce document ne fait pas partie de ceux
        qui peuvent être demandés pour une location. En revanche je vous envoie tout de suite mes
        trois derniers bulletins de salaire et mon avis d&apos;imposition, qui montrent la même
        chose. »
      </p>
      <p>
        Vous rassurez sans céder. Si la demande persiste, c&apos;est un signal sur la façon dont la
        location se passera ensuite.
      </p>

      <h2 id="preparer">Préparer un dossier qui passe devant les autres</h2>
      <p>
        À dossier équivalent, ce qui départage, c&apos;est la rapidité et la lisibilité. Trois
        choses aident vraiment :
      </p>
      <ol>
        <li>
          <strong>Un seul fichier PDF</strong>, dans l&apos;ordre des quatre catégories, nommé avec
          votre nom. Pas douze pièces jointes, pas de photos de documents prises de travers.
        </li>
        <li>
          <strong>Un garant déjà réglé.</strong> Si vous n&apos;avez pas de garant physique, la{" "}
          <Link href="/guides/garantie-visale">garantie Visale</Link> est gratuite et se demande en
          quelques jours, avant même d&apos;avoir trouvé le logement.
        </li>
        <li>
          <strong>Un message court qui dit que le dossier est prêt</strong>, sans le joindre
          d&apos;emblée. Vous pouvez l&apos;écrire avec notre{" "}
          <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>,
          gratuit et sans inscription.
        </li>
      </ol>

      <h2 id="apres-refus">Et après un refus, que devient votre dossier ?</h2>
      <p>
        Vos pièces sont des données personnelles. Un propriétaire ou une agence qui a écarté votre
        candidature n&apos;a plus de raison de les conserver, et vous pouvez demander leur
        effacement. En cas de refus, la Commission nationale de l&apos;informatique et des libertés
        peut être saisie.
      </p>
      <p>
        C&apos;est d&apos;ailleurs une des raisons pour lesquelles Terouva ne conserve rien sur un
        serveur : votre dossier reste sur votre ordinateur, et c&apos;est vous qui décidez à qui
        vous l&apos;envoyez.
      </p>
    </CadreGuide>
  );
}
