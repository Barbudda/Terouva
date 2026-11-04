import Link from "next/link";

/**
 * Corps de l'article « être le premier à répondre à une annonce » (brief :
 * docs/seo/blog/briefs/etre-le-premier-a-repondre-a-une-annonce.md).
 *
 * Aucune source publique ne mesure l'avantage du premier message ni le nombre
 * de candidats par annonce (registre, case « Personne ») : l'article n'avance
 * aucun chiffre et le dit. Le « pourquoi » est dans le guide pilier ; ici,
 * l'organisation concrète pour répondre tôt. Faits : F1169, F33453, R51424, F34092.
 */
export default function EtreLePremierARepondreAUneAnnonce() {
  return (
    <>
      <p>
        Sur une annonce bien placée, le propriétaire n&apos;a ni le temps ni l&apos;envie de lire
        tout le monde. Arriver tôt vous fait lire avant qu&apos;il ait rempli ses créneaux de
        visite. Personne ne publie de chiffres là-dessus, mais le mécanisme est simple, et il se
        prépare.
      </p>

      <h2 id="pourquoi">Pourquoi répondre en premier compte-t-il ?</h2>
      <p>
        Parce qu&apos;un propriétaire organise ses visites avec les premiers messages qui lui
        conviennent : quand ses créneaux sont pleins, il n&apos;a plus de raison de lire les
        suivants. Le rang d&apos;arrivée
        est aussi le seul critère qui ne dépend ni de votre métier ni de vos revenus. Le guide{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        explique ce que le propriétaire regarde dans les messages qu&apos;il lit.
      </p>

      <h2 id="complet">Être premier suffit-il ?</h2>
      <p>
        Non. Un message arrivé en premier mais incomplet oblige le propriétaire à vous répondre pour
        demander votre revenu ou votre garant. Pendant ce temps, il lit les suivants. Le bon objectif
        est d&apos;être le premier message <strong>complet</strong> : métier et contrat, revenu,
        garant, nombre d&apos;occupants, date d&apos;arrivée, durée envisagée, créneaux de visite.
      </p>

      <h2 id="avant">Que préparer avant que l&apos;annonce paraisse ?</h2>
      <ul>
        <li>
          <strong>Le message</strong>, écrit une fois pour toutes, avec une seule phrase à changer
          pour chaque logement. Le{" "}
          <Link href="/outils/message-de-candidature">générateur de message de candidature</Link> le
          rédige avec vous.
        </li>
        <li>
          <strong>Le dossier</strong>, avec les seules pièces autorisées par la loi, en un fichier ou
          un lien{" "}
          <a href="https://www.dossierfacile.logement.gouv.fr/" target="_blank" rel="noopener">
            DossierFacile
          </a>
          , le service public gratuit. Le détail est dans le guide du{" "}
          <Link href="/guides/dossier-de-location">dossier de location</Link>.
        </li>
        <li>
          <strong>Le garant</strong> : la garantie Visale se demande avant d&apos;avoir trouvé le
          logement, et Service-public indique que le visa est délivré en quelques jours ouvrés.
        </li>
      </ul>

      <h2 id="alertes">Comment être prévenu dès qu&apos;une annonce paraît ?</h2>
      <p>
        Par les alertes des sites que vous utilisez, avec les notifications du téléphone activées
        plutôt qu&apos;un simple e-mail récapitulatif. Réglez-les sur vos critères indispensables
        seulement : une alerte trop précise reste muette. Prévoyez aussi quand vous pourrez répondre.
        Une alerte reçue pendant une réunion de deux heures vous fait perdre ce que vous aviez gagné
        en préparant le message.
      </p>

      <h2 id="piege">La vitesse peut-elle vous piéger ?</h2>
      <p>
        Oui, quand une annonce trop belle vous pousse à payer pour ne pas la laisser filer. Aucune
        somme ne peut être réclamée avant la signature du bail. Service-public cite parmi les signes
        d&apos;une fausse annonce un prix très bas pour la surface, un propriétaire qui refuse de
        vous rencontrer, et une demande de carte d&apos;identité avant la visite. Répondez vite,
        mais ne payez et n&apos;envoyez de pièce officielle qu&apos;une fois le logement vu. La{" "}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/F34092"
          target="_blank"
          rel="noopener"
        >
          fiche de Service-public sur les arnaques à la location
        </a>{" "}
        explique comment signaler une annonce suspecte.
      </p>

      <h2 id="terouva">Comment Terouva vous aide à répondre tôt</h2>
      <p>
        C&apos;est exactement le travail de Terouva : il vous signale les annonces qui correspondent
        à votre recherche dès qu&apos;elles paraissent, et prépare votre réponse avec vos
        informations. Vous la relisez, vous l&apos;envoyez vous-même ; rien ne part sans vous.{" "}
        <a href="#prevenu" className="lien">
          Être prévenu du lancement
        </a>
      </p>
    </>
  );
}
