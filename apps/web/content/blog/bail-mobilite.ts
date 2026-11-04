import { article } from "@/lib/blog-format";

export default article({
  slug: "bail-mobilite",
  titre: "Bail mobilité : pour qui, combien de temps, et sans dépôt de garantie",
  titreSeo: "Bail mobilité : pour qui et combien de temps",
  description:
    "Un meublé loué de 1 à 10 mois à un étudiant, un stagiaire ou un salarié en mission, sans dépôt de garantie ni renouvellement. Les règles pour le locataire.",
  chapeau:
    "Le bail mobilité est un bail de logement meublé de 1 à 10 mois, non renouvelable, réservé aux locataires en études, formation, apprentissage, stage, service civique, mutation ou mission temporaire. Le propriétaire ne peut pas demander de dépôt de garantie, mais peut demander une caution, y compris Visale. Le préavis du locataire est d'un mois.",
  publieLe: "2026-11-23",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/preavis-location", "/guides/garantie-visale"],
  statut: "brouillon",
  requete: "bail mobilité",
  faits: [
    {
      fait: "Durée du bail mobilité",
      valeur: "1 mois minimum, 10 mois maximum",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34759",
      titreSource: "Service-public.gouv.fr · Quelles sont les règles d'un bail mobilité ?",
      releveLe: "2026-11-04",
      citation: "Le bail mobilité est conclu pour au minimum 1 mois et au maximum 10 mois.",
    },
    {
      fait: "Ni renouvelé ni reconduit",
      valeur: "non renouvelable et non reconductible",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34759",
      titreSource: "Service-public.gouv.fr · Quelles sont les règles d'un bail mobilité ?",
      releveLe: "2026-11-04",
      citation: "Ce bail est non renouvelable et non reconductible.",
    },
    {
      fait: "Pas de dépôt de garantie",
      valeur: "dépôt de garantie interdit",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34759",
      titreSource: "Service-public.gouv.fr · Quelles sont les règles d'un bail mobilité ?",
      releveLe: "2026-11-04",
      citation: "Le propriétaire a interdiction de demander un dépôt de garantie",
    },
    {
      fait: "Caution possible, Visale comprise",
      valeur: "caution autorisée, Visale possible, y compris pour un étudiant",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34759",
      titreSource: "Service-public.gouv.fr · Quelles sont les règles d'un bail mobilité ?",
      releveLe: "2026-11-04",
      citation: "Dans ce cas, le locataire peut notamment recourir à la garantie Visale",
    },
    {
      fait: "Le locataire justifie de sa situation",
      valeur: "document justificatif (contrat d'apprentissage, convention de stage, de formation)",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34759",
      titreSource: "Service-public.gouv.fr · Quelles sont les règles d'un bail mobilité ?",
      releveLe: "2026-11-04",
      citation: "Le locataire doit justifier de sa situation par un document",
    },
    {
      fait: "Préavis du locataire",
      valeur: "un mois, à tout moment",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34759",
      titreSource: "Service-public.gouv.fr · Quelles sont les règles d'un bail mobilité ?",
      releveLe: "2026-11-04",
      citation: "il doit lui donner congé et respecter un délai de préavis d'un mois",
    },
    {
      fait: "Un nouveau bail après un bail mobilité est un bail classique",
      valeur: "nouveau bail pour le même logement : bail d'habitation classique",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34759",
      titreSource: "Service-public.gouv.fr · Quelles sont les règles d'un bail mobilité ?",
      releveLe: "2026-11-04",
      citation: "signent un nouveau bail pour le même logement, alors ce nouveau bail est obligatoirement un bail",
    },
  ],
  corps: `
## Qui peut signer un bail mobilité ? {#qui}
Seuls certains locataires, selon leur situation au jour où le bail commence : formation professionnelle, études supérieures, contrat d'apprentissage, stage, service civique, mutation professionnelle ou mission temporaire liée au travail. Le locataire doit justifier de sa situation par un document, comme une convention de stage ou un contrat d'apprentissage. Le logement est forcément loué meublé.

Si vous n'êtes dans aucune de ces situations, le propriétaire doit vous proposer un bail meublé classique, avec ses propres règles de durée et de [dépôt de garantie](/guides/depot-de-garantie).

## Combien de temps dure un bail mobilité ? {#duree}
De 1 à 10 mois. Il n'est ni renouvelé ni reconduit : à la date prévue, il s'arrête. Sa durée peut être modifiée une fois par avenant, sans que le total dépasse 10 mois. Si vous restez ensuite dans le même logement avec un nouveau contrat, ce contrat est obligatoirement un bail d'habitation classique.

Une loi du 26 novembre 2025 prévoit une durée d'une semaine à 18 mois dans les résidences à vocation d'emploi, mais Service-public précise qu'elle attend encore un décret pour s'appliquer.

## Faut-il payer un dépôt de garantie ? {#depot}
Non. Le propriétaire n'a pas le droit de demander un dépôt de garantie pour un bail mobilité. C'est la principale différence d'argent avec un meublé classique, où le dépôt peut atteindre deux mois de loyer hors charges. Si une annonce de bail mobilité réclame un dépôt, posez la question avant de signer.

## Le propriétaire peut-il demander un garant ? {#garant}
Oui. La caution reste autorisée dans un bail mobilité, et le locataire peut recourir à la garantie Visale, y compris s'il est étudiant. Pour un stage ou une mission de quelques mois, Visale permet de ne pas solliciter un proche : ses conditions sont détaillées dans le guide de la [garantie Visale](/guides/garantie-visale).

## Comment partir avant la fin ? {#partir}
À tout moment, avec un préavis d'un mois, par lettre recommandée avec avis de réception ou par acte de commissaire de justice. Le propriétaire, lui, ne peut reprendre le logement qu'à l'échéance. Le calcul de la date de fin du préavis suit les mêmes règles que pour un bail classique, détaillées dans le guide du [préavis de location](/guides/preavis-location).
`,
});
