import Link from "next/link";

/**
 * Corps de l'article « modèle de lettre de préavis de logement ».
 * Requête du registre (section 8) : « modèle lettre de préavis logement »,
 * variantes « 1 mois », « 3 mois », « meublé » (AC, relevée le 2026-11-04).
 *
 * Partage avec `/guides/preavis-location` : le guide explique les règles (durées,
 * motifs, modes de remise, point de départ). L'article donne les lettres et
 * renvoie au guide pour le reste, sans le recopier.
 *
 * Zone tendue : la fiche F1168 cite le décret n° 2013-392, abrogé au 1er janvier
 * 2027 par le décret n° 2026-831 (veille n° 15). La lettre ne cite donc que
 * l'article 15 de la loi du 6 juillet 1989, qui ne change pas. Revérifier la
 * fiche F1168 le 2027-01-04 avec le guide.
 *
 * Faits : F1168 (vérifiée le 16 avril 2026 d'après la page) et R16635 (modèle
 * officiel, vérifié le 25 novembre 2025), relevées le 2026-11-04.
 */
export default function ModeleLettrePreavisLogement() {
  return (
    <>
      <p>
        Une lettre de préavis tient en dix lignes, mais une phrase manquante peut vous coûter deux
        mois de loyer. Voici quatre modèles prêts à compléter : logement vide avec trois mois de
        préavis, logement vide avec un mois en zone tendue ou pour un autre motif, et logement
        meublé.
      </p>

      <h2 id="choisir">Quelle lettre choisir ?</h2>
      <ul>
        <li>
          <strong>Logement meublé</strong> : un mois de préavis, sans motif à donner. Modèle 4.
        </li>
        <li>
          <strong>Logement vide en zone tendue</strong> : un mois, à condition de le dire dans la
          lettre. Modèle 2.
        </li>
        <li>
          <strong>Logement vide, avec un motif qui réduit le délai</strong> (premier emploi,
          mutation, perte d&apos;emploi, logement social, RSA ou AAH, état de santé) : un mois, avec le
          justificatif. Modèle 3.
        </li>
        <li>
          <strong>Logement vide, dans tous les autres cas</strong> : trois mois. Modèle 1.
        </li>
      </ul>
      <p>
        Le détail de chaque situation, et celles qui ne réduisent pas le délai malgré l&apos;idée reçue,
        est dans notre <Link href="/guides/preavis-location">guide du préavis de location</Link>.
        Pour savoir si votre commune est en zone tendue, utilisez le{" "}
        <a
          href="https://www.service-public.gouv.fr/simulateur/calcul/zones-tendues"
          target="_blank"
          rel="noopener"
        >
          simulateur officiel de Service-public
        </a>
        .
      </p>

      <h2 id="trois-mois">Modèle 1 : logement vide, préavis de trois mois</h2>
      <div className="note">
        <p>
          [Prénom Nom]
          <br />
          [Adresse du logement loué]
        </p>
        <p>
          [Nom du propriétaire ou de l&apos;agence]
          <br />
          [Son adresse]
        </p>
        <p>
          À [ville], le [date]
          <br />
          Lettre recommandée avec avis de réception
        </p>
        <p>Objet : congé du logement situé [adresse du logement]</p>
        <p>Madame, Monsieur,</p>
        <p>
          Locataire du logement situé [adresse du logement] depuis le [date d&apos;entrée], je vous
          informe par la présente de ma décision de donner congé.
        </p>
        <p>
          Conformément à l&apos;article 15 de la loi n° 89-462 du 6 juillet 1989, mon préavis est de
          trois mois à compter de la réception de cette lettre.
        </p>
        <p>
          Je vous propose de convenir ensemble de la date de l&apos;état des lieux de sortie et de la
          remise des clés. Je vous remercie de m&apos;adresser le dépôt de garantie, le moment venu, à
          l&apos;adresse suivante : [nouvelle adresse].
        </p>
        <p>
          Je vous prie d&apos;agréer, Madame, Monsieur, l&apos;expression de mes salutations distinguées.
        </p>
        <p>[Signature]</p>
      </div>

      <h2 id="zone-tendue">Modèle 2 : logement vide en zone tendue, préavis d&apos;un mois</h2>
      <p>
        Même lettre que le modèle 1, avec un deuxième paragraphe différent. Service-public demande
        deux mentions : l&apos;adresse du logement loué, qui figure déjà dans la lettre, et le fait que
        vous bénéficiez du délai réduit. Sans elles, le préavis reste de trois mois.
      </p>
      <div className="note">
        <p>
          Le logement étant situé dans une commune en zone tendue, je bénéficie d&apos;un délai de
          préavis réduit à un mois, conformément à l&apos;article 15 de la loi n° 89-462 du 6 juillet
          1989. Ce délai court à compter de la réception de cette lettre.
        </p>
      </div>

      <h2 id="motif">Modèle 3 : logement vide, un mois pour un autre motif</h2>
      <p>
        Toujours la même lettre, avec ce deuxième paragraphe. Le motif doit être écrit, et le
        justificatif joint : une lettre sans motif vaut préavis de trois mois.
      </p>
      <div className="note">
        <p>
          [Motif, par exemple : je viens d&apos;obtenir mon premier emploi / mon employeur me mute à
          [ville] / un logement social m&apos;a été attribué / je perçois le RSA.] Je bénéficie donc
          d&apos;un délai de préavis réduit à un mois, conformément à l&apos;article 15 de la loi n° 89-462
          du 6 juillet 1989. Vous trouverez ci-joint [le justificatif de cette situation]. Ce délai
          court à compter de la réception de cette lettre.
        </p>
      </div>
      <p>
        Pour l&apos;état de santé, Service-public cite le certificat médical comme justificatif. Pour
        les violences au sein du couple, l&apos;envoi en recommandé avec avis de réception est
        obligatoire et les pièces à joindre sont précisées sur la{" "}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/F1168"
          target="_blank"
          rel="noopener"
        >
          fiche officielle du préavis
        </a>
        .
      </p>

      <h2 id="meuble">Modèle 4 : logement meublé, préavis d&apos;un mois</h2>
      <p>
        En meublé, le préavis est d&apos;un mois dans tous les cas, y compris pour un bail étudiant de
        neuf mois. Vous n&apos;avez ni motif à donner, ni justificatif à joindre.
      </p>
      <div className="note">
        <p>
          Le logement étant loué meublé, mon préavis est d&apos;un mois à compter de la réception de
          cette lettre.
        </p>
      </div>

      <h2 id="a-deux">Vous êtes deux sur le bail : qui signe ?</h2>
      <p>
        Si vous partez tous les deux, la lettre est signée par les deux. Service-public le précise
        pour les époux, les partenaires de Pacs qui ont signé le bail et les concubins
        cosignataires. Si un seul part, il donne congé pour lui seul et le bail continue avec
        l&apos;autre ; selon votre situation, il peut rester tenu au paiement du loyer pendant un temps,
        ce que la fiche officielle détaille.
      </p>

      <h2 id="envoi">Comment envoyer la lettre ?</h2>
      <p>
        Par lettre recommandée avec avis de réception, par acte de commissaire de justice ou en
        main propre contre récépissé. Un simple courriel ne suffit pas. Le délai court à partir du
        jour où le propriétaire reçoit la lettre, pas du jour où vous l&apos;envoyez : une lettre
        retirée en retard repousse d&apos;autant la fin du préavis. Le guide détaille{" "}
        <Link href="/guides/preavis-location">quand le préavis commence vraiment</Link>.
      </p>
      <p>
        Service-public propose aussi son propre{" "}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/R16635"
          target="_blank"
          rel="noopener"
        >
          modèle de lettre de congé
        </a>
        . Ni le sien ni ceux de cette page ne conviennent au bail mobilité, dont les règles sont
        différentes.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Le préavis fixe la date à partir de laquelle vous payez deux loyers. Avec trois mois de
        préavis, envoyer la lettre le jour où vous signez le nouveau bail vous fait payer jusqu&apos;à
        trois mois en double. Avec un mois, le chevauchement est plus court, mais il faut un
        logement trouvé vite.
      </p>
      <p>
        Le conseil qui en découle : préparez votre lettre dès le début de vos recherches, mais ne
        l&apos;envoyez qu&apos;une fois le nouveau bail signé, ou au moins promis par écrit. Pensez aussi à
        la sortie : notre guide de{" "}
        <Link href="/guides/etat-des-lieux">l&apos;état des lieux</Link> vous dit quoi vérifier avant de
        rendre les clés.
      </p>
    </>
  );
}
