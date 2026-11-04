# Méthode : où le préavis d'une location vide tombe à un mois

> Étude `blog-donnees`, données téléchargées et calculées le 2026-11-04. Script : `etude.py`
> (Python 3.10+, bibliothèque standard). Sorties : `resultats/`. Texte à publier avec l'étude :
> la section « Méthode en clair » ci-dessous ; le reste sert au relecteur.

## La question

Dans quelles communes un locataire qui quitte un logement **loué vide** peut-il donner un préavis
d'un mois au lieu de trois, parce que la commune est en zone tendue ? Combien d'habitants cela
concerne-t-il, et quelles grandes villes n'y sont pas ?

## Le fondement juridique retenu

Le préavis d'un mois « en zone tendue » renvoie à l'article 15 de la loi n° 89-462 et au
**1er tableau de l'annexe** du décret n° 2013-392 du 10 mai 2013 (service-public.gouv.fr, fiche
[F1168](https://www.service-public.gouv.fr/particuliers/vosdroits/F1168), vérifiée le 16 avril 2026,
lue le 2026-11-04). Le 2e tableau (« communes touristiques et tendues », créé en 2023) n'est pas cité
par cette fiche pour le préavis : l'étude le compte à part et ne lui attribue pas le préavis réduit.

## Les sources

| Fichier | Éditeur | Licence | Millésime | Téléchargé | Empreinte SHA-256 (fichier publié) |
|---|---|---|---|---|---|
| [Zonage TLV, CSV](https://static.data.gouv.fr/resources/liste-des-communes-selon-le-zonage-tlv-1/20251230-094759/zonage-tlv-decret-22-dec-2025.csv), jeu [« Liste des communes selon le zonage TLV »](https://www.data.gouv.fr/datasets/liste-des-communes-selon-le-zonage-tlv-1) | Ministère de la Transition écologique | Licence Ouverte v2.0 (Etalab) | décret n° 2025-1267 du 22 décembre 2025, code officiel géographique au 1er janvier 2025 ; ressource mise en ligne le 2025-12-30 | 2026-11-04 | `503424cd140c1f6e3befcdfdcb0addffa3d471aa2abb5fc7fa6b9f6f27fe69b6` |
| [Fichier d'ensemble des populations 2023](https://www.insee.fr/fr/statistiques/8680726), `ensemble.zip` → `donnees_communes.csv` | Insee | Licence Ouverte (conditions de réutilisation de l'Insee) | population municipale au 1er janvier 2023, limites communales au 1er janvier 2025 ; paru le 2025-12-18 ; France hors Mayotte | 2026-11-04 | zip `5174fc225398a4c072fb8bb5298b7ccf30c017834c7a4171f44787379d83b3f5` ; csv `ccfe782e04ebde04a1706214157b288a0d055eb3ab913ff9f7bab5a3571f67ab` |
| [Décret n° 2025-1267, JORF du 23 décembre 2025 (PDF)](https://static.data.gouv.fr/resources/liste-des-communes-selon-le-zonage-tlv-1/20251230-092548/joe-20251223-0300-0069.pdf), même jeu | Journal officiel, via le ministère | Licence Ouverte v2.0 | 2025-12-22 | 2026-11-04, non conservé (820 Ko) | `df2ef01237bb30f716be1bb93630bccf0fd73b95a388ec17f4fc47fb002d64d3` |

Les deux CSV sont conservés compressés dans `source/` ; le script vérifie leur empreinte avant de
calculer et refuse de tourner si un fichier a changé.

**Jeu écarté** : « Simulateur des ZONES TENDUES » (DILA, data.gouv.fr, Licence Ouverte). Son fichier de
référence `TaxeLogementVacant.json` n'a pas changé depuis le 2023-11-10 (historique GitLab
`pidila/sp-simulateurs-data`) : il précède le décret du 22 décembre 2025. Il sert seulement de
contrôle croisé (voir plus bas).

## Le calcul

1. Classement de chaque commune selon la colonne « Zonage TLV post décret 22/12/2025 » :
   `1. Zone tendue` (préavis d'un mois en location vide), `2. Zone touristique et tendue`,
   `3. Non tendue`.
2. Rattachement de la population municipale 2023 par code commune. L'Insee publie Paris, Lyon et
   Marseille par arrondissement : les arrondissements sont additionnés sous le code de leur commune.
3. Comptes par catégorie, communes de 100 000 habitants ou plus, part de la population en zone
   tendue par département, et liste des communes dont le classement a changé entre la colonne 2023
   et la colonne 2025.

## Contrôles

- Toutes les communes de l'Insee trouvent leur classement ; les 17 communes de Mayotte du zonage
  n'ont pas de population (fichier Insee hors Mayotte). Elles sont toutes en `3. Non tendue`.
- Contrôle croisé avec la liste 2023 du simulateur (1 434 communes) et la colonne 2023 du CSV
  (1 432) : les seuls écarts sont des fusions de communes intervenues depuis (Pierre-Bénite dans
  Oullins-Pierre-Bénite, Pierrefitte-sur-Seine dans Saint-Denis, code de Porte des Pierres Dorées).
- Le texte du décret n'a pas pu être lu automatiquement (PDF à polices encodées) : le classement
  repose sur la transcription du ministère. **Avant publication, le relecteur compare quelques
  communes avec l'annexe sur Légifrance ou avec le simulateur en ligne** (par exemple Rouen, Tours,
  Caen, Boëge).

## Limites (à publier)

- **Location vide seulement.** En meublé, les règles du préavis sont différentes (fiche F1168, onglet
  « Logement meublé ») ; l'étude ne les traite pas.
- **D'autres motifs ouvrent le préavis d'un mois partout**, zone tendue ou non (par exemple la
  mutation d'un salarié, selon F1168). Une commune « non tendue » ne veut pas dire « trois mois dans
  tous les cas ».
- **La liste qui compte dépend de la date du bail** (signature, reconduction ou renouvellement,
  intitulé des listes sur F1168). L'étude décrit la liste en vigueur depuis le décret du
  22 décembre 2025, pas celle d'un bail plus ancien.
- **Date de péremption connue** : le décret n° 2026-831 du 25 août 2026 (JORF n° 0201 du
  29 août 2026, lu sur Légifrance le 2026-11-04) abroge le décret 2013-392 au 1er janvier 2027
  (art. 2 et 3). Sa notice dit qu'il « reprend le périmètre » de 2013-392 tel que modifié par le
  décret 2025-1267 : les communes ne devraient pas changer. Reste inconnu : le texte auquel le
  préavis renverra ensuite. **Relancer l'étude si une nouvelle liste paraît** (rendez-vous du
  2027-01-04 dans la veille).
- **Échelle de la commune** : une commune est entièrement dedans ou dehors ; aucune nuance par
  quartier.
- **Populations** : population municipale 2023, la plus récente publiée. Elle ne dit pas combien de
  ménages sont locataires d'un logement vide.
- **Anomalie du fichier source**, sans effet sur le calcul : dans le CSV du zonage, les en-têtes
  « Code EPCI » et « Libellé EPCI » sont inversés par rapport au contenu.

## Ce qui a changé avec le décret du 22 décembre 2025

Cinq communes changent de classement entre la colonne 2023 et la colonne 2025 du CSV. Deux quittent
le 1er tableau : Boëge (74037), désormais non tendue, et Saint-André-de-Boëge (74226), désormais
« touristique et tendue ». Trois quittent le 2e tableau : Haut Valromey (01187), Pays-de-Montbenoît
(25390), Thoiras-Corbès (30329). L'objet de la révision est décrit dans la notice du décret ; elle n'a
pas pu être lue automatiquement (voir Contrôles).

## Méthode en clair (texte à publier sous l'étude)

Nous avons repris la liste officielle des communes en zone tendue publiée par le ministère de la
Transition écologique le 30 décembre 2025, après le décret du 22 décembre 2025, et l'avons croisée
avec les populations légales de l'Insee au 1er janvier 2023. Seules comptent ici les communes du
premier tableau de l'annexe du décret du 10 mai 2013, celles où le locataire d'un logement vide
peut donner un préavis d'un mois. Paris, Lyon et Marseille sont comptées comme une seule commune
chacune. Mayotte n'est pas couverte par les populations de l'Insee. L'étude ne traite que la
location vide, et d'autres motifs (une mutation, par exemple) ouvrent le préavis d'un mois partout.
Données relevées le 4 novembre 2026 ; la liste doit changer au 1er janvier 2027.
