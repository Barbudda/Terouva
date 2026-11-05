# Vague 9 : verdicts de relecture (relecteur distinct des auteurs, 2026-11-06)

Méthode : `docs/seo/blog/METHODE-SERIE.md`, section « La relecture », et les garde-fous de `PLAN-VAGUE-9.md`.

- `npm run blog:sources` : 374 citations dans les 22 articles, 354 retrouvées par le script. Les 20 autres
  (18 Légifrance en 403, 2 dans un PDF de l'ANIL que le script ne sait pas lire) ont toutes été lues à la source ;
  voir plus bas. Les 16 autres échecs du script viennent d'articles déjà publiés, hors de cette relecture.
- Lus : les titres, chapeaux et intertitres des 22.
- Lus en entier, tirage d'un sur trois : n° 1, 4, 7, 10, 13, 16, 19, 22. Aucun n'est tombé, le lot n'a pas été
  relu en entier pour cette raison.
- Lus en entier pour leur garde-fou : n° 2, 6, 8, 14. Corps lus pour leurs citations : n° 3, 5, 11, 20.
- N° 9, 12, 15, 17, 18, 21 : titre, chapeau, intertitres et passages à risque seulement.
- Corrections appliquées, `npm run blog:verifier` au vert (1232 tests réussis, 111 ignorés). Statut inchangé,
  rien de commité.

## Verdicts

Corrections déjà faites dans les fichiers ; aucun article ne reste en attente de son auteur.

- organisme-garant-location · PUBLIABLE (fait ajouté : sociétés payantes, chapeau et liste sans source ; ANIL « Caution et garanties »)
- garant-etudiant-logement · PUBLIABLE
- garant-ami-hors-famille · PUBLIABLE
- garant-obligatoire-en-cdi · PUBLIABLE (chapeau : « Ce qui l'en empêche » devient « Ce qui peut l'en empêcher », une société bailleresse étant l'autre limite ; citation de l'âge Visale remplacée par « Locataire de 30 ans et moins »)
- garant-oblige-de-payer · PUBLIABLE
- modele-acte-caution-solidaire · PUBLIABLE
- aide-depot-de-garantie · PUBLIABLE
- proprietaire-demande-rib · PUBLIABLE (« Le refus du prélèvement ne se justifie pas », qui se lisait à l'envers, devient « Vous n'avez pas à justifier le refus du prélèvement »)
- documents-proprietaire-doit-fournir-location · PUBLIABLE
- etat-des-lieux-entree-non-remis · PUBLIABLE (exception ajoutée au refus du locataire : « sauf s'il prouve son mauvais état initial » ; citation alignée sur le texte consolidé : « A défaut »)
- procuration-etat-des-lieux · PUBLIABLE
- nouveau-locataire-que-faire · PUBLIABLE
- assurance-habitation-locataire · PUBLIABLE
- apl-premier-mois · PUBLIABLE
- taxe-ordures-menageres-locataire · PUBLIABLE
- proprietaire-double-des-cles · PUBLIABLE (fait repris de la circulaire vers l'article 226-4 en vigueur sur Légifrance ; ajout de « hors les cas où la loi le permet » dans le corps)
- repeindre-murs-location · PUBLIABLE
- chaudiere-locataire-ou-proprietaire · PUBLIABLE
- punaises-de-lit-location · PUBLIABLE
- dossier-location-maison · PUBLIABLE (« une haie se traite le plus souvent comme ces arbustes », sans source, devient « faites préciser par écrit qui les taille » ; chapeau : « la chaudière » devient « l'entretien de la chaudière », puisque la panne revient au propriétaire)
- bail-3-ans-partir-avant · PUBLIABLE
- meuble-ou-vide-locataire · PUBLIABLE (« inventaire signé » devient « inventaire détaillé », seul mot de la fiche ; « il peut alors ajouter » devient « le propriétaire peut alors ajouter »)

Bilan : 22 PUBLIABLE, 0 À CORRIGER, 0 REFUSÉ.

## Les 20 citations non retrouvées par le script

Lues le 2026-11-06 dans le panneau de navigation (Légifrance laisse passer après sa vérification automatique),
ou dans le PDF téléchargé. Aucune n'est fausse, aucun fait retiré, aucune invérifiable.

| Source | Version lue | Articles et nombre de citations | Résultat |
|---|---|---|---|
| Loi de 1989, art. 22-1 | en vigueur depuis le 2022-01-01 | ami 1, étudiant 2, CDI 2, garant-oblige 1, modèle 2, organisme 1 | mot pour mot ; l'alinéa recopié dans le modèle est identique au texte |
| Code civil, art. 2297 | en vigueur depuis le 2022-01-01 | ami 1, modèle 2 | mot pour mot |
| Loi de 1989, art. 3-2 | en vigueur depuis le 2023-07-29 | état des lieux 2, procuration 1 | mot pour mot (« A défaut », sans accent, corrigé). Ces citations venaient de la petite loi ALUR : commentaires « À RELIRE » retirés |
| Décret 87-712, annexe | en vigueur depuis le 1987-08-30 | maison 2 | mot pour mot |
| Code pénal, art. 226-4 | en vigueur depuis le 2023-07-29 | double des clés 1 | avant : circulaire de 2023, « manœuvres » au lieu de « manoeuvres ». Fait repris de l'article lui-même |
| ANIL, « Se porter caution » (PDF, janvier 2022) | PDF lu | ami 1, garant-oblige 1 | mot pour mot, après « Après avoir réglé la dette, » |

## Garde-fous contrôlés

- **N° 1** : la CAF renvoie au FSL et l'État n'est pas présenté comme garant, formulé d'après les sources sans en conclure plus. FSL garant « dans certains départements » : ANIL, avec la Marne en exemple sourcé.
- **N° 2** : « La Clé » n'est pas nommée. La caution d'un bailleur personne morale suit l'article 22-1 : boursier, organisme listé seulement ; non boursier, caution possible.
- **N° 6** : aucun fichier à télécharger, aucune promesse de « modèle officiel », validité expressément non garantie.
- **N° 8** : la règle est écrite sans conclure à l'interdiction ni à l'obligation. Le RIB est bien absent de F1169 et la liste compte quatre catégories.
- **N° 14** : la phrase suit F12006, mois de la demande, et son exemple du 15 octobre. Aucune astuce.
- **N° 16** : la sanction de 3 ans et 45 000 € est bien celle de l'article 226-4 en vigueur. L'autre montant vu au relevé (1 an, 15 000 €) est l'ancien : la circulaire de 2023 le confirme.
- **N° 19** : l'ANIL fait foi, résidence principale et bail mobilité, exception nommée, loyer maintenu.

## Pour le chef

- **Âge Visale, à trancher** : F33453 écrit « jusqu'à moins de 30 ans » dans sa phrase d'introduction, et « Locataire de 30 ans et moins » puis « de 31 ans et plus » dans ses titres. Les articles suivent le piège connu (« 30 ans ou moins »). visale.fr n'a pas été relu ici.
- **Casse** : en milieu de phrase, le bloc B écrit « Service-public », les blocs A et C « service-public ». Non corrigé, sans effet sur le sens.

## Défauts à transformer en règle

Candidats à tester d'abord sur tous les articles publiés, comme le veut la méthode.

1. **Source PDF** : le script compare du binaire et échoue toujours (3 faits). Le test pourrait classer un `.pdf` en « à lire » plutôt qu'en « citation introuvable ».
2. **Source hors texte consolidé** : deux rédacteurs ont cité une petite loi ou une circulaire faute d'accès à Légifrance. Pièges connus : une règle de loi se cite dans le texte consolidé, à défaut sur service-public.
3. **Règle absolue sans son exception** : refus de l'état des lieux sans « sauf preuve », et le chapeau du n° 4. Le piège existe depuis la vague 7 et revient.
4. **Usage sans source** : « le plus souvent » pour une règle juridique (haies). Mot à signaler au vérificateur, à condition de ne pas lever de faux positifs (`louer-en-cdd` l'emploie sans faute).
5. **Casse de « service-public »** : règle mécanique possible.
