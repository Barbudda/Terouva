# Prompt pour BONDS : la recette du hero en aurore de Terouva

> À coller dans une session Claude Code ouverte dans `C:/Users/hugo8/OneDrive/Desktop/BONDS`.
> Écrit le 31 octobre 2026 depuis Terouva, après la mise en ligne validée par Hugo (« pas mal »).
> Tout vient d'un vrai chantier : les fichiers cités existent, les chiffres ont été mesurés.

## Ce que je te demande

Terouva vient de copier, de haut en bas, une maquette de référence envoyée par Hugo, puis de refaire
sa vidéo de promotion dans le même design. Le résultat tourne sur https://terouva.com. Intègre à
BONDS ce qui s'est appris, en cinq livrables :

1. Un skill core **`copie-de-reference`** : la méthode pour copier franchement une image de
   référence, calque par calque, puis l'étendre à toute la page.
2. Un skill core **`rideau-de-lumiere`** : la recette mesurée, en CSS pur, du hero en aurore. Champ,
   stries, rideau d'égaliseur, bouton rond, flèches, panneaux en perspective, écho au pied de page.
   Même format que `verre-liquide`.
3. La mise à jour de **`video-promo-muette`** : nouveau gabarit, nouveau script de rendu.
4. Cinq nouveaux **retours** dans `docs/RETOURS.md`, et trois compléments datés à des retours
   existants.
5. Le branchement dans les **loadouts**, puis `npm run manifest` et `npm run doctor`.

Lis d'abord les fichiers Terouva listés en fin de document. Ils sont sur ce disque, sous la racine
`C:/Users/hugo8/OneDrive/Desktop/Terouva`. Les liens pointent sur le commit `c8e8389` publié sur
GitHub : ils restent justes même si le code bouge ensuite.

## La référence

Hugo n'a envoyé la maquette que dans la conversation, elle n'est pas dans le dépôt. C'est la page
d'accueil en plein écran d'un produit nommé « FluxEdit ». De haut en bas :

- un menu posé sur le champ : logo à gauche, point orange sur la rubrique en cours, bouton blanc en
  pilule à droite ;
- un titre serif centré, en deux lignes, sur la nuit ;
- un champ de couleur sur tout le cadre : nuit au sommet, bleu électrique au milieu avec un faisceau
  cyan vertical au centre, puis orange à gauche, pêche au centre et rose à droite dans le tiers bas ;
- de fines stries verticales sur toute la hauteur et, au centre, un dôme d'égaliseur plus clair fait
  de traits serrés dont les sommets dessinent une cloche ;
- une rangée centrale : flèche ronde en vitre et deux chiffres blancs à gauche, sous-titre et bouton
  rond « Try Now » au centre, deux chiffres et une flèche à droite ;
- trois panneaux produit en bas, les deux extérieurs pivotés vers le centre, qui mordent sur la
  section suivante.

Si Hugo veut la garder, il la déposera lui-même dans `core/skills/copie-de-reference/references/`.
C'est la maquette d'un tiers : elle sert de repère interne et ne se publie pas (retour R28).

Pour le résultat, prends deux captures de https://terouva.com à 1440 et 390 px avec `playwright-cli`,
une fois l'entrée en scène finie (retour R69, compter deux secondes), et range-les dans
`core/skills/rideau-de-lumiere/references/`.

## 1. Le skill `copie-de-reference`

Il s'invoque quand Hugo envoie une image et dit « copie », « fais-le ressembler », « exactement comme
sur la photo ». Pour s'inspirer librement d'une ambiance, `creative-direction` reste le bon outil.

Voici la méthode telle qu'elle a fini par marcher. Les étapes 1 et 6 sont celles qui ont manqué.

1. **Inventorier la référence avant de coder**, de haut en bas, calque par calque : champ, texture,
   motif central, composition et grille, commandes, chiffres, panneaux, menu, et ce qu'on devine sous
   le pli. L'inventaire s'écrit dans `DESIGN.md`. Au premier passage, seul le dôme de barres avait
   pris les couleurs et le reste du hero gardait la nuit. Hugo : « il n'y a pas que les barres qui
   doivent être colorées, le reste du hero doit suivre le dégradé, exactement comme sur la photo ».
2. **Viser franchement.** Quand Hugo dit « copie », on juge à la ressemblance sur une capture côte à
   côte. L'ancien `DESIGN.md` et les préférences de BONDS passent après. On ne livre pas de version
   prudente et on ne réclame pas de dérogation.
3. **Traduire chaque calque dans la matière du projet**, à la même place. Les polices du projet
   remplacent celles de la maquette (Fraunces, Archivo et DM Mono pour Terouva). Le vrai contenu
   remplace le faux : les six annonces réelles de la démonstration dans les panneaux, la vraie démo
   derrière le bouton rond. Les règles d'honnêteté du projet tiennent (retours R50 et R51).
4. **Donner une fonction à ce qui n'est que décor dans la maquette.** Les flèches rondes font défiler
   les exemples dans les trois panneaux, et les barres du graphique de notes se cliquent. Une
   commande qui ne fait rien se remarque au premier clic.
5. **Retirer les tics, même quand ils viennent de la maquette ou de soi.** Hugo a fait retirer la
   mention « France · 2026 » au-dessus du titre : « typique d'une IA ».
6. **Copier jusqu'au bout de la page.** Une fois le hero juste, Hugo a demandé : « étends plus sur la
   page ce que tu as fait, je veux tout copier ». Le menu, le pied de page et la vidéo ont suivi. Un
   hero copié seul laisse une page à deux styles.
7. **Composer le mobile pour lui-même.** La maquette n'existe qu'en grand écran. À 390 px, le rideau
   devient une bande entre le texte et les chiffres, les flèches descendent au-dessus des panneaux
   avec un compteur, et les panneaux s'empilent à plat.
8. **Prouver par captures côte à côte**, 1440 puis 390 px, et mesurer le contraste au point le plus
   clair du dégradé derrière chaque texte (retour R74).

Hugo a aussi demandé « trois étapes pour avoir un design mémorable ». L'accueil les a suivies dans
cet ordre, et l'ordre vaut ailleurs : d'abord **la matière** (le rideau de lumière), puis **la
composition** (bouton rond, chiffres de part et d'autre, panneaux en perspective), enfin **la
chaleur** (l'orange qui monte au pied).

Écris le skill en français, dans le ton de `verre-liquide` : ce qui fait la différence, la marche à
suivre, puis les pièges déjà payés avec leurs numéros de retour. Terouva sert d'exemple unique.

## 2. Le skill `rideau-de-lumiere`

Une recette mesurée. Les valeurs sont dans `apps/web/app/globals.css`, lignes 120 à 435. Reprends-les
en remplaçant les jetons de Terouva (`--color-paper`, `--color-ink`, `--ease-terouva`,
`--marge-cadre`) par des noms neutres, et précise que les hex sont ceux de la référence, à recalculer
pour un autre projet.

- **Le champ** tient dans un seul `::before` : un fondu linéaire vers la couleur de la page, six
  dégradés radiaux, puis un linéaire de fond à huit arrêts, de `#030814` en haut à `#ffa47e` en bas.
  Le fondu ramène à la page sous les panneaux. Le champ remonte derrière le menu
  (`inset: -5rem -5% -12% -5%`) et dérive de 2 % en 22 s. Ni flou calculé ni image.
- **Les stries** sont deux `repeating-linear-gradient` à 90° : un motif de 26 px à trois traits de
  largeurs inégales, clairs et sombres mêlés, et un motif de 97 px à une bande large. Un masque
  vertical les rend discrètes au sommet et franches au milieu. Elles glissent de 1,2 % en 26 s.
- **Les étoiles** : onze points en `radial-gradient` dans le haut du cadre, qui scintillent en 6 s.
- **Le rideau d'égaliseur** est une seule `div` masquée deux fois.
  - L'enveloppe porte une silhouette SVG en escalier, calculée une fois côté serveur et passée en
    `--masque`. Une marche par trait, de hauteur `0.24 + 0.76 * exp(-(|u| / 0.46) ^ 1.6)` avec `u`
    de -1 à 1, plus un aléa fixe `(((i * 7919) % 101) / 101 - 0.5) * 0.08` pour que le sommet vibre.
  - L'intérieur porte `linear-gradient(90deg, #000 0 42%, transparent 42%)` répété par
    `mask-size: calc(100% / var(--traits)) 100%`, soit un trait plein et un vide au pas des marches.
  - 200 traits sur grand écran, 72 sur la bande mobile. Seules des transformations bougent : il se
    lève en 1,4 s, respire de 3,5 % en 7 s, et une lueur en `mix-blend-mode: screen` le balaie en 11 s.
- **Le bouton rond** : 7,25 rem, vitre bleu sombre (`radial-gradient` et `backdrop-filter: blur(10px)`),
  anneau de 12 px, halo de 60 px. La vitre sombre tient le contraste : en blanc sur le faisceau cyan,
  le libellé ne se lisait pas.
- **Les flèches rondes** : 4,5 rem en vitre claire, 2,75 rem sur mobile. La classe ne porte pas
  `display` (retour R2, complément plus bas).
- **Les panneaux en perspective** : `perspective: 1600px` sur la grille, `rotateY(-10deg)` à gauche
  avec `transform-origin: 100% 50%`, `rotateY(10deg)` à droite avec `0% 50%`. Le bord intérieur ne
  bouge pas. Le panneau central flotte de 6 px en 6 s. Chaque élément de grille est une colonne, la
  légende en pastille au-dessus et le panneau en `flex: 1`, pour que les trois finissent à la même
  hauteur sans mordre sur la rangée suivante.
- **L'écho au pied de page** : le même champ en bande sous le grand logotype, masqué en fondu vers le
  haut pour ne pas faire d'arête.
- **Le repli** : `prefers-reduced-motion` coupe les animations et le rideau reste levé ; à
  l'impression, champ, stries et rideau disparaissent.
- **Les mesures**, à recopier : Lighthouse 100 en accessibilité, bonnes pratiques et SEO, sur mobile
  et sur ordinateur ; LCP mobile de 0,87 s avec le processeur ralenti 4× ; CLS à 0. Le hero ne
  charge aucune image.

Deux techniques de composant sont à noter dans le skill :

- **Les deux mondes par jetons.** Terouva définit ses couleurs sombres par défaut et les redéfinit
  dans `.monde-papier`. Les composants écrivent `text-ink` sans savoir dans quel monde ils sont
  rendus, ce qui permet de poser une carte papier sur l'aurore sans une ligne de plus.
- **Un état partagé qui garde la coquille côté serveur.** Les flèches vivent sur les bords du cadre,
  les panneaux en bas. Ils partagent l'exemple courant par un petit magasin de module lu avec
  `useSyncExternalStore`, instantané serveur à 0.

## 3. La mise à jour de `video-promo-muette`

Remplace `assets/promo.html` et `assets/rendre.mjs` par les versions de Terouva (`scripts/promo/`,
782 et 162 lignes) en gardant leurs commentaires. Puis ajoute au `SKILL.md` :

- **La couleur raconte le récit.** Le gabarit reprend les calques du site : `#champ`, `#chaleur`,
  `#etoiles`, `#stries`, `#rideau`. La chaleur reste entre 0,12 et 0,18 tant qu'on parle du
  problème, monte à 0,9 à 9,2 s quand le produit entre en scène, et finit à 1. Le rideau suit son
  propre minutage (`HAUTEUR_RIDEAU`). Tout passe par une fonction `paliers(t, points)`, donc reste
  piloté par le temps.
- **Une vitre derrière tout texte posé sur le clair** (`.vitre`). Sans elle, deux phrases ne se
  lisaient pas sur le rideau.
- **Le script fabrique aussi la copie du site et l'affiche.** En 16:9, il sort le master en 1080p,
  puis une copie 720p (`crf 23`, `+faststart`) et une affiche JPEG prise à 12,4 s. Plus aucune
  commande ffmpeg à lancer à la main.
- **Le poids a changé.** Un fond en dégradé et en stries coûte cher à l'encodage : le master 1080p
  est passé de 1,4 à 6,4 Mo, et la copie 720p pèse 2,3 Mo sans perte visible dans le lecteur.
  Corrige la phrase « Une animation de 29 secondes pèse environ 1,4 Mo ».

Dans son `bonds.meta.json`, mets `derniere_verif` au 2026-10-31 et complète la `note`.

## 4. Les retours

Les numéros libres commencent à R99 ; vérifie qu'aucun n'a été pris entre-temps. Garde le format du
fichier : ce qui s'est passé, puis la règle.

Nouvelles entrées, toutes *(Terouva, 2026-10-31)* :

- **Copier une référence, c'est copier tous ses calques.** Les incidents des étapes 1 et 6. Règle :
  l'inventaire de haut en bas avant le code, coché à la livraison, et la page entière derrière le
  hero.
- **Une forme de graphique décrite en mots se lit en bâtons.** Hugo a demandé des traits « comme des
  cordes, dans la forme d'une courbe sur certains graphiques ». La première version tendait six cordes
  le long de la courbe ; il voulait « des traits verticaux, graphique en bâtons », dont les sommets
  dessinent la courbe. Règle : écrire la lecture choisie en une phrase dans le message de livraison,
  pour que la correction arrive au premier tour.
- **Un fond qui remonte derrière le menu passe devant lui.** Le champ en `inset` négatif recouvrait
  le masthead, qui n'avait pas de contexte d'empilement. Règle : l'élément sous lequel un fond déborde
  reçoit `position: relative` et un `z-index` au-dessus, vérifié sur capture.
- **Un texte sur un faisceau clair se lit grâce à une vitre locale.** Le libellé blanc du bouton
  rond et deux phrases de la vidéo tombaient sous 4,5:1 au point le plus clair ; la mention en bleu
  clair aussi, corrigée en passant à l'encre. Règle : mesurer le contraste au point le plus clair du
  dégradé derrière le texte, et poser une vitre sombre sous le texte en gardant la lumière intacte.
- **Une mention « Lieu · Année » au-dessus d'un titre signe la page générée.** Hugo l'a fait retirer.
  Règle : pas de surtitre de lieu et d'année quand il n'apporte aucune information (une date
  d'événement en apporte une). Propose à Hugo d'en faire le signal n°39 de `signaux-vibecodes`, en
  AVERTISSEMENT, et attends sa réponse avant de l'ajouter.

Compléments datés, sans changer la règle de l'entrée :

- **R2** : revu sur Terouva. `.fleche-ronde { display: inline-flex }`, hors couche, battait `hidden`
  et les grandes flèches s'affichaient sur mobile. Correctif retenu : retirer `display` de la classe
  et le laisser à l'appelant (`inline-flex` ou `hidden lg:inline-flex`).
- **R19** : sous OneDrive, `.next` casse aussi en `EINVAL: readlink`, deux fois dans la même session.
  `rm -rf` demande une validation, donc le contournement est `mv .next .next-corrompu-<heure>` puis
  une nouvelle construction. Les dossiers renommés restent à supprimer à la main ; exclure `.next` de
  la synchronisation OneDrive évite la récidive.
- **R89** : deux fichiers parasites, `apps/web/0` et `apps/web/64rem)`, sont nés de commandes shell
  où un `>` non protégé faisait une redirection. Supprimés avec `rm --`.

## 5. Branchement et vérification

- Ajoute les deux skills à `core/loadouts/app-premium.json` et `core/loadouts/vitrine-premium.json`,
  juste après `creative-direction`. Pour `landing-conversion`, propose-le à Hugo sans l'ajouter.
- Sidecars `bonds.meta.json` : `source` et `sourceType` à `local`, `langue: "fr"`,
  `runtime: "markdown"`, `statut: "vérifié"` puisqu'ils ont tourné dans Terouva (voir
  `docs/ADMISSION.md`), `importe_le` et `derniere_verif` au 2026-10-31, `categories` à
  `vitrine-premium` et `app-premium`, et une `note` qui commence par « vérifié dans Terouva : ».
- `npm run manifest`, puis `npm run doctor` : les deux doivent passer.
- Ne touche pas au dépôt Terouva : `/bonds update` y apportera les deux skills quand Hugo le lancera.
- Un commit par livrable, en français, avec un corps qui dit pourquoi. Pas de `git push` sans
  validation d'Hugo.
- Ces skills parlent de tics : écris-les sans tiret cadratin et sans la tournure « ce n'est pas X,
  c'est Y » (retour R84).

## Les fichiers à lire

Racine locale : `C:/Users/hugo8/OneDrive/Desktop/Terouva`.

| Fichier | Ce qu'on y lit |
|---|---|
| [globals.css, lignes 8 à 118](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/app/globals.css#L8-L118) | Les jetons : nuit par défaut, `.monde-papier` en portée |
| [globals.css, lignes 120 à 210](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/app/globals.css#L120-L210) | Le champ, les stries, les étoiles |
| [globals.css, lignes 212 à 284](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/app/globals.css#L212-L284) | Le rideau d'égaliseur et ses trois animations |
| [globals.css, lignes 286 à 325](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/app/globals.css#L286-L325) | L'aurore du pied de page |
| [globals.css, lignes 327 à 435](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/app/globals.css#L327-L435) | Bouton rond, flèches, bascule, perspective, entrée en scène |
| [globals.css, lignes 804 à 840](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/app/globals.css#L804-L840) et [919 à 926](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/app/globals.css#L919-L926) | Les replis : impression, mouvement réduit |
| [PleinCadre.tsx](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/components/layout/coquilles/PleinCadre.tsx) | La coquille : grille à trois colonnes, rideau ; silhouette et masque aux lignes 124 à 178 |
| [Hero.tsx](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/components/sections/Hero.tsx) | Le contenu branché dans la coquille : titre, chiffres, bouton rond |
| [HeroExemples.tsx](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/components/sections/HeroExemples.tsx) | Flèches, trois panneaux, magasin partagé aux lignes 18 à 41 |
| [exemples.ts, lignes 198 à 202](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/lib/exemples.ts#L198-L202) | Les exemples de l'accueil, tirés des données de la démo |
| [Nav.tsx, lignes 31 à 48](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/components/layout/Nav.tsx#L31-L48) | Rubrique active à point orange, en-tête au-dessus du champ |
| [PiedLogotype.tsx](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/apps/web/components/layout/coquilles/PiedLogotype.tsx#L56) | Le logotype posé sur l'aurore |
| [promo.html](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/scripts/promo/promo.html) | Le gabarit vidéo : calques aux lignes 64 à 142, minutage et chaleur aux lignes 535 à 580, `rendre(t)` ligne 656 |
| [rendre.mjs, lignes 133 à 162](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/scripts/promo/rendre.mjs#L133-L162) | La copie 720p du site et l'affiche |
| [DESIGN.md, lignes 42 à 90](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/DESIGN.md#L42-L90) | Le récit des révisions du 31 octobre, avec les mots d'Hugo |
| [PROMPT-REFONTE-GRAPHIQUE.md](https://github.com/Barbudda/Terouva/blob/c8e83897ad9c5bbb53e50bafc2a10cbfc610eb9c/PROMPT-REFONTE-GRAPHIQUE.md) | Le prompt de refonte qui a précédé (retour R97) |

Les commits racontent les essais dans l'ordre, du plus ancien au plus récent. Lis-les avec
`git -C "C:/Users/hugo8/OneDrive/Desktop/Terouva" show <hash> --stat` :

| Commit | Étape |
|---|---|
| `a3cdc84` | La nuit devient la base, bleu électrique et orange |
| `e06a267` | Composition centrée sur l'aurore, entrée en scène |
| `472ec7a` | Des cordes en courbe, mention épurée : la lecture refusée |
| `2394e82` | Le graphique en bâtons à la place des cordes |
| `ed1b41f` | Rideau de lumière, bouton rond, panneaux en perspective : les trois étapes |
| `8f8560e` | Tout le hero suit le dégradé |
| `410ce76` | La référence copiée de haut en bas, l'aurore au pied |
| `c8e8389` | La vidéo refaite dans le design de l'accueil |
