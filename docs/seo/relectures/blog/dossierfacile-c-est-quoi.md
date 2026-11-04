# Relecture : dossierfacile-c-est-quoi (2026-11-04)

Relecteur : seo-analyste, qui n'a écrit aucun article de la vague 5 (grille de `blog-relecteur`).
Relu : `apps/web/components/blog/articles/dossierfacile-c-est-quoi.tsx` et `.meta.ts` (brouillon,
commit faa290f).

Verdict : À CORRIGER (deux corrections courtes, aucun fait faux)

Bloquants : 0

Corrections :
1. **Réponse incomplète à « Est-ce fiable ? »** (section « fiable » et FAQ). « Seuls ses opérateurs et
   son équipe technique accèdent à vos documents » reprend la page d'aide « Gestion des données »,
   mais la phrase suivante de la même page dit : « DossierFacile peut transmettre vos données
   personnelles à des sous-traitants […] liés par un engagement de confidentialité conforme au RGPD »,
   et « vos données personnelles ne seront jamais revendues » ni « communiquées à des tiers sans votre
   accord exprès ». Sur la question « est-ce fiable », l'omettre fausse la réponse.
   Correction exacte (puce) : « seuls ses opérateurs et son équipe technique consultent vos documents,
   pour les vérifier ; des sous-traitants tenus à la confidentialité peuvent traiter vos données, qui
   ne sont ni revendues ni transmises à des tiers sans votre accord ; ».
2. **Trois faits sourcés hors de la liste `sources`.** Ils sont exacts, mais leur page n'est pas
   citée :
   - suppression des pièces quand on supprime son compte :
     https://aide.dossierfacile.logement.gouv.fr/fr/article/supprimer-son-compte-ccyu3l/ ;
   - accès réservé aux opérateurs, hébergement OVH à Gravelines, sous-traitants :
     https://aide.dossierfacile.logement.gouv.fr/fr/article/gestion-des-donnees-f7zd4h/ (mise à jour le
     2026-05-05) ;
   - documents en langue étrangère refusés :
     https://aide.dossierfacile.logement.gouv.fr/fr/article/traduction-simplifiee-en-francais-1wo4sm8/.
   Correction exacte : ajouter ces trois entrées à `sources`, `releveLe: "2026-11-04"`.

Vérifié à la source, le 2026-11-04 :
- Page d'accueil, lue dans le navigateur : le compteur affiche « Déjà 2131336 Dossiers labellisés ».
  Dans le HTML brut, sans JavaScript, il affiche 116000 : un relevé fait par curl aurait été faux.
  « Plus de 2,1 millions » est juste.
- « Qui sommes-nous » : DGALN, startup d'État, programme beta.gouv.fr (DINUM), données stockées en
  France, pièces supprimées après 45 jours d'inactivité, code source ouvert, filigrane.
- Aide « Dossier Facile c'est quoi ? » : service public gratuit, financé par l'État.
- Aide « Comment partager son dossier validé ? » : statuts « complet » puis « complet et vérifié » ;
  avec ou sans justificatifs ; 30 jours par défaut ; trigramme ; 5 échecs = blocage d'une heure ;
  nombre de consultations et date de la dernière ; pause et réactivation ; lien supprimé définitif ;
  une seule pièce si validée ; couple ou colocation actif quand tous sont validés ; PDF possible,
  lien recommandé pour le suivi ; conseil de ne rien verser avant le bail.
- Service-public F1169 : téléservice « Dossier Facile (locataire) » ; le propriétaire peut exiger
  l'original.

Structure : intertitres en questions, chapeau autonome (56 mots), FAQ de 38 à 48 mots (la deuxième
sous 40). Cannibalisation : seule page sur « dossierfacile c'est quoi » (registre, ligne 66).
Liens : les quatre liens internes existent. Voix : zero-slop 20,2/100 (clair ; 14 % de phrases
longues), aucun tiret cadratin, aucun emoji.

Remarques (non bloquantes) :
- Les trois articles de ce lot qui parlent de filigrane (celui-ci, `filigrane-documents-dossier-location`
  et `arnaque-location-reconnaitre-fausse-annonce`) ne se lient pas entre eux. Un lien de cet article
  vers l'article filigrane, dans la puce « chaque document reçoit un filigrane », servirait le lecteur.
- FAQ « Est-ce que DossierFacile est fiable ? » : 38 mots, juste sous la cible de 40.
