# Bienvenue sur Terouva — le guide pour tout essayer

> **Terouva vous prévient dès qu'une annonce Leboncoin correspond à votre recherche,
> avec un message de candidature déjà prêt à envoyer.** Le but : être parmi les
> premiers à répondre, sans y passer vos journées.
>
> Deux promesses, tout au long de ce guide :
> - **Tout reste sur votre ordinateur.** Pas de compte, pas de serveur, pas de pub.
> - **Vous gardez la main.** Terouva prépare tout, mais c'est **toujours vous** qui
>   cliquez « Envoyer » sur Leboncoin.

Comptez **5 minutes** pour faire le tour. Aucune connaissance technique requise.

---

## Avant de commencer

- Ouvrez **https://terouva.vercel.app/app** dans votre navigateur.
- Ça marche sur **Mac, Windows et Linux**. **Google Chrome** est conseillé
  (c'est lui qui permet la détection en direct, un peu plus loin).
- C'est **gratuit** et **sans inscription**.

---

## Étape 1 — Vous présenter (1 min)

Au premier lancement, un petit écran de configuration apparaît :

1. Votre **prénom** et votre **téléphone**.
2. Votre **ville** et votre **budget** (loyer max).
3. (Le reste est facultatif et modifiable à tout moment.)

> À quoi ça sert ? Vos infos **pré-remplissent automatiquement** vos messages de
> candidature, et votre ville + budget servent à **noter** chaque annonce selon
> qu'elle vous correspond ou non.

---

## Étape 2 — Faire entrer des annonces

Pour découvrir l'expérience tout de suite, **sans rien installer** :

1. Ouvrez le fichier **`exemple-email-alerte.html`** (dans le dossier `docs/` du
   projet), sélectionnez tout (**Ctrl + A**) et copiez (**Ctrl + C**).
2. Dans Terouva → **« Mes annonces »** → **« Ajouter une annonce »** → onglet
   **« ✉ Email d'alerte »** → collez → **« Importer les annonces »**.
3. Quelques annonces s'ajoutent à votre liste.

> 💡 Dans la vraie vie, vous **transférez simplement à Terouva les e-mails d'alerte
> que Leboncoin vous envoie** — ça marche même sans extension. Et avec l'extension
> (Étape 6), les annonces arrivent **toutes seules, en direct**.

Vous pouvez aussi coller un **lien d'annonce** Leboncoin (onglet « URL simple »).

---

## Étape 3 — Lire votre liste d'annonces

Chaque annonce affiche un **score sur 100** (à quel point elle vous correspond) et
quelques infos (prix, surface, ville…).

- En haut, un **bandeau vert** apparaît quand des annonces sont **« à contacter en
  priorité »** : ce sont vos alertes, le message est déjà prêt.
- Ces annonces prioritaires sont **entourées d'un halo** pour ressortir.
- Vous pouvez **trier** (par score, date ou prix), **filtrer** (nouvelles, favoris,
  candidatées…) et **chercher**.

---

## Étape 4 — Répondre à une annonce (le cœur de Terouva)

C'est ici que vous gagnez du temps.

**Le plus rapide — en un clic, directement dans la liste :**
- Sur une annonce prioritaire, cliquez **« ⚡ Préparer & envoyer »**.
- Votre message est **copié** et l'annonce **s'ouvre sur Leboncoin**.
- Sur Leboncoin, ouvrez « Contacter », **collez (Ctrl + V)** et cliquez **« Envoyer »**.
  *(Terouva ne clique jamais « Envoyer » à votre place.)*

**Pour voir le détail / personnaliser :**
- Cliquez sur l'annonce pour la **déplier**. Vous voyez :
  - le **détail de la note** (« + Pour » / « − Contre », règle par règle) ;
  - la **description** et les photos ;
  - la section **« Préparer la candidature »** : choisissez un **ton**
    (**Direct**, **Chaleureux**, **Professionnel**). Le message s'écrit tout seul,
    en citant l'annonce et votre profil. **Recliquez** un ton pour une autre version.
  - les boutons : **⚡ Préparer & contacter**, **Copier le message**,
    **Ouvrir sur Leboncoin**, **Sauver brouillon**, **Marquer envoyé**.
- Vous pouvez aussi marquer l'annonce **★ Favori**, **Ignorer**, ou ajouter des
  **notes** perso.

---

## Étape 5 — Suivre vos candidatures

Onglet **« Mes candidatures »** : retrouvez tout ce que vous avez préparé ou envoyé,
avec le statut (préparée, envoyée, réponse reçue, refusée, sans réponse). Pratique
pour savoir où vous en êtes.

---

## Étape 6 — La détection EN DIRECT (extension Chrome) — le moment « waouh »

C'est le cœur de Terouva : capter les annonces **à la seconde où elles sortent**,
pendant que vous parcourez Leboncoin normalement.

> ℹ️ L'extension n'est pas encore sur le Chrome Web Store, on la charge donc
> « à la main » pour la démo. Une fois publiée, ce sera un simple clic.

1. Récupérez le dossier **`apps/extension`** du projet.
2. Dans Chrome, ouvrez **`chrome://extensions`**.
3. En haut à droite, activez le **Mode développeur**.
4. Cliquez **« Charger l'extension non empaquetée »** et choisissez le dossier
   **`apps/extension`**.
5. Sous l'extension **« Terouva »**, copiez son **ID** (une longue suite de lettres).
6. Dans Terouva → **Réglages → Connexion & surveillance** → collez l'**ID** →
   **« Connecter »**. Le voyant passe au **vert**.
7. Ouvrez une **vraie page de recherche Leboncoin** (vos critères habituels).
   - Un petit cadre **« Terouva : N détectées »** apparaît en bas à droite.
   - Les nouvelles annonces remontent **toutes seules** dans Terouva, notées en direct.
8. Quand une annonce dépasse votre seuil, vous recevez une **notification** (pensez à
   les autoriser : Réglages → « Tester une notification »).

**Astuce sur la page d'une annonce** : un bouton **« Remplir mon message »**
(en bas à droite) colle pour vous votre message dans le formulaire de contact
Leboncoin. Vous relisez et vous cliquez « Envoyer ». Toujours vous, jamais un robot.

---

## Étape 7 — Régler à votre goût

Onglet **« Mon dossier »** : votre **profil** complet et vos **recherches** (vous
pouvez en créer plusieurs ; Terouva génère même le lien Leboncoin depuis vos critères).

Onglet **« Réglages »** :
- le **ton par défaut** des messages ;
- le **score minimum** pour être alerté ;
- **« Tester une notification »** (pour autoriser les alertes) ;
- vos **pièces justificatives** (cochez ce que vous avez : pièce d'identité,
  bulletins de salaire… le tableau de bord suit votre progression) ;
- **Sauvegarde** : exportez toutes vos données dans un fichier, et réimportez-les
  sur un autre ordinateur quand vous voulez. Elles vous appartiennent.

---

## Si quelque chose cloche

| Souci | Solution |
|---|---|
| La page ne s'ouvre pas | Utilisez **Google Chrome**. |
| Pas de note sur les annonces | Vérifiez que vous avez créé une recherche (Mon dossier → Mes recherches). |
| L'extension reste « non détectée » | Revérifiez l'**ID** collé et que l'extension est bien chargée (mode développeur activé). |
| Pas de notification | Autorisez-les (Réglages → « Tester une notification »). |
| L'e-mail d'alerte n'importe rien | Collez **tout** le contenu du fichier d'exemple. |

---

## En une phrase

**Ouvrez le site → présentez-vous → vos annonces arrivent et sont notées → un clic
« ⚡ Préparer & envoyer » → vous collez sur Leboncoin et vous envoyez.** Le tout sans
que rien ne quitte votre ordinateur.

Bonne visite ! 🏡
