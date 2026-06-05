# Test live de bout en bout — Terouva (TASK-001)

> But : valider le pipeline **détection → ingestion → score → notif → contact 1-clic**
> contre une **vraie page Leboncoin**, dans des conditions réelles.
>
> **Ligne rouge (non négociable)** : on **observe**, on ne **pilote pas** LBC.
> Aucun envoi automatique, aucune évasion anti-détection. L'extension lit le DOM
> que **tu** as ouvert dans **ton** navigateur, rien de plus. C'est **toi** qui
> cliques « Envoyer » sur Leboncoin. Cette checklist ne contient aucune étape qui
> automatise une action sur LBC.

---

## Statut de vérification (2026-06-05, Claude Code)

| Partie | Statut | Preuve |
|---|---|---|
| **A — App + serveur local** | ✅ **vérifié** | `npm run tauri:dev` boote, fenêtre OK, `curl /health` → `{"app":"terouva","version":"0.2.0","listening":true}` (token propagé par le frontend). |
| **B — Extension Chrome** | ⏳ à faire (toi) | Chargement mode dev + collage token. |
| **C — Vraie page LBC** | ⏳ à faire (toi) | Nécessite ta session Chrome + compte LBC. |
| **D — Polling background** | ⏳ à faire (toi) | Nécessite une recherche active avec URL LBC. |

> 🐛 **Bug trouvé et corrigé pendant cette vérif** : au premier lancement réel, l'app
> paniquait au démarrage (`polling.rs:64 — there is no reactor running, must be called
> from the context of a Tokio 1.x runtime`). La boucle de polling appelait `tokio::spawn`
> depuis la closure `.setup()` de Tauri, qui tourne **hors** d'un runtime Tokio.
> Corrigé en utilisant `tauri::async_runtime::spawn`. C'est exactement le genre de bug
> que seul un lancement réel révèle (cargo check + cargo test passaient pourtant à 100%).

---

## Pré-requis (une fois)

- [ ] Windows + Node ≥ 20 + Rust stable + VS Build Tools (workload C++). Voir `apps/desktop` / note Obsidian « 04 - Build, run & pièges ».
- [ ] Chrome installé, **connecté à ton compte Leboncoin** (session normale).
- [ ] Profil locataire rempli dans l'app (page Profil) — sinon les messages générés auront des placeholders.
- [ ] Au moins **une recherche active** avec une **URL de recherche LBC** + des critères (page Recherches). C'est ce qui sert au scoring et au polling.

---

## Partie A — App desktop + serveur local (vérifiable sans LBC)

1. [ ] Lancer l'app :
   ```bash
   cd apps/desktop
   npm run tauri:dev
   ```
   La fenêtre Terouva s'ouvre. Le badge **« Watch ON »** doit apparaître en haut.

2. [ ] Aller sur la page **Surveillance**. Vérifier :
   - [ ] **URL du serveur local** affichée (par défaut `http://127.0.0.1:8765` ; fallback `8766`–`8769` si le port est pris).
   - [ ] **Token de jumelage** affiché (40 caractères). Bouton « Afficher » + copie en 1 clic.
   - [ ] Badge serveur **« ● actif »**.

3. [ ] Sanity check du serveur (terminal séparé) :
   ```bash
   curl http://127.0.0.1:8765/health
   ```
   Attendu : `{"app":"terouva","version":"0.2.0","listening":true}`.
   `listening:true` signifie que le token a bien été poussé au serveur par le frontend.

> Endpoints exposés par le serveur local (référence) :
> - `GET  /health` — sanity check (pas d'auth).
> - `POST /ingest/listing` — l'extension y pousse chaque annonce détectée (bearer token).
> - `GET  /notifications/pending` — l'extension draine la file de notifs « annonce chaude ».
> - `GET  /searches/active` — handshake extension (bearer token).

---

## Partie B — Extension Chrome (vérifiable sans LBC)

4. [ ] `chrome://extensions` → activer **Mode développeur** → **Charger l'extension non empaquetée** → sélectionner `apps/extension/`.

5. [ ] Cliquer l'icône Terouva → onglet **Réglages** :
   - [ ] Coller l'URL du serveur (celle de l'étape 2).
   - [ ] Coller le **token** (étape 2).
   - [ ] Laisser « Surveillance active » coché.
   - [ ] **Enregistrer**.
   - [ ] La pastille en haut à droite du popup passe **verte (ON)** (l'app répond + token accepté). Si orange/rouge : voir Dépannage.

---

## Partie C — Test contre une VRAIE page Leboncoin (nécessite ta session)

> ⚠️ À partir d'ici, c'est **toi** qui pilotes ton navigateur normalement.
> Terouva ne fait qu'observer le DOM que tu charges.

6. [ ] Dans Chrome (connecté à ton compte), ouvrir une **page de recherche LBC réelle**, ex. une recherche locations sur ta ville :
   `https://www.leboncoin.fr/recherche?category=10&locations=...`
   - [ ] Un **overlay discret** apparaît en bas à droite : « Terouva : N envoyées ».
   - [ ] Scroller / rafraîchir : le compteur N augmente à mesure que de nouvelles cartes d'annonces apparaissent dans le DOM.

7. [ ] Revenir dans l'app Terouva → page **Surveillance** :
   - [ ] Le **journal des détections récentes** se remplit (titre, prix, score, timestamp).
   - [ ] Les compteurs « Détectées / Notifiées / Doublons » bougent.
   - [ ] Page **Annonces** : les annonces sont là, **scorées** (badge score + recommandation), dédoublonnées par URL.

8. [ ] **Notif Chrome** (le point jamais validé) :
   - [ ] S'assurer qu'au moins une annonce dépasse le **seuil de notif** (Réglages → score min, défaut 70). Au besoin, baisser le seuil temporairement pour forcer le déclenchement.
   - [ ] Réduire/défocaliser la fenêtre de l'app. Quand une annonce chaude est détectée, une **notification Chrome native** doit apparaître.
   - [ ] **Cliquer la notif** → ouvre l'annonce LBC dans un onglet.

9. [ ] **Contact 1-clic** (page Annonces, sur une annonce ouverte) :
   - [ ] Bouton **« ⚡ Préparer & contacter »** → le message est **copié** dans le presse-papier + le brouillon est **sauvé** (page Candidatures) + l'**annonce LBC s'ouvre**.
   - [ ] Sur LBC, le formulaire de contact : **coller** le message, vérifier, **cliquer Envoyer toi-même**. ✋ Terouva n'envoie jamais à ta place.

---

## Partie D — Polling background (Chrome fermé)

10. [ ] Fermer Chrome (ou tous les onglets LBC). Laisser l'app ouverte.
    - [ ] Page Surveillance → carte **« Polling background »** : « ● N recherches », « Fetches effectués » qui s'incrémente au rythme configuré (fréquence de la recherche, ±30 % de jitter, **pause 23h-7h**).
    - [ ] Une nouvelle annonce trouvée par le polling apparaît dans le même journal + déclenche la même notif si elle est chaude.

---

## Critères d'acceptation

- [ ] Détection live confirmée (overlay + journal qui bougent sur une vraie page LBC).
- [ ] Score affiché et cohérent avec tes critères.
- [ ] Notif Chrome déclenchée + clic ouvre l'annonce (app non focalisée).
- [ ] Contact 1-clic : message copié + annonce ouverte, **envoi resté manuel**.
- [ ] Polling background actif Chrome fermé.
- [ ] **Zéro** action automatique sur LBC observée.

---

## Dépannage

| Symptôme | Cause probable | Fix |
|---|---|---|
| Pastille popup **rouge (OFF)** | App pas lancée / mauvais port | Vérifier `curl /health` ; recopier l'URL exacte affichée (le port peut être 8766+). |
| Pastille **orange (Token ?)** | Token absent/erroné | Recopier le token depuis Surveillance, ré-enregistrer dans le popup. |
| Overlay absent sur LBC | URL pas matchée par le content script | L'extension matche `/recherche*`, `/locations*`, `/c/locations*`, `/colocations*`. Si LBC a changé d'URL, adapter `manifest.json` (content_scripts.matches). |
| Annonces détectées mais **0 champ** (titre/prix vides) | Structure DOM/`__NEXT_DATA__` LBC a changé | Inspecter une carte ; ajuster les sélecteurs dans `apps/extension/content/watch.js` et/ou les chemins JSON dans `apps/desktop/src-tauri/src/parser.rs`. C'est le **risque #1** de ce test. |
| Pas de notif Chrome | Permissions notif refusées / seuil trop haut | Autoriser les notifs pour l'extension ; baisser le score min. |

---

## Ce qui reste hors de portée d'une vérif solo (Claude Code)

Les parties **A** et **B** sont vérifiables sans LBC (boot app, `/health`, token, chargement extension). La partie **C** (contre une vraie page LBC) **nécessite la session Chrome + le compte Leboncoin de l'utilisateur** : Claude Code ne peut pas — et ne doit pas — se connecter à LBC à sa place. Cette checklist est conçue pour que l'utilisateur la déroule en ~10 min et coche.
