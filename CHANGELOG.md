# Changelog

Toutes les évolutions notables de Terouva sont consignées ici.

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Versionnage [SemVer](https://semver.org/lang/fr/).

## [0.2.0] — 2026-05-26

Première release distribuée. La boucle complète "surveillance live → score → notif → message prêt à coller" est opérationnelle.

### Ajouté

- **Pont local Tauri ↔ extension Chrome** : serveur HTTP `127.0.0.1:8765` (axum) avec authentification par token bearer. Endpoints `/health`, `/searches/active`, `POST /ingest/listing`. Token random généré au premier boot, stocké en SQLite, surfacé dans la page Surveillance avec bouton "Régénérer".
- **Surveillance live LBC via extension Chrome v0.2** : nouveau content script `watch.js` actif sur `/recherche*`, `/locations*`, `/colocations*`. `MutationObserver` détecte les nouvelles annonces dans le DOM des pages que tu ouvres, les envoie à l'app en temps réel. Overlay discret en bas à droite affiche le nombre d'annonces envoyées. Popup étendu à 3 onglets : Surveillance / Capture URL / Réglages.
- **Polling background quand Chrome est fermé** : nouveau parser Rust de pages de résultats LBC, tokio loop qui interroge chaque recherche active au rythme configuré (±30 % de jitter, pause 23h-7h). Sources extension + polling + clipboard convergent vers un seul pipeline d'ingestion côté frontend.
- **Page Surveillance** dans l'app : URL serveur + token (masqué, copy-en-un-clic), stats polling live, journal des détections récentes avec scores et badges.
- **Badge "Watch ON/OFF"** dans le header de l'app.

### Amélioré

- Le scoring qui tournait via clipboard tourne maintenant aussi pour les annonces venant de l'extension et du polling — pipeline unique, dédoublonnage par URL, score contre la meilleure recherche active matchée.
- CSP Tauri durcie (était `null`), Cargo release profile optimisé (LTO + opt-level "s" + strip → MSI de 4.2 MB).
- Parser host allowlist : seules les URLs `leboncoin.fr` sont fetchées.

### Non négociable

- Pas de Patchright, pas de browser automation, pas de stealth lib. La détection est invisible par construction parce qu'aucune signature d'automation n'existe.
- Pas d'envoi automatique de messages — l'humain valide, copie, colle, envoie.
- Aucune donnée ne sort de la machine : pas de serveur Terouva, pas de cloud, pas de tracker.

### Connu

- **MSI non signé** : Windows SmartScreen affichera un avertissement à l'installation. Clic sur "Plus d'infos" → "Exécuter quand même". La signature de code arrivera dans une prochaine release.
- **Mac & Linux** non encore disponibles. Tauri 2 est cross-platform, les builds suivront.

## [0.1.0] — 2026-05-24

Première version interne. Stack desktop + site marketing + extension clipboard.

### Ajouté

- Tauri 2 + React 19 + SQLite local (6 tables) + 6 pages (Dashboard, Recherches, Annonces, Candidatures, Profil, Réglages)
- Parser Rust pour les pages de détail LBC (extraction `__NEXT_DATA__` + fallback meta OG)
- Scoring déterministe 7 règles, explicable règle par règle
- Génération de message en 3 tons (direct / chaleureux / pro)
- Notifications desktop natives
- Backup JSON export/import
- Extension Chrome v0.1 capture URL one-shot via clipboard
- Site marketing Next.js déployé sur Vercel
