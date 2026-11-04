import { article } from "@/lib/blog-format";

export default article({
  slug: "louer-en-periode-d-essai",
  titre: "Peut-on louer un appartement en période d'essai ?",
  titreSeo: "Louer un appartement en période d'essai",
  description:
    "Oui : le propriétaire peut demander une attestation de l'employeur qui mentionne la période d'essai, et Visale couvre les salariés pendant celle-ci.",
  chapeau:
    "Oui. Aucune règle n'interdit de louer pendant une période d'essai. Le propriétaire peut demander votre contrat ou une attestation de l'employeur qui indique l'emploi, la rémunération et la durée de l'essai. Et la garantie Visale vise expressément les salariés en période d'essai d'un CDI, à condition de la demander dans les six mois qui suivent l'embauche.",
  publieLe: "2026-12-01",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/garantie-visale"],
  outilLie: "/outils/dossier-de-location",
  statut: "brouillon",
  requete: "louer un appartement en période d'essai",
  faits: [
    {
      fait: "Pièce autorisée pour la situation professionnelle : attestation de l'employeur mentionnant la période d'essai",
      valeur: "attestation de l'employeur précisant l'emploi, la rémunération, la date d'entrée en fonctions et la durée de la période d'essai",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "la date d'entrée en fonctions envisagée et, si nécessaire, la durée de la période d'essai",
    },
    {
      fait: "Visale vise les salariés du secteur privé pendant la période d'essai d'un CDI",
      valeur: "salarié en période d'essai du CDI",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "Il s'agit notamment du salarié en contrat aidé, en intérim, en CDD, durant la période d'essai du CDI",
    },
    {
      fait: "À partir de 31 ans, Visale se demande dans les six mois qui suivent l'embauche",
      valeur: "6 mois après l'embauche",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "faire la demande de la garantie Visale dans les 6 mois qui suivent l'embauche",
    },
    {
      fait: "Avant 30 ans, Visale est ouverte quel que soit le statut",
      valeur: "de 17 ans et 10 mois à moins de 30 ans, salarié ou sans emploi",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "Tous les locataires âgés d'au moins 17 ans et 10 mois, jusqu'à moins de 30 ans",
    },
    {
      fait: "Amende pour un justificatif non autorisé",
      valeur: "3 000 €",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "il encourt une amende pouvant aller jusqu'à 3 000 €",
    },
  ],
  corps: `
## Peut-on louer un appartement pendant sa période d'essai ? {#possible}
Oui. Aucun texte n'impose d'avoir fini sa période d'essai pour signer un bail. Le propriétaire choisit son locataire sur sa situation financière, et une période d'essai en cours est une information parmi d'autres. Ce qui compte, c'est de lui donner de quoi juger, avec les pièces que la [liste officielle du dossier](/guides/dossier-de-location) autorise.

La période d'essai inquiète parce qu'elle peut se rompre. Le dossier doit donc répondre à cette inquiétude par des faits, pas par des promesses : un contrat signé, une rémunération écrite, une garantie solide.

## Quel document prouve un emploi en période d'essai ? {#piece}
Le contrat de travail, ou une attestation de l'employeur. La liste des justificatifs autorisés prévoit une attestation qui précise l'emploi, la rémunération proposée, la date d'entrée en fonctions envisagée et, si nécessaire, la durée de la période d'essai. C'est la pièce faite pour votre cas, surtout si vous n'avez pas encore de fiche de paie.

Demandez-la à votre service du personnel dès la signature du contrat, en même temps que votre premier bulletin. Le propriétaire ne peut pas exiger autre chose pour cette rubrique : un document hors liste l'expose à une amende pouvant aller jusqu'à 3 000 €.

## La garantie Visale couvre-t-elle un salarié en période d'essai ? {#visale}
Oui. Service-public cite le salarié « durant la période d'essai du CDI » parmi les salariés du secteur privé qui peuvent l'obtenir à partir de 31 ans, à condition de faire la demande dans les six mois qui suivent l'embauche. Avant 30 ans, Visale est ouverte quel que soit le statut, sous conditions de loyer et de ressources.

C'est souvent la meilleure réponse à l'hésitation du propriétaire : si l'essai se rompt et que vous ne payez plus, Action Logement paie à votre place. Les plafonds et la démarche sont dans le guide de la [garantie Visale](/guides/garantie-visale).

## Comment présenter votre candidature ? {#candidature}
En une phrase, sans vous excuser : « Je suis en CDI depuis le 3 novembre, en période d'essai jusqu'au 3 janvier, et je bénéficie de la garantie Visale. » Le propriétaire a la date de fin de l'essai et la réponse à la question qu'il se pose.

Joignez ensuite, quand il répond, le contrat ou l'attestation de l'employeur et la garantie. La [checklist de dossier](/outils/dossier-de-location) donne la liste de vos pièces selon votre situation.
`,
});
