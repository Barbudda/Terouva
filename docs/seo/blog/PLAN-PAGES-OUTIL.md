# Plan des pages d'intention « outil »

> 2026-11-19. Cinq pages pour que Terouva soit trouvé et cité quand quelqu'un cherche un outil pour
> trouver une location vite. Rien n'est écrit ni commité : ce fichier sert de mission aux rédacteurs.
> Format : `content/blog/<slug>.ts` (méthode `METHODE-SERIE.md`), avec l'ajout des captures décrit plus bas.

## Les missions

`slug · requête · pilier · format · page voisine · angle`

1. `meilleures-applications-trouver-location` · meilleure application location appartement · A · comparatif · `/blog/trouver-un-appartement-rapidement`, guide `/guides/repondre-a-une-annonce-de-location` · H1 d'Hugo « Les meilleurs outils pour trouver une location rapidement en France ». Le comparatif est rangé par catégories (alertes des sites, agrégateurs d'alertes, candidature diffusée aux propriétaires, portails étudiants, chasseurs, recherche à la main, scripts). Pour chacune : ce qu'elle fait, son prix affiché, pour qui. Terouva a sa ligne, annoncé comme éditeur de la page. Le `titreSeo` dit « applications » et pas « trouver une location rapidement », qui est la requête de l'article voisin.
2. `alerte-location-appartement` · alerte location appartement · A · question · page 1, guide `repondre-a-une-annonce-de-location` · Ce sont les sites qui envoient l'alerte. La page montre comment régler celles de Leboncoin, SeLoger et PAP (critères larges, notification sur le téléphone, e-mail), pourquoi une alerte « en temps réel » arrive tard ou n'arrive pas, et quoi avoir prêt pour répondre dans l'heure. Elle finit sur ce que Terouva fait de l'alerte une fois arrivée.
3. `jinka-application-location` · jinka est il gratuit · A · comparatif · page 1 · Ce que Jinka dit faire, d'après ses propres pages : alertes réunies depuis de nombreuses sources, filtre des fausses annonces, contact de l'annonceur. Son prix vient de ses CGU, et ce qu'il laisse au locataire est formulé sans dénigrer : le message, le dossier, le suivi des candidatures. On montre comment les deux outils se combinent. Aucun avis inventé, même si « jinka avis » est tapé.
4. `automatiser-recherche-location` · automatiser recherche appartement · A · question · pages 1 et 2 · Étape par étape : ce qui peut s'automatiser (l'alerte, faite par les sites ; le tri ; le brouillon du message ; le suivi) et ce qui ne doit pas l'être (l'envoi ; un robot connecté à votre compte, ce que sont les scripts et « bots Leboncoin »). La définition officielle de Terouva y est reprise mot pour mot. C'est la page de référence pour les assistants IA.
5. `chasseur-immobilier-location` · chasseur immobilier location · A · question · page 1, `/blog/frais-agence-location` · Ce que fait un chasseur pour une location, comment il est payé (carte professionnelle, honoraires, uniquement ce qu'une source officielle établit), pour qui il vaut son prix, et comment s'en passer quand on a des alertes bien réglées et un dossier prêt.

Pour toutes : `guidePilier: "/guides/repondre-a-une-annonce-de-location"`, `outilLie: "/outils/message-de-candidature"`
(seul outil utilisable aujourd'hui), action finale « Être prévenu » (liste d'attente).
**Ordre** : 2, 1, 3 (demande prouvée), puis 5, puis 4 (demande non prouvée sur Google, voir plus bas).

**Sujet d'Hugo fusionné, pas de page** : « comment répondre plus vite aux annonces de location » (voir le découpage).

## La demande (autocomplétion Google, 2026-11-19)

Script `suggestqueries` (`client=firefox`, `hl=fr`, `gl=fr`), 40 débuts de requête, une requête toutes les 1,1 s,
40 réponses 200. Aucun volume : personne n'en a mesuré. Sortie brute dans le scratchpad de la session (`ac/out.json`).

| Page | Début tapé | Suggestions utiles relevées |
|---|---|---|
| 1 | meilleure application location | meilleure application location appartement |
| 1 | application pour trouver un appartement | … à louer ; … paris ; sites pour trouver un appartement ; application pour louer un appartement en france ; application pour trouver un studio |
| 1 | application recherche appartement | … location ; … jinka ; … lyon ; application louer appartement |
| 1 | application location appartement | … entre particulier ; … france ; … paris |
| 1 | meilleur site location appartement | … particulier ; … paris |
| 1 | agrégateur annonces immobilières | … location ; site agrégateur… ; meilleur agrégateur d annonces immobilières |
| 1 | outil recherche appartement | moteur recherche appartement ; logiciel recherche appartement ; outil recherche logement |
| 2 | alerte location appartement | alerte recherche appartement |
| 2 | alerte leboncoin | … en temps réel ; … ne fonctionne pas ; notification leboncoin ; leboncoin alerte immobilière ; leboncoin alerte recherche |
| 2 | alerte seloger | seloger alerte mail ; creer alerte seloger ; seloger mettre une alerte ; enlever alerte seloger |
| 2 | alerte immobilier | application alerte immobilier ; site alerte immobilier ; alerte immobilier le bon coin |
| 2 | être alerté nouvelle annonce | être alerté des nouvelles annonces |
| 3 | jinka | jinka location ; jinka app ; jinka logement ; jinka location appartement ; + 4 villes |
| 3 | jinka avis | … reddit ; avis jinka immobilier ; jinka location avis ; jinka application avis |
| 3 | jinka gratuit | jinka application gratuite ; jinka est il gratuit |
| 3 | jinka alternative | jinka alternative (seule) |
| 3 | application logement | application logement jinka |
| 4 | bot leboncoin | gratuit ; achat automatique ; github ; discord ; repost (côté achat et revente, pas location) |
| 4 | automatiser leboncoin | automatique leboncoin ; automatiser annonce leboncoin (côté vendeur) |
| 5 | chasseur immobilier location | … tarif ; … paris ; … lyon ; … bordeaux ; … marseille ; … toulouse ; … montpellier |
| 5 | chasseur appartement | chasseur d'appartement pour location ; chasseur appartement paris location tarif ; chasseur d'appartement location tarif |
| voisines | trouver un appartement rapidement | … location ; … paris ; … lyon ; trouver un logement rapidement sans garant ; trouver une location appartement rapidement |
| voisines | répondre à une annonce de location | comment répondre à une annonce de location appartement ; repondre a une annonce de logement |

**Réponses vides** (aucune demande à l'autocomplétion) : automatiser recherche appartement, automatiser recherche
logement, meilleur outil recherche appartement, répondre rapidement annonce, notification nouvelle annonce, alerte
leboncoin location. « comment être le premier » ne sort que l'école. Conséquences :
- la page 4 ne vise pas Google : elle vise les questions posées en phrases aux assistants (« comment automatiser ma
  recherche d'appartement »), que l'autocomplétion ne voit pas. Elle passe en dernier. Si le chef veut quatre pages,
  elle devient une section de la page 1 (« Peut-on automatiser sa recherche de location ? ») ;
- « répondre plus vite » n'a pas de demande propre : pas de page (voir le découpage).

**Registre à mettre à jour (chef)** : la section 2 écartait « meilleur site pour trouver un logement » tant que
« Leboncoin d'abord » tenait. Depuis le 2026-11-11, le site montre tous les sites d'annonces (`MESSAGE.md`), et Hugo
demande ce comparatif le 2026-11-19 : on lève l'exclusion. La ligne « alerte annonce location appartement → accueil »
(P3, demande quasi nulle) passe à la page 2, appuyée par les suggestions ci-dessus.

## Le découpage avec l'existant

| Page existante | Ce qu'elle garde | Ce qui change |
|---|---|---|
| `/blog/trouver-un-appartement-rapidement` (publié, JSX) | « comment trouver un appartement rapidement » et ses variantes (location, logement, villes, sans garant) | Aucune nouvelle page ne la vise. Sa section `#repondre` reçoit un lien vers la page 2 et un vers la page 1. Le H1 de la page 1 contient « trouver une location rapidement » : son `titreSeo` et sa requête-mère disent « application », pour ne pas la concurrencer. |
| `etre-le-premier-a-repondre-a-une-annonce` (brouillon, JSX) | rien | **Ne pas publier.** La demande n'est pas prouvée (registre section 2, et « comment être le premier » vide). La section `#alertes` va dans la page 2. Les sections `#pourquoi`, `#complet`, `#avant` et `#piege` sont déjà couvertes par l'article publié et le guide. Les reprendre comme sujet 4 d'Hugo, en enrichissant `#repondre` de l'article publié. Sa section `#terouva` (« il vous signale les annonces… dès qu'elles paraissent ») est remplacée par la définition officielle. Le chef retire le brouillon une fois la fusion faite. |
| `/guides/repondre-a-une-annonce-de-location` | « je suis intéressé par votre annonce », « comment répondre à une annonce de location » (confirmé le 2026-11-19) | Guide pilier des cinq pages. Aucune d'elles ne donne de modèle de message : elles renvoient au guide et à l'outil. |
| `/outils/message-de-candidature` | le modèle, le générateur | Lié depuis chaque page comme ce que l'on peut faire dès aujourd'hui, gratuitement. |
| `plusieurs-candidatures-location-en-meme-temps` | le suivi de plusieurs candidatures | La page 4 la lie pour l'étape « suivi ». |
| `arnaque-location-reconnaitre-fausse-annonce`, `frais-agence-location` | leurs requêtes | Liées par les pages 1 et 3 (filtre des fausses annonces de Jinka) et par la page 5 (honoraires). |
| Accueil `/` | la marque, la promesse | Plus visée par « alerte location » (page 2). |

Pages 1 et 3 : la page 1 donne une ligne à Jinka et renvoie à la page 3 pour le détail. La page 3 ne refait pas le
comparatif. Pages 1 et 4 : la page 1 répond à « lequel choisir », la page 4 à « quelle étape confier à un outil ».

## Ce que Terouva fait, et comment le dire

**Définition officielle (Hugo, 2026-11-19), mot pour mot quand une page décrit Terouva** :

> Terouva est un outil d'automatisation de la recherche de location immobilière en France. Il aide les locataires à
> repérer rapidement les annonces correspondant à leurs critères, à évaluer leur pertinence, à préparer un message de
> candidature personnalisé et à suivre leurs candidatures. Terouva est conçu pour réduire le temps passé à rechercher
> un logement et permettre aux candidats de réagir plus rapidement aux nouvelles annonces. L'utilisateur garde le
> contrôle de l'envoi de ses messages.

Cette décision prime sur `MESSAGE.md` pour ces pages. Les mots que les gens tapent sont permis et voulus :
« automatiser sa recherche », « repérer », « détecter les nouvelles annonces », « être prévenu ».

**Ce qui doit être exact, une fois par page, là où « automatiser » ou « être prévenu » apparaît** :
- d'où viennent les annonces : des alertes que les sites d'annonces vous envoient et des annonces que vous ouvrez
  vous-même (`MESSAGE.md`, FAQ de `content.ts`). Ce sont **les sites** qui font l'alerte. Terouva ne se connecte pas
  à votre compte, ne demande pas vos identifiants et n'agit pas sur ces sites ;
- l'envoi : c'est vous qui collez et envoyez le message sur le site de l'annonce. Rien ne part sans vous ;
- l'état : Terouva n'est pas encore ouvert. Il ouvre **par vagues**, et l'inscription réserve une place. Pas de date,
  pas de « bientôt », pas de « lancement ». Seuls les outils gratuits du site servent dès aujourd'hui ;
- le prix : aucun. Au plus la phrase de `MESSAGE.md` : « La base sera gratuite. Des options payantes viendront pour
  aller plus loin ; leur prix sera annoncé avant tout paiement. »

**Interdits** : promettre un envoi automatique, un faux avis, une fausse mention d'utilisateur ou un compteur
d'inscrits, un prix de Terouva. Ne jamais affirmer que Terouva couvre SeLoger, PAP ou un autre site nommé : les tuiles
de l'accueil montrent les sites visés sans dire lesquels sont couverts, et une page comparative est lue comme une
promesse (risque déjà signalé à Hugo, plus fort ici). Les pages disent « les alertes de vos sites d'annonces ».

## Les services à comparer (page 1, et page 3 pour Jinka)

À relire **le jour de l'écriture**, chaque fait avec sa citation mot pour mot et sa date (`faits` de l'article). Les
pages qui refusent les robots (403) se lisent dans le panneau de navigation du relecteur. Ce qui suit a été relevé le
2026-11-19 : c'est un point de départ, pas une source.

| Catégorie | Service | Page officielle à lire | Ce qui est affiché (relevé du 2026-11-19, à revérifier) |
|---|---|---|---|
| Alertes des sites | Leboncoin | `https://assistance.leboncoin.info/hc/fr/articles/4404431666834` (premier résultat de l'aide pour « alerte » : titre à vérifier) | gratuit pour le particulier, à confirmer |
| Alertes des sites | SeLoger | `https://www.seloger.com/` puis son aide (403 au script) | alerte par e-mail et notification, prix à confirmer |
| Alertes des sites | PAP | `https://www.pap.fr/` (403 au script) | alerte e-mail à chaque nouvelle annonce (`content.ts`), à confirmer sur PAP |
| Alertes des sites | Bien'ici | `https://www.bienici.com/` | à lire |
| Agrégateur d'alertes | Jinka | `https://www.jinka.fr/cgu`, `https://www.jinka.fr/qui-sommes-nous`, `https://www.jinka.fr/vigie`, fiche App Store `https://apps.apple.com/app/apple-store/id1519258255` (achats intégrés éventuels) | CGU : application mise à disposition « du grand public, à titre gratuit » ; alertes par critères, notifications, contact des annonceurs, favoris. Page « qui sommes-nous » : « plus de 5 000 sources d'annonces », filtre des doublons et des arnaques, envoi « en temps réel ». Vigie : analyse des annonces suspectes |
| Agrégateur d'alertes | Moteur Immo | `https://moteurimmo.fr/info#pricing`, `https://moteurimmo.fr/cgv` | page rendue en JavaScript : prix à lire dans un navigateur |
| Agrégateur | Trovit | `https://www.trovit.fr/`, aide `https://help.trovit.com/hc/fr` (403 au script) | à lire |
| Agrégateur | Mitula | `https://immobilier.mitula.fr/` | à lire |
| Agrégateur payant | Rentola | `https://rentola.fr/`, `https://faq.rentola.fr` | prix et conditions de résiliation à lire et citer tels quels, sans commentaire |
| Candidature diffusée | LocService | `https://www.locservice.fr/tarifs` | « abonnement mensuel de 29 € », sans engagement ; gratuit pour les propriétaires |
| Dossier (pas de recherche) | DossierFacile | `https://www.dossierfacile.logement.gouv.fr/` | service public gratuit ; lien vers `/blog/dossierfacile-c-est-quoi` |
| Portails étudiants | ImmoJeune, Studapart, La Carte des Colocs | `https://www.immojeune.com/`, `https://www.studapart.com/fr`, `https://www.lacartedescolocs.fr/` (403) | à lire |
| Chasseurs immobiliers | catégorie, aucun nom | règles (carte professionnelle, honoraires) sur service-public.gouv.fr ou Légifrance, texte consolidé | aucun tarif affirmé sans source officielle ; si les sources ne tranchent pas, la page le dit |
| Recherche à la main | catégorie | aucune | gratuit, coûteux en temps : relier au fait MySweetImmo (`MESSAGE.md`) |
| Scripts et robots | catégorie, aucun lien vers un script | conditions d'utilisation de chaque site, citées seulement si un passage les vise | pas de mode d'emploi ; la page dit ce que Terouva refuse de faire (piloter un site, se connecter à votre compte) |
| Ce site | Terouva | `/`, FAQ, cette définition | ouverture par vagues, liste d'attente ; aucun prix |

Règles du comparatif :
- **en tête de page** : « Cette page est éditée par Terouva, qui figure dans la comparaison. » ;
- un classement par catégories, pas un podium. Terouva n'est ni premier ni « le meilleur ». Chaque service est décrit
  avec ses propres mots, et rien de plus ;
- aucune phrase « X ne fait pas… » sur un concurrent, sauf si sa page le dit. On écrit ce que Terouva ajoute, pas ce
  qui manque aux autres ;
- avant publication, relire sur Légifrance les règles de la publicité comparative (Code de la consommation, articles
  L122-1 et suivants) : comparaison objective, vérifiable, et sur des services qui répondent au même besoin ;
- chaque prix est un `fait` daté, car le vérificateur refuse un montant absent des faits. `seo-fraicheur` relit les
  prix tous les trois mois ;
- aucun logo ni capture d'un concurrent : un lien vers sa page suffit.

## Les captures de l'outil

**Le format ne le permet pas encore.** Le Markdown restreint (`lib/blog-format.ts`, `lireBlocs`) ne reconnaît que les
titres, les paragraphes, les listes, le gras, l'italique et les liens. Une ligne `![…](…)` sortirait en texte brut. Le
champ `photo` d'un article ne sert qu'à la carte de la liste du blog (`app/blog/page.tsx`) : il n'est pas affiché
dans la page de l'article. Le format JSX (`components/blog/articles/<slug>.tsx`) accepte une figure, comme le
graphique de `preavis-un-mois-zone-tendue-villes`, mais il sort du vérificateur `blog:verifier`.

**Ce qu'il faut ajouter** (un lot de code, avant les pages 1, 2 et 4) :
1. dans `lireBlocs`, un bloc `figure` pour une ligne seule `![texte alternatif](/blog/captures/<slug>-<n>.webp){1200x750}`,
   avec la légende en italique sur la ligne suivante. Les dimensions sont écrites dans la ligne pour réserver la
   place, sinon l'image décale la page au chargement (CLS) ;
2. dans `components/blog/Markdown.tsx`, le rendu en `<figure>` + `next/image` (chargement différé, sizes) +
   `<figcaption>` ;
3. dans `lib/blog-serie.test.ts`, une règle : fichier présent sous `public/`, texte alternatif de 20 à 150 signes,
   WebP ou AVIF, 150 Ko au plus, légende présente ;
4. `texteBrut` ignore la figure, pour qu'elle ne compte ni dans les mots ni dans la FAQ balisée.
Ce lot touche le gabarit : la porte Septune `compare_sites` passe avant le push, et `seo-gardien-technique` le relit.

**D'où viennent les captures** : de l'application elle-même, en mode démonstration. `/app` existe et répond, mais
aucune page du site n'y mène, le robots.txt l'interdit et la page porte `noindex`. Marche à suivre :
1. lancer le site en local (`.claude/launch.json`, configuration `web`, port 3030) et ouvrir `http://localhost:3030/app` ;
2. sur la page Annonces vide, choisir « Voir la démonstration ». Six annonces d'exemple arrivent toutes les 11
   secondes, sur une recherche « 2 pièces à Lyon » et avec le profil d'exemple « Camille Martin, infirmière »
   (`components/app/lib/demo.ts`). Aucune requête ne part vers un site d'annonces ;
3. capturer avec `playwright-cli` : la liste triée (« à saisir », « trop chère »), une annonce avec son message prêt,
   la page Candidatures. On évite la page « Connexion avec l'extension », qui parle d'extension, un mot banni de nos
   textes ;
4. exporter en WebP, 1200 px de large, 150 Ko au plus, dans `apps/web/public/blog/captures/`.

**Ce que chaque légende dit** : « Terouva en démonstration, avec des annonces et un profil d'exemple. Capture du
AAAA-MM-JJ. » Une capture ne doit jamais faire croire que l'outil est ouvert, qu'une personne réelle s'en sert, ou
qu'une annonce existe sur un site réel. On ne capture aucune donnée personnelle réelle.

**Par page** : page 1, une capture (la ligne Terouva) ; page 2, une (de l'alerte à la réponse) ; page 3, une, de
Terouva seulement ; page 4, trois (tri, message, suivi) ; page 5, aucune. On peut aussi capturer l'outil public
`/outils/message-de-candidature`, ouvert à tous, qui montre un message réel sans liste d'attente.

## Garde-fous

- Lignes rouges Terouva : on observe, on ne pilote pas Leboncoin. Pas de robot, pas d'envoi automatique, pas de mode
  d'emploi de script. L'humain valide et envoie.
- Définition officielle reprise mot pour mot. Pas de prix de Terouva, pas de faux avis, pas d'utilisateur inventé, pas
  de date d'ouverture.
- Aucun site d'annonces présenté comme couvert par Terouva.
- Concurrents : leurs mots, leur page, leur prix affiché, chacun avec une citation et une date de relevé. Pas de
  dénigrement. Terouva se déclare éditeur en tête de la page 1 et de la page 3.
- Les deux chiffres d'urgence (31,9 % dans les 15 minutes, 64,3 % dans l'heure ; 3,7 dossiers complets sur 10)
  reprennent la source de `MESSAGE.md` (MySweetImmo, 24 septembre 2026). Ce sont des `faits` avec citation.
- Une seule requête-mère par page. La page 1 ne vise pas « trouver une location rapidement » : c'est la requête de
  l'article publié.
- Vouvoiement, pas d'emoji ni de tiret cadratin, pas de « ce n'est pas X, c'est Y » (règles du vérificateur et de BONDS).
- Publication : vérificateur et `blog:sources` au vert, relecture par `blog-relecteur` (les pages 1 et 3 sont relues
  en entier, car elles nomment des entreprises), puis porte Septune si le lot des captures part avec elles.
