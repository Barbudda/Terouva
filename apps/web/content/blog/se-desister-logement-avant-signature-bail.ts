import { article } from "@/lib/blog-format";

export default article({
  slug: "se-desister-logement-avant-signature-bail",
  titre: "Accepté ailleurs : peut-on se désister avant de signer le bail ?",
  titreSeo: "Se désister d'un logement avant le bail",
  description:
    "Votre dossier est retenu mais vous avez trouvé mieux : se désister avant la signature, prévenir vite, et que faire si une somme a déjà été versée.",
  chapeau:
    "Oui. L'impossibilité de se rétracter vise le bail signé, pas le dossier accepté. Avant la signature, le propriétaire ne peut vous réclamer aucune somme, pas même pour réserver le logement : un désistement ne vous coûte donc rien si vous n'avez rien versé. Prévenez par écrit, le jour même, pour qu'il rappelle le candidat suivant.",
  publieLe: "2026-11-04",
  pilier: "A",
  format: "question",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "brouillon",
  requete: "se désister pour un logement",
  faits: [
    {
      fait: "On ne peut pas se rétracter après avoir signé un bail d'habitation",
      valeur: "pas de rétractation après la signature",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1703",
      titreSource: "Service-public.gouv.fr · Peut-on se rétracter après avoir signé un bail d'habitation ?",
      releveLe: "2026-11-04",
      citation: "Non, il n'est pas possible de se rétracter après avoir signé un bail d'habitation",
    },
    {
      fait: "Aucune somme ne peut être réclamée avant la signature du bail",
      valeur: "aucune somme avant la signature du bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "Aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation",
    },
    {
      fait: "Le propriétaire ne peut pas demander d'argent pour réserver le logement",
      valeur: "interdiction de réclamer une somme pour la réservation",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "a interdiction de réclamer une somme d'argent en contrepartie de la réservation du logement",
    },
  ],
  corps: `
## Peut-on se désister d'un logement avant de signer le bail ? {#se-desister}
Oui. Service-public le rappelle : c'est après avoir signé un bail qu'on ne peut plus se rétracter. Tant que le bail n'est pas signé, un dossier retenu ou un « c'est d'accord » par message reste une étape, et le propriétaire ne peut vous réclamer aucune somme. Si vous n'avez rien versé, votre désistement ne vous coûte rien.

Le seul coût est pour le propriétaire, qui a écarté d'autres candidats en vous attendant. D'où la règle qui suit : prévenir tôt. Pour la façon de [répondre aux annonces](/guides/repondre-a-une-annonce-de-location) sans vous retrouver avec deux accords en même temps, le guide donne la méthode.

## Comment prévenir le propriétaire ? {#prevenir}
Par écrit, le jour même où vous décidez, dans le canal où il vous a répondu : message de la plateforme, SMS ou courriel. Trois phrases suffisent : vous retirez votre candidature, vous le remerciez de l'avoir retenue, et vous lui laissez le temps de rappeler le candidat suivant. Pas besoin de justifier votre choix.

Par exemple : « Bonjour, j'ai trouvé un autre logement et je retire ma candidature pour l'appartement de la rue des Lilas. Merci pour votre réponse rapide, je préfère vous prévenir tout de suite pour que vous puissiez contacter un autre candidat. »

Un écrit vous protège aussi : il date votre désistement, si le propriétaire soutient plus tard que vous l'avez laissé sans nouvelles.

## Et si vous avez déjà versé une somme ? {#somme-versee}
Demandez-la en retour, par écrit. Le propriétaire n'a le droit de réclamer aucune somme avant la signature du bail, ni pour réserver le logement : un acompte, des « frais de dossier » ou un chèque de réservation versés avant le bail n'avaient pas lieu d'être. Gardez la preuve du paiement et vos échanges.

La marche à suivre, de la demande amiable aux recours, est détaillée dans l'article sur l'[acompte de réservation](/blog/acompte-reservation-location-appartement).

## Et si le bail est déjà signé ? {#deja-signe}
Alors le désistement n'existe plus : un bail signé ne se rétracte pas. Pour partir, il faut donner congé au propriétaire en respectant un préavis, même si vous n'êtes jamais entré dans le logement. Le délai et la lettre dépendent du type de bail, vide ou meublé, et de la ville.

Les cas où une sortie rapide reste possible sont détaillés dans l'article [se rétracter après la signature du bail](/blog/se-retracter-apres-signature-bail), et les délais dans le guide du [préavis de location](/guides/preavis-location).

## Comment éviter d'avoir à se désister ? {#eviter}
En gardant vos candidatures sous les yeux. Notez pour chacune la date d'envoi, la réponse et la date de visite, et fixez-vous une règle simple avant de signer : quel logement passe devant l'autre si les deux disent oui. Le jour où une réponse arrive, vous savez en une minute si vous acceptez ou si vous déclinez.

Quand un propriétaire vous propose la signature, dites-le aux autres sans attendre. C'est aussi ce que vous espérez d'eux après une visite : l'article sur l'[attente après la visite](/blog/apres-la-visite-dossier-retenu) explique ce qui se passe de leur côté.
`,
});
