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
  modifieLe: GUIDE.modifieLe,
});

/*
 * Chaque section s'ouvre sur la question telle qu'on la tape et sur sa réponse
 * autonome, de 40 à 60 mots ; le développement qui suit apporte le détail et
 * les références sans redire la réponse.
 */
export default function GuideRefusDeDossier() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        Après dix candidatures sans réponse, la question vient toujours : a-t-on le droit de me
        refuser comme ça ?
      </p>

      <h2 id="principe">Le propriétaire doit-il justifier un refus de dossier ?</h2>
      <p>
        Non. Il choisit librement son locataire, sur des critères objectifs liés à la location et
        aux garanties de paiement, sans obligation d&apos;expliquer sa décision, de répondre dans
        un délai ni de classer les candidats. La loi encadre seulement la raison du refus : elle
        lui interdit de refuser de louer pour un motif discriminatoire.
      </p>
      <p>
        Cette interdiction est posée par l&apos;<span className="loi">article 1er</span> de la{" "}
        <span className="loi">loi du 6 juillet 1989</span>. Et selon le Défenseur des droits, elle
        s&apos;applique même sans intention de discriminer : un réflexe de tri, une consigne
        d&apos;agence, une habitude suffisent.
      </p>

      <h2 id="raisons">Pourquoi un dossier de location est-il refusé ?</h2>
      <p>
        Souvent pour une raison banale : des revenus jugés trop justes face au loyer, pas
        de garant, un dossier incomplet, ou un autre candidat au dossier plus solide, ou arrivé
        plus tôt. L&apos;ANIL cite les trois premiers parmi les motifs courants. Aucun ne relève de
        la discrimination.
      </p>
      <p>
        Le seuil de « trois fois le loyer » que demandent beaucoup de propriétaires et
        d&apos;agences n&apos;est fixé par aucun texte : la liste officielle des justificatifs ne
        prévoit aucun minimum de revenus. C&apos;est une habitude, que chacun applique à sa façon,
        et qu&apos;un garant ou la <Link href="/guides/garantie-visale">garantie Visale</Link> peut
        compenser.
      </p>
      <p>
        Un refus ne dit donc pas que votre dossier est mauvais. Sur une annonce qui reçoit
        beaucoup de messages, il dit souvent qu&apos;un autre dossier est arrivé avant le vôtre, ou
        paraissait plus sûr.
      </p>

      <h2 id="interdits">Quels sont les motifs de refus interdits ?</h2>
      <p>
        L&apos;article 225-1 du Code pénal en liste vingt-cinq. Parmi eux : l&apos;origine, le
        sexe, la situation de famille, la grossesse, l&apos;âge, le nom, le lieu de résidence,
        l&apos;état de santé, le handicap, la religion et la vulnérabilité économique. Un refus
        fondé sur l&apos;un d&apos;eux est une discrimination.
      </p>
      <p>
        La liste complète, telle que l&apos;<span className="loi">article 225-1</span> la regroupe :
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
        Deux points reviennent souvent dans les dossiers du Défenseur des droits. Pour le garant,
        la loi de 1989 est plus précise que le Code pénal : un propriétaire qui exige une caution
        ne peut pas la refuser parce qu&apos;elle n&apos;a pas la nationalité française ou
        qu&apos;elle ne réside pas en métropole (<span className="loi">article 22-1</span>). Et
        quand une agence a écarté un candidat parce qu&apos;une partie de ses revenus était une
        pension d&apos;invalidité, le Défenseur des droits a retenu une discrimination fondée sur
        le handicap (<span className="loi">décision 2019-001</span>). La décision
        précise que préférer des revenus d&apos;activité n&apos;est pas interdit en soi, mais
        que l&apos;exclusion des personnes handicapées qui en résulte fait présumer la
        discrimination.
      </p>

      <h2 id="legitimes">Quels motifs de refus restent légitimes ?</h2>
      <p>
        Ceux qui tiennent à la location elle-même et à votre capacité à payer : le propriétaire
        peut apprécier votre situation financière et la solidité de vos garanties, à partir des
        pièces de la liste autorisée. Un dossier moins solide qu&apos;un autre peut donc être
        écarté sans que la loi ait rien à dire. C&apos;est le cas de la plupart des refus.
      </p>
      <p>
        Les pièces qu&apos;il peut demander portent sur votre identité, votre domicile, votre
        situation professionnelle et vos ressources. Il ne peut pas réclamer un relevé de compte bancaire ni
        un contrat de mariage. Refuser quelqu&apos;un qui veut exercer une activité
        professionnelle dans le logement n&apos;est pas une discrimination. Quand le refus est
        légitime, ce qui se joue est sur le terrain du{" "}
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

      <h2 id="cas">Refus pour chômage, APL, enfants ou animal : que dit la loi ?</h2>
      <p>
        Tout dépend du motif. Les enfants, l&apos;âge, l&apos;état de santé et le handicap sont des
        critères interdits, comme la nationalité d&apos;un garant. Un animal n&apos;en est pas un.
        Le chômage n&apos;est pas un critère en soi, mais la vulnérabilité économique en est un ;
        et nous n&apos;avons lu aucune décision qui tranche le cas des APL.
      </p>
      <p>Chaque situation a sa page, avec les règles et les pièces qui rassurent :</p>
      <ul>
        <li>
          <Link href="/blog/refus-location-chomage">refus de location au chômage</Link> : ce que le
          propriétaire peut écarter, et ce qu&apos;il ne peut pas ;
        </li>
        <li>
          <Link href="/blog/louer-avec-rsa-aah">louer avec le RSA ou l&apos;AAH</Link> : une pièce de
          la liste officielle, jugée comme les autres revenus ;
        </li>
        <li>
          <Link href="/blog/proprietaire-refuse-apl">propriétaire qui refuse les APL</Link> : la
          question légale, et l&apos;argument du versement direct ;
        </li>
        <li>
          <Link href="/blog/refus-location-enfants">refus de location à cause des enfants</Link> :
          la situation de famille est un critère interdit ;
        </li>
        <li>
          <Link href="/blog/proprietaire-refuser-animal-location">refus pour un animal</Link> :
          possible au moment du choix, pas dans le bail ;
        </li>
        <li>
          <Link href="/blog/louer-appartement-retraite">louer à la retraite, après 70 ans</Link> :
          l&apos;âge ne peut pas être retenu ;
        </li>
        <li>
          <Link href="/blog/louer-en-arret-maladie">louer en arrêt maladie ou en invalidité</Link> :
          ce que vous n&apos;avez pas à montrer ;
        </li>
        <li>
          <Link href="/blog/louer-avec-recepisse-titre-de-sejour">
            louer avec un récépissé de titre de séjour
          </Link>{" "}
          : la pièce d&apos;identité que le propriétaire peut exiger ;
        </li>
        <li>
          <Link href="/blog/garant-etranger-location">garant étranger refusé</Link> : ce que dit
          l&apos;article 22-1 ;
        </li>
        <li>
          <Link href="/blog/louer-en-interim">refus d&apos;un intérimaire</Link> : montrer des
          revenus réguliers et ajouter une garantie ;
        </li>
        <li>
          <Link href="/blog/fiche-banque-de-france-louer-appartement">
            fiché à la Banque de France
          </Link>{" "}
          : un fichage que le propriétaire ne voit pas ;
        </li>
        <li>
          <Link href="/blog/anciens-impayes-loyer-fichier-locataires">
            d&apos;anciens impayés de loyer
          </Link>{" "}
          : ce qui peut ressortir, et comment l&apos;expliquer ;
        </li>
        <li>
          <Link href="/blog/refus-assurance-loyers-impayes">
            dossier refusé par l&apos;assurance loyers impayés
          </Link>{" "}
          : demander le motif à l&apos;assureur ;
        </li>
        <li>
          <Link href="/blog/visale-refusee">garantie Visale refusée</Link> : corriger la demande
          et la refaire.
        </li>
      </ul>

      <h2 id="motif">Peut-on demander au propriétaire pourquoi il a refusé ?</h2>
      <p>
        Oui, et c&apos;est souvent utile. Rien ne l&apos;oblige à répondre, mais une réponse vous dit
        ce qui a manqué : des revenus, un garant, une pièce. Demandez par écrit, en une phrase et
        sans reproche. Si le motif donné est interdit, ce message devient une preuve.
      </p>
      <p>
        Si le refus tient à une pièce que vous n&apos;avez pas fournie, vérifiez qu&apos;elle figure
        dans la liste officielle. Le propriétaire ou l&apos;agence ne peut exiger que des
        justificatifs d&apos;identité, de domicile, de situation professionnelle et de ressources ;
        réclamer autre chose est puni d&apos;une amende, détaillée plus bas.
      </p>

      <h2 id="preuve">Comment prouver une discrimination au logement ?</h2>
      <p>
        En réunissant des éléments datés qui laissent supposer un motif interdit : messages,
        courriels et captures d&apos;écran avec l&apos;identité de leur auteur, témoignages,
        résultat d&apos;un testing. Devant le juge civil, c&apos;est ensuite au propriétaire de
        démontrer que sa décision repose sur des éléments objectifs. Ce partage de la preuve ne
        vaut pas pour la plainte pénale.
      </p>
      <p>
        Si le motif touche à la santé ou au handicap, un certificat médical s&apos;ajoute à ces
        éléments. Le testing lui-même est encadré par l&apos;
        <span className="loi">article 225-3-1</span> du Code pénal. Le juge civil est celui à qui
        vous demandez réparation, et le partage de la preuve devant lui vient de l&apos;
        <span className="loi">article 1er</span> de la loi de 1989.
      </p>
      <p>
        Gardez les échanges écrits. Un refus formulé au
        téléphone ne laisse rien ; la même phrase par message vaut un début de preuve.
      </p>

      <h2 id="sanctions">Que risque un propriétaire qui refuse un dossier pour un motif interdit ?</h2>
      <p>
        Jusqu&apos;à trois ans d&apos;emprisonnement et 45&nbsp;000&nbsp;€ d&apos;amende, et
        jusqu&apos;à cinq ans et 75&nbsp;000&nbsp;€ quand les faits ont lieu dans un lieu
        accueillant du public. La peine vise l&apos;auteur du refus, propriétaire ou professionnel
        de l&apos;immobilier. La victime qui se constitue partie civile peut aussi demander des
        dommages et intérêts.
      </p>
      <p>
        Une autre sanction vise le dossier lui-même : demander une pièce qui ne figure pas dans la
        liste autorisée est passible d&apos;une amende pouvant aller jusqu&apos;à{" "}
        <strong>3&nbsp;000&nbsp;€</strong> pour un particulier, et 15&nbsp;000&nbsp;€ pour une
        personne morale comme une agence (<span className="loi">article 22-2</span> de la loi de
        1989). Et quand c&apos;est le propriétaire
        qui discrimine, l&apos;agent immobilier qui a transmis sa consigne ne peut pas être
        poursuivi pénalement à sa place.
      </p>

      <h2 id="recours">Où signaler un refus de location discriminatoire ?</h2>
      <p>
        Au Défenseur des droits, gratuitement : il peut proposer une médiation, une transaction
        validée par le procureur, ou saisir la justice. Vous pouvez aussi porter plainte dans
        n&apos;importe quel commissariat ou brigade de gendarmerie, dans les six ans suivant les
        faits. Un signalement en ligne ne vaut pas plainte.
      </p>
      <p>
        Le Défenseur des droits est souvent la voie la plus simple. Il se saisit gratuitement, en
        ligne ou au 3928, et s&apos;il propose une médiation, elle dure trois mois au plus,
        renouvelable une fois.
        Ses démarches, ses coordonnées à jour et les décisions qu&apos;il a publiées se trouvent
        sur{" "}
        <a
          href="https://www.defenseurdesdroits.fr/discriminations-la-location-de-logement-338"
          target="_blank"
          rel="noopener"
        >
          sa page consacrée à la location
        </a>
        .
      </p>
      <p>
        Avant d&apos;engager quoi que ce soit, vous pouvez aussi interroger l&apos;ADIL de votre
        département, l&apos;agence d&apos;information sur le logement : l&apos;ANIL présente ce
        conseil comme gratuit et neutre, et service-public y renvoie pour les questions sur le
        dossier de location.
      </p>

      <h2 id="entre-temps">Que faire après un refus de dossier de location ?</h2>
      <p>
        Si le refus vous semble discriminatoire, signalez-le, mais une procédure prend des mois et
        ne vous loge pas. Dans la plupart des cas, la suite se joue sur la candidature suivante :
        un dossier complet prêt à partir, un premier message envoyé tôt, et la question du garant
        réglée avant la visite.
      </p>
      <p>
        Pour chacun de ces trois points, un outil : la{" "}
        <Link href="/outils/dossier-de-location">checklist de dossier</Link> dit quelles pièces
        réunir, le <Link href="/outils/message-de-candidature">générateur de message</Link> écrit
        la candidature, et la <Link href="/guides/garantie-visale">garantie Visale</Link> répond à
        la question du garant avant qu&apos;elle soit posée.
      </p>
    </CadreGuide>
  );
}
