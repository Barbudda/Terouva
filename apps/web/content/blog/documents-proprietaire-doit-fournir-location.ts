// Vague 9, ligne 9. Requête relevée à l'autocomplétion. Apport : la liste à réclamer à la signature, la
// validité de chaque diagnostic réunie au même endroit, et ce que prévoit chaque source si une pièce manque.
// La notice et le modèle de bail ont changé à l'automne 2026 : on renvoie à la version en vigueur, sans date
// de notice, l'arrêté n'ayant pas pu être lu sur Légifrance (vérification anti-robots).

import { article } from "@/lib/blog-format";

const F2066 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2066";
const T2066 = "Service-public.gouv.fr · Bail d'habitation : documents remis par le propriétaire (bailleur)";
const F33463 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33463";
const T33463 = "Service-public.gouv.fr · Quels sont les diagnostics immobiliers qu'un bailleur doit fournir au locataire ?";
const ANIL = "https://www.anil.org/votre-besoin/gerer-un-bien/bailleur/diagnostics/";
const TANIL = "ANIL · Diagnostic technique pour louer";
const ECO = "https://www.ecologie.gouv.fr/politiques-publiques/diagnostics-techniques-immobiliers";
const TECO = "Ministère chargé de l'environnement · Diagnostics techniques immobiliers";
const ANILEDL = "https://anil.org/parole-expert-logement-location-etat-lieux-entree";
const TANILEDL = "ANIL · Qu'est-ce que l'état des lieux d'entrée ?";

export default article({
  slug: "documents-proprietaire-doit-fournir-location",
  titre: "Les documents que le propriétaire doit vous remettre à la signature",
  titreSeo: "Documents que le propriétaire doit vous remettre",
  description:
    "Bail, notice, diagnostics, extrait de copropriété : la liste à réclamer, la validité de chaque diagnostic et que faire s'il manque une pièce.",
  chapeau:
    "À la signature, le propriétaire doit vous remettre le bail écrit et ses annexes : notice d'information, dossier de diagnostics et, en copropriété, un extrait du règlement. L'état des lieux s'y ajoute à la remise des clés. Si une pièce manque, réclamez-la par écrit, avant de signer si vous le pouvez, et gardez la trace de votre demande.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/etat-des-lieux", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "location appartement documents à fournir par le propriétaire",
  faits: [
    {
      fait: "Le bail est écrit, en autant d'exemplaires que de parties",
      valeur: "bail écrit, un exemplaire par partie",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "Le bail doit être fait par écrit en autant d'exemplaires qu'il y a de parties",
    },
    {
      fait: "Le bail suit le modèle en vigueur à la signature",
      valeur: "modèle réglementaire en vigueur à la date de signature",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "Il doit être conforme au modèle de bail réglementaire en vigueur à la date de signature du bail.",
    },
    {
      fait: "Nouveau modèle de bail pour un logement vide",
      valeur: "depuis le 1er octobre 2026",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "Modèle de bail : logement vide (depuis le 1er octobre 2026)",
    },
    {
      fait: "Annexes à la signature",
      valeur: "documents annexés à la signature et au renouvellement",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "Lors de la signature du bail ou du renouvellement de bail , le propriétaire (ou l'agent immobilier) doit annexer au bail les documents suivants",
    },
    {
      fait: "Extrait du règlement de copropriété",
      valeur: "destination de l'immeuble, jouissance des parties privatives et communes, quote-part",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "Si le logement est dans un immeuble en copropriété, un extrait du règlement de copropriété .",
    },
    {
      fait: "Inventaire du mobilier en meublé",
      valeur: "inventaire et état détaillé signés et annexés au bail",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "Ces documents doivent être signés par le propriétaire (ou l'agent immobilier) et par le locataire, et être annexés au bail.",
    },
    {
      fait: "Dossier de diagnostics annexé et envoyé par voie électronique",
      valeur: "transmission dématérialisée sauf opposition",
      source: F33463,
      titreSource: T33463,
      releveLe: "2026-11-05",
      citation: "Il est transmis par voie dématérialisée (courrier électronique par exemple) sauf si le bailleur ou le futur locataire s'y oppose.",
    },
    {
      fait: "Validité du DPE",
      valeur: "10 ans",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Il doit être réalisé par un professionnel et est valable 10 ans .",
    },
    {
      fait: "DPE non exigé dans certains cas",
      valeur: "logement occupé moins de 4 mois par an, monument historique",
      source: F33463,
      titreSource: T33463,
      releveLe: "2026-11-05",
      citation: "Ce diagnostic n'est toutefois pas exigé si le logement est destiné à être occupé moins de 4 mois par an",
    },
    {
      fait: "DPE non exigé pour une petite maison indépendante",
      valeur: "maison indépendante de moins de 50 m² de surface de plancher",
      source: F33463,
      titreSource: T33463,
      releveLe: "2026-11-05",
      citation: "s'il s'agit d'une maison indépendante (individuelle) avec une surface de plancher",
    },
    {
      fait: "Plomb : logements d'avant 1949",
      valeur: "avant le 1er janvier 1949",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Ce document ne concerne que les logements dont le permis de construire a été délivré avant le 1er janvier 1949 .",
    },
    {
      fait: "Plomb : validité du constat",
      valeur: "définitif sans plomb, moins de six ans sinon",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "le constat de risque d'exposition au plomb doit dater de moins de six ans lors de la signature du bail.",
    },
    {
      fait: "Électricité et gaz : quand et combien de temps",
      valeur: "installation de plus de 15 ans, valables six ans",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Ces diagnostics sont valables six ans. Ce document peut être remplacé par une attestation de mise en conformité de l'installation datant de moins de six ans.",
    },
    {
      fait: "État des risques : date",
      valeur: "moins de six mois à la signature",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Ce diagnostic doit être daté de moins de six mois lors de la signature du bail.",
    },
    {
      fait: "Diagnostic bruit",
      valeur: "zone d'exposition au bruit des aéroports",
      source: F33463,
      titreSource: T33463,
      releveLe: "2026-11-05",
      citation: "Diagnostic bruit si le logement est situé dans une zone d'exposition au bruit des aéroports.",
    },
    {
      fait: "Amiante : sur demande",
      valeur: "à disposition du locataire, sans annexe au bail",
      source: F33463,
      titreSource: T33463,
      releveLe: "2026-11-05",
      citation: "Le bailleur doit simplement le tenir à la disposition du locataire, sur demande.",
    },
    {
      fait: "Sanction du refus de bail conforme",
      valeur: "jusqu'à 1 an de prison et 20 000 € d'amende ; personne morale jusqu'à 100 000 €",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "qui refuse de rédiger un bail conforme à la réglementation et de délivrer une quittance ou un reçu sur demande du locataire",
    },
    {
      fait: "Montant de la sanction pour une personne physique",
      valeur: "1 an de prison et 20 000 € d'amende",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "S'il s'agit d'une personne physique, jusqu'à 1 an de prison et 20 000 € d'amende.",
    },
    {
      fait: "Montant de la sanction pour une personne morale",
      valeur: "100 000 € d'amende",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "S'il s'agit d'une personne morale, jusqu'à 100 000 € d'amende.",
    },
    {
      fait: "État des risques non transmis",
      valeur: "résolution du contrat, ou tribunal judiciaire pour des dommages-intérêts",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Si le bailleur ne le transmet pas au locataire, ce dernier peut saisir le tribunal judiciaire pour demander des dommages-intérêts.",
    },
    {
      fait: "État des risques : résolution du contrat",
      valeur: "le locataire peut poursuivre la résolution du contrat",
      source: ECO,
      titreSource: TECO,
      releveLe: "2026-11-05",
      citation: "En cas de non-respect de ces obligations, le locataire peut poursuivre la résolution du contrat.",
    },
    {
      fait: "Plomb : constat non fourni",
      valeur: "saisine du tribunal judiciaire si du plomb est découvert",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Si le bailleur ne fournit pas le diagnostic et que le locataire découvre la présence de plomb dans son logement, il peut saisir le tribunal judiciaire.",
    },
    {
      fait: "Informations énergétiques dissimulées ou fausses",
      valeur: "annulation du contrat ou diminution du loyer",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "il peut demander l'annulation du contrat ou une diminution du loyer.",
    },
    {
      fait: "Conseil de l'ADIL",
      valeur: "accompagnement gratuit",
      source: ANILEDL,
      titreSource: TANILEDL,
      releveLe: "2026-11-05",
      citation: "Nos conseillers locaux vous apporteront un accompagnement personnalisé et gratuit sur toutes vos questions liées au logement.",
    },
    {
      fait: "Clause faisant payer la quittance",
      valeur: "clause considérée comme non écrite",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "cette clause doit être considérée comme non écrite, car elle est interdite.",
    },
    {
      fait: "Quittance gratuite sur demande",
      valeur: "transmise gratuitement",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "doit transmettre gratuitement au locataire une quittance.",
    },
  ],
  corps: `
## Quels documents le propriétaire doit-il vous remettre à la signature ? {#liste}
Le bail écrit, établi en autant d'exemplaires que de parties, avec ses annexes : la notice d'information, le dossier de diagnostics et, en copropriété, un extrait du règlement. L'état des lieux d'entrée, fait à la remise des clés, s'y ajoute ensuite. Votre propre attestation d'assurance figure aussi parmi les annexes.

Voici ce que Service-public impose, à cocher au moment de signer :

- **Le bail**, conforme au modèle réglementaire en vigueur à la date de signature. Un nouveau modèle s'applique depuis le 1er octobre 2026 : l'article sur le [nouveau modèle de bail](/blog/nouveau-modele-de-bail-verifier-avant-de-signer) dit quoi y vérifier.
- **La notice d'information**, qui résume les droits et les obligations de chacun.
- **Le dossier de diagnostics**, détaillé plus bas.
- **Les équipements d'accès** à la télévision et à internet, comme la fibre.
- **L'extrait du règlement de copropriété**, si l'immeuble est en copropriété : destination de l'immeuble, usage des parties privatives et communes, quote-part de charges du logement.
- **L'[état des lieux d'entrée](/guides/etat-des-lieux)**, fait à la remise des clés.

Selon votre cas, d'autres pièces s'ajoutent : l'inventaire et l'état détaillé du mobilier en meublé, signés et annexés au bail ; l'acte de cautionnement si un garant a été exigé ; la grille de vétusté si vous en avez convenu ; la convention Anah si le logement est conventionné ; l'autorisation ou le récépissé de la mairie dans une zone d'habitat dégradé ou indigne.

## Quels diagnostics devez-vous recevoir, et combien de temps sont-ils valables ? {#diagnostics}
Les diagnostics obligatoires dépendent du logement : le DPE presque toujours, le plomb avant 1949, l'électricité et le gaz si l'installation a plus de 15 ans, les risques et le bruit selon la zone. Ils forment un dossier annexé au bail, qui peut vous être envoyé par courriel, sauf si vous ou le bailleur vous y opposez.

- **DPE** : valable 10 ans. Il n'est pas exigé pour un logement occupé moins de 4 mois par an, ni pour un monument historique classé ou inscrit, ni pour une maison indépendante de moins de 50 m² de surface de plancher. L'article sur le [DPE recalculé](/blog/dpe-recalcule-lire-l-etiquette-d-une-annonce) aide à lire l'étiquette.
- **Plomb (Crep)** : pour un permis de construire délivré avant le 1er janvier 1949. Le constat est définitif si aucune trace n'est trouvée. S'il y a du plomb, il doit dater de moins de six ans à la signature.
- **Électricité et gaz** : si l'installation a plus de 15 ans. Valables six ans, ces états peuvent être remplacés par une attestation de mise en conformité de moins de six ans.
- **État des risques** : si le logement est dans une zone concernée. Il doit dater de moins de six mois à la signature.
- **Bruit** : si le logement est dans une zone d'exposition au bruit des aéroports.
- **Amiante** : il n'a pas à être annexé au bail, mais le bailleur doit vous le montrer si vous le demandez.

## Que faire s'il manque un document ? {#manque}
Demandez-le par écrit en nommant la pièce, avant de signer si vous le pouvez, et gardez la trace de l'envoi. Un courriel suffit pour commencer. Si le propriétaire refuse, la suite dépend de la pièce manquante, et l'ADIL de votre département vous conseille gratuitement sur la marche à suivre.

Ce que prévoient les sources officielles, pièce par pièce :

- **Bail** : un propriétaire ou une agence qui refuse de rédiger un bail conforme risque jusqu'à 1 an de prison et 20 000 € d'amende, et jusqu'à 100 000 € pour une personne morale.
- **État des risques** : l'ANIL indique que vous pouvez saisir le tribunal judiciaire pour demander des dommages-intérêts. Le ministère chargé de l'environnement mentionne la résolution du contrat.
- **Plomb** : si le constat n'a pas été fourni et que vous découvrez du plomb, vous pouvez saisir le tribunal judiciaire.
- **Performance énergétique** : si vous prouvez que le bailleur a dissimulé des informations ou donné de fausses informations, vous pouvez demander l'annulation du contrat ou une diminution du loyer.

Ces recours passent par un juge. Un message court et daté reste donc le premier geste : *« Bonjour, pourriez-vous me transmettre le constat de plomb et l'état des risques, qui doivent être annexés au bail ? Je vous remercie de me les envoyer avant la signature. »*

## Peut-on signer avant d'avoir tout reçu ? {#signer}
Mieux vaut l'éviter : une fois le bail signé, vous avez moins de poids pour obtenir une pièce manquante. Si le propriétaire presse, demandez les annexes par courriel avant le rendez-vous. Lisez-les au calme, car un dossier complet reçu la veille se vérifie mieux qu'une pile de feuilles découverte sur un coin de table.

L'article sur la [signature le jour de la visite](/blog/signer-bail-jour-de-la-visite) dit comment gagner ce temps sans perdre le logement. En amont, le [guide pour répondre à une annonce](/guides/repondre-a-une-annonce-de-location) aide à poser les bonnes questions dès le premier message.

## Quels documents recevrez-vous ensuite, pendant le bail ? {#ensuite}
La quittance de loyer, gratuite, quand vous la demandez, et les justificatifs de charges. Le propriétaire ne peut pas vous faire payer la quittance : une clause du bail qui le prévoit doit être considérée comme non écrite. Si vous ne payez qu'une partie du loyer, il vous remet un reçu de la somme versée.

Le détail des charges et ce qui vous revient, comme la taxe d'ordures, est dans l'article sur [ce que paie un locataire en plus du loyer](/blog/taxe-ordures-menageres-locataire).
`,
});
