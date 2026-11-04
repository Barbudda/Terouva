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
  modifieLe: GUIDE.modifieLe,
});

/*
 * Intertitres en questions, telles qu'elles sont tapées (docs/seo/REGISTRE.md),
 * et sous chacune une réponse autonome de 40 à 60 mots, puis le détail sans
 * redite. « Louer sans garant » reste une section : la question appartient au
 * guide voisin, vers lequel elle renvoie.
 */
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

      <h2 id="qui">Qui peut se porter garant pour une location ?</h2>
      <p>
        N&apos;importe quelle personne physique, sans condition de lien de famille : un parent, un
        proche, un ami. Aucune règle n&apos;impose qu&apos;elle soit propriétaire ni qu&apos;elle
        habite votre région. Une personne morale peut aussi s&apos;engager : Action Logement avec
        la garantie Visale, un employeur ou une banque.
      </p>
      <p>
        Beaucoup d&apos;annonces réclament pourtant un garant propriétaire, ou qui vit dans la même
        région : le bailleur peut le préférer, aucun texte ne l&apos;exige. Pour qui n&apos;a
        personne à solliciter, la <Link href="/guides/garantie-visale">garantie Visale</Link> est
        la voie la plus courante, et elle se demande avant d&apos;avoir trouvé le logement.
      </p>

      <h2 id="simple-ou-solidaire">
        Caution simple ou solidaire : quand le propriétaire peut-il actionner le garant ?
      </h2>
      <p>
        Avec une caution solidaire, le propriétaire peut réclamer l&apos;impayé à votre garant dès
        le premier impayé, sans passer par vous. Avec une caution simple, il doit d&apos;abord
        vous le réclamer par un commandement de payer. La caution est solidaire si, dans la
        mention qu&apos;elle appose elle-même, elle renonce aux bénéfices de discussion et de
        division.
      </p>
      <p>Deux conséquences pratiques :</p>
      <ul>
        <li>
          <strong>En caution simple</strong>, le commissaire de justice qui délivre le commandement
          de payer doit en adresser une copie à la caution ; sans cette copie, la caution n&apos;est
          pas tenue des intérêts de retard.
        </li>
        <li>
          <strong>En caution solidaire</strong>, la formule que demandent la plupart des
          bailleurs, rien ne s&apos;intercale entre l&apos;impayé et votre garant. C&apos;est la
          mention, plus que le titre de l&apos;acte, qu&apos;il faut lire avant de signer.
        </li>
      </ul>
      <p>
        Dans les deux cas, le propriétaire dispose de <strong>trois ans</strong> pour réclamer les
        loyers et charges impayés.
      </p>

      <h2 id="acte">Que doit contenir l&apos;acte de cautionnement ?</h2>
      <p>
        Il doit être écrit et signé par la caution. Il reprend le montant du loyer et ses
        conditions de révision, reproduit un alinéa de l&apos;article 22-1 de la loi de 1989 et
        porte la mention de l&apos;article 2297 du Code civil, avec un montant maximal écrit en
        lettres et en chiffres. Sans ces formalités, l&apos;engagement est nul.
      </p>
      <p>Chaque élément a sa raison :</p>
      <ul>
        <li>
          le montant du loyer et ses conditions de révision sont ceux qui figurent au bail, et le
          propriétaire remet à la caution un exemplaire de ce bail ;
        </li>
        <li>
          l&apos;alinéa reproduit est l&apos;avant-dernier de l&apos;
          <span className="loi">article 22-1</span> de la{" "}
          <span className="loi">loi du 6 juillet 1989</span>, celui qui permet de résilier un
          engagement sans durée ;
        </li>
        <li>
          la mention de l&apos;<span className="loi">article 2297</span> est apposée par la caution
          elle-même : elle s&apos;engage à payer ce que vous devez si vous ne payez pas, et en cas
          d&apos;écart entre les deux montants, c&apos;est la somme en lettres qui compte ;
        </li>
        <li>
          en colocation, l&apos;acte nomme le colocataire dont le départ mettra fin à
          l&apos;engagement du garant.
        </li>
      </ul>
      <p>
        L&apos;acte peut être sous seing privé ou passé devant notaire. Il indique aussi si
        l&apos;engagement est à <strong>durée déterminée</strong> ou{" "}
        <strong>indéterminée</strong> : avec le montant maximal, c&apos;est la ligne qui décide de
        tout ce qui suit.
      </p>
      <div className="note">
        <p>
          <strong>Ce qui rend l&apos;acte nul.</strong> Une mention absente, un acte sans le
          montant du loyer ou sans l&apos;alinéa reproduit, ou une caution qui n&apos;a pas reçu le
          bail. La règle vaut depuis le 1er janvier 2022, date à laquelle l&apos;
          <span className="loi">article 22-1</span> renvoie à la mention de l&apos;
          <span className="loi">article 2297</span> du Code civil.
        </p>
      </div>

      <h2 id="justificatifs">Quels documents fournir pour se porter garant ?</h2>
      <p>
        Une pièce d&apos;identité, un justificatif de domicile, un justificatif de situation
        professionnelle et un justificatif de ressources, choisis dans une liste fixée par le
        décret du 5 novembre 2015. Cette liste est limitative et diffère de celle du locataire :
        tout document qui n&apos;y figure pas peut être refusé. Une caution personne morale ne
        fournit que deux pièces.
      </p>
      <p>
        Le détail pour une caution personne physique, selon le{" "}
        <span className="loi">décret du 5 novembre 2015</span> :
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
          l&apos;employeur, carte professionnelle, certificat d&apos;identification Insee, fiche
          d&apos;immatriculation au registre national des entreprises (l&apos;ancien extrait D1)
          ou K bis de moins de trois mois selon l&apos;activité.
        </li>
        <li>
          <strong>Ressources</strong> : trois derniers bulletins de salaire, deux derniers bilans,
          justificatif de pensions ou de prestations, avis d&apos;imposition ou de non-imposition,
          titre de propriété, revenus fonciers.
        </li>
      </ul>
      <p>
        Les deux pièces d&apos;une caution personne morale : un extrait K bis original de moins de
        trois mois, ou les statuts, et une pièce d&apos;identité du représentant.
      </p>
      <p>
        Les pièces interdites, la sanction encourue et la façon de les décliner sans perdre le
        logement sont détaillées dans le guide du{" "}
        <Link href="/guides/dossier-de-location">dossier de location</Link>.
      </p>

      <h2 id="cumul">Un propriétaire assuré contre les impayés peut-il demander un garant ?</h2>
      <p>
        Un propriétaire particulier couvert par une assurance contre les risques locatifs ne peut
        demander une caution que si le locataire est étudiant ou apprenti. Un bailleur personne
        morale ne peut en demander une que si elle vient d&apos;un organisme dont la liste est
        fixée par décret, ou si le logement est loué à un étudiant non boursier.
      </p>
      <p>
        La règle des personnes morales ne vaut pas pour une société civile constituée uniquement
        entre parents et alliés jusqu&apos;au quatrième degré inclus. Pour les autres cas, il peut
        valoir la peine de demander au propriétaire s&apos;il est déjà assuré : la question du
        garant tombe alors d&apos;elle-même, sauf si vous êtes étudiant ou apprenti.
      </p>

      <h2 id="fin">Un garant peut-il résilier son engagement ?</h2>
      <p>
        Seulement si l&apos;acte ne fixe aucune durée : la caution peut alors résilier à tout
        moment par lettre recommandée, mais la résiliation ne prend effet qu&apos;à la fin du bail
        en cours, et elle reste tenue des dettes nées pendant ce bail. Si l&apos;acte fixe une
        durée, elle va jusqu&apos;au bout.
      </p>
      <p>En dehors de la résiliation, l&apos;engagement prend fin dans trois situations :</p>
      <ul>
        <li>
          <strong>Vous partez</strong> : il s&apos;arrête à l&apos;expiration de votre préavis.
        </li>
        <li>
          <strong>Le propriétaire donne congé</strong> : il s&apos;arrête à l&apos;expiration du
          bail.
        </li>
        <li>
          <strong>La caution décède</strong> : si l&apos;acte ne prévoit rien, l&apos;engagement
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
      <ul>
        <li>
          <strong>La garantie Visale</strong>, gratuite, portée par Action Logement, et la seule
          qui se demande avant d&apos;avoir trouvé le logement.
        </li>
        <li>
          <strong>L&apos;assurance du propriétaire</strong> : s&apos;il est déjà couvert contre
          les loyers impayés, il ne peut plus exiger de caution, sauf d&apos;un étudiant ou
          d&apos;un apprenti.
        </li>
        <li>
          <strong>Une société de cautionnement</strong>, payante, qui se porte garant à la place
          d&apos;un proche.
        </li>
      </ul>
      <p>
        Les conditions de chacune, leur coût réel et quoi répondre en visite sont détaillés dans
        le guide <Link href="/guides/louer-sans-garant">louer sans garant</Link>.
      </p>
      <div className="note">
        <p>
          Un dernier point, rarement dit : un propriétaire qui exige une caution{" "}
          <strong>ne peut pas refuser la vôtre</strong> parce qu&apos;elle n&apos;a pas la
          nationalité française ou qu&apos;elle ne réside pas en métropole. C&apos;est écrit dans
          l&apos;<span className="loi">article 22-1</span> de la loi de 1989. Le{" "}
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
