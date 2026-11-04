import Link from "next/link";

/**
 * Corps de l'article « mail après une visite d'appartement » (brief :
 * docs/seo/blog/briefs/mail-apres-visite-appartement.md).
 *
 * Le moment qui suit la visite, que le guide pilier ne traite pas : il
 * s'arrête à la relance d'un premier message. Le modèle est marqué comme
 * exemple, avec des noms inventés. Faits juridiques : F1169 et R51424.
 */
export default function MailApresVisiteAppartement() {
  return (
    <>
      <p>
        La visite s&apos;est bien passée, le logement vous convient, et le propriétaire voit
        d&apos;autres candidats dans la journée. Un mail court, envoyé le jour même, redit votre
        intérêt et lui donne ce dont il a besoin pour décider : votre dossier, et la réponse aux
        questions restées ouvertes pendant la visite.
      </p>

      <h2 id="faut-il">Faut-il envoyer un mail après une visite ?</h2>
      <p>
        Oui, si le logement vous intéresse. Après les visites, le propriétaire compare les
        candidats qu&apos;il a vus. Un dossier déjà dans sa boîte de réception lui évite de vous le
        réclamer, et vous place parmi ceux qu&apos;il peut retenir tout de suite.
      </p>

      <h2 id="contenu">Que mettre dans ce mail ?</h2>
      <p>Quatre choses, dans cet ordre :</p>
      <ol>
        <li>un remerciement d&apos;une ligne, qui rappelle le logement et le jour de la visite ;</li>
        <li>
          votre intérêt, avec un détail de la visite qui montre que vous vous projetez (la cuisine
          refaite, le calme côté cour) ;
        </li>
        <li>
          la réponse à ce qui est resté en suspens : votre date d&apos;arrivée, votre garant, une
          pièce que le propriétaire attendait ;
        </li>
        <li>votre dossier, ou le lien pour le consulter, et votre téléphone.</li>
      </ol>

      <h2 id="modele">Un exemple de mail après une visite</h2>
      <p>À adapter, les noms sont inventés :</p>
      <blockquote>
        <p>
          Objet : Visite du deux-pièces, rue des Tilleuls
          <br />
          Bonjour Madame Bernard,
          <br />
          Merci pour la visite de ce matin. L&apos;appartement me plaît beaucoup, en particulier la
          chambre sur cour, très calme.
          <br />
          Comme convenu, je vous confirme que je peux emménager à partir du 1er décembre. Vous
          trouverez mon dossier complet en lien, avec l&apos;attestation de la garantie Visale.
          <br />
          Je reste disponible au 06 00 00 00 00 pour toute question.
          <br />
          Bien cordialement, Léa Exemple
        </p>
      </blockquote>
      <p>
        Pour la première prise de contact, avant la visite, le{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link> vous
        aide à écrire votre réponse à l&apos;annonce. Il n&apos;envoie rien.
      </p>

      <h2 id="quand">Quand l&apos;envoyer ?</h2>
      <p>
        Le jour de la visite, pendant que le propriétaire a encore votre visage en tête et avant
        qu&apos;il ait arrêté son choix. Aucune règle ne fixe de délai : c&apos;est un conseil de bon
        sens, pas une obligation. Si vous n&apos;avez pas de réponse, une seule relance quelques
        jours plus tard suffit.
      </p>

      <h2 id="dossier">Faut-il joindre son dossier ?</h2>
      <p>
        Oui, s&apos;il ne l&apos;a pas déjà. Un seul fichier ou un seul lien vaut mieux que dix
        pièces jointes. Le service public{" "}
        <a href="https://www.dossierfacile.logement.gouv.fr/" target="_blank" rel="noopener">
          DossierFacile
        </a>
        , gratuit, vérifie que votre dossier est complet et vous donne un lien unique à
        communiquer au propriétaire.
      </p>
      <p>
        N&apos;envoyez que les pièces que la loi autorise : la liste est limitative, et le{" "}
        <Link href="/guides/dossier-de-location">guide du dossier de location</Link> la reprend.
        Un propriétaire qui réclame un justificatif non autorisé encourt une amende pouvant aller
        jusqu&apos;à 3 000 €, 15 000 € pour une personne morale.
      </p>

      <h2 id="argent">On vous demande de l&apos;argent après la visite : que faire ?</h2>
      <p>
        Refusez. Service-public le rappelle : « aucune somme d&apos;argent ne peut être réclamée
        par le propriétaire avant la signature du bail d&apos;habitation », pas même pour
        « réserver » le logement. Le dépôt de garantie et le premier loyer se versent une fois le
        bail signé.
      </p>

      <h2 id="non">Et si le logement ne vous convient pas ?</h2>
      <p>
        Dites-le aussi, en deux lignes : merci pour la visite, vous ne donnerez pas suite. Rien ne
        vous y oblige, mais le propriétaire peut passer au candidat suivant, et vous fermez proprement
        un dossier dans votre propre suivi.
      </p>
      <p>
        Pour répondre aux prochaines annonces aussi vite qu&apos;à celle-ci, le guide{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        reprend ce que le premier message doit contenir. Et Terouva vous signale les annonces qui
        vous correspondent, avec votre réponse préparée, que vous relisez et envoyez vous-même.{" "}
        <a href="#prevenu" className="lien">
          Être prévenu du lancement
        </a>
      </p>
    </>
  );
}
