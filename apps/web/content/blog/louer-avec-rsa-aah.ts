import { article } from "@/lib/blog-format";

// Relecture juridique serrée (plan, garde-fous) : la décision 2017-056 est citée pour ce qu'elle
// dit, une discrimination fondée sur le handicap envers des candidats à l'AAH. Aucune décision lue
// sur le RSA : l'article ne prête au Défenseur des droits aucune position à son sujet.
export default article({
  slug: "louer-avec-rsa-aah",
  titre: "Louer avec le RSA ou l'AAH : ce que le propriétaire peut regarder, et ce qu'il ne peut pas retenir",
  titreSeo: "Louer avec le RSA ou l'AAH : vos droits",
  description:
    "RSA et AAH comptent comme ressources du dossier. Ce que le propriétaire peut juger, ce que la loi lui interdit, et ce qu'a décidé le Défenseur des droits.",
  chapeau:
    "Oui. Le RSA et l'AAH se justifient par une pièce de la liste officielle, et le propriétaire juge votre situation financière comme pour tout candidat. Il ne peut pas fonder un refus sur la vulnérabilité économique ni sur le handicap : le Défenseur des droits a jugé discriminatoire un refus opposé à deux candidats qui touchaient l'AAH.",
  publieLe: "2026-12-15",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/refus-de-dossier",
  guidesLies: ["/guides/dossier-de-location", "/guides/garantie-visale"],
  outilLie: "/outils/dossier-de-location",
  statut: "brouillon",
  requete: "louer un appartement avec le RSA",
  faits: [
    {
      fait: "Pièce de ressources pour les prestations sociales",
      valeur: "justificatif de versement des prestations sociales et allocations des 3 derniers mois, ou de l'ouverture des droits",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "prestations sociales et familiales et allocations perçues lors des 3 derniers mois ou justificatif de l'ouverture des droits",
    },
    {
      fait: "Le choix du locataire se fonde sur des critères objectifs comme la situation financière",
      valeur: "critères objectifs, par exemple la situation financière du candidat",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      titreSource: "Service-public.gouv.fr · Discrimination à la location d'un logement",
      releveLe: "2026-11-04",
      citation: "doit se fonder sur des critères objectifs (par exemple, la situation financière du candidat)",
    },
    {
      fait: "Critère de discrimination interdit : la vulnérabilité liée à la situation économique",
      valeur: "vulnérabilité particulière liée à la situation économique",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19448",
      titreSource: "Service-public.gouv.fr · Discrimination",
      releveLe: "2026-11-04",
      citation: "Vulnérabilité particulière liée à la situation économique",
    },
    {
      fait: "Décision 2017-056 du Défenseur des droits : refus de louer à deux candidats percevant l'AAH",
      valeur: "refus fondé sur le fait que les candidats perçoivent l'AAH",
      source: "https://juridique.defenseurdesdroits.fr/index.php?lvl=notice_display&id=22000",
      titreSource: "Défenseur des droits · Décision 2017-056 du 2 mars 2017",
      releveLe: "2026-11-04",
      citation: "refus de location opposé au réclamant et à son partenaire de vie fondé sur le fait qu'ils perçoivent tout deux l'allocation adulte handicapé",
    },
    {
      fait: "Décision 2017-056 : discrimination retenue au titre du handicap",
      valeur: "double discrimination fondée sur le handicap",
      source: "https://juridique.defenseurdesdroits.fr/index.php?lvl=notice_display&id=22000",
      titreSource: "Défenseur des droits · Décision 2017-056 du 2 mars 2017",
      releveLe: "2026-11-04",
      citation: "Le Défenseur des droits conclut à une double discrimination fondée sur le handicap dans l'accès à un logement",
    },
    {
      fait: "Décision 2017-056 : une assurance qui ne retenait l'AAH qu'en partie",
      valeur: "AAH prise en compte à hauteur de 30%",
      source: "https://juridique.defenseurdesdroits.fr/index.php?lvl=notice_display&id=22000",
      titreSource: "Défenseur des droits · Décision 2017-056 du 2 mars 2017",
      releveLe: "2026-11-04",
      citation: "sont pris en compte partiellement (soit à hauteur de 30%) et en fonction de leur pérennité",
    },
    {
      fait: "Visale, moins de 30 ans : le RSA compte parmi les ressources prises en compte",
      valeur: "RSA compté dans les ressources",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "Revenus professionnels Allocations chômage Indemnités journalières RSA",
    },
    {
      fait: "Un propriétaire particulier assuré contre les risques locatifs ne peut demander de caution qu'à un étudiant ou un apprenti",
      valeur: "caution seulement si le locataire est étudiant ou apprenti",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire",
      releveLe: "2026-11-04",
      citation: "peut demander une caution seulement si son locataire est étudiant ou apprenti",
    },
  ],
  corps: `
## Peut-on louer un appartement avec le RSA ou l'AAH ? {#possible}
Oui. Ces prestations sont des ressources, et la liste officielle des justificatifs prévoit la pièce qui les prouve. Le propriétaire choisit son locataire sur des critères objectifs, par exemple la situation financière du candidat : il peut comparer vos ressources au loyer, comme pour tout dossier. Ce qu'il ne peut pas faire, c'est vous écarter pour une raison que la loi interdit.

La liste complète de ces raisons, et la façon de prouver un refus qui en relève, sont dans le guide sur le [refus de dossier](/guides/refus-de-dossier).

## Quelle pièce prouve le RSA ou l'AAH ? {#piece}
Le justificatif de versement des prestations sociales et familiales et allocations perçues lors des trois derniers mois, ou le justificatif de l'ouverture des droits, établi par l'organisme payeur. C'est la ligne de la liste prévue pour vous ; le propriétaire peut la demander, avec votre avis d'imposition, mais pas un relevé de compte.

Si vos droits viennent d'être ouverts, le justificatif d'ouverture tient lieu des trois mois que vous n'avez pas encore. Les autres pièces du dossier sont dans le guide du [dossier de location](/guides/dossier-de-location).

## Un propriétaire peut-il refuser un candidat parce qu'il touche le RSA ? {#rsa}
Pas pour cette raison seule. La vulnérabilité particulière liée à la situation économique fait partie des critères de discrimination interdits. Le propriétaire reste libre d'écarter un dossier dont les ressources couvrent mal le loyer, mais un refus motivé par le fait même de toucher le RSA, quel que soit le montant de vos ressources, peut relever de ce critère.

Nous n'avons pas lu de décision du Défenseur des droits portant sur le RSA. Si un refus vous est expliqué par écrit, gardez le message : c'est lui qui permet de montrer le motif.

## Et parce qu'il touche l'AAH ? {#aah}
Non, et le Défenseur des droits l'a jugé. Dans sa décision 2017-056, une agence avait refusé d'étudier la candidature de deux personnes parce qu'elles percevaient l'allocation aux adultes handicapés. Il a conclu à une discrimination fondée sur le handicap, dans l'accès au logement comme dans l'accès à l'assurance qui garantissait les loyers.

L'assurance en cause ne retenait l'AAH qu'à hauteur de 30%. Le Défenseur des droits a relevé que ni l'assureur ni le courtier n'expliquaient pourquoi cette prise en compte partielle était nécessaire. Si une agence vous oppose « l'assurance n'accepte pas l'AAH », cette décision est la référence à citer.

## Quelles garanties sont possibles ? {#garanties}
Avant 30 ans, la garantie Visale compte le RSA parmi les ressources prises en compte pour calculer le loyer maximum, sous conditions. À partir de 31 ans, elle vise les salariés et les travailleurs saisonniers. Restent le garant physique et le propriétaire déjà assuré, qui ne peut alors demander de caution qu'à un étudiant ou un apprenti.

Le détail est dans le guide de la [garantie Visale](/guides/garantie-visale), et la [checklist de dossier](/outils/dossier-de-location) donne vos pièces selon votre situation.
`,
});
