# Pôle Design de Terouva : brief commun des sessions

> Écrit le 5 novembre 2026 par la cheffe du pôle Design. Chaque session lit ce
> fichier une fois, puis ne fait que sa ligne du tableau « Qui fait quoi ».

## Le but

Un visiteur arrive (accueil, guide, article ou outil), **comprend en dix secondes ce
qu'il gagne**, suit un chemin sans cul-de-sac jusqu'à « Être prévenu », et **en prend
plein les yeux** en route. Le hero tient déjà ce niveau ; tout le reste doit le
rejoindre sans le copier.

## Ce que la cheffe a vu (capture 1440 px de l'accueil, 5 novembre)

1. Après le hero, la page devient une suite de cartes bleu nuit au même grain, même
   bordure, même densité : sept sections, une seule matière. Le regard n'a plus de
   point focal, le rythme est plat. C'est le défaut n°1 à corriger.
2. Les cartes « Outils » ont un bloc dégradé sans image ; les cartes « Derniers
   guides » ont une zone d'image vide. Ça se lit comme un site cassé.
3. La fin (FAQ, inscription) retombe : formulaire petit, aucune « arrivée ». La fin
   d'un parcours est un moment, pas une case e-mail.
4. Les titres alternent gauche et centre sans logique visible.

## Ce qui ne bouge pas

- **Le hero** (`Hero.tsx`, `HeroExemples.tsx`) et la direction de `DESIGN.md` : nuit
  dominante `#081120`, bleu électrique d'interface, orange d'action, Fraunces /
  Archivo / DM Mono, papier chaud seulement pour la lecture longue. Hugo l'a voulue
  ainsi ; on l'élève, on ne la remplace pas. Lire `DESIGN.md` une fois.
- **Les textes** appartiennent au pôle CTO & Commerce (`docs/commerce/MESSAGE.md`,
  `lib/content.ts`). On ne réécrit pas, on n'ajoute aucune ligne de texte (R119 :
  l'IA pèche par ajout). Un texte qui gêne le design : le noter dans son journal.
- **Le contenu SEO** (articles, guides, métadonnées, `lib/blog*.ts`, `lib/seo*`)
  appartient au pôle SEO & GEO. On touche aux gabarits, jamais au contenu.
- **La démo `/app`** n'est plus mise en avant (décision d'Hugo) : hors champ.
- Lignes rouges Terouva : on observe Leboncoin, on ne le pilote pas ; aucun faux
  témoignage, aucun faux chiffre.

## Qui fait quoi (une session par ligne, fichiers disjoints)

| Session | Possède (seule à écrire) | Feuille de style |
|---|---|---|
| `navigation` | `components/layout/{Nav,NavClient,Ariane,FinDePage,Footer}.tsx`, `coquilles/PiedLogotype.tsx`, et `docs/design/PARCOURS.md` (carte des chemins) | `app/styles/navigation.css` |
| `recit` | `components/sections/{Parcours,Problem}.tsx` et leurs illustrations | `app/styles/accueil-recit.css` |
| `produit` | `components/sections/{Fonctions,Messages}.tsx` et leurs illustrations | `app/styles/accueil-produit.css` |
| `visuels` | `components/sections/Outils.tsx`, `components/guides/CarteGuide.tsx`, les visuels des pages `app/outils/**` (pas leurs textes ni leurs métadonnées) | `app/styles/visuels.css` |
| `arrivee` | `components/ui/{Questions,WaitlistForm}.tsx`, `components/sections/Inscription.tsx`, `app/liste/page.tsx` (pas `actions.ts`) | `app/styles/arrivee.css` |
| `lecture` | `components/guides/{CadreGuide,Sommaire,Rubrique}.tsx`, `components/blog/{CadreArticle,ListeArticles,FiltresPiliers,ArticlesLies,Markdown}.tsx`, la mise en page de `app/guides/page.tsx` et `app/blog/page.tsx` | `app/styles/lecture.css` |

- `apps/web/app/globals.css` : modifier sur place **seulement** les règles existantes
  de sa zone (les trouver par `grep`, ne jamais lire le fichier entier : 1 200
  lignes). Tout style nouveau va dans sa feuille de zone, déjà importée (elle se
  charge avant les règles de `globals.css` : pour changer une règle existante,
  l'éditer sur place plutôt que la surcharger).
- `globals.css` est le seul fichier partagé : un commit par chemin y emporte aussi les
  lignes en cours des autres sessions. On le commite **en dernier**, seul, juste après
  avoir vérifié par `git diff apps/web/app/globals.css` que tout le diff est à soi ;
  sinon on attend et on le note dans son journal (la cheffe le commitera).
- **Jetons `@theme`, coquilles (`BandeNuit`, `Mosaique`, `PleinCadre`), `layout.tsx`,
  `page.tsx`** : à la cheffe. Besoin d'un jeton ou d'un changement de coquille :
  variable locale dans sa feuille + une ligne dans son journal.
- Avant d'éditer un fichier : `git status --short <fichier>`. S'il a des
  modifications non commitées qui ne sont pas les tiennes, n'y touche pas et note-le.

## Méthode (dans cet ordre)

1. Regarder sa zone à 375 px puis 1440 px (Playwright MCP sur `http://localhost:3031`,
   serveur partagé déjà lancé ; s'il ne répond pas : `preview_start` nom `web-3031`, jamais
   un second serveur). Captures en **jpeg** dans `.playwright-mcp/` (ignoré par git).
2. `/impeccable critique` sur sa zone, puis décider **un** geste fort par section
   (matière, composition, lumière ou mouvement) et l'écrire en une phrase dans son
   journal **avant** de coder. Un seul point focal par écran, un « wow » par section
   au plus. Skills utiles : `impeccable`, `taste-skill`, `signaux-vibecodes`,
   `banques-references`, `emil-animate` (motion/react, jamais framer-motion).
3. Coder mobile d'abord, zones tactiles ≥ 44 px, contraste ≥ 4,5:1 calculé et noté en
   commentaire, `prefers-reduced-motion` respecté, aucune couleur en dur hors
   variable locale commentée.
4. `npx tsc --noEmit -p apps/web` propre ; captures 375 / 768 / 1440 regardées
   vraiment ; `/impeccable audit` de la zone, rouge corrigé.

## Économie de tokens (règles du pôle, à améliorer au fil de l'eau)

- Ce brief remplace la relecture de la conversation de la cheffe : ne pas chercher
  plus de contexte que `DESIGN.md` et ses propres fichiers.
- `grep -n` avant `Read` ; lire des plages, pas des fichiers entiers.
- Pour voir une page entière : **une** capture pleine page en jpeg, lue une fois
  (elle tient en une image réduite) ; zoomer ensuite par capture d'écran ciblée.
- Pas de Lighthouse ni de trace de performance : la session finale « mouvement et
  QA » s'en charge pour tout le site.
- Pas de sous-agent sauf besoin réel : la session est elle-même l'ouvrière.

## Sortie

- Commits en français, un sujet par commit, corps qui dit pourquoi, **uniquement
  ses fichiers** : `git commit -m "..." -- <chemins>` (jamais `git add -A`, d'autres
  sessions travaillent dans le même dossier). Pas de ligne `Co-Authored-By`.
  **Pas de push** : la cheffe vérifie l'ensemble et pousse.
- Journal `docs/design/journal/<session>.md`, 50 lignes au plus : le geste choisi par
  section et pourquoi, avant / après en une ligne chacun, chemins des captures, ce
  qui reste, ce qu'on demande à la cheffe (jeton, coquille, texte), et **une leçon
  qui vaudrait pour un autre projet** s'il y en a une (elle ira dans BONDS).
- Message final de la session : cinq lignes, pas plus.
