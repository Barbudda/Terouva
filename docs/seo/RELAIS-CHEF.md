# Relais du chef du pôle SEO & GEO

> À lire par une session neuve qui reprend le pilotage (`/pole-seo-geo`). Écrit le 2026-11-04 au soir,
> quand la session du chef approchait la limite de son contexte. Remplace la lecture de l'historique.

## Où on en est

- **Périmètre** : le site seulement (terouva.com), objectif de visibilité par un blog en volume. Pas
  d'extension, pas de prix ni d'offre (pôle CTO & Commerce). Brief : `docs/seo/BRIEF.md`.
- **En ligne** (après la vague 8, le 2026-11-04 au soir) : 84 articles de blog (15 au format JSX,
  69 au format série), 9 guides (dont 6 en questions-réponses), 3 outils (dont « quel salaire pour un
  loyer »), plan du site à 107 adresses, toutes soumises à IndexNow.
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

- Vague 9 : lire d'abord le bilan de la vague 8 dans `MESURES-TOKENS.md` (plan trop coûteux, Sonnet
  moins bon à l'écriture). Les plans 7 et 8 listent déjà les sujets écartés.
- Search Console : vérifier avec Hugo que `https://terouva.com/sitemap.xml` est déclaré (menu
  Sitemaps) ; Google ne reçoit pas IndexNow.

- Photos : 13 pour 62 articles ; proposer une photo libre de droits par article (accord d'Hugo
  requis pour les téléchargements).
- Mesure d'effet (Search Console, test de visibilité LLM) une à deux semaines après les publications.
- `sameAs` : profils à créer par Hugo (bios prêtes dans `docs/seo/autorite/PROFILS.md`).
- OneDrive laisse des fichiers de `node_modules` « en ligne seulement » : un test local en dépend
  (« corps qui se charge »), écarté du vérificateur ; Hugo peut cocher « Toujours conserver sur cet
  appareil » sur le dossier.
