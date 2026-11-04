import { article } from "@/lib/blog-format";

const F1214 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1214";
const T1214 = "Service-public.gouv.fr · Paiement du loyer par le locataire (bail d'habitation)";
const F10999 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F10999";
const T10999 = "Service-public.gouv.fr · Paiement en espèces";

export default article({
  slug: "payer-loyer-en-especes",
  titre: "Payer son loyer en espèces : le propriétaire peut-il l'imposer ou le refuser ?",
  titreSeo: "Payer son loyer en espèces : ce qui est permis",
  description:
    "Loyer en espèces : permis sous 1 000 €, jamais imposé. La quittance à demander à chaque versement, et ce que signale un bailleur qui exige du liquide.",
  chapeau:
    "Vous pouvez payer en espèces un loyer inférieur à 1 000 €, et en principe ce paiement ne peut pas vous être refusé. Le propriétaire, lui, ne peut pas vous imposer un mode de paiement : vous restez libre de refuser l'espèce comme le prélèvement. À chaque versement en liquide, demandez une quittance ou un reçu : c'est votre preuve.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "publie",
  requete: "payer son loyer en liquide",
  faits: [
    {
      fait: "Le loyer peut être payé en espèces si le montant est inférieur à 1 000 €",
      valeur: "inférieur à 1 000 €",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-04",
      citation: "Espèces, à la condition que le montant à payer soit inférieur à 1 000 €",
    },
    {
      fait: "Le locataire peut refuser le mode de paiement proposé par le propriétaire",
      valeur: "libre de refuser",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-04",
      citation: "Le locataire est libre de refuser la proposition du propriétaire (ou de l'agence immobilière)",
    },
    {
      fait: "Le bailleur ne peut pas imposer le prélèvement automatique",
      valeur: "prélèvement automatique jamais imposé",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-04",
      citation: "Le bailleur n'a pas le droit d'imposer le prélèvement automatique comme moyen de paiement du loyer",
    },
    {
      fait: "Le bailleur ne peut pas prélever le loyer sur le salaire, même avec accord",
      valeur: "aucun prélèvement sur salaire",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-04",
      citation: "Le bailleur n'a pas le droit de prélever ou de faire prélever directement les loyers sur votre salaire, même avec votre accord",
    },
    {
      fait: "Le propriétaire remet gratuitement une quittance au locataire qui la demande",
      valeur: "quittance gratuite sur demande",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-04",
      citation: "doit remettre gratuitement une quittance de loyer au locataire, lorsque le locataire lui en fait la demande",
    },
    {
      fait: "En cas de paiement partiel, le propriétaire remet un reçu",
      valeur: "reçu en cas de paiement partiel",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-04",
      citation: "Lorsque le locataire ne paie qu'une partie du montant du loyer, le propriétaire (ou l'agence immobilière) doit lui remettre un reçu",
    },
    {
      fait: "En principe, un paiement en espèces ne peut pas être refusé",
      valeur: "espèces refusées seulement par exception",
      source: F10999,
      titreSource: T10999,
      releveLe: "2026-11-04",
      citation: "En principe, un paiement en espèces ne peut pas vous être refusé",
    },
    {
      fait: "Un particulier ne peut pas payer un professionnel plus de 1 000 € en espèces",
      valeur: "1 000 € d'un particulier à un professionnel",
      source: F10999,
      titreSource: T10999,
      releveLe: "2026-11-04",
      citation: "Le paiement en espèces d'un particulier à un professionnel ou entre professionnels est limité à 1 000 €",
    },
    {
      fait: "Entre particuliers, un écrit est nécessaire au-delà de 1 500 € pour prouver les versements",
      valeur: "écrit au-delà de 1 500 €",
      source: F10999,
      titreSource: T10999,
      releveLe: "2026-11-04",
      citation: "Un écrit est nécessaire au-delà de 1 500 € pour prouver les versements",
    },
  ],
  corps: `
## Peut-on payer son loyer en liquide ? {#liquide}
Oui, si le montant à payer est inférieur à 1 000 €. Service-public range les espèces parmi les moyens de régler le loyer, à côté du chèque, du virement et du prélèvement que vous acceptez. Au-delà de ce plafond, le paiement passe par chèque ou virement, même si le propriétaire et vous préféreriez le liquide.

Le plafond vise la somme à payer. Si votre loyer, charges comprises, s'en approche, le virement vous évite toute discussion sur le montant exact et sur la manière de le remettre.

## Le propriétaire peut-il refuser vos espèces ? {#refus}
En principe, non : service-public rappelle qu'un paiement en espèces ne peut pas vous être refusé, sauf exceptions, comme des billets en mauvais état ou l'absence d'appoint. Une agence, qui agit en professionnel, ne peut pas recevoir plus de 1 000 € en espèces de la part d'un particulier. Si l'on refuse votre liquide sous ce seuil, proposez le virement avant d'entrer en conflit.

Le virement a deux avantages : il ne demande pas de rendez-vous chaque mois, et il laisse une trace à votre banque. Pour un loyer qui tombe le même jour, un virement permanent règle la question.

## Le propriétaire peut-il imposer un mode de paiement ? {#imposer}
Non. Il peut vous proposer le prélèvement automatique ou les espèces, et vous êtes libre de refuser. Il n'a pas le droit d'imposer le prélèvement automatique, et une clause du bail qui le prévoit est interdite. Il ne peut jamais prélever le loyer sur votre salaire, même avec votre accord. Chèque, virement ou espèces sous le plafond : le choix vous revient.

Les autres clauses qu'un bail ne peut pas contenir sont réunies dans l'article sur les [clauses interdites](/blog/clauses-abusives-bail-location).

## Quelle preuve demander quand on paie en espèces ? {#quittance}
Une quittance, chaque mois. Le propriétaire ou l'agence doit vous la remettre gratuitement quand vous la demandez, et un reçu si vous ne payez qu'une partie du loyer. Sans elle, rien ne prouve votre paiement en liquide, alors qu'un virement laisse une trace. Entre particuliers, un écrit est nécessaire au-delà de 1 500 € pour prouver les versements.

Demandez la quittance au moment même du versement, ou dans un message daté le jour même. Trois quittances récentes font aussi partie des pièces de votre prochain dossier : l'article sur l'[attestation de bon payeur](/blog/attestation-bon-payeur-location) explique comment les utiliser.

## Que penser d'un bailleur qui n'accepte que le liquide ? {#alerte}
Soyez prudent, surtout s'il refuse aussi le bail écrit ou la quittance. Rien n'interdit à un propriétaire de préférer les espèces, mais un loyer payé sans trace ni papier vous laisse sans preuve de vos paiements, de vos conditions de location et de votre dépôt de garantie le jour d'un désaccord. Exigez une quittance à chaque versement, ou passez à une autre annonce.

Le dépôt de garantie mérite la même règle : versé en liquide, il se récupère mal sans reçu. Le [guide du dépôt de garantie](/guides/depot-de-garantie) rappelle son montant maximal et les délais de restitution, et l'article [louer sans bail écrit](/blog/location-sans-bail-ecrit) les preuves à garder quand le contrat manque.
`,
});
