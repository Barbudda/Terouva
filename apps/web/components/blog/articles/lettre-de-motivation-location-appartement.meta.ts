import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/lettre-de-motivation-location-appartement.md.
  slug: "lettre-de-motivation-location-appartement",
  titre: "Lettre de motivation pour une location d'appartement : 4 exemples à compléter",
  titreSeo: "Lettre de motivation location : 4 exemples",
  description:
    "Ce que doit dire une lettre de motivation pour une location, pourquoi le propriétaire ne peut pas l'exiger, et quatre modèles à compléter.",
  chapeau:
    "Un propriétaire ne peut pas exiger de lettre de motivation : elle ne figure pas dans la liste des pièces autorisées. Une lettre courte aide pourtant à sortir du lot. Elle dit qui vous êtes, votre revenu, votre garantie, votre date d'emménagement et ce qui vous plaît dans le logement. Quatre modèles à compléter suivent.",
  publieLe: "2026-11-04",
  pilier: "A",
  format: "modele",
  lecture: 5,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location", "/guides/louer-sans-garant"],
  outilLie: "/outils/message-de-candidature",
  sources: [
    {
      titre:
        "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire (F1169)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
    {
      titre:
        "ANIL · Candidat locataire et sa caution : liste des pièces justificatives exigibles (décret n° 2015-1437)",
      url: "https://www.anil.org/documentation-experte/analyses-juridiques-jurisprudence/analyses-juridiques/analyses-juridiques-2015/candidat-locataire-et-sa-caution-liste-des-pieces-justificatives-exigibles/",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Un propriétaire peut-il exiger une lettre de motivation ?",
      a: "Non. Le décret n° 2015-1437 fixe une liste limitative des justificatifs qu'un propriétaire peut demander à un candidat locataire : identité, domicile, activité professionnelle, ressources. La lettre de motivation n'y figure pas. Exiger une pièce hors liste expose à une amende pouvant aller jusqu'à 3 000 €, ou 15 000 € pour une personne morale.",
    },
    {
      q: "Que mettre dans une lettre de motivation pour une location ?",
      a: "Qui vous êtes, votre situation professionnelle et votre revenu net mensuel, votre garant ou votre garantie, la date à laquelle vous pouvez emménager, un détail précis de l'annonce qui vous plaît, vos disponibilités de visite et votre téléphone. Une page au maximum, sans copie de pièce dans le corps.",
    },
    {
      q: "Faut-il envoyer une lettre ou un message pour répondre à une annonce ?",
      a: "Les deux, à deux moments. Le premier contact sur un site d'annonces est un message court, envoyé vite. La lettre va en première page du dossier, en PDF, quand le propriétaire le demande ou après la visite. Les deux doivent donner le même revenu, la même garantie et la même date.",
    },
  ],
  sommaire: [
    { id: "obligatoire", titre: "Le propriétaire peut-il l'exiger ?" },
    { id: "contenu", titre: "Ce que la lettre doit dire" },
    { id: "etudiant", titre: "Étudiant avec un garant" },
    { id: "cdi", titre: "Jeune actif en CDI" },
    { id: "cdd", titre: "CDD, intérim, période d'essai" },
    { id: "couple", titre: "Un couple qui arrive d'une autre ville" },
    { id: "message-ou-lettre", titre: "Lettre ou message ?" },
    { id: "recherche", titre: "Ce que ça change pour votre recherche" },
  ],
  statut: "publie",
};

export default meta;
