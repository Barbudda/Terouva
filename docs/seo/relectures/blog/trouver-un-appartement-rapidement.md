# blog-relecteur : trouver-un-appartement-rapidement (2026-11-04)

Relu par `seo-registre` (distinct de l'auteur), vague 5. Fichiers :
`apps/web/components/blog/articles/trouver-un-appartement-rapidement.tsx` et `.meta.ts` (statut
`brouillon`, publication prévue le 2026-11-16). Sources ouvertes le 2026-11-04 : SP F1169, F33453,
R51424, F34092, ANIL « caution et garanties ».

### blog-relecteur — /blog/trouver-un-appartement-rapidement
Verdict : À CORRIGER

Bloquants : 1 → `:105-106` « il vous signale les annonces qui correspondent à votre recherche **dès
qu'elles paraissent** ». Promesse de délai que le produit ne revendique nulle part : `llms.txt`
(`app/llms.txt/route.ts:36-37`) et le brief disent qu'il « repère les annonces qui correspondent à
sa recherche, les note, et prépare le message », sans délai. Et rien n'est installable aujourd'hui.
Correction exacte : « Terouva fait la veille à votre place : il repère les annonces qui
correspondent à votre recherche et prépare votre réponse. Vous la relisez et vous l'envoyez
vous-même. »

Corrections :
1. Visale « se demande avant d'avoir trouvé le logement » (`:42-43` et la deuxième réponse de la
   FAQ). F33453 dit seulement « avant la signature du bail ». Ajouter la source ANIL qui fonde la
   phrase (le bail est signé « dans le délai de validité du visa ») :
   `{ titre: "ANIL · Caution et garanties : la garantie Visale", url: "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/", releveLe: "2026-11-04" }`.
   Le délai de « quelques jours ouvrés » est bien dans F33453.

Vérifié et exact : les cinq signes de fausse annonce, mot pour mot dans F34092 (prix très bas,
photos visibles dans une autre annonce, refus de rencontrer, argent avant la signature, documents
officiels avant la visite) ; « aucune somme ne peut vous être demandée avant la signature du bail »
(F1169) ; DossierFacile « vérifie que votre dossier est complet et vous envoie un lien unique »
(R51424) ; Visale gratuite (F33453) ; les quatre catégories de pièces autorisées (F1169).

Cannibalisation : requête-mère « comment trouver un appartement rapidement » (autocomplétion et
« Autres questions », registre P1), sans page concurrente sur le site. Recouvrement partiel avec
`etre-le-premier-a-repondre-a-une-annonce` sur `#repondre` (message prêt, alertes) : intentions
distinctes (trouver vite contre répondre premier), à condition de renvoyer vers cet article plutôt
que de redire sa méthode.

Remarques (non bloquantes) :
- Ajouter dans `#repondre` un lien vers `/blog/etre-le-premier-a-repondre-a-une-annonce`.
- Le chapeau dit « répondez dans l'heure » : c'est un conseil, il passe, mais le corps ne le reprend
  pas. Soit le dire dans `#repondre`, soit écrire « répondez vite ».
- `#urgence` : la « location meublée de courte durée » peut renvoyer au bail mobilité, que le site
  ne traite pas encore. Rien à corriger, une piste pour le registre.
- Voix : `zero-slop` en inspection, un seul signal (variété lexicale) ; aucun interdit du brief.

## Contre-relecture du 2026-11-04 (commit be23d1e)

Verdict : PUBLIABLE

Le bloquant est levé : « dès qu'elles paraissent » a disparu, la phrase reprend `llms.txt` (« il
repère les annonces qui correspondent à votre recherche et prépare votre réponse »). La source ANIL
est ajoutée (`.meta.ts:42-43`) et fonde le corps (`:42-43`) comme la FAQ. Remarque non reprise : pas
de lien vers `/blog/etre-le-premier-a-repondre-a-une-annonce`.
