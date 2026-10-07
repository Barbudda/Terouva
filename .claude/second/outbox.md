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

## REPORT TASK-004 — 2026-09-15   [MISSION LOOK — vague 2 : refonte complète + fonctionnement]   [status: done]
- demande utilisateur : « refonte graphique, pas d'aspect vibe codé, et on bosse sur le fait qu'il fonctionne ».
- **direction** : abandon du noir + teal néon + Geist (signature « site généré »). Nouvelle identité éditoriale « petites annonces » : papier chaud, encre, un seul accent terracotta, vert/ocre/rouge réservés aux états, Newsreader + Schibsted Grotesk, un rayon, pas d'ombre/flou/dégradé/animation d'ambiance. Écrite dans `apps/web/DESIGN.md` (contrastes AA vérifiés).
- **site** : hero éditorial + vraie capture de l'app (annonces d'exemple, légendée), retrait des chiffres non sourcés (47/8/3 min) et de la tournure « ce n'est pas X, c'est Y », retrait de la promesse « tableau de bord » (page non routée), FAQ en `details` natif, OG image et icônes refaites, manifeste vouvoyé. `motion` et `geist` désinstallés (landing 111 ko first load).
- **app** : shell responsive (onglets mobiles, 0 débordement à 375 px, point remonté vague 1 → réglé), indicateur réel de connexion extension (remplace « Watch ON » toujours allumé), badges de recommandation enfin visibles (classes du cœur non générées par Tailwind), bouton principal lisible, Réglages avec confirmation + « À propos » exact, pièces du dossier déplacées dans « Mon dossier », `Annonces.tsx` découpé (<500 lignes), emojis/tirets cadratins retirés, libellés associés aux champs.
- **bug métier corrigé (commit séparé cdfd116)** : `scoring.ts` saturait à 100 dès qu'une recherche était détaillée (50 + somme plafonnée) → un studio 1 pièce pour « 2 pièces min » sortait 100 « À contacter vite ». Bonus ramenés à l'échelle du gain max évaluable, pénalités intactes. Test ajouté. Exemple réel : 100/100/100/100/28 → 96/67/49/48/1. ⚠️ touche la logique métier (ligne rouge de la vague 1) : fait à la demande explicite « qu'il fonctionne ». À articuler avec TASK-003 (pondérations).
- **déploiement** : `vercel.json` ignorait les commits ne touchant que `packages/core` → corrigé (70be81c).
- tests : tsc 0 · vitest web 24/24 · core 43/43 · `next build` OK · check-redlines OK · parcours testés en navigateur (onboarding, import sauvegarde, recalcul des notes, édition recherche, message copié, candidature « Envoyée », pièces cochées) · 0 erreur console en build prod.
- reste / à arbitrer : note très basse possible (1/100) quand plusieurs pénalités s'additionnent ; extension Chrome non modifiée (son popup dit encore « Copier JSON »).

## REPORT — 2026-10-06   [reprise : démo fonctionnelle sans extension]   [status: done, déploiement bloqué]
- contexte : Hugo reprend le projet, nouvel objectif = **une démo fonctionnelle sans l'extension Chrome**, veille au plus proche du réel, l'humain envoie.
- **arbitrages** (réponses de Hugo) : démo jouée **et** enchaînement vers la vraie alerte ; extension **gardée en option, en retrait** ; veille = choix délégué → j'ai tranché pour le collage d'e-mail rendu quasi instantané, **pas** Gmail (périmètre restreint Google : audit CASA ~500 $/an, avertissement « app non vérifiée » pour chaque testeur → tue la démo).
- **contraintes vérifiées** : Leboncoin n'a aucune API publique et interdit le scraping (CGU) ; l'alerte e-mail est le seul canal légitime sans extension ; sans serveur, pas de veille navigateur fermé.
- **livré** : mode démonstration (6 annonces d'exemple qui arrivent en direct, notées par le vrai moteur, message préparé), page d'annonce d'exemple pour le geste coller + Envoyer (n'imite aucun site, le dit), bandeau + sortie qui efface uniquement les données marquées `demo` (profil et recherches de l'utilisateur intacts, vérifié en navigateur), verrou anti-double démarrage, collage d'e-mail n'importe où sur « Mes annonces », aide à créer l'alerte Leboncoin, discours du site aligné (alertes e-mail d'abord), guide de démo réécrit.
- tests : tsc 0 · vitest web 24/24 · core 43/43 · `next build` OK · redlines OK · parcours complet rejoué en navigateur (démo, geste d'envoi, sortie, et cas « utilisateur avec ses vraies données »).
- ⚠️ **bloquant** : tous les déploiements Vercel échouent depuis ~18h00 (preview ET production), alors que le commit déployé se construit proprement depuis un clone neuf + `npm ci` et que la casse des imports est correcte pour Linux. La CLI Vercel n'est plus connectée → pas de logs. La production sert donc encore l'ancien design. Besoin de `vercel login` ou du message d'erreur du tableau de bord.
- **déblocage (même soirée)** : Hugo a relancé `vercel login`. Cause des échecs = `engines: node 20.x` dans `apps/web/package.json`, or **Vercel a supprimé Node 20**. Passé en `24.x` → production en ligne. Méthode de secours qui marche : `npx vercel deploy --prod --yes` **depuis la racine du dépôt** (embarque `packages/core`). Démo rejouée et validée **en production** (desktop et mobile 375 px).

## REPORT — 2026-10-07   [démo partageable : couverture complète]   [status: done]
- demande : « envoyer un lien à n'importe qui pour qu'il teste tout l'outil », en codant la recherche et la veille en interne, ou en liant le compte LBC du testeur.
- **refusé et expliqué** : interroger Leboncoin depuis notre code = CGU + ligne rouge projet + bannissement des comptes testeurs ; « lier son compte LBC » n'existe pas (aucune connexion officielle particulier) et impliquerait de stocker des identifiants. Seule veille légitime = l'extension, qui observe les pages ouvertes par la personne.
- **arbitrage Hugo** : rester sur démonstration + collage (publication de l'extension et serveur d'e-mails écartés pour l'instant).
- **livré** : la démonstration couvre désormais l'outil entier — 2 candidatures d'exemple (envoyée, réponse reçue) rédigées par le vrai moteur, 3 pièces du dossier cochées, bouton d'activation des notifications, et « Passer à mes vraies annonces » qui efface la démo puis ouvre la marche à suivre de l'alerte Leboncoin. Envoyer depuis la page d'exemple marque réellement la candidature comme envoyée.
- sortie toujours sûre : pièces décochées et candidatures supprimées à l'identique, données utilisateur intactes (rejoué en navigateur).
- tests : tsc 0 · vitest 24/24 et 43/43 · build prod OK · redlines OK · démo rejouée **en production**.
- ⚠️ reste ouvert : sans extension publiée, un testeur n'a pas la veille automatique — il colle son e-mail d'alerte.
