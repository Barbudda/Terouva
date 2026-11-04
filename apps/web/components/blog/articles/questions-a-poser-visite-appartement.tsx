import Link from "next/link";

/**
 * Corps de l'article « questions à poser lors d'une visite d'appartement ».
 *
 * Requête du registre (docs/seo/REGISTRE.md, ligne « questions à poser lors
 * d'une visite d'appartement », P2). Le registre prévoyait un guide ; le chef
 * l'a confié au blog en format modèle. Ne vise pas « mail après visite », qui
 * revient à l'outil message-de-candidature et à un autre article.
 *
 * Seuls trois faits sont juridiques, tous sourcés dans la fiche : la décence
 * (Service-public F2042, vérifiée le 21 mars 2025), la classe énergie louable
 * (même fiche) et les plafonds d'honoraires (ANIL, page à jour au
 * 10 décembre 2019). Tout le reste est une question à poser, pas une règle.
 */
export default function QuestionsAPoserVisiteAppartement() {
  return (
    <>
      <p>
        Une visite dure souvent un quart d&apos;heure, parfois moins quand d&apos;autres candidats
        attendent sur le palier. C&apos;est court pour décider de l&apos;endroit où vous allez vivre
        plusieurs années. Voici les questions qui comptent, rangées dans l&apos;ordre où elles se
        posent, et une liste à garder sur votre téléphone.
      </p>

      <h2 id="avant">Que demander avant de vous déplacer ?</h2>
      <p>
        Trois réponses évitent une visite inutile. Posez-les dans votre premier message, ou au
        téléphone :
      </p>
      <ul>
        <li>le loyer charges comprises, et la part des charges ;</li>
        <li>la date à partir de laquelle le logement est libre ;</li>
        <li>
          s&apos;il y a des frais d&apos;agence pour vous, et leur montant.
        </li>
      </ul>
      <p>
        Si la réponse ne vous convient pas, vous gagnez une demi-journée. Si elle vous convient,
        arrivez avec votre dossier complet : le{" "}
        <Link href="/guides/dossier-de-location">guide du dossier de location</Link> liste les pièces
        qu&apos;un propriétaire peut demander, et celles qu&apos;il n&apos;a pas le droit
        d&apos;exiger.
      </p>

      <h2 id="loyer">Quelles questions poser sur le loyer et les charges ?</h2>
      <ul>
        <li>Les charges sont-elles une provision régularisée chaque année, ou un forfait ?</li>
        <li>Que couvrent-elles : eau froide, eau chaude, chauffage, ascenseur, entretien ?</li>
        <li>
          Combien a coûté la dernière régularisation ? Une provision trop basse se paie plus tard.
        </li>
        <li>
          Le chauffage est-il individuel ou collectif ? Électrique, gaz, réseau de chaleur ? Quel
          montant payait l&apos;occupant précédent en hiver ?
        </li>
        <li>Le loyer a-t-il été augmenté entre le précédent locataire et vous ?</li>
      </ul>

      <h2 id="logement">Que vérifier dans le logement ?</h2>
      <p>
        Un logement loué comme résidence principale doit être décent. Parmi les critères fixés par la
        loi, deux se vérifient sur place en une minute (Service-public, fiche vérifiée le 21 mars
        2025) :
      </p>
      <ul>
        <li>
          <strong>la surface</strong> : au moins une pièce principale de 9 m² avec 2,20 m sous
          plafond, ou de 20 m³ ;
        </li>
        <li>
          <strong>la classe énergie</strong> : pour un bail signé, renouvelé ou reconduit entre 2025
          et 2027, seul un logement classé de A à F au diagnostic de performance énergétique peut
          être loué. Demandez à voir le diagnostic.
        </li>
      </ul>
      <p>Le reste se regarde et se demande :</p>
      <ul>
        <li>
          Traces d&apos;humidité dans les angles, derrière les meubles, autour des fenêtres ? Odeur de
          renfermé ?
        </li>
        <li>Les fenêtres ferment-elles bien ? Simple ou double vitrage ?</li>
        <li>
          Combien de temps faut-il pour avoir de l&apos;eau chaude au robinet ? Quelle est la
          pression à la douche ?
        </li>
        <li>Combien de prises par pièce, et le tableau électrique paraît-il récent ?</li>
        <li>Le téléphone capte-t-il à l&apos;intérieur ? La fibre est-elle installée ?</li>
        <li>Quelle exposition, et qu&apos;entend-on fenêtres fermées ?</li>
        <li>Quels travaux sont prévus dans le logement ou l&apos;immeuble ?</li>
      </ul>
      <p className="note">
        Un défaut repéré à la visite ne vous empêche pas de candidater. Notez-le : il devra figurer
        dans l&apos;état des lieux d&apos;entrée, sinon il pourrait vous être reproché au départ.
      </p>

      <h2 id="immeuble">Que demander sur l&apos;immeuble et le quartier ?</h2>
      <ul>
        <li>Y a-t-il une cave, un local à vélos, une place de stationnement, et sont-ils inclus ?</li>
        <li>Où sont les poubelles, et comment se fait le tri ?</li>
        <li>Le gardien, s&apos;il y en a un, est-il présent tous les jours ?</li>
        <li>Pourquoi le locataire précédent est-il parti ?</li>
        <li>
          Combien de temps pour rejoindre votre travail ou votre école aux heures de pointe ? Faites
          le trajet une fois avant de signer.
        </li>
      </ul>

      <h2 id="bail">Quelles questions poser sur le bail et l&apos;entrée ?</h2>
      <ul>
        <li>Le logement est-il loué vide ou meublé ? En meublé, que contient l&apos;inventaire ?</li>
        <li>Quelle durée de bail, et quelle date d&apos;entrée ?</li>
        <li>
          Quel est le montant du dépôt de garantie ? Le{" "}
          <Link href="/guides/depot-de-garantie">guide du dépôt de garantie</Link> donne le maximum
          autorisé et le délai de restitution.
        </li>
        <li>
          Qui fera l&apos;état des lieux d&apos;entrée, et à quel prix ? Le{" "}
          <Link href="/guides/etat-des-lieux">guide de l&apos;état des lieux</Link> explique quoi
          vérifier ce jour-là.
        </li>
      </ul>

      <h2 id="honoraires">Combien une agence peut-elle vous facturer ?</h2>
      <p>
        Quand une agence s&apos;occupe de la location, la part des honoraires payée par le locataire
        ne peut jamais dépasser celle du propriétaire. Elle est aussi plafonnée par mètre carré
        habitable pour la visite, la constitution du dossier et la rédaction du bail : 12 € en zone
        très tendue, 10 € en zone tendue et 8 € ailleurs. L&apos;état des lieux d&apos;entrée ne peut
        pas vous être facturé plus de 3 € le mètre carré (ANIL, page à jour au 10 décembre 2019).
      </p>
      <p>
        Pour un deux-pièces de 40 m² en zone tendue, cela fait au plus 400 € pour la visite, le
        dossier et le bail, et 120 € pour l&apos;état des lieux. Demandez le détail avant de vous
        engager.
      </p>

      <h2 id="candidature">Que demander sur la candidature ?</h2>
      <ul>
        <li>Combien de candidats avez-vous déjà vus, et quand comptez-vous décider ?</li>
        <li>Quelles pièces voulez-vous recevoir, et sous quelle forme ?</li>
        <li>
          Acceptez-vous un garant, et lequel : une personne, la{" "}
          <Link href="/guides/garantie-visale">garantie Visale</Link> ?
        </li>
        <li>Puis-je vous envoyer mon dossier ce soir ?</li>
      </ul>
      <p>
        La dernière question compte plus qu&apos;elle n&apos;en a l&apos;air. Quand plusieurs
        candidats ont un dossier solide, celui qui l&apos;envoie le premier, complet et bien
        présenté, a souvent l&apos;avantage. L&apos;
        <Link href="/outils/dossier-de-location">outil de préparation du dossier</Link> vous aide à
        l&apos;avoir prêt avant la visite.
      </p>

      <h2 id="liste">La liste à garder sur votre téléphone</h2>
      <ol>
        <li>Loyer, charges, et ce que les charges couvrent.</li>
        <li>Dernière régularisation de charges et coût du chauffage en hiver.</li>
        <li>Surface de la pièce principale et hauteur sous plafond.</li>
        <li>Classe énergie du diagnostic, de A à F.</li>
        <li>Humidité, fenêtres, eau chaude, prises, réseau mobile.</li>
        <li>Bruit et exposition, fenêtres fermées.</li>
        <li>Travaux prévus dans le logement ou l&apos;immeuble.</li>
        <li>Cave, vélo, stationnement, poubelles.</li>
        <li>Vide ou meublé, durée du bail, date d&apos;entrée.</li>
        <li>Dépôt de garantie et frais d&apos;agence, au mètre carré.</li>
        <li>Qui fait l&apos;état des lieux, et à quel prix.</li>
        <li>Pièces demandées, garant accepté, date de décision.</li>
      </ol>
      <p>
        Pour la suite, le guide{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">répondre à une annonce de location</Link>{" "}
        montre comment écrire au propriétaire et relancer sans insister.
      </p>
    </>
  );
}
