import Link from "next/link";

/**
 * Corps de l'article « lettre de motivation pour une location d'appartement ».
 * Requête du registre : « lettre de motivation location appartement » (AC, PAA,
 * relevée le 2026-11-04), avec la question « est-il légal de demander une lettre
 * de motivation ? ».
 *
 * Les modèles sont à trous, entre crochets : aucun nom, aucun revenu, aucune
 * date inventés. Le guide `repondre-a-une-annonce-de-location` donne déjà le
 * premier message court ; cet article donne la lettre plus longue qu'on joint
 * au dossier, et renvoie au guide pour le premier contact.
 *
 * Faits : fiche F1169 de Service-public (vérifiée le 10 avril 2025 d'après la
 * page, relevée le 2026-11-04) et analyse ANIL du décret n° 2015-1437.
 */
export default function LettreDeMotivationLocationAppartement() {
  return (
    <>
      <p>
        Quand une annonce reçoit des dizaines de réponses, le propriétaire lit vite. Une lettre de
        motivation courte, claire et adaptée à l&apos;annonce l&apos;aide à vous placer. Voici ce qu&apos;elle doit
        contenir, ce que le propriétaire n&apos;a pas le droit d&apos;exiger, et quatre modèles à compléter
        selon votre situation.
      </p>

      <h2 id="obligatoire">Un propriétaire peut-il exiger une lettre de motivation ?</h2>
      <p>
        Non. La loi fixe une liste fermée des justificatifs qu&apos;un propriétaire ou une agence peut
        demander à un futur locataire : une pièce d&apos;identité, un justificatif de domicile, des
        justificatifs de situation professionnelle et de ressources. La lettre de motivation n&apos;en
        fait pas partie. Service-public précise que le propriétaire « a interdiction d&apos;en exiger
        d&apos;autres », sous peine d&apos;une amende pouvant aller jusqu&apos;à 3 000 €, ou 15 000 € pour une
        société.
      </p>
      <p>
        Rien ne vous empêche, en revanche, d&apos;en joindre une. Elle ne remplace aucune pièce : elle
        présente en quelques lignes ce que les pièces disent en vingt pages. La liste complète des
        documents autorisés, et de ceux qui sont interdits, est dans notre{" "}
        <Link href="/guides/dossier-de-location">guide du dossier de location</Link>.
      </p>

      <h2 id="contenu">Que mettre dans une lettre de motivation pour une location ?</h2>
      <p>Six informations suffisent, dans cet ordre :</p>
      <ul>
        <li>qui vous êtes, en une phrase ;</li>
        <li>votre situation professionnelle et votre revenu net mensuel ;</li>
        <li>votre garant ou votre garantie (parent, Visale, organisme) ;</li>
        <li>la date à laquelle vous pouvez emménager, et combien de temps vous pensez rester ;</li>
        <li>ce qui vous plaît dans ce logement : un détail précis de l&apos;annonce, pas une formule ;</li>
        <li>vos disponibilités pour une visite et votre numéro de téléphone.</li>
      </ul>
      <p>
        Une page au maximum. Pas de copie de pièce dans le corps de la lettre : les justificatifs
        vont dans le dossier, à part. Et rien que le propriétaire n&apos;a pas le droit de demander,
        comme un relevé de compte ou une attestation de bonne tenue de compte.
      </p>

      <h2 id="etudiant">Exemple 1 : étudiant ou étudiante avec un garant</h2>
      <div className="note">
        <p>Madame, Monsieur,</p>
        <p>
          Je suis étudiant en [année et formation] à [établissement], et je cherche un logement pour
          la rentrée. Votre studio de la [rue ou quartier] m&apos;intéresse beaucoup : il est à [durée]
          de mon école, et [détail de l&apos;annonce qui vous a plu].
        </p>
        <p>
          Mes parents se portent garants. Leur revenu net mensuel est de [montant] €, et leurs
          justificatifs sont joints à mon dossier. [Si c&apos;est le cas : je bénéficie aussi d&apos;une
          bourse de [montant] € par mois.]
        </p>
        <p>
          Je peux emménager à partir du [date] et je pense rester pendant toute la durée de mes
          études, soit [durée].
        </p>
        <p>Je suis disponible pour une visite [jours et heures].</p>
        <p>
          Je vous prie d&apos;agréer, Madame, Monsieur, mes salutations distinguées.
          <br />
          [Prénom Nom], [téléphone]
        </p>
      </div>

      <h2 id="cdi">Exemple 2 : jeune actif en CDI</h2>
      <div className="note">
        <p>Madame, Monsieur,</p>
        <p>
          Je suis [métier] en CDI chez [employeur] depuis [durée], pour un revenu net de [montant]
          € par mois. Votre appartement de la [rue ou quartier] correspond exactement à ce que je
          cherche, notamment pour [détail de l&apos;annonce].
        </p>
        <p>
          [Garant ou garantie : je bénéficie de la garantie Visale / mon père se porte garant /
          je n&apos;ai pas de garant.] Mon dossier complet est joint à ce message.
        </p>
        <p>
          Je vivrais seul dans le logement. Je peux emménager à partir du [date] et je cherche à
          m&apos;installer pour plusieurs années.
        </p>
        <p>Je peux visiter [jours et heures], dès cette semaine.</p>
        <p>
          Bien cordialement,
          <br />
          [Prénom Nom], [téléphone]
        </p>
      </div>

      <h2 id="cdd">Exemple 3 : en CDD, en intérim ou en période d&apos;essai</h2>
      <p>
        Ici, la lettre sert surtout à rassurer sur la suite. Dites ce qui est prévu, sans promettre
        ce qui ne l&apos;est pas.
      </p>
      <div className="note">
        <p>Madame, Monsieur,</p>
        <p>
          Je travaille comme [métier] en [CDD / intérim / période d&apos;essai] chez [employeur] jusqu&apos;au
          [date], pour un revenu net de [montant] € par mois. [Ce qui est prévu ensuite, seulement si
          c&apos;est écrit quelque part : renouvellement prévu, embauche annoncée, promesse d&apos;embauche.]
        </p>
        <p>
          [Garantie : je bénéficie de la garantie Visale, dont le visa est joint / mes parents se
          portent garants.] Mon dossier complet est joint.
        </p>
        <p>
          Votre logement m&apos;intéresse pour [détail de l&apos;annonce]. Je peux emménager le [date].
        </p>
        <p>Je suis disponible pour une visite [jours et heures].</p>
        <p>
          Bien cordialement,
          <br />
          [Prénom Nom], [téléphone]
        </p>
      </div>
      <p>
        Si un garant vous manque, notre guide{" "}
        <Link href="/guides/louer-sans-garant">louer sans garant</Link> passe en revue les
        solutions.
      </p>

      <h2 id="couple">Exemple 4 : un couple qui arrive d&apos;une autre ville</h2>
      <div className="note">
        <p>Madame, Monsieur,</p>
        <p>
          Nous arrivons à [ville] le [date] : [prénom] y commence un poste de [métier] en [type de
          contrat], et je travaille comme [métier] [en télétravail / dans la même entreprise / en
          recherche active]. Nos revenus nets cumulés sont de [montant] € par mois.
        </p>
        <p>
          Votre appartement nous plaît pour [détail de l&apos;annonce]. Nous serions deux à y vivre
          [et un enfant de [âge] ans].
        </p>
        <p>
          [Garantie.] Nos deux dossiers sont joints. Comme nous ne sommes pas encore sur place,
          nous pouvons visiter [en visio / le [date], jour de notre venue].
        </p>
        <p>
          Bien cordialement,
          <br />
          [Prénom Nom] et [Prénom Nom], [téléphone]
        </p>
      </div>

      <h2 id="message-ou-lettre">Faut-il envoyer une lettre ou un simple message ?</h2>
      <p>
        Les deux, à deux moments différents. Sur un site d&apos;annonces, le premier contact est un
        message court : quatre ou cinq lignes, envoyées vite. Notre guide pour{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        en donne la structure. La lettre, elle, va en première page du dossier, en PDF, quand le
        propriétaire vous le demande ou après la visite.
      </p>
      <p>
        Gardez la même information dans les deux : le propriétaire qui lit votre lettre doit
        retrouver le revenu, la garantie et la date annoncés dans le message.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Une lettre prête avant les visites vous fait gagner le temps qui compte : celui entre la
        publication de l&apos;annonce et votre réponse. Écrivez une base une fois, puis changez à chaque
        annonce seulement le détail qui vous a plu.
      </p>
      <p>
        Pour le message court, notre{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link> le
        rédige à partir de votre situation, en trois tons. Il est gratuit, sans inscription, et
        rien n&apos;est envoyé à qui que ce soit.
      </p>
    </>
  );
}
