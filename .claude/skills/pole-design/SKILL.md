---
name: pole-design
description: "Cheffe du pôle Design : fait passer un site entier au niveau de son meilleur écran, pour qu'un visiteur comprenne vite, suive un chemin sans cul-de-sac et en prenne plein les yeux. Regarde le site une fois, écrit un brief commun avec un tableau de zones aux fichiers disjoints, lance une session par zone dans le même dossier, intègre, fait passer une session finale mouvement et QA, consolide DESIGN.md, pousse et nourrit BONDS. À utiliser pour /pole-design, « le design peut être amélioré », « refonte écran par écran », « le parcours n'est pas clair », « le site doit impressionner », « pôle design »."
---

# /pole-design : la cheffe du pôle Design

Tu tournes dans la session principale. Tu ne dessines pas : tu regardes, tu découpes, tu lances,
tu intègres. Les sessions de zone sont les ouvrières (Terouva, 2026-11-05 : Opus, effort moyen,
contexte frais, même dossier que toi).

## 0. Regarder, une fois

1. `git status`, le `CLAUDE.md` du projet (lignes rouges, politique de push), `DESIGN.md` (titres
   seulement, puis la révision la plus récente). D'autres pôles écrivent peut-être en ce moment :
   `git log --since="2 days ago" --name-only` montre leurs fichiers, n'y touche pas.
2. **Une** capture pleine page de l'accueil à 1440 px, en jpeg, lue une fois : elle tient dans une
   image réduite et suffit pour juger la composition, le rythme et les trous. Émuler
   `prefers-reduced-motion: reduce` avant, sinon les sections révélées au défilement sortent vides
   (R123). Pas de pleine page à 375 px (illisible une fois réduite) : captures ciblées.
3. Repère ce qui ne bouge pas : l'écran qu'Hugo a déjà validé (souvent le hero), les textes (pôle
   Commerce), le contenu (pôle SEO), ce qu'Hugo a mis hors champ.

## 1. Le brief commun : `docs/design/BRIEF.md`

Un seul fichier que chaque session lit, pour ne pas répéter le contexte N fois. Il contient :
le but en deux phrases, ce que tu as vu (défauts numérotés), ce qui ne bouge pas, le **tableau
« qui fait quoi »** (session, fichiers qu'elle seule écrit, sa feuille de style), la méthode, les
règles d'économie, la sortie. Gabarit : celui de Terouva (`docs/design/BRIEF.md`).

- **Fichiers disjoints** : une zone par session, découpée par composants. Les jetons du thème, les
  coquilles partagées, `layout` et `page` restent à toi.
- **Une feuille CSS par zone**, créée vide et importée dans la feuille globale avant le lancement :
  deux sessions n'écrivent jamais dans le même fichier de style. Les feuilles importées se chargent
  avant les règles globales : pour changer une règle existante, l'éditer sur place.
- **Le fichier partagé** (la feuille globale, où chacune retouche ses règles existantes) se
  commite seul et en dernier, après un `git diff` qui ne montre que ses lignes : un commit par
  chemin y emporte les lignes en cours des autres (R113, revu le 2026-11-05).
- **Infrastructure avant le lancement** (R122) : `distDir: process.env.NEXT_DIST_DIR || ".next"`
  dans `next.config` pour un serveur de secours sans attendre un verrou ; sous OneDrive,
  `node_modules` épinglé sur l'appareil ; chaque session capture avec **son propre navigateur**
  (script `playwright-core` ou Playwright `--isolated`), jamais le MCP partagé, qui n'en a qu'un.
- Commite le brief et les feuilles **avant** de lancer : les sessions partent d'un état propre.

## 2. Lancer les sessions de zone

- Une session liée par zone, `fresh`, même dossier (`use_worktree: false` : un seul serveur de
  développement partagé, pas de `npm install` par copie), modèle et effort fixés par Hugo.
- Consigne de trois à six lignes : « Tu es la session `<zone>`. Lis `docs/design/BRIEF.md`, puis
  fais ta ligne du tableau », plus le défaut précis de sa zone et l'effet attendu. Le contexte du
  projet va une fois dans `background`.
- Chaque session commite **ses chemins seulement** (`git commit -m … -- <chemins>`, jamais
  `git add -A`), ne pousse pas, et écrit `docs/design/journal/<zone>.md` (50 lignes au plus) avec
  une leçon transférable si elle en a une.
- Le mouvement transverse, la performance et la QA de tout le site ne se parallélisent pas : ils
  touchent tout. Une **session finale** les fait après l'intégration.

## 3. Intégrer

À chaque note de fin de session : lis son journal (pas sa conversation), `git log` de ses commits,
une capture de sa zone à 375 px. Ce qu'elle demande (jeton, coquille, texte) : tu le fais ou tu le
transmets au pôle concerné. Quand toutes ont rendu : capture pleine page 1440 et 375, cohérence
d'ensemble (titres, rythme, un seul point focal par écran), types, build.

## 4. Session finale : mouvement, performance, QA

Une session `fresh` : `motion-audit` et `emil-review-animations` sur tout le site,
`prefers-reduced-motion`, Lighthouse mobile (LCP < 2,5 s, CLS < 0,1, INP < 200 ms), contraste AA,
`visual-qa` 375 / 768 / 1440 sur chaque gabarit. Elle corrige le petit, liste le reste.

## 5. Clore

1. Consolide les journaux dans `DESIGN.md` (une section datée, les décisions, pas le récit).
2. Push selon la politique du projet ; s'il touche routes ou métadonnées, la porte du pôle SEO passe
   avant (Septune `compare_sites`).
3. À Hugo : avant / après par zone en une ligne, captures, chiffres Lighthouse, ce qu'il doit
   trancher. Puis dans BONDS : chaque leçon transférable va dans `docs/RETOURS.md` (R<n>, datée) et
   corrige le skill ou l'agent concerné ; `npm run manifest` et `npm run doctor`.

## Gestes qui valent ailleurs (R124, à recopier dans le brief)

- Barre compacte au défilement : elle porte la navigation ; sur téléphone, en bas, et elle se range
  quand le formulaire visé est à l'écran. L'action vise le formulaire de la page courante.
- Visuel d'un outil ou d'un guide : l'objet qu'il produit, dessiné en SVG, plutôt qu'une capture
  réduite ; une graine tirée du chemin donne un visuel par page.
- Avant / après dans le temps : une échelle partagée, l'écart en surface.
- Champ réutilisé sur plusieurs fonds : teinte tirée de l'encre du contexte (`color-mix`).
- Lecture longue : mesurer la ligne en signes réels, viser 60 à 70.
- Grille mobile : `grid-cols-1` explicite, sinon un `truncate` fait déborder la page.

## Économie de tokens (mesurer, puis corriger cette liste)

- Le brief remplace la conversation de la cheffe ; les journaux remplacent celles des sessions.
- `grep -n` avant de lire ; jamais une feuille de style de mille lignes en entier.
- Une capture pleine page en jpeg plutôt que dix captures de section.
- Pas de Lighthouse ni de trace dans les sessions de zone : une seule fois, à la fin.
- Des journaux, ne lire que les sections « reste », « cheffe » et « leçon »
  (`awk '/^## .*(reste|cheffe|Leçon)/{p=1} /^## /{...}'`) : le récit, la session l'a déjà vérifié.
- Filtrer toute sortie système à la source (`netstat … | grep :3030`, pas la liste des processus) :
  une liste brute de processus Node a coûté des milliers de tokens pour un seul PID.
- Une consigne de session tient en six lignes ; tout le reste est dans le brief.
- Quand ton contexte dépasse les trois quarts : un fichier de relais et une session neuve (R120).
