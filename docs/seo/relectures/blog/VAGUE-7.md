# Vague 7 : verdicts de relecture (relecteur distinct des auteurs, 2026-11-04)

Méthode : `docs/seo/blog/METHODE-SERIE.md`, sections « Pièges connus » et « La relecture ».
- `npm run blog:sources` : 137 citations dans les 22 articles, 136 retrouvées par le script. La
  137e (Légifrance, 403) a été vérifiée à la main : `garant-signer-acte-de-caution-a-distance`, art.
  2297 du Code civil (LEGIARTI000044071230), la citation reprend mot pour mot le texte en vigueur
  depuis le 1er janvier 2022. Retrouvée.
- Titres, chapeaux et intertitres : les 22.
- Relecture complète d'un article sur trois (1er, 4e, 7e… par ordre alphabétique : `a-quel-age`,
  `bail-couple`, `entrer-dans-le-logement`, `garant-signer-a-distance`, `louer-en-interim`,
  `negocier-loyer`, `refus-location-enfants`, `signer-bail-jour-de-la-visite`). Le 4e,
  `bail-couple-un-ou-deux-noms`, est tombé (transfert du bail au concubin passé sous silence, voir
  plus bas) : **le lot entier a donc été relu en entier**.
- Dix corrections exactes appliquées par moi dans huit articles (liste plus bas), puis `npm run
  blog:verifier` au vert (704 tests, 0 échec).

## Verdicts

a-quel-age-louer-un-appartement · PUBLIABLE (corrigé : chapeau « un garant et souvent la garantie Visale » → « et un garant ou la garantie Visale »)
attestation-bon-payeur-location · PUBLIABLE
bail-au-nom-des-parents-ou-de-l-etudiant · PUBLIABLE
bail-couple-un-ou-deux-noms · PUBLIABLE (corrigé : concubin non signataire, transfert du bail en cas d'abandon ou de décès, voir plus bas)
bail-meuble-etudiant-9-mois · PUBLIABLE
changer-de-garant-en-cours-de-bail · PUBLIABLE
entrer-dans-le-logement-avant-la-date-du-bail · PUBLIABLE
fiche-banque-de-france-louer-appartement · PUBLIABLE
garant-se-retracte-avant-signature · PUBLIABLE (corrigé : chapeau « cherchez dans cet ordre » → « menez trois pistes de front », comme le corps)
garant-signer-acte-de-caution-a-distance · PUBLIABLE (corrigé : mention « plus manuscrite » ; acte signé « au plus tard le jour où vous signez le bail »)
louer-avec-promesse-d-embauche · PUBLIABLE
louer-en-apprentissage-alternance · PUBLIABLE
louer-en-interim · PUBLIABLE (corrigé : chapeau « pas sur le type de contrat » retiré)
loyer-d-avance-combien-de-mois · PUBLIABLE
meubles-obligatoires-location-meublee · PUBLIABLE
negocier-loyer-avant-signature-bail · PUBLIABLE (corrigé : ajout d'une phrase sur l'expérimentation du plafonnement ; lien vers `encadrement-des-loyers-fin-ou-prolongation` à poser quand cet article sera publié)
proprietaire-appeler-employeur · PUBLIABLE
quand-chercher-appartement-avant-preavis · PUBLIABLE (corrigé : « quelques semaines de double loyer » contredisait le calendrier de l'article)
refus-location-enfants · PUBLIABLE
se-desister-logement-avant-signature-bail · PUBLIABLE
se-porter-caution-marie-conjoint · PUBLIABLE (corrigé : l'acte « porte la durée de l'engagement » → « porte la mention que la caution appose elle-même »)
signer-bail-jour-de-la-visite · PUBLIABLE

## Corrections appliquées (remplacements mot pour mot)

- `a-quel-age-louer-un-appartement`, chapeau : « un garant et souvent la garantie Visale » laissait
  croire qu'il faut les deux. → « et un garant ou la garantie Visale ».
- `bail-couple-un-ou-deux-noms`, section concubins : « Si le signataire part, ou si le couple se
  sépare, celui qui n'a pas signé n'a rien à faire valoir face au propriétaire » est faux. La fiche
  F35202, déjà source de l'article, prévoit le transfert du bail au concubin notoire en cas d'abandon
  du logement ou de décès du signataire (art. 14 de la loi de 1989). → « Si le signataire donne
  congé, l'autre doit partir au plus tard en même temps, sauf si le propriétaire accepte de signer
  un nouveau bail avec lui » ; et en fin de section : « Sans signature, seuls un abandon brutal du
  logement ou le décès du signataire lui ouvrent un transfert du bail, sous conditions. »
- `garant-se-retracte-avant-signature`, chapeau : « cherchez dans cet ordre » contredisait le corps
  (« trois pistes, à mener en parallèle dès le premier jour »). → « menez trois pistes de front ».
- `garant-signer-acte-de-caution-a-distance` :
  - piège connu de la mention : « Elle peut être tapée dans un acte électronique » → « Elle n'a plus
    à être manuscrite : elle peut être tapée, y compris dans un acte électronique. »
  - « avoir signé son acte avant que vous remettiez le dossier complet » contredisait « il se prépare
    une fois le bail rédigé ». → « au plus tard le jour où vous signez le bail ».
- `louer-en-interim`, chapeau : « comme vos revenus, pas sur le type de contrat » affirmait une
  interdiction qu'aucun texte cité ne pose. → « comme votre situation financière, que vos missions
  peuvent montrer ».
- `negocier-loyer-avant-signature-bail`, section plafonds : l'expérimentation de l'encadrement du
  niveau des loyers arrive à son terme le 2026-11-23, prolongation pas encore définitive (veille du
  2026-10-21). Ajout : « Ce plafonnement est une expérimentation à durée limitée : vérifiez qu'il
  s'applique encore à la date de votre bail. » Le lien vers l'article encadrement, prévu par le plan,
  est refusé par le vérificateur tant que cet article est en brouillon.
- `quand-chercher-appartement-avant-preavis` : « un congé tardif coûte quelques semaines de double
  loyer » contre deux mois et demi dans le calendrier de l'article. → « un double loyer pendant une
  partie du préavis ». Et « le chevauchement tombe à un mois » → « à un mois au plus ».
- `se-porter-caution-marie-conjoint` : la durée n'est pas une mention obligatoire de l'acte (il peut
  être sans durée, art. 22-1). « porte le montant du loyer et la durée de l'engagement » → « porte le
  montant du loyer et la mention que la caution appose elle-même ».

Deux corrections ont fait sortir une réponse des 35 à 70 mots ; les phrases ont été déplacées dans
le paragraphe suivant, sans changer le texte.

## Défauts qui reviennent d'un article à l'autre (pour le vérificateur)

1. **Mention de la caution, encore** (2 articles cette vague, déjà en vague 6) : l'article évite le
   mot « manuscrite » sans dire qu'elle ne l'est plus, ou prête à l'acte des mentions obligatoires
   qu'il n'a pas (la durée). Règle proposée : tout article qui cite l'art. 2297 ou F31267 et parle de
   « mention » doit contenir « plus manuscrite » ou « n'a plus à être manuscrite » ; et « durée de
   l'engagement » à côté de « l'acte porte » ou « doit indiquer » part en relecture.
2. **Chapeau qui dit autre chose que le corps** (3 articles : ordre ou parallèle, « et » ou « ou »,
   durée du double loyer). Pas jugeable par regex. Proposé pour le rédacteur : écrire le chapeau en
   dernier, en relisant les premières phrases de chaque section.
3. **Règle absolue qui oublie l'exception de sa propre source** (2 articles : concubin « rien à faire
   valoir » alors que F35202 a une section transfert ; intérim « pas sur le type de contrat »).
   Règle proposée : « rien à faire valoir », « aucun recours », « ne peut jamais », hors citation,
   partent en relecture. Pour le rédacteur : quand la fiche source a une rubrique « abandon »,
   « décès » ou « exceptions », l'article la nomme au moins en une phrase.
4. **Dispositif daté cité sans sa date** (encadrement des loyers, terme le 2026-11-23). Règle
   proposée : « plafonné », « loyer de référence » ou « encadrement » dans un article obligent à
   un lien vers l'article encadrement (une fois publié), qui porte la date à jour.

## À savoir pour le chef

- `negocier-loyer-avant-signature-bail` : poser le lien vers
  `/blog/encadrement-des-loyers-fin-ou-prolongation` le jour où cet article est publié, et relire
  la section plafonds si la prolongation n'est pas définitive au 2026-11-23.
- Aucun piège Visale dans le lot : partout « 30 ans ou moins » et « à partir de 31 ans ». Aucune
  décision de justice citée pour le fichage ou les enfants. Territoire de la caution et caution
  personne morale : non abordés dans ce lot.
- Pas de cannibalisation vue : chaque article renvoie aux pages voisines nommées dans le plan, sauf
  `negocier-loyer` vers l'encadrement (lien bloqué, voir plus haut).
- Rien n'est commité.
