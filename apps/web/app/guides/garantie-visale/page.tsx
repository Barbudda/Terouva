import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/garantie-visale");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
  modifieLe: GUIDE.modifieLe,
});

/*
 * Intertitres en questions, celles du registre (« garantie visale c'est
 * quoi », « conditions », « demande »), et sous chacune une réponse autonome de
 * 40 à 60 mots. Le développement donne le détail chiffré sans redire la
 * réponse. Les montants viennent de Service-public et sont datés dans
 * docs/seo/FAITS.md.
 */
export default function GuideVisale() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        « Avez-vous un garant ? » est la question qui élimine le plus de candidatures. Si vous
        n&apos;avez pas de parents propriétaires ou de proche prêt à s&apos;engager sur trois ans,
        la garantie Visale répond à la question à leur place.
      </p>

      <h2 id="principe">Qu&apos;est-ce que la garantie Visale ?</h2>
      <p>
        Une caution locative gratuite : Action Logement se porte garant pour vous auprès du
        propriétaire. Si vous ne payez pas, l&apos;organisme paie à votre place, puis vous demande
        de le rembourser. Dans le parc privé, elle couvre les loyers et charges impayés pendant les
        trois premières années du bail, et les dégradations locatives jusqu&apos;à deux mois de
        loyer et de charges.
      </p>
      <p>
        La dette reste donc la vôtre : Visale rassure le propriétaire et vous remet dans la course,
        sans effacer ce que vous devez.
      </p>

      <h2 id="qui">Qui peut obtenir la garantie Visale ?</h2>
      <p>
        Toute personne de 30 ans et moins, étudiants et alternants compris, les travailleurs
        saisonniers, et à partir de 31 ans les salariés du secteur privé qui viennent d&apos;être
        embauchés ou mutés, ou dont le salaire reste sous un plafond. Chaque profil a ses
        conditions de loyer ou de ressources, et le simulateur de visale.fr tranche.
      </p>
      <p>
        Le détail, tel que Service-public le présente :
      </p>
      <ul>
        <li>
          <strong>Étudiant ou alternant de 30 ans et moins</strong> : l&apos;accès dépend du loyer,
          et des ressources au-delà d&apos;un certain seuil.
        </li>
        <li>
          <strong>Toute personne de 30 ans et moins</strong> : loyer plafonné, et loyer qui ne
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

      <h2 id="plafonds">Quel loyer maximum pour obtenir la garantie Visale ?</h2>
      <p>
        Le loyer charges comprises doit rester sous un plafond qui dépend de la région et, hors
        Île-de-France, de la commune. Selon Service-public : jusqu&apos;à 1 940 € en
        Île-de-France, 1 575 € ou 1 365 € dans les autres régions de métropole, 1 575 € en
        outre-mer et à Saint-Martin. Ces montants sont revus régulièrement.
      </p>
      <p>
        Les étudiants et alternants ont en plus un seuil de loyer en dessous duquel l&apos;accès
        se fait sans condition de ressources :
      </p>
      <ul>
        <li>
          <strong>Île-de-France</strong> : 1 000 €.
        </li>
        <li>
          <strong>Autres régions de métropole</strong> : 840 € ou 680 € selon la commune.
        </li>
        <li>
          <strong>Outre-mer et Saint-Martin</strong> : 840 €.
        </li>
      </ul>

      <div className="note">
        <p>
          <strong>Avant d&apos;écarter un logement sur ces chiffres</strong>, passez par le{" "}
          {/* Le simulateur était lié chez Action Logement, à une adresse qui
              redirige désormais vers une page de maintenance. Il vit sur le
              site officiel du dispositif, qui répond, lui. */}
          <a href="https://www.visale.fr/" target="_blank" rel="noopener">
            simulateur d&apos;éligibilité sur visale.fr
          </a>
          , qui répond en quelques minutes et fait foi pour votre commune.
        </p>
      </div>

      <h2 id="demarche">Comment demander la garantie Visale ?</h2>
      <p>
        En ligne sur visale.fr, avant de signer le bail. Vous créez votre espace, déposez vos
        justificatifs et recevez un visa en quelques jours ouvrés. Vous le présentez au
        propriétaire en candidatant ; il crée son propre espace, saisit le numéro de visa et
        valide l&apos;acte de cautionnement. Après la signature du bail, il est trop tard.
      </p>
      <p>
        Côté propriétaire, la saisie demande aussi les caractéristiques du logement.
      </p>

      <h2 id="duree">Combien de temps dure la garantie Visale ?</h2>
      <p>
        Elle couvre les trois premières années du bail, pas au-delà : pour la suite, il faudrait en
        redemander une. En pratique, la question se pose peu, parce qu&apos;un propriétaire qui a
        reçu trois ans de loyers payés demande rarement un nouveau garant à son locataire.
      </p>

      <h2 id="utiliser">Comment utiliser la garantie Visale dans une candidature ?</h2>
      <p>
        En le disant dès le premier message, en une ligne : « Je bénéficie de la garantie
        Visale. » Placez-la juste après votre situation et votre revenu, au moment où le
        propriétaire se demande qui paiera si vous ne payez pas.
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
