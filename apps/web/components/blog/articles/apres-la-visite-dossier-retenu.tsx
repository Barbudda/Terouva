import Link from "next/link";

/**
 * Corps de l'article « après la visite ». Les chiffres viennent de
 * Service-public, relevés le 2026-11-04 : honoraires F375 (vérifiée le 12
 * janvier 2026), dépôt F31269 et état des lieux F31270 (déjà dans FAITS.md),
 * Visale F33453, « aucune somme avant le bail » F1169 (vérifiée le 10 avril
 * 2025), discrimination F14750.
 *
 * Volontairement absent : un délai légal de réponse du propriétaire et une
 * obligation de motiver un refus. Aucune source lue n'en parle ; l'article ne
 * dit donc ni qu'ils existent ni qu'ils n'existent pas. La règle de relance
 * reprend celle du guide « répondre à une annonce » pour ne pas le contredire.
 */
export default function ApresLaVisiteDossierRetenu() {
  return (
    <>
      <p>
        La visite s&apos;est bien passée, vous avez laissé votre dossier, et depuis, rien. Ou un
        « on revient vers vous » qui peut vouloir dire beaucoup de choses. Voici comment lire les
        signaux, quand relancer, ce que personne ne peut vous demander pendant l&apos;attente, et ce
        qu&apos;il faut vérifier le jour où la réponse est oui.
      </p>

      <h2 id="signes">À quoi voit-on qu&apos;un dossier de location est retenu ?</h2>
      <p>
        Un dossier est retenu quand on vous propose de signer. Concrètement, l&apos;un de ces
        messages arrive :
      </p>
      <ul>
        <li>l&apos;envoi du projet de bail, pour que vous le relisiez ;</li>
        <li>une date proposée pour la signature ou pour l&apos;état des lieux d&apos;entrée ;</li>
        <li>
          la demande de votre visa Visale pour ce logement, si vous en avez une. Le visa se demande
          avant la signature du bail, et Service-public compte quelques jours ouvrés pour
          l&apos;obtenir : lancez-le dès qu&apos;on vous le demande ;
        </li>
        <li>la demande des pièces de votre garant, si elles n&apos;étaient pas dans le dossier.</li>
      </ul>
      <p>
        À l&apos;inverse, « votre dossier est très bien », « vous êtes en haut de la liste » ou
        « on attend la réponse du propriétaire » sont de bons signes, pas un accord. Tant que rien
        n&apos;est signé, gardez vos autres candidatures en cours.
      </p>

      <h2 id="attendre">Combien de temps attendre avant de relancer ?</h2>
      <p>
        Si l&apos;agence ou le propriétaire vous a donné une date à la visite, attendez-la. Sinon,
        appliquez la même règle qu&apos;après un premier message : une relance, deux ou trois jours
        après, et pas davantage. Courte, polie, avec un élément nouveau si vous en avez un : une
        date d&apos;emménagement plus souple, un visa Visale obtenu, une pièce qui manquait.
      </p>
      <p>
        Exemple : « Bonjour, je vous remercie encore pour la visite de mardi. L&apos;appartement
        m&apos;intéresse toujours beaucoup. Mon visa Visale est arrivé, je peux vous l&apos;envoyer si
        cela vous aide à décider. Bonne journée. » Le{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>{" "}
        vous aide à écrire ce genre de message dans votre ton.
      </p>
      <p>
        Pendant l&apos;attente, notez pour chaque logement la date de visite, ce que vous avez
        envoyé et la date de votre relance. Quand vous candidatez à plusieurs annonces, c&apos;est ce
        qui évite de relancer deux fois la même personne.
      </p>

      <h2 id="argent">Peut-on vous demander de l&apos;argent pour garder le logement ?</h2>
      <p>
        Non. Service-public le dit sans détour : le propriétaire, ou l&apos;agence, a
        « interdiction de réclamer une somme d&apos;argent en contrepartie de la réservation du
        logement », et aucune somme ne peut être réclamée avant la signature du bail. Un chèque de
        réservation, des arrhes ou un virement pour « bloquer » l&apos;appartement n&apos;ont pas lieu
        d&apos;être, même quand on vous les présente comme remboursables. Si on insiste, c&apos;est
        aussi l&apos;un des signes d&apos;une fausse annonce.
      </p>
      <p>
        On ne peut pas non plus vous demander de nouvelles pièces hors de la liste légale pour
        départager les candidats. Le{" "}
        <Link href="/guides/dossier-de-location">guide du dossier de location</Link> donne cette
        liste et la façon de refuser une pièce interdite sans perdre le logement.
      </p>

      <h2 id="oui">On vous dit oui : que vérifier avant de signer ?</h2>
      <p>Quatre points, à regarder avant de payer quoi que ce soit :</p>
      <ol>
        <li>
          <strong>Les honoraires d&apos;agence.</strong> Pour le dossier, la visite et la rédaction
          du bail, votre part ne peut dépasser ni la moitié de ce que l&apos;agence facture, ni un
          plafond par mètre carré habitable : 12,10 € en zone très tendue, 10,09 € en zone tendue,
          8,07 € ailleurs. Pour 25 m² en zone tendue, c&apos;est au plus 252,25 €, et moins si la
          moitié des honoraires est inférieure.
        </li>
        <li>
          <strong>L&apos;état des lieux d&apos;entrée.</strong> S&apos;il est fait par
          l&apos;agence, votre part est au plus la moitié, et au plus 3,03 € par mètre carré.
        </li>
        <li>
          <strong>Le dépôt de garantie.</strong> Un mois de loyer hors charges au maximum pour un
          logement vide, deux mois pour un meublé.
        </li>
        <li>
          <strong>Le bail lui-même.</strong> Relisez le loyer, les charges, la date d&apos;effet et
          la durée. Ce qui a été dit à la visite et qui compte pour vous doit y être écrit.
        </li>
      </ol>
      <p>
        Rien de tout cela ne se paie avant la signature du bail.
      </p>

      <h2 id="non">Pas de réponse, ou un refus : que faire ?</h2>
      <p>
        Un silence ne vous dit pas pourquoi. Après votre unique relance, passez à l&apos;annonce
        suivante sans attendre davantage.
      </p>
      <p>
        Un refus peut avoir des raisons légitimes : le propriétaire peut apprécier votre situation
        financière et la solidité de vos garanties, et préférer un dossier plus solide. Il ne peut
        pas reposer sur un motif discriminatoire : la loi en liste vingt-cinq, dont l&apos;origine,
        l&apos;âge, l&apos;état de santé ou le lieu de résidence. Si vous pensez être dans ce cas, le{" "}
        <Link href="/guides/refus-de-dossier">guide du refus de dossier</Link> explique comment
        réunir des preuves et à qui vous adresser. Et si c&apos;est l&apos;absence de garant qui
        bloque, la{" "}
        <Link href="/guides/garantie-visale">garantie Visale</Link> est la première chose à
        regarder.
      </p>
      <p>
        Pour la prochaine annonce, ce qui fait la différence se joue avant la visite : un message
        envoyé tôt et un dossier complet. Le{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          guide pour répondre à une annonce
        </Link>{" "}
        détaille les deux.
      </p>
    </>
  );
}
