# Fiche Chrome Web Store de l'extension Terouva

> Propriétaire : `seo-fiches-stores`. Version 1 du 2026-11-04, écrite d'après le code de
> `apps/extension` v0.2.0 (manifest, `content/`, `background/`, `popup/`) et la politique de
> confidentialité publiée (`apps/web/app/confidentialite/page.tsx`).
> **Rien n'est publié ni soumis.** Hugo colle les textes dans le tableau de bord développeur.
> Chrome, en français seulement (décision du chef du 2026-11-04 : ni Edge ni anglais pour l'instant).
> Le prix et l'offre sont hors périmètre : la fiche n'en parle pas.

## 1. Règles du store relevées le 2026-11-04

Lues dans la documentation officielle le jour même. Elles changent : les relire avant la soumission.

| Règle | Ce qu'elle impose | Source (date de mise à jour affichée par la page) |
|---|---|---|
| Nom | 75 caractères au plus, texte brut. Il s'affiche dans la boîte d'installation, `chrome://extensions` et le store. Il vient du champ `name` du manifest. | [manifest name](https://developer.chrome.com/docs/extensions/reference/manifest/name) (2013-05-12) |
| Titre | Clair, court, décrit la fonction ; ne pas le bourrer de mots-clés. | [best-listing](https://developer.chrome.com/docs/webstore/best-listing) (2024-08-02) |
| Résumé (description courte) | 132 caractères au plus, texte brut. C'est le texte montré dans les résultats de recherche et les pages de catégorie. Il vient du champ `description` du manifest. Pas de superlatifs, pas de référence aux concurrents. | [manifest description](https://developer.chrome.com/docs/extensions/reference/manifest/description) (2013-05-12), [best-listing](https://developer.chrome.com/docs/webstore/best-listing) |
| Description longue | Commencer par ce que fait l'extension, puis les fonctions. Pas de témoignages anonymes. | [cws-dashboard-listing](https://developer.chrome.com/docs/webstore/cws-dashboard-listing), [listing-requirements](https://developer.chrome.com/docs/webstore/program-policies/listing-requirements) (2024-07-10) |
| Mots-clés | Interdit : listes de sites, de marques ou de mots-clés sans valeur ajoutée, listes de lieux, et répétition d'un même mot-clé plus de 5 fois. | [listing-requirements](https://developer.chrome.com/docs/webstore/program-policies/listing-requirements) (2024-07-10) |
| Marques tierces | Ne pas laisser croire que le produit est autorisé, approuvé ou produit par une autre entreprise. Ne pas porter atteinte aux marques d'autrui. | [impersonation-and-intellectual-property](https://developer.chrome.com/docs/webstore/program-policies/impersonation-and-intellectual-property) (2022-11-01) |
| Objectif unique | Un seul objectif, étroit et facile à comprendre ; un champ du formulaire le décrit. | [quality-guidelines](https://developer.chrome.com/docs/webstore/program-policies/quality-guidelines) (2024-07-10), [cws-dashboard-privacy](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy) (2020-06-12) |
| Permissions | Les plus étroites possible. Pas de permission « pour plus tard ». Chaque permission du manifest a son champ de justification ; une permission inutile doit être retirée avant de continuer. | [permissions](https://developer.chrome.com/docs/webstore/program-policies/permissions) (2022-11-01), [cws-dashboard-privacy](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy) |
| Envoi de messages | Interdit d'envoyer des messages au nom de l'utilisateur sans lui laisser confirmer le contenu et le destinataire. | [spam-and-abuse](https://developer.chrome.com/docs/webstore/program-policies/spam-and-abuse) (2022-11-01) |
| Données traitées en local | Elles se déclarent quand même. Une politique de confidentialité est obligatoire dès que l'extension traite des données, même stockées en local. | [user-data-faq](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq), questions 3 et 14 |
| Information visible et consentement | Avant la collecte, l'extension doit dire clairement quelles données elle lit et à quoi elles servent, et obtenir l'accord de l'utilisateur. D'après la FAQ, cet avis doit figurer dans l'interface de l'extension : la fiche du store ne suffit pas. | [disclosure-requirements](https://developer.chrome.com/docs/webstore/program-policies/disclosure-requirements) (2022-11-01), [user-data-faq](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq), question 10 |
| Cohérence | Les champs de confidentialité ne doivent contredire ni la politique de confidentialité ni le comportement de l'extension, sous peine de retrait. | [listing-requirements](https://developer.chrome.com/docs/webstore/program-policies/listing-requirements) |
| Icône | PNG 128 × 128 dans le ZIP. Dessin de 96 × 96 avec 16 px de marge transparente de chaque côté ; lisible sur fond clair comme sur fond sombre. | [images](https://developer.chrome.com/docs/webstore/images) (2018-06-11) |
| Captures | 1 au moins, 5 au plus, 1280 × 800 (préféré) ou 640 × 400, coins carrés, sans marge. Elles montrent l'expérience réelle. | [images](https://developer.chrome.com/docs/webstore/images), [best-listing](https://developer.chrome.com/docs/webstore/best-listing) |
| Vignette promotionnelle | 440 × 280, PNG ou JPEG. Facultative, mais les extensions sans vignette s'affichent après celles qui en ont une. Peu de texte, couleurs saturées, rendu lisible même réduit de moitié. | [images](https://developer.chrome.com/docs/webstore/images) |
| Bannière | 1400 × 560, facultative ; elle ne sert que si le store met l'extension en avant dans son carrousel. | [images](https://developer.chrome.com/docs/webstore/images) |
| Classement | Calculé par une heuristique : notes des utilisateurs, téléchargements, désinstallations dans le temps. | [best-listing](https://developer.chrome.com/docs/webstore/best-listing) |
| Catégories | 18 catégories listées (l'annonce de mi-2023 en comptait 17 ; liste au § 5). | [best-practices](https://developer.chrome.com/docs/webstore/best-practices#choose-category-well) |
| Compte | Inscription avec des frais uniques ; l'adresse e-mail du compte ne peut plus être changée ensuite. | [register](https://developer.chrome.com/docs/webstore/register) (2026-11-02) |

Non vérifié : le **montant** des frais d'inscription. La page officielle ne l'affiche plus ;
`docs/LANCEMENT.md` dit « environ 5 $ ». Le montant exact s'affiche au moment du paiement.

## 2. Nom

**Proposition : `Terouva : alertes de location`** (29 caractères sur 75).

- La marque d'abord, puis les mots que tape un locataire. Le titre décrit la fonction sans
  bourrage, comme le demande la page best-listing.
- **Leboncoin n'est pas dans le nom.** Le brief l'interdit (« jamais Leboncoin dans le nom du
  produit »), et un nom comme « alertes Leboncoin » peut laisser croire à une extension du site
  lui-même, ce que la règle sur l'usurpation interdit. Le site observé est cité dans le résumé et la
  description, à côté de la mention « non affilié ».
- Le nom actuel du manifest, `Terouva — alertes Leboncoin`, ne respecte ni le brief (marque tierce
  dans le nom) ni la règle du tiret cadratin. Il est à remplacer dans le code (voir § 9).
- `short_name` : `Terouva` (inchangé).

Ce qu'on perd : sur le store, une recherche « leboncoin » ne trouvera plus le mot dans le titre.
Il reste dans le résumé et dans la description. On l'accepte : le brief prime.

## 3. Résumé (champ `description` du manifest, 132 caractères au plus)

Le store prend ce texte dans le manifest : il faut donc le reporter dans le code avant de zipper.

> Vous prévient quand une annonce de location sur leboncoin.fr vous correspond. Tout reste sur votre ordinateur. Non affilié.

123 caractères (compté au script le 2026-11-04). Il dit ce que fait l'extension, sur quel site,
et sa promesse de confidentialité, qui la distingue. « Non affilié » tient dans la limite et
lève l'ambiguïté dès les résultats de recherche.

Variante sans la marque, si Hugo préfère ne pas citer le site dans le résumé :

> Vous prévient dès qu'une nouvelle annonce de location vous correspond. Vous relisez et répondez vous-même. Tout reste chez vous.

128 caractères.

Ce champ ne parle pas du presse-papiers : il ne change pas si la fonction de remplissage est retirée.

## 4. Description longue

Texte brut à coller dans l'onglet de la fiche (« Store listing ») du tableau de bord, environ
2 300 caractères. Le mot « leboncoin » y apparaît deux fois, loin de la limite de cinq répétitions.

```text
Terouva repère les nouvelles annonces de location qui correspondent à votre recherche, leur donne une note sur 100 et vous prévient. Vous gardez la main : vous relisez l'annonce et vous contactez le propriétaire vous-même.

Comment ça marche
- Ouvrez votre recherche de location sur leboncoin.fr comme d'habitude, et gardez l'onglet ouvert.
- Ouvrez l'application Terouva (terouva.com/app) dans un autre onglet et indiquez ce que vous cherchez : ville, budget, surface.
- Quand de nouvelles annonces apparaissent sur votre page de recherche, par exemple après un rechargement, l'extension les transmet à l'application, qui les note selon vos critères.
- Si une annonce dépasse votre seuil, une notification s'affiche. Un clic ouvre l'annonce.

Sur la page d'une annonce
Quand vous ouvrez une annonce, l'extension lit son détail (description, ville, surface, nombre de pièces) pour affiner la note. Un bouton « Remplir mon message Terouva » colle dans le formulaire de contact le message de candidature que vous avez copié depuis l'application. L'envoi reste toujours manuel : vous relisez, puis vous cliquez vous-même sur « Envoyer ».

Ce que l'extension lit, et où cela va
- Elle lit seulement les pages de recherche et d'annonces que vous ouvrez vous-même : titre, prix, surface, ville, photos et lien de chaque annonce.
- Ces informations restent sur votre ordinateur. Elles passent de l'extension à l'application Terouva ouverte dans votre navigateur, qui les garde dans le stockage local de celui-ci.
- Rien n'est envoyé à nos serveurs ni à un tiers. Pas de compte, pas de publicité, pas de suivi.

Ce qu'elle ne fait jamais
- Aucune requête automatique vers le site d'annonces : elle lit ce qui est déjà affiché.
- Aucun rechargement, aucun clic, aucun défilement à votre place.
- Aucun envoi de message à votre place.
- Aucune lecture des autres sites que vous visitez.

À découvrir aussi sur terouva.com
Deux outils sans inscription : la liste des pièces de votre dossier de location selon votre situation, et un générateur de message de candidature. Et des guides sourcés sur le garant, la garantie Visale, le dépôt de garantie et le refus de dossier.

Terouva est un service indépendant. Il n'est ni affilié à Leboncoin, ni approuvé par lui.

Confidentialité : https://terouva.com/confidentialite
```

**Variante si le remplissage depuis le presse-papiers est retiré** (décision du pôle CTO).
Remplacer le paragraphe « Sur la page d'une annonce » par :

```text
Sur la page d'une annonce
Quand vous ouvrez une annonce, l'extension lit son détail (description, ville, surface, nombre de pièces) pour affiner la note. L'application prépare votre message de candidature : vous le copiez, vous le collez dans le formulaire de contact, et vous l'envoyez vous-même.
```

Pourquoi cet ordre : la description répond aux questions dans l'ordre où l'utilisateur se les
pose (que fait-elle, comment, que lit-elle, où vont les données, que ne fait-elle jamais). La
partie « ne fait jamais » répond aussi au relecteur de Google, qui vérifie la règle sur l'envoi
de messages au nom de l'utilisateur.

## 5. Catégorie, langue, distribution, liens

- **Catégorie : `Household`** (« outils pour la maison : recettes, budget, recherche de
  produits… »). C'est la catégorie du groupe « Lifestyle » la plus proche de la recherche de
  logement. Repli : `Workflow & Planning`, si le relecteur la juge plus juste.
  Les 18 catégories de la page officielle : Accessibility, Art & Design, Communication, Developer Tools,
  Education, Entertainment, Functionality & UI, Games, Household, Just for Fun, News & Weather,
  Privacy & Security, Shopping, Social Media & Networking, Tools, Travel, Well-being,
  Workflow & Planning. Leurs libellés français dans le tableau de bord n'ont pas été vus.
- **Langue** : français.
- **Distribution** : la France suffit (l'onglet Distribution permet de choisir les régions). Le
  produit ne sert que leboncoin.fr ; à Hugo de trancher s'il veut toucher aussi les francophones
  installés ailleurs qui préparent un déménagement en France.
- **Page d'accueil** : `https://terouva.com`
- **Assistance** : `https://terouva.com/mentions-legales` (l'adresse de contact y figure).
- **URL officielle (éditeur validé)** : `terouva.com`, si le compte développeur est le même compte
  Google que celui qui possède la propriété Search Console `sc-domain:terouva.com`.
- **Contenu pour adultes** : non.

## 6. Onglet « Pratiques de confidentialité »

### Objectif unique

```text
Aider une personne qui cherche une location à repérer les nouvelles annonces qui correspondent à ses critères sur les pages leboncoin.fr qu'elle consulte, et à y répondre elle-même. L'extension lit ces pages, transmet les annonces à l'application Terouva ouverte dans le même navigateur, affiche une notification quand une annonce correspond, et aide à remplir le message de candidature, que l'utilisateur envoie toujours lui-même.
```

Variante sans le presse-papiers : retirer « , et aide à remplir le message de candidature, que
l'utilisateur envoie toujours lui-même » et terminer après « quand une annonce correspond ».

### Justification de chaque permission

Alignée sur le code du 2026-11-04. Le § 9 dit lesquelles sont peut-être de trop.

| Permission | Justification à coller | Où dans le code |
|---|---|---|
| `activeTab` | Quand l'utilisateur ouvre l'onglet « Capturer » du menu de l'extension, elle lit l'annonce affichée dans l'onglet actif, et seulement celui-ci, à sa demande. | `popup/popup.js` (`getActiveTab`, `extractActiveAd`) |
| `scripting` | Injecter, à la demande de l'utilisateur et dans l'onglet actif seulement, le script qui lit l'annonce affichée (titre, prix, surface, ville, photos). | `popup/popup.js:122-123` |
| `storage` | Mémoriser en local : l'état marche ou pause de la surveillance, les annonces détectées pendant que l'application est fermée (200 au plus), le code qui relie l'extension à l'application Terouva, et le lien des notifications en cours. | `background/service-worker.js`, `content/watch.js`, `popup/popup.js` |
| `notifications` | Prévenir l'utilisateur quand une annonce dépasse le seuil de note qu'il a choisi. Un clic sur la notification ouvre l'annonce. | `background/service-worker.js` (`showNotif`) |
| `tabs` | Ouvrir l'application Terouva et l'annonce d'une notification dans un nouvel onglet, et lire l'adresse de l'onglet actif pour vérifier qu'il s'agit d'une annonce. | `popup/popup.js:52, 118`, `background/service-worker.js` (clic sur notification) |
| `clipboardWrite` | Bouton « Copier JSON » de l'onglet « Capturer » du menu : copie les informations de l'annonce affichée dans le presse-papiers, à la demande de l'utilisateur. | `popup/popup.js:78` |
| `clipboardRead` | Bouton « Remplir mon message Terouva » sur une page d'annonce : au clic, et seulement à ce moment, l'extension lit le message de candidature que l'utilisateur vient de copier depuis Terouva et le place dans le formulaire de contact. L'utilisateur relit et clique lui-même sur « Envoyer ». | `content/content.js` (`tvFill`) |
| Hôtes `https://www.leboncoin.fr/*`, `https://leboncoin.fr/*` | Lire les pages de résultats de recherche et les pages d'annonces que l'utilisateur ouvre lui-même, pour repérer les nouvelles annonces. Aucune requête n'est faite vers ce site : l'extension lit ce qui est déjà affiché. | `manifest.json` (`content_scripts`), `content/watch.js`, `content/content.js` |

À donner aussi au relecteur, dans le champ libre ou en note : `externally_connectable` n'autorise
que l'application Terouva sur son propre domaine à se connecter à l'extension ; toute autre
origine est refusée (`background/service-worker.js`, `originAllowed`).

**Code distant** : « Non, je n'utilise pas de code distant ». Tous les scripts sont dans le ZIP.

**Variante sans le presse-papiers** : retirer `clipboardRead` du manifest et sa ligne ci-dessus.
`clipboardWrite` ne reste que si le bouton « Copier JSON » du menu est gardé.

### Utilisation des données

La FAQ officielle impose de déclarer les données même quand elles restent sur l'appareil
(question 3). Les types ci-dessous reprennent la liste de la FAQ (question 4). Les libellés exacts
des cases du tableau de bord n'ont pas été vus : cocher ceux qui correspondent.

| Type de données | À cocher | Pourquoi |
|---|---|---|
| Contenu de sites web | **Oui** | Titre, prix, surface, ville, description, photos et lien des annonces ; nom et type d'annonceur (particulier ou professionnel) lus sur la page d'annonce (`content/content.js`, `ad.owner`). |
| Activité de navigation | **Oui** | Adresses des pages de recherche et d'annonces leboncoin.fr ouvertes, et adresse de l'onglet actif quand l'utilisateur ouvre le menu. |
| Contenu créé par l'utilisateur ou communications personnelles | **Oui**, tant que `clipboardRead` existe | Le message de candidature lu dans le presse-papiers au clic sur « Remplir mon message ». Variante sans le presse-papiers : **Non**. |
| Données d'identification personnelle | Non | L'extension ne lit ni le nom, ni l'e-mail, ni le téléphone de l'utilisateur. Le nom d'annonceur lu sur une annonce relève du contenu de la page. |
| Authentification | Non | Le code qui relie l'extension à l'application est généré par l'application, n'est pas un identifiant de compte et reste dans le navigateur. Aucun mot de passe, aucun cookie. |
| Données financières, de santé, localisation | Non | Aucune. La ville d'une annonce n'est pas la position de l'utilisateur. |

Certifications à cocher (vraies d'après le code) : pas de vente ni de transfert des données à des
tiers ; pas d'usage sans rapport avec l'objectif unique ; pas d'usage pour évaluer la solvabilité
ou accorder un prêt.

**Politique de confidentialité** : `https://terouva.com/confidentialite`.
Cohérence vérifiée le 2026-11-04 avec la page publiée :
- « lit le contenu des pages de recherche et d'annonces Leboncoin que vous ouvrez vous-même » :
  conforme au code.
- « n'effectue aucune requête automatique vers Leboncoin, n'envoie rien à un serveur » :
  conforme, à une réserve près : l'état marche ou pause est rangé dans `chrome.storage.sync`,
  que Chrome synchronise par le compte Google de l'utilisateur. C'est un simple oui ou non, mais
  c'est un envoi hors de l'appareil. Voir § 9.
- Section « Presse-papiers » : conforme au code (lecture au clic seulement).
- La politique ne cite pas le nom de l'annonceur parmi ce que lit l'extension. Ce n'est pas une
  contradiction (« le contenu des pages »), mais une phrase de plus lèverait le doute pour le
  relecteur. La page n'appartient pas au pôle SEO : à transmettre au propriétaire du site.

## 7. Visuels

### Icône (obligatoire, dans le ZIP)

`apps/extension/icons/128.png` existe (128 × 128, PNG avec transparence). Vue le 2026-11-04 :
un « T » blanc sur un carré à dégradé violet qui remplit presque tout le cadre. Deux écarts :
- la règle officielle veut un dessin de 96 × 96 avec 16 px de marge transparente ;
- le dégradé violet ne correspond pas à l'identité du site, et BONDS exclut le violet par défaut.
À confier au pôle Design avant la soumission (l'icône est aussi celle des notifications).

### Captures (1280 × 800, coins carrés, sans marge, 5 au plus)

Elles doivent montrer le produit réel, version publiée. Une légende courte peut être posée sur
l'image, six mots au plus, dans la typographie du site. Sur les pages du site d'annonces :
**flouter les photos, les noms et les numéros des annonceurs**, et éviter que le logo du site
occupe le premier plan (données de tiers, marque d'autrui).

| # | Écran | Ce qu'il doit montrer | Légende |
|---|---|---|---|
| 1 | `/app`, flux des annonces | Plusieurs annonces avec leur note sur 100, la recherche active nommée, une annonce mise en avant au-dessus du seuil. C'est la capture qui vend : elle passe en premier. | « Les nouvelles annonces, déjà notées » |
| 2 | Page de recherche de location, avec la pastille Terouva | La pastille en bas à droite (« Terouva : 3 annonces détectées »), la liste de résultats floutée derrière. | « Gardez votre recherche ouverte » |
| 3 | Notification Chrome | La notification d'une annonce au-dessus du seuil (note, prix, surface, ville), sur un bureau sobre. À capturer **après** la correction du texte des notifications (§ 9). | « Prévenu dès qu'une annonce correspond » |
| 4 | Page d'annonce, bouton « Remplir mon message Terouva » | Le formulaire de contact rempli, le message lisible, le bouton « Envoyer » du site bien visible et pas encore cliqué. | « Vous relisez, vous envoyez » |
| 5 | Menu de l'extension (onglet Surveillance) | Le menu ouvert sur une page de recherche : surveillance active, bouton « Ouvrir l'application Terouva », mention « Tout reste sur votre ordinateur ». | « Tout reste sur votre ordinateur » |

Variante sans le presse-papiers : la capture 4 montre l'écran de `/app` où le message de
candidature est prêt à copier, légende « Votre message, prêt à relire ».

Pour les produire : Playwright n'était pas joignable dans cette session. Le jour venu, il faut un
navigateur avec l'extension chargée et une vraie recherche ouverte. Les captures 2 à 4 dépendent
d'une page réelle du site d'annonces, donc des annonces de tiers : floutage obligatoire.

### Vignette promotionnelle 440 × 280 (recommandée)

Sans elle, la fiche passe après les extensions qui en ont une. Elle montre la marque, pas une
capture : le mot « Terouva » dans la typographie du site, sur la couleur de fond du site (champ
coloré plein cadre, sans blanc dominant), avec un seul motif tiré du produit (une note « 92 » sur
une carte d'annonce stylisée, par exemple). Pas de phrase, pas de logo d'un tiers, aucune mention
du type « n° 1 ». À confier au pôle Design ou à `seo-visuels`.

### Bannière 1400 × 560 (facultative)

Même composition en plus large, sans texte de plus. À faire seulement si la vignette est validée.

### Vidéo YouTube (facultative)

Elle passerait en tête de la galerie. Pas de vidéo à ce stade.

## 8. Ce qu'Hugo fait lui-même

1. **Créer le compte développeur** sur le tableau de bord du Chrome Web Store, avec une adresse
   e-mail dédiée et définitive (elle ne pourra plus être changée). Payer les frais uniques. Vérifier
   l'adresse e-mail de contact. Nom d'éditeur : à décider (« Terouva » ou « Blue Lake Dev »,
   l'éditeur nommé dans les mentions légales).
2. **Avant de zipper**, faire appliquer par le pôle CTO les corrections du § 9, au moins les
   bloquantes : domaine `terouva.com`, nom, résumé, texte des notifications, permissions.
3. **Zipper** `apps/extension/` (sans le README s'il n'est pas mis à jour) et le téléverser.
4. **Coller** les textes des § 3 à 6. Téléverser les captures et la vignette du § 7.
5. **Soumettre** à la relecture de Google.
6. **Après publication** : copier l'identifiant de l'extension (la chaîne de 32 lettres dans l'URL
   de la fiche) dans la variable d'environnement `NEXT_PUBLIC_TEROUVA_EXT_ID` du projet Vercel,
   puis redéployer le site. Sans cela, `/app` ne trouve pas l'extension publiée
   (`apps/web/components/app/lib/extBridge.ts`).
7. **Prévenir le pôle SEO** : les boutons du site passent de « Être prévenu » à un vrai lien vers
   la fiche (page `/telecharger` à brancher), et `seo-autorite` ajoute l'URL de la fiche aux profils
   d'entité (`sameAs`).

## 9. À corriger dans l'extension avant soumission (pôle CTO)

Relevé dans le code le 2026-11-04, sans rien modifier. Classé du plus bloquant au moins urgent.
Passe anti-IA des textes publics de la fiche (§ 3, 4, 6) : `zero-slop` le 2026-11-04, score 18/100
(« clear »), aucune tournure relevée sur 527 mots.

1. **Domaine de l'application (bloquant).** `externally_connectable.matches` (manifest) et
   `PAGE_ORIGINS` (`background/service-worker.js:21`) n'autorisent que `https://terouva.vercel.app`
   et `http://localhost:3030`. Or `apps/web/next.config.ts` redirige `terouva.vercel.app` vers
   `terouva.com` : la page `/app` servie sur `terouva.com` sera refusée par l'extension publiée.
   Ajouter `https://terouva.com` aux deux endroits, et passer `APP_URL` (`popup/popup.js:9`) à
   `https://terouva.com/app`. Chaque changement de domaine après publication impose une nouvelle
   relecture : à faire avant la première.
2. **Nom et résumé (bloquant pour la fiche).** `name` du manifest : `Terouva — alertes Leboncoin`
   (marque tierce et tiret cadratin) → `Terouva : alertes de location`. `description` → le texte
   du § 3. `action.default_title` : `Terouva — Capture & surveillance` → par exemple
   `Terouva : surveillance des annonces`.
3. **Information et consentement dans l'extension (à trancher).** La FAQ du store (question 10)
   demande que l'extension elle-même dise quelles données elle lit, avant de les lire, et recueille
   l'accord de l'utilisateur. Aujourd'hui, `watch.js` et `content.js` lisent dès l'installation
   (surveillance active par défaut) et rien ne s'affiche avant. Piste : un écran de premier
   lancement dans le menu ou dans `/app`, avec un bouton « Activer la surveillance ».
4. **Permissions en trop (risque de refus).** `tabs` paraît inutile : `chrome.tabs.create` n'en a
   pas besoin, et `activeTab` donne déjà l'adresse de l'onglet actif quand l'utilisateur ouvre le
   menu. À vérifier puis retirer. À vérifier aussi : `host_permissions` sert-il encore, alors que
   les `content_scripts` déclarent leurs propres pages et que l'injection à la demande passe par
   `activeTab` ? `https://leboncoin.fr/*` (sans `www`) n'a aucun script associé. Enfin,
   `localhost:3030` dans `externally_connectable` peut sortir de la version publiée.
5. **Texte des notifications.** `background/service-worker.js` : titre par défaut
   `Terouva — annonce chaude` (tiret cadratin) et message `Une annonce correspond à ta recherche.`
   (tutoiement, alors que tout le produit vouvoie). Le titre construit dans
   `apps/web/components/app/lib/extBridge.ts` est correct (`92/100 · titre`).
6. **Textes injectés sur les pages.** `content/content.js` : « Copie d'abord ton message »,
   « Ouvre le formulaire », « Clique pour remplir », et l'infobulle « Terouva — l'envoi reste
   manuel : tu cliques… » : tutoiement et tiret cadratin. À passer au vouvoiement.
7. **`storage.sync` face à la politique de confidentialité.** L'état marche ou pause
   (`terouva.watchEnabled`) est rangé dans `chrome.storage.sync`, synchronisé par le compte Google.
   Soit passer à `chrome.storage.local` (le plus simple, cohérent avec « rien ne quitte
   l'appareil »), soit ajouter une phrase à la politique de confidentialité.
8. **Décision produit : le remplissage depuis le presse-papiers.** Le bouton remplit le formulaire
   de contact du site d'annonces. L'envoi reste manuel, ce qui respecte la règle du store sur
   l'envoi au nom de l'utilisateur et la ligne rouge « l'humain envoie », mais c'est une écriture
   dans la page d'un tiers. La fiche est prête dans les deux cas (variantes aux § 4, 6 et 7).
9. **README périmé.** `apps/extension/README.md` décrit encore l'ancien serveur local
   (`127.0.0.1:8765`, jeton de jumelage, onglet Réglages), retiré du code. Il contient aussi des
   tirets cadratins. Ne pas l'inclure dans le ZIP tant qu'il n'est pas réécrit.
10. **Icône** : voir § 7 (marge de 16 px, couleur hors identité), pôle Design.

## 10. Concurrence observée sur le store

Le Chrome Web Store ne s'ouvre pas dans le navigateur intégré de la session, et la recherche web
ne remonte que des annuaires tiers. Relevé partiel du 2026-11-04 :
- une extension « Alertes leboncoin » (v3.4), vue sur l'annuaire tiers ExtScope, dit lancer des
  recherches automatiques sur le site pour alerter. C'est l'angle inverse de Terouva : la fiche
  insiste donc sur « aucune requête automatique, aucun rechargement à votre place » ;
- d'autres extensions portent le nom du site dans leur titre (« Leboncoin Notes », « Leboncoin
  Plus », « Leboncoin Relister ») : le choix d'un nom sans marque tierce nous distingue aussi de
  ces usages.

À faire par Hugo dans son propre Chrome, avant soumission : chercher « leboncoin », « alerte
location » et « annonces location » sur le store et noter les cinq premières fiches (nom, résumé,
nombre d'utilisateurs, note). Le relevé complète ce paragraphe.

## 11. Mesure après publication

À relever par Hugo dans le tableau de bord développeur, puis à noter dans `docs/seo/JOURNAL.md` :
installations, utilisateurs actifs par semaine, impressions de la fiche, désinstallations (elles
pèsent dans le classement). Position de la fiche sur quatre recherches du store : « terouva »,
« alerte location », « annonces location », « leboncoin ». Premier relevé une semaine après la
publication, puis tous les mois.
