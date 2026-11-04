import Link from "next/link";

/**
 * Corps de l'article « mettre un filigrane sur les documents de son dossier de
 * location ». Requête du registre : « filigrane document location », variantes
 * « filigrane document dossier location », « ajouter filigrane pdf location »,
 * « filigrane pièce d'identité » (AC, relevée le 2026-11-04).
 *
 * Faits : page du service Filigrane Facile (filigrane.beta.gouv.fr), page de
 * France Travail qui le présente (opérateur, limites), fiche F1169 (copie
 * autorisée, original exigible), relevées le 2026-11-04.
 *
 * Le registre prévoit un outil Terouva de filigrane local (section 8, P2) : il
 * n'existe pas, l'article n'en parle donc pas. Aucun chiffre sur l'usurpation
 * d'identité : celui que cite France Travail n'a pas de source primaire lue.
 */
export default function FiligraneDocumentsDossierLocation() {
  return (
    <>
      <p>
        Pour une seule location, vous pouvez envoyer votre pièce d&apos;identité, vos fiches de paie et
        votre avis d&apos;imposition à dix propriétaires que vous ne connaissez pas. Un filigrane ne
        rend pas ces copies inutilisables, mais il les rend moins faciles à détourner, et il vous
        dit d&apos;où vient une fuite. Voici quoi écrire, où le placer, et comment le faire en deux
        minutes.
      </p>

      <h2 id="pourquoi">Pourquoi mettre un filigrane sur son dossier de location ?</h2>
      <p>
        Ces documents peuvent servir à usurper votre identité : France Travail cite l&apos;ouverture
        de comptes bancaires, la souscription de crédits ou des demandes d&apos;aides sociales à votre
        nom. Le filigrane, un texte semi-transparent écrit sur le document, a deux effets :
      </p>
      <ul>
        <li>la copie ne peut pas resservir telle quelle pour une autre démarche ;</li>
        <li>si elle circule, la mention dit à qui vous l&apos;aviez envoyée.</li>
      </ul>
      <p>
        France Travail, qui le recommande aux candidats à un emploi, en rappelle aussi les
        limites : le filigrane ne prouve pas l&apos;authenticité du document et n&apos;arrête pas un
        fraudeur équipé d&apos;outils de retouche d&apos;image.
      </p>

      <h2 id="texte">Que faut-il écrire dans le filigrane ?</h2>
      <p>Trois informations : à qui, quand, pour quoi. Par exemple :</p>
      <div className="note">
        <p>Dossier de location pour [nom du propriétaire ou de l&apos;agence], le [date], usage unique</p>
      </div>
      <p>
        Le nom du destinataire est ce qui rend le filigrane utile : en cas de fuite, vous savez
        d&apos;où elle vient. La date et l&apos;usage empêchent qu&apos;on présente la copie comme récente pour une
        autre démarche.
      </p>

      <h2 id="placement">Où placer le filigrane sur le document ?</h2>
      <p>
        En travers de la page, sur la partie utile, et répété si la page est grande. Un filigrane
        dans une marge se recadre en une seconde. Il doit rester assez transparent pour que le
        propriétaire lise ce qu&apos;il a besoin de lire : nom, photo, montants, dates.
      </p>
      <p>
        Un filigrane trop épais pose un autre problème : France Travail signale que certains
        organismes refusent un document dont le filigrane gêne la lecture.
      </p>

      <h2 id="filigrane-facile">Comment ajouter un filigrane avec Filigrane Facile ?</h2>
      <p>
        Filigrane Facile est un service gratuit de l&apos;État, opéré par l&apos;équipe de DossierFacile, sur{" "}
        <a href="https://filigrane.beta.gouv.fr/" target="_blank" rel="noopener">
          filigrane.beta.gouv.fr
        </a>
        . Sans inscription :
      </p>
      <ul>
        <li>déposez vos fichiers, au format JPG, PNG, HEIC ou PDF, plusieurs à la fois ;</li>
        <li>écrivez le texte du filigrane, 100 caractères au maximum ;</li>
        <li>téléchargez le résultat, qui sort toujours en PDF.</li>
      </ul>
      <p>
        Le service indique que les fichiers originaux sont effacés de ses serveurs dès que le
        fichier filigrané est généré, et que celui-ci est effacé après le premier téléchargement,
        ou au bout d&apos;un jour s&apos;il n&apos;est pas téléchargé. Vos documents passent donc quelques instants
        par un serveur de l&apos;État.
      </p>

      <h2 id="hors-ligne">Peut-on le faire sans envoyer ses fichiers en ligne ?</h2>
      <p>Oui, de deux façons :</p>
      <ul>
        <li>
          avec un logiciel qui ouvre vos PDF ou vos images et permet d&apos;y ajouter du texte : écrivez
          la mention en travers, puis enregistrez une copie en PDF ;
        </li>
        <li>
          sur papier : imprimez la copie, écrivez la mention à la main en travers de la page, puis
          numérisez-la.
        </li>
      </ul>
      <p>
        Dans les deux cas, gardez quelque part l&apos;original sans filigrane : c&apos;est lui que vous
        montrerez si le propriétaire le demande.
      </p>

      <h2 id="refus">Le propriétaire peut-il refuser une pièce filigranée ?</h2>
      <p>
        Service-public indique que vous pouvez fournir une copie du document, et que le
        propriétaire a le droit d&apos;exiger la présentation de l&apos;original. Une copie filigranée reste
        une copie. Si le propriétaire veut vérifier, montrez-lui l&apos;original, à la visite ou à la
        signature, plutôt que d&apos;envoyer une copie sans protection.
      </p>
      <p>
        Les documents d&apos;un dossier monté sur DossierFacile reçoivent d&apos;ailleurs tous un filigrane :
        beaucoup de propriétaires en voient déjà. Les pièces qu&apos;un propriétaire peut demander, et
        celles qu&apos;il n&apos;a pas le droit de réclamer, sont dans notre{" "}
        <Link href="/guides/dossier-de-location">guide du dossier de location</Link>. Les mêmes
        règles valent pour votre garant : voyez notre guide sur le{" "}
        <Link href="/guides/garant-caution">garant et la caution</Link>.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Un filigrane par destinataire prend du temps, et le temps compte quand une annonce reçoit
        des dizaines de réponses. Une méthode qui concilie les deux :
      </p>
      <ul>
        <li>
          préparez une fois un dossier avec une mention générale, « Dossier de location, [mois et
          année], usage unique », pour les premiers envois ;
        </li>
        <li>
          gardez le filigrane au nom du destinataire pour le dossier complet que vous envoyez après
          la visite, quand le propriétaire est identifié.
        </li>
      </ul>
      <p>
        Pour savoir quelles pièces préparer selon votre situation, notre{" "}
        <Link href="/outils/dossier-de-location">liste des pièces du dossier de location</Link> vous
        la donne en une minute, gratuitement et sans inscription.
      </p>
    </>
  );
}
