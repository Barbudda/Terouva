import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/repondre-a-une-annonce-de-location");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
  modifieLe: GUIDE.modifieLe,
});

/*
 * Chaque intertitre formulé en question porte sa réponse dans le premier
 * paragraphe, autonome, de 40 à 60 mots : c'est le passage qu'un extrait de
 * recherche ou un assistant reprend tel quel. Le développement qui suit ajoute
 * le détail et ne redit pas la réponse.
 */
export default function GuideRepondre() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        Dans une ville tendue, une annonce de particulier bien située reçoit des dizaines de
        réponses en quelques heures. Le propriétaire ne les compare pas une par une : il parcourt,
        il retient trois ou quatre messages, il appelle. Votre premier message doit donc d&apos;abord{" "}
        <strong>survivre au tri</strong>.
      </p>

      <h2 id="ordre">Que mettre dans un message pour répondre à une annonce de location ?</h2>
      <p>
        Six informations : votre métier et votre type de contrat, votre revenu net mensuel, votre
        garant, le nombre d&apos;occupants, votre date d&apos;emménagement et la durée envisagée.
        Ajoutez des créneaux de visite précis. Ce sont les critères qu&apos;un propriétaire
        regarde avant d&apos;accorder une visite, et un message qui les donne tous tient en une
        dizaine de lignes.
      </p>
      <p>
        Les guides destinés aux propriétaires sont d&apos;accord entre eux sur ce point : ces six
        informations forment leur grille de tri, et chacune a sa raison.
      </p>
      <ol>
        <li>
          <strong>La situation professionnelle</strong> : deux mots suffisent, « infirmière en
          CDI ».
        </li>
        <li>
          <strong>Les ressources</strong> : c&apos;est la première question qu&apos;on vous
          poserait, avant toutes les autres.
        </li>
        <li>
          <strong>Le garant</strong>, physique ou une garantie comme Visale : l&apos;annoncer tout
          de suite vous évite l&apos;aller-retour qui fait perdre le logement.
        </li>
        <li>
          <strong>Le nombre d&apos;occupants</strong> : le propriétaire en a besoin pour estimer les
          charges et vérifier que la surface convient.
        </li>
        <li>
          <strong>La date d&apos;emménagement</strong> : il a presque toujours une date en tête, et
          un candidat qui ne peut arriver que dans trois mois passe après.
        </li>
        <li>
          <strong>La durée envisagée</strong> : un changement de locataire coûte cher.
          « Durablement » ou « au moins trois ans » vous distingue de qui cherche un pied-à-terre.
        </li>
      </ol>
      <p>
        Pour la visite, des créneaux précis valent mieux qu&apos;un « quand vous voulez » qui
        oblige votre interlocuteur à proposer. Le reste est de l&apos;emballage : une politesse au
        début, votre numéro à la fin.
      </p>

      <div className="note">
        <p>
          <strong>Court, oui. Vide, non.</strong> Les mêmes guides déconseillent le message de
          deux lignes, « Bonjour, je suis intéressé par votre annonce, merci », qui ne donne rien à
          décider, et le récit personnel qui noie l&apos;information.
        </p>
      </div>

      <h2 id="modele">Un modèle de réponse complet, qui reste court</h2>
      <div className="note">
        <p>Bonjour,</p>
        <p>Je suis intéressée par votre annonce, en particulier pour le balcon.</p>
        <p>
          Je suis infirmière en CDI. Mon revenu net est de 2 400 € par mois et je bénéficie de la
          garantie Visale. Mon dossier est complet.
        </p>
        <p>
          Je serais la seule personne à y vivre, et je peux emménager à partir du 1er décembre. Je
          cherche à m&apos;installer durablement.
        </p>
        <p>Pour la visite, je suis disponible en semaine après 18 h ou le samedi.</p>
        <p>
          Cordialement,
          <br />
          Camille Martin
          <br />
          06 12 34 56 78
        </p>
      </div>
      <p>
        Vous pouvez l&apos;adapter à votre situation avec notre{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link> :
        gratuit, sans inscription, trois tons au choix, et rien n&apos;est envoyé à qui que ce soit.
      </p>

      <h2 id="ne-pas-faire">Comment se démarquer quand on répond à une annonce de location ?</h2>
      <p>
        En évitant les quatre défauts qui font écarter un message : recopier la surface et le loyer
        de l&apos;annonce, laisser des traces de copier-coller comme « intéressé(e) », raconter sa
        vie, ou joindre des documents que le propriétaire n&apos;a pas le droit de demander. Une
        phrase précise sur ce qui vous a plu dans le logement suffit à montrer que vous l&apos;avez
        lu.
      </p>

      <h3>Récapituler l&apos;annonce</h3>
      <p>
        « Je vous contacte au sujet de votre appartement de 42 m² situé à Lyon 4e, loué 890 € par
        mois. » Le propriétaire a écrit ces mots lui-même. Cette phrase ne prouve pas que vous avez
        lu l&apos;annonce, elle prouve que vous avez copié son titre, et elle ressemble à tous les
        modèles qui circulent.
      </p>

      <h3>Les traces du copier-coller</h3>
      <p>
        Un crochet oublié, une formule entre parenthèses, un ton qui ne ressemble à personne : cela
        se repère en une seconde et indique que le même message part à vingt annonces.
      </p>

      <h3>Le roman</h3>
      <p>
        Expliquer pourquoi vous déménagez, promettre d&apos;être un locataire exemplaire, détailler
        votre projet de vie. Rien de tout cela ne rassure quelqu&apos;un qui cherche surtout à être
        payé le 5 de chaque mois.
      </p>

      <h3>Proposer des documents que personne n&apos;a le droit de demander</h3>
      <p>
        Par excès de zèle, certains candidats joignent leurs relevés de compte ou une attestation de
        bonne tenue de compte. Le propriétaire n&apos;a pas le droit de les exiger : la{" "}
        <Link href="/guides/dossier-de-location">liste des pièces autorisées est fixée par décret</Link>
        . Les offrir spontanément n&apos;aide pas, et installe un rapport déséquilibré.
      </p>

      <h2 id="rapidite">Pourquoi l&apos;heure d&apos;envoi compte-t-elle autant ?</h2>
      <p>
        Parce qu&apos;à dossier égal, le rang d&apos;arrivée départage. Le propriétaire d&apos;une
        annonce bien située retient trois ou quatre messages parmi des dizaines, et il lit
        d&apos;abord ceux qui arrivent tôt. C&apos;est le seul critère qui ne dépend ni de votre
        métier ni de vos revenus, et celui sur lequel vous pouvez agir dès aujourd&apos;hui.
      </p>
      <p>
        Il dépend de votre disponibilité à surveiller des annonces toute la journée, ce qui est
        frustrant. Trois façons de ne pas perdre ce terrain :
      </p>
      <ul>
        <li>
          <strong>Créez les alertes des sites d&apos;annonces</strong> avec des critères larges
          plutôt que trop précis. Une alerte trop étroite ne se déclenche jamais.
        </li>
        <li>
          <strong>Préparez votre message et votre dossier à l&apos;avance.</strong> Le temps que
          vous passerez à rédiger au moment où l&apos;annonce tombe, vous le perdrez.
        </li>
        <li>
          <strong>Réglez la question du garant avant de chercher.</strong> La{" "}
          <Link href="/guides/garantie-visale">garantie Visale</Link> se demande sans avoir trouvé
          de logement, et évite d&apos;attendre un accord au pire moment.
        </li>
      </ul>

      <h2 id="apres">Faut-il relancer un propriétaire après avoir répondu à une annonce ?</h2>
      <p>
        Une fois, deux ou trois jours après votre premier message, et pas davantage : au-delà, la
        relance agace plus qu&apos;elle ne rappelle votre candidature. Si vous écrivez à beaucoup
        d&apos;annonces, notez ce que vous avez envoyé et à quelle date, pour ne pas relancer deux
        fois le même propriétaire et en oublier d&apos;autres.
      </p>
      <p>
        C&apos;est exactement ce que Terouva automatise : les annonces qui vous correspondent, le
        message préparé, et le suivi de ce que vous avez envoyé. Vous gardez la main sur l&apos;envoi.
      </p>
    </CadreGuide>
  );
}
