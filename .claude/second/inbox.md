# Inbox — Second → Terouva

> Tâches assignées par **Second** à la session Claude Code de Terouva.
> Lis-les avec `/second-sync`. Rends compte dans `outbox.md`. Protocole : `PROTOCOL.md`.
> **Tu lis ce fichier, tu n'y écris pas.**

---

## Contexte — ce qui vient d'être livré (2026-06-05)
Second a vérifié + complété le pipeline d'auto-détection (détection → score vs
recherches actives → alerte au-dessus du seuil). Ajouts mergés sur `second/auto` :
- **Notifs Chrome natives** (service worker + file `GET /notifications/pending` côté
  serveur Rust + commande Tauri `enqueue_chrome_notif`).
- **Bouton « ⚡ Préparer & contacter »** (1 clic = copie message + ouvre l'annonce ;
  l'envoi reste **humain**).
Vérifs : cargo 65/65, tsc 0, vitest 25/25, build prod OK.

**MAJ 2026-06-05 — moteur de matching durci** (`scoring.ts`, fait par Second) :
ajout du scoring **property_type**, **normalisation accents/casse** (ville/quartiers/
mots-clés), **récence corrigée** (plus de +20 « très récente » bidon quand la date de
pub est inconnue → flux temps réel), **score de confiance** exposé dans `ScoreReasons.
confidence` + **garde-fous** (pas de « à contacter vite » sur données partielles ou
prix inconnu ; équipement « non vérifiable » neutre s'il n'y a pas de description).
tsc 0, vitest 44/44. → **TASK-003 (poids configurables) doit préserver ces garde-fous
et le champ `confidence`.**

## ÉTAT au 2026-06-08 (synthèse pour la session Terouva)
Tout est sur la branche `second/auto`. Récap de ce que Second a livré :
- **Notifs Chrome** + **contact 1-clic** (« ⚡ Préparer & contacter »). [commits 1fc5ef1]
- **Matching durci** : property_type, normalisation accents, récence, `confidence` + garde-fous. [0fa85ad]
- **Bus de coordination** Second⇄Terouva (`.claude/second/` + skill `/second-sync`). [cdc6e83]
- **Option 1.5** : l'extension pré-remplit le champ de contact LBC sur clic de l'user
  (`apps/extension/content/content.js`), **envoi 100% humain**. [e052e4a]
- **ADR 0001** (`docs/adr/0001-detection-anti-flag-et-stack.md`) + **parser d'alerte mail LBC**
  (`apps/desktop/src/lib/lbcEmail.ts`, 7 tests). [81733d6]

**Direction produit actée (ADR 0001)** : la détection **par emails d'alerte LBC** est la voie
retenue (zéro requête LBC → zéro flag ; le moins coûteux côté client). Tout ce qui touche LBC
reste **côté client** (IP de l'user) ; **pas de VPS scraping** (single IP = flag). Envoi de
candidature **100% humain** (ligne rouge). → la suite active = **TASK-002** ci-dessous.

NB : `scoring.ts`/`types` ont gagné des **poids configurables** (ScoringWeights) — c'est ton
travail / celui de l'user, Second n'y a pas touché. ⚠️ Côté Second (l'app majordome, repo
séparé), l'utilisateur s'est **recentré sur Second** ; Second ne pousse plus de nouveau code
Terouva pour l'instant — à toi de continuer Terouva (TASK-002 en priorité).

---

## TASK-001 — Test live de bout en bout (LBC réel)            [status: todo]
- from: Second
- created: 2026-06-05
- priority: high
- files: apps/desktop, apps/extension

Le pipeline n'a **jamais tourné en conditions réelles**. Objectif : produire un
**mode d'emploi reproductible** + checklist de validation (PAS d'automatisation
d'envoi). Étapes à documenter et à vérifier toi-même autant que possible :
1. `cd apps/desktop && npm run tauri:dev` ; vérifier le serveur local (port 8765)
   et le token affichés dans la page Surveillance.
2. Charger l'extension `apps/extension` en mode dev (chrome://extensions), coller
   le token dans le popup.
3. Ouvrir une page de recherche LBC réelle ; vérifier : overlay « Terouva : N
   envoyées », ingestion dans l'app, score affiché, et **notif Chrome** quand une
   annonce dépasse le seuil (clic = ouvre l'annonce).
4. Vérifier le contact 1-clic (message copié + annonce ouverte ; envoi humain).
Livrable : `docs/LIVE_TEST.md` (checklist + captures décrites) + report outbox.
**Ligne rouge** : aucun envoi auto, aucune action sur LBC autre que l'observation.

## TASK-002 — Détection par alertes mail LBC (voie SaaS la moins coûteuse) [status: in_progress]
- from: Second
- created: 2026-06-05
- priority: HIGH (voie retenue : la moins coûteuse côté client, zéro flag)
- files: apps/desktop/src/lib/lbcEmail.ts (fait), Réglages UI, transport

**Décision actée : ADR 0001** (`docs/adr/0001-detection-anti-flag-et-stack.md`) — la
détection via emails d'alerte LBC = le plus simple/moins coûteux client + zéro risque
de flag (c'est LBC qui envoie le mail). L'email est déjà filtré par les critères → chaque
annonce EST un match.

**FAIT par Second :** parser pur `apps/desktop/src/lib/lbcEmail.ts` +
`apps/desktop/src/lib/lbcEmail.test.ts` (7 tests verts) — extrait les annonces
(liens directs + liens de tracking encodés), dédup par id, → `ParsedListing[]`
(`lbcAlertEmailToListings`). Commit `81733d6`.

**RESTE (à toi, session Terouva) :**
1. **Transport** (choisir le plus simple) : (a) l'user **transfère** ses mails d'alerte
   LBC vers une adresse dédiée que Terouva lit, OU (b) **OAuth Gmail lecture seule** sur
   un label dédié. Creds **jamais** commités.
2. **Wiring** : brancher `lbcAlertEmailToListings(emailContent)` → pipeline d'ingestion
   existant (insertListingFromParsed → score → notif). Point d'entrée minimal possible :
   un **import « coller un email d'alerte »** dans Réglages/Import (zéro infra, valide le
   parser tout de suite).
3. **Tuner le parser sur un VRAI mail d'alerte LBC** (format non public) — demander un
   échantillon à l'utilisateur.
**Ligne rouge** : aucune requête vers LBC, envoi de candidature 100% humain.

## TASK-003 — Scoring : pondérations configurables par l'utilisateur  [status: todo]
- from: Second
- created: 2026-06-05
- priority: low
- files: apps/desktop/src/lib/scoring.ts, Réglages UI, db

Aujourd'hui le moteur de score a des poids en dur. Exposer dans Réglages des
pondérations ajustables (prix, surface, fraîcheur, équipements…) persistées en DB,
sans casser les kill switches (mot-clé exclu / prix > 50% → 0 restent absolus).
Mettre à jour/ajouter les tests vitest de `scoring.ts`.

---

## TASK-004 — MISSION LOOK : faire passer Terouva de « bon » à « sublime »  [status: todo]
- from: Second
- created: 2026-06-22
- priority: **HIGH (mission prioritaire — on met le paquet)**
- périmètre: `apps/web/` UNIQUEMENT (présentation). **Aucune** modif de scoring/db/
  ingestion/extension/Tauri. Zéro changement de logique métier.

> ⚠️ LIS ET EXÉCUTE CE FICHIER. Ne pars pas hors-sujet en silence. Rends compte
> dans `.claude/second/outbox.md` à la fin (5 vérifs + ce qui a changé + captures décrites).

### Le constat (vérifié par Second dans le code)
Terouva a **deux surfaces qui ne parlent pas la même langue visuelle** :
- **Landing** (`components/sections/*`, `app/globals.css`) : palette « signal »
  teal `#7ee8c8` + urgent amber `#ffb84d`, grille, grain, glow, motion soignée,
  tout sur variables CSS `--color-*`. **Distinctive, premium.**
- **App `/app`** (`components/app/**`) : zinc brut + accents **violet** (`text-violet-300`)
  + dégradés emerald/teal, header `border-zinc-800`, cards `bg-zinc-900/60`. **N'utilise
  AUCUN token de la landing** → ressemble à un admin générique. C'est le maillon faible.

**La thèse de la mission** : Terouva doit être **une seule marque, sublime de bout en
bout**. On hisse le produit (`/app`) au niveau de la vitrine, autour de sa **signature
identitaire** : « arriver à temps » → univers **live / radar / signal** (le LiveCounter,
le ListingTicker, le « Watch ON » qui pulse en sont déjà les germes). C'est le fil rouge.

### Volet A — Direction artistique (AVANT de coder)
Agent **`creative-director`** (+ `frontend-architect` pour la faisabilité) : poser une
**direction unique** écrite (1 page) — signature, échelle typo, rythme d'espacement,
système d'élévation, usage du signal vs urgent, état « live ». Cap visé : niveau Awwwards,
mais **sobre et crédible** (c'est un outil sérieux, pas une démo de gadgets). Pas de 3D
lourde, pas d'effet qui dessert la lisibilité.

### Volet B — Landing : élever, ne pas refaire
Garder la structure (Hero → Problem → HowItWorks → Features → Privacy → FAQ → CTA).
- **Hero** : faire du **signal live** la pièce maîtresse (le ticker d'annonces aujourd'hui
  en fond/déco mérite d'être un vrai élément de preuve, pas du bruit). Tension typo plus forte.
- **Choréographie scroll** (agent **`motion-designer`**) : rythme de reveal cohérent,
  micro-interactions (agent **`interaction-designer`**), transitions premium. `motion/react`
  est déjà là. **Respecter `prefers-reduced-motion`** (déjà câblé — ne pas le casser).
- Cohérence fine : densité, contrastes, focus states, états vides.

### Volet C — App `/app` : le gros du chantier
Hisser le produit au niveau de la landing **sans toucher la logique** :
- **Unifier les tokens** : remplacer zinc/violet/emerald en dur par les `--color-*`
  (signal/urgent/panel/border…). Étendre `@theme` dans `globals.css` si besoin (tokens
  app : surfaces de cartes, états de score). **Une seule palette pour tout Terouva.**
- **Composants** : `Card`/`StatPill`/`Badge`/`Button`/`Input` (`components/app/components/ui/*`)
  refondus sur les tokens, élévation cohérente, hover/focus premium.
- **Shell** : Sidebar + header (`Layout.tsx`) au niveau de la marque ; soigner le
  `WatchStatusBadge` (l'état live est un atout identitaire — qu'il respire la confiance).
- **Dashboard & pages clés** (Dashboard, Annonces, Surveillance en priorité) : hiérarchie
  visuelle, **ScoreBadge** valorisé (le score est le cœur du produit), états vides soignés,
  listes d'annonces lisibles et désirables. Candidatures/Recherches/Profil/Réglages
  alignés ensuite.

### Lignes rouges (non négociables)
- **Présentation seulement.** Zéro modif de `scoring.ts`, `db`, ingestion, types métier,
  extension, Tauri. Si une refonte visuelle exige un changement de structure de données → STOP,
  note-le dans l'outbox, ne le fais pas.
- **Ton** : vouvoiement, simple, bienveillant, sans jargon. **N'invente aucune promesse
  commerciale** ni chiffre marketing. On reste honnête (lignes rouges produit : on observe,
  l'humain valide et envoie — rien dans l'UI ne doit suggérer un envoi automatique).
- **Local-first** : pas de nouveau backend, pas de compte, pas de dépendance lourde.
  Garder le bundle raisonnable (pas de grosse lib d'animation en plus de `motion`).
- **Accessibilité AA** : contrastes vérifiés (le signal teal sur fond clair/foncé),
  focus visibles, navigation clavier, `prefers-reduced-motion` préservé.

### Ressources (impératif)
Agents `creative-director`, `frontend-architect`, `motion-designer`, `interaction-designer`,
puis **`visual-qa`** pour la revue (screenshots desktop + mobile 375px). `context7` pour la
doc à jour de `motion` / Tailwind v4 si besoin. Token-economy/CODEMAP à jour.

### Definition of Done
- Landing + `/app` partagent **une seule palette** (plus de violet/zinc en dur).
- 5 vérifs vertes : **lint, typecheck, build, vitest, et build prod web**.
- Revue **`visual-qa`** : desktop + mobile 375px, **0 erreur console**, pas de débordement.
- CODEMAP à jour. Compte-rendu dans `outbox.md` (avant/après, captures décrites, points
  remontés à Second). **Aucune** ligne métier modifiée (le diff ne touche que la présentation).
