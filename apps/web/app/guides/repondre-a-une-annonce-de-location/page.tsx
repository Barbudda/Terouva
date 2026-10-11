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
});

export default function GuideRepondre() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        Dans une ville tendue, une annonce de particulier bien située reçoit des dizaines de
        réponses en quelques heures. Le propriétaire ne les compare pas une par une : il parcourt,
        il retient trois ou quatre messages, il appelle. Votre premier message n&apos;a donc pas à
        convaincre, il a à <strong>survivre au tri</strong>.
      </p>

      <h2 id="ordre">L&apos;ordre qui marche</h2>
      <p>
        Un bon message de candidature répond, dans cet ordre, aux trois questions que le
        propriétaire se pose :
      </p>
      <ol>
        <li>
          <strong>Qui êtes-vous ?</strong> Votre métier et votre type de contrat. Deux mots
          suffisent.
        </li>
        <li>
          <strong>Pouvez-vous payer ?</strong> Votre revenu net mensuel, et votre garant ou votre
          garantie.
        </li>
        <li>
          <strong>Quand pouvez-vous visiter ?</strong> Une phrase qui ouvre, pas une question qui
          attend.
        </li>
      </ol>
      <p>
        Le reste, c&apos;est de l&apos;emballage. Une phrase de politesse au début, une signature
        avec votre numéro à la fin, et c&apos;est tout.
      </p>

      <h2 id="modele">Un modèle qui tient en six lignes</h2>
      <div className="note">
        <p>Bonjour,</p>
        <p>Votre annonce m&apos;intéresse beaucoup, en particulier pour le balcon.</p>
        <p>
          Je suis infirmière en CDI. Mon revenu net est de 2 400 € par mois et je bénéficie de la
          garantie Visale. Mon dossier est complet.
        </p>
        <p>Je peux visiter dès que vous le souhaitez.</p>
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

      <h2 id="ne-pas-faire">Ce qui vous dessert</h2>

      <h3>Récapituler l&apos;annonce</h3>
      <p>
        « Je vous contacte au sujet de votre appartement de 42 m² situé à Lyon 4e, loué 890 € par
        mois. » Le propriétaire a écrit ces mots lui-même. Cette phrase ne prouve pas que vous avez
        lu l&apos;annonce, elle prouve que vous avez copié son titre, et elle ressemble à tous les
        modèles qui circulent. Une phrase sur ce qui vous a plu en dit beaucoup plus.
      </p>

      <h3>Les traces du copier-coller</h3>
      <p>
        Les formules entre parenthèses du type « intéressé(e) », un crochet oublié, un ton qui ne
        ressemble à personne. Tout cela se repère en une seconde et indique que le même message part
        à vingt annonces.
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
        bonne tenue de compte. Ce sont des documents que le propriétaire n&apos;a pas le droit
        d&apos;exiger : la{" "}
        <Link href="/guides/dossier-de-location">liste des pièces autorisées est fixée par décret</Link>
        . Les offrir spontanément n&apos;aide pas, et installe un rapport déséquilibré.
      </p>

      <h2 id="rapidite">Le facteur qu&apos;on oublie : l&apos;heure d&apos;envoi</h2>
      <p>
        À dossier égal, ce qui départage, c&apos;est le rang d&apos;arrivée. C&apos;est frustrant,
        parce que c&apos;est le seul critère qui ne dépend ni de votre métier, ni de vos revenus,
        mais de votre disponibilité à surveiller des annonces toute la journée.
      </p>
      <p>Trois façons de ne pas perdre ce terrain :</p>
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

      <h2 id="apres">Après l&apos;envoi</h2>
      <p>
        Une relance, une seule, deux ou trois jours plus tard, suffit. Au-delà, elle agace. Si vous
        candidatez sur beaucoup d&apos;annonces, notez quelque part ce que vous avez envoyé et
        quand : sans cela, vous relancerez deux fois les mêmes et oublierez les autres.
      </p>
      <p>
        C&apos;est exactement ce que Terouva automatise : les annonces qui vous correspondent, le
        message préparé, et le suivi de ce que vous avez envoyé. Vous gardez la main sur l&apos;envoi.
      </p>
    </CadreGuide>
  );
}
