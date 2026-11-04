# blog-relecteur : proprietaire-ne-repond-pas (2026-11-04)

Relu par `seo-registre` (distinct de l'auteur), vague 5. Fichiers :
`apps/web/components/blog/articles/proprietaire-ne-repond-pas.tsx` et `.meta.ts` (statut `brouillon`,
publication prévue le 2026-11-16). Brief : `docs/seo/blog/briefs/proprietaire-ne-repond-pas.md`.
Sources ouvertes le 2026-11-04 : SP F1169 (vérifiée le 2025-04-10), SP F34092 (vérifiée le
2024-10-16), SP F33453 (vérifiée le 2026-01-23), ANIL « caution et garanties ».

### blog-relecteur — /blog/proprietaire-ne-repond-pas
Verdict : À CORRIGER (une correction, puis publiable)

Bloquants : 0.

Corrections :
1. `:115` « La garantie Visale, si vous y avez droit, se demande avant d'avoir trouvé le logement ».
   Aucune des sources de la fiche ne le dit : F33453 écrit « La demande doit être faite avant la
   signature du bail ». La règle qui permet de le dire est chez l'ANIL : le bail « doit être signé
   dans le délai de validité du visa présenté par le locataire » et la demande « doit être réalisée
   avant la signature du bail » (anil.org, « Caution et garanties », lu le 2026-11-04). Correction
   exacte : garder la phrase et ajouter à `sources` de la fiche
   `{ titre: "ANIL · Caution et garanties : la garantie Visale", url: "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/", releveLe: "2026-11-04" }`.
   Même correction pour `trouver-un-appartement-rapidement` et `etre-le-premier-a-repondre-a-une-annonce`,
   qui citent le même fait. Le fichier `docs/seo/faits-a-integrer/seo-redacteur.md:14` annonce ce
   fait « déjà dans FAITS.md » : c'est faux, `FAITS.md` n'a aucune ligne sur le moment de la demande
   de visa. Le chef doit l'y reporter avec la source ANIL.

Vérifié et exact : « aucune somme d'argent ne peut être réclamée par le propriétaire avant la
signature du bail d'habitation » (F1169, citation exacte) ; les trois signes de fausse annonce
(F34092 : argent avant la signature, documents officiels avant la visite, propriétaire qui
« refuse catégoriquement de vous rencontrer ») ; le signalement THESEE, ouvert à la victime comme au
témoin (F34092), ce qui justifie « même si vous n'avez rien versé » ; les six informations du guide
pilier (`/guides/repondre-a-une-annonce-de-location`, section `#ordre`) ; l'ancre `#prevenu`
(`FinDePage`, rendu par `CadreArticle`). La promesse produit reprend `llms.txt` (repère, prépare,
l'humain envoie) : conforme aux lignes rouges.

Cannibalisation : requête-mère « propriétaire ne répond pas », angle candidat avant la visite.
Partage tenu avec `apres-la-visite-dossier-retenu` (après la visite) et `mail-apres-visite-appartement`
(le mail du jour de la visite). Aucun guide ne vise cette requête.

Remarques (non bloquantes) :
- `#prochaine-fois` redit en deux paragraphes ce que traite `etre-le-premier-a-repondre-a-une-annonce`
  (requête retenue par la ligne éditoriale). Ajouter un lien vers `/blog/etre-le-premier-a-repondre-a-une-annonce`
  et couper la liste des gestes, pour que les deux pages ne disent pas la même chose.
- Délai de relance : l'article dit « laissez quelques jours » ; le guide pilier (`:179`) et
  `apres-la-visite-dossier-retenu` disent « deux ou trois jours ». Aligner sur le guide.
- La deuxième réponse de la FAQ fait 38 mots (cible 40 à 60).
- Voix : `zero-slop` en inspection, un seul signal (variété lexicale, normal pour un texte court
  en français) ; aucun tiret cadratin, aucun emoji, aucune tournure « ce n'est pas X, c'est Y ».
