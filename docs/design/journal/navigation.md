# Journal : session `navigation` (5 novembre 2026)

Carte des chemins : `docs/design/PARCOURS.md`.

## Gestes choisis (écrits avant de coder)

- **Barre, téléphone : le pouce.** Passé le premier écran, la navigation descend en bas d'écran
  (« Menu » + « Être prévenu ») et s'efface quand le formulaire ou le pied arrive. Pourquoi :
  la barre compacte du haut n'avait pas de menu, on ne pouvait plus naviguer sans remonter.
- **Barre, bureau : le repère.** Le blog entre dans la barre avec le point orange « vous êtes
  ici ». Pourquoi : la rubrique aux 84 articles n'avait aucun repère.
- **Action : rester sur place.** « Être prévenu » vise `#prevenu` quand la page a un
  formulaire. Pourquoi : depuis un guide, le bouton faisait quitter la lecture pour l'accueil.
- **Fin de page : la matière change.** Cadre de nuit `.encadre` (arête bleue puis orange, lueur
  au pied), même sur papier, avec le point orange en repère d'arrivée. Pourquoi : la fin était
  un bloc entre deux filets, de la même matière que le texte, sans arrivée.
- **Fil d'Ariane : discret mais touchable.** Zone de toucher 44 px par pseudo-élément, titre
  courant tronqué sur une ligne (le `<h1>` le répète dessous).
- **Pied : une ligne de moins.** Les trois textes légaux n'y sont plus répétés en bas (la
  colonne « Mentions légales » les porte) ; ces liens de 13 px serrés étaient trop petits au pouce.

## Avant / après

- Mobile après le hero : avant, logo + bouton en haut, pas de menu ; après, Menu + action au pouce.
- Guide, bouton de barre : avant `/#inscription` ; après `#prevenu` (même page).
- Fin de page : avant filets + petit titre ; après cadre de nuit, titre à 2-2,75 rem.
- Barre de bureau : avant quatre liens ; après cinq, Blog compris, point orange sur la rubrique.

Captures : `.playwright-mcp/nav-fin-375.jpeg`, `.playwright-mcp/nav-article-1440.jpeg`.
Vérifié à 375 px (accueil) : barre cachée à 300 px, visible à 2 000, cachée au formulaire ;
menu ouvert depuis la barre, fermé à Échap. `tsc --noEmit` propre.

## Ce qui reste

- Le formulaire (`WaitlistForm`, session `arrivee`) était en cours de refonte (« guichet ») :
  dans le cadre de nuit son champ paraît clair. La fin de page repasse les jetons au monde nuit
  (`.fin-de-page`, `navigation.css`) ; à revoir ensemble une fois le guichet commité.
- Avertissement d'hydratation sur l'`<input>` du guichet (`caret-color`) : côté `arrivee`.
- Les points de `PARCOURS.md` pour `lecture` : doublon pastille « ← Guides » + fil d'Ariane,
  pilier absent du fil d'Ariane des articles, `FinDePage` après 84 articles sur `/blog`.
- Pas de `/impeccable audit` complet ni de capture à 768 px faute de temps navigateur (le
  Playwright partagé était pris par une autre session une bonne partie du travail).

## Demandes à la cheffe

- Jeton : `--fin-erreur: #ff7b7b` (rouge d'erreur du monde nuit) vit en local dans
  `navigation.css` ; il manque un `--color-night-bad` dans `@theme`.
- Texte (CTO & Commerce) : « Questions fréquentes » est rangé dans la colonne « Mentions
  légales » du pied (`FOOTER` dans `lib/content.ts`), sa place est dans « Produit ».

## Leçon pour BONDS

Une barre compacte qui revient au défilement doit porter **la navigation**, pas seulement
l'action : sinon le menu n'existe que dans le premier écran. Et sur téléphone elle va en bas,
là où est le pouce, et se range quand l'appel qu'elle porte est déjà à l'écran.
