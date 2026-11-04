import Link from "next/link";

/**
 * Corps de l'article « le propriétaire ne répond pas » (brief :
 * docs/seo/blog/briefs/proprietaire-ne-repond-pas.md).
 *
 * Le silence avant la visite, côté candidat. Aucune cause n'est présentée
 * comme mesurée : il n'existe pas de donnée publique sur les taux de réponse
 * des propriétaires, ni sur le délai idéal d'une relance. Les seuls faits
 * chiffrés ou juridiques viennent de Service-public (F1169, F34092).
 */
export default function ProprietaireNeRepondPas() {
  return (
    <>
      <p>
        Vous avez répondu à une annonce, le logement vous plaisait, et rien ne revient. Ce silence
        ne dit pas grand-chose sur vous. Il dit surtout que le propriétaire n&apos;a pas eu de
        raison de vous répondre à ce moment-là. Une partie des raisons vous échappe, deux autres
        dépendent de vous : le moment où votre message arrive et ce qu&apos;il contient.
      </p>

      <h2 id="pourquoi">Pourquoi un propriétaire ne répond-il pas ?</h2>
      <p>
        Vous ne le saurez pas avec certitude, et personne ne publie de chiffres sur le sujet. Les
        explications les plus courantes sont connues : le logement a déjà trouvé preneur, ou les
        visites sont déjà calées ; votre message est arrivé après beaucoup d&apos;autres ; il ne
        donnait pas de quoi décider ; il ressemblait à un texte envoyé à vingt annonces ;
        l&apos;annonce a été retirée.
      </p>
      <p>
        Les deux premières tiennent au moment, les deux suivantes au contenu. C&apos;est là que vous
        avez prise. La dernière ne dépend de personne.
      </p>

      <h2 id="contenu">Votre message donnait-il de quoi décider ?</h2>
      <p>
        Relisez-le avec les yeux d&apos;un propriétaire qui en reçoit beaucoup. Il cherche en
        quelques secondes{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          les six informations qui servent à vous trier
        </Link>{" "}
        : votre métier et votre contrat, votre revenu, votre garant, le nombre d&apos;occupants, la
        date d&apos;emménagement et la durée envisagée. S&apos;il en manque, il doit vous écrire pour
        les demander, et c&apos;est souvent là qu&apos;il passe au message suivant.
      </p>

      <h2 id="relancer">Faut-il relancer, et quand ?</h2>
      <p>
        Une fois, brièvement, et avec quelque chose de neuf. Aucune règle ne fixe de délai : laissez
        quelques jours, pas quelques heures. Une relance qui répète « je suis toujours intéressé »
        n&apos;apporte rien ; une relance qui ajoute une information utile donne une raison de
        répondre.
      </p>
      <p>Un exemple, à adapter, avec des noms inventés :</p>
      <blockquote>
        <p>
          Bonjour Monsieur Durand,
          <br />
          Je reviens vers vous au sujet du deux-pièces de la rue des Tilleuls. Je bénéficie de la
          garantie Visale et mon dossier est complet, je peux vous l&apos;envoyer aujourd&apos;hui.
          Je suis disponible pour une visite jeudi ou vendredi après 18 h.
          <br />
          Bien cordialement, Léa Exemple
        </p>
      </blockquote>
      <p>
        Le{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>{" "}
        vous aide à écrire ce genre de texte. Il est gratuit et n&apos;envoie rien : c&apos;est vous
        qui copiez et envoyez.
      </p>

      <h2 id="agences">Et les agences, pourquoi ne répondent-elles pas ?</h2>
      <p>
        Pour les mêmes raisons, avec une différence : une agence attend souvent un dossier complet
        avant d&apos;organiser une visite. Mieux vaut l&apos;avoir prêt, avec seulement les pièces
        que la loi autorise. La liste est limitative, et elle est détaillée dans le guide du{" "}
        <Link href="/guides/dossier-de-location">dossier de location</Link>.
      </p>

      <h2 id="passer">Quand passer à autre chose ?</h2>
      <p>
        Quand l&apos;annonce a disparu, ou quand votre relance est restée sans réponse. Le temps
        passé à attendre un logement qui ne répond pas est pris sur les annonces qui paraissent
        pendant ce temps. Si la réponse finit par arriver et que c&apos;est un refus, le guide sur
        le <Link href="/guides/refus-de-dossier">refus de dossier</Link> dit ce qui est permis.
      </p>

      <h2 id="argent">Il répond tout de suite, et demande de l&apos;argent : que faire ?</h2>
      <p>
        Ne payez rien. Service-public est clair : « aucune somme d&apos;argent ne peut être
        réclamée par le propriétaire avant la signature du bail d&apos;habitation ». La même
        administration cite parmi les signes d&apos;une fausse annonce une demande d&apos;argent
        avant la signature, une demande de documents officiels comme la carte d&apos;identité avant
        la visite, et un propriétaire qui refuse de vous rencontrer.
      </p>
      <p>
        Si on vous a demandé de l&apos;argent pour une annonce dont vous n&apos;avez jamais
        rencontré l&apos;auteur, vous pouvez la signaler en ligne sur la plateforme officielle
        THESEE, même si vous n&apos;avez rien versé. La démarche est décrite sur la{" "}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/F34092"
          target="_blank"
          rel="noopener"
        >
          fiche de Service-public sur les arnaques à la location
        </a>
        .
      </p>

      <h2 id="prochaine-fois">Comment répondre plus tôt la prochaine fois ?</h2>
      <p>
        En préparant avant que l&apos;annonce paraisse ce que vous rédigiez après : des alertes de
        recherche aux critères assez larges, un message prêt à adapter en une minute, un dossier
        complet. La garantie Visale, si vous y avez droit, se demande avant d&apos;avoir trouvé le
        logement : vous répondez à la question du garant avant qu&apos;elle soit posée.
      </p>
      <p>
        C&apos;est le travail que Terouva fait pour vous : il vous signale les annonces qui
        correspondent à votre recherche et prépare votre réponse. Vous la relisez, vous
        l&apos;envoyez vous-même.{" "}
        <a href="#prevenu" className="lien">
          Être prévenu du lancement
        </a>
      </p>
    </>
  );
}
