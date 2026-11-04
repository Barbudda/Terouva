import Link from "next/link";

/**
 * Corps de l'article « DossierFacile : ce que c'est, ce que voit le propriétaire,
 * et quand s'en servir » (calendrier, semaine 6). Requête du registre :
 * « dossierfacile c'est quoi », avec « est-ce que DossierFacile est fiable ? »,
 * « comment fonctionne DossierFacile ? », « dossierfacile filigrane »,
 * « dossierfacile propriétaire ».
 *
 * Tout vient des pages du service lui-même, relevées le 2026-11-04 : accueil,
 * « Qui sommes-nous ? », aide « Dossier Facile c'est quoi ? » et « Comment
 * partager son dossier validé ? » (mis à jour le 21/09/2026), plus la fiche F1169.
 * Le compteur de dossiers bouge chaque jour : il est daté dans le texte.
 *
 * Volontairement absents : les avis d'utilisateurs (Trustpilot, Reddit), les
 * délais de vérification (aucun chiffre officiel lu), et l'incident de
 * génération de PDF affiché le jour du relevé (passager).
 */
export default function DossierfacileCEstQuoi() {
  return (
    <>
      <p>
        Un propriétaire vous demande « votre DossierFacile », ou vous hésitez à envoyer vos fiches
        de paie à un inconnu. Voici ce que fait ce service, ce que le propriétaire voit exactement
        quand vous lui envoyez votre lien, et les cas où il vaut mieux faire autrement.
      </p>

      <h2 id="definition">Qu&apos;est-ce que DossierFacile ?</h2>
      <p>
        Un service public numérique, gratuit et financé par l&apos;État, qui aide les candidats à
        constituer un dossier de location complet et à le partager. Il est porté par la direction
        générale de l&apos;aménagement, du logement et de la nature (DGALN), et développé comme une
        « startup d&apos;État » du programme beta.gouv.fr. La fiche de Service-public sur les
        justificatifs du locataire le cite comme téléservice.
      </p>
      <p>
        Il ne demande que les pièces que la loi autorise : identité, domicile, situation
        professionnelle, avis d&apos;imposition et ressources, pour vous et pour votre garant. La liste
        complète, et celle des documents interdits, est dans notre{" "}
        <Link href="/guides/dossier-de-location">guide du dossier de location</Link>.
      </p>

      <h2 id="fiable">DossierFacile est-il fiable ?</h2>
      <p>C&apos;est un service de l&apos;État, et il publie ses règles. D&apos;après ses propres pages :</p>
      <ul>
        <li>les données sont hébergées en France ;</li>
        <li>
          vos pièces sont supprimées automatiquement après 45 jours d&apos;inactivité sur votre compte,
          et toutes, dès que vous supprimez le compte ;
        </li>
        <li>
          seuls ses opérateurs et son équipe technique consultent vos documents, pour les vérifier ;
          des sous-traitants tenus à la confidentialité peuvent traiter vos données, qui ne sont ni
          revendues ni transmises à des tiers sans votre accord ;
        </li>
        <li>
          chaque document reçoit un filigrane, pour limiter l&apos;usurpation d&apos;identité (nous
          expliquons comment{" "}
          <Link href="/blog/filigrane-documents-dossier-location">
            mettre un filigrane sur les documents de votre dossier
          </Link>{" "}
          quand vous les envoyez vous-même) ;
        </li>
        <li>son code source est public.</li>
      </ul>
      <p>
        Le service affichait, le 4 novembre 2026, plus de 2,1 millions de dossiers labellisés
        depuis son lancement.
      </p>

      <h2 id="fonctionnement">Comment fonctionne DossierFacile ?</h2>
      <p>En trois temps :</p>
      <ul>
        <li>
          <strong>Vous déposez vos pièces.</strong> Le service vous guide selon votre situation, y
          compris pour un garant ou un organisme comme Visale.
        </li>
        <li>
          <strong>Votre dossier est complet</strong> dès que toutes les pièces sont là. Vous pouvez
          ensuite demander une vérification par un agent : le dossier passe alors au statut
          « complet et vérifié ».
        </li>
        <li>
          <strong>Vous le partagez</strong>, par un lien ou par un e-mail envoyé depuis le service.
        </li>
      </ul>
      <p>
        Les documents rédigés dans une autre langue sont refusés : faites-les traduire en français
        avant de les déposer.
      </p>

      <h2 id="proprietaire">Que voit le propriétaire quand vous partagez votre dossier ?</h2>
      <p>Ce que vous choisissez de lui montrer. Au moment de créer le lien, vous décidez :</p>
      <ul>
        <li>
          <strong>avec ou sans justificatifs</strong> : soit le dossier complet avec les pièces
          filigranées, soit une version sans documents qui présente seulement votre situation ;
        </li>
        <li>
          <strong>la durée de validité du lien</strong> : 30 jours par défaut, modifiable ;
        </li>
        <li>
          <strong>une seule pièce</strong> si vous le préférez, une fois le dossier validé.
        </li>
      </ul>
      <p>
        Pour ouvrir le lien, le propriétaire doit saisir les trois premières lettres du nom du
        dossier. Après cinq essais ratés, l&apos;accès est bloqué une heure. De votre côté, vous voyez
        le nombre de consultations et la date de la dernière. Vous pouvez mettre un partage en
        pause et le relancer, ou le supprimer : un lien supprimé ne se réactive pas.
      </p>
      <p>
        En couple ou en colocation, le lien ne devient actif que quand chaque dossier du groupe est
        validé.
      </p>

      <h2 id="quand">Quand s&apos;en servir, et quand s&apos;en passer ?</h2>
      <p>DossierFacile est le plus utile quand :</p>
      <ul>
        <li>vous répondez à beaucoup d&apos;annonces et envoyez vos pièces à des inconnus ;</li>
        <li>vous voulez savoir qui a ouvert votre dossier, et couper l&apos;accès ensuite ;</li>
        <li>vous voulez un regard extérieur sur un dossier qui vous paraît fragile.</li>
      </ul>
      <p>Il ne règle pas tout :</p>
      <ul>
        <li>
          le propriétaire garde le droit de demander à voir l&apos;original d&apos;une pièce, d&apos;après
          Service-public ;
        </li>
        <li>
          certains préfèrent un PDF : le service permet de le télécharger, mais vous perdez alors
          le suivi des consultations et la possibilité de couper l&apos;accès ;
        </li>
        <li>
          il ne remplace ni un garant ni une garantie : si c&apos;est ce qui manque, voyez notre guide
          de la <Link href="/guides/garantie-visale">garantie Visale</Link>.
        </li>
      </ul>
      <p>
        Un dernier conseil, que DossierFacile donne lui-même : ne versez jamais d&apos;argent, ni dépôt,
        ni frais, avant d&apos;avoir signé le bail.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Le moment où l&apos;on perd un logement, c&apos;est souvent celui où le propriétaire attend le
        dossier. Montez-le avant de commencer à répondre, faites-le vérifier, et gardez le lien
        prêt à coller dans votre premier message. Notre guide pour{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        dit où le placer.
      </p>
      <p>
        Pour savoir quelles pièces réunir selon votre situation, notre{" "}
        <Link href="/outils/dossier-de-location">liste des pièces du dossier de location</Link>{" "}
        vous la donne en une minute, gratuitement et sans inscription.
      </p>
    </>
  );
}
