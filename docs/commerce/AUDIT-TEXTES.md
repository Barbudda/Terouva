# Audit des textes du site (accueil et parcours d'inscription)

Relevé du 2026-11-04, lecture seule. Chemins relatifs à `apps/web/`. Un locataire pressé, sur téléphone, cinq secondes par bloc. Verdicts : **gain** (il voit ce qu'il y gagne), **mécanisme**
(on lui explique l'outil), **flou** (il ne comprend pas ou doute), **redite** (déjà dit plus haut).

## 1. L'accueil, section par section

**Hero.** Mention « Bientôt disponible » (`lib/content.ts:43`), titre « Les bons logements, *avant les
autres.* » (`lib/content.ts:44-45`), deux phrases « Terouva vous prévient dès qu'un logement qui vous
correspond paraît sur Leboncoin, avec votre message de candidature déjà écrit. Vous l'envoyez en une
minute, parmi les premiers… » (`lib/content.ts:48-49`), bouton rond « Être prévenu » (`components/sections/Hero.tsx:64`).
- 5 s : « on me prévient des bonnes annonces avant les autres, mais ça n'existe pas encore ».
- Verdict : **gain**, le meilleur bloc du site. Deux freins : le premier mot lu est « Bientôt », et le
  bouton n'a qu'une sortie, une liste d'attente.
- À dire : garder le titre, ouvrir sur le résultat (une visite obtenue), reléguer « bientôt » à côté
  du bouton, et proposer une deuxième porte qui marche aujourd'hui (voir la démo, ou l'outil message).

**Parcours.** « Le parcours », « De l'annonce publiée à votre message envoyé. » (`lib/content.ts:59-60`),
quatre étapes « Publiée sur Leboncoin / Repérée pour vous / Votre message, déjà écrit / Envoyé par vous »
(`lib/content.ts:62-65`), panneaux d'exemple « Six annonces d'exemple, classées pour vous. »
(`components/sections/HeroExemples.tsx:222`), « Suivie dans Terouva jusqu'à la visite. » (`:298`).
- 5 s : « voilà comment ça marche, en quatre étapes ». Verdict : **mécanisme**, et **redite** du hero (trois des quatre étapes y sont déjà). C'est
  exactement le « comment ça marche » qu'Hugo veut sortir, placé en deuxième position.
- À dire : une seule scène vécue (« mardi 8 h 02, l'annonce paraît ; 8 h 05, votre message part »)
  ou fondre ce bloc dans l'avant/après qui suit.

**Avant / après (#gains).** « Ce que vous y gagnez », « Écrivez parmi les premiers, *sans surveiller
votre téléphone.* » (`lib/content.ts:89-91`), « Un bon logement reçoit ses premiers messages en quelques
heures… Terouva s'occupe des deux. » (`lib/content.ts:93`), cartes « Vous la découvrez le soir. » /
« Vous êtes prévenu à sa parution. » (`lib/content.ts:99-105`), repère « Vous arrivez ici »
(`components/sections/Problem.tsx:113`).
- 5 s : « sans, j'arrive trop tard ; avec, j'arrive tôt ». Verdict : **gain**, mais **redite** du hero sur le fond (« parmi les premiers » deux fois en deux écrans).
- À dire : c'est ici que le gain doit devenir concret (une visite de plus, des soirées libérées) ;
  « quelques heures » mérite une source ou un exemple daté pour ne pas sonner comme une affirmation.

**Fonctions.** « Ce que fait Terouva », « Moins de recherche, *plus de visites.* »
(`components/sections/Fonctions.tsx:36-38`), cinq cartes aux titres-gains (`lib/content.ts:119-140`),
pastilles « Bientôt / En démo / Disponible » (`components/sections/Fonctions.tsx:17-23`).
- 5 s : « cinq avantages, dont le premier n'est pas encore là ». Verdict : titres **gain** ; corps **mécanisme** (« Une note sur 100 et ses raisons »,
  `lib/content.ts:125`) ; ensemble en **redite** (alerte, message prêt, « vous relisez, vous envoyez »
  pour la troisième fois). La pastille « Bientôt » posée sur le gain principal (`Fonctions.tsx:18`)
  est honnête mais refroidit.
- À dire : ne garder que ce qui n'a pas encore été dit (savoir laquelle vaut le coup, le suivi, le
  dossier qui reste à vous) et dire « vous écrivez d'abord aux trois annonces qui valent la peine »
  plutôt que « une note sur 100 ».

**Messages.** « Le message », « Un message qui donne envie de vous répondre. »
(`components/sections/Messages.tsx:27-28`), « Qui vous êtes, votre dossier, votre date d'entrée… »
(`:30-31`), « Six messages écrits par Terouva pour les annonces d'exemple. » (`:49`), lien « Écrire le
vôtre, gratuitement » (`:52`).
- 5 s : « des vrais exemples de messages, et je peux en faire un tout de suite ».
- Verdict : **gain**, preuve montrée. À dire : rien sur le fond ; ce lien gratuit mérite d'être dès le hero.

**Outils et guides.** « Gratuit, dès aujourd'hui », « Votre dossier et vos droits, *sans attendre.* »
(`components/sections/Outils.tsx:23-25`), « Ouvrir l'outil » (`:56`), « Les derniers guides » (`:70`).
- 5 s : « il y a des choses gratuites à utiliser maintenant ». Verdict : **gain**, mais déconnecté
  du produit : rien ne dit que ces outils sont un avant-goût de Terouva. À dire : « ce que Terouva fera pour chaque annonce, faites-le déjà à la main, gratuitement ».

**Questions et inscription.** « Ce qu'on nous demande. » (`components/sections/Inscription.tsx:22`), six
questions (`lib/content.ts:144-168`), « Terouva arrive. Soyez prévenu le jour du lancement. »
(`lib/content.ts:71-72`), « Un seul e-mail, le jour où Terouva devient téléchargeable. » (`:73`),
« Prévu pour Mac · Windows » (`lib/content.ts:79-80`, `Inscription.tsx:44`), bouton « Me prévenir »
(`components/ui/WaitlistForm.tsx:115`), confirmation « C'est noté. Vous recevrez un e-mail le jour du lancement. » (`:62`).
- 5 s : « je laisse mon e-mail et j'attends, sans savoir quand ».
- Verdict : FAQ **gain** sur l'envoi et les données ; inscription **flou** : on promet une attente,
  pas un avantage. « Téléchargeable » et « Mac / Windows » contredisent la démo web qui demande
  d'installer une extension Chrome (`components/app/pages/Onboarding.tsx:225-236`).
- À dire : ce que l'inscrit gagne en s'inscrivant (accès en avant-première, tarif de lancement, une
  date ou une saison), et une seule réponse claire à « sur quoi ça marchera ».

## 2. Le parcours de conversion

Arrivée (hero) → bouton « Être prévenu » → saut direct en bas de page (`#inscription`) → e-mail →
« C'est noté ». La barre de navigation répète « Être prévenu » (`components/layout/NavClient.tsx:96`).

Points d’hésitation :
- **Le saut du hero au formulaire** fait passer par-dessus tout l'argumentaire : celui qui clique tôt
  arrive sur un champ e-mail sans avoir vu la preuve (messages, avant/après).
- **Aucune porte vers la démo** : `/app` n'est lié ni depuis l'accueil, ni la nav, ni le pied.
- **La promesse d'inscription est minimale** : « Un seul e-mail » rassure mais n'attire pas.

Objections sans réponse (ou mal placées) :
- **Prix** : seulement en FAQ, « Environ 12 € par mois, avec un essai gratuit » (`lib/content.ts:159`,
  repris `app/llms.txt/route.ts:46`), alors que la décision est un freemium. Rien près du bouton.
- **Confiance** : qui est derrière ? L'éditeur n'apparaît qu'en petit dans le pied
  (`components/layout/Footer.tsx:26`). Pas une ligne humaine (« fait par Hugo, qui a cherché un
  logement à… »). Aucun chiffre ni résultat, ce qui est normal avant lancement, mais rien ne le remplace.
- **Légal vis-à-vis de Leboncoin** : la réponse « Oui. Terouva lit les annonces que vous consultez ou
  recevez déjà par e-mail… ne contourne rien » (`lib/content.ts:163`) est contredite par trois autres
  textes : « vous prévient dès qu'un logement… paraît sur Leboncoin » (`lib/content.ts:48`),
  « Terouva surveille Leboncoin pour vous » (meta du site, `app/layout.tsx:49`, `:68`, `:116`) et
  « L'extension… repère les nouvelles annonces… au fil de l'eau » (`Onboarding.tsx:228`).
  « Surveille pour vous » décrit un robot : c'est le texte le plus risqué du site au regard des lignes rouges.
- **« Ça marche dans ma ville ? »** : aucune mention. La réponse (partout où Leboncoin publie) tient en une ligne.
- **« Que se passe-t-il après ? »** : un e-mail au lancement, sans date, sans avantage, sans dire ce
  qu'on installera. La FAQ « Quand est-ce que ça sort ? » répond « Bientôt » (`lib/content.ts:155`).

## 3. Mots qui reviennent, jargon, tics

- **Redites de fond** : « parmi les premiers » (`content.ts:49`, `:90`, `:106`, `:147`) ; « message
  déjà écrit / prêt » (`:48`, `:64`, `:106`, `:129`) ; « vous relisez, vous envoyez »
  (`:64-65`, `:130`, `HeroExemples.tsx:244`). Le même gain dit cinq fois, les objections zéro fois.
- **Jargon restant** : « Conçu en local · tourne en local · vous appartient » (`content.ts:191`) ;
  « Aucune requête ne part » (`app/outils/page.tsx:220`) ; « Des outils qui tournent dans votre
  navigateur… Rien n'est envoyé à un serveur » (`app/outils/page.tsx:18`) ; « Outil local… Pas de
  serveur » (`app/llms.txt/route.ts:36-39`) ; « Une note sur 100 » (`content.ts:125`).
- **Tics de gabarit** : chaque titre suit le même moule « phrase, *fin en italique.* » (hero,
  `content.ts:44-45` ; gains `:90-91` ; `Fonctions.tsx:38` ; `Outils.tsx:25` ; `app/outils/page.tsx:102`),
  chacun coiffé d'une mention en capitales. Effet de série, la page entière a la même voix de titre.
- **Tics d'écriture** : triplets en cascade (« Envoyée, réponse reçue, visite prévue », `content.ts:135` ;
  « pas de compte, pas de serveur, pas de publicité », `:167` ; assurances `:77` ; `WaitlistForm.tsx:125` ;
  `Fonctions.tsx:219`) ; chutes courtes « C'est tout. » (`Onboarding.tsx:236`), « Terouva s'occupe des
  deux. » (`content.ts:93`). Aucun tiret cadratin ni « ce n'est pas X, c'est Y » relevé.
- **Incohérences de vocabulaire** : « téléchargeable » / Mac / Windows (`content.ts:73`, `:79-80`) contre
  extension Chrome et application web ; « Tout reste sur votre ordinateur » (`content.ts:140`) contre
  « Tout reste chez vous » (`app/layout.tsx:68`).

## 4. Ce qui est bon et doit rester

- Le titre « Les bons logements, avant les autres. » (`content.ts:44-45`) : court, gain pur, mot cherché.
- L'avant/après « Vous la découvrez le soir. » (`content.ts:99`) : la phrase qui fait mal, sans agressivité.
- « Rien ne part sans vous. » (`content.ts:151`) : la ligne rouge dite comme un avantage.
- Les vrais messages d'exemple et leur légende honnête (`Messages.tsx:49`), plus « Écrire le vôtre, gratuitement » (`:52`).
- Les pastilles d'état « Disponible / En démo / Bientôt » (`Fonctions.tsx:17-23`) : honnêteté rare, à garder sous une autre forme.
- « Retrait sur simple demande » (`content.ts:77`), « C'est noté. » (`WaitlistForm.tsx:62`), le vouvoiement doux, zéro fausse preuve sociale.

## 5. Les dix changements les plus rentables

1. **Réécrire la description du site** (`app/layout.tsx:49`, `:68`, `:116`) : supprimer « surveille
   Leboncoin pour vous », qui sonne robot, se voit dans Google et contredit la FAQ.
2. **Une seule explication de l'arrivée des annonces**, alignée sur le réel (vos recherches et alertes
   Leboncoin), reprise à l'identique dans le hero (`content.ts:48`), la FAQ légale (`:163`) et l'onboarding (`Onboarding.tsx:228`).
3. **Donner une raison de s'inscrire** (`content.ts:71-77`) : accès en avant-première ou tarif de
   lancement, plutôt que « un seul e-mail ».
4. **Ajouter une deuxième porte dans le hero** (`Hero.tsx:64`) : la démo ou « écrire votre message
   gratuitement », pour celui qui veut voir avant de donner son e-mail.
5. **Retirer « Mac / Windows / téléchargeable »** (`content.ts:73`, `:79-80`) tant que la forme du
   produit (web + extension) n'est pas tranchée par le pôle ; dire « sur votre ordinateur, dans Chrome ».
6. **Aligner le prix** (`content.ts:159`, `app/llms.txt/route.ts:46`) sur le freemium : « gratuit pour
   commencer, options payantes », et le rappeler sous le bouton d'inscription.
7. **Fusionner Parcours et avant/après** (`content.ts:59-66`, `:89-108`) : une seule scène vécue, le
   « comment ça marche » en moins, une redite en moins.
8. **Ajouter deux questions à la FAQ** : « Ça marche dans ma ville ? » et « Que se passe-t-il après
   mon inscription ? » ; et remonter « Est-ce que c'est légal ? » en deuxième.
9. **Une ligne humaine de confiance** près de l'inscription : qui fait Terouva et pourquoi, à la
   place de « Ce qu'on nous demande. » (`Inscription.tsx:22`) qui suppose des clients.
10. **Purger le jargon local** (`content.ts:191`, `app/outils/page.tsx:18`, `:220`) en le traduisant en
    gain : « vos papiers ne quittent pas votre ordinateur » ; et casser le moule de titre en italique
    sur au moins deux sections sur quatre.
