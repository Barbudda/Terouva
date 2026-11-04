# Vague 6 : verdicts de relecture (blog-relecteur, 2026-11-04)

Méthode : `docs/seo/blog/METHODE-SERIE.md`, section « La relecture ».
- `npm run blog:sources` : 125 citations sur 140 retrouvées par le script. Les 15 autres (refus 403 de
  Légifrance et de visale.fr) ont été vérifiées à la main dans le navigateur : 15 sur 15 retrouvées mot
  pour mot (art. 22-1 et art. 7 de la loi de 1989, décret 2002-120, trois pages de la FAQ visale.fr).
  Environ 5 minutes.
- Titres, chapeaux et intertitres : les 25.
- Relecture complète d'un article sur trois (1er, 4e, 7e…). Le 7e, `deux-garants-location`, est tombé
  (règle de la personne morale incomplète, mention « manuscrite » périmée) : **le lot entier a donc été
  relu en entier**.
- Fautes matérielles corrigées par moi dans les articles (liste plus bas), puis `npm run blog:verifier`
  au vert (440 tests).

## Verdicts

acompte-reservation-location-appartement · PUBLIABLE
annonce-location-charges-comprises · PUBLIABLE
assurance-loyers-impayes-garant · PUBLIABLE
attestation-hebergement-dossier-location · PUBLIABLE
bail-mobilite · PUBLIABLE
colocation-bail-unique-ou-individuel · PUBLIABLE
deux-garants-location · PUBLIABLE (après mes corrections matérielles)
garant-etranger-location · PUBLIABLE (après ma correction matérielle)
location-appartement-pour-stage · PUBLIABLE
louer-auto-entrepreneur · PUBLIABLE (après ma correction matérielle)
louer-avec-rsa-aah · PUBLIABLE (après ma correction matérielle)
louer-en-cdd · PUBLIABLE (après ma correction matérielle)
louer-en-periode-d-essai · PUBLIABLE (après ma correction matérielle)
louer-sans-avis-d-imposition · PUBLIABLE (après ma correction matérielle)
louer-sans-visiter · À CORRIGER : chapeau, remplacer « Envoyez votre dossier à distance, mais aucune somme ne peut vous être demandée avant la signature du bail, et aucune pièce d'identité avant la visite. » par « Envoyez votre dossier à distance, mais aucune somme ne peut vous être demandée avant la signature du bail, et une demande de carte d'identité avant toute visite est un signe de fausse annonce. » (la source F34092 en fait un signe d'arnaque, pas une interdiction, et le dossier envoyé contient lui-même une pièce d'identité)
louer-son-premier-appartement · PUBLIABLE
premier-loyer-prorata · PUBLIABLE
proprietaire-refuse-apl · À CORRIGER : la loi n'est pas citée pour ce qu'elle dit. Aucune source lue n'assimile le fait de toucher les APL à la « vulnérabilité particulière liée à la situation économique ». (1) Chapeau, remplacer la première phrase par « Écarter un candidat parce qu'il touche les APL peut relever d'un critère que la loi interdit, la vulnérabilité liée à la situation économique, mais nous n'avons pas lu de décision qui le tranche. » (2) Section 1, remplacer « Pas pour ce seul motif. » par « Pas forcément pour ce seul motif. » et « revient à choisir sur ce critère » par « peut relever de ce critère ; nous n'avons pas lu de décision du Défenseur des droits ou d'un juge qui le dise pour les APL ». C'est la même prudence que pour l'article chômage (décision 2019-001, § 28 : préférer des revenus d'activité « n'est pas en tant que tel un critère de discrimination prohibé »)
proprietaire-refuser-animal-location · PUBLIABLE
revenu-minimum-garant-location · PUBLIABLE
se-retracter-apres-signature-bail · PUBLIABLE
surface-minimum-location · PUBLIABLE
visale-colocation · PUBLIABLE
visale-etudiant-etranger · PUBLIABLE
visite-groupee-appartement · PUBLIABLE

## Fautes matérielles corrigées par moi

- `garant-etranger-location` (chapeau et corps) : « hors de l'Hexagone » → « hors de la métropole ».
  L'art. 22-1 dit « sur le territoire métropolitain », qui comprend la Corse.
- `deux-garants-location` : « la mention manuscrite » → « la mention qu'il appose lui-même » (depuis le
  2022-01-01, la mention de l'art. 2297 n'a plus à être manuscrite). Et la règle de la personne morale,
  réduite à l'étudiant boursier, est remplacée par celle de l'art. 22-1 : caution seulement d'un
  organisme fixé par décret, ou si le logement est loué à un étudiant non boursier.
- Âge Visale, `louer-auto-entrepreneur`, `louer-en-cdd`, `louer-en-periode-d-essai`,
  `louer-sans-avis-d-imposition`, `louer-avec-rsa-aah` : « avant 30 ans » ou « à moins de 30 ans »
  → « à 30 ans ou moins ». Avec « à partir de 31 ans » juste après, la personne de 30 ans n'entrait dans
  aucune case : c'est l'erreur corrigée dans les guides à la vague 2. visale.fr écrit « Locataire de
  30 ans ou moins ». Le chapeau de `louer-auto-entrepreneur` a été raccourci d'un mot pour rester à
  60.

## À savoir pour le chef

- Deux sources officielles divergent sur l'âge : F33453 écrit « jusqu'à moins de 30 ans », visale.fr
  « 30 ans ou moins ». Les faits cités dans les articles gardent la phrase de F33453 telle quelle (c'est
  une citation), le texte suit visale.fr et les guides. Une ligne de `FAITS.md` sur ce point serait
  utile.
- Aucune requête-mère en double dans le lot (le vérificateur le contrôle). Pas de cannibalisation vue
  avec les guides : chaque article traite un cas et renvoie au guide pilier.
