# blog-relecteur : fiche Chrome Web Store (2026-11-04)

Relu : textes publics de `docs/seo/stores/chrome-web-store.md` (commit 5511fbf). Nom (§ 2), résumé (§ 3),
description longue (§ 4), objectif unique, justification des permissions et données déclarées (§ 6).
Confrontés à `apps/extension/` v0.2.0 (manifest, `content/watch.js`, `content/content.js`,
`background/service-worker.js`, `popup/popup.js`, `popup/popup.html`), à la page
`apps/web/app/confidentialite/page.tsx` et au générateur `components/outils/GenerateurMessage.tsx`.
Je n'ai rien modifié dans la fiche : les deux écarts relevés demandent une décision, ce ne sont pas des
fautes matérielles.

Contrôles :
- Longueurs recomptées : résumé 123 caractères, variante 128 (limite 132) ; description 2 307 caractères ;
  « leboncoin » y apparaît 2 fois (limite de répétition : 5).
- Interdits sur les blocs à coller : 0 tiret cadratin, 0 emoji, aucun « ce n'est pas X, c'est Y ».
  zero-slop en inspection : 20,2/100 (« clear »), aucune tournure relevée sur 483 mots.
- Lignes rouges : Leboncoin absent du nom, présent dans le résumé et la description avec « Non affilié »
  et « ni affilié à Leboncoin, ni approuvé par lui » (règle du brief sur les stores respectée). L'envoi
  est dit manuel partout (description, objectif unique, `clipboardRead`), et le code le confirme :
  `tvFill` remplit le champ et ne soumet rien.
- Vérifiés et exacts : références de code de chaque permission (`popup.js:52, 78, 118, 122-123`,
  `showNotif`, `tvFill`, `originAllowed`) ; capture limitée aux annonces Leboncoin (`popup.js:66-67`
  refuse les autres pages avant toute injection, donc « aucune lecture des autres sites » tient) ; file
  de 200 annonces (`BUFFER_MAX`) ; lecture du presse-papiers au clic seulement ; nom et type d'annonceur
  lus (`ad.owner`), bien déclarés ; aucune requête vers le site (`watch.js` lit le DOM, aucun `fetch`).
- Cohérence avec `/confidentialite` : les sections « L'extension de navigateur » et
  « Presse-papiers » disent la même chose que la fiche. La réserve sur `storage.sync` (§ 9.7 de la fiche)
  est juste.

---

### blog-relecteur : fiche Chrome Web Store
Verdict : REFUSÉ en l'état (deux affirmations fausses ; chacune se corrige en une phrase)

Bloquants : 2

1. **Données d'identification personnelle déclarées « Non » (§ 6, tableau « Utilisation des données »,
   ligne 188).** La fiche dit : « L'extension ne lit ni le nom, ni l'e-mail, ni le téléphone de
   l'utilisateur. » Or le message de candidature que lit `clipboardRead` sort du générateur, qui demande
   le prénom et le téléphone (`GenerateurMessage.tsx:34-36`, `:171-174`) ; le modèle du guide le signe
   « Camille Martin, 06 12 34 56 78 ». Une déclaration qui contredit le comportement expose au retrait
   (règle « Cohérence », § 1 de la fiche).
   Correction proposée :
   `| Données d'identification personnelle | **Oui**, tant que clipboardRead existe | Le message de
   candidature lu au clic peut contenir le prénom et le téléphone que l'utilisateur y a mis. Il est placé
   dans le formulaire de contact, ni conservé ni transmis. Variante sans le presse-papiers : **Non**. |`

2. **« par exemple après un rechargement » (§ 4, description, puce 3 de « Comment ça marche »).** Le
   code fait l'inverse : à chaque chargement de page, `watch.js` range toutes les annonces déjà visibles
   comme « déjà vues » (`indexExisting`, commentaire : « pour ne pas renvoyer toute la liste existante »),
   et ne transmet que les annonces ajoutées ensuite à la page par le site lui-même
   (`MutationObserver`). Après un rechargement, les nouvelles annonces visibles ne sont donc pas
   transmises. La description promet une détection que l'extension ne fait pas.
   Correction proposée :
   « - Quand de nouvelles annonces s'ajoutent à votre page de recherche restée ouverte, l'extension les
   transmet à l'application, qui les note selon vos critères. »
   Question pour le pôle CTO : sur leboncoin.fr, la liste de résultats se met-elle à jour sans
   rechargement ? Si non, la détection décrite n'a lieu qu'au changement de page ou de filtre, et c'est
   ce que la fiche doit dire.

Corrections conseillées (non bloquantes) :
- Notifications : elles partent de l'application (`terouva.notify`, `service-worker.js`), donc
  seulement quand `/app` est ouverte. Écrire « Si une annonce dépasse votre seuil pendant que
  l'application est ouverte, une notification s'affiche » évite une promesse trop large.
- Règles du store sans date : `cws-dashboard-listing`, `user-data-faq` et `best-practices` n'ont pas de
  date dans le tableau du § 1. Ajouter la date affichée par la page, ou « date non affichée ».
- Ton marketing (règle d'Hugo du 2026-11-04 : « le gain d'abord, jamais le comment ça marche ; la vie
  privée en une ligne ») : la description ouvre bien sur ce que fait l'extension, mais garde une section
  « Comment ça marche » et une section confidentialité de quatre lignes. Une partie de ces sections sert
  le relecteur de Google (règle sur l'envoi de messages, avis de collecte), donc à garder, mais
  l'intitulé « Comment ça marche » peut devenir « En pratique ». Décision d'Hugo.

Remarques :
- Le § 9 de la fiche (corrections dans l'extension) est juste sur tous les points vérifiés : domaine
  `terouva.vercel.app` seul autorisé (`PAGE_ORIGINS`, `APP_URL`), nom et titre du manifest à tiret
  cadratin, notifications et textes injectés au tutoiement (« Copie d'abord ton message », « Une annonce
  correspond à ta recherche. »), `storage.sync`. À ajouter à ce § 9 : `popup.js:74` affiche « — »
  quand une annonce n'a ni prix ni surface (tiret cadratin dans l'interface, signal 9).
- « Rien n'est envoyé à nos serveurs ni à un tiers » vaut pour les données des annonces. L'appel du
  site à api-adresse.data.gouv.fr (nom de la ville) vient de l'application, pas de l'extension : pas de
  contradiction avec la politique.

Après correction : je ne relis que la ligne 188 et la puce 3 du § 4.
