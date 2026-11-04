import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/dossier-de-location");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
  modifieLe: GUIDE.modifieLe,
});

/*
 * Intertitres en questions, telles qu'on les tape, et sous chacune une réponse
 * autonome de 40 à 60 mots, puis le détail sans redite. Les listes du décret
 * restent en sous-sections : ce sont des références, pas des questions.
 */
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

      <h2 id="ce-qui-peut-etre-demande">
        Quelles pièces un propriétaire peut-il demander pour un dossier de location ?
      </h2>
      <p>
        Des pièces de quatre catégories, choisies dans une liste fixée par le décret du 5 novembre
        2015 : votre identité, votre domicile actuel, votre activité professionnelle et vos
        ressources. Pour l&apos;identité et le domicile, il ne peut réclamer qu&apos;un seul
        document chacun ; pour l&apos;activité et les ressources, un ou plusieurs. Cette liste est
        limitative.
      </p>
      <p>
        Pour ne garder que les pièces qui vous concernent, la{" "}
        <Link href="/outils/dossier-de-location">checklist de dossier de location</Link> fait le tri
        selon votre situation, en trois questions.
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
        <li>
          Les deux derniers bilans ou, à défaut, une attestation de ressources pour l&apos;exercice
          en cours, pour un professionnel non salarié.
        </li>
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

      <h2 id="ce-qui-est-interdit">
        Quels documents un propriétaire n&apos;a-t-il pas le droit de demander ?
      </h2>
      <p>
        Tous ceux qui ne figurent pas dans la liste du décret. Parmi ceux qu&apos;on réclame encore
        souvent : relevé de compte bancaire, attestation de bonne tenue de compte, carte Vitale,
        photo d&apos;identité, autorisation de prélèvement, contrat de mariage, extrait de casier
        judiciaire, chèque de réservation. Le propriétaire qui en demande un s&apos;expose à une
        amende pouvant atteindre 3&nbsp;000&nbsp;€.
      </p>
      <p>
        Depuis 2014, la loi ne nomme plus ces documents un par un : elle renvoie à la liste du
        décret. Le relevé complet de ceux qui n&apos;y figurent pas et qu&apos;on rencontre encore :
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
      </ul>
      <p>
        Le propriétaire ne peut pas non plus vous réclamer d&apos;argent avant la signature du bail,
        ni vous imposer qu&apos;un membre de votre famille en ligne directe (parent, grand-parent,
        enfant) cosigne le bail.
      </p>

      <div className="note">
        <p>
          <strong>La sanction.</strong> Quand c&apos;est une personne morale qui demande un document
          hors liste, agence immobilière comprise, l&apos;amende peut atteindre 15&nbsp;000&nbsp;€.
        </p>
      </div>

      <h2 id="refuser">
        Comment refuser un document interdit sans perdre le logement ?
      </h2>
      <p>
        En proposant une alternative plutôt qu&apos;un refus sec. Dites que le document ne fait pas
        partie de ceux qui peuvent être demandés, puis envoyez aussitôt les pièces autorisées qui
        montrent la même chose : fiches de paie et avis d&apos;imposition à la place des relevés de
        compte. Vous rassurez sans céder.
      </p>
      <p>
        Vous avez le droit pour vous, et en face une file d&apos;attente de candidats : dans les
        faits, un refus sec vous élimine. La formule qui passe presque toujours :
      </p>
      <p>
        « Je ne peux pas transmettre mes relevés de compte, ce document ne fait pas partie de ceux
        qui peuvent être demandés pour une location. En revanche je vous envoie tout de suite mes
        trois derniers bulletins de salaire et mon avis d&apos;imposition, qui montrent la même
        chose. »
      </p>
      <p>
        Si la demande persiste, c&apos;est un signal sur la façon dont la location se passera
        ensuite.
      </p>

      <h2 id="preparer">Comment préparer un dossier de location qui passe devant les autres ?</h2>
      <p>
        À dossier équivalent, ce qui départage est la rapidité et la lisibilité. Donc un seul
        fichier PDF, dans l&apos;ordre des quatre catégories et nommé avec votre nom ; la question
        du garant réglée avant de visiter ; et un premier message court qui annonce que le dossier
        est prêt, sans le joindre.
      </p>
      <p>Le détail de chacun des trois :</p>
      <ol>
        <li>
          <strong>Le fichier</strong> : pas douze pièces jointes, pas de photos de documents prises
          de travers.
        </li>
        <li>
          <strong>Le garant</strong> : si vous n&apos;avez pas de{" "}
          <Link href="/guides/garant-caution">garant physique</Link>, la{" "}
          <Link href="/guides/garantie-visale">garantie Visale</Link> est gratuite et se demande en
          quelques jours, avant même d&apos;avoir trouvé le logement.
        </li>
        <li>
          <strong>Le message</strong> : vous pouvez l&apos;écrire avec notre{" "}
          <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>,
          gratuit et sans inscription.
        </li>
      </ol>

      <h2 id="apres-refus">Que devient votre dossier après un refus ?</h2>
      <p>
        Vos pièces sont des données personnelles. Si un propriétaire ou une agence a écarté votre
        candidature, rien ne vous empêche de lui demander par écrit d&apos;effacer les pièces que
        vous avez envoyées, et de garder une trace écrite de cette demande.
      </p>
      <p>
        C&apos;est d&apos;ailleurs une des raisons pour lesquelles Terouva ne conserve rien sur un
        serveur : votre dossier reste sur votre ordinateur, et c&apos;est vous qui décidez à qui
        vous l&apos;envoyez.
      </p>
    </CadreGuide>
  );
}
