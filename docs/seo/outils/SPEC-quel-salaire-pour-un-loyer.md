# Spec du troisième outil gratuit : « Quel salaire pour quel loyer »

> Auteur : `seo-outils`, 2026-11-04 (vague 4). Statut : **spec, rien n'est codé**. À valider par le
> chef. Sources lues le 2026-11-04, sauf mention.

## 1. Le choix, et pourquoi pas une de mes trois idées

J'avais proposé trois outils fondés sur la liste des communes et l'encadrement. Le registre commité
(v1 du 2026-11-04) et la veille les affaiblissent tous les trois. Ils désignent un autre outil.

| Candidat | Registre | Veille | Verdict |
|---|---|---|---|
| Loyer encadré : « ce loyer est-il dans les plafonds ? » | P3, outil, lien 2, AC seulement | L'expérimentation **arrive à son terme le 2026-11-23** ; prolongation votée au Sénat le 2026-10-21, pas définitive | Attendre le vote : un outil dont la base légale peut tomber dans 19 jours ne se construit pas maintenant. Revient avec `villes.md` |
| Plafond des frais d'agence et du dépôt | P3, **information**, lien 1 | rien | Un guide suffit (ligne « frais d'agence location ») |
| Date de fin de préavis | variantes du guide préavis, P3, lien 1 | liste des zones tendues (annexe du décret 2013-392) **abrogée au 2027-01-01**, remplaçante à vérifier | Pas avant janvier 2027 ; le simulateur officiel de service-public existe déjà |
| **Quel salaire pour un loyer** | **P1, outil, lien 3** ; dix montants suggérés de 600 à 1 300 € ; PAA dans 3 SERP sur 13 | « trois fois le loyer » signalé comme **pratique non sourcée** à dire comme telle | **Retenu** |

Pourquoi il gagne :
- C'est la seule requête-mère « outil » en P1 du registre, avec un lien produit à 3 : la personne
  vérifie si elle peut candidater, juste avant de répondre à une annonce.
- La SERP « 3 fois le loyer net ou brut » ne montre **aucun outil de calcul dans le top 10**
  (Reddit ×2, SeLoger, Smart-garant ×2, aperçu IA) : verdict « pénétrable par un outil ».
- La règle est stable : elle ne dépend d'aucune liste de communes ni d'aucun texte qui expire.
- L'angle honnête est rare : ce n'est pas une règle de droit. La loi fixe la liste des justificatifs
  de ressources, pas un revenu minimum. Les pages concurrentes le disent mal ou pas du tout.

## 2. Ce que l'outil fait

**Deux sens, un seul calcul** : loyer → ressources attendues, ou ressources → loyer qui passe.

**Entrées** (une question visible à la fois sur mobile, toutes sur desktop) :
1. Sens du calcul : « J'ai un loyer en tête » / « Je connais mes ressources ».
2. Loyer **charges comprises**, en euros par mois (ou ressources nettes mensuelles).
3. Ressources du foyer, en lignes facultatives, reprises de la liste officielle (F1169) : salaire
   net, indemnités et allocations, pension ou retraite, bourse, aides au logement simulées,
   indemnités de stage, revenus fonciers. Colocation : « Ajouter un colocataire » (somme).
4. Zone Visale, pour le plafond de loyer : Île-de-France / grande agglomération, Corse, outre-mer,
   Saint-Martin / ailleurs. Étudiant : oui ou non.
5. Facultatif : ressources nettes du garant.

**Sorties** (copiables en une phrase) :
- **Taux d'effort** : loyer charges comprises ÷ ressources, en %.
- **Repère « trois fois le loyer »** : ressources ≥ 3 × loyer. Affiché comme **une pratique
  courante des propriétaires, pas une règle**, et « atteint » ou « manque X € ».
- **Repère Visale** (règle officielle) : loyer ≤ 50 % des ressources, et loyer ≤ plafond de la zone
  choisie. Étudiant sous le seuil de sa zone : pas de condition de ressources.
- Si un garant est saisi : le même repère « trois fois » appliqué à ses ressources.
- La phrase à copier, par exemple : « Ressources du foyer : 2 150 € nets par mois, pour un loyer de
  700 € charges comprises (taux d'effort 33 %). »
- **Une seule action produit** : « Écrire le message de candidature » vers
  `/outils/message-de-candidature`. Pas de CTA « Télécharger » (rien n'est publié).

## 3. Règles de calcul et leurs sources

Toutes dans une fonction pure `calculerLoyer(entrees)` de `packages/core`, testée. Aucune constante
dans le composant.

| Règle | Valeur | Source | Date de la source |
|---|---|---|---|
| Aucun revenu minimum légal : la fiche liste les justificatifs, aucun seuil ni multiple | (pas de chiffre) | [SP F1169](https://www.service-public.gouv.fr/particuliers/vosdroits/F1169) | vérifié le 2025-04-10 |
| Justificatifs de ressources que le bailleur peut demander (9 lignes, dont l'attestation de simulation des aides au logement Caf ou MSA, la bourse, les indemnités de stage) | liste | SP F1169 ; [décret n° 2015-1437](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000031444493) | 2025-04-10 |
| « Trois fois le loyer » | 3 × loyer charges comprises | **aucune source officielle** : repère de pratique, affiché comme tel (VEILLE.md, « non vérifiés ») | sans objet |
| Visale : loyer au plus 50 % des ressources | 50 % | [SP F33453](https://www.service-public.gouv.fr/particuliers/vosdroits/F33453) | vérifié le 2026-01-23 |
| Visale : plafonds de loyer | 1 940 € Île-de-France ; 1 575 € grandes agglomérations, Corse, outre-mer, Saint-Martin ; 1 365 € ailleurs | F33453 + actionlogement.fr | 2026-01-23 / 2026-01-06 |
| Visale étudiant : seuil sous lequel aucune ressource n'est exigée | 1 000 € IDF ; 840 € ou 680 € ailleurs | F33453 | 2026-01-23 |
| Assurance loyers impayés : pas de caution d'un tiers en plus, sauf étudiant ou apprenti | règle | art. 22-1 loi n° 89-462 ; [ANIL](https://www.anil.org/votre-projet/vous-etes-locataire/se-loger/dans-le-prive/) (page sans date, lue le 2026-11-04) | 2026-11-04 |

Les valeurs Visale viennent de `docs/seo/blog/faits-confirmes-2026-11-04.md` (blog-veille-juridique).
**Avant le code**, le chef les fait reporter dans `docs/seo/FAITS.md` par `geo-citabilite`, avec
la page `/outils/quel-salaire-pour-un-loyer` dans la colonne « pages ». Les montants Visale bougent
(révision du 2026-01-06) : `seo-fraicheur` les inscrit à sa file. Le détail « 840 € ou 680 € »
suit la même découpe que les plafonds : `geo-citabilite` vérifie laquelle des deux valeurs va avec
« grandes agglomérations » avant qu'on code.

## 4. Cas limites

- Ressources à 0 € : pas de division ; sortie « Sans ressources, le dossier repose sur un garant ou
  sur Visale », avec le seuil étudiant si « étudiant » est coché.
- Loyer à 0, négatif, non numérique ou supérieur à 20 000 € : message d'erreur lisible près du champ,
  pas de calcul.
- Saisie « 1 200,50 » ou « 1 200.50 » ou « 1 200 » : les trois acceptées (virgule, point, espaces).
- Loyer au-dessus du plafond Visale de la zone : « Visale ne couvre pas ce loyer », même si les 50 %
  sont respectés.
- Colocation : somme des ressources, et mention que le propriétaire peut regarder chaque colocataire
  séparément (aucun texte ne le fixe : formulé comme une possibilité, pas une règle).
- Aides au logement : saisies comme une ressource à part, avec une ligne « le propriétaire peut les
  compter ou non : demandez-lui ». On ne les déduit pas du loyer à sa place.
- Revenus variables (indépendant) : champ « moyenne mensuelle », et rappel que le justificatif est
  le bilan ou l'attestation du comptable (F1169).
- Net ou brut : le calcul se fait en net. Une ligne dit qu'aucun texte ne fixe le multiple ni la
  base, et invite à demander le critère au propriétaire ou à l'agence.

## 5. Ce que l'outil ne fait pas

- Il ne dit pas si un dossier sera accepté et ne note pas le candidat.
- Il ne calcule pas l'APL : il renvoie au simulateur de la Caf.
- Il ne vérifie pas l'encadrement des loyers (outil à venir, voir `docs/seo/villes.md`).
- Il ne délivre pas de visa Visale : il renvoie à visale.fr.
- Il n'envoie rien et ne garde rien : calcul dans le navigateur, aucune requête réseau, aucun
  stockage. Une phrase le dit sur la page.
- Aucun prix, aucune offre de Terouva sur la page (brief).

## 6. La page explicative : 5 questions, réponses autonomes

Rendu serveur, dans le gabarit de `/outils/dossier-de-location` (`Ariane`, h1, énoncé, l'outil dans
`BandeNuit`, sections, `Questions`). Brouillons de réponses (40 à 60 mots chacune, à passer par
`zero-slop` puis `blog-relecteur`) :

1. **Faut-il gagner trois fois le loyer pour louer ?** Non, aucun texte ne l'impose. La loi fixe la
   liste des justificatifs de ressources qu'un propriétaire peut demander, pas un niveau de revenus.
   « Trois fois le loyer » est un repère que beaucoup de propriétaires appliquent. Un propriétaire
   peut louer à un candidat sous ce repère, ou en exiger davantage.
2. **Quel salaire pour un loyer de 700 € ?** Avec le repère courant, 2 100 € nets par mois pour 700 €
   charges comprises. Pour Visale, le loyer doit rester sous la moitié de vos ressources : 1 400 €
   suffisent, si le loyer est sous le plafond de votre zone. Le calculateur fait le compte pour
   n'importe quel montant.
3. **Les APL comptent-elles dans les revenus ?** Le propriétaire peut demander une attestation de
   simulation des aides au logement établie par la Caf ou la MSA : elle fait partie des justificatifs
   de ressources prévus par la réglementation. Les compter ou non dans son calcul reste son choix,
   donc posez-lui la question.
4. **Le calcul se fait-il en net ou en brut ?** Aucun texte ne le fixe, pas plus que le multiple.
   Le calculateur raisonne en net, sur le loyer charges comprises, ce qui donne le résultat le plus
   prudent. Si l'annonce ou l'agence précise un autre critère, suivez celui-là et demandez-le par
   écrit.
5. **Que faire si mes ressources ne suffisent pas ?** Trois pistes : un garant, dont les ressources
   rassurent le propriétaire ; la garantie Visale, gratuite, demandée avant la visite ; ou une
   colocation, qui additionne les ressources. Attention : un propriétaire qui a une assurance loyers
   impayés ne peut pas exiger en plus un garant, sauf si vous êtes étudiant ou apprenti.

## 7. Liens (pour `seo-maillage`)

- **Vers l'outil** : `/guides/dossier-de-location` (section ressources : la ligne du registre prévoit
  « outil + section du guide »), `/guides/louer-sans-garant`, `/guides/garantie-visale`,
  `/guides/garant-caution`, `/outils` (vitrine), `/outils/dossier-de-location` (« Une fois la liste
  réunie »).
- **Depuis l'outil** : `/guides/garantie-visale` (repère Visale), `/guides/louer-sans-garant` (question
  5), `/outils/dossier-de-location` (quels justificatifs), `/outils/message-de-candidature` (action).
- Ancre : jamais « Leboncoin ».

## 8. Données structurées

La consigne demande `WebApplication`. **Je recommande de garder le choix déjà fait sur les deux
outils** : `WebPage` avec `isAccessibleForFree: true`, plus `FAQPage` et le fil d'Ariane. Le
commentaire de `app/outils/dossier-de-location/page.tsx` explique pourquoi : Google demande pour
`WebApplication` une note ou un avis en plus de l'offre. Sans note réelle, le type ne donne aucun
résultat enrichi et compte comme une erreur à chaque audit. Inventer une note est interdit (PAS-IA,
R39).

Si le chef maintient `WebApplication`, la seule version honnête est :
`{ "@type": "WebApplication", name, url, applicationCategory: "FinanceApplication",
operatingSystem: "Tout navigateur", isAccessibleForFree: true, inLanguage: "fr-FR" }`, sans
`offers` (le brief exclut tout prix) ni `aggregateRating`. Septune et le test de résultats enrichis
le signaleront incomplet. La décision revient au chef et à `seo-gardien-technique`, propriétaire des
helpers. **Ma fiche est à corriger dans BONDS** : elle impose `WebApplication` alors que le cas
Terouva montre que ce type ne se remplit pas honnêtement sans avis.

## 9. Fichiers

| Fichier | Action | Propriétaire |
|---|---|---|
| `packages/core/src/loyer.ts` | créer : `calculerLoyer`, constantes datées, commentaire des sources | seo-outils, **si le chef autorise `packages/core`** (partagé avec l'extension) |
| `packages/core/src/loyer.test.ts` | créer : 0 €, 700 €, plafond Visale franchi, étudiant sous le seuil, virgule décimale, colocation | seo-outils |
| `packages/core/src/index.ts` | modifier : une ligne d'export | seo-outils, même condition |
| `apps/web/components/outils/CalculLoyer.tsx` | créer : client, gabarit de `ListeDossier.tsx` (`.champ`, DM Mono pour les chiffres, un seul bouton coloré) | seo-outils |
| `apps/web/app/outils/quel-salaire-pour-un-loyer/page.tsx` | créer | seo-outils |
| `apps/web/app/outils/quel-salaire-pour-un-loyer/opengraph-image.tsx` | créer, sur le modèle des deux autres | seo-outils, ou seo-visuels |
| `apps/web/lib/catalogue.ts` | modifier : une entrée `OUTILS` (titre, `titreSeo` ≤ 50 signes, description 120 à 160) | à attribuer par le chef |
| `apps/web/app/outils/page.tsx` | modifier : entrée `VITRINE` + capture `/outils/quel-salaire-pour-un-loyer.jpg` | seo-outils |
| sitemap, `llms.txt` | vérifier que l'entrée du catalogue suffit | seo-gardien-technique, geo-citabilite |
| `docs/seo/FAITS.md` | 6 lignes (tableau du §3) | geo-citabilite |
| section ressources de `/guides/dossier-de-location` | à écrire | seo-redacteur |

Proposition d'URL et de titre : `/outils/quel-salaire-pour-un-loyer`, `titreSeo` « Quel salaire pour
un loyer : le calcul » (à trancher avec le registre). H1 : « Le loyer que vos ressources permettent,
et ce que les propriétaires regardent vraiment. »

## 10. Ce que j'attends de `seo-registre`

1. Lire les SERP de « quel salaire pour un loyer de 700 € » et « calcul taux d'effort location » :
   y a-t-il un outil en top 10 ? (Pour « 3 fois le loyer net ou brut », c'est déjà fait : non.)
2. Relever l'autocomplétion de « simulateur loyer salaire », « loyer maximum salaire »,
   « taux d'effort location » : quelle formulation l'outil prend-il pour titre ?
3. Trancher la cannibalisation avec `/guides/dossier-de-location` : l'outil prend « quel salaire »,
   « 3 fois le loyer » et leurs variantes ; le guide garde « pièces à fournir ».
4. Passer la ligne « quel salaire pour un loyer » de « visée » à « spec prête » quand le chef valide.
