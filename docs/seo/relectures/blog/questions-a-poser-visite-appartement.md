# blog-relecteur : questions-a-poser-visite-appartement (2026-11-04)

Relu par `seo-registre` (distinct de l'auteur), vague 5. Fichiers :
`apps/web/components/blog/articles/questions-a-poser-visite-appartement.tsx` et `.meta.ts` (statut
`brouillon`, date provisoire). Sources ouvertes le 2026-11-04 : SP F2042 (vérifiée le 2025-03-21),
SP F375 (vérifiée le 2026-01-12), ANIL « frais d'agence » (page à jour au 2019-12-10).

### blog-relecteur — /blog/questions-a-poser-visite-appartement
Verdict : À CORRIGER (une correction restante, la faute matérielle est corrigée)

Bloquants : 1, **corrigé par le relecteur** (faute matérielle) → plafonds d'honoraires périmés.
L'article donnait 12 / 10 / 8 € et 3 € par m², ceux de la page ANIL « à jour au 10 décembre 2019 ».
Service-public F375, vérifiée le 2026-01-12, et `FAITS.md:83` donnent 12,10 / 10,09 / 8,07 € TTC et
3,03 €, et l'article `apres-la-visite-dossier-retenu` cite déjà ces montants. Modifié :
- `.tsx` `:128-138` : montants, mention de la source, exemple recalculé pour 40 m² en zone tendue
  (403,60 € au lieu de 400 €, 121,20 € au lieu de 120 €) ; commentaire d'en-tête mis à jour ;
- `.meta.ts` : quatrième réponse de la FAQ (mêmes montants) ; source ANIL remplacée par
  « Service-public.gouv.fr · Frais d'agence immobilière à la location d'un logement (F375) ».
À reporter par le chef : `docs/seo/faits-a-integrer/blog-donnees.md:14-15` porte encore les montants
ANIL de 2019 ; à ne pas intégrer à `FAITS.md`, qui a déjà la bonne ligne.

Corrections :
1. Classe énergie (`:72-74` et la troisième réponse de la FAQ) : la règle « de A à F pour un bail
   signé, renouvelé ou reconduit entre 2025 et 2027 » est celle de la **métropole**. F2042 a un
   calendrier propre à l'outre-mer (Guadeloupe, Guyane, Martinique, La Réunion, Mayotte). Correction
   exacte : écrire « en métropole, pour un bail signé, renouvelé ou reconduit entre 2025 et 2027 » dans
   le corps, et commencer la réponse de la FAQ par « En métropole, non, pour un bail… ».

Vérifié et exact : surface de décence, 9 m² avec 2,20 m sous plafond ou 20 m³, et le règlement
sanitaire départemental qui peut être plus strict (F2042) ; A à E de 2028 à 2033 (F2042, métropole) ;
part du locataire jamais au-dessus de celle du bailleur (F375, `FAITS.md:86`).

Cannibalisation : requête-mère « questions à poser lors d'une visite d'appartement » (registre P2),
aucune autre page. N'empiète pas sur `mail-apres-visite-appartement`.

Remarques (non bloquantes) :
- `:150-153` « celui qui l'envoie le premier […] a souvent l'avantage » : affirmation sans source,
  et c'est le sujet de `etre-le-premier-a-repondre-a-une-annonce`. La remplacer par un lien vers cet
  article.
- `:174-176` : renvoyer aussi vers `/blog/mail-apres-visite-appartement`, qui est l'étape suivante
  exacte, plutôt que seulement vers le guide pilier.
- `:93-95` « il pourrait vous être reproché au départ » : juste dans l'esprit (présomption de bon
  état sans état des lieux), sans source dans la fiche ; un lien vers `/guides/etat-des-lieux`
  suffirait.
- Voix : `zero-slop` en inspection, un seul signal (variété lexicale) ; aucun interdit du brief.
