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

## TASK-002 — 3e voie de surveillance : alertes mail LBC (IMAP)   [status: todo]
- from: Second
- created: 2026-06-05
- priority: medium
- files: apps/desktop/src-tauri/src/ (nouveau module), Réglages UI

LBC envoie des mails d'alerte de recherche. Ajouter une source **opt-in** derrière
un flag/réglage : lecture IMAP read-only d'un dossier dédié, parsing des liens
d'annonce, réinjection dans le même pipeline d'ingestion (dédup par URL → score →
notif). 100% local, identifiants en clair **jamais** commités (réglage chiffré ou
stockage OS). Tests unitaires du parser mail. Commence par un ADR court (choix de
la lib IMAP pure-Rust / pure-JS, sécurité des creds) avant de coder.

## TASK-003 — Scoring : pondérations configurables par l'utilisateur  [status: todo]
- from: Second
- created: 2026-06-05
- priority: low
- files: apps/desktop/src/lib/scoring.ts, Réglages UI, db

Aujourd'hui le moteur de score a des poids en dur. Exposer dans Réglages des
pondérations ajustables (prix, surface, fraîcheur, équipements…) persistées en DB,
sans casser les kill switches (mot-clé exclu / prix > 50% → 0 restent absolus).
Mettre à jour/ajouter les tests vitest de `scoring.ts`.
