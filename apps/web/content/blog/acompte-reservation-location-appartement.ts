import { article } from "@/lib/blog-format";

export default article({
  slug: "acompte-reservation-location-appartement",
  titre: "Acompte pour réserver un appartement : est-ce légal ?",
  titreSeo: "Acompte pour réserver une location : légal ?",
  description:
    "Non : aucune somme ne peut être demandée avant la signature du bail. Ce qui est permis à la signature, et quoi répondre au propriétaire qui insiste.",
  chapeau:
    "Non. Un propriétaire ou une agence n'a pas le droit de vous demander de l'argent pour réserver un logement, ni aucune somme avant la signature du bail. À la signature seulement, il peut demander un dépôt de garantie, plafonné à 1 mois de loyer hors charges en location vide et à 2 mois en meublé.",
  publieLe: "2026-12-23",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/depot-de-garantie", "/guides/repondre-a-une-annonce-de-location"],
  outilLie: "/outils/message-de-candidature",
  statut: "brouillon",
  requete: "acompte réservation location appartement",
  faits: [
    {
      fait: "Le propriétaire ou l'agence ne peut pas demander d'argent en contrepartie de la réservation",
      valeur: "interdiction de réclamer une somme d'argent pour réserver le logement",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "a interdiction de réclamer une somme",
    },
    {
      fait: "Aucune somme ne peut être demandée avant la signature du bail",
      valeur: "aucune somme avant la signature du bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "ne peut être réclamée par le propriétaire avant la signature du bail",
    },
    {
      fait: "Dépôt de garantie maximal en location vide",
      valeur: "1 mois de loyer hors charges",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31269",
      titreSource: "Service-public.gouv.fr · Dépôt de garantie dans un bail d'habitation",
      releveLe: "2026-11-04",
      citation: "ne doit pas dépasser 1 mois de loyer (hors charges)",
    },
    {
      fait: "Dépôt de garantie maximal en location meublée",
      valeur: "2 mois de loyer hors charges",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31269",
      titreSource: "Service-public.gouv.fr · Dépôt de garantie dans un bail d'habitation",
      releveLe: "2026-11-04",
      citation: "ne doit pas dépasser 2 mois de loyer (hors charges)",
    },
  ],
  corps: `
## Un propriétaire peut-il demander un acompte pour réserver un appartement ?
Non. Service-public le dit sans exception : le propriétaire, ou l'agence immobilière, a interdiction de réclamer une somme d'argent en contrepartie de la réservation du logement. Acompte, chèque de réservation, frais de dossier ou « avance sur le premier loyer » : le nom ne change rien. Tant que le bail n'est pas signé, vous n'avez rien à payer.

Cette règle vient s'ajouter à la liste des pièces qu'on peut vous demander, détaillée dans notre [guide du dossier de location](/guides/dossier-de-location) : un chèque de réservation n'en fait pas partie.

## Quand le propriétaire peut-il vous demander de l'argent ?
À la signature du bail, et pas avant. Il peut alors demander le premier loyer et, si le bail le prévoit, un dépôt de garantie. Celui-ci ne peut pas dépasser 1 mois de loyer hors charges pour une location vide, et 2 mois de loyer hors charges pour une location meublée. Son montant est écrit dans le bail.

Le dépôt se rend à la fin de la location, selon des délais et des règles que notre guide du [dépôt de garantie](/guides/depot-de-garantie) détaille.

## Que répondre à un propriétaire qui demande un acompte ?
Restez courtois : beaucoup de propriétaires particuliers ignorent la règle. Rappelez-la en une phrase, proposez ce qui le rassure vraiment, puis attendez sa réponse avant d'envoyer quoi que ce soit. Un propriétaire de bonne foi accepte. Celui qui insiste pour être payé avant toute signature vous donne une raison de vous méfier.

Un exemple de réponse :

« Merci pour votre retour. Je reste très intéressé par le logement. Je ne peux pas verser d'acompte avant la signature du bail, puisque la loi l'interdit, mais je peux vous envoyer mon dossier complet dès aujourd'hui et signer le bail à la date qui vous convient. Le dépôt de garantie et le premier loyer seront réglés à ce moment-là. »

## Que peut faire un propriétaire de bonne foi à la place d'un acompte ?
Il cherche surtout à éviter qu'un candidat se désiste au dernier moment. Pour cela, il peut fixer rapidement une date de signature, vous demander un dossier complet avant de s'engager, ou signer le bail plus tôt avec une date d'entrée dans les lieux ultérieure. Aucune de ces solutions ne demande de vous faire payer avant le bail.

De votre côté, un dossier prêt et une réponse rapide sont ce qui le rassure le plus. Notre [générateur de message de candidature](/outils/message-de-candidature) vous aide à répondre vite et clairement.

## Et si vous avez déjà versé un acompte ?
Gardez la trace du paiement et des messages échangés. Demandez par écrit le remboursement, en rappelant que la somme a été versée avant la signature du bail. Si le bail est signé ensuite, demandez que la somme soit déduite de ce que vous devez à la signature, et que cela soit écrit.

Si vous ne pouvez plus joindre la personne, ou si l'annonce a disparu, il s'agit peut-être d'une escroquerie : signalez-la et portez plainte. Pour la suite de votre recherche, notre guide pour [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location) vous aide à repartir vite.
`,
});
