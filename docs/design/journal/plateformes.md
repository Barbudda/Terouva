# Journal de la session plateformes (pôle Design, 11 novembre 2026)

## Le geste

Des icônes d'app qu'on reconnaît avant de lire : la rangée des sites est un
écran d'accueil de téléphone, et c'est la seule fois où des couleurs étrangères
à Terouva entrent sur la page. Elles restent dans les tuiles.

## Ce qui a été fait

- `components/sections/Plateformes.tsx` et `app/styles/plateformes.css`, importée
  dans `globals.css` ; `<Plateformes />` posé après `<Hero />` dans `app/page.tsx`.
  Motif onglets (`tablist`, `tab`, `tabpanel`), une tuile dans l'ordre de
  tabulation, flèches gauche et droite, Début et Fin. Leboncoin choisi par défaut.
  À 375 px la rangée défile au doigt (tuiles de 76 px) ; à partir de 1280 px les
  huit tiennent sur la grille (tuiles de 120 px).
- `HeroExemples.tsx`, `PanneauAnnonce` : la carte générique devient une ligne de
  liste d'annonce sur fond blanc (vignette à gauche, titre, loyer en gras, badge
  du vendeur, lieu et date en gris), à la couleur du site. Les flèches du
  parcours font passer Leboncoin, PAP, SeLoger : les annonces d'agence vont sur
  SeLoger, celles de particuliers alternent Leboncoin et PAP. Vignette : une
  fenêtre dessinée, pas de photo. Ses styles sont dans `plateformes.css` (les
  couleurs de site y sont déjà).

## Couleurs relevées dans le navigateur intégré (page d'accueil de chaque site)

| Site | Couleur | Mot-symbole |
|---|---|---|
| Leboncoin | `#ec5a13` (texte sur blanc : `#b84a14`, l'orange foncé de ses liens) ; encre `#152233` | blanc |
| SeLoger | `#e30513` | blanc |
| PAP | `#2409f1` | blanc |
| Bien'ici | `#009db0` | blanc |
| Logic-Immo | `#017cbc` | blanc |
| ImmoJeune | `#ffd400` (fichier `logo.svg` du site) | noir de son logo `#1d1d1b` |
| Studapart | `#36417d` | blanc |
| La Carte des Colocs | `#44c878` | vert profond du site `#1c362b` |

Le blanc ne tient pas sur le jaune d'ImmoJeune (1,4:1) ni sur le vert de La Carte
des Colocs (2,1:1) : le mot-symbole y prend l'encre de la marque.

## Ce qu'il a fallu laisser

- **Aucune icône Simple Icons** pour les huit sites (vérifié dans les versions
  15.0.0 et 16.0.0) : toutes les tuiles portent le nom en mot-symbole, et
  `public/plateformes/` reste vide.
- **Domaine de La Carte des Colocs** : `lib/content.ts` dit `lacartedescolocs.com`,
  le site répond sur `lacartedescolocs.fr`. Au pôle CTO & Commerce de corriger.
- **Arrondi des tuiles** : 22 % du côté, au-delà des 4 px de `DESIGN.md`. C'est la
  forme des icônes de téléphone que la référence FanClaw demande.
- **Écran Leboncoin** : la couleur, la grammaire de la carte et le badge, pas le
  logo ni la police du site (non libre). Les polices restent celles de Terouva.
- Erreur d'hydratation vue pendant les captures Playwright : `caret-color` injecté
  dans les champs de l'inscription par l'outil de capture, hors de cette zone.

## Vérification

`npx tsc --noEmit` et `npx eslint` propres sur les fichiers touchés. Captures
`.playwright-mcp/plateformes-375.jpeg`, `plateformes-1440.jpeg`,
`annonce-375.jpeg`, `annonce-1440-0/1/2.jpeg` (Leboncoin, PAP, SeLoger).
