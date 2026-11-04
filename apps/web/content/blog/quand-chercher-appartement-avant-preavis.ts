import { article } from "@/lib/blog-format";

const F1168 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1168";
const T1168 = "Service-public.gouv.fr · Préavis du locataire : congé et formalités";

export default article({
  slug: "quand-chercher-appartement-avant-preavis",
  titre: "Combien de temps à l'avance chercher un appartement, et quand donner son préavis",
  titreSeo: "Quand chercher un appartement avant son préavis",
  description:
    "Réglez votre recherche sur les dates des annonces, et n'envoyez votre préavis qu'après avoir signé le nouveau bail. Durées, départ du délai, exemple daté.",
  chapeau:
    "Cherchez quand les annonces affichent une disponibilité proche de la date où vous pouvez partir, et n'envoyez votre congé qu'après avoir signé le nouveau bail : une fois donné, il ne se reprend pas sans l'accord du propriétaire. Le préavis dure trois mois en vide, un mois en meublé ou en zone tendue.",
  publieLe: "2026-11-04",
  pilier: "A",
  format: "cas-pratique",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/preavis-location"],
  outilLie: "/outils/dossier-de-location",
  statut: "brouillon",
  requete: "chercher location 3 mois à l'avance",
  faits: [
    {
      fait: "Un congé donné ne peut plus être repris sans l'accord du propriétaire",
      valeur: "vous ne pouvez plus changer d'avis",
      source: F1168,
      titreSource: T1168,
      releveLe: "2026-11-04",
      citation: "Après avoir donné congé, vous ne pouvez plus changer d'avis.",
    },
    {
      fait: "Préavis de trois mois pour un logement vide, sauf exceptions",
      valeur: "3 mois, sauf exceptions",
      source: F1168,
      titreSource: T1168,
      releveLe: "2026-11-04",
      citation: "respecter un délai de préavis de 3 mois, sauf exceptions",
    },
    {
      fait: "Préavis d'un mois en meublé, même pour un bail de neuf mois",
      valeur: "1 mois, y compris pour un bail de 9 mois",
      source: F1168,
      titreSource: T1168,
      releveLe: "2026-11-04",
      citation: "vous devez respecter un délai de préavis de 1 mois, y compris lorsque la durée du bail est de seulement 9 mois",
    },
    {
      fait: "Le préavis réduit (zone tendue, perte d'emploi...) suppose d'indiquer le motif et de joindre un justificatif",
      valeur: "motif indiqué dans la lettre et justificatif joint",
      source: F1168,
      titreSource: T1168,
      releveLe: "2026-11-04",
      citation: "vous devez indiquer ce motif dans votre lettre de congé et joindre",
    },
    {
      fait: "Par lettre recommandée, le préavis court du jour de réception",
      valeur: "jour de la réception de la lettre recommandée",
      source: F1168,
      titreSource: T1168,
      releveLe: "2026-11-04",
      citation: "Pour une lettre recommandée avec avis de réception , il s'agit du jour de la réception",
    },
    {
      fait: "Exemple : congé reçu le 5 septembre, préavis d'un mois jusqu'au 5 octobre à minuit",
      valeur: "du 5 septembre au 5 octobre à minuit",
      source: F1168,
      titreSource: T1168,
      releveLe: "2026-11-04",
      citation: "Si le destinataire a reçu le congé le 5 septembre, le préavis court jusqu'au 5 octobre à minuit",
    },
  ],
  corps: `
## Combien de temps à l'avance commencer à chercher ? {#quand-chercher}
Réglez-vous sur les annonces plutôt que sur une règle. Relevez la date de disponibilité d'une dizaine d'annonces de votre ville : si la plupart disent « libre de suite » ou « dans trois semaines », chercher trois mois avant ne sert qu'à visiter des logements qui partiront avant que vous soyez libre de les prendre.

Le bon moment commence quand les dates affichées croisent la vôtre. Avant, le temps n'est pas perdu : préparez le dossier complet, votre message type et la liste des quartiers. C'est ce qui fait gagner les premières heures quand le bon logement paraît, et la [méthode pour répondre à une annonce](/guides/repondre-a-une-annonce-de-location) détaille cette préparation.

## Faut-il donner son préavis avant de trouver ? {#preavis-avant}
Non. Envoyez votre congé une fois le nouveau bail signé, pas avant. Service-public le rappelle : après avoir donné congé, vous ne pouvez plus changer d'avis sans l'accord du propriétaire. Un congé envoyé trop tôt peut vous laisser sans logement à la fin du préavis ; un congé tardif coûte quelques semaines de double loyer, rien de plus.

Ce double loyer est le prix de la sécurité. Pour le réduire, envoyez la lettre le jour même de la signature, et gardez votre lettre de congé prête à l'avance, adresse du propriétaire comprise.

## Combien de temps dure votre préavis ? {#duree}
Trois mois pour un logement loué vide, un mois pour un meublé, même quand le bail ne dure que neuf mois. En vide, le préavis tombe à un mois dans les communes en zone tendue et dans quelques situations, comme une perte d'emploi, à condition d'indiquer le motif dans la lettre de congé et d'y joindre un justificatif.

Sans motif écrit, les trois mois s'appliquent, même si votre commune est en zone tendue. Les durées et les cas sont dans le guide du [préavis de location](/guides/preavis-location), et les [villes à préavis d'un mois](/blog/preavis-un-mois-zone-tendue-villes) sont listées à part.

## À partir de quand le préavis court-il ? {#depart}
Du jour où le propriétaire reçoit la lettre recommandée, pas du jour où vous l'envoyez. Le calcul se fait de date à date : service-public donne l'exemple d'un congé reçu le 5 septembre, pour lequel un préavis d'un mois court jusqu'au 5 octobre à minuit. Comptez donc le temps d'acheminement avant de fixer votre date de départ.

Une remise en main propre contre récépissé fait partir le délai le jour même : c'est la voie la plus rapide quand votre propriétaire habite près de chez vous.

## Un calendrier pour un départ d'un logement vide {#calendrier}
Prenons un logement vide hors zone tendue et une entrée souhaitée début février.

1. Décembre : dossier prêt, message type écrit, alertes réglées sur votre ville.
2. Début janvier : les annonces affichent des disponibilités au 1er février ; vous visitez et répondez dans l'heure.
3. Signature du nouveau bail le 10 janvier ; la lettre de congé part le jour même.
4. Le propriétaire la reçoit le 12 janvier : votre préavis court jusqu'au 12 avril, et les deux loyers se cumulent de février à mi-avril.

En meublé, ou avec un motif de préavis réduit, le chevauchement tombe à un mois. Si vous devez trouver en quelques jours, la méthode est dans [trouver un appartement rapidement](/blog/trouver-un-appartement-rapidement).
`,
});
