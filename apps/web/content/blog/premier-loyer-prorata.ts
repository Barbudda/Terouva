import { article } from "@/lib/blog-format";

export default article({
  slug: "premier-loyer-prorata",
  titre: "Le premier loyer se paie-t-il au prorata ?",
  titreSeo: "Premier loyer : se paie-t-il au prorata ?",
  description:
    "Entrée en cours de mois : ce que dit la loi, ce que fixe le bail, comment calculer le premier loyer au prorata des jours, et quand le payer.",
  chapeau:
    "La loi ne fixe pas de règle de prorata : le loyer se paie aux termes prévus par le bail. Pour une entrée en cours de mois, le calcul au prorata des jours occupés est le plus simple. Faites écrire la méthode et le montant dans le bail, et ne payez rien avant de l'avoir signé.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/etat-des-lieux"],
  statut: "brouillon",
  requete: "calcul prorata loyer entrée",
  faits: [
    {
      fait: "Le loyer se paie aux termes convenus, et mensuellement si le locataire le demande",
      valeur: "aux termes convenus ; paiement mensuel de droit sur demande",
      source: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000509310",
      titreSource: "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 7",
      releveLe: "2026-11-04",
      citation:
        "De payer le loyer et les charges récupérables aux termes convenus ; le paiement mensuel est de droit lorsque le locataire en fait la demande",
    },
    {
      fait: "Le bail indique sa date de prise d'effet",
      valeur: "date de prise d'effet et durée du bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F920",
      titreSource: "Service-public.gouv.fr · Rédaction du bail d'habitation",
      releveLe: "2026-11-04",
      citation: "Nom du ou des locataires Date de prise d'effet et durée du bail",
    },
    {
      fait: "Aucune somme avant la signature du bail",
      valeur: "aucune somme ne peut être demandée avant la signature du bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "Aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation",
    },
    {
      fait: "Le prélèvement automatique ne peut pas être imposé",
      valeur: "clause interdite : imposer le prélèvement automatique",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F920",
      titreSource: "Service-public.gouv.fr · Rédaction du bail d'habitation",
      releveLe: "2026-11-04",
      citation: "imposant comme mode de paiement du loyer le prélèvement automatique",
    },
  ],
  corps: `
## Le premier loyer se paie-t-il au prorata ? {#prorata}
La loi ne l'impose pas en toutes lettres : elle dit que le loyer se paie aux termes convenus dans le bail. Le bail fixe sa date de prise d'effet, et c'est à partir de cette date que le loyer est dû. Quand l'entrée tombe en cours de mois, le calcul le plus simple et le plus juste est le prorata des jours occupés.

Le plus sûr est de faire écrire dans le bail, ou dans un échange écrit avant la signature, le montant exact du premier loyer et la façon dont il a été calculé.

## Comment calculer le premier loyer au prorata ? {#calcul}
Divisez le loyer mensuel, charges comprises, par le nombre de jours du mois, puis multipliez par le nombre de jours occupés, jour d'entrée compris. Pour une entrée le 12 d'un mois de 30 jours, vous occupez le logement 19 jours et payez 19 trentièmes du loyer. Certains baux divisent toujours par 30 : vérifiez la méthode écrite.

Les deux méthodes donnent des montants proches, mais pas identiques sur un mois de 31 jours ou en février. L'important est que la méthode soit dite avant la signature, pour que personne ne la découvre au premier avis d'échéance.

## Quand faut-il payer le premier loyer ? {#quand}
Au moment prévu par le bail : regardez la date de premier paiement et celle du versement du [dépôt de garantie](/guides/depot-de-garantie). Rien ne peut vous être demandé avant la signature du bail : une demande de virement pour réserver le logement avant toute signature doit vous alerter, surtout si vous n'avez pas visité.

Le propriétaire ne peut pas non plus vous imposer le prélèvement automatique : virement, chèque ou autre moyen restent possibles.

## Et à la sortie, le dernier mois se paie-t-il en entier ? {#sortie}
La question se pose dans l'autre sens quand votre préavis se termine en cours de mois. Le même raisonnement vaut : le bail et votre accord avec le propriétaire fixent le calcul. Demandez par écrit, au moment où vous donnez congé, comment sera calculé le dernier loyer, et gardez sa réponse avec votre lettre.

Le jour de la sortie, l'[état des lieux](/guides/etat-des-lieux) et la restitution du dépôt de garantie suivent leurs propres règles et délais.
`,
});
