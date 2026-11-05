# Parcours : de chaque porte d'entrée à « Être prévenu »

> Session `navigation`, 5 novembre 2026. Relevé sur `localhost:3030` (liens du `<main>`
> extraits du HTML rendu, puis vérification à 375 px). Une ligne `→ session` dit qui corrige.

## Les cinq portes

**Accueil `/`.** Hero → « Être prévenu » (`#inscription`, même page) : chemin court, sans
détour. Sur mobile, une fois le hero passé, **plus de menu** : la barre compacte n'a que le logo
et le bouton, en haut, hors de portée du pouce. *(corrigé ici)*

**Un guide `/guides/<x>`.** Pastille « ← Guides » en haut, puis le fil d'Ariane plus bas :
deux sorties vers l'arrière avant la première ligne lue. Corps → liens vers guides, outil,
articles → `ArticlesLies` → `FinDePage` (`#prevenu`, formulaire sur place). Bon chemin, mais :
- le bouton « Être prévenu » de la barre menait à `/#inscription` : on quittait le guide pour
  le bas de l'accueil alors que le formulaire est sur la page. *(corrigé ici)*
- la fin de page est un bloc entre deux filets, sans arrivée. *(corrigé ici, voir journal)*
- pastille « ← Guides » et fil d'Ariane font doublon. → `lecture` (`CadreGuide`)

**Un article `/blog/<x>`.** Même ossature que le guide, mêmes deux défauts de barre et de fin
(corrigés ici). En plus :
- le fil d'Ariane saute le pilier (Accueil / Blog / titre) : la rubrique de l'article, qui est
  la sortie la plus utile, manque. → `lecture` (`CadreArticle`, tableau `etapes`)
- la barre de bureau n'avait pas « Blog » : aucun repère « vous êtes ici » sur 84 articles.
  *(corrigé ici : Blog entre dans la barre dès que le blog existe)*
- neuf articles ont un lien `#prevenu` dans le corps : il marche, la cible existe.

**Un outil `/outils/<x>`.** Fil d'Ariane → outil → liens guides → `FinDePage`. Les variantes
de titre de `FinDePage` passées par les pages outils sont gardées. Même barre corrigée.
- `/outils` (index) n'a pas de fil d'Ariane : normal pour une rubrique de premier niveau.

**`/liste`.** Page privée (mot de passe, `robots` l'exclut) : ce n'est pas une porte visiteur.
Seul lien : le logo vers `/`. Rien à faire côté parcours.

## Culs-de-sac et appels absents

| Où | Ce qui manque | Qui |
|---|---|---|
| `/mentions-legales`, `/cgu`, `/confidentialite` | ni fil d'Ariane ni fin de page : la seule suite est la barre et le pied | acceptable (page de passage) ; le bouton de barre y mène à `/#inscription` |
| Pied, colonne « Mentions légales » | « Questions fréquentes » y est rangé, il appartient à « Produit » | `lib/content.ts` → CTO & Commerce |
| Pied | aucun « Être prévenu » : la dernière chose vue n'appelle à rien | la barre mobile reste visible jusqu'au pied *(corrigé ici)* |
| `/guides`, `/blog` | `FinDePage` après une très longue liste (84 articles sur `/blog`) : sur mobile, l'appel arrive après ~40 écrans | `lecture` (pagination ou repli de la liste) |
| Barre mobile, page d'accueil | le bouton de la barre et celui du hero visent la même ancre : la barre se retire quand le formulaire est à l'écran *(corrigé ici)* | |

## Ce que la session `navigation` a changé

1. **Barre de pouce sur mobile** : après 70 vh, une barre en bas d'écran porte « Menu » et
   « Être prévenu » ; elle se retire quand le formulaire de la page ou le pied est à l'écran.
2. **« Être prévenu » vise le formulaire de la page** (`#prevenu`) quand il existe, sinon
   `/#inscription`.
3. **Blog dans la barre de bureau**, avec le point orange sur la rubrique en cours.
4. **Fil d'Ariane** : zones tactiles à 44 px sans changer sa hauteur, titre courant tronqué sur
   une ligne (il double le `<h1>` juste dessous).
5. **Fin de page** : voir `journal/navigation.md`.
