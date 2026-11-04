import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/proprietaire-ne-repond-pas.md.
  slug: "proprietaire-ne-repond-pas",
  titre: "Le propriétaire ne répond pas à votre message : pourquoi, et quoi faire",
  titreSeo: "Le propriétaire ne répond pas : que faire ?",
  description:
    "Votre message à un propriétaire reste sans réponse ? Les raisons probables, quand relancer, et comment répondre plus tôt à la prochaine annonce.",
  chapeau:
    "Un propriétaire qui ne répond pas a peut-être déjà assez de candidats, ou votre message ne lui donnait pas de quoi décider. Vous ne pouvez pas le vérifier, mais vous pouvez relancer une fois, brièvement, avec une information utile. Le vrai levier reste le message suivant : envoyé plus tôt, et complet dès la première ligne.",
  publieLe: "2026-11-16",
  pilier: "A",
  format: "cas-pratique",
  lecture: 5,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location", "/guides/refus-de-dossier"],
  outilLie: "/outils/message-de-candidature",
  sources: [
    {
      titre: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Arnaques à la location immobilière sur internet",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34092",
      releveLe: "2026-11-04",
    },
    {
      titre: "ANIL · Caution et garanties : la garantie Visale",
      url: "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Pourquoi un propriétaire ne répond-il pas à mon message ?",
      a: "Vous ne pouvez pas le savoir avec certitude. Les explications courantes : le logement est déjà loué ou les visites sont calées, votre message est arrivé tard, il ne contenait pas les informations qui servent à trier, ou l'annonce a été retirée. Le moment et le contenu du message sont les deux causes sur lesquelles vous pouvez agir.",
    },
    {
      q: "Faut-il relancer un propriétaire qui ne répond pas ?",
      a: "Une fois, brièvement, en ajoutant une information utile : votre garantie, un dossier prêt, des créneaux de visite précis. Aucune règle ne fixe le délai ; laissez quelques jours. Si cette relance reste sans réponse, passez aux annonces suivantes.",
    },
    {
      q: "Un propriétaire peut-il demander de l'argent avant la visite ?",
      a: "Non. Selon Service-public, aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail. Une demande d'argent avant la signature, ou de documents officiels avant la visite, fait partie des signes d'une fausse annonce, que vous pouvez signaler sur la plateforme officielle THESEE.",
    },
  ],
  sommaire: [
    { id: "pourquoi", titre: "Pourquoi le silence" },
    { id: "contenu", titre: "Ce que votre message disait" },
    { id: "relancer", titre: "Relancer, une fois" },
    { id: "agences", titre: "Le cas des agences" },
    { id: "passer", titre: "Quand passer à autre chose" },
    { id: "argent", titre: "Une demande d'argent" },
    { id: "prochaine-fois", titre: "Répondre plus tôt" },
  ],
  statut: "brouillon",
};

export default meta;
