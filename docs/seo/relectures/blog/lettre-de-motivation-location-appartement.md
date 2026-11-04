# blog-relecteur : lettre-de-motivation-location-appartement (2026-11-04)

Relu par `seo-registre` (distinct de l'auteur), vague 5. Fichiers :
`apps/web/components/blog/articles/lettre-de-motivation-location-appartement.tsx` et `.meta.ts`
(statut `brouillon`, publication prévue le 2026-12-02). Sources ouvertes le 2026-11-04 : SP F1169
(vérifiée le 2025-04-10), analyse ANIL du décret n° 2015-1437.

### blog-relecteur — /blog/lettre-de-motivation-location-appartement
Verdict : PUBLIABLE

Bloquants : 0.

Vérifié et exact :
- Liste fermée des justificatifs (identité, domicile, activité, ressources) : F1169 (« Le
  propriétaire a interdiction d'en exiger d'autres », citation exacte) et ANIL (« liste limitative »).
- Amende « jusqu'à 3 000 € (ou 15 000 € s'il s'agit d'une personne morale) » : F1169, et ANIL avec
  l'article 22-2 de la loi de 1989.
- Relevé de compte et attestation de bonne tenue de compte hors liste : cohérent avec
  `/guides/dossier-de-location` (`:116-122`), déjà relu.
- Le générateur : « sans inscription », trois tons, rien d'envoyé, conforme à
  `/outils/message-de-candidature`.
- Les quatre modèles sont à trous : aucun nom, revenu ni date inventé. Le score `zero-slop` élevé
  sur ce texte vient uniquement des trous `[date]`, `[montant]` (signal « placeholder ») : c'est
  le format voulu, pas un défaut.

Cannibalisation : requête-mère « lettre de motivation location appartement » (autocomplétion,
« Autres questions », registre P1). Distincte de l'outil `message-de-candidature` (le premier message
court) et du guide pilier, vers lesquels l'article renvoie. Aucun recouvrement avec les autres
articles du lot.

Remarques (non bloquantes) :
- `:21` « Quand une annonce reçoit des dizaines de réponses » : aucune source ne chiffre les
  réponses par annonce. Écrire « beaucoup de réponses ».
- `:170-171` « ou après la visite » : ajouter un lien vers `/blog/mail-apres-visite-appartement`.
- Exemple 2, « Je vivrais seul » : prévoir « [seul / seule] », comme le titre de l'exemple 1 le fait
  pour « étudiant ou étudiante ».
