import Link from "next/link";

/**
 * Corps de l'article « arnaque à la location ». Tout ce qui est affirmé vient
 * de trois pages officielles relevées le 2026-11-04 : la fiche F34092 de
 * Service-public (vérifiée le 16 octobre 2024), la fiche réflexe de
 * Cybermalveillance (mise à jour le 28 octobre 2026) et la démarche THESEE
 * R47990 (vérifiée le 28 novembre 2024). La règle « aucune somme avant le bail »
 * vient de F1169 (vérifiée le 10 avril 2025).
 *
 * Volontairement absent : tout chiffre sur le nombre de victimes ou le montant
 * des préjudices. Aucune des sources lues n'en donne pour la location, et on
 * n'en invente pas. Aucun site d'annonces n'est nommé : la fiche de
 * Cybermalveillance en cite plusieurs, mais l'arnaque ne dépend pas du site.
 */
export default function ArnaqueLocationReconnaitreFausseAnnonce() {
  return (
    <>
      <p>
        Un deux-pièces bien placé, un loyer raisonnable, un propriétaire aimable qui vit loin et
        vous propose de « bloquer » le logement par un petit virement. C&apos;est le scénario le plus
        courant de l&apos;arnaque à la location. Il vise deux choses : votre argent, et les copies de
        vos papiers, qui servent ensuite à usurper votre identité. Voici comment le reconnaître
        avant d&apos;envoyer quoi que ce soit, et quoi faire si c&apos;est déjà fait.
      </p>

      <h2 id="signes">Quels signes trahissent une fausse annonce de location ?</h2>
      <p>Service-public en cite cinq. Chacun, seul, justifie de ralentir :</p>
      <ul>
        <li>un loyer très bas par rapport à l&apos;emplacement, à la surface ou au standing ;</li>
        <li>des photos que l&apos;on retrouve dans une autre annonce ;</li>
        <li>un propriétaire au comportement étrange, qui refuse par exemple de vous rencontrer ;</li>
        <li>une demande d&apos;argent avant la signature du bail ;</li>
        <li>une demande de papiers officiels, comme la carte d&apos;identité, avant la visite.</li>
      </ul>
      <p>
        Cybermalveillance ajoute un trait de caractère : le faux bailleur est soit distant, soit très
        insistant. Il explique qu&apos;il habite loin, qu&apos;il ne veut pas se déplacer pour rien,
        ou qu&apos;il veut s&apos;assurer de votre intérêt. Pour une location à l&apos;année, méfiez-vous
        aussi de quiconque trouve des prétextes pour repousser la visite.
      </p>

      <h2 id="verifier">Comment vérifier une annonce avant d&apos;y répondre ?</h2>
      <p>Trois vérifications, qui prennent moins de temps que d&apos;écrire le message :</p>
      <ol>
        <li>
          <strong>Le prix.</strong> Comparez avec deux ou trois annonces semblables du même
          quartier. Un écart très net sans explication est le premier signal.
        </li>
        <li>
          <strong>Les photos et le texte.</strong> Passez-les dans un moteur de recherche. Si la même
          annonce apparaît ailleurs avec un autre contact, vous avez votre réponse.
        </li>
        <li>
          <strong>L&apos;agence.</strong> Si une agence publie l&apos;annonce, vérifiez qu&apos;elle
          existe et qu&apos;elle en est bien l&apos;auteur, en la contactant par ses coordonnées
          officielles, pas par celles de l&apos;annonce.
        </li>
      </ol>
      <p>
        Au moindre doute avec un particulier, Cybermalveillance conseille de demander une copie de
        la taxe foncière, pour vérifier que le logement est bien le sien.
      </p>

      <h2 id="argent">Un propriétaire peut-il vous demander de l&apos;argent avant le bail ?</h2>
      <p>
        Non. Service-public est net : le propriétaire, ou l&apos;agence, a « interdiction de
        réclamer une somme d&apos;argent en contrepartie de la réservation du logement », et aucune
        somme ne peut être réclamée avant la signature du bail. Un « chèque de réservation », des
        arrhes ou une « caution pour bloquer l&apos;appartement » sont donc des demandes illégales,
        que l&apos;annonce soit vraie ou non.
      </p>
      <p>
        Le dépôt de garantie et le premier loyer se paient au moment du bail. Cybermalveillance
        recommande d&apos;attendre la remise des clés pour les verser, et de ne les régler que par
        virement ou par chèque. Refusez dans tous les cas :
      </p>
      <ul>
        <li>les coupons de paiement (PCS, Transcash, Neosurf) ;</li>
        <li>les mandats et transferts d&apos;argent (Western Union, MoneyGram, mandat cash) ;</li>
        <li>les virements vers un compte à l&apos;étranger ;</li>
        <li>les espèces.</li>
      </ul>

      <h2 id="documents">Quand envoyer vos papiers, et comment les protéger ?</h2>
      <p>
        Après la visite, pas avant. Une demande de pièce d&apos;identité avant d&apos;avoir vu le
        logement fait partie des signes listés par Service-public. Quand vous envoyez votre
        dossier, Cybermalveillance conseille de marquer chaque copie avec le motif, la date et le
        destinataire, par exemple « Candidature location rue des Lilas, pour M. Martin, le 3
        février », pour éviter qu&apos;elle soit réutilisée ailleurs. Deux services publics cités
        par Cybermalveillance aident à le faire : Filigrane Facile, qui pose ce marquage sur vos
        fichiers, et DossierFacile, qui sert à constituer et partager un dossier de location.
      </p>
      <p>
        N&apos;envoyez que les pièces que la loi autorise. Un relevé de compte, par exemple, ne fait
        pas partie de la liste : le{" "}
        <Link href="/guides/dossier-de-location">guide du dossier de location</Link> donne la liste
        complète, et l&apos;<Link href="/outils/dossier-de-location">outil de dossier</Link> la
        prépare selon votre situation.
      </p>

      <h2 id="visite">Une visite suffit-elle à écarter l&apos;arnaque ?</h2>
      <p>
        Pas toujours. Cybermalveillance décrit des escrocs qui louent le logement pour une journée,
        le font visiter, puis réclament sur place la caution et le premier loyer en espèces. Une
        visite rassure, mais la règle reste la même : rien ne se paie avant la signature du bail, et
        rien en espèces.
      </p>

      <h2 id="victime">Que faire si vous avez déjà payé ou envoyé vos papiers ?</h2>
      <p>Agissez vite, dans cet ordre :</p>
      <ol>
        <li>
          <strong>Gardez tout</strong> : captures de l&apos;annonce, messages, preuves de paiement.
        </li>
        <li>
          <strong>Prévenez votre banque</strong> : opposition pour une carte ou un chèque,
          contestation pour un virement. Plus c&apos;est tôt, plus il y a de chances de bloquer
          l&apos;opération.
        </li>
        <li>
          <strong>Signalez l&apos;annonce</strong> au site qui l&apos;a publiée, pour qu&apos;elle
          disparaisse avant de piéger quelqu&apos;un d&apos;autre.
        </li>
        <li>
          <strong>Signalez ou portez plainte sur THESEE</strong>, le téléservice du ministère de
          l&apos;Intérieur. Le signalement est ouvert si vous n&apos;avez jamais rencontré
          l&apos;auteur et qu&apos;une somme vous a été demandée, même sans l&apos;avoir versée. Un
          signalement n&apos;est pas une plainte : vous pouvez aussi porter plainte, sur THESEE si
          vous êtes majeur, au commissariat, à la gendarmerie, ou par écrit au procureur.
        </li>
        <li>
          <strong>Si vous avez envoyé une pièce d&apos;identité</strong>, Cybermalveillance conseille
          une main courante au commissariat ou à la gendarmerie, pour garder une trace en cas
          d&apos;usurpation plus tard.
        </li>
      </ol>
      <p>
        Pour être conseillé, la plateforme Info Escroqueries du ministère de l&apos;Intérieur répond
        au 0 805 805 817, gratuitement, du lundi au vendredi de 9 h à 18 h 30. France Victimes
        accompagne gratuitement les victimes au 116 006, tous les jours de 9 h à 19 h.
      </p>

      <h2 id="loi">Que risque l&apos;auteur d&apos;une fausse annonce ?</h2>
      <p>
        Selon le cas, l&apos;escroquerie de l&apos;article 313-1 du Code pénal : cinq ans
        d&apos;emprisonnement et 375 000 € d&apos;amende. Service-public rappelle que la fausse
        annonce comme l&apos;annonce trompeuse sont des délits, et que l&apos;on peut les signaler
        même en simple témoin.
      </p>
      <p>
        Le meilleur réflexe reste le plus simple : quand une annonce vous plaît, demandez une
        visite avant tout le reste. Le{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          guide pour répondre à une annonce
        </Link>{" "}
        explique quoi écrire dans ce premier message.
      </p>
    </>
  );
}
