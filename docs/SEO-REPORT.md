# Rapport SEO et visibilité IA

Branche `seo-boost`, quatre commits, rien de poussé ni déployé.
Données de marché : Semrush, base **fr**, relevées le 19 octobre 2026.

---

## 1. Ce qui a été corrigé

### Le défaut important : une FAQ balisée mais jamais affichée

Les six guides publiaient un bloc `FAQPage` construit depuis le catalogue, **sans qu'une seule
des questions apparaisse sur la page**. Google demande explicitement que le contenu balisé soit
visible par la personne qui arrive. Un balisage sans contrepartie n'apporte aucun résultat
enrichi et expose à une action manuelle.

Les deux pages d'outils, elles, affichaient bien leur FAQ, chacune avec son propre bloc recopié.
Un composant unique (`components/ui/Questions.tsx`) sert maintenant les deux usages : la liste qui
part dans le JSON-LD est celle qui s'affiche, l'écart ne peut plus réapparaître.

Vérifié après correction : 7/7, 9/9 et 8/8 questions visibles sur les trois guides principaux.

### Les robots des moteurs génératifs, nommés un par un

La règle `User-Agent: *` les autorisait déjà. Mais les outils d'audit les cherchent par leur nom
et comptent une absence comme un blocage, ce qui explique le « Blocked from AI Search » du
rapport Semrush. Quinze agents sont désormais déclarés, en distinguant deux familles :

- **collecte pour l'entraînement** : `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended` ;
- **recherche au moment d'une question** : `OAI-SearchBot`, `PerplexityBot`, `ChatGPT-User`,
  `Claude-SearchBot`. C'est celle-là qui amène une citation avec un lien.

`/app` et `/liste` restent refusés à tous : l'application local-first n'a rien à indexer et serait
un piège à robot.

### Les questions calées sur ce qui est réellement tapé

L'écart était net. On écrivait « Quels justificatifs peut-on demander à un garant ? » quand la
requête réelle est « quel document doit fournir un garant pour une location » : 50 recherches par
mois, difficulté 13. Les trois guides principaux passent de 4 à 7-9 questions, reprises mot pour
mot des requêtes mesurées, chacune avec une réponse courte et autonome.

Deux réponses disent explicitement qu'une règle courante n'est **pas** une loi : les trois fois le
loyer exigés d'un garant, et l'échelonnement du dépôt de garantie. C'est ce type de précision
qu'un assistant reprend volontiers, parce qu'elle corrige une idée reçue.

### Trois titres recalés

| Page | Avant | Après | Pourquoi |
|---|---|---|---|
| `/guides/garant-caution` | Garant : qui peut l'être, et jusqu'à quand | **Garant de location : qui peut l'être** | « garant location » = 2 900/mois ; le titre ratait la requête faute du mot « location » |
| `/outils/dossier-de-location` | Checklist de dossier de location | **Quels documents pour louer un appartement** | « checklist dossier location » n'est tapé par personne ; la nouvelle formule vaut 480/mois pour une difficulté de 30 |
| `/guides/garant-caution` (description) | — | reformulée autour d'« acte de cautionnement » et « louer sans garant » | deux requêtes fortes à difficulté basse |

### « Louer sans garant » ouvert pour de bon

C'est le meilleur gisement trouvé : trois variantes totalisant environ **570 recherches par mois
pour une difficulté de 18**. La section existait mais tenait en trois lignes tournées vers Visale.
Elle expose maintenant les trois voies réelles, dont celle que presque personne ne mentionne :
**un propriétaire déjà assuré contre les loyers impayés ne peut plus exiger de caution**, sauf
d'un étudiant ou d'un apprenti.

### Divers

- Image de fond du ruban vidéo : 76 ko → **13 ko** en WebP, chargement différé. L'affiche pleine
  taille reste servie comme vignette aux moteurs et comme affiche du lecteur.
- Deux tirets cadratins dans des textes d'interface (signal vibecodé #9, bloquant).
- Seuil de longueur des descriptions resserré de 160 à **155 signes** dans les tests. Toutes les
  pages le respectent déjà (maximum constaté : 153).

---

## 2. Inventaire des pages et mots-clés retenus

Toutes les pages sont rendues côté serveur. Contenu lisible sans JavaScript, un seul `h1` par
page, vérifié sur les douze.

| Page | Fichier | Objectif | Mot-clé principal | Vol./mois | Diff. |
|---|---|---|---|---|---|
| `/` | `app/page.tsx` | Inscription liste d'attente | trouver un logement | 2 400 | 44 |
| `/outils/dossier-de-location` | `app/outils/dossier-de-location/` | Usage outil → inscription | quels documents pour louer un appartement | 480 | 30 |
| `/outils/message-de-candidature` | `app/outils/message-de-candidature/` | Usage outil → inscription | message pour visiter un appartement | 50 | 0 |
| `/guides/dossier-de-location` | `app/guides/dossier-de-location/` | Autorité → outil | dossier location | 3 600 | 34 |
| `/guides/garant-caution` | `app/guides/garant-caution/` | Autorité → outil | garant location | 2 900 | 34 |
| `/guides/depot-de-garantie` | `app/guides/depot-de-garantie/` | Autorité | dépôt de garantie | 4 400 | 35 |
| `/guides/garantie-visale` | `app/guides/garantie-visale/` | Autorité | garantie visale | 135 000 | 52 |
| `/guides/repondre-a-une-annonce-de-location` | `app/guides/repondre-a-une-annonce.../` | Autorité → outil | répondre à une annonce de location | 10 | 0 |
| `/guides/refus-de-dossier` | `app/guides/refus-de-dossier/` | Autorité | refus dossier location | 20 | 0 |

### Secondaires par page

**`/guides/garant-caution`** (le mieux placé du lot)
`acte de cautionnement` 2 900 / **30** · `caution solidaire location` 1 300 / **27** ·
`cautionnement solidaire` 880 / **20** · `garant logement` 880 / 40 ·
`location sans garant` 320 / **18** · `comment louer sans garant` 140 / **18** ·
`modèle acte de cautionnement` 140 / 22 · `qui peut être garant` 110 / 23

**`/guides/depot-de-garantie`**
`restitution dépôt de garantie` 320 / 32 · `délai restitution dépôt de garantie` 260 / **26** ·
`montant dépôt de garantie` 70 / 31 · `dépôt de garantie meublé` 70 / **22**

**`/guides/dossier-de-location` et `/outils/dossier-de-location`**
`dossier locataire` 4 400 / 39 · `dossier de location` 1 300 / 43 ·
`quels documents pour louer un appartement` 480 / 30 · `documents dossier location` 390 / 34 ·
`que mettre dans un dossier de location` 140 / 22 · `dossier location étudiant` 110 / **23**

**`/guides/garantie-visale`**
`visale locataire` 1 900 / 69 · `visale demande` 210 / 61 · `visale conditions` 260 / 57.
Tout le champ Visale est verrouillé par visale.fr et actionlogement.fr. Le guide sert l'autorité
et le maillage, pas l'acquisition.

**`/`** — `recherche appartement location` 1 000 / 46 · `trouver un appartement rapidement` 260 / **30** ·
`recherche logement location` 210 / 44. À noter : `alerte annonce location` et `alerte immobilière`
ne pèsent respectivement rien et 10 recherches. **La catégorie du produit n'est pas encore
cherchée.** L'acquisition viendra des guides, pas des requêtes produit.

---

## 3. Concurrents

Relevé SERP sur `garant location` et `dossier locataire`.

| Domaine | Ce qu'il tient | Ce qu'il couvre et que nous n'avons pas |
|---|---|---|
| **dossierfacile.logement.gouv.fr** | 1er sur `dossier locataire`, 2e sur `garant location` | Le service d'État qui **certifie** un dossier. Nous ne le mentionnons nulle part, alors que c'est le réflexe à conseiller. |
| **service-public.gouv.fr** | 2e sur `dossier locataire` | La source que nous citons déjà. Impossible à dépasser, utile à citer. |
| **anil.org** | 1er sur `garant location` | L'ADIL, conseil juridique gratuit en département. Mentionnée une fois sur `/guides`. |
| **cautioneo.com**, **garantme.fr**, **smart-garant.com** | Top 10 sur `garant location` | **Comparatif des organismes de cautionnement privés** : tarifs, conditions, délais. Nous les évoquons en une phrase. |
| **luko.eu**, **lovys.com** | Blogs d'assureurs, bien placés partout | Volume d'articles sur l'assurance habitation, l'état des lieux, le préavis. |
| **1jeune1solution.gouv.fr**, **immojeune.com** | Top 5 | L'angle étudiant, traité en pages dédiées. |

**Les trois trous les plus coûteux**, tous à fort volume et sans page chez nous :
`encadrement des loyers` 12 100 (diff. 49) · `état des lieux` 6 600 (diff. 36) ·
`préavis location` 2 900 (diff. 31) · `bail mobilité` 2 400 (diff. 29).

---

## 4. Idées d'articles — à valider avant rédaction

Je n'ai rien écrit. Chaque idée renvoie vers une landing précise.

### Vers `/guides/garant-caution` et `/outils/dossier-de-location`

1. **« Louer sans garant : les trois solutions, et ce qu'elles coûtent vraiment »**
   mot-clé `location sans garant` (320, diff. **18**)
   Plan : la loi n'impose pas de garant · Visale, conditions et délai réel · le propriétaire déjà
   assuré ne peut plus exiger de caution · les sociétés privées, grille de coût sur un bail de
   3 ans · que répondre à « il me faut un garant » en visite.
   **C'est l'article à faire en premier : meilleure difficulté du corpus.**

2. **« Combien doit gagner un garant ? Ce que la loi dit, et ce que les agences demandent »**
   mot-clé `combien doit gagner un garant pour une location` (30) + `garant logement` (880, diff. 40)
   Plan : aucun seuil légal · d'où vient la règle des trois fois le loyer · les documents qui
   peuvent servir à vérifier, et ceux qui ne peuvent pas · négocier avec un garant « trop juste » ·
   deux garants, comment ça se rédige.

3. **« Modèle d'acte de cautionnement : les mentions sans lesquelles il ne vaut rien »**
   mot-clé `modèle acte de cautionnement` (140, diff. **22**) + `acte de cautionnement` (2 900, diff. 30)
   Plan : les mentions obligatoires · simple ou solidaire, la ligne qui change tout · durée
   déterminée ou non · le cas colocation · le simulateur officiel de service-public.

### Vers `/guides/depot-de-garantie`

4. **« Dépôt de garantie non rendu : la lettre, les délais, et combien le propriétaire vous doit en plus »**
   mot-clé `restitution dépôt de garantie` (320) + `délai restitution dépôt de garantie` (260, diff. **26**)
   Plan : le calcul de la majoration de 10 % avec trois exemples chiffrés · le modèle de lettre
   recommandée · la conciliation obligatoire sous 5 000 € · le tribunal · les trois ans de délai.

5. **« État des lieux d'entrée : la demi-heure qui vous rend votre dépôt de garantie »**
   mot-clé `état des lieux` (6 600, diff. 36)
   Plan : ce qui s'y joue financièrement · la liste de ce qu'on oublie de noter · photos datées ·
   l'absence d'état des lieux et la présomption de bon état · la comparaison à la sortie.
   **Ouvre un champ à 6 600 recherches où nous n'avons rien.**

### Vers `/guides/dossier-de-location` et l'outil

6. **« Dossier de location étudiant : ce qui change quand on n'a ni fiche de paie ni garant »**
   mot-clé `dossier location étudiant` (110, diff. **23**)
   Plan : les pièces propres au statut étudiant · bourse et Visale · le cas de l'alternant ·
   l'interdiction faite au bailleur personne morale vis-à-vis d'un boursier.

7. **« DossierFacile, Visale, Loca-Pass : à quoi sert chaque dispositif public, et dans quel ordre les demander »**
   mot-clé `dossier de location en ligne` (40) + trafic de marque sur les trois dispositifs
   Plan : un tableau des trois · dans quel ordre les enchaîner sur un calendrier de recherche ·
   ce qu'aucun ne couvre.
   **Comble le trou DossierFacile et nous place sur un sujet que les concurrents commerciaux
   traitent mal.**

### Vers `/`

8. **« Combien de temps faut-il pour trouver un logement en zone tendue, et où part ce temps »**
   mot-clé `trouver un appartement rapidement` (260, diff. **30**)
   Plan : le délai entre publication et première visite · ce qui se joue dans la première heure ·
   le dossier prêt comme seul levier · là où un outil de veille change la donne.
   Seul article de la liste qui amène directement vers le produit.

---

## 5. Ce que vous devez faire à la main

### Immédiat, après avoir relu la branche

1. **Fusionner et déployer.** Je n'ai rien poussé. `git log main..seo-boost` donne les quatre
   commits ; aucun n'est risqué, tous les tests passent (93 côté web, 82 côté cœur).
2. **Search Console** : resoumettre `https://terouva.com/sitemap.xml`, puis demander
   l'indexation des trois URL dont le contenu a changé le plus :
   `https://terouva.com/guides/garant-caution`,
   `https://terouva.com/outils/dossier-de-location`,
   `https://terouva.com/guides/depot-de-garantie`.
3. **Test des résultats enrichis** de Google sur `/guides/garant-caution` : c'est la première fois
   que le bloc FAQ y est valide. Confirmez que la FAQ est bien détectée.
4. **IndexNow** : `node scripts/indexnow.mjs` une fois déployé. Il soumet tout le plan du site à
   Bing, Yandex, Seznam et Naver. Google n'y participe pas.
5. **Bing Webmaster Tools** : toujours pas configuré. Import depuis Search Console, 5 minutes.
   Bing alimente ChatGPT et Copilot ; c'est le canal IA le moins cher à ouvrir.

### Liens à aller chercher

Le site n'a aucun backlink notable, et c'est maintenant le facteur limitant : le contenu est
meilleur que le classement qu'il obtiendra sans liens.

- **ADIL de votre département** : ils recensent des outils gratuits pour locataires. La checklist
  de dossier adossée au décret est exactement leur critère.
- **Services logement d'universités et CROUS** : la page « dossier location étudiant » (à écrire)
  leur donne une raison de lier.
- **r/vosfinances, r/france, forums de recherche de logement** : les outils gratuits sans compte y
  sont bien reçus, à condition de répondre à une question réelle plutôt que de poster un lien.
- **Annuaires** : Product Hunt et BetaList au lancement ; les annuaires SEO génériques ne valent
  plus rien et peuvent nuire.
- **Associations de locataires** (CLCV, CNL) : l'angle « ce qu'un propriétaire n'a pas le droit de
  demander » est leur sujet.

### Décision qui vous revient

**Support des navigateurs.** Lighthouse signale 12 ko de JavaScript hérité, dû à l'absence de
`browserslist`. Le réduire ferait gagner des octets mais **Lighthouse estime lui-même le gain à
0 ms** sur FCP et LCP, et cela réduirait le support des navigateurs anciens. Je n'ai pas tranché
seul. À faire si vous voulez le bundle le plus léger possible, à laisser sinon.

---

## 6. Mesures

Audit Lighthouse mobile sur `/guides/garant-caution`, build de production local :

| Catégorie | Score |
|---|---|
| Accessibilité | 100 |
| Bonnes pratiques | 100 |
| SEO | 100 |
| Agentic Browsing | 100 |

54 audits passés, **0 échec**. Trace de performance sur l'accueil : **LCP 204 ms, CLS 0,00**
(localhost sans bridage : à relire en production après déploiement, avec bridage 4G et processeur
4×, avant d'en tirer une conclusion).

---

## 7. Points sur lesquels j'ai un doute

1. **Le guide sur le refus de dossier vise un sujet sans volume.** `refus dossier location` pèse
   20 recherches par mois, `discrimination location` 40. La page est juste, sourcée et utile, mais
   elle n'apportera pas de trafic de recherche. Elle garde sa valeur pour la citation par les IA
   et pour la crédibilité du corpus. À assumer comme tel, pas à compter dans les prévisions.

2. **Tout le champ « message de candidature » est quasi vide.** Les meilleures variantes plafonnent
   à 50 recherches mensuelles. Le générateur est un excellent actif de conversion et un bon motif
   de lien, mais **ce n'est pas un actif de trafic**. Je n'ai pas forcé son titre vers un mot-clé
   qui n'existe pas.

3. **La catégorie du produit n'est pas encore cherchée.** `alerte annonce location` : rien.
   `alerte immobilière` : 10. Personne ne cherche l'outil que vous construisez, les gens cherchent
   les problèmes qu'il résout. La stratégie « guides d'abord » est donc la bonne, mais elle veut
   dire que le trafic arrivera sur des pages qui ne vendent pas directement : le maillage vers
   `/` et la liste d'attente est le point à surveiller.

4. **Visale est hors d'atteinte.** 135 000 recherches mensuelles sur `garantie visale`, mais
   difficulté 52 et SERP tenue par visale.fr et actionlogement.fr. Garder le guide pour l'autorité,
   ne pas y investir davantage.

5. **Je n'ai pas vérifié les tarifs des sociétés de cautionnement privées.** Le guide dit « un
   pourcentage du loyer annuel » sans chiffrer, délibérément. Si vous voulez l'article comparatif
   (idée n° 1), il faudra relever les grilles, et les revérifier périodiquement.

6. **La difficulté Semrush n'est pas une promesse.** Une difficulté de 18 sur un domaine sans
   backlink et âgé de quelques mois reste difficile. L'ordre de priorité que je donne est fiable ;
   les délais, non. Comptez plusieurs mois avant un classement stable, et des liens entrants pour
   que ça bouge vraiment.

7. **Le numéro de téléphone du Défenseur des droits n'est pas publié** dans le guide sur le refus
   de dossier : la source secondaire qui le donnait ne m'a pas paru fiable, et je n'ai pas pu le
   confirmer. La page renvoie au site officiel. À compléter si vous le vérifiez.
