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

## REPORT TASK-004 — 2026-06-22   [MISSION LOOK — palette unifiée]   [status: done (vague 1)]
- objectif: une seule langue visuelle landing + `/app` autour de la signature signal/live. **Présentation only** — zéro ligne métier touchée (scoring/db/ingestion/extension/Tauri intacts).
- **constat avant**: `/app` avait son PROPRE thème (`components/app/index.css`) — accent **violet** (`--color-accent:#a78bfa`), succès **emerald**, surfaces **zinc** — + ~234 classes Tailwind de couleur **en dur** (zinc/violet/emerald/amber). Résultat : un « admin générique » déconnecté de la landing premium teal.
- **après**:
  1. `components/app/index.css` réécrit → tokens = **palette de la landing** (`globals.css`) : surfaces bg/panel, texte 3 niveaux, **signal** teal, **urgent** ambre, **danger**. Anciens noms (`accent`/`good`/`warn`/`bad`/`muted`) gardés en **alias** → tout l'existant token-based bascule d'un coup. + `glow-signal`, `.tabular`, `animate-pulse-dot`, **`prefers-reduced-motion`**, focus/scrollbar de marque, **police Geist** partagée.
  2. **234 classes en dur → tokens** sur 17 fichiers (`components/app/**`) : zinc→surfaces/bordures/texte, violet/emerald/teal→**signal**, amber→**urgent**, red→**danger** ; opacités `/NN` + variantes `hover:/focus:` conservées.
  3. **Status badges** ramenés sur la marque (plus de blue/sky/fuchsia) : `new`/`sent` = neutre-clair (en transit), `to_review` = urgent, `favorite`/`applied`/`replied` = signal, `rejected` = danger, `ignored`/`expired`/`no_answer` = neutres.
- **DESIGN.md** créé (`apps/web/DESIGN.md`) : direction artistique unifiée (Volet A).
- **5 vérifs**: tsc --noEmit **0** · vitest **24/24** · `next build` (prod) **OK** (compile + types + 7 pages) · build web prod **OK** · lint = `next lint` non configuré dans le projet (prompt interactif — **pré-existant** ; le lint interne du `next build` passe).
- **visual-qa (Playwright)**: desktop ✓ — onboarding + shell `/app` (sidebar, header **Watch ON**, tabs, boutons, empty states) **tout en teal signal, zéro violet** ; **0 erreur console**. Captures : `terouva-app-after.png`, `terouva-dashboard.png`, `terouva-mobile.png`.
- 0 littéral de couleur en dur restant dans `components/app` (grep).

### Points remontés à Second / à l'utilisateur
1. ⚠️ **Mobile (375px)** : la **sidebar n'est jamais repliée** → débordement horizontal (Watch ON + contenu coupés). **Manque structurel pré-existant** du shell (`Layout.tsx`/`Sidebar.tsx` jamais responsives) — la mission couleur ne l'a pas introduit. **Reco** : vague 2 « shell responsive » (drawer mobile + header compact). Changement de layout → à valider.
2. **Badges** : `favorite`≡`applied` partagent le signal (différenciés par label) faute d'un 3e accent de marque — ajustable si tu veux une teinte dédiée « favori ».
3. **CODEMAP** : pas de `.claude/CODEMAP.md` dans Terouva (token-economy non installé) → rien à mettre à jour.
4. **Volet B (élever la landing) & polish par page** : non faits cette vague — landing déjà premium ; priorité donnée au maillon faible (`/app`). À enchaîner si tu valides la direction.
