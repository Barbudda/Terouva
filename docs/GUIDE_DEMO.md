# Découvrir Terouva — guide pas à pas

> Terouva vous prévient dès qu'une annonce Leboncoin correspond à votre recherche,
> avec un message de candidature déjà prêt à envoyer. **Tout reste sur votre
> ordinateur** : pas de compte, pas de serveur. Et c'est toujours **vous** qui
> cliquez « Envoyer ».

Ce guide propose trois niveaux de test, du plus rapide au plus complet. Comptez
**3 minutes** pour le premier.

---

## 1. Le plus rapide — sans rien installer (≈ 3 min)

1. Ouvrez **https://terouva.vercel.app/app** dans votre navigateur.
   - Sur **Mac, Windows ou Linux**, ça marche pareil. **Google Chrome** est conseillé.
2. **Petite configuration** (le premier écran) :
   - votre **prénom** et votre **téléphone** ;
   - puis votre **ville** et votre **budget**.
   - (Vous pourrez tout modifier plus tard. Les autres champs sont facultatifs.)
3. Vous arrivez sur **« Mes annonces »**. Cliquez sur le bouton
   **« Charger des annonces d'exemple »**.
   → Six annonces apparaissent, **déjà notées** selon vos critères.
4. **Cliquez une annonce** pour la déplier. Vous voyez :
   - le **détail de la note** (pourquoi cette annonce obtient ce score) ;
   - la section **« Préparer la candidature »** : choisissez un ton
     (**Direct**, **Chaleureux** ou **Professionnel**) et un message s'écrit tout
     seul, adapté à l'annonce et à votre profil. Recliquez un ton pour une autre
     version, puis **« Copier »**.
5. Explorez le reste : **Mes candidatures**, **Mon dossier** (les pièces de votre
   dossier), **Réglages** (sauvegarde / export de vos données).

> 👉 À ce stade, vous avez déjà vu l'essentiel : détection, classement, messages.

---

## 2. Tester l'import par e-mail d'alerte (≈ 1 min)

Dans la vraie vie, vous pouvez aussi **transférer à Terouva les e-mails d'alerte
que Leboncoin vous envoie** (ça fonctionne **même sans extension**). Pour le tester
avec un exemple :

1. Ouvrez le fichier **`docs/exemple-email-alerte.html`** du projet, sélectionnez
   tout son contenu (**Ctrl + A**) et copiez (**Ctrl + C**).
2. Dans Terouva → **« Mes annonces »** → **« Ajouter une annonce »** → onglet
   **« ✉ Email d'alerte »** → collez dans la zone de texte → **« Importer les
   annonces »**.
   → Quatre nouvelles annonces s'ajoutent au feed.

---

## 3. La détection EN DIRECT, avec l'extension Chrome (≈ 5 min) — optionnel

C'est le cœur de Terouva : capter les annonces **à la seconde où elles sortent**,
pendant que vous parcourez Leboncoin.

> ℹ️ L'extension n'est pas encore publiée sur le Chrome Web Store, on la charge
> donc « à la main ». Une fois publiée, ce sera un simple clic.

1. Récupérez le dossier **`apps/extension`** du projet.
2. Dans Chrome, allez sur **`chrome://extensions`**.
3. En haut à droite, activez le **Mode développeur**.
4. Cliquez **« Charger l'extension non empaquetée »** et choisissez le dossier
   **`apps/extension`**.
5. Sous l'extension **« Terouva »** qui apparaît, copiez son **ID** (une longue
   suite de lettres).
6. Dans Terouva → **Réglages → Connexion & surveillance** → collez l'**ID** dans le
   champ prévu → **« Connecter »**. Le voyant passe au **vert** : « connectée ».
7. Ouvrez une **vraie page de recherche Leboncoin** (vos critères habituels).
   - En bas à droite de Leboncoin, un petit cadre **« Terouva : N détectées »**
     s'affiche.
   - Les annonces remontent automatiquement dans Terouva, notées en direct.
8. Quand une annonce dépasse votre seuil, vous recevez une **notification**.
   (Si rien ne s'affiche, autorisez les notifications : Réglages → « Tester une
   notification ».)

> **Important** : Terouva **observe**, il n'agit jamais à votre place sur
> Leboncoin. Le bouton « Remplir mon message » se contente de coller votre texte
> dans le formulaire de contact ; **c'est vous** qui relisez et cliquez « Envoyer ».

---

## Si quelque chose cloche

| Souci | Solution |
|---|---|
| La page ne s'ouvre pas | Réessayez avec **Google Chrome**. |
| Pas de note sur les annonces d'exemple | Vérifiez que vous avez bien créé une recherche à la configuration (**Mon dossier → Mes recherches**). |
| L'extension reste « non détectée » | Vérifiez l'**ID** collé et que l'extension est bien chargée (mode développeur activé). |
| Pas de notification | Autorisez les notifications du navigateur (Réglages → « Tester une notification »). |
| L'e-mail d'alerte n'importe rien | Collez **tout** le contenu du fichier d'exemple (ou l'e-mail HTML complet). |

---

## Ce qui est garanti

- **Vos données ne quittent pas votre ordinateur** : pas de compte, pas de serveur
  Terouva, pas de publicité, pas de suivi. *(Seule exception : le nom de votre
  ville est envoyé à l'annuaire d'adresses public du gouvernement, uniquement pour
  fabriquer le lien de recherche Leboncoin.)*
- **Vous gardez la main** : Terouva prépare tout, mais l'envoi reste **100 % vous**.

---

### Pour info — tester en local (côté développeur)

Si vous lancez le projet sur votre machine (`npm run dev` dans `apps/web`), l'app
est sur **http://localhost:3030/app**. Pour faire tester un ami, le plus simple
reste l'adresse en ligne **https://terouva.vercel.app/app**.
