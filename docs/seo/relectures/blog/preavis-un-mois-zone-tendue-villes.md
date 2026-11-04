# Relecture : preavis-un-mois-zone-tendue-villes (2026-11-04)

Relecteur : seo-analyste, qui n'a écrit aucun article de la vague 5 (grille de `blog-relecteur`).
Relu : `apps/web/components/blog/articles/preavis-un-mois-zone-tendue-villes.tsx`, `.meta.ts`,
`preavis-un-mois-zone-tendue-villes-graphique.tsx`, et l'étude `docs/seo/blog/donnees/zones-tendues/`
(METHODE.md, etude.py, resultats/).

Verdict : À CORRIGER

Bloquants : 1
1. **Cannibalisation, contraire au registre.** `titreSeo` « Préavis d'un mois : les villes en zone
   tendue » vise « préavis 1 mois zone tendue ». Or `docs/seo/REGISTRE.md` (ligne 50 et section « À
   trancher », point 2) attribue cette requête, et « liste zone tendue préavis 1 mois », à la section
   « La zone tendue » de `/guides/preavis-location`, et dit d'un éventuel article daté : « sans viser
   "préavis 1 mois zone tendue" ».
   Correction exacte : recentrer l'article sur l'angle que le guide n'a pas, les villes. Proposition :
   - `titreSeo` : « Zones tendues : 17 grandes villes hors liste » ;
   - `titre` : « Zones tendues : les 17 grandes villes où le préavis reste de trois mois » ;
   - `description` : commencer par les villes, pas par le préavis.
   Le guide garde la requête « préavis 1 mois zone tendue » ; l'article y renvoie déjà par l'ancre
   « guide du préavis de location ». Le chef et `blog-redacteur-en-chef` tranchent aussi la date :
   le registre faisait attendre la vérification du 2027-01-04 (voir le point 3 des corrections).

Corrections :
2. **Contradiction interne sur la date qui compte.** Section « verifier » : « La liste qui compte est
   celle en vigueur à la date où votre bail a été signé, reconduit ou renouvelé ». C'est conforme à
   F1168 (listes intitulées « pour un bail signé, reconduit ou renouvelé depuis… »). Mais la section
   « 2027 » dit « Si vous donnez votre congé en décembre, les chiffres de cette page valent. Pour un
   congé en 2027, vérifiez… », ce qui fait dépendre la liste de la date du congé.
   Correction exacte : remplacer ces deux phrases par « Si votre bail a été signé, reconduit ou
   renouvelé avant le 1er janvier 2027, les chiffres de cette page valent. Pour un bail signé ou
   reconduit ensuite, vérifiez votre commune sur le simulateur au moment d'écrire votre lettre. »
3. **Fait vérifié à ajouter.** J'ai lu le décret n° 2026-831 sur Légifrance (dans le navigateur, le
   2026-11-04, JORF n° 0201 du 29 août 2026). Il abroge bien le décret 2013-392 au 1er janvier 2027
   (articles 2 et 3), et sa notice dit qu'il « reprend le périmètre d'application de la TLV défini en
   annexe au décret n° 2013-392 du 10 mai 2013 et tel que modifié par le décret n° 2025-1267 du
   22 décembre 2025 ». À dire dans la section « 2027 » : la nouvelle liste reprend le même
   périmètre ; ce qui reste inconnu, c'est le texte auquel le préavis renverra. Le commentaire en
   tête du `.tsx` (« Légifrance refusant la lecture automatique ») et la limite « fait non
   revérifié » de METHODE.md ne sont plus à jour. `blog-relecteur` porte la ligne dans FAITS.md.

Vérifié à la source, le 2026-11-04 :
- **Étude reproduite** : `etude.py` relancé sur une copie, empreintes acceptées, `resultats/`
  identique octet pour octet. 1 430 communes sur 34 875 (4,1 %), 26 524 985 habitants (39,0 %),
  2 259 communes touristiques et tendues (3 014 735 habitants), 25 grandes villes à un mois et 17 à
  trois, 61 départements sur 100 sans commune tendue, 75, 92, 93 et 94 à 100 %, 102 communes dans le
  Rhône, 86 dans les Yvelines, 81 dans l'Essonne.
- **Graphique** : les 42 lignes de `VILLES` sont identiques à `grandes-villes.csv` (département,
  population, préavis).
- **Contrôle croisé demandé par METHODE.md** : fichier de référence du simulateur (DILA,
  `TaxeLogementVacant.json`, liste de 2023, 1 434 communes). Rouen, Tours, Reims, Dijon, Angers,
  Nancy et Clermont-Ferrand y sont absents ; Caen, Orléans, Annecy et Nîmes y sont présents :
  conforme au fichier du ministère. Boëge, présente en 2023, est « non tendue » après le décret de
  2025 : c'est l'un des 5 changements que l'étude relève.
- Service-public F1168 : préavis d'un mois en zone tendue, à condition d'indiquer l'adresse et le
  préavis réduit, loi 89-462 art. 15 et décret 2013-392 (1er tableau) ; sans motif, trois mois ;
  mutation et autres motifs valables partout.
- Service-public A18896 (mise à jour le 2026-09-02) : décret n° 2026-831 du 25 août 2026, taxe sur la
  vacance des locaux d'habitation à partir de 2027.

Structure : intertitres en questions sauf « Les chiffres clés » et « Méthode », chapeau autonome
(59 mots), FAQ de 39 à 58 mots. Liens internes : les trois existent. Voix : zero-slop 16,3/100
(clair), aucun tiret cadratin, aucun emoji.

Remarques (non bloquantes) :
- Le fichier du simulateur n'a pas changé depuis le 2023-11-10 (METHODE.md). Pour les 5 communes
  modifiées par le décret de 2025, le simulateur que l'article recommande peut répondre avec
  l'ancienne liste. Je ne l'ai pas vérifié en ligne. Si c'est confirmé, une phrase suffit.
- Pas d'`outilLie` : il n'existe pas d'outil de préavis aujourd'hui. Un lien vers l'article voisin
  `modele-lettre-preavis-logement` servirait le lecteur qui doit écrire sa lettre.
- `publieLe` « 2026-11-04 » est provisoire (commentaire de la fiche) : à fixer par le chef.
