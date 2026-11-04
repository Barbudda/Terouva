# Maquette textuelle de la page /telecharger

> Propriétaire : `seo-fiches-stores`. Version 1 du 2026-11-04. Recommandée par l'audit du
> 2026-10-30 (priorité 2) : préparer la page maintenant, pour qu'il n'y ait plus qu'un lien à brancher
> le jour où l'extension sort.
> **Maquette seulement** : aucune route n'est créée. Le texte final et le composant reviennent à
> `seo-redacteur` et au développement, la relecture à `blog-relecteur`.
> Sources des faits : code de `apps/extension` v0.2.0, `apps/web/components/app` (import d'e-mail
> d'alerte, démonstration), `docs/seo/stores/chrome-web-store.md`, la page d'aide Microsoft citée
> au bloc 4. Pas de prix ni d'offre (hors périmètre du pôle).

## 0. Cadrage

- **Deux états, une seule URL.** La page existe dès maintenant à `/telecharger`. Elle passe de
  l'état A (avant publication) à l'état B (après) **sans changer d'adresse**, pour garder les liens
  et l'historique d'indexation.
- **Bascule.** L'état dépend d'une seule valeur : l'URL exacte de la fiche du Chrome Web Store,
  copiée par Hugo après publication (variable d'environnement à créer, par exemple
  `NEXT_PUBLIC_TEROUVA_STORE_URL`). Vide : état A. Renseignée : état B. Le format exact de cette
  URL n'est pas deviné ici : Hugo la copie depuis la fiche publiée.
- **Ce que la page vise.** L'intention « installer l'extension Terouva » et les questions qui la
  précèdent (que lit-elle, est-elle compatible, peut-on s'en passer). L'accueil garde la requête
  « alerte annonce location » (registre, ligne P3) : pas de cannibalisation. À reporter dans
  `docs/seo/REGISTRE.md` par `seo-registre`.
- **Indexable dans les deux états.** Même avant la sortie, la page répond à de vraies questions
  (données lues, compatibilité, alternative sans extension) : elle n'est pas une page vide.
- **Règles de texte.** Vouvoiement. « Leboncoin » peut apparaître dans le texte, jamais dans le nom
  du produit ni dans une ancre de lien. Pas de « Télécharger » dans l'état A. Pas de bouton qui
  imite celui du Chrome Web Store (règle du store sur l'imitation de son interface).

## 1. Métadonnées

Le gabarit du site ajoute « · Terouva » au titre (`app/layout.tsx`, `template: "%s · Terouva"`).

| | État A (avant publication) | État B (après publication) |
|---|---|---|
| `titre` (sans le suffixe) | `L'extension Chrome, bientôt disponible` | `Installer l'extension Chrome` |
| Titre complet | 48 caractères | 38 caractères |
| `description` | `L'extension Terouva repère les nouvelles annonces de location sur les pages que vous ouvrez et vous prévient. Laissez votre adresse pour sa sortie.` (147 caractères) | `Installez l'extension Terouva dans Chrome ou Edge : elle repère les nouvelles annonces de location que vous consultez et vous prévient.` (135 caractères) |
| H1 | `L'extension Terouva pour Chrome` | `L'extension Terouva pour Chrome` |

Les comptes sont faits au script (§ 8). Le H1 ne change pas d'un état à l'autre.

## 2. Chapeau-réponse (sous le H1)

Une réponse autonome, que Google ou un assistant peut reprendre telle quelle.

**État A**

> L'extension Terouva pour Chrome repère les nouvelles annonces de location sur les pages leboncoin.fr que vous ouvrez. Elle les transmet à l'application Terouva, qui les note selon vos critères et vous prévient quand l'une d'elles vous correspond. Elle n'est pas encore sur le Chrome Web Store : laissez votre adresse, nous vous écrirons le jour de sa sortie.

**État B**

> L'extension Terouva pour Chrome repère les nouvelles annonces de location sur les pages leboncoin.fr que vous ouvrez. Elle les transmet à l'application Terouva, qui les note selon vos critères et vous prévient quand l'une d'elles vous correspond. Elle s'installe depuis le Chrome Web Store, dans Chrome comme dans Microsoft Edge.

## 3. Les blocs, dans l'ordre

### Bloc 1 : Installer l'extension

**État A**

- Intertitre : `Quand pourrez-vous l'installer ?`
- Texte :
  > L'extension fonctionne et passe ses derniers réglages avant sa publication sur le Chrome Web Store. Laissez votre adresse : nous vous écrirons une seule fois, le jour où vous pourrez l'installer.
- Formulaire : le composant existant `components/ui/WaitlistForm.tsx`. Libellé du bouton :
  `Être prévenu de la sortie`.
- Lien secondaire : `Voir la démonstration` → `/app?demo=1` (la démonstration se lance seule,
  `components/app/AppRoot.tsx`).
- Sous le formulaire, en petit : `Votre adresse ne sert qu'à ce message. Détails dans la politique de confidentialité.`
  (lien vers `/confidentialite`, ancre « politique de confidentialité »).

**État B**

- Intertitre : `Comment installer l'extension ?`
- Bouton principal : `Installer l'extension Chrome` → URL de la fiche (s'ouvre dans un nouvel
  onglet). Dessin propre au site ; pas d'imitation du bouton du store. Le badge officiel « Disponible
  sur le Chrome Web Store » ne s'utilise que selon les consignes de marque de Google, à lire avant.
- Les trois étapes :
  > 1. Installez l'extension depuis le Chrome Web Store, puis épinglez son icône à côté de la barre d'adresse.
  > 2. Ouvrez l'application Terouva (terouva.com/app) et indiquez ce que vous cherchez : ville, budget, surface.
  > 3. Ouvrez votre recherche de location sur leboncoin.fr et gardez l'onglet ouvert. Quand de nouvelles annonces s'ajoutent à cette page restée ouverte, elles arrivent dans l'application, déjà notées.
- Contrôle : `Dans l'application, la pastille « Extension » passe au vert quand tout est relié.`
  Le libellé exact de cette pastille est à reprendre de `/app` au moment de l'écriture finale
  (`docs/LANCEMENT.md` parle de la page « État extension »).

### Bloc 2 : Ce qu'elle fait, ce qu'elle ne fait jamais

Identique dans les deux états (au futur dans l'état A seulement si le relecteur le juge utile ; le
présent décrit un code qui existe déjà).

- Intertitre : `Que fait l'extension, et que ne fait-elle jamais ?`
- Colonne « Ce qu'elle fait » :
  > - Elle lit les pages de recherche et d'annonces que vous ouvrez vous-même : titre, prix, surface, ville, photos et lien de chaque annonce.
  > - Elle transmet ces annonces à l'application Terouva ouverte dans votre navigateur. L'application les note sur 100 selon vos critères.
  > - Si une annonce dépasse votre seuil pendant que l'application est ouverte, une notification s'affiche. Un clic ouvre l'annonce.
  > - Sur la page d'une annonce, un bouton place dans le formulaire de contact le message que vous avez copié depuis Terouva. Vous relisez, puis vous cliquez vous-même sur « Envoyer ».
- Colonne « Ce qu'elle ne fait jamais » :
  > - Aucune requête automatique vers le site d'annonces : elle lit ce qui est déjà affiché.
  > - Aucun rechargement, aucun clic, aucun défilement à votre place.
  > - Aucun envoi de message à votre place.
  > - Aucune lecture des autres sites que vous visitez.
  > - Rien n'est envoyé à nos serveurs ni à un tiers : les annonces restent sur votre ordinateur.
- Variante si le remplissage depuis le presse-papiers est retiré (décision du pôle CTO) : remplacer
  la 4e puce par « L'application prépare votre message de candidature. Vous le copiez, vous le collez
  dans le formulaire de contact, et vous l'envoyez vous-même. »

### Bloc 3 : Sans extension, avec l'e-mail d'alerte

Identique dans les deux états. Cette fonction marche aujourd'hui dans `/app`, sans extension
(`components/app/components/listing/AddListingPanel.tsx`, onglet « E-mail d'alerte »).

- Intertitre : `Peut-on utiliser Terouva sans l'extension ?`
- Réponse autonome :
  > Oui. Si vous utilisez un autre navigateur, ou si vous préférez ne rien installer, Terouva lit aussi les e-mails d'alerte que Leboncoin vous envoie. Vous collez l'e-mail dans l'application : elle en sort les annonces, les note et prépare vos messages.
- Les trois étapes (reprises de l'application) :
  > 1. Ouvrez votre recherche sur leboncoin.fr, enregistrez-la, puis activez l'alerte par e-mail.
  > 2. À chaque e-mail « Nouvelles annonces pour votre recherche », copiez tout son contenu.
  > 3. Collez-le dans l'application Terouva, onglet « E-mail d'alerte ».
- Précision honnête :
  > Les annonces d'un e-mail arrivent avec une note provisoire. Avec l'extension, la note se précise quand vous ouvrez l'annonce.
- Lien : `Essayer avec un e-mail d'alerte` → `/app`.

À valider par Hugo : la page présente-t-elle `/app` comme utilisable dès aujourd'hui (et non comme
une simple démonstration) ? Le code le permet ; le reste du site dit « en préparation ».

### Bloc 4 : Navigateurs compatibles

- Intertitre : `Sur quels navigateurs fonctionne l'extension ?`
- Tableau :

| Navigateur | Extension | Comment faire |
|---|---|---|
| Google Chrome sur ordinateur (Windows, Mac, Linux) | Oui | Depuis le Chrome Web Store. |
| Microsoft Edge | Oui | Edge accepte les extensions du Chrome Web Store : au premier ajout, il demande d'autoriser les extensions d'autres magasins. |
| Brave, Opera et autres navigateurs basés sur Chromium | Non testé | Essayez depuis le Chrome Web Store, ou passez par l'e-mail d'alerte. |
| Firefox, Safari | Non | Utilisez l'e-mail d'alerte (bloc précédent). |
| Téléphone, tablette | Non prévu | L'extension est conçue pour l'ordinateur. L'e-mail d'alerte reste possible dans l'application. |

- Sources et réserves :
  - Edge : page d'aide Microsoft « Ajouter, désactiver ou supprimer des extensions dans Microsoft
    Edge », section « Ajouter une extension à Microsoft Edge à partir du Chrome Web Store »,
    <https://support.microsoft.com/fr-fr/edge/add-turn-off-or-remove-extensions-in-microsoft-edge>,
    relevée le 2026-11-04.
  - Chrome sur Windows, Mac et Linux : `docs/LANCEMENT.md`. À tester sur un Mac avant publication
    (case de la vérification finale de ce document).
  - Brave et Opera : aucune source officielle lue dans cette tâche, d'où « Non testé ».
  - Téléphone : aucune affirmation sur ce que permettent les navigateurs mobiles ; on dit seulement
    que l'extension n'est pas prévue pour. L'usage de `/app` sur téléphone est à vérifier avant
    d'écrire la dernière phrase de la ligne.
  - Dans l'état A, la colonne « Comment faire » de Chrome et d'Edge devient « À sa sortie, depuis le
    Chrome Web Store. »

### Bloc 5 : Questions fréquentes

Balisage `FAQPage` en JSON-LD sur ces questions (`geo-citabilite` en est propriétaire). Chaque
réponse tient seule. Les questions marquées « B » n'apparaissent qu'après publication.

1. **L'extension envoie-t-elle des messages à ma place ?**
   > Non. Elle peut placer votre message dans le formulaire de contact, mais c'est toujours vous qui relisez et qui cliquez sur « Envoyer ». Rien ne part sans vous.

   Variante sans le presse-papiers : « Non. L'application prépare votre message ; vous le copiez,
   vous le collez et vous l'envoyez vous-même. »
2. **L'extension fait-elle des requêtes sur Leboncoin ?**
   > Non. Elle lit seulement les pages que vous avez ouvertes, telles qu'elles s'affichent. Elle ne recharge pas la page, ne clique pas et ne fait aucune recherche à votre place.
3. **Faut-il garder des onglets ouverts ?**
   > Oui : votre page de recherche, pour que l'extension voie les nouvelles annonces, et l'application Terouva, pour qu'elle les note et vous prévienne. Si l'application est fermée, l'extension garde les annonces de côté et les lui transmet à sa prochaine ouverture.
4. **Où vont les annonces et mes informations ?**
   > Elles restent sur votre ordinateur, dans le stockage de votre navigateur. Terouva n'a pas de serveur qui les reçoit, et rien n'est transmis à un tiers. Vous pouvez tout exporter ou tout effacer depuis les réglages de l'application.
5. **Faut-il créer un compte ?**
   > Non. Ni l'extension ni l'application ne demandent de compte.
6. **Terouva est-il lié à Leboncoin ?**
   > Non. Terouva est un service indépendant, ni affilié à Leboncoin, ni approuvé par lui.
7. **Quelles autorisations l'extension demande-t-elle ?** (B)
   > Lire les pages leboncoin.fr que vous ouvrez, afficher des notifications, garder ses réglages en mémoire et, au clic sur le bouton de remplissage, lire le message que vous venez de copier. Chrome affiche la liste exacte au moment de l'installation.

   À réécrire depuis le manifest publié : la liste dépend des corrections demandées au pôle CTO
   (`chrome-web-store.md`, § 9).
8. **Comment désinstaller l'extension ?** (B)
   > Ouvrez la page des extensions de Chrome (chrome://extensions) et cliquez sur « Supprimer » sous Terouva. Vos annonces restent dans l'application tant que vous ne les effacez pas.

### Pied de page de la section

> Terouva n'est ni affilié à Leboncoin, ni approuvé par lui.

## 4. Liens entrants et sortants

À poser par `seo-maillage`, avec des ancres sans « Leboncoin » :

- **Vers `/telecharger`** : les deux blocs « Mac / Windows » de l'accueil, encore sans lien
  d'après l'audit du 2026-10-30 (ancre : « l'extension Chrome ») ; `components/layout/FinDePage.tsx`
  et la fin des deux outils, qui disent aujourd'hui « laissez votre adresse pour être prévenu »
  (ancre : « l'extension Terouva ») ; le pied de page.
- **Depuis `/telecharger`** : `/confidentialite` (« politique de confidentialité »), `/app`
  (« l'application Terouva »), `/outils/message-de-candidature` (« préparer votre message de
  candidature »), `/guides/repondre-a-une-annonce-de-location` (« répondre à une annonce de
  location »).
- Sitemap et `llms.txt` : à ajouter par `seo-gardien-technique` et `geo-citabilite` quand la route
  existe.

## 5. Données structurées

- `FAQPage` sur le bloc 5 (questions affichées dans l'état courant seulement).
- État B : `SoftwareApplication` (nom, `applicationCategory`, `operatingSystem` : Windows, macOS,
  Linux ; `installUrl` : la fiche). Les propriétés de prix ne sont pas remplies par le pôle SEO.
  À vérifier par `geo-citabilite` : ce que Google exige pour ce type sans prix.

## 6. Le jour de la publication

1. Hugo renseigne l'URL de la fiche (variable d'environnement) et `NEXT_PUBLIC_TEROUVA_EXT_ID`
   (pour `/app`, voir `chrome-web-store.md`, § 8), puis redéploie.
2. La page passe à l'état B : métadonnées, chapeau, bloc 1, colonne « Comment faire » du bloc 4,
   questions 7 et 8.
3. Les autres pages qui disent « être prévenu » restent justes pour l'application tant qu'elle est
   « en préparation » : à revoir avec Hugo, page par page.
4. IndexNow sur `/telecharger` (`npm run seo:indexnow`).
5. Prévenir la liste d'attente : décision et envoi par Hugo (le pôle ne prépare qu'un brouillon,
   via `blog-diffusion`).

## 7. Points ouverts

- **`/app` utilisable aujourd'hui ?** Le bloc 3 le suppose. À valider par Hugo.
- **Version Windows (Tauri).** `docs/LANCEMENT.md` cite un lien « Version Windows » sur le site.
  L'application de bureau est gelée et hors périmètre (brief) : la page n'en parle pas.
- **Libellés de l'application** (pastille de l'extension, nom de l'onglet « E-mail d'alerte ») : à
  relire dans `/app` au moment de l'écriture finale.
- **Remplissage depuis le presse-papiers** : décision du pôle CTO ; les variantes sont prêtes
  (bloc 2, question 1).

## 8. Vérifications faites

Le 2026-11-04 :
- longueurs comptées au script : titres complets de 48 et 38 caractères, descriptions de 147 et
  135 caractères ;
- passe `zero-slop` sur tous les textes destinés à la page (chapeaux, blocs, questions ; 779 mots,
  52 phrases) : score 14,8/100 (« clear »), aucune tournure relevée. Seule remarque : vocabulaire
  peu varié, attendu puisque les états A et B répètent les mêmes phrases ; sans objet une fois un
  seul état affiché ;
- aucun tiret cadratin, aucun emoji, aucune ancre de lien contenant « Leboncoin », aucun prix.
