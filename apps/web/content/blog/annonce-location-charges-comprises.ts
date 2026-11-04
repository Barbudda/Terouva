import { article } from "@/lib/blog-format";

export default article({
  slug: "annonce-location-charges-comprises",
  titre: "« Charges comprises » dans une annonce : ce que le loyer affiché contient vraiment",
  titreSeo: "Loyer charges comprises : ce qu'il contient",
  description:
    "Provision ou forfait, régularisation annuelle, rappel sur trois ans : ce que cache « charges comprises » et comment comparer deux annonces.",
  chapeau:
    "« Charges comprises » veut dire que le montant affiché inclut une avance sur les charges. En location vide, c'est une provision, recalculée chaque année : vous pouvez recevoir un rappel ou un remboursement. En meublé, ce peut être un forfait, sans régularisation. Demandez lequel, et le montant de la dernière régularisation, avant de comparer deux annonces.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "publie",
  requete: "annonce location charges comprises",
  faits: [
    {
      fait: "Les charges se paient par provisions avec une régularisation annuelle",
      valeur: "des provisions de même montant, régularisées chaque année",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F947",
      titreSource: "Service-public.gouv.fr · Charges à payer par le locataire (charges locatives)",
      releveLe: "2026-11-04",
      citation:
        "Le paiement des charges se fait par provisions (avances régulières de même montant), avec une régularisation annuelle",
    },
    {
      fait: "Trop-perçu ou complément à la régularisation",
      valeur: "remboursement du trop-perçu ou demande de complément",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F947",
      titreSource: "Service-public.gouv.fr · Charges à payer par le locataire (charges locatives)",
      releveLe: "2026-11-04",
      citation: "Si les provisions sont inférieures aux dépenses réelles , le propriétaire (ou l'agence immobilière) demande un complément",
    },
    {
      fait: "En meublé, le forfait de charges ne se régularise pas",
      valeur: "un forfait sans complément ni régularisation",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F947",
      titreSource: "Service-public.gouv.fr · Charges à payer par le locataire (charges locatives)",
      releveLe: "2026-11-04",
      citation: "Le forfait ne doit pas s'accompagner d'un complément à verser ou d'une régularisation ultérieure",
    },
    {
      fait: "Décompte des charges un mois avant la régularisation",
      valeur: "décompte par nature de charges un mois avant",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F947",
      titreSource: "Service-public.gouv.fr · Charges à payer par le locataire (charges locatives)",
      releveLe: "2026-11-04",
      citation: "Un mois avant la régularisation annuelle, le propriétaire (ou l'agence immobilière) doit communiquer les informations suivantes",
    },
    {
      fait: "Délai pour réclamer des charges impayées",
      valeur: "3 ans",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F947",
      titreSource: "Service-public.gouv.fr · Charges à payer par le locataire (charges locatives)",
      releveLe: "2026-11-04",
      citation: "peut réclamer pendant 3 ans tout impayé de charges ou de loyers qui lui est dû",
    },
  ],
  corps: `
## Que veut dire « charges comprises » dans une annonce ? {#definition}
Le montant affiché additionne le loyer et une somme versée chaque mois pour les charges : eau, entretien des parties communes, ascenseur, chauffage collectif s'il y en a un. En location vide, cette somme est une provision, une avance de même montant chaque mois, régularisée une fois par an selon les dépenses réelles.

Pour comparer deux annonces, demandez toujours la part des charges dans le total, et ce qu'elles couvrent. Le guide [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location) montre comment poser la question dès le premier message.

## Le montant des charges peut-il augmenter après la signature ? {#regularisation}
Oui, en location vide. Une fois par an, le propriétaire compare les provisions versées aux dépenses réelles. S'il a trop perçu, il vous rembourse ; si les provisions étaient trop basses, il vous demande un complément. Un mois avant, il doit vous envoyer le décompte des charges par nature, et vous pouvez demander les justificatifs.

Une provision anormalement basse rend une annonce plus attirante, puis se rattrape à la régularisation. Le propriétaire peut réclamer des charges impayées pendant 3 ans.

## Qu'est-ce qu'un forfait de charges ? {#forfait}
En meublé, le bail peut prévoir un forfait à la place d'une provision. Le forfait est fixe, payé avec le loyer, et il ne peut pas être suivi d'un complément ou d'une régularisation. Pour vous, c'est un montant connu d'avance ; demandez simplement si le bail prévoit un forfait ou une provision.

## Quelles questions poser avant de candidater ? {#questions}
Trois questions suffisent pour comparer deux annonces « charges comprises » et éviter une mauvaise surprise : la part exacte des charges dans le montant affiché, provision ou forfait, et le résultat de la dernière régularisation, rappel ou remboursement. Ajoutez le mode de chauffage, individuel ou collectif.

Avec ces réponses, vous connaissez le vrai coût mensuel du logement, celui à mettre en face de vos revenus quand vous préparez votre [dossier de location](/guides/dossier-de-location).
`,
});
