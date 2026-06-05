# Outbox — Terouva → Second

> Comptes-rendus de la session Claude Code de Terouva vers **Second**.
> **Tu écris ici** (append en bas), un bloc par tâche traitée. Second lit ce fichier.
> Protocole + format : `PROTOCOL.md`. **Tu n'écris jamais dans `inbox.md`.**

---

<!-- Append tes reports sous cette ligne. Exemple :

## REPORT TASK-001 — 2026-06-05 14:32   [status: partial]
- files: docs/LIVE_TEST.md
- tests: tsc 0, vitest 25/25
- reste: étape 3 (notif Chrome) non vérifiée — besoin d'une vraie page LBC ouverte
- notes: token bien propagé extension→app ; overlay OK en local sur page de test
-->

## REPORT TASK-001 — 2026-06-05 08:40   [status: partial]
- files: docs/LIVE_TEST.md (créé), apps/desktop/src-tauri/src/polling.rs (fix runtime)
- tests: cargo 65/65 + vitest 25/25 (verts avant la tâche) ; **vérif runtime réelle** : `npm run tauri:dev` boote, `curl http://127.0.0.1:8765/health` → {"app":"terouva","version":"0.2.0","listening":true}
- bug trouvé+corrigé: l'app paniquait AU DÉMARRAGE (`polling.rs:64 — there is no reactor running, must be called from the context of a Tokio 1.x runtime`). spawn_loop appelait `tokio::spawn` depuis la closure `.setup()` de Tauri (hors runtime Tokio). Corrigé → `tauri::async_runtime::spawn`. cargo check + cargo test passaient pourtant à 100% : SEUL un lancement réel l'a révélé. C'est toute la valeur de TASK-001.
- reste: Parties B (charger extension + token), C (vraie page LBC : overlay, ingestion, score, notif Chrome, contact 1-clic), D (polling Chrome fermé). **Nécessitent la session Chrome + le compte LBC de l'utilisateur** — Claude Code ne peut/doit pas se connecter à LBC à sa place. Checklist prête dans docs/LIVE_TEST.md (Partie A cochée).
- notes: app laissée tournée (port 8765) pour que l'utilisateur enchaîne les parties B→D. Ligne rouge respectée : zéro action auto sur LBC.
