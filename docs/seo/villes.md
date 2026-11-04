# Pages par lieu : étude de faisabilité

> Propriétaire : `seo-pages-villes`. Version 1 du 2026-11-04 (vague 4). **Aucune page n'est
> construite tant que la demande n'est pas prouvée.** Règle : une page de lieu n'existe que si le
> lieu change la réponse, avec au moins 3 éléments propres au lieu, sourcés et datés.

## 1. Verdict

| Famille de pages | Recommandation | Pourquoi, en une ligne |
|---|---|---|
| Encadrement du niveau des loyers, une page par **territoire** (9) | **Attendre** le vote définitif de la prolongation, au plus tard le 2026-11-23 | Chaque territoire a son arrêté et ses loyers de référence : le seuil est passé. Mais la base légale expire le 2026-11-23 si le texte n'est pas adopté |
| Zone tendue, une page par **commune** | **Ne pas faire** | La réponse est la même dans toutes les communes de la liste : contenu mince à l'échelle. La liste change le 2027-01-01 |
| « <sujet> + ville » pour garant, dossier, Visale | **Ne pas faire** | Le registre l'a vérifié pour « logement sans garant paris » : mêmes pages nationales, la ville ne change pas la réponse |

Ce qu'on peut faire dès maintenant sans page : **préparer les données** des 9 territoires (§4) pour
être prêts au vote, et rattacher les requêtes « zone tendue + ville » au guide préavis et à un hub.

## 2. La demande : ce qui est prouvé, ce qui ne l'est pas

Tiré du registre commité (v1, 2026-11-04). Source : autocomplétion Google (AC), sans volume :
Semrush est en `no_api_units` et la Search Console ne montre aucune requête locale utile.

| Requête-mère du registre | Variantes vues | Ce que ça prouve |
|---|---|---|
| encadrement des loyers + ville (P3, outil, lien 2) | paris, bordeaux, pays basque, bayonne, biarritz, talence ; « simulateur » | Des requêtes locales existent pour **3 territoires** sur 9 (Paris, Bordeaux, Pays basque par trois requêtes), plus Talence, voisine de Bordeaux, dont la couverture est à vérifier sur F1314 : si elle n'est pas couverte, la réponse « non » est elle aussi une réponse propre au lieu |
| zone tendue + ville (P2, information, lien 2) | bordeaux, la rochelle, gironde ; « préavis », « simulateur » ; « tension locative » rennes, rouen, le mans, pau | Des requêtes locales existent. Mais « tension locative » est la notion d'un concurrent (le « tensiomètre » de LocService), pas une règle |

Non prouvé : le nombre de recherches par lieu. L'autocomplétion montre qu'une requête existe, pas
combien de fois. Aucun lieu n'a encore une impression dans la Search Console de Terouva (seule
requête locale vue : « etat des lieux orgeval », hors sujet).

**Ce que j'attends de `seo-registre`** (seul à écrire le registre) :
1. AC « encadrement des loyers » + chacun des 9 territoires et de leurs communes principales
   (lille, lyon, villeurbanne, montpellier, grenoble, montreuil, saint-denis, bayonne) : lesquels
   suggèrent la requête ?
2. Lire la SERP de « encadrement des loyers bordeaux » et « encadrement des loyers lille » : qui est
   en top 10 (préfecture, ADIL, métropole, portails) ? Un simulateur officiel y figure-t-il ?
3. AC « zone tendue » + 10 villes moyennes : la requête porte-t-elle sur le préavis, la taxe, ou
   l'investissement (à écarter, brief) ?

## 3. Le seuil : qui a 3 éléments propres

### 3.1 Encadrement du niveau des loyers : les 9 territoires passent

Liste au 2026-11-01 ([service-public F1314](https://www.service-public.gouv.fr/particuliers/vosdroits/F1314),
relevée par `blog-veille-juridique`) : Paris, Est Ensemble, Plaine Commune, Lille-Hellemmes-Lomme,
Lyon-Villeurbanne, Bordeaux, Montpellier, une partie de Grenoble-Alpes Métropole, Pays basque.

Éléments propres à chaque territoire, tous publics :
1. **L'arrêté préfectoral** qui fixe les loyers de référence, avec sa date d'effet (en 2026 : 1er
   juillet à Paris et Montpellier, 15 juillet à Bordeaux, d'après SP A17566).
2. **Les loyers de référence** par secteur, nombre de pièces, époque de construction et type de
   location (vide ou meublé) : loyer de référence, majoré (+20 %), minoré (-30 %).
3. **La liste des communes** couvertes (Est Ensemble, Plaine Commune, Grenoble et Pays basque en
   regroupent plusieurs ; Grenoble seulement en partie).
4. **La date d'entrée** dans le dispositif (Montpellier le 2022-07-01, Bordeaux le 2022-07-15, vu
   seulement dans un résumé de recherche : à vérifier sur les arrêtés avant tout usage).
5. **Où s'adresser** : l'ADIL du département et la commission départementale de conciliation.

Cinq éléments, tous différents d'un territoire à l'autre : le seuil de 3 est passé par les 9. La
bonne granularité est **le territoire**, pas la commune : une page par commune d'Est Ensemble, au
même contenu, serait du contenu mince. Exception à étudier : une page par commune quand la commune est demandée
seule (Bayonne, Biarritz, Talence sont suggérées), redirigée vers le territoire si son contenu ne
diffère pas.

### 3.2 Zone tendue : aucune commune ne passe

Ce que change la zone tendue pour un locataire :
1. Préavis d'un mois en location vide (art. 15, SP F1168, vérifié le 2026-04-16).
2. Encadrement de l'évolution du loyer à la relocation, reconduit du 2026-08-01 au 2027-07-31
   (SP A17566).
3. Plafond des honoraires d'agence (décret n° 2014-890) : à vérifier, la grille distingue des zones
   qui ne recouvrent pas exactement la liste des zones tendues.

Trois éléments, mais **les mêmes pour toutes les communes de la liste** : la commune ne change que
« oui ou non ». Une page par commune répéterait le même texte avec un nom différent, ce que la fiche
interdit. Et la liste elle-même bouge : révisée par le décret 2025-1267 (baux depuis le 2025-12-24),
son support (annexe du décret 2013-392) est **abrogé au 2027-01-01** par le décret 2026-831, et la
liste qui servira ensuite au préavis reste à vérifier (VEILLE.md, entrée 15).

La bonne réponse à « zone tendue + ville » est donc une **recherche de commune** dans une page
unique (hub ou section du guide préavis), qui renvoie au simulateur officiel de service-public. Pas
avant que la liste de 2027 soit connue.

## 4. Les données

| Jeu | Contenu | Licence et accès | État |
|---|---|---|---|
| [Encadrement des loyers de Paris](https://www.data.gouv.fr/datasets/encadrement-des-loyers-de-paris) (miroir d'opendata.paris.fr) | loyers de référence par quartier depuis 2019, historique gardé, mis à jour chaque 1er juillet | data.gouv.fr ; licence à relever sur la fiche | trouvé le 2026-11-04, non téléchargé |
| [Encadrement des loyers de Lille](https://www.data.gouv.fr/datasets/encadrement-des-loyers-de-lille) | loyers de référence par zone ; arrêté annuel du préfet | data.gouv.fr ; licence à relever | trouvé le 2026-11-04, non téléchargé |
| Lyon-Villeurbanne, Bordeaux, Montpellier, Est Ensemble, Plaine Commune, Grenoble, Pays basque | à chercher : portail de la métropole, de la préfecture ou de l'observatoire local des loyers | inconnu | **non trouvé** (une recherche, pas d'exploration du catalogue) |
| Arrêtés préfectoraux 2026 (les 9) | la source juridique des valeurs | recueils des actes administratifs, sites de préfecture et DRIHL | à relever un par un |
| Liste des territoires | les 9 et leurs communes | SP F1314 | vérifiée le 2026-11-01 |
| Liste des zones tendues | communes et codes INSEE | annexe du décret 2013-392 modifié (abrogée au 2027-01-01) ; simulateur SP | à remplacer en janvier 2027 |
| ADIL par département | coordonnées | anil.org | à relever |

Stockage prévu : un fichier par territoire dans le dépôt, avec source, licence et millésime en tête,
chargé au build. Aucun chiffre interpolé : un territoire sans jeu daté n'a pas de page, il reste
dans le hub avec un lien vers son arrêté.

Concurrence à noter : Paris propose son propre outil de recherche du loyer de référence (la fiche
data.gouv dit que le jeu en reprend le contenu). Une page Terouva sur Paris ne battra pas cet outil :
elle doit répondre à autre chose (que faire si l'annonce dépasse, complément de loyer, recours, et
le lien vers l'outil officiel).

## 5. Le plan, si le vote tombe

1. **Avant le 2026-11-23** : relever les 9 arrêtés 2026 et leurs jeux de données (pas de page).
2. **Si la prolongation est adoptée définitivement** : un hub `/encadrement-des-loyers` et un premier
   lot de 4 pages : les 3 territoires où la demande est vue (Paris, Bordeaux, Pays basque), puis Lille
   ou Lyon selon ce que le registre relève. Gabarit : réponse propre au territoire en tête, loyers de référence datés,
   questions dont la réponse change selon le lieu, liens vers le guide national, l'outil de
   vérification et 2 territoires voisins. Mesure de l'indexation sur 3 à 4 semaines avant les 5
   autres.
3. **Si elle ne l'est pas** : pas de pages par territoire. Un article de blog daté, déjà prévu par la
   veille (« Encadrement des loyers après le 23 novembre 2026 »), et rien d'autre.
4. L'outil « le loyer de cette annonce est-il dans les plafonds ? » (registre, P3) se construit sur
   les mêmes fichiers de données : à spécifier après le vote, par `seo-outils`.

Sitemap et hub : coordonnés avec `seo-gardien-technique` et `seo-maillage` au moment du lot.
Leboncoin n'apparaît ni dans les URL ni dans les ancres (brief).

## 6. Questions ouvertes

- Le pôle veut-il des pages sur un dispositif dont l'avenir se décide dans les trois semaines ? Ma
  réponse : préparer, ne pas publier avant le vote.
- Qui suit le vote à l'Assemblée ? `blog-veille-juridique` (VEILLE.md, échéance du 2026-11-23).
