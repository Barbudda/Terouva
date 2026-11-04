import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/mail-apres-visite-appartement.md. Le registre visait un mode
  // « après la visite » de l'outil : si ce mode est créé, l'article y renverra.
  slug: "mail-apres-visite-appartement",
  titre: "Mail après une visite d'appartement : quoi écrire, et un exemple",
  titreSeo: "Mail après une visite d'appartement : exemple",
  description:
    "Que mettre dans le mail à envoyer après la visite d'un appartement, quand l'envoyer, faut-il joindre son dossier : un exemple à adapter.",
  chapeau:
    "Envoyez-le le jour de la visite, en quelques lignes : un merci qui rappelle le logement, votre intérêt avec un détail précis, la réponse aux questions restées ouvertes, votre dossier complet ou son lien. Aucune somme ne peut vous être demandée avant la signature du bail, même pour réserver le logement.",
  publieLe: "2026-11-16",
  pilier: "A",
  format: "modele",
  lecture: 4,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/message-de-candidature",
  sources: [
    {
      titre: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · DossierFacile (locataire)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R51424",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Que mettre dans un mail après la visite d'un appartement ?",
      a: "Un merci qui rappelle le logement et le jour de la visite, votre intérêt avec un détail précis, la réponse à ce qui est resté en suspens (date d'arrivée, garant, pièce attendue), puis votre dossier ou son lien et votre téléphone. Quelques lignes suffisent.",
    },
    {
      q: "Faut-il joindre son dossier au mail après la visite ?",
      a: "Oui, si le propriétaire ne l'a pas déjà, en un seul fichier ou un seul lien. Le service public gratuit DossierFacile vérifie que votre dossier est complet et vous donne un lien unique à communiquer. N'envoyez que les pièces que la loi autorise.",
    },
    {
      q: "Le propriétaire peut-il demander de l'argent après la visite pour réserver ?",
      a: "Non. Service-public rappelle qu'aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation, y compris pour réserver le logement.",
    },
  ],
  sommaire: [
    { id: "faut-il", titre: "Faut-il écrire" },
    { id: "contenu", titre: "Ce que le mail contient" },
    { id: "modele", titre: "Un exemple" },
    { id: "quand", titre: "Quand l'envoyer" },
    { id: "dossier", titre: "Joindre le dossier" },
    { id: "argent", titre: "Une demande d'argent" },
    { id: "non", titre: "Si vous ne donnez pas suite" },
  ],
  statut: "brouillon",
};

export default meta;
