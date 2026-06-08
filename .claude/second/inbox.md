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
