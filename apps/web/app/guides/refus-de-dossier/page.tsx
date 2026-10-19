import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/refus-de-dossier");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
});

export default function GuideRefusDeDossier() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        Après dix candidatures sans réponse, la question vient toujours : a-t-on le droit de me
        refuser comme ça ? La réponse courte est oui. Un propriétaire choisit son locataire et
        n&apos;a pas à motiver un refus. Ce que la loi encadre, c&apos;est la{" "}
        <strong>raison</strong> du refus, et la liste des raisons interdites est plus longue
        qu&apos;on ne le croit.
      </p>

      <h2 id="principe">Le principe</h2>
      <p>
        Le propriétaire est libre de retenir la candidature qu&apos;il veut, à partir de critères
        objectifs liés à la location et aux garanties de paiement. Aucune obligation
        d&apos;expliquer, aucun délai de réponse, aucun classement à justifier.
      </p>
      <p>
        L&apos;article 1er de la loi du 6 juillet 1989 lui interdit en revanche de refuser de louer
        pour un motif discriminatoire. Et selon le Défenseur des droits, cette interdiction
        s&apos;applique même sans intention de discriminer : un réflexe de tri, une consigne
        d&apos;agence, une habitude suffisent.
      </p>

      <h2 id="interdits">Les critères interdits</h2>
      <p>
        L&apos;article 225-1 du Code pénal en liste une vingtaine. Un refus fondé sur l&apos;un
        d&apos;eux est une discrimination :
      </p>
      <ul>
        <li>l&apos;origine, l&apos;appartenance vraie ou supposée à une ethnie, une nation, une prétendue race ;</li>
        <li>le sexe, l&apos;orientation sexuelle, l&apos;identité de genre, les mœurs ;</li>
        <li>la situation de famille, la grossesse ;</li>
        <li>l&apos;âge, l&apos;apparence physique, le patronyme ;</li>
        <li>l&apos;état de santé, le handicap, la perte d&apos;autonomie, les caractéristiques génétiques ;</li>
        <li>la vulnérabilité économique ;</li>
        <li>le lieu de résidence ;</li>
        <li>la religion, les opinions politiques, les activités syndicales ;</li>
        <li>la capacité à s&apos;exprimer dans une langue autre que le français ;</li>
        <li>la qualité de lanceur d&apos;alerte.</li>
      </ul>
      <p>
        Deux points reviennent souvent dans les dossiers du Défenseur des droits.{" "}
        <strong>Le lieu de résidence est un critère protégé</strong>, y compris celui du garant :
        écarter une candidature parce que la caution habite une autre région, ou une commune jugée
        indésirable, relève de l&apos;interdit. Et un refus justifié par la nature « non
        professionnelle » d&apos;une partie des revenus, comme une pension d&apos;invalidité, a déjà
        été qualifié de discriminatoire.
      </p>

      <h2 id="legitimes">Ce qui reste légitime</h2>
      <p>
        Le propriétaire peut apprécier votre <strong>situation financière</strong> et la solidité
        des garanties. Il peut demander les pièces de la liste autorisée : identité, situation
        professionnelle, ressources. Il ne peut pas réclamer un relevé de compte bancaire ni un
        contrat de mariage, et refuser quelqu&apos;un qui veut exercer une activité
        professionnelle dans le logement n&apos;est pas une discrimination.
      </p>
      <p>
        Un dossier moins solide qu&apos;un autre peut donc être écarté sans que la loi ait quoi que
        ce soit à dire. C&apos;est la limite de ce guide : la plupart des refus sont légitimes, et
        ce qui se joue alors est sur le terrain du{" "}
        <Link href="/guides/dossier-de-location">dossier</Link> et du{" "}
        <Link href="/guides/garant-caution">garant</Link>.
      </p>
      <div className="note">
        <p>
          Refuser un logement jugé trop petit pour la composition du foyer peut être légitime, mais
          le Défenseur des droits a retenu la discrimination dans plusieurs refus de ce type,
          fondés en réalité sur la situation de famille. La frontière se trouve dans ce qui a
          vraiment motivé la décision.
        </p>
      </div>

      <h2 id="preuve">La charge de la preuve</h2>
      <p>
        Elle se partage en deux temps, et c&apos;est ce qui rend l&apos;action possible. À vous
        d&apos;abord de réunir des éléments <strong>datés</strong> qui laissent supposer un motif
        interdit :
      </p>
      <ul>
        <li>les messages, courriels et captures d&apos;écran, avec l&apos;identité de l&apos;auteur ;</li>
        <li>des témoignages, ou le résultat d&apos;un testing ;</li>
        <li>un certificat médical, si le motif touche à la santé ou au handicap.</li>
      </ul>
      <p>
        Dès lors que ces éléments existent, c&apos;est au propriétaire de démontrer que sa décision
        repose sur des éléments objectifs, étrangers à toute discrimination. Le testing lui-même est
        encadré par l&apos;article 225-3-1 du Code pénal.
      </p>
      <p>
        Pratiquement, cela veut dire une chose : gardez les échanges écrits. Un refus formulé au
        téléphone ne laisse rien ; la même phrase par message vaut un début de preuve.
      </p>

      <h2 id="sanctions">Les sanctions</h2>
      <ul>
        <li>
          Un refus de louer fondé sur un critère interdit expose son auteur, propriétaire ou
          professionnel de l&apos;immobilier, à <strong>trois ans d&apos;emprisonnement et
          45&nbsp;000&nbsp;€ d&apos;amende</strong>.
        </li>
        <li>
          Demander une pièce qui ne figure pas dans la liste autorisée est passible d&apos;une
          amende pouvant aller jusqu&apos;à <strong>3&nbsp;000&nbsp;€</strong> pour un particulier.
        </li>
        <li>
          Si la victime se constitue partie civile, elle peut aussi demander des dommages et
          intérêts.
        </li>
      </ul>
      <p>
        Quand c&apos;est le propriétaire qui discrimine, l&apos;agent immobilier qui a transmis sa
        consigne ne peut pas être poursuivi pénalement à sa place.
      </p>

      <h2 id="recours">Où signaler</h2>
      <ul>
        <li>
          <strong>Le Défenseur des droits</strong>, gratuitement. Il peut proposer une médiation,
          une transaction validée par le procureur, ou saisir la justice. C&apos;est la voie la
          plus simple, et la seule pour un refus dans le logement social.
        </li>
        <li>
          <strong>Une plainte pénale</strong>, dans n&apos;importe quel commissariat ou brigade de
          gendarmerie, dans les six ans suivant les faits. Un signalement en ligne n&apos;est pas
          une plainte.
        </li>
      </ul>
      <p>
        Les démarches, les coordonnées à jour et les décisions publiées se trouvent sur{" "}
        <a
          href="https://www.defenseurdesdroits.fr/discriminations-la-location-de-logement-338"
          target="_blank"
          rel="noopener"
        >
          la page du Défenseur des droits consacrée à la location
        </a>
        .
      </p>

      <h2 id="entre-temps">Entre-temps, le dossier</h2>
      <p>
        Une procédure prend des mois et ne vous loge pas. Pendant ce temps, ce qui fait la
        différence reste le nombre de candidatures bien ciblées et la qualité du premier message.
        La <Link href="/outils/dossier-de-location">checklist de dossier</Link> dit quelles pièces
        réunir, le <Link href="/outils/message-de-candidature">générateur de message</Link> écrit
        la candidature, et la{" "}
        <Link href="/guides/garantie-visale">garantie Visale</Link> répond à la question du garant
        avant qu&apos;elle soit posée.
      </p>
    </CadreGuide>
  );
}
