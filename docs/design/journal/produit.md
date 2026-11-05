# Journal de la session `produit` (Fonctions, Messages)

## Gestes choisis (écrits avant de coder)

- **Fonctions, matière : un seul instrument.** Les cinq cartes deviennent les
  modules d'une même plaque, séparés par des filets d'un pixel, avec un bandeau
  d'instrument (voyant, heure qui tourne en DM Mono, graduations). Le « wow » :
  le fil des annonces vit, une nouvelle arrive en tête toutes les 3,6 s et
  pousse les autres vers le fond. Le reste se remplit une fois (cadran gradué
  qui compte jusqu'à 97, barres du suivi l'une après l'autre).
- **Messages, matière : la lettre.** Les fiches deviennent des feuilles de papier
  chaud dans la nuit (`.monde-papier`, le seul objet papier de l'accueil, parce
  qu'un message se lit), signées en Fraunces italique. Le ruban ne montre que
  l'accroche ; un clic ouvre la lettre entière dans un panneau de lecture
  (`<dialog>` natif : focus piégé, Échap, clic dehors), puis rend le focus.

## Avant / après

- Fonctions : cinq cartes levées au grain de toute la page → une plaque, un
  objet, qui bouge seule (fil, heure) et se remplit en descendant.
- Messages : fiches nuit tronquées par un fondu, illisibles en entier → lettres
  papier, accroche lisible, lecture complète en un clic.
- Bugs corrigés au passage : le fil débordait à 375 px (colonne implicite de la
  grille calée sur le texte `nowrap`, `grid-cols-1` + `min-w-0`) ; l'en-tête des
  fiches affichait « CORDIALEMENT, » au lieu du nom de l'expéditeur.

## Captures (`.playwright-mcp/`, jpeg)

- Avant : `produit-avant-{fonctions,messages}-{375,1440}.jpeg`
- Après : `produit-apres-{fonctions,messages}-{375,768,1440}.jpeg`,
  `produit-fil-{375,1440}.jpeg`, `produit-lecture-{375,1440}.jpeg` (serveur 3031)
- Vérifié par script : pas de débordement (plaque et page à 375), le fil tourne,
  le second jeu du ruban sort du tab (`tabindex=-1`), le panneau s'ouvre avec le
  focus sur « Fermer », Échap le ferme et rend le focus à la lettre ; aucune
  erreur console (une erreur d'hydratation venait des cos/sin des graduations,
  arrondis au centième).

## Contraste (calculé)

Papier `#f7f3ed` : encre 16:1, `#4e5154` 7,2:1, `#64686b` 5:1 (pieds de lettre
12 px). Plaque `#0d1829` : `#8c9bab` 5,3:1 (champs). Le vert de veille est
décoratif.

## Ce qui reste, demandes à la cheffe

- **Texte ajouté (invisible)** : `aria-label` « Lire le message de {nom} » et
  « Fermer » du panneau. Aucun texte visible ajouté. À valider par le pôle Commerce.
- **Coquille `Mosaique`** : le second jeu de tuiles devrait porter `inert` ; je
  retire le focus depuis la tuile (`closest(".ruban-double")`), c'est un pis-aller.
- `#messages .ruban` surcharge le fondu de bord de la coquille (64 px → 1 rem) :
  sur du papier, le long fondu se lisait comme une ombre sale.
- Le serveur partagé est très lent quand six sessions compilent (53 s à 200 s
  par page) ; le MCP Playwright était pris par une autre session. J'ai capturé
  avec un script `playwright-core` + Chromium déjà installé, navigateur à part.
- Pas de bibliothèque d'animation dans `apps/web` : tout est en CSS + état React.

## Leçon pour BONDS

Six sessions sur un seul MCP Playwright se bloquent (« Browser is already in
use ») : chaque session devrait avoir son navigateur (`--isolated`) ou un petit
script `playwright-core` qui lance son propre Chromium. Et une grille CSS sans
colonnes explicites calcule sa colonne sur le `min-content` : un texte
`truncate` y fait déborder la page sur mobile ; toujours `grid-cols-1`.
