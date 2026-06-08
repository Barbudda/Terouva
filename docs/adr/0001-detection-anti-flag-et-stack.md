# ADR 0001 — Architecture de détection anti-flag & choix de stack

- **Statut** : Accepté
- **Date** : 2026-06-05
- **Contexte** : discussion Hugo / Thomas Berthou sur le stack Terouva.

## Contexte

Terouva doit détecter **en quelques secondes** les nouvelles annonces correspondant
aux critères de l'utilisateur, sans **se faire flagguer / bannir par Leboncoin**, et en
gardant une **friction et un coût minimes côté client**.

Contrainte fondamentale : LBC détecte et bannit l'automatisation. Ce qui passe
inaperçu, c'est le trafic qui ressemble à un humain : **l'IP + le navigateur + la
session de l'utilisateur**.

## Décision

1. **Tout ce qui touche LBC reste côté client** (IP/navigateur/session de l'user).
   C'est le « moat » anti-flag. Le backend ne fait **jamais** de requête vers LBC.

2. **Rejeté : détection centralisée sur un VPS/serveur dédié.** Toutes les requêtes
   partiraient de la **même IP** → motif de bot évident → flag/ban rapide. (Point
   soulevé par Thomas, validé.)

3. **Cœur de détection privilégié : les emails d'alerte LBC** (recherche sauvegardée).
   - C'est **LBC qui envoie le mail** → **zéro requête vers LBC → risque de flag ≈ nul**.
   - **Friction client minimale** : rien de lourd à installer ; l'email est déjà filtré
     par les critères de l'user → chaque annonce du mail **est** un match (pas besoin de
     re-scorer pour filtrer ; le scoring ne sert plus qu'au classement).
   - L'IP qui compte devient celle d'IMAP/Gmail, pas LBC.

4. **Extension Chrome = complément**, en mode **observe-only** : lire le DOM des pages
   que l'user charge lui-même (MutationObserver, **0 requête en plus**) ≈ indétectable.
   Le polling actif est à éviter (ou cadence humaine + jitter + heures actives). Sert
   surtout au **contact 1-clic** (pré-remplissage du message, cf. Option 1.5) et à
   l'enrichissement on-thesis quand l'user ouvre une annonce.

5. **Backend SaaS léger** (acceptable) : comptes, config des recherches, dossier/message,
   **notifications** (email/push/Telegram), facturation, dashboard. **Ne touche jamais LBC.**

6. **L'envoi de candidature reste 100% humain** (ligne rouge inchangée) : on prépare,
   l'utilisateur clique « Envoyer ». Pas de soumission automatisée (= bot = ban).

## Conséquences

- **Le plus simple & le moins coûteux côté client** = la voie **email d'alerte** : l'user
  active l'alerte mail LBC sur sa recherche ; Terouva lit ces mails et l'alerte. Aucune
  appli lourde obligatoire, aucun scraping.
- Évolution SaaS : connexion email en **OAuth lecture seule** (Gmail) ou **transfert**
  des mails d'alerte vers une adresse Terouva dédiée. La brique de **parsing** est la même
  quel que soit le transport (local IMAP / SaaS OAuth / forwarding) → on l'a isolée.
- Premier pas réalisé : parser pur `apps/desktop/src/lib/lbcEmail.ts` (+ tests) qui
  extrait les annonces d'un mail d'alerte (liens directs **et** liens de tracking),
  déduplique par id, et produit des `ParsedListing` pour le pipeline existant.
- **À valider** : tuner le parser sur un **vrai** mail d'alerte LBC (format non public) ;
  choisir le transport (forwarding = le plus simple/privé ; OAuth = le plus fluide).

## Alternatives écartées

- **VPS scraping** : single-IP → flag. Rejeté.
- **App locale obligatoire** : friction haute (téléchargement, PC-only). Reléguée en option.
- **Extension avec polling agressif** : risque de flag. On garde l'extension en observe-only.
