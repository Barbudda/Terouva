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
| Écriture | rédacteur | **cette page**, `apps/web/content/blog/_gabarit.ts`, ses lignes de mission, les intertitres du guide pilier, les 3 premiers résultats Google | `content/blog/<slug>.ts`, 5 à 6 articles par tour |
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

## La relecture (ce qu'elle lit, et rien d'autre)

Un relecteur ne reçoit que des articles **verts** aux deux scripts. Il lit :
1. les faits dont la citation n'a pas été retrouvée, contre leur source ;
2. de chaque article : le titre, le chapeau et les intertitres (l'angle sert-il la requête ? l'apport
   est-il réel ? une nuance juridique est-elle trahie ?) ;
3. **un article sur trois en entier**, tiré à tour de rôle ; si l'un d'eux tombe, le lot entier est
   relu en entier.

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
