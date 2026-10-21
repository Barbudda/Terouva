# Direction artistique — Terouva

> Écrit le 21 octobre 2026, après le constat qu'il n'existait pas. C'est la cause
> racine du reproche fait au site : sans direction écrite, chaque écran a été
> tranché par défaut, et les défauts d'un outil de génération se ressemblent tous.

## Le mot de ton : **net**

Terouva sert à récupérer du temps et à connaître ses droits dans une recherche de
logement. Le site doit donner la même impression que le produit : une décision
déjà prise, pas une proposition qui s'excuse. Net veut dire : une idée par écran,
une couleur qui compte, une typographie qui assume sa taille, et rien qui clignote
pour attirer l'attention.

Ce qui vient de « net », concrètement : des titres d'un seul tenant, des filets
plutôt que des cadres, des chiffres posés dans la marge plutôt qu'enfermés dans
des bulles, et du blanc qui sépare au lieu de bordures qui cernent.

## Typographie : deux voix, pas une

Le site n'avait qu'une police, en graisse 800 pour tous les titres. C'est la
silhouette la plus reconnaissable d'une page produit générée : un gros grotesque
noir, serré, sur fond clair.

| Rôle | Police | Pourquoi |
|---|---|---|
| **Titres** | **Newsreader** (serif), 400 à 600 | Dessinée par Production Type pour la lecture à l'écran. Empattements francs, contraste marqué : elle a le ton d'une notice officielle, ce qui est exactement le registre des guides. Elle n'est pas encore partout. |
| **Interface et texte courant** | **DM Sans**, 400 à 700 | Compacte, très lisible en petit. Elle reste pour la navigation, les boutons, les étiquettes et le corps de texte. |

Inter, Geist et Space Grotesk restent exclues (règle projet). Les titres passent
de la graisse 800 à **500-600** : la serif porte l'autorité, elle n'a pas besoin
d'être épaissie.

## Couleur : l'accent redevient rare

La palette ne change pas. Son **usage**, oui. Le magenta `#c92d6a` servait à sept
rôles à la fois : moitié de titre, sur-titre, puces, coches, ombres, pastilles,
boutons. Un accent qui est partout n'accentue plus rien, et le site devient rose.

**L'accent est désormais réservé à quatre choses :**

1. le bouton d'action principal de l'écran, un seul ;
2. les liens dans le corps de texte ;
3. l'état actif, le survol d'un élément cliquable, ou le focus ;
4. deux moments voulus par Hugo dans son brief d'origine, et eux seuls : les
   **chiffres clés** du bandeau de l'accueil, et le **panneau d'appel** en aplat.
   Ils tiennent précisément parce que le reste de la page n'est plus coloré.

Partout ailleurs : encre (`--color-ink`, `--color-ink-2`, `--color-ink-3`) et
filets (`--color-rule`). Les coches, les puces, les marqueurs de liste et les
sur-titres passent à l'encre.

| Token | Rôle |
|---|---|
| `--color-paper` `#fdfdfd` | fond général, jamais le blanc pur |
| `--color-paper-2` `#fbf7f8` | fond teinté, pour séparer une section sans la cadrer |
| `--color-ink` `#1b1d1e` | titres et texte fort |
| `--color-ink-2` `--color-ink-3` | texte courant, mentions |
| `--color-rule` `#e7e7ee` | filets horizontaux, séparateurs |
| `--color-accent` `#c92d6a` | les trois rôles ci-dessus, rien d'autre |

## Interdits, nommés

Ce sont les tics relevés sur le site livré. Ils ne reviennent pas.

- **Le mot accentué dans un titre.** Un `<span className="text-accent">` qui
  colore la seconde moitié d'un H1. C'était sur huit pages. Un titre se lit d'un
  seul tenant, dans une seule couleur.
- **Les pastilles rondes numérotées.** Un chiffre dans un cercle bordé, répété en
  colonne. Les étapes se numérotent dans la marge, en serif, sans contenant.
- **Le sur-titre en capitales colorées.** « POURQUOI TEROUVA » en magenta espacé
  au-dessus de chaque section. Devient une mention discrète à l'encre, ou rien.
- **L'ombre colorée** sous les boutons. Une ombre neutre, à une seule direction,
  ou pas d'ombre.
- **Tout arrondir.** Les pilules restent réservées aux champs et au bouton
  principal ; les cartes et panneaux gardent un arrondi franc mais mesuré.

## Densité : aérée, et tenue

Une seule densité sur tout le site : aérée. Espacements en multiples de 4 px,
rythme vertical régulier entre sections (96 px de respiration sur desktop, 64 px
sur mobile). Mesure de lecture à 44 rem maximum, jamais plus large.

## Lumière

Fond `paper`, surfaces `card` à peine plus claires, séparation par **filets** et
par le vide plutôt que par des ombres. Une seule ombre douce, verticale, réservée
aux éléments qui flottent vraiment (dialogue plein écran). Pas d'ombre portée sur
les cartes au repos.

## Mouvement

Inchangé : révélations au défilement par `animation-timeline: view()`, sans
JavaScript, sous `@media (prefers-reduced-motion: no-preference)`. Durées de 150 à
300 ms, easing sur mesure. Le mouvement sert à hiérarchiser l'arrivée du contenu,
jamais à décorer.

## Preuve

Toute modification d'écran se vérifie par capture à 375, 768 et 1440 px, et par un
passage Lighthouse mobile. Les chiffres vont dans le message de fin. Un audit rouge
se corrige, il ne se commente pas.
