# Ligne éditoriale du blog — Terouva

> Propriétaire : `blog-redacteur-en-chef`. Version 1 du 2026-11-04, à réviser chaque trimestre
> (prochaine revue : semaine du 2027-02-01). Bâtie sur `docs/seo/BRIEF.md`, `docs/seo/REGISTRE.md` v1,
> `docs/seo/blog/VEILLE.md` et les mesures du 2026-11-04 (`docs/seo/JOURNAL.md`).
> Le blog ne crée pas de positionnement : il sert le brief. En cas de doute, le brief et les lignes
> rouges du `CLAUDE.md` priment sur ce fichier.

## 1. À quoi sert le blog

Le site a neuf guides permanents et deux outils. Le blog apporte ce qu'un guide ne peut pas porter :

- **la date** : une règle qui change, un indice publié, un terme légal qui tombe. Le lecteur cherche
  « ce qui change maintenant », pas la règle générale ;
- **la question étroite** : une question réelle (autocomplétion, « Autres questions ») trop précise
  pour mériter une page permanente, mais qui mène au guide ;
- **la situation vécue** : un cas pas à pas (un message sans réponse, un dossier refusé, une visite)
  qui montre le moment où le produit sert.

Chaque article renvoie vers son guide pilier et vers l'outil voisin. Le trafic du blog doit
remonter vers les guides et les outils, jamais l'inverse (brief, section Blog).

## 2. Les quatre piliers

Un article qui ne se rattache à aucun pilier ne se publie pas. Chaque pilier a une page pilier qui
existe déjà ; les articles sont ses satellites. Le poids indique la part visée du calendrier.

| Pilier | Page pilier (existe) | Pages du cluster | Outil voisin | Lien produit | Poids |
|---|---|---|---|---|---|
| **A. Répondre vite et bien** | `/guides/repondre-a-une-annonce-de-location` | guides à créer du registre : trouver rapidement, lettre de motivation, arnaque (P1) | `/outils/message-de-candidature` | 3 | 35 % |
| **B. Le dossier et vos droits de candidat** | `/guides/dossier-de-location` | `/guides/refus-de-dossier` | `/outils/dossier-de-location` | 3 | 25 % |
| **C. Garant et garanties** | `/guides/garant-caution` | `/guides/louer-sans-garant`, `/guides/garantie-visale` | `/outils/dossier-de-location` | 2 | 15 % |
| **D. Le bail et le loyer** | `/guides/preavis-location` (zone tendue) | `/guides/depot-de-garantie`, `/guides/etat-des-lieux` ; guide « loyer » à créer (encadrement, révision, gel F et G) | aucun aujourd'hui | 1 à 2 | 25 % |

**Pourquoi D pèse autant alors que son lien produit est faible.** C'est là que tombent presque toutes
les actualités des douze prochains mois (encadrement, modèles de bail, DPE, IRL, zones tendues). Une
actualité attire des liens et des citations que les guides ne reçoivent pas. Chaque article D doit
quand même trouver l'angle du candidat : « avant de répondre à une annonce » ou « avant de signer ».
Si l'angle candidat n'existe pas, le sujet part en simple mise à jour de guide, pas en article.

**Page pilier manquante.** Le pilier D n'a pas de vrai guide pilier sur le loyer. Les articles
« encadrement » et « IRL » renvoient en attendant vers `/guides/preavis-location` (zone tendue) et
`/guides/repondre-a-une-annonce-de-location`. Je demande au chef d'inscrire au registre un guide
« Le loyer d'une annonce est-il légal ? » (encadrement, complément de loyer, révision IRL, gel des
F et G), à décider après le vote sur l'encadrement (voir le brief `encadrement-des-loyers-novembre-2026`).

### Blog en volume (décision d'Hugo, 2026-11-04 au soir)

Les poids ci-dessus valaient pour un article par semaine. Avec le volume (`BRIEF.md`, « Blog en
volume »), ils deviennent une borne : sur les vagues 5 et 6 (45 articles), A 12, B 13, C 8, D 12.
Le pilier B gagne parce que c'est là que sont les questions précises réellement tapées (« peut-on
louer quand on est… »). Trois règles s'ajoutent, pour que le volume ne devienne pas du contenu de masse :

1. Une série d'articles de même forme (« peut-on louer en CDD, en période d'essai… ») ne passe que si
   chaque article a des faits qui lui sont propres ; deux articles d'une même série ne partent jamais
   dans le même lot.
2. Deux situations dont la réponse est presque la même tiennent dans une seule page (exemple : RSA et
   AAH, `PLAN-VAGUE-6.md`, n° 8).
3. Publication par lots de 7 au plus, toutes les deux semaines, avec une mesure d'indexation entre
   deux lots (`CALENDRIER.md`).

## 3. Guide ou article : la règle

| | Guide | Article de blog |
|---|---|---|
| Requête | une requête-mère du registre | une variante, une question longue ou une requête d'actualité |
| Durée | permanent, mis à jour sans changer d'adresse | daté ; mis à jour seulement pour corriger ou suivre l'actualité qu'il traite |
| Date visible | « mis à jour le » | « publié le » et, s'il y a lieu, « mis à jour le » avec ce qui a changé |
| Qui écrit | `seo-redacteur` sur ligne du registre | `seo-redacteur` sur brief du rédacteur en chef |

1. **Une requête-mère, une page.** Si le registre attribue une requête à un guide (existant ou à
   créer), le blog ne la vise pas. Exemples : « arnaque location annonce », « lettre de motivation
   location », « comment trouver un appartement rapidement » sont des **guides** (registre, P1) ;
   « mail après visite » va à l'outil et à une section du guide. Le blog prend « propriétaire ne
   répond pas », « DossierFacile », les questions étroites et l'actualité.
2. **Une actualité qui change une règle met à jour le guide dans le même lot.** Le brief le dit
   (« guide à mettre à jour ») ; `seo-fraicheur` fait la mise à jour en parallèle de l'article.
3. **Un article ne copie pas son guide.** Il le cite en une phrase et renvoie au lien. S'il faut plus
   de deux paragraphes de la règle générale, c'est le guide qui est incomplet.
4. **Un article qui vieillit mal** (actualité dépassée) reste en ligne avec un encadré en tête qui
   renvoie au guide à jour. On ne supprime pas une page indexée, on ne change pas son adresse.

## 4. Formats

| Format | Raison d'être | Quand | Longueur indicative |
|---|---|---|---|
| **Actualité datée** | Capter la requête du moment et la citation des assistants ; tenir le site juste | Une règle, un chiffre officiel ou un terme change (alerte de `blog-veille-juridique`) | 700 à 1 300 mots |
| **Rendez-vous** (IRL, revalorisation) | Court, attendu, repris chaque trimestre ou chaque année à la même adresse mise à jour | Jour de publication officielle | 400 à 700 mots |
| **Question précise** | Répondre en 40 à 60 mots dès le chapeau à une question réelle, puis détailler | Variante du registre trop étroite pour un guide | 600 à 1 000 mots |
| **Cas pratique pas à pas** | Montrer le moment où un candidat perd ou gagne un logement, et ce qui sert à ce moment | Situation sans page dans le top 10 (angle mort du registre) | 800 à 1 300 mots |
| **Étude de données** | Le seul contenu que les autres n'ont pas ; ce que la presse et les assistants citent | Seulement avec une source publique ouverte et une méthode publiée (`blog-donnees`) | selon l'étude |
| **Modèle** (message, relance) | Utilité immédiate, renvoi vers l'outil qui l'adapte | Toujours adossé à un outil existant | court |
| **Comparatif honnête** | Trancher entre deux solutions pour le même besoin (Visale, garant physique, société de cautionnement) | Critères vérifiables, datés ; **jamais de prix non relevé à la source** | 900 à 1 400 mots |

Exclus : comparatif de sites d'annonces (ligne rouge « Leboncoin d'abord »), « top 10 », liste de
conseils générique, article d'opinion sans fait.

## 5. Structure commune d'un article

1. Titre qui contient la question ou le changement, daté quand c'est une actualité.
2. **Chapeau-réponse** de 40 à 60 mots qui répond seul (c'est ce qu'un assistant cite).
3. Encadré « Ce qui a changé le … » en tête si l'article a été mis à jour.
4. Intertitres formulés en questions, une réponse directe sous chacun.
5. Un passage qui ramène au candidat : « Ce que ça change pour votre recherche ».
6. Liens obligatoires : la page pilier, l'outil voisin, un guide voisin (le brief les nomme).
7. Sources en bas : titre, URL, date de relevé. Chaque chiffre ou règle a sa ligne dans `docs/seo/FAITS.md`.
8. Appel à l'action honnête : « Être prévenu » (liste d'attente) ou l'outil gratuit. Jamais
   « Télécharger » tant que l'extension n'est pas publiée.

## 6. Ton

Celui du brief et des guides existants : vouvoiement, phrases courtes, concret, bienveillant. On
écrit pour quelqu'un qui cherche un logement ce soir, pas pour un juriste. Les guides donnent le
modèle : une idée par paragraphe, un exemple chiffré quand il existe, la règle puis ce qu'on en fait.

- Ce qui est sûr se dit au présent ; ce qui dépend d'un vote ou d'une interprétation se dit comme tel
  (« le texte n'est pas encore adopté », « les sources ne s'accordent pas sur… »).
- Les pratiques (relancer, joindre un dossier) se présentent comme des conseils, jamais comme des règles.
- Passe anti-IA obligatoire (`zero-slop`, un seul outil par texte), puis `blog-relecteur`.

## 7. Interdits

- Lignes rouges : aucun texte qui laisse croire à un envoi automatique ; « Leboncoin » jamais dans
  une ancre ni comme partenaire ; pas de page qui promet d'autres sites d'annonces.
- **Prix, offre, paliers** : hors périmètre du pôle. Aucun article n'en parle.
- Rien d'inventé : pas de statistique d'usage, pas de « nombre de candidats par annonce » sans
  source publique, pas de témoignage, pas de délai de réponse « habituel » présenté comme un fait.
  Les volumes sans source de `catalogue.ts` (lignes 240 et 583) ne sont pas repris.
- Sujets hors cible : achat, investissement locatif, fiscalité du bailleur, gestion pour
  propriétaires, trêve hivernale et expulsions, taxe sur les logements vacants, location saisonnière.
- Pas d'emoji, pas de tiret cadratin, pas de « ce n'est pas X, c'est Y » dans le texte publié.

## 8. Confiance (E-E-A-T) : ce qui manque

Relevé dans le code le 2026-11-04 :

- **Aucune page « Comment nous écrivons »** (sources officielles, date de relevé, correction des
  erreurs, relecture distincte de l'écriture). Elle existe en fait dans notre méthode : il faut la
  dire. À faire produire avant le premier article (`seo-redacteur`, puis `blog-relecteur`).
- **Aucune page auteur.** Le schéma des guides déclare `author: Organization "Terouva"`
  (`components/guides/CadreGuide.tsx:99`). Une page auteur réelle suppose qu'Hugo dise qui signe,
  sous quel nom et avec quel rôle (l'éditeur des mentions légales est Blue Lake Dev). Rien n'est
  inventé en attendant : on garde l'organisation comme auteur.
- **Date de mise à jour** : visible sur 10 pages sur 17 au `geo_audit` du 2026-11-04 ; sur le blog,
  elle est obligatoire (gabarit, section 9).

## 9. Ce qu'il faut construire (spécification pour `seo-gardien-technique`)

Rien n'est codé ici ; c'est le cahier des charges. Le design (gabarit visuel) relève du pôle Design
et de `DESIGN.md` : les articles se lisent longtemps, donc **monde papier**, comme les guides.

**Adresses**
- Rubrique : `/blog`. Articles : `/blog/<slug>`, slug en français sans date, pour qu'une mise à jour
  ne change jamais l'adresse. Pas de pages de catégorie indexées au départ (moins de 15 articles) :
  un filtre par pilier sur `/blog` suffit, en liens rendus côté serveur.
- Brouillons : un champ `statut` ; un article non publié n'est ni rendu, ni dans le sitemap, ni dans
  le flux, ni dans `llms.txt`.

**Données**
- Un fichier à part, par exemple `apps/web/lib/articles.ts` : `catalogue.ts` fait déjà 603 lignes,
  au-dessus de la limite de 500 du projet. Même forme que les guides pour réutiliser les helpers :
  `chemin`, `titre`, `titreSeo`, `description`, `publieLe`, `modifieLe`, `pilier` (A à D),
  `format`, `guidePilier`, `guidesLies`, `outilLie`, `sources` (titre, URL, relevé le),
  `questions` (FAQ), `misesAJour` (date et ce qui a changé), `statut`.

**Gabarit d'article** (dérivé de `CadreGuide`)
- `h1`, chapeau-réponse, ligne « Publié le … · Mis à jour le … » en `<time datetime>`, encadré des
  mises à jour quand `misesAJour` n'est pas vide, sommaire, sources datées en bas, bloc de liens
  « pilier · outil · guide voisin », appel « Être prévenu ».
- Fil d'Ariane visible et `BreadcrumbList` : Accueil › Blog › article.
- Image de partage par article (`opengraph-image`), même famille que celle des guides.

**Schéma**
- `BlogPosting` : `headline`, `description`, `datePublished`, `dateModified`, `author` (organisation
  tant qu'aucune page auteur n'existe), `publisher`, `mainEntityOfPage`, `image`, `inLanguage: fr-FR`,
  `isPartOf` le blog. `FAQPage` seulement si les questions sont visibles dans la page.
- `/blog` : `Blog` ou `CollectionPage` avec la liste des articles.

**Sitemap** (`app/sitemap.ts`)
- `/blog` et chaque article publié, `lastModified` = `modifieLe ?? publieLe`. Jamais la date du
  build (le commentaire du fichier explique pourquoi). `/blog` prend la date de l'article le plus récent.

**Flux RSS** (`app/flux.xml/route.ts`)
- Un seul flux pour tout le contenu : articles et guides, triés par date de publication ; le titre
  du canal s'élargit (« Guides et articles »). Un article mis à jour ne remonte pas en tête (pas de
  faux neuf) ; seule sa `pubDate` d'origine compte. Ajouter `<link rel="alternate"
  type="application/rss+xml">` dans le `<head>` de `/blog` et des articles.

**`llms.txt`** (`app/llms.txt/route.ts`)
- Une section « Articles récents » : les dix derniers, titre, URL, date. Les guides gardent leur
  section. Pas de résumé plus vendeur que l'article.

**Après chaque publication**
- IndexNow (`npm run seo:indexnow`), `audit_page` Septune sur l'article, et `compare_sites` avant le
  push qui crée la rubrique.

**Navigation**
- Lien « Blog » au moins dans le pied et sur `/guides` ; la place dans l'en-tête relève du pôle Design.
