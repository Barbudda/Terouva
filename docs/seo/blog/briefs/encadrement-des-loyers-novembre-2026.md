# Brief 1 — Encadrement des loyers après le 23 novembre 2026

> Rédacteur en chef : `blog-redacteur-en-chef`, 2026-11-04. Rédaction : `seo-redacteur`. Relecture :
> `blog-relecteur`. Suivi du texte : `blog-veille-juridique`. Urgence : **publication au plus tard le
> vendredi 2026-11-13**, mises à jour le jour du vote et le jour du terme.

## Fiche

| Champ | Valeur |
|---|---|
| Adresse | `/blog/encadrement-des-loyers-apres-novembre-2026` (ne change pas après le vote) |
| Format | actualité datée, avec mises à jour visibles |
| Pilier | D. Le bail et le loyer (angle candidat : « avant de répondre à une annonce ») |
| Requête-mère | « encadrement des loyers » + « fin », « prolongation », « novembre 2026 » : requête d'actualité, **absente du registre** (aucune mesure de volume ; l'autocomplétion du registre ne relève que « encadrement des loyers + ville » et « simulateur ») |
| Variantes à couvrir | encadrement des loyers prolongé ; encadrement des loyers 2028 ; fin de l'encadrement des loyers ; encadrement des loyers Paris, Lyon, Bordeaux, Montpellier, Lille, Pays basque (en une ligne chacune, pas une section par ville) |
| Intention | information, actualité |
| Ne pas cannibaliser | les futures pages « encadrement des loyers + ville » et l'outil « le loyer de cette annonce est-il dans les plafonds ? » (registre, P3) : l'article ne détaille pas les plafonds ville par ville, il renvoie vers les simulateurs officiels |
| Guide à mettre à jour dans le même lot | `/guides/preavis-location`, section « La zone tendue » : une phrase qui distingue la zone tendue (préavis) de l'encadrement du niveau des loyers, et lien vers l'article. Par `seo-fraicheur` |
| Longueur | 900 à 1 200 mots. Les pages en tête (presse, portails, LocService, Banque des territoires) font le récit parlementaire ; on gagne par la clarté et par l'angle candidat, pas par la longueur |

## L'angle : ce que les premiers résultats ne disent pas

Recherche web du 2026-11-04 (pas une lecture de SERP google.fr) : SeLoger, Selectra, LocService,
ImmoJeune, Banque des territoires, Public Sénat, LCP racontent le vote du Sénat et l'échéance. Aucun
ne répond à la question du candidat qui visite cette semaine :

1. **Deux dispositifs que tout le monde confond.** L'encadrement du **niveau** des loyers (plafond à
   la signature, dans une liste de territoires, expérimental, terme en novembre 2026) et
   l'encadrement de l'**évolution** des loyers en zone tendue (hausse limitée entre deux locataires,
   reconduit par décret du 1er août 2026 au 31 juillet 2027). Le second continue quelle que soit
   l'issue du vote. C'est le fait le plus utile de l'article, et le plus absent des pages lues.
2. **Ce que ça change pour un bail signé avant, pendant ou après le terme** : à établir à la source,
   pas à déduire (voir « Faits à sourcer », n° 7).
3. **Comment vérifier le loyer d'une annonce** dans une ville encadrée, avant d'y répondre.

## Les issues possibles et ce que l'article dit dans chaque cas

État au 2026-11-04 (`VEILLE.md`) : le Sénat a adopté le 2026-10-21, en première lecture, la
proposition de loi Echaniz modifiée (prolongation de deux ans à périmètre constant, sortie possible
pour les collectivités, délai porté à un an pour contester un complément de loyer). Le texte est à
l'Assemblée nationale, **pas adopté définitivement**. La presse annonce un examen le 19 novembre
(journée réservée à un groupe) : **à confirmer** sur l'ordre du jour de assemblee-nationale.fr ; la
presse alerte, elle ne prouve pas.

| Issue | Ce que l'article dit | Titre de la version |
|---|---|---|
| **0. Avant le vote** (version publiée le 13/11) | Ce qui est sûr (terme, territoires, encadrement de l'évolution qui continue, comment vérifier un loyer) ; ce qui dépend du vote, avec la date annoncée de l'examen et ce que changerait chaque issue | « Encadrement des loyers après le 23 novembre 2026 : ce qui est sûr, ce qui dépend du vote » |
| **A. Adoption conforme** par l'Assemblée avant le terme, puis promulgation | Prolongé de deux ans à périmètre constant (date de fin exacte prise dans le texte promulgué) ; les collectivités peuvent en sortir (à surveiller ville par ville) ; délai pour contester un complément de loyer porté à un an, à partir de quand ; rien ne change à la signature pour le candidat | « Encadrement des loyers prolongé jusqu'en 2028 : ce qui change pour votre prochain bail » |
| **B. Pas d'adoption définitive** avant le terme (rejet, texte modifié qui repart au Sénat, examen reporté) | Le plafonnement du niveau des loyers prend fin dans les territoires concernés à la date du terme ; l'encadrement de l'évolution continue jusqu'au 31 juillet 2027 ; ce qui reste vrai pour les baux déjà signés (selon la source) ; ce qui reste en discussion au Parlement | « Fin de l'encadrement des loyers le 23 novembre 2026 : ce qui reste, ce qui change » |
| **A tardive** : adoption avant le terme mais promulgation au Journal officiel après | Ne pas trancher seul : demander à `blog-veille-juridique` ce que dit le texte adopté sur son entrée en vigueur. Tant que ce n'est pas établi, l'article dit « adopté, publication au Journal officiel attendue » | version A avec réserve |

Le rédacteur prépare dès maintenant **les trois versions** (0, A, B) dans le même fichier de travail.
Seule la version 0 est publiée le 13 novembre ; A ou B remplace son corps le jour où l'issue est
acquise. L'adresse ne change pas.

## Mises à jour prévues

| Quand | Déclencheur | Qui | Ce qui change dans la page |
|---|---|---|---|
| Chaque jour ouvré jusqu'au terme | — | `blog-veille-juridique` | rien si rien ne bouge ; alerte au chef sinon |
| **Jour du vote à l'Assemblée** (annoncé le 19/11) | résultat publié sur assemblee-nationale.fr | veille → `seo-redacteur` → `blog-relecteur` → chef, **dans la journée** | corps A ou B ; encadré « Mis à jour le … : l'Assemblée nationale a … » ; `modifieLe` ; nouveau titre |
| Jour de la promulgation (issue A) | texte au JORF sur Légifrance | même circuit | référence de la loi (numéro, date), date de fin exacte ; encadré mis à jour |
| **Jour du terme** (23 ou 24 novembre, voir fait n° 1) | — | même circuit | si rien n'est adopté : bascule en version B ; si A est en vigueur : rien, sauf vérification |
| Février 2027 (revue trimestrielle) | — | `seo-fraicheur` | collectivités sorties du dispositif, s'il y en a (issue A) |

Chaque mise à jour : `modifieLe` du catalogue, encadré daté en tête, ligne de `FAITS.md` mise à jour,
IndexNow. Pas de nouvel article pour le vote : une seule adresse, qui reste juste.

## Plan en questions

Le chapeau-réponse (40 à 60 mots) dit, dans la version 0 : ce qui se passe le 23 novembre, ce qui
est voté et ce qui ne l'est pas, et que la hausse entre deux locataires reste encadrée en zone tendue
quoi qu'il arrive. Les versions A et B réécrivent le chapeau.

1. Qu'est-ce qui s'arrête le 23 novembre 2026 ? (le plafonnement du niveau, son origine en 2018,
   la prolongation de 2022, la date du terme)
2. Où s'applique l'encadrement des loyers aujourd'hui ? (liste des territoires, renvoi à la fiche
   officielle ; une ligne par territoire, pas de plafond chiffré)
3. Le Parlement va-t-il le prolonger ? (version 0 : état du texte, date annoncée ; versions A et B :
   l'issue)
4. La hausse de loyer entre deux locataires reste-t-elle limitée ? (l'encadrement de l'évolution,
   jusqu'au 31 juillet 2027, et ses exceptions, à prendre dans la fiche officielle)
5. Que change le vote pour un bail que vous signez en novembre ou en décembre ?
6. Comment vérifier le loyer d'une annonce dans une ville encadrée, avant d'y répondre ? (simulateurs
   officiels ; ce que l'annonce doit mentionner, si la source le confirme ; le complément de loyer)
7. Que faire si le loyer d'un bail signé dépasse le plafond ? (contester, délai, commission
   départementale de conciliation : uniquement ce que la fiche officielle dit)

Section « Ce que ça change pour votre recherche » : on répond à l'annonce au même rythme ; on
vérifie le loyer en deux minutes avant la visite ; on garde la trace de l'annonce (capture datée),
utile si l'on conteste ensuite. Ce dernier point est un conseil, il se dit comme tel.

## Faits à sourcer (tous dans `docs/seo/FAITS.md` avant publication)

| # | Fait | Source visée | Déjà relevé ? |
|---|---|---|---|
| 1 | **Date exacte du terme** : le Sénat écrit « 23 novembre 2026 », une partie de la presse « 24 novembre ». Trancher sur l'article 140 de la loi Elan (n° 2018-1021 du 23 novembre 2018, JO du 24) tel que modifié en 2022, sur Légifrance | Légifrance, art. 140 loi Elan ; senat.fr | non, à trancher avant publication |
| 2 | Vote du Sénat le 2026-10-21, première lecture, contenu du texte adopté (deux ans, périmètre constant, sortie des collectivités, délai d'un an pour le complément de loyer) | senat.fr, « la loi en clair » (lien dans `VEILLE.md`) ; scrutin public sur senat.fr si l'on cite le nombre de voix | oui (veille), sauf le nombre de voix (presse seulement : ne pas citer sans le scrutin officiel) |
| 3 | État du texte à l'Assemblée et date de l'examen | assemblee-nationale.fr (dossier législatif, ordre du jour) | non : presse seulement |
| 4 | Liste des territoires encadrés | service-public F1314 (vérifié le 2026-11-01) | oui (veille) |
| 5 | Encadrement de l'évolution reconduit du 2026-08-01 au 2027-07-31 ; loyers de référence 2026 (Paris et Montpellier au 1er juillet, Bordeaux au 15 juillet) | service-public A17566 | oui (veille) |
| 6 | Délai actuel pour contester un complément de loyer, et l'instance compétente | Légifrance (art. 140 loi Elan) ; service-public F1314 | non |
| 7 | Sort des baux signés avant le terme si le dispositif s'arrête (plafond, contestation en cours) | Légifrance ; ANIL ; à défaut, **ne rien affirmer** et l'écrire tel quel | non |
| 8 | Mentions obligatoires d'une annonce en zone encadrée (loyer de référence, complément) | service-public, ANIL ; vérifier qu'elles existent avant d'en parler | non |
| 9 | Adresse des simulateurs officiels par ville | sites des collectivités ou service-public | non |

Aucun montant de plafond, aucun nombre de logements concernés, aucune estimation d'économie pour le
locataire : rien de cela n'est sourcé aujourd'hui.

## Liens internes obligatoires

- Pilier : `/guides/preavis-location` (section zone tendue), ancre du type « le préavis d'un mois en zone tendue ».
- Guide voisin : `/guides/repondre-a-une-annonce-de-location`, depuis la question 6.
- Guide voisin : `/guides/dossier-de-location`, depuis la section « Ce que ça change pour votre recherche ».
- Liens sortants : fiche service-public F1314, Légifrance, dossier législatif de l'Assemblée. Pas de
  lien vers la presse comme source d'un fait.

## Appel à l'action

« Être prévenu » (liste d'attente), formulé sur ce que fait le produit : repérer les annonces qui
correspondent à votre recherche et préparer votre réponse. Pas de promesse sur le loyer, pas
d'« alerte » sur l'encadrement : le produit ne vérifie pas les plafonds aujourd'hui.

## Visuel demandé à `seo-visuels`

Une frise datée, en SVG, dans la direction artistique du site (monde papier) : loi Elan 2018 →
prolongation 2022 → terme de novembre 2026 → deux branches (« prolongé jusqu'en 2028 » / « fin du
plafonnement ») → 31 juillet 2027, fin de la période d'encadrement de l'évolution en cours. Texte
alternatif qui dit la frise en une phrase. La branche retenue s'affiche en plein après le vote ;
avant, les deux en pointillé. Image de partage : titre de la version en cours.

## Contrôles avant publication

- `blog-relecteur` : chaque phrase de la version 0 reste vraie si l'Assemblée vote dans un sens ou
  dans l'autre. Aucune phrase au futur sur l'issue.
- Mot « Leboncoin » absent. Aucun prix ni offre de Terouva.
- `geo-citabilite` : chapeau-réponse autonome ; `FAQPage` seulement si les questions sont visibles.
