# Vague 8 : verdicts de relecture (relecteur distinct des auteurs, 2026-11-04)

Méthode : `docs/seo/blog/METHODE-SERIE.md`, sections « Pièges connus » et « La relecture ».
- `npm run blog:sources` repassé : 220 citations dans les 22 articles, **220 retrouvées**. Les
  16 échecs du script viennent tous d'articles déjà publiés (Légifrance et visale.fr en 403), aucun
  de cette vague.
- Titres, chapeaux et intertitres : les 22.
- Relecture complète d'un article sur trois, par numéro du plan : n° 1, 4, 7, 10, 13, 16, 19, 22.
  Aucun n'est tombé. En plus, pour juger le bloc C : n° 18 et 20 en entier.
- Lecture ciblée contre la source, sur un point de droit vu au chapeau : n° 6 (amende pour refus
  d'un bail écrit, ANIL), n° 8 (plafond des espèces), n° 12 (loyer dû par l'époux qui part, F1159),
  n° 16 et 10 (Visale à partir de 31 ans, F33453 : ne liste bien que le saisonnier et le salarié du
  privé), n° 18 (nullité du cautionnement en colocation, ANIL), n° 19 (délai de 2 mois avant la
  commission, F31699), n° 22 (réduction d'indemnité de l'assureur, F19950). Tous conformes.
- Corrections exactes appliquées par moi dans cinq articles du bloc C (liste ci-dessous), puis
  `npm run blog:verifier` au vert (968 tests, 0 échec). Statuts inchangés, rien de commité.

## Verdicts

plusieurs-candidatures-location-en-meme-temps · PUBLIABLE
engagement-de-location-avant-bail · PUBLIABLE
proprietaire-annule-bail-apres-signature · PUBLIABLE
louer-particulier-ou-agence · PUBLIABLE
sous-location-legale-sous-locataire · PUBLIABLE
location-sans-bail-ecrit · PUBLIABLE
clauses-abusives-bail-location · PUBLIABLE
payer-loyer-en-especes · PUBLIABLE
louer-en-arret-maladie · PUBLIABLE
louer-appartement-retraite · PUBLIABLE
louer-avec-recepisse-titre-de-sejour · PUBLIABLE
louer-pendant-separation-divorce · PUBLIABLE
louer-avec-epargne-peu-de-revenus · PUBLIABLE
louer-intermittent-du-spectacle · PUBLIABLE
anciens-impayes-loyer-fichier-locataires · PUBLIABLE
garant-location-fonctionnaire · PUBLIABLE
caution-bancaire-location · PUBLIABLE (corrigé : chapeau « la fiche de Service-public la cite parmi les personnes morales admises […] pas obligatoire partout » → « Service-public cite la banque parmi les personnes morales qui peuvent se porter caution d'un locataire […] n'est pas systématique » ; corps : « selon un cabinet d'avocats qui a détaillé le sujet en octobre 2026 » supprimé (le fait garde sa source) ; « Aucune fiche officielle lue ne fixe de tarif » → « Aucun tarif officiel n'existe »)
etre-garant-de-plusieurs-locataires · PUBLIABLE (corrigé : chapeau « rien dans les fiches de Service-public et de l'ANIL ne limite » → « ni Service-public ni l'ANIL ne fixent de nombre maximal », et dernière phrase précédée de « Et ne comptez pas sur la règle de proportionnalité » pour coller au corps ; corps : « aucune des fiches officielles lues » et « Aucune décision lue » reformulés ; « ce qui ne vous dispense pas de lire l'acte avec soin » supprimé)
travaux-promis-visite-non-realises · PUBLIABLE
logement-sale-entree-dans-les-lieux · PUBLIABLE (corrigé : chapeau et première réponse « Les fiches officielles lues ne disent pas / ne parlent pas » → « Aucune règle ne nomme le ménage : le propriétaire doit remettre un logement en bon état d'usage » ; intertitre « Le ménage fait à l'entrée peut-il vous être reproché » → « La saleté trouvée à l'entrée peut-elle vous être reprochée », ancre inchangée)
logement-decent-criteres-visite · PUBLIABLE (corrigé : « Les pages officielles lues parlent de décence […] pas de « vices cachés ». Dans les deux cas » → « Qu'on parle de logement non décent ou de « vice caché » »)
detecteur-de-fumee-location · PUBLIABLE (corrigé : « La fiche officielle est claire sur l'installation. » supprimé ; espace en fin de ligne retirée)

Bilan : **22 PUBLIABLE**, 0 À CORRIGER, 0 REFUSÉ.

## Bloc C (n° 17 à 22, modèle moins cher)

Exact sur le droit, aussi bien sourcé que A et B, mais d'une voix plus faible : le rédacteur parle
de sa recherche (« les fiches officielles lues »), attribue chaque phrase à Service-public, et laisse
des phrases de remplissage. Quatre articles sur six ont demandé une retouche de forme ; A et B, aucune.

## Défauts récurrents (à transformer en règle)

1. **Le rédacteur raconte sa recherche** : « fiches officielles lues », « pages officielles lues »,
   « aucune décision lue » (n° 17, 18, 20, 21). Le lecteur n'a pas lu ces fiches ; il veut la
   règle. Règle proposée : `\b(fiches?|pages?|sources?) (officielles? )?lues?\b` interdit dans le
   corps et le chapeau. **Ne pas y inclure « décision lue »** : deux articles publiés l'emploient
   (`louer-avec-rsa-aah`, `proprietaire-refuse-apl`), et la méthode elle-même l'enseigne ; tester
   d'abord sur les articles publiés.
2. **Une source non officielle nommée dans le texte** (« un cabinet d'avocats », n° 17). Le plan
   réserve les faits à Légifrance, service-public, l'ANIL, la CNIL et visale.fr. Règle proposée :
   un fait dont la source n'est pas sur ces domaines lève un avertissement au vérificateur.

## À savoir pour le chef

- `payer-loyer-en-especes` suit la fiche loyer F1214 (« inférieur à 1 000 € ») ; la fiche F10999
  dit qu'il n'y a pas de plafond entre particuliers. L'article cite les deux sans se contredire,
  mais si un lecteur conteste, la fiche loyer est la référence retenue.
- Aucun piège Visale dans le lot : partout « 30 ans ou moins » et « à partir de 31 ans ». Aucune
  décision de justice citée pour l'arrêt maladie, l'âge, le récépissé ou la séparation.
- Pas de cannibalisation vue : chaque article renvoie aux pages voisines nommées dans le plan.
- Rien n'est commité.
