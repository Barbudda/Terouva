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

## REPORT — 2026-06-19   [moteur de messages 100% local, suppression du LLM]
- contexte: l'utilisateur a tranché « le site doit marcher SANS API externe, et on ne fait pas de hors-ligne ». → on abandonne le LLM, le moteur de templates local DEVIENT le système de messages (pas un fallback).
- files: apps/desktop/src/lib/messageGen.ts (réécrit : cite les détails de l'annonce, 3 tons, variantes), Annonces.tsx + Reglages.tsx (un seul moteur, plus de toggle/clé), apps/web/lib/content.ts + docs/GUIDE_TEST.md (copie « 100% local, rien à configurer »). Supprimés : src-tauri/src/ai.rs, src/lib/ai.ts, apps/web/app/api/message/route.ts, dep `ai` du web.
- tests: vitest 51/51, cargo 44/44 (compile sans le module ai), build web + desktop OK.
- commit: 8d8a487 sur second/auto.

## REPORT TASK-002 — 2026-06-19   [status: in_progress → wiring fait]
- objectif (étape 2 de la task): brancher le parser `lbcEmail.ts` (déjà fait par Second) sur le pipeline d'ingestion via un import « coller un email d'alerte ». Zéro infra, **aucune API externe** (cohérent avec la nouvelle ligne produit).
- files: apps/desktop/src/lib/watchBridge.ts (refactor : extraction de `ingestParsedListing()` partagée extension↔email + nouvelle `importLbcAlertEmail()` → résumé found/added/duplicates/enriched/notified), apps/desktop/src/pages/Annonces.tsx (3e onglet « ✉ Email d'alerte » : textarea + import + récap), docs/GUIDE_TEST.md (§5 bis).
- tests: vitest 51/51 (les 7 tests du parser couvrent l'extraction ; le wiring réutilise le chemin d'ingestion déjà éprouvé), tsc 0, build desktop OK.
- garde-fous respectés: aucune requête vers LBC (c'est LBC qui envoie le mail), candidature 100% humaine, `confidence` + scoring intacts (réutilise scoreAgainstActive).
- reste TASK-002:
  1. **Transport** non démarré (transfert mail dédié OU OAuth Gmail lecture seule) — c'est la seule partie qui toucherait à un service externe ; à arbitrer avec l'utilisateur vu la contrainte « sans API externe ». L'import manuel (collage) marche dès maintenant et ne dépend de rien.
  2. **Tuner le parser sur un VRAI email d'alerte LBC** (format non public) — **besoin d'un échantillon de l'utilisateur**. Tant qu'on n'en a pas, l'extraction reste générique (toutes URL d'annonce + liens de tracking).
