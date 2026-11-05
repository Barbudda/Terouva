// Vague 9, ligne 16. Requête relevée à l'autocomplétion et sur forum : « propriétaire garde double des clés ».
// Apport : le double est permis, l'entrée ne l'est pas ; la serrure se change et se remet au départ ; et la peine
// annoncée ne vaut que dans les conditions de l'article 226-4, que les réponses habituelles ne rappellent pas.

import { article } from "@/lib/blog-format";

const F12244 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F12244";
const T12244 = "Service-public.gouv.fr · Un propriétaire peut-il garder un double des clés du logement de son locataire ?";
const F1874 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1874";
const T1874 = "Service-public.gouv.fr · Utilisation du logement et travaux par le locataire";

export default article({
  slug: "proprietaire-double-des-cles",
  titre: "Le propriétaire peut-il garder un double de vos clés ?",
  titreSeo: "Double des clés : ce que peut le propriétaire",
  description:
    "Il peut garder un double, mais pas entrer sans votre accord, même en urgence. Vous pouvez changer la serrure, à remettre en état en partant.",
  chapeau:
    "Oui, le propriétaire peut conserver un double des clés, mais il ne peut pas entrer chez vous sans votre accord, même pour un dégât des eaux. Vous pouvez changer la serrure ou le barillet pendant le bail, à condition de remettre la porte dans son état initial en partant. Après une intrusion, écrivez-lui et gardez des preuves.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: [],
  statut: "publie",
  requete: "propriétaire garde double des clés",
  faits: [
    {
      fait: "Le propriétaire peut garder un double",
      valeur: "le propriétaire peut conserver un double des clés",
      source: F12244,
      titreSource: T12244,
      releveLe: "2026-11-05",
      citation: "Oui, le propriétaire peut conserver un double des clés du logement qu'il a mis en location.",
    },
    {
      fait: "Pas d'entrée sans accord",
      valeur: "pas le droit d'entrer sans l'accord du locataire",
      source: F12244,
      titreSource: T12244,
      releveLe: "2026-11-05",
      citation: "Mais il n'a pas le droit d'entrer dans le logement sans l'accord du locataire.",
    },
    {
      fait: "L'accord reste nécessaire en cas d'urgence",
      valeur: "autorisation du locataire même pour un dégât des eaux",
      source: F12244,
      titreSource: T12244,
      releveLe: "2026-11-05",
      citation:
        "Même en cas d'urgence (par exemple, un dégât des eaux), le propriétaire doit avoir l'autorisation du locataire, avant d'entrer dans le logement.",
    },
    {
      fait: "Le logement loué est le domicile du locataire",
      valeur: "le logement loué est le domicile du locataire",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation: "Le logement loué est le domicile du locataire. En conséquence, il en a la jouissance exclusive",
    },
    {
      fait: "Pas de visite imposée hors cadre légal",
      valeur: "interdit d'imposer un droit de visite en dehors de tout cadre légal",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation: "Imposer un droit de visite à son locataire en dehors de tout cadre légal",
    },
    {
      fait: "Accès pour les travaux à la charge du propriétaire",
      valeur: "le locataire doit permettre l'accès pour ces travaux",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation:
        "Le locataire doit permettre l'accès à son logement pour la préparation et la réalisation des travaux à la charge du propriétaire.",
    },
    {
      fait: "Pas d'accès obligatoire certains jours",
      valeur: "ni samedi, ni dimanche, ni jour férié",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation: "Mais il n'est pas obligé d'en permettre l'accès les samedis, les dimanches et les jours fériés.",
    },
    {
      fait: "Changer la serrure pendant le bail",
      valeur: "serrure ou barillet, pendant toute la période du bail",
      source: F12244,
      titreSource: T12244,
      releveLe: "2026-11-05",
      citation:
        "Rien n'interdit au locataire de changer la serrure ou le barillet de la porte pendant toute la période du bail",
    },
    {
      fait: "Remettre la porte en état au départ",
      valeur: "porte remise à son état initial au départ définitif",
      source: F12244,
      titreSource: T12244,
      releveLe: "2026-11-05",
      citation: "à la condition de remettre la porte à son état initial lorsqu'il quitte définitivement le logement",
    },
    {
      fait: "Clé perdue à la charge du locataire",
      valeur: "le locataire fait refaire une clé perdue ou abîmée",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31697",
      titreSource: "Service-public.gouv.fr · Entretien courant et réparations locatives à la charge du locataire",
      releveLe: "2026-11-05",
      citation: "remplacer les petites pièces et faire refaire une clé perdue ou abîmée",
    },
    {
      fait: "Les clés figurent à l'état des lieux d'entrée",
      valeur: "clés et moyens d'accès mentionnés à l'état des lieux",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270",
      titreSource: "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation",
      releveLe: "2026-11-05",
      citation: "Clés ou tout autre moyen d'accès aux locaux à usage privatif ou commun",
    },
    {
      fait: "Plainte possible pour violation de domicile",
      valeur: "plainte pour violation de domicile",
      source: F12244,
      titreSource: T12244,
      releveLe: "2026-11-05",
      citation: "le locataire peut porter plainte pour violation de domicile",
    },
    {
      fait: "Peine maximale annoncée",
      valeur: "jusqu'à 3 ans de prison et 45 000 € d'amende",
      source: F12244,
      titreSource: T12244,
      releveLe: "2026-11-05",
      citation:
        "Le propriétaire peut être condamné à une peine allant jusqu'à 3 ans de prison et à une amende pouvant atteindre 45 000 €",
    },
    {
      fait: "Ce que vise l'article 226-4 du Code pénal, en vigueur depuis le 29 juillet 2023",
      valeur: "introduction à l'aide de manoeuvres, menaces, voies de fait ou contrainte, hors les cas où la loi le permet",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000030776820/",
      titreSource: "Légifrance · Code pénal, article 226-4",
      releveLe: "2026-11-06",
      citation:
        "L'introduction dans le domicile d'autrui à l'aide de manoeuvres, menaces, voies de fait ou contrainte, hors les cas où la loi le permet",
    },
    {
      fait: "Conseil gratuit de l'ADIL",
      valeur: "conseils neutres, gratuits et personnalisés",
      source: "https://www.anil.org/parole-expert-logement-locataire-qui-paie-les-reparations/",
      titreSource: "ANIL · Locataire ou propriétaire : qui paie les réparations dans une location ?",
      releveLe: "2026-11-05",
      citation: "L'ANIL et son réseau d'ADIL vous accompagnent avec des conseils neutres, gratuits et personnalisés",
    },
  ],
  corps: `
## Le propriétaire a-t-il le droit de garder un double de vos clés ? {#double}
Oui. Le propriétaire peut conserver un double des clés du logement qu'il met en location. Ce double ne lui donne pourtant aucun droit d'entrer : le logement loué est votre domicile, et il vous en revient la jouissance exclusive.

Les clés qu'on vous remet figurent à l'[état des lieux d'entrée](/guides/etat-des-lieux). Le jour de la remise, comptez-les et demandez simplement si un jeu reste chez le propriétaire ou à l'agence : vous saurez à quoi vous en tenir dès le premier jour.

## Le propriétaire peut-il entrer chez vous sans votre accord ? {#entrer}
Non, même en cas d'urgence. Pour un dégât des eaux par exemple, service-public précise qu'il doit obtenir votre autorisation avant d'entrer. Il ne peut pas non plus vous imposer une visite en dehors de tout cadre légal. Le double reste donc une clé de secours, qu'il n'utilise que si vous êtes d'accord.

Le cadre légal existe pour les travaux à la charge du propriétaire : vous devez permettre l'accès pour les préparer et les réaliser, sauf les samedis, les dimanches et les jours fériés. Il doit vous prévenir avant le début du chantier. Organisez cet accès avec lui : vous ouvrez vous-même, ou vous lui dites par écrit qu'il peut utiliser son double tel jour.

Si vous partez longtemps, donnez votre numéro au propriétaire, ou confiez un double à une personne de votre choix. En cas de fuite, il pourra vous joindre et obtenir votre accord rapidement.

## Pouvez-vous changer la serrure du logement ? {#serrure}
Oui. Rien n'interdit au locataire de changer la serrure ou le barillet pendant toute la période du bail. La seule condition est de remettre la porte dans son état initial le jour où vous quittez définitivement le logement. Gardez donc l'ancien barillet et ses clés, pour pouvoir le remonter en partant.

Aucune règle ne nomme une obligation de donner au propriétaire une clé de la nouvelle serrure. Prévenez-le tout de même : il évitera de se présenter avec une clé qui ne tourne plus, et vous aurez une trace écrite de votre choix.

Ce changement reste à vos frais, comme une clé perdue ou abîmée, que le locataire fait refaire lui-même.

## Que faire si le propriétaire est entré sans votre accord ? {#intrusion}
Notez aussitôt la date, l'heure et ce que vous avez constaté, puis écrivez-lui pour rappeler qu'il doit obtenir votre accord avant d'entrer. Gardez ses messages, vos photos et le nom de tout témoin. Si l'entrée vous paraît grave ou se répète, vous pouvez porter plainte pour violation de domicile.

Service-public annonce une peine allant jusqu'à 3 ans de prison et 45 000 € d'amende. Elle ne s'applique pas à toute entrée : l'article 226-4 du Code pénal vise l'introduction dans le domicile d'autrui à l'aide de manœuvres, de menaces, de voies de fait ou de contrainte, hors les cas où la loi le permet. C'est au juge de dire si une entrée avec un double en relève.

Avant de déposer plainte, l'ADIL de votre département peut regarder votre situation avec vous, gratuitement. Et si vous ne voulez plus que ce double ouvre votre porte, changer le barillet reste possible à tout moment du bail.
`,
});
