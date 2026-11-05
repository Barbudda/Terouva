# Journal de la session `arrivee` (FAQ, inscription, formulaire, /liste)

## Gestes choisis (écrits avant de coder)

- **FAQ, composition : un index qui accompagne.** Chaque question porte son numéro
  DM Mono orange (comme les autres index de l'accueil) ; sur grand écran le titre
  « Avant de vous inscrire. » reste en place pendant qu'on lit ; les réponses se
  déplient (`::details-content`, repli instantané ailleurs).
- **Inscription, composition et matière : l'arrivée répond au hero.** Seule
  composition centrée après le hero : titre Fraunces, queue en italique, un seul
  bouton orange. Le formulaire devient un guichet : champ et bouton dans la même
  pilule dès 640 px, empilés en 56 px pleine largeur au pouce.
- **Le moment : le billet.** Au succès, la pilule s'ouvre en billet de place
  (clip-path 520 ms), la coche se trace, le talon détaché par une perforation
  porte l'adresse masquée. Un seul « wow » sur la zone.

## Avant / après

- Avant : titre et formulaire côte à côte, champ à filet bas de 48 px, bouton hors
  de vue à 1440, succès réduit à une phrase entre deux filets.
- Après : point focal net (titre centré, guichet), cinq états dessinés.

## États

saisie · envoi (filet bleu qui court sous la saisie, statique en mouvement
réduit) · erreur (vérifiée côté client avec `parseWaitlistInput`, la règle même
du serveur ; bordure et anneau d'erreur, `aria-invalid`, `aria-describedby`,
focus rendu au champ) · succès (billet, focus sur le billet, `role=status`) ·
déjà inscrit (même billet sans animation, relu dans `localStorage`).
La route répond `ok` pour une adresse déjà présente : « déjà inscrit » est donc
une mémoire du navigateur, pas du serveur. On n'y garde que l'adresse masquée.

`/liste` : la porte prend le même guichet (erreur reliée au champ), le compte des
inscrits passe en chiffre `.numero`. `actions.ts` non touché.

## Captures (`.playwright-mcp/`)

arrivee-375-saisie, -erreur, -envoi, -succes, -liste, -findepage ;
arrivee-1440-saisie, -deja ; arrivee-768-saisie (prise sur le serveur 3031,
le 3030 ayant son cache `.next` corrompu). Pas de débordement horizontal.

## Pour la cheffe

- **Textes (pôle Commerce)** : deux mots ajoutés, « Autre adresse » (bouton du
  billet pour changer d'adresse). Le trait d'union de « e-mail » est devenu
  insécable dans le message de succès (même texte, il ne se coupe plus).
- **Confidentialité** : l'adresse masquée (`ca••••@gmail.com`) est gardée dans le
  `localStorage` du visiteur sous `terouva:inscription`. Rien ne part. La page
  confidentialité pourrait le mentionner.
- **Navigation** : `FinDePage` est un cadre sombre posé sur le papier ; le guichet
  et le billet se teintent donc sur l'encre du contexte (`color-mix`), jamais sur
  `--color-card`. Pas de jeton demandé.
- Le bouton « Être prévenu » du masthead pourrait savoir qu'on est déjà inscrit
  (même clé `localStorage`), si la session `navigation` le veut.
- Hors zone : `Problem.tsx(137)` casse `tsc` (`--decalage` dans un `as CSSProperties`).

## Leçon pour BONDS

Un champ partagé entre plusieurs surfaces ne doit pas prendre son fond d'un jeton
de surface (`--color-card`) : il ignore où il sera posé. Le teinter à partir de
l'encre du contexte (`color-mix(var(--ink) 5%, transparent)`) le rend juste sur
nuit, papier et cadre sombre sans variante.
