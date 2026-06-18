# Guide de test Terouva — tout vérifier, pas à pas

> Suis ce guide dans l'ordre. À chaque étape : **ce que tu fais** → **ce que tu dois voir**.
> Si ça ne correspond pas, va voir la section **Dépannage** en bas.
>
> **Ligne rouge** : Terouva **observe** Leboncoin, il ne le pilote jamais. C'est **toi**
> qui cliques « Envoyer » sur LBC. Rien dans ce guide n'automatise une action sur LBC.

---

## 0. Prérequis (une seule fois)

- [ ] Windows + Node ≥ 20 + Rust + Visual Studio Build Tools (workload « Desktop development with C++ »).
- [ ] Google Chrome, **connecté à ton compte Leboncoin** (session normale).

---

## 1. Lancer l'application

```bash
cd C:\Users\hugo8\OneDrive\Desktop\Terouva\apps\desktop
npm run tauri:dev
```

- [ ] Une fenêtre **Terouva** s'ouvre (la 1re fois, compte ~1 min de compilation).

**Vérif rapide du serveur local** (dans un autre terminal) :
```bash
curl http://127.0.0.1:8765/health
```
- [ ] Réponse : `{"app":"terouva","version":"0.2.0","listening":true}`
  - `listening:false` = normal **pendant l'onboarding** (le serveur attend que tu finisses la config).

---

## 2. Onboarding (premier lancement)

> Ne s'affiche qu'au tout premier lancement. Pour le revoir : voir Dépannage → « rejouer l'onboarding ».

- [ ] Écran **« Bienvenue sur Terouva — Configuration en 2 minutes »**, 3 étapes.
- [ ] **Étape 1 — Qui es-tu ?** : remplis prénom + téléphone (revenus/garant optionnels) → **Continuer**.
- [ ] **Étape 2 — Tu cherches quoi ?** : ville + budget + surface. **Laisse l'URL vide** (Terouva la construira). → **Continuer**.
- [ ] **Étape 3 — Connexion Chrome** : lis les explications → **C'est parti**.
- [ ] Tu arrives sur **« Mes annonces »** (écran principal). Nav à gauche : **Mes annonces · Mes candidatures · Mon dossier · ⚙ Réglages**.

➡️ Re-test `curl …/health` : maintenant `listening:true`.

---

## 3. Connecter l'extension Chrome (appairage en 1 clic)

- [ ] `chrome://extensions` → active **Mode développeur** (haut-droite).
- [ ] **Charger l'extension non empaquetée** → sélectionne :
      `C:\Users\hugo8\OneDrive\Desktop\Terouva\apps\extension`
- [ ] Clique l'icône **Terouva** dans la barre Chrome (puzzle → épingle-la).
- [ ] Le popup affiche **« Connexion… »** puis lance l'appairage tout seul.
- [ ] **Dans la fenêtre Terouva**, une boîte **« Autoriser cette extension ? »** apparaît → clique **Autoriser**.
- [ ] Le popup passe **« Connecté ✓ »**, pastille en haut à droite **verte (ON)**.

> ✅ Aucun token à copier : c'est tout l'intérêt. Si la pastille reste rouge/orange → Dépannage.

---

## 4. Recherche automatique (plus d'URL à coller)

- [ ] Va dans **Mon dossier** → section **Mes recherches** → ta recherche → **Modifier**
      (ou crée-en une).
- [ ] Clique **« Générer depuis mes critères »**.
- [ ] Le champ URL se remplit tout seul (ex. `https://www.leboncoin.fr/recherche?category=10&locations=…`).
- [ ] Clique **« Ouvrir sur Leboncoin ↗ »**.
- [ ] **Vérif importante** : la page LBC qui s'ouvre montre bien **ta ville + tes filtres** (prix, surface).
  - Si la localisation est fausse → c'est le point fragile (format LBC) : dis-le-moi, j'ajuste le générateur.

---

## 5. Détection live (le cœur)

> Garde l'app ouverte. On va voir Terouva capter en temps réel.

- [ ] Dans Chrome, sur la page de recherche LBC ouverte à l'étape 4 :
  - [ ] Un **overlay** « Terouva : N envoyées » apparaît en bas à droite de la page LBC.
  - [ ] Scrolle / rafraîchis → **N augmente** à mesure que des annonces apparaissent.
- [ ] Reviens dans l'app → **Mes annonces** :
  - [ ] Les annonces arrivent, avec **titre + prix**.
  - [ ] Certaines ont un badge **« provisoire »** (normal : peu d'infos sur la carte LBC).

---

## 6. Enrichissement (le score se précise quand tu ouvres une annonce)

- [ ] Dans le feed, repère une annonce avec badge **« provisoire »**.
- [ ] Ouvre cette annonce **sur Leboncoin** (clique son titre dans LBC, ou « Ouvrir l'annonce » dans l'app).
- [ ] Reviens dans l'app **Mes annonces** :
  - [ ] L'annonce s'est **enrichie** (description, ville, pièces remplies).
  - [ ] Le badge **« provisoire » disparaît**, le score est recalculé.
  - [ ] Si elle franchit le seuil → tu reçois une **notification**.

> C'est 100 % ta navigation : Terouva lit la page que **tu** as ouverte, il ne va rien chercher tout seul.

---

## 7. Score expliqué + préparer la candidature

- [ ] Dans **Mes annonces**, clique une annonce pour la déplier.
  - [ ] Tu vois le **détail du score** : raisons **+ pour** / **− contre**, règle par règle.
- [ ] Section **« Préparer la candidature »** :
  - [ ] Choisis un **ton** : Direct / Chaleureux / Professionnel → le message se génère.
  - [ ] (Optionnel) Active **Claude AI** si tu as mis une clé (Réglages) → message adapté à l'annonce.
  - [ ] **Copier le message**, puis **Ouvrir LBC** → tu colles et tu envoies **toi-même**.
  - [ ] **Marquer envoyé**.

---

## 8. Suivi des candidatures

- [ ] Va dans **Mes candidatures** :
  - [ ] La candidature marquée « envoyé » apparaît avec son statut.
  - [ ] Teste les boutons de statut : Réponse reçue / Refusé / Sans réponse.

---

## 9. Notifications

- [ ] **Réglages** → vérifie « Score minimum pour notification » (défaut 70).
- [ ] Baisse-le temporairement (ex. 30) pour forcer le déclenchement.
- [ ] Réduis la fenêtre de l'app, garde LBC ouvert, rafraîchis la recherche :
  - [ ] **Notification Windows** quand une annonce passe le seuil.
  - [ ] **Notification dans Chrome** aussi (clic = ouvre l'annonce).

---

## 10. Polling (quand Chrome est fermé)

- [ ] Ferme Chrome (ou tous les onglets LBC). Laisse l'app ouverte.
- [ ] **Réglages → Connexion & surveillance → Ouvrir** (page Surveillance) :
  - [ ] Carte **« Polling background »** : « ● N recherches », « Fetches effectués » qui s'incrémente
        (rythme = fréquence de la recherche, ±30 % de hasard, **pause 23h-7h**).

---

## 11. Réglages avancés (optionnel)

- [ ] **Génération AI — Claude** : colle une clé API Anthropic → **Tester la connexion** → OK.
- [ ] **Sauvegarde** : **Exporter en JSON** (télécharge un backup) puis **Importer** pour vérifier.
- [ ] **Dossier locataire** : coche les pièces que tu as (CNI, bulletins…). Le Dashboard reflète la complétude.

---

## Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| `curl /health` ne répond pas | App pas lancée / port pris | Relance `npm run tauri:dev`. L'app essaie 8765→8769. |
| Pastille extension **rouge (OFF)** | App pas lancée | Lance Terouva, clique « Connecter à l'app » dans le popup. |
| Pastille **orange** longtemps | Modale d'autorisation pas validée | Va dans l'app, clique **Autoriser**. Sinon « Reconnecter » (bas du popup). |
| Overlay absent sur LBC | URL pas reconnue / extension off | L'extension agit sur `/recherche`, `/locations`, `/colocations`. Vérifie « Surveillance active » dans le popup. |
| Annonces détectées mais **vides** (titre/prix nuls) | Structure LBC a changé | C'est le risque n°1. Dis-le-moi : j'ajuste les sélecteurs (`watch.js`) / le parser. |
| « Ouvrir sur Leboncoin » → mauvaise ville | Format du token de localisation LBC | Dis-le-moi, j'ajuste le générateur d'URL (`lbcUrl.ts`). |
| Pas de notif | Permissions refusées / seuil trop haut | Autorise les notifs (Windows + extension), baisse le score min. |
| **Rejouer l'onboarding** | — | Réglages → (avancé) ou : dans la page Surveillance, ou supprime la valeur `onboarded` de `app_settings` (DB locale). Le plus simple : demande-moi un bouton « refaire la configuration ». |

---

## Pour les développeurs — checks automatiques

```bash
# Frontend (types + build)
cd apps/desktop && npm run build      # doit finir « built in … » sans erreur

# Tests unitaires frontend
cd apps/desktop && npm test           # 44 tests verts (scoring, messageGen, lbcUrl)

# Backend Rust (compile + tests)
cd apps/desktop/src-tauri && cargo test   # 65 tests verts
```

---

## En une phrase

**Lance l'app → fais l'onboarding → installe l'extension → clique « Autoriser » →
ouvre ta recherche sur LBC → regarde les annonces tomber, scorées → ouvre une annonce
pour préciser le score → copie le message → envoie toi-même.**
