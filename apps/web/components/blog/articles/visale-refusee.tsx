import Link from "next/link";

/**
 * Corps de l'article « Visale refusée ». Deux refus qui n'ont rien à voir,
 * traités séparément : le visa refusé par Action Logement, et le propriétaire
 * qui ne souscrit pas le contrat.
 *
 * Non sourcé au 2026-11-04, donc absent : la part des demandes refusées, la
 * cause la plus fréquente, un recours contre un refus de visa (la FAQ de
 * visale.fr ne décrit que la nouvelle demande), et la question « les agences
 * acceptent-elles Visale ? » (aucune donnée lue). Les conditions recopiées du
 * guide Visale doivent rester identiques au guide.
 */
export default function VisaleRefusee() {
  return (
    <>
      <p>
        « Visale refusée » recouvre deux situations. Dans la première, Action Logement ne vous
        délivre pas le visa, ou le délivre pour un loyer plus bas que celui du logement visé. Dans
        la seconde, vous avez votre visa, mais le propriétaire ne veut pas de cette garantie. La
        conduite à tenir n&apos;est pas la même, et elle commence par savoir lequel des deux a dit
        non.
      </p>

      <h2 id="qui">Qui a refusé : Action Logement ou le propriétaire ?</h2>
      <p>
        Le refus d&apos;Action Logement apparaît dans votre espace personnel sur visale.fr : la
        demande y est signalée incomplète ou non conforme, ou le visa n&apos;est pas certifié. Le
        refus du propriétaire, lui, arrive par sa réponse ou celle de l&apos;agence, alors que votre
        visa est valide. Ce point compte, parce que dans le premier cas vous pouvez corriger, et
        dans le second il faut convaincre ou proposer autre chose.
      </p>

      <h2 id="conditions">Pourquoi Action Logement refuse-t-il un visa ?</h2>
      <p>
        Parce qu&apos;une condition manque. Les publics éligibles sont détaillés dans le guide des{" "}
        <Link href="/guides/garantie-visale">conditions de la garantie Visale</Link>. Avant de
        redemander, vérifiez dans l&apos;ordre :
      </p>
      <ul>
        <li>
          <strong>L&apos;âge et la situation.</strong> Avoir 30 ans et moins, ou, à partir de 31
          ans, être salarié du secteur privé avec une promesse d&apos;embauche à trois mois, une
          embauche ou une mutation de moins de six mois, ou un salaire net de 1&nbsp;710&nbsp;€ par
          mois au plus.
        </li>
        <li>
          <strong>La part du loyer.</strong> Pour les 30 ans et moins hors étudiants, le loyer ne
          doit pas dépasser la moitié des ressources prises en compte.
        </li>
        <li>
          <strong>Le plafond de loyer de la commune</strong>, charges comprises : jusqu&apos;à
          1&nbsp;940&nbsp;€ en Île-de-France, 1&nbsp;575&nbsp;€ ou 1&nbsp;365&nbsp;€ ailleurs en
          métropole selon la commune (Service-public, fiche vérifiée le 23 janvier 2026).
        </li>
        <li>
          <strong>Le lien de famille.</strong> Le locataire et le propriétaire ne doivent pas être
          grand-parent, parent ou enfant l&apos;un de l&apos;autre.
        </li>
      </ul>

      <h2 id="incomplet">Que faire si la demande est incomplète ou non conforme ?</h2>
      <p>
        Les deux mots n&apos;appellent pas la même réponse. Une demande <strong>incomplète</strong>{" "}
        se complète : votre espace personnel liste les éléments manquants, et vous avez quinze jours
        après la relance pour les ajouter. Passé ce délai, la demande devient caduque et il faut en
        refaire une complète.
      </p>
      <p>
        Une demande <strong>non conforme</strong> se refait : vous formulez une nouvelle demande et
        joignez à nouveau les justificatifs, en tenant compte des commentaires reçus. Les pièces se
        déposent en ligne, 5&nbsp;Mo au plus chacune, renommées et rangées dans la bonne rubrique
        (état civil, situation, ressources, domicile, imposition). Un document flou ou mal classé
        suffit à faire revenir un dossier.
      </p>

      <h2 id="loyer">Que faire si votre loyer dépasse le plafond Visale ?</h2>
      <p>
        Le visa indique le loyer maximum, charges comprises, qu&apos;il couvre. Si le logement coûte
        plus, le propriétaire ne pourra pas souscrire Visale, même si votre visa est valide.
        Corriger la demande n&apos;y changera rien : c&apos;est le logement qui sort du dispositif.
      </p>
      <p>
        Deux réflexes. Passez par le simulateur d&apos;éligibilité de{" "}
        <a href="https://www.visale.fr/" target="_blank" rel="noopener">
          visale.fr
        </a>{" "}
        avant de candidater, parce que le plafond dépend de la commune. Et triez vos annonces par le
        loyer inscrit sur votre visa : une visite pour un logement au-dessus vous fait perdre une
        soirée, et une candidature que le propriétaire ne pourra pas garantir.
      </p>

      <h2 id="redemander">Peut-on refaire une demande de visa ?</h2>
      <p>
        Oui, dans trois cas prévus par la FAQ de visale.fr. Après une demande caduque ou non
        conforme, en en formulant une nouvelle. Pour modifier un visa, en l&apos;annulant puis en
        créant une demande, à condition qu&apos;il ne soit pas déjà rattaché à un contrat. Et
        quand le visa est obsolète, c&apos;est-à-dire que sa date de validité est passée : trois
        mois au plus, six pour les étudiants, les alternants et les volontaires du service civique.
      </p>
      <p>
        Une seule demande peut être en cours à la fois. Les pages officielles que nous avons lues
        le 4 novembre 2026 ne décrivent pas de recours contre un refus : elles décrivent la
        nouvelle demande.
      </p>

      <h2 id="proprietaire">Un propriétaire peut-il refuser la garantie Visale ?</h2>
      <p>
        En pratique, oui : la garantie n&apos;existe que si le propriétaire crée lui-même son compte
        sur visale.fr et signe le contrat de cautionnement avant le bail. Aucun texte que nous avons
        lu ne l&apos;y oblige. Si le refus vient d&apos;une méconnaissance du dispositif, une
        phrase suffit parfois : la caution est portée par Action Logement, gratuitement.
      </p>
      <p>
        Deux règles de l&apos;<span className="loi">article 22-1</span> de la loi du 6 juillet 1989
        jouent en votre faveur. Un propriétaire déjà assuré contre les loyers impayés ne peut pas
        exiger de caution, sauf d&apos;un étudiant ou d&apos;un apprenti : demandez-lui s&apos;il
        l&apos;est. Et un bailleur personne morale, hors société civile familiale, ne peut demander
        qu&apos;une caution apportée par un organisme dont la liste est fixée par décret, ou celle
        d&apos;un étudiant non boursier. Le détail est dans le guide{" "}
        <Link href="/guides/garant-caution">garant et caution</Link>.
      </p>

      <h2 id="sans-visale">Sans Visale, quelles solutions restent ?</h2>
      <ul>
        <li>
          <strong>Un garant physique</strong> : un parent, un proche ou un ami, sans condition de
          lien de famille.
        </li>
        <li>
          <strong>Une société de cautionnement</strong>, payante : demandez le coût total sur la
          durée du bail, et vérifiez que le propriétaire l&apos;accepte avant de payer.
        </li>
        <li>
          <strong>L&apos;avance Loca-Pass</strong> d&apos;Action Logement, pour le dépôt de
          garantie seulement : 1&nbsp;200&nbsp;€ au plus, sans intérêts, remboursables en 25 mois
          au plus, à demander au plus tard deux mois après l&apos;entrée. Elle ne remplace pas une
          caution.
        </li>
      </ul>
      <p>
        L&apos;ordre dans lequel les essayer, et quoi dire en visite, sont dans le guide{" "}
        <Link href="/guides/louer-sans-garant">louer sans garant</Link>.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Demandez le visa avant de chercher, mais pas trop tôt : avec trois mois de validité, un
        visa obtenu en juin peut être obsolète en septembre. Une fois certifié, annoncez-le dès le
        premier message, juste après votre situation et votre revenu. Et réunissez le reste du
        dossier en même temps, avec la{" "}
        <Link href="/outils/dossier-de-location">checklist de dossier de location</Link>, gratuite
        et sans inscription : Visale règle la question du garant, le dossier reste à faire.
      </p>
      <p>
        Terouva vous signale les annonces qui correspondent à votre recherche et prépare votre
        réponse ; il ne fait pas la demande de visa à votre place.{" "}
        <a href="#prevenu" className="lien">
          Être prévenu du lancement
        </a>
      </p>
    </>
  );
}
