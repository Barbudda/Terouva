# Terouva — Claude Code Configuration

## ⚡ Coordination avec Second (À LIRE EN PREMIER, à chaque session)

Ce projet est **piloté par Second**, un majordome IA (daemon séparé). Toi et Second
travaillez **de pair** via un **bus de fichiers** dans `.claude/second/` :

- `.claude/second/inbox.md` — **Second → toi** : les tâches qu'il t'assigne. **Tu le lis, tu n'y écris pas.**
- `.claude/second/outbox.md` — **toi → Second** : tes comptes-rendus (append en bas).
- `.claude/second/PROTOCOL.md` — les règles du bus.

**Au début de chaque session, lance le skill `/second-sync`** : il lit l'inbox,
te résume les tâches en attente et t'aide à en prendre une. Quand tu finis une
tâche, rends compte dans l'outbox (le skill le fait). C'est ainsi que Second sait
ce que tu fais et inversement.

### 🚫 Lignes rouges Terouva (non négociables)
- On **observe**, on ne **pilote pas** Leboncoin. Pas de bot, pas d'envoi
  automatique, pas d'évasion anti-détection. **L'humain valide et envoie.**
- Jamais de secret/credential commité. Jamais de fausses annonces sur LBC.

---

## Rules

- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary — prefer editing existing files
- NEVER create documentation files unless explicitly requested
- NEVER save working files or tests to root — use `/src`, `/tests`, `/docs`, `/config`, `/scripts`
- ALWAYS read a file before editing it
- NEVER commit secrets, credentials, or .env files
- NEVER add a `Co-Authored-By` trailer to user commits unless this project's `.claude/settings.json` has `attribution.commit` set (#2078). The Claude Code Bash tool may suggest one in its default commit-message template — ignore it. `Co-Authored-By` is semantic authorship attribution under git/GitHub convention; the tool is the facilitator, not a co-author.
- Keep files under 500 lines
- Validate input at system boundaries

## Équipement BONDS (2026-09-15)

Terouva a trois surfaces : `apps/web` (site Next.js, vitrine et SEO du produit), `apps/desktop`
(app Tauri + Vite + React, le vrai produit) et `apps/extension` (Chrome MV3). Le bloc BONDS en fin de
fichier (loadout `app-premium`) fixe la barre de design et le protocole « pas l'air fait par une IA »
pour les deux premières ; l'extension suit les mêmes règles de craft à son échelle.

- **Priorité au rendu** sur `apps/web` et sur l'interface de `apps/desktop` : direction artistique
  écrite dans `DESIGN.md` avant toute refonte (skills `creative-direction`, `taste-skill`,
  `frontend-design` ; graines dans `.claude/design-md/`, `linear.md` et `superhuman.md` collent au ton
  d'un outil rapide et sobre). Le site existant n'est pas à réécrire d'un bloc : on l'élève écran par
  écran, `/impeccable audit` puis `/bonds audit` à chaque livraison.
- Les **lignes rouges Terouva** plus haut priment sur tout skill ou agent : observer Leboncoin, jamais
  le piloter ; l'humain valide et envoie.
- L'outillage claude-flow/ruflo installé en juin a été retiré le 2026-11-04 (agents, commandes,
  helpers, hooks, 34 skills, serveurs MCP `ruflo`, `ruv-swarm`, `flow-nexus`) : il n'était pas
  utilisé et ses hooks tournaient à chaque appel d'outil. Il reste dans l'historique git si besoin.
  Les agents BONDS suffisent, en petits lots séquentiels.
- Le bus Second (`.claude/second/`, `/second-sync`) est en pause avec Second : lire l'inbox si elle
  contient quelque chose, ne pas attendre de réponse.
- `bonds-lock.json` trace ce que BONDS a installé ; `/bonds update` le met à jour (loadout et pôles).
  L'inventaire complet et commenté est dans `docs/ARSENAL-BONDS.md`.

## Organisation en pôles (décisions d'Hugo du 2026-11-04)

Le travail est réparti en **trois pôles**, chacun piloté depuis sa propre session par un chef (un
skill qui tourne dans la session principale, parce qu'un sous-agent ne peut pas en lancer d'autres)
et ses sous-agents installés par `/bonds pole <id>` :

| Pôle | Chef | État |
|---|---|---|
| SEO & GEO | `/pole-seo-geo`, dix-sept agents `seo-*` / `geo-*` / `blog-*`, contexte dans `docs/seo/` | installé |
| CTO & Commerce | à créer dans BONDS sur le modèle de `pole-seo-geo` | session à part |
| Design | à créer dans BONDS sur le modèle de `pole-seo-geo` | session à part |

Décisions qui valent pour tous les pôles :
- **Modèle économique** : freemium avec clé de licence (base gratuite, fonctions avancées payantes,
  compatible local-first). Paliers et prix à fixer par le pôle CTO & Commerce ; `llms.txt` annonce
  encore « abonnement autour de 12 € par mois » et sera aligné quand ils le seront.
- **Leboncoin d'abord** : pas d'autre site d'annonces avant le lancement sur Leboncoin.
- **Pôle SEO & GEO : le site web seulement** (Hugo, 2026-11-04 au soir). On ne travaille pas sur
  l'extension ; l'objectif est la visibilité du site, d'abord par un blog en volume (voir
  `docs/seo/BRIEF.md`, « Blog en volume »).
- **Git** : commits et push autorisés sans validation préalable (le push déploie sur Vercel : la
  porte Septune `compare_sites` passe avant tout push qui touche au site). Achats, comptes et
  publications externes restent à Hugo.

### Mise à jour du 2026-10-06

**`docs/ARSENAL-BONDS.md` explique désormais, en français, chacun des 76 éléments installés** : à quoi
sert chaque skill, chaque agent, chaque serveur MCP, d'où il vient, et où tout se range. Ce fichier est
généré (`node "<BONDS>/scripts/inventaire.mjs" .`) et réécrit à chaque `/bonds update` : ne pas l'éditer
à la main. C'est le point d'entrée quand on se demande « c'est quoi ce dossier dans `.claude/skills` ».

Sept skills ont été ajoutés au passage, venus de l'enrichissement du core début octobre :

| Skill | Quand s'en servir |
|---|---|
| `web-performance` | Optimisation web générale : images, scripts, Core Web Vitals. Le premier levier reste les images. |
| `modern-web-guidance` | Guides de l'équipe Chrome sur le CSS et les API récentes (View Transitions, container queries, `oklch`, `text-wrap`). À consulter avant de bricoler un polyfill. |
| `ux-writing` | Microtextes : libellés de boutons, messages d'erreur, états vides. Ce qui fait qu'une interface parle comme un humain. |
| `ui-slop-audit` | Audit visuel qui traque les défauts d'interface générée, en complément d'Impeccable. |
| `no-ai-slop` | Supprime une vingtaine de tournures d'écriture typiques d'une IA, en gardant la voix de l'auteur. |
| `sepia` | Dé-IA-isation en trois passes (structure du récit, discours, surface) avec une grille de 30 traits. Le plus rigoureux des trois. |
| `avoid-ai-writing` | Détecteur déterministe d'« AI-isms » plus réécriture en deux temps. Utile sur un texte déjà écrit. |

Les trois derniers se recoupent avec `hermes-humanizer` déjà présent : en prendre **un seul** par texte,
pas les quatre à la suite. Pour Terouva, la refonte éditoriale « petites annonces » est déjà faite ;
ces skills servent surtout aux textes à venir (nouvelles pages, messages de l'app, notes de version).


<!-- bonds:start -->
# CLAUDE.md — Terouva

> Équipé par BONDS le 2026-09-15 — loadout `app-premium` (application premium immersive).
> **Ne pas éditer entre les balises `bonds:start` / `bonds:end`** : ce bloc est régénéré par
> `/bonds update`. Écrire les règles propres au projet au-dessus ou en dessous du bloc.
> Ce qui est installé ici (source, hash, date) est tracé dans `bonds-lock.json`.

## Ambition

Une app qu'on prend pour le produit d'une marque, pas pour une maquette : **premium, minimale,
mobile-first, immersive**. Chaque écran a un point focal, une matière, un rythme. Aucun écran ne doit
ressembler à un tableau de bord de starter. **Jamais un rendu standard si une amélioration ambitieuse
est possible** : quand deux solutions tiennent, prends la moins attendue mais défendable, justifie-la
en une phrase, exécute. L'immersion se gagne par la lumière, la typographie, la vidéo et le mouvement
maîtrisé, pas par des effets empilés.

## Règles d'or (à appliquer systématiquement)

1. **Docs fraîches d'abord** : avant de coder contre une API ou une lib externe (Next, motion,
   GSAP, R3F…), consulte **context7** — la mémoire d'entraînement peut être périmée.
2. **Comprendre avant de modifier** : `git status` / `git diff` (MCP git) avant toute modification.
3. **Mémoire des décisions** : décisions importantes via **memory** ; structurantes → ADR dans
   `docs/adr/`. La direction artistique et le modèle de données sont des décisions structurantes.
4. **Vérifier l'UI** : après un changement d'interface, capture (playwright-cli) mobile d'abord,
   puis tablette et desktop, et regarde-les vraiment. Jamais de « ça devrait marcher ».
5. **Raisonnement structuré** : tâche complexe → **sequential-thinking** avant d'agir.
6. **Agents pour le complexe** : `creative-director` pour la direction, `interaction-designer`
   pour les parcours et micro-interactions, `motion-designer` pour la chorégraphie, `visual-qa`
   avant de déclarer fini, `design-craft-expert` sur chaque composant.
7. **Plan bref puis exécution** : grosse modif → plan court, validation, puis exécution.
8. **Tester puis documenter** : typecheck + tests, captures, puis mise à jour de la doc.
9. **Autonomie sur le réversible** : avance seul quand l'action est réversible.

## Garde-fous (demander validation avant)

- `rm -rf`, `git reset --hard`, `git clean -fd`, suppression de fichiers importants.
- `git push`, merge de PR, mise en production.
- Tout **achat, paiement, inscription, action juridique** (polices payantes, vidéos ou images sous licence).
- Publication d'un **secret** : les clés vivent dans `.env` (git-ignoré), jamais ailleurs.
- Toute action **irréversible** → confirmer d'abord.

## Méthode machine

- **Lis un fichier avant de l'écraser** : relis-le d'abord, puis édite au plus juste.
- Style de sortie **« Concise »** conseillé (`/config` → Output style) : résultats d'abord, sans narration.
- **Petits lots séquentiels** : les rafales d'appels parallèles se télescopent sur cette machine.
- **Windows 11 + OneDrive** : pas de dépendance native, pas de symlink, chemins entre guillemets.
  Préférer le Bash tool aux commandes PowerShell.
- **`npx` uniquement** ; Python 3 en **stdlib seulement** (img2threejs), pas de `pip`.

## Convention française

- Commentaires en français, denses et utiles (le pourquoi, pas le quoi).
- Commits en français : un sujet par commit, corps qui explique la raison.
- Identifiants de code en anglais ; textes d'interface dans la langue de l'app.

## Pipeline design (obligatoire, dans cet ordre)

1. **Graine** : un `DESIGN.md` de référence est copié dans `.claude/design-md/` ; sinon
   `taste-skill` seul. La graine s'adapte au projet, elle ne se copie jamais telle quelle.
2. **Direction** : `taste-skill` (design-taste-frontend) + `frontend-design` + `creative-direction`
   → **un mot de ton**, une **palette non conventionnelle**, **2 polices distinctives**, une densité
   (aérée ou dense, pas les deux), un **système de lumière** (fond, surfaces, élévations). Consigner
   le résultat dans `DESIGN.md` à la racine du projet.
3. **Exécution / vérification** : `/impeccable shape` (structure) → `craft` (finition) →
   `audit` / `critique` sur chaque écran. Un audit rouge se corrige, il ne se commente pas.
4. **Preuve** : `playwright-cli` captures mobile / tablette / desktop + Lighthouse via
   `chrome-devtools` (`lighthouse_audit`). Les chiffres vont dans le message de fin.

## Règles de craft (fusion de `react-design-craft` ; en cas de conflit, ce bloc prime)

- **Stance esthétique avant le code** : 2 polices distinctives (serif éditoriale + grotesque de
  caractère ; **Inter, Geist et Space Grotesk exclues par défaut**), 1 accent fort + 2-3 neutres
  riches sur un **fond teinté ou texturé, jamais blanc pur** ; violet-et-noir, néon et pastels
  basiques exclus par défaut ; un mot de ton tenu dans chaque décision.
- **Tokens** dans `@theme` (Tailwind v4) en `oklch` ; aucun hex sauvage dans les composants.
- **Mobile d'abord** : concevoir à 375 px, puis élargir ; zones tactiles ≥ 44 px ; navigation
  principale accessible au pouce ; jamais de tableau qui déborde sur mobile.
- **Construire par couches** : structure → typographie → couleur et surface → micro-détails
  (hover, transitions 150-300 ms, arrondis) → animation seulement si elle clarifie.
- Espacements en **multiples de 4 px** ; contraste **≥ 4,5:1** (AA) sur tout texte.
- Chaque élément interactif a un état **hover et focus visibles** ; ordre de tab logique.
- **Animations** : `motion/react`, **jamais `framer-motion`** ; GSAP pour les séquences ; easing sur
  mesure, jamais `linear` brut ; les skills `emil-animate` et `emil-animation-vocabulary` fixent le
  vocabulaire ; `emil-review-animations` relit avant de livrer.
- **Icônes : Phosphor, Tabler ou SVG maison ; lucide seulement si personnalisé et cohérent.**
  `@radix-ui/*` pour les primitives accessibles.
- **Pas de décor par défaut** : ni orbes flous, ni grille de points, ni sparkles, ni flèche qui
  glisse au hover ; ombres douces à une seule direction, jamais d'ombre portée partout.
- **États designés** : chargement (squelettes fidèles à la mise en page), vide (première visite,
  aucune donnée), erreur, succès ; jamais un simple « Loading… ».
- **Vidéo** : lecteur aux commandes dessinées (pas les contrôles natifs), affiche soignée, progression
  visible, reprise là où on s'est arrêté ; l'immersion vient de l'image, pas d'un cadre chargé.
- **Parcours** : une question par écran quand on interroge l'utilisateur, indicateur d'avancement,
  retour possible, validation claire ; la fin d'un parcours est un moment, pas une redirection sèche.
- **Données** : fixtures typées et réalistes dans `src/data/` (noms, dates, progressions crédibles),
  un seul point d'accès (store ou hooks), persistance locale quand la démo l'exige ; pas de Lorem.
- **Pas de reset CSS global** (`* { margin: 0 }`) : Tailwind s'en charge.
- Pas de `style={{ }}` quand une classe suffit ; pas d'animation sur chaque élément (effet de
  foire) ; pas de dégradé rainbow.
- Pas de composant générique sans personnalité (card blanche, bouton bleu, hero centré à dégradé).
- Un seul point focal par écran ; un moment « wow » par parcours, pas dix.
- 3D / images : GLB Draco ou meshopt, images AVIF/WebP, lazy hors viewport, **repli mobile**
  (scène allégée ou image) obligatoire ; la 3D reste réservée aux moments d'accueil.

## Signaux « vibecodé » à éviter

Huit **BLOQUANT**, numérotés comme dans `/bonds audit` (catégorie « Signaux vibecodés ») :

- **#1** dégradé violent dans le hero (`bg-gradient-to-*` entre teintes saturées éloignées).
- **#4** texte arc-en-ciel (`bg-clip-text` + dégradé à trois teintes ou plus).
- **#7** emojis dans les textes d'interface ou le README.
- **#9** tirets cadratins (—) dans les textes d'interface, en français comme en anglais.
- **#12** faux témoignages (« John Doe », « Sarah K. », blocs cinq étoiles répétés, « CEO at Acme »).
- **#15** la tournure « ce n'est pas X, c'est Y » / « it's not X, it's Y ».
- **#26 / #27** CGU ou politique de confidentialité absentes alors qu'un formulaire, une newsletter,
  un outil d'analytique ou un paiement existe (sans eux : AVERTISSEMENT).

Les 22 autres (AVERTISSEMENT) : skill `signaux-vibecodes` et `/bonds audit`. Pour une app, les plus
tentants sont #3 (fond blanc pur), #10 (Inter), #19 (tout arrondi), #21 (pas de squelette), #28 (hover partout).

## Barre perf et accessibilité (bloquante)

| Mesure | Seuil | Outil |
|---|---|---|
| LCP | < 2,5 s sur mobile | `chrome-devtools` `lighthouse_audit` |
| CLS | < 0,1 | idem |
| INP | < 200 ms | idem |
| Animations | 60 fps, pas de jank, CPU 4× sur mobile | `chrome-devtools` trace perf |
| Contraste | AA (≥ 4,5:1) | Lighthouse a11y + `/impeccable audit` |
| `prefers-reduced-motion` | repli statique respecté | émulation `chrome-devtools` / playwright |

## Pas-IA (résumé) — checklist complète : `/bonds audit`

Pas « fini » tant qu'un critère **BLOQUANT** échoue, sauf dérogation explicite d'Hugo consignée
dans `bonds-lock.json` (`derogations`). Visuel : Impeccable `/audit` propre, zéro Lorem, pas de
look par défaut, zéro signal vibecodé bloquant, un point focal, états designés. Texte :
`hermes-humanizer`, aucun tic d'IA. Code + git : pas de commentaire signature IA, README sans
emojis, commits crédibles. Perf / a11y : la barre ci-dessus.

## Arsenal installé

### Skills (`.claude/skills/`)
- taste-skill — Skill anti-slop (v2 expérimental) pour landing pages, portfolios et refontes : lit le brief, déduit la direction de design via trois curseurs (VARIANCE / MOTION / DENSITY), impose un pré-vol strict et des squelettes GSAP pour livrer des interfaces qui n'ont pas l'air templatées.
- impeccable — Skill /impeccable (Paul Bakaus) : direction artistique et exécution frontend en une commande (shape, audit, critique, polish, animate, colorize, harden, optimize…) avec des agents dédiés et un hook de détection d'anti-patterns design après chaque édition.
- signaux-vibecodes — Les 30 signaux qui font dire « site vibecodé » (reel aj.on.ai, 2026), avec sévérité, raison et alternative, plus un protocole avant / pendant / après pour designer hors défauts.
- frontend-design — Skill officiel Anthropic de design front-end, réécrit pour lister les tics de page générée (mot accentué, labels en capitales, numéros décoratifs, fade-and-slide-up, trois looks IA) ; graine directe pour signaux-vibecodes.
- react-design-craft — Composants React de qualité exposition : stance esthétique avant le code, tokens CSS, construction par couches, anti-templates.
- ui-ux-pro-max — Base de connaissances UI/UX (styles, palettes, pairings de polices, guidelines UX) pour orienter une interface web ou mobile.
- sheleg-design — Couche de goût en Markdown pur : 39 packs de style verrouillés (tokens, palettes, typographies serif/grotesque/mono propres à chaque pack) et une doctrine de mouvement à horloge de scroll unique avec repli statique, pour les landing pages cinématiques du loadout vitrine-premium.
- creative-direction — Pose une direction artistique avant le code : concept visuel, palette, typographies, style d'animation et signatures visuelles.
- luxury-design-system — Design system haut de gamme : palette, typographies fortes, spacing cohérent, composants et états animés.
- interaction-lab — Interactions avancées : hover magnétique, curseur custom, menus animés, transitions de page, drag et carrousels inertiels.
- image-transformation-lab — Effets avancés sur images : morphing, displacement maps, hover reveal, avant/après, carrousels immersifs et masques animés.
- motion-audit — Audite les animations d'un site : fluidité, durées, easing, cohérence, utilité, performance et prefers-reduced-motion.
- visual-performance-optimizer — Optimise LCP/CLS/INP, images, vidéos, textures, GLTF, shaders et bundle sans sacrifier la qualité visuelle.
- emil-animate — Skills d'animation de référence (animate, review-animations, animation-vocabulary, apple-design, prototype) pour vitrine et SaaS.
- emil-review-animations — Skills d'animation de référence (animate, review-animations, animation-vocabulary, apple-design, prototype) pour vitrine et SaaS.
- emil-animation-vocabulary — Skills d'animation de référence (animate, review-animations, animation-vocabulary, apple-design, prototype) pour vitrine et SaaS.
- gsap-core — Huit skills officiels GSAP (core, timeline, ScrollTrigger, SplitText, React useGSAP, performance) pour les vitrines animées.
- gsap-react — Huit skills officiels GSAP (core, timeline, ScrollTrigger, SplitText, React useGSAP, performance) pour les vitrines animées.
- gsap-scrolltrigger — Huit skills officiels GSAP (core, timeline, ScrollTrigger, SplitText, React useGSAP, performance) pour les vitrines animées.
- gsap-performance — Huit skills officiels GSAP (core, timeline, ScrollTrigger, SplitText, React useGSAP, performance) pour les vitrines animées.
- scroll-craft — Sites scroll-driven premium avec huit grammaires de page, un « fingerprint gate » anti-répétition et des refus explicites des tics IA (vitrine).
- immersive-landing-page — Construit une landing page niveau Awwwards : hero mémorable, sections cinématiques, animations au scroll, micro-interactions.
- webgl-hero — Hero WebGL spectaculaire : particules, displacement, distorsion d'image, shaders et transitions premium.
- threejs-r3f-scene — Scène 3D web avec Three.js / React Three Fiber / Drei : modèles GLTF, lumières, caméra animée, shaders simples, repli mobile.
- img2threejs — Transforme une image de référence (objet ou personnage) en modèle Three.js procédural généré par étapes et validé par des gates qualité, avec des scripts Python stdlib pour l'analyse, la spec et la validation.
- ecc-frontend-patterns — Patterns frontend React/Next.js : gestion d'état, performance, composition de composants et bonnes pratiques UI.
- ecc-backend-patterns — Patterns backend Node.js/Express/Next.js : architecture d'API, accès base de données et pratiques côté serveur.
- ecc-security-review — Checklist de revue sécurité pour l'authentification, les entrées utilisateur, les secrets, les endpoints et les paiements.
- playwright-cli — CLI Playwright pilotée depuis le terminal (open, goto, click, snapshot, screenshot, pdf, traces, mocks réseau) qui sert de preuve visuelle desktop/tablette/mobile ; le skill documente les commandes pour l'agent.
- writing-plans — Rédige un plan d'implémentation détaillé, découpé en tâches vérifiables, à partir d'un design validé.
- executing-plans — Exécute un plan d'implémentation étape par étape, avec points de contrôle et revue entre chaque lot.
- brainstorming — Dialogue de cadrage avant tout développement : explore l'intention, les besoins et le design d'une fonctionnalité avant d'écrire du code.
- systematic-debugging — Méthode de débogage systématique : reproduire, isoler, formuler une hypothèse et la vérifier avant de corriger.
- test-driven-development — Cycle rouge-vert-refactor strict : écrire le test qui échoue avant le code, puis nettoyer.
- verification-before-completion — Impose de prouver qu'un travail est terminé (tests, sortie réelle) avant de le déclarer fini.
- ecc-coding-standards — Standards de code universels TypeScript/JavaScript/React/Node : nommage, structure, gestion d'erreurs, bonnes pratiques.
- token-economy — Économie de tokens : plan mode, /compact, sous-agents, sortie plafonnée et maintien d'un CODEMAP du projet.
- hermes-humanizer — Réécrit un texte pour supprimer les tics d'écriture IA et lui rendre une voix humaine et précise.
- grill-me — Interroge l'utilisateur sur son plan jusqu'à résoudre toutes les branches de décision avant de coder (base).
- zero-slop — Skill d'édition plus scoreur hors-ligne (294 motifs pondérés, lexique de 96 termes, Python stdlib) et CLI `npx zero-slop score` qui repèrent les tournures IA, réécrivent en préservant noms, chiffres, liens et citations, et notent la prose de 0 à 100 ; pour la passe texte pas-IA de tout projet.
- clear-writing — Audit des tics d'écriture IA (mots creux, remplissage, modaux d'esquive) et anglais technique simplifié ASD-STE100 pour la doc, l'aide en ligne et la microcopy ; loadout base, en complément de humanizer.

### Agents (`.claude/agents/`)
- design-craft-expert — Ingénieur front et designer UI : composants React de qualité exposition, conçus et non assemblés, via la skill react-design-craft.
- creative-director — Directeur artistique web premium : direction visuelle, concepts, niveau Awwwards et cohérence esthétique du site.
- motion-designer — Expert animation web (GSAP, Framer Motion, ScrollTrigger, Lenis) : chorégraphie des transitions, micro-interactions et scroll.
- interaction-designer — Designer d'interactions : curseur custom, hover, drag, navigation animée, carrousels, transitions de page et micro-feedbacks.
- visual-qa — Contrôle qualité visuelle via Playwright : captures desktop/tablette/mobile, bugs visuels, cohérence design et revue d'animations.

### MCP (`.mcp.json`)
- playwright — Pilotage d'un navigateur (navigation, captures, formulaires) pour tester et vérifier visuellement.
- chrome-devtools — Chrome DevTools en MCP : audits Lighthouse, traces de performance, réseau, console et captures pour mesurer LCP/CLS/INP.
- prodcheck — Checklist de mise en production (sécurité, perf, scaling, Stripe, Supabase, Vercel, Next.js) servie en MCP et en skill de revue, à passer avant de lancer un SaaS ou une vitrine.
- context7 — Documentation à jour des bibliothèques et frameworks, injectée à la demande.
- sequential-thinking — Raisonnement pas à pas structuré pour les problèmes complexes.
- memory — Graphe de connaissances persistant entre sessions (entités, relations, observations).
- git — Opérations git (status, diff, log, commit, branches) sur le dépôt du projet.
<!-- bonds:end -->

<!-- bonds:pole:seo-geo:start -->
## Pôle SEO & GEO

> Installé par BONDS le 2026-11-04 (`equip --pole=seo-geo`). Bloc régénéré par `/bonds update` : écrire
> les règles propres au projet hors des balises `bonds:pole:seo-geo`.

**Point d'entrée : `/pole-seo-geo`.** Le chef tourne dans la session principale (ses agents y sont visibles), mesure, choisit le
chantier, le confie aux sous-agents (trois en parallèle au plus, jamais deux sur le même fichier),
vérifie, commite et tient le journal. Un sous-agent ne lance pas d'autres sous-agents : ne pas les
appeler en chaîne, passer par le chef.

- Contexte du projet : `docs/seo/BRIEF.md` (obligatoire), `docs/seo/REGISTRE.md`, `docs/seo/FAITS.md`,
  `docs/seo/JOURNAL.md`. Contrat commun des agents : `.claude/skills/pole-seo-geo/CONTRAT.md`.
- Rien d'inventé : chaque chiffre ou fait juridique publié a sa source et sa date dans `FAITS.md`.
- Porte anti-régression avant tout push qui touche routes, métadonnées, robots ou sitemap : Septune
  `compare_sites`, production en référence, prévisualisation publique de la branche en candidat
  (Septune hébergé refuse `localhost`, retour R112 de BONDS).
- Aucune action externe par les agents (store, forum, réseau, e-mail) : brouillons dans
  `docs/seo/brouillons/`, Hugo publie.

### Sous-agents
- seo-analyste — Mesure l’état réel d’un site (Septune technique et GEO, Search Console, GA4, trafic IA, test de visibilité dans les LLM) et tient la section Mesures du journal SEO.
- seo-registre — Construit et tient le registre unique des requêtes et des pages : questions réellement tapées, intention, lien produit, page cible, écart concurrentiel et priorité.
- seo-redacteur — Écrit ou réécrit une page de contenu à partir du registre : structure question-réponse, faits sourcés et datés, liens vers l’outil, voix humaine sans tics d’IA.
- geo-citabilite — Rend un site citable par les assistants IA : intertitres en questions, réponses autonomes de 40 à 60 mots, faits datés, schéma JSON-LD, llms.txt, entité cohérente et sameAs.
- seo-gardien-technique — Métadonnées, canoniques, sitemap, robots, rendu, Core Web Vitals, IndexNow, et la porte anti-régression Septune compare_sites avant un push sensible.
- seo-maillage — Pose le maillage interne (paires manquantes, contenu vers outil, hubs, fil d’Ariane) et trace le chemin page d’entrée organique vers inscription ou installation.
- seo-outils — Transforme une intention « calculer » ou « générer » du registre en outil web gratuit, rendu serveur, calcul côté client testé, schéma WebPage honnête, relié au guide et au produit.
- seo-fiches-stores — Prépare les fiches de stores (Chrome Web Store, Edge, Firefox) : nom, descriptions, permissions justifiées, confidentialité, plan des captures. Ne publie jamais.
- seo-autorite — Cartographie où le produit mérite d’être mentionné et lié, tient le plan de liens entrants et les profils d’entité, prépare des brouillons. Ne poste ni n’envoie rien.
- seo-fraicheur — Repère pages en déclin, faits vieillissants et quasi-doublons, tient la file de rafraîchissement et met à jour les faits et dates des pages.
- seo-pages-villes — SEO programmatique et local : une page par lieu seulement si le lieu change la réponse, données publiques datées, seuil anti-contenu mince, déploiement par lots mesurés.
- seo-visuels — Images de partage, schémas et infographies en SVG ou code, graphiques de données, textes alternatifs et formats, dans la direction artistique du projet.
- blog-redacteur-en-chef — Fixe la ligne éditoriale du blog (piliers, clusters, formats), tient le calendrier saisonnier, écrit un brief par article et pousse les signaux de confiance (politique éditoriale, pages auteur).
- blog-veille-juridique — Suit les changements de règles et de chiffres officiels depuis les sources officielles, propose les articles d’actualité et signale les guides et faits devenus faux.
- blog-donnees — Produit des études originales sur données publiques ouvertes, avec script reproductible et méthode publiée : les chiffres que les assistants et la presse citent.
- blog-relecteur — Relit avant publication, distinct de l’auteur : faits contre leur source, lignes rouges, inventions, structure question-réponse, cannibalisation, liens, voix. Rend un verdict.
- blog-diffusion — Décline chaque article publié en brouillons pour e-mail, LinkedIn, X, forums et flux, et tient le calendrier de diffusion. Ne publie ni n’envoie rien.

### Skills du pôle
- pole-seo-geo — Chef du pôle SEO & GEO : mesure, choisit le chantier le plus rentable, le confie à dix-sept sous-agents (seo-*, geo-*, blog-*) en petits lots visibles dans la session, vérifie (Septune compare_sites), commite et tient le journal.
- blog-en-serie — Produire des articles en masse au moindre coût : un fichier par article en Markdown aux champs déduits, faits cités mot pour mot, vérificateur automatique, contrôle des citations par script, relecture réduite à ce qu’une machine ne juge pas.
- septune-audit — Auditer le SEO technique par la mesure avec le MCP Septune (sans clé ni IA) : 69 règles (au 2026-11-04), audit d'un site ou d'une page sur une URL publique (le serveur hébergé refuse localhost), comparaison production / prévisualisation pour attraper une régression avant le push, patchs par framework, audit des robots IA et génération de llms.txt.
- seo-technique — SEO technique : balises, sitemap, robots, performance, données structurées.
- seo-aeo-best-practices — Métadonnées, Open Graph, sitemap, robots.txt, hreflang, JSON-LD et EEAT pour moteurs classiques et réponses IA (vitrine, SaaS).
- ai-seo — Référencement dans les réponses IA (AEO/GEO) en complément du SEO classique.
- seo-audit-canaux — Audite et corrige un site sur cinq canaux (SEO, AEO, GEO, LLMO) avec score, sans clé.
- seo-vagues-sourcees — Faire monter un site sans budget pub, dans Google et dans les assistants IA : registre unique des pages, vagues écrites par des agents en parallèle avec faits sourcés et datés, pages produit par plateforme, llms.txt, pricing.md, robots IA, IndexNow, et guides pour le propriétaire.
- recherche-mots-cles — Construire un registre de requêtes cibles sans abonnement : sources gratuites (Search Console, autocomplétion, questions posées, Trends, Keyword Planner, forums), lecture de SERP en six questions à la place de l'indice de difficulté, classement par intention, priorisation par gain sur effort.
- ecart-concurrentiel — Trouver ce que les concurrents captent et qu'on ne capte pas : identifier les vrais concurrents par la SERP, relever leur arborescence par sitemap et titres, regrouper par thème, croiser avec son registre, choisir l'angle d'attaque. Recettes d'algèbre d'ensembles de domain_domains quand le MCP Semrush est là.
- metriques-seo — Ce que mesure vraiment chaque métrique SEO et comment la lire : volume, CPC, densité concurrentielle, difficulté, intention, score d'autorité, domaines référents, ancres, visibilité, CTR par position. Chaque entrée donne l'ordre de grandeur utile et le contresens classique.
- semrush-mcp — Piloter le MCP Semrush sans gaspiller d'unités : les 10 toolkits et 66 rapports, le parcours découverte / schéma / exécution, la grammaire des paramètres (bases régionales, filtres serveur, colonnes), l'algèbre d'ensembles de l'écart de mots-clés, les appels groupés jusqu'à 100 requêtes, et la lecture des codes d'erreur.
- verif-site-en-ligne — Deux scripts Node sans dépendance : un parcours du site en ligne qui détecte liens morts, titres et descriptions hors limites, canoniques hors domaine, h1 manquants et images sans alt ; et une soumission IndexNow (Bing, Yandex, Seznam, Naver).
- seo-landing — SEO technique de landing page visant 100/100 PageSpeed : Core Web Vitals, sémantique, Schema.org, AVIF (vitrine).
- cro — Optimisation du taux de conversion d'une page : hiérarchie, friction, preuve sociale.
- copywriting — Rédaction de pages marketing (titres, propositions de valeur, preuves) pour une vitrine.
- zero-slop — Skill d'édition plus scoreur hors-ligne (294 motifs pondérés, lexique de 96 termes, Python stdlib) et CLI `npx zero-slop score` qui repèrent les tournures IA, réécrivent en préservant noms, chiffres, liens et citations, et notent la prose de 0 à 100 ; pour la passe texte pas-IA de tout projet.
- launch — Plan de lancement d'un produit ou d'un site.

### MCP du pôle
- septune — Audit SEO technique déterministe sans clé ni IA : 69 règles (au 2026-11-04) mesurées, comparaison production / préproduction pour attraper une régression avant le push, audit des robots IA et génération de llms.txt.
- playwright — Pilotage d'un navigateur (navigation, captures, formulaires) pour tester et vérifier visuellement.
- chrome-devtools — Chrome DevTools en MCP : audits Lighthouse, traces de performance, réseau, console et captures pour mesurer LCP/CLS/INP.
- semrush — Recherche de mots-clés, positions et analyse de concurrence par le serveur officiel Semrush en HTTP.
<!-- bonds:pole:seo-geo:end -->

<!-- bonds:pole:cto-commerce:start -->
## Pôle CTO & Commerce

> Installé par BONDS le 2026-11-04 (`equip --pole=cto-commerce`). Bloc régénéré par `/bonds update` :
> écrire les règles propres au projet hors des balises `bonds:pole:cto-commerce`.

**Point d'entrée : `/pole-cto-commerce`.** Le chef tourne dans la session principale, lance les
études (un fichier plafonné chacune), condense tout en `docs/commerce/MESSAGE.md`, écrit lui-même les
textes, les fait relire par `commerce-relecteur`, vérifie à l'écran et commite.

- **Avant d'écrire un texte public, lire `docs/commerce/MESSAGE.md` et rien d'autre** : il remplace
  la relecture des études. Méthode : skill `ecrire-pour-le-client`.
- On dit ce que le client gagne, jamais comment l'outil est fait. Chaque chiffre a sa source en un clic.
- La description du produit est la même partout : page, FAQ, description du site, `llms.txt`, pages
  légales, onboarding.
- Pas de faux témoignage, pas d'urgence fabriquée, pas de promesse hors des lignes rouges du projet.

### Sous-agents
- commerce-audit-textes — Audite les textes d'un site comme un client pressé : verdict par section, objections sans réponse, contradictions entre page, FAQ, description et llms.txt, dix changements classés.
- commerce-references — Décortique les sites de référence du client : squelette, formules, preuve, prix, objections, microcopie, quinze motifs transférables et ce qu'il ne faut pas reprendre.
- commerce-veille — Veille sourcée sur ce qui marche pour présenter un produit : principes et gabarits (METHODE.md) ou résultats mesurés et mots du client (CE-QUI-MARCHE.md).
- commerce-relecteur — Relit les textes en une passe avec la grille de 15 points et le diff, distinct de l'auteur : seulement les échecs, réécriture proposée, verdict.

### Skills du pôle
- pole-cto-commerce — Chef du pôle CTO & Commerce : lance quatre agents d'étude et de relecture, condense leurs fichiers en un MESSAGE.md, réécrit lui-même les textes du site, fait relire, vérifie à l'écran, commite et nourrit BONDS.
- ecrire-pour-le-client — Écrire les textes d'un site pour que le client voie ce qu'il gagne : un MESSAGE.md d'une page, règles justifiées par des résultats mesurés, ordre de page en liste d'attente, références Rushlot et FanClaw, grille de 15 points en une lecture.
- copywriting — Rédaction de pages marketing (titres, propositions de valeur, preuves) pour une vitrine.
- cro — Optimisation du taux de conversion d'une page : hiérarchie, friction, preuve sociale.
- ux-writing — Sept skills UI/UX anti-slop (audit en lecture seule avec preuves, refonte visuelle, flux et états, UX writing, porte qualité) qui diagnostiquent puis corrigent une interface au look générique en respectant la marque existante, pour les loadouts vitrine-premium et saas-webapp.
- zero-slop — Skill d'édition plus scoreur hors-ligne (294 motifs pondérés, lexique de 96 termes, Python stdlib) et CLI `npx zero-slop score` qui repèrent les tournures IA, réécrivent en préservant noms, chiffres, liens et citations, et notent la prose de 0 à 100 ; pour la passe texte pas-IA de tout projet.
- launch — Plan de lancement d'un produit ou d'un site.

### MCP du pôle
- playwright — Pilotage d'un navigateur (navigation, captures, formulaires) pour tester et vérifier visuellement.
<!-- bonds:pole:cto-commerce:end -->

<!-- bonds:pole:design:start -->
## Pôle Design

> Installé par BONDS le 2026-11-05 (`equip --pole=design`). Bloc régénéré par `/bonds update` :
> écrire les règles propres au projet hors des balises `bonds:pole:design`.

**Point d'entrée : `/pole-design`.** La cheffe tourne dans la session principale : elle regarde le
site une fois, écrit `docs/design/BRIEF.md` (constat, zones aux fichiers disjoints, méthode, sortie),
lance une session par zone dans le même dossier, intègre leurs journaux, puis lance une session
finale mouvement, performance et QA.

- **Une session de zone lit `docs/design/BRIEF.md` et ses propres fichiers, rien d'autre.**
- Une feuille de style par zone ; jetons du thème et coquilles partagées : à la cheffe.
- Chaque session commite ses chemins seulement, ne pousse pas, écrit `docs/design/journal/<zone>.md`.
- Pas de texte ajouté (pôle CTO & Commerce), pas de contenu touché (pôle SEO & GEO).

### Sous-agents
- creative-director — Directeur artistique web premium : direction visuelle, concepts, niveau Awwwards et cohérence esthétique du site.
- design-craft-expert — Ingénieur front et designer UI : composants React de qualité exposition, conçus et non assemblés, via la skill react-design-craft.
- interaction-designer — Designer d'interactions : curseur custom, hover, drag, navigation animée, carrousels, transitions de page et micro-feedbacks.
- motion-designer — Expert animation web (GSAP, Framer Motion, ScrollTrigger, Lenis) : chorégraphie des transitions, micro-interactions et scroll.
- visual-qa — Contrôle qualité visuelle via Playwright : captures desktop/tablette/mobile, bugs visuels, cohérence design et revue d'animations.

### Skills du pôle
- pole-design — Cheffe du pôle Design : regarde le site une fois, écrit un brief commun à zones disjointes, lance une session par zone dans le même dossier, intègre, fait passer une session finale mouvement et QA, consolide DESIGN.md et nourrit BONDS.
- impeccable — Skill /impeccable (Paul Bakaus) : direction artistique et exécution frontend en une commande (shape, audit, critique, polish, animate, colorize, harden, optimize…) avec des agents dédiés et un hook de détection d'anti-patterns design après chaque édition.
- taste-skill — Skill anti-slop (v2 expérimental) pour landing pages, portfolios et refontes : lit le brief, déduit la direction de design via trois curseurs (VARIANCE / MOTION / DENSITY), impose un pré-vol strict et des squelettes GSAP pour livrer des interfaces qui n'ont pas l'air templatées.
- signaux-vibecodes — Les 39 signaux qui font dire « site vibecodé » (30 du reel aj.on.ai 2026, 4 relevés sur les projets, 4 de deux reels d'avant/après, 1 du chantier de l'aurore), avec sévérité, raison et alternative, plus un protocole avant / pendant / après pour designer hors défauts.
- frontend-design — Skill officiel Anthropic de design front-end, réécrit pour lister les tics de page générée (mot accentué, labels en capitales, numéros décoratifs, fade-and-slide-up, trois looks IA) ; graine directe pour signaux-vibecodes.
- banques-references — Répertoire de banques de références visuelles gratuites rangées par décision : composition, typographie, couleur, mouvement, icônes, texture, 3D, images, primitives accessibles. Chaque entrée dit quel défaut elle aide à fuir, avec licence et coût, plus le protocole des trois sources pour s'en servir sans produire un pastiche.
- copie-de-reference — La méthode pour copier franchement une image de référence envoyée par le client : inventaire des calques avant le code, traduction dans la matière du projet, fonction donnée au décor, extension à toute la page, composition propre au mobile, et preuve par captures côte à côte.
- rideau-de-lumiere — La recette mesurée d'un hero en aurore, en CSS pur : champ de couleur plein cadre à huit arrêts, stries verticales à deux pas, rideau d'égaliseur masqué par une silhouette SVG calculée au module, bouton rond en vitre sombre, flèches, panneaux en perspective et écho au pied de page. Aucune image, aucun canevas, aucune bibliothèque.
- emil-animate — Skills d'animation de référence (animate, review-animations, animation-vocabulary, apple-design, prototype) pour vitrine et SaaS.
- emil-review-animations — Skills d'animation de référence (animate, review-animations, animation-vocabulary, apple-design, prototype) pour vitrine et SaaS.
- motion-audit — Audite les animations d'un site : fluidité, durées, easing, cohérence, utilité, performance et prefers-reduced-motion.
- modern-web-guidance — Guides web modernes de l'équipe Chrome (View Transitions, container queries, subgrid, oklch, text-wrap, accessibilité) au format skill, économes en tokens ; utile au volet perf/a11y du loadout vitrine-premium.
- ui-slop-audit — Sept skills UI/UX anti-slop (audit en lecture seule avec preuves, refonte visuelle, flux et états, UX writing, porte qualité) qui diagnostiquent puis corrigent une interface au look générique en respectant la marque existante, pour les loadouts vitrine-premium et saas-webapp.
- playwright-cli — CLI Playwright pilotée depuis le terminal (open, goto, click, snapshot, screenshot, pdf, traces, mocks réseau) qui sert de preuve visuelle desktop/tablette/mobile ; le skill documente les commandes pour l'agent.
- verification-before-completion — Impose de prouver qu'un travail est terminé (tests, sortie réelle) avant de le déclarer fini.

### MCP du pôle
- playwright — Pilotage d'un navigateur (navigation, captures, formulaires) pour tester et vérifier visuellement.
- chrome-devtools — Chrome DevTools en MCP : audits Lighthouse, traces de performance, réseau, console et captures pour mesurer LCP/CLS/INP.
<!-- bonds:pole:design:end -->
