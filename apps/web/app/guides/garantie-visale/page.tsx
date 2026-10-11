import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/garantie-visale");

export const metadata = pageMetadata({
  titre: GUIDE.titre,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
});

export default function GuideVisale() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        « Avez-vous un garant ? » est la question qui élimine le plus de candidatures. Si vous
        n&apos;avez pas de parents propriétaires ou de proche prêt à s&apos;engager sur trois ans,
        la garantie Visale répond à la question à leur place. Elle est gratuite, elle est portée par
        Action Logement, et elle se demande <strong>avant</strong> d&apos;avoir trouvé le logement.
      </p>

      <h2 id="principe">Ce que c&apos;est</h2>
      <p>
        Une caution locative. Action Logement se porte garant pour vous auprès du propriétaire. Si
        vous ne payez pas, l&apos;organisme paie à votre place, puis vous demande de le rembourser.
        Ce n&apos;est donc pas une assurance qui efface la dette : c&apos;est un garant qui rassure
        le propriétaire et vous remet dans la course.
      </p>
      <p>Pour le propriétaire du parc privé, la couverture annoncée est la suivante :</p>
      <ul>
        <li>Les loyers et charges impayés, jusqu&apos;à 36 mois, pendant les trois premières années du bail.</li>
        <li>Les dégradations locatives, jusqu&apos;à deux mois de loyer et de charges.</li>
      </ul>

      <h2 id="qui">Qui peut l&apos;obtenir</h2>
      <p>
        Les conditions dépendent de votre âge et de votre situation. Dans les grandes lignes, telles
        que Service-public les présente :
      </p>
      <ul>
        <li>
          <strong>Étudiant ou alternant de moins de 30 ans</strong> : l&apos;accès dépend du loyer,
          et des ressources au-delà d&apos;un certain seuil.
        </li>
        <li>
          <strong>Toute personne de moins de 30 ans</strong> : loyer plafonné, et loyer qui ne
          dépasse pas la moitié des ressources prises en compte.
        </li>
        <li>
          <strong>Travailleur saisonnier</strong> : contrat en cours mentionnant « saisonnier », ou
          promesse d&apos;embauche avec prise de fonction dans les trois mois.
        </li>
        <li>
          <strong>Salarié du secteur privé de 31 ans et plus</strong> : promesse d&apos;embauche dans
          les trois mois, ou demande faite dans les six mois suivant l&apos;embauche ou une mutation,
          ou salaire net mensuel ne dépassant pas 1 710 €.
        </li>
      </ul>
      <p>
        Une condition s&apos;applique à tous : le locataire et le propriétaire ne doivent pas être
        grand-parent, parent ou enfant l&apos;un de l&apos;autre.
      </p>

      <h2 id="plafonds">Les plafonds de loyer</h2>
      <p>
        Le loyer charges comprises doit rester sous un plafond qui dépend de la région et, hors
        Île-de-France, de la commune. Les ordres de grandeur publiés par Service-public :
      </p>
      <ul>
        <li>
          <strong>Île-de-France</strong> : jusqu&apos;à 1 940 € charges comprises. Pour les
          étudiants et alternants, l&apos;accès est sans condition de ressources jusqu&apos;à
          1 000 €.
        </li>
        <li>
          <strong>Autres régions de métropole</strong> : 1 575 € ou 1 365 € selon la commune, avec
          un seuil sans condition de ressources de 840 € ou 680 € pour les étudiants et alternants.
        </li>
        <li>
          <strong>Outre-mer et Saint-Martin</strong> : 1 575 €, avec 840 € sans condition de
          ressources pour les étudiants et alternants.
        </li>
      </ul>

      <div className="note">
        <p>
          <strong>Ces montants bougent.</strong> Ils dépendent de votre commune et sont revus
          régulièrement. Avant de vous en servir pour écarter un logement, passez par le{" "}
          <a href="https://site.actionlogement.fr/eligibilite-visale" target="_blank" rel="noopener">
            simulateur d&apos;éligibilité d&apos;Action Logement
          </a>
          , qui répond en quelques minutes et fait foi.
        </p>
      </div>

      <h2 id="demarche">La démarche, dans le bon ordre</h2>
      <ol>
        <li>
          <strong>Vous créez votre espace sur visale.fr</strong> et déposez vos justificatifs.
          Action Logement délivre un <strong>visa</strong> en quelques jours ouvrés.
        </li>
        <li>
          <strong>Vous présentez ce visa au propriétaire</strong> au moment de candidater. C&apos;est
          là que tout se joue : vous répondez à la question du garant avant qu&apos;elle soit posée.
        </li>
        <li>
          <strong>Le propriétaire crée son espace</strong>, saisit le numéro de visa et les
          caractéristiques du logement, puis valide l&apos;acte de cautionnement.
        </li>
        <li>
          <strong>Vous signez le bail.</strong> La demande doit être faite avant la signature : après,
          il est trop tard.
        </li>
      </ol>

      <h2 id="duree">Combien de temps elle dure</h2>
      <p>
        La garantie couvre les trois premières années du bail. Au-delà, il faut en redemander une.
        Ce n&apos;est pas un problème en pratique : passé trois ans de loyers payés, un propriétaire
        demande rarement un nouveau garant.
      </p>

      <h2 id="utiliser">S&apos;en servir dans une candidature</h2>
      <p>
        Avoir le visa ne suffit pas, encore faut-il le dire au bon endroit. Une ligne dans le
        premier message fait le travail : « Je bénéficie de la garantie Visale. » Elle se place
        juste après votre situation et votre revenu, au moment où le propriétaire se demande qui
        paiera si vous ne payez pas.
      </p>
      <p>
        Notre{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>{" "}
        l&apos;intègre automatiquement si vous renseignez le champ « garant ou garantie ». Et si vous
        préparez votre dossier, la{" "}
        <Link href="/guides/dossier-de-location">liste officielle des pièces à fournir</Link> vous
        évitera les demandes abusives.
      </p>
    </CadreGuide>
  );
}
