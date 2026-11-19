# Relais du chef du pôle SEO & GEO

> À lire par une session neuve qui reprend le pilotage (`/pole-seo-geo`). Écrit le 2026-11-04 au soir,
> quand la session du chef approchait la limite de son contexte. Remplace la lecture de l'historique.

## Où on en est

- **Périmètre** : le site seulement (terouva.com), objectif de visibilité par un blog en volume. Pas
  d'extension, pas de prix ni d'offre (pôle CTO & Commerce). Brief : `docs/seo/BRIEF.md`.
- **En ligne** (après la vague 10, le 2026-11-15) : 113 articles de blog (15 au format JSX,
  98 au format série), 9 guides (dont 6 en questions-réponses), 3 outils (dont « quel salaire pour un
  loyer »), plan du site à 136 adresses, toutes soumises à IndexNow.
- **Périmètre du blog** (Hugo, 2026-11-06) : la recherche de logement seulement, jamais le locataire
  déjà installé (`docs/seo/BRIEF.md`).
  `/blog` présenté comme `/guides` (modèle Rushlot / FanClaw), une photo par carte (13 photos du site
  réparties ; champ `photo` facultatif pour une photo propre).
- **Branches** : on travaille sur `second/auto` et on avance `main` en avance rapide pour mettre en
  ligne (Vercel déploie `main`). Hugo autorise commits et push.
- **En brouillon** : 4 articles retenus pour cannibalisation (âge limite du garant, lettre de préavis,
  mail après visite, être le premier) ; l'article sur l'encadrement des loyers, à publier après le
  vote de l'Assemblée du 18 novembre (revérifier l'état du texte ce jour-là).

## Comment on produit (ne pas relire autre chose)

- Méthode : `docs/seo/blog/METHODE-SERIE.md` (format série, vérificateur, sources, pièges connus,
  relecture réduite). Mesures et optimisations vague par vague : `docs/seo/blog/MESURES-TOKENS.md`.
- Circuit qui marche (vague 7) : une session neuve fait le plan (`PLAN-VAGUE-N.md`, requêtes sourcées
  par forums quand Google est inaccessible) ; trois sessions neuves écrivent 8 articles chacune avec
  une consigne de trois lignes ; une session neuve relit et applique ses corrections ; le chef publie
  (`statut: "publie"`, date du jour), lance `npm run blog:verifier`, commite, pousse, avance `main`,
  contrôle les adresses en ligne, `npm run seo:indexnow`.
- Hugo autorise à vider le contexte de n'importe quelle session quand c'est utile. L'app limite à
  10 messages inter-sessions par message d'Hugo.
- Mesurer avant et après chaque vague (`get_usage`), noter dans `MESURES-TOKENS.md`, et transformer
  chaque défaut récurrent en règle du vérificateur après l'avoir essayé sur tout le corpus.

## Ouvert

- **Reprise de l'existant faite le 2026-11-15** (`JOURNAL.md`, entrée « Reprise de l'existant ») : les
  descriptions « trop longues » étaient un faux positif du parcours (corrigé dans BONDS, commit
  `33352830`) ; deux titres et deux descriptions repris des requêtes ; lien du guide état des lieux
  vers les documents du propriétaire.
- **Guides repris le 2026-11-15** (`JOURNAL.md`, entrée « Trois guides piliers ») : garant-caution
  (position 43 au départ), refus-de-dossier (44), louer-sans-garant (76). Cannibalisation du pilier C
  tranchée. Restent à reprendre de la même façon, par impressions : préavis (36), dépôt de garantie
  (47), dossier (34), état des lieux (36), Visale (64) ; « répondre » (position 6) attend la mesure
  de son nouveau titre.
- **Mesurer l'effet de tout cela vers le 29/11** (Search Console, page par page) avant une vague 11 :
  le gisement du périmètre « recherche » s'épuise (7 sujets sains sur 80 débuts de requête en
  vague 10). À sonder alors : « entrer dans une colocation existante » (`PLAN-VAGUE-10.md`, Écartés).
- Circuit actuel : des **agents neufs** de la session du chef (plan, rédacteurs, relecteur). Vider une
  session par `clear_session` a été refusé par le classifieur du mode auto le 2026-11-15.
- Âge Visale tranché le 2026-11-15 (visale.fr et F33453) : « 30 ans ou moins », « à partir de 31 ans ».
- Semrush : plus d'unités d'API (à Hugo s'il veut des volumes).
- Checkout partagé : pousser `second/auto` vers `main` emporte les commits de tous les pôles. Regarder
  `git log origin/main..HEAD` avant ; la porte Septune due à l'un est due au push.
- **Visibilité IA (2026-11-19, `JOURNAL.md`)** : définition unique d'Hugo dans `lib/site.ts` (schéma,
  `llms.txt`) ; cinq pages « outil » avec captures (comparatif, Jinka, alertes, automatiser, chasseur) ;
  plan des mentions et six brouillons (`docs/seo/autorite/PLAN.md`, `docs/seo/brouillons/`). Les pages
  comparatives se **relisent quand un concurrent change de prix ou d'offre**, et quand le produit
  évolue (captures à refaire). Mesurer leur effet et un test de visibilité LLM vers le 03/12.
- **À Hugo, par ordre de gain** :
  1. Search Console : déclarer `https://terouva.com/sitemap.xml` (Sitemaps), puis demander
     l'indexation des pages clés (Inspection de l'URL) ; Google ne reçoit pas IndexNow.
  2. **Bing Webmaster Tools** : s'inscrire, importer le site depuis la Search Console, déclarer le
     plan du site. Bing alimente la recherche de ChatGPT et de Copilot.
  3. Profils `sameAs` (LinkedIn, Crunchbase, Peerlist, Indie Hackers, profil maker Product Hunt dès
     maintenant pour son ancienneté) avec les textes de `docs/seo/autorite/PROFILS.md`, puis envoyer
     les adresses : elles entrent dans `SAME_AS` de `app/layout.tsx`.
  4. Publier les brouillons de `docs/seo/brouillons/` en son nom de fondateur ; décider des paiements
     (BetaList, Uneed) ; aucun faux avis ni mention d'utilisateur.
  5. Pôle Commerce : reprendre ou non la définition sur l'accueil (proposition faite).
  6. Dans l'app : la barre latérale affiche « Extension non connectée » (retirée des captures).

- Photos : 13 pour 62 articles ; proposer une photo libre de droits par article (accord d'Hugo
  requis pour les téléchargements).
- Mesure d'effet (Search Console, test de visibilité LLM) une à deux semaines après les publications.
- `sameAs` : profils à créer par Hugo (bios prêtes dans `docs/seo/autorite/PROFILS.md`).
- OneDrive laisse des fichiers de `node_modules` « en ligne seulement » : un test local en dépend
  (« corps qui se charge »), écarté du vérificateur ; Hugo peut cocher « Toujours conserver sur cet
  appareil » sur le dossier.
