# Vague 10 : verdicts de relecture (relecteur distinct des auteurs, 2026-11-15)

Méthode : `docs/seo/blog/METHODE-SERIE.md`, section « La relecture », et les garde-fous de `PLAN-VAGUE-10.md`.

- Lus en entier : les 7 articles (lot petit).
- `npm run blog:sources` (par article, `BLOG_SLUG`) : 115 citations, 91 retrouvées par le script. Les 24 autres sont
  toutes sur Légifrance (403 au script) et ont été lues une à une dans le texte consolidé, au navigateur, le
  2026-11-15 : loi de 1989 art. 2 (2), 11 (3), 22-1 (3), 25-13 ; Code civil art. 459-2, 467 (2), 469 (2), 472, 1366,
  1367, 1375, 1984 (2), 1985, 1989, 1998 ; Code pénal art. 225-1. **Toutes exactes, aucune retirée.**
- N° 4 : l'exception du bail mobilité (une semaine à 18 mois en résidence à vocation d'emploi) vient de l'article 15
  de la loi n° 2025-1129 du 26 novembre 2025 ; F34759 (lue le 2026-11-15) dit qu'un décret doit encore être publié.
  L'article ne nomme pas la loi et date l'attente du décret : conforme.
- N° 6 : F2094 range bien la « conclusion d'un bail d'habitation » parmi les actes de gestion courante (définition
  des actes d'administration), que la personne en curatelle simple accomplit seule ; en curatelle renforcée, F2094
  dit « uniquement avec l'assistance de son curateur », signature à côté de la sienne ; art. 469 et 472 conformes.
- N° 1 et 3 : n° 1 ne cite ni Mobili-Jeune ni Loca-Pass. N° 3 : « pas encore 30 ans » = « moins de 30 ans » de F38492,
  pour Mobili-Jeune et pour les trois publics jeunes de Loca-Pass (le public alternant manquait, ajouté).
- Locataire installé, prix, assureur ou service nommé : une phrase du n° 1 visait le locataire en cours de bail,
  réécrite ; rien d'autre.
- Corrections appliquées, `npm run blog:verifier` au vert (1316 tests réussis, 118 ignorés). Statut inchangé, rien
  de commité.

## Verdicts

Corrections déjà faites dans les fichiers ; aucun article n'attend son auteur.

- apl-colocation · PUBLIABLE (chapeau : « chaque colocataire qui a droit à l'APL la touche à trois conditions », les trois conditions n'étant pas les seules ; « sa propre demande » → « sa demande » pour tenir 60 mots ; section couple : la phrase « Si votre situation change en cours de bail… » remplacée par la déclaration de la situation de couple dans la demande)
- chambre-chez-l-habitant-locataire · PUBLIABLE
- aide-demenagement-locataire · PUBLIABLE (Loca-Pass : le public de moins de 30 ans en apprentissage ou en professionnalisation ajouté, d'après F38492)
- bail-precaire-location-au-mois · PUBLIABLE (situations du bail mobilité complétées d'après l'art. 25-12 : formation professionnelle, études supérieures, apprentissage, stage, service civique, mutation, mission temporaire)
- signer-bail-par-procuration · PUBLIABLE
- louer-sous-curatelle · PUBLIABLE
- refus-assurance-loyers-impayes · PUBLIABLE

## Pour le chef (défauts récurrents)

- Légifrance reste illisible au script : 24 citations sur 115 ont demandé une lecture à la main. Elles étaient toutes
  justes ; le coût est dans le temps de relecture, pas dans l'exactitude.
- Listes légales raccourcies sans le dire (situations du bail mobilité, publics de Loca-Pass) : deux articles où une
  énumération de la loi ou d'une fiche perd un ou deux éléments. Piste de règle : quand un article énumère les cas
  d'une liste fermée, il les donne tous ou écrit « notamment ».
