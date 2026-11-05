# Méthode de production en série des articles

> Écrite le 2026-11-04 après les vagues 5 (19 articles) et les lots 1 et 2 (15 publiés). Objectif
> d'Hugo : de la masse, au moindre coût. Ce document remplace, pour un rédacteur ou un relecteur du
> blog, la lecture du brief, du contrat et de BONDS : tout ce qui sert est ici, en une page.

## Où partaient les tokens (vagues 4 et 5)

1. **Chaque tâche relisait tout** : BONDS, contrat, brief, registre, deux articles modèles, avant
   d'écrire une ligne. Et les sessions gardent leur historique : à chaque tour, des centaines de
   messages repartent avec la consigne.
2. **Le format recopiait** : sources (déjà dans les faits), sommaire (déjà dans les intertitres),
   questions de FAQ (déjà dans le corps), temps de lecture, et un JSX bavard (`&apos;`, `<p>`,
   `<Link>`), plus un fichier de faits en attente, recopié ensuite dans `FAITS.md`.
3. **La relecture faisait le travail d'une machine** : longueurs, liens, tirets, chiffres sans
   source, puis un aller-retour auteur-relecteur pour chaque défaut mécanique.
4. **Les consignes et les comptes rendus étaient longs**, et répétaient les mêmes règles.

## Le circuit économe

| Étape | Qui | Lit | Produit |
|---|---|---|---|
| Mission | chef | `PLAN-VAGUE-N.md` | une ligne par article : `slug · requête · pilier · format · guide pilier · angle` |
| Écriture (3 rédacteurs à 8 articles : moins de tours) | rédacteur | **cette page**, `apps/web/content/blog/_gabarit.ts`, ses lignes de mission, les intertitres du guide pilier, les 3 premiers résultats Google | `content/blog/<slug>.ts`, 5 à 6 articles par tour |
| Contrôle mécanique | le rédacteur, par script | rien | `npm run blog:verifier` au vert |
| Contrôle des sources | le rédacteur, par script | rien | `npm run blog:sources` : citations retrouvées |
| Relecture | relecteur | voir plus bas | une ligne de verdict par article |
| Publication | chef | les verdicts | `statut: "publie"` par lot, `npm run blog:verifier`, push |

## Le format (un fichier par article)

`apps/web/content/blog/<slug>.ts`, copié de `_gabarit.ts`. Corps en Markdown restreint. L'auteur ne
donne que ce qui ne se déduit pas ; `lib/blog-format.ts` calcule les sources (depuis les faits), le
sommaire (depuis les `##`), le temps de lecture et la FAQ balisée (intertitres en « ? » et leur premier
paragraphe, déjà visibles). **Les faits vivent dans l'article** (`faits`, avec une citation mot pour
mot) : plus de fichier d'attente, plus de copie dans `FAITS.md` pour le blog.

## Ce que les scripts jugent (donc personne ne le relit)

`npm run blog:verifier` (dans `apps/web`) : titre SEO, description, chapeau (limites), au moins
3 faits sourcés, datés et cités, au moins 3 intertitres, réponse de 35 à 70 mots sous chaque
question, ancres uniques, aucune tournure interdite (tiret cadratin, emoji, tutoiement, « il est
important de noter », « n'hésitez pas »…), liens internes qui existent (et aucun brouillon depuis
un article publié), lien vers le guide pilier, **aucun montant ni pourcentage absent des faits**,
une requête-mère par article.

`npm run blog:sources` : télécharge chaque source et y cherche la citation. Trouvée, le fait est
prouvé ; introuvable (texte changé, site qui bloque les robots comme visale.fr), il part en relecture.

## Pièges connus (à vérifier avant d'écrire)

Erreurs déjà relevées plusieurs fois. Les trois premières sont aussi des règles du vérificateur.
- **Âge Visale** : « 30 ans ou moins », puis « à partir de 31 ans » (jamais « moins de 30 ans »).
- **Mention de la caution** (art. 2297 du Code civil) : apposée par la caution elle-même, plus
  manuscrite depuis le 1er janvier 2022.
- **Territoire de la caution** (art. 22-1) : « métropolitain », qui comprend la Corse ; pas
  « l'Hexagone ».
- **Caution personne morale** : seulement un organisme dont la liste est fixée par décret, ou si le
  logement est loué à un étudiant non boursier (art. 22-1) ; pas « l'étudiant boursier » seul.
- **Une décision n'est citée que pour ce qu'elle dit** : la décision 2019-001 du Défenseur des droits
  retient le handicap, pas la nature des revenus ; aucune décision lue ne tranche le refus pour APL.

- **Le chapeau s'écrit en dernier**, en relisant la première phrase de chaque section : en vague 7,
  trois chapeaux disaient autre chose que leur corps (« et » au lieu de « ou », un ordre inversé).
- **Une règle absolue garde l'exception de sa source** : avant d'écrire « aucun recours », « rien à
  faire valoir » ou « ne peut jamais », relire la rubrique « exceptions », « décès » ou « abandon » de
  la fiche citée, et la nommer au moins en une phrase.

- **Donner la règle, pas le récit de la recherche** : « les fiches officielles lues ne disent pas »
  devient « aucune règle ne nomme… » (vague 8, quatre articles ; règle du vérificateur). Et seule une
  source officielle se nomme dans le texte, jamais « un cabinet d'avocats ».

- **Une règle de loi se cite dans le texte consolidé**, à défaut sur service-public ; jamais une petite
  loi ni une circulaire (vague 9, deux rédacteurs). Le relecteur lit Légifrance dans son panneau de
  navigation quand le script reçoit un 403.

Une règle du vérificateur ne s'adopte qu'après avoir tourné sur tous les articles publiés : en vague 7,
une règle sur la « mention » de la caution a levé quatre faux positifs sur des articles justes et a été
abandonnée.

## Réutiliser avant de chercher

Avant de sourcer une règle, chercher si un article publié la porte déjà (`grep` sur la valeur dans
`apps/web/content/blog/`) : reprendre son fait, même source, même citation. Quand une fiche
service-public dit la même règle qu'une page visale.fr ou Légifrance, citer la fiche service-public :
le script peut la lire, les deux autres le refusent.

## La relecture (ce qu'elle lit, et rien d'autre)

Un relecteur ne reçoit que des articles **verts** aux deux scripts. Il lit :
1. les faits dont la citation n'a pas été retrouvée, contre leur source ;
2. de chaque article : le titre, le chapeau et les intertitres (l'angle sert-il la requête ? l'apport
   est-il réel ? une nuance juridique est-elle trahie ?) ;
3. **un article sur trois en entier**, tiré à tour de rôle ; si l'un d'eux tombe, le lot entier est
   relu en entier.

Une correction exacte (remplacement mot pour mot), le relecteur l'**applique lui-même** et repasse
`npm run blog:verifier` avant de rendre : « À CORRIGER » ne reste que pour ce qui demande l'auteur.
Chaque défaut qui revient d'une vague à l'autre est signalé au chef pour devenir une règle du
vérificateur.

Verdicts dans **un seul fichier par vague**, `docs/seo/relectures/blog/VAGUE-N.md`, une ligne par
article : `slug · PUBLIABLE | À CORRIGER : <correction exacte> | REFUSÉ : <raison>`. Une
contre-relecture ne lit que le diff.

## Les comptes rendus

Rédacteur : une ligne par article, `slug · requête · mots · vérificateur vert · sources x/y
retrouvées`. Relecteur : le fichier de verdicts. Chef à Hugo : ce qui est publié, ce qui bloque.

## Les sessions

- Une vague commence sur un **contexte vidé** (ou une session neuve) avec une consigne de trois
  lignes qui renvoie ici. Une session qui traîne six cents messages les renvoie à chaque tour.
- La rédaction en série tourne bien sur un modèle moins cher que la relecture et le pilotage.
- Une publication d'articles seuls (sans code ni gabarit modifié) ne demande pas de porte Septune :
  build de prévisualisation vert et trois adresses contrôlées suffisent. La porte reste due quand le
  code, les gabarits, le plan du site ou les métadonnées changent.
