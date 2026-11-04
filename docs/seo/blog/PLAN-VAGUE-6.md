# Plan de la vague 6 du blog — 25 articles

> Propriétaire : `blog-redacteur-en-chef`, 2026-11-04. Suit la vague 5 (une vingtaine d'articles en
> brouillon le 2026-11-04). Calendrier de publication : `CALENDRIER.md`. Règles : `LIGNE-EDITORIALE.md`
> et `docs/seo/BRIEF.md`, section « Blog en volume ».
> Chaque article de ce plan reçoit un brief complet (format de la fiche) avant d'être confié à un
> rédacteur. Ce plan fixe la requête, l'angle et la frontière avec les autres pages, pas le texte.

## Sources des requêtes

- **AC** = autocomplétion Google (hl=fr, gl=fr), relevée par `blog-redacteur-en-chef` le 2026-11-04
  sur 67 racines. Elle prouve qu'une requête est tapée, pas combien de fois. Aucune requête de ce
  plan n'a de volume : Semrush n'a plus d'unités.
- **Registre** = `docs/seo/REGISTRE.md` v2 (commit f8420b7).
- **SERP non lue** pour les 25 : `seo-registre` lit la SERP google.fr de chaque requête-mère avant
  le brief. Un article dont la SERP montre que la réponse tient en une ligne, ou qu'une page
  officielle l'a déjà parfaitement, sort du plan.

## Répartition

| Pilier | Vague 5 | Vague 6 | Pourquoi |
|---|---|---|---|
| A. Répondre vite et bien | 8 | 4 | La vague 5 a déjà couvert presque toutes les requêtes A réellement tapées (relance, après visite, lettre de motivation, trouver vite, arnaque, visite) ; les autres variantes A relevées (« comment convaincre un propriétaire de nous choisir », « comment un propriétaire choisit son locataire ») sont celles du guide pilier A, pas des articles |
| B. Le dossier et vos droits | 4 | 9 | Le plus grand gisement de questions précises « peut-on louer quand… », ce que les assistants citent |
| C. Garant et garanties | 2 | 6 | Questions de règle étroites que les guides garant et Visale ne traitent pas |
| D. Le bail et le loyer | 6 | 6 | Ce que le candidat vérifie dans l'annonce et au bail |

Vague 5 comptée sur les titres annoncés par le chef (20 articles, encadrement compris) : A = ne répond
pas, mail après visite, trouver vite, être le premier, lettre de motivation, questions de visite,
arnaque, dossier retenu ; B = chômage, DossierFacile, filigrane, frais d'agence ; C = Visale refusée,
âge du garant ; D = encadrement, nouveau bail, DPE 2027, IRL, étude zones tendues, lettre de préavis.
Total des deux vagues : A 12, B 13, C 8, D 12.

## Les 25 articles

Format : Q = question précise ; CP = cas pratique. « Risque » au sens du registre : faible = intention
distincte de toute page ; moyen = page voisine, l'article renvoie vers elle sans traiter son sujet.
Aucun article à risque élevé n'entre dans ce plan.

| # | Titre de travail | Requête-mère (variantes) | Source | Pilier | Format | Guide pilier | Angle en une phrase | Pourquoi il ne cannibalise rien | Risque |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Louer sans visiter : comment faire à distance sans se faire avoir | louer sans visiter (location appartement sans visiter ; louer un appartement à distance ; comment louer un appartement à distance) | AC | A | CP | repondre-a-une-annonce | Le cas de l'étudiant ou du muté qui candidate depuis une autre ville : visite en vidéo, proche mandaté, ce qu'on peut faire et ce qu'on ne paie jamais avant d'avoir vu | L'article « arnaque » de la vague 5 dit comment repérer une fraude ; celui-ci montre la démarche honnête à distance et renvoie vers lui en une ligne | moyen |
| 2 | Visite collective : comment sortir du lot quand vingt candidats visitent en même temps | visite groupée appartement (visite collective appartement ; documents à apporter visite appartement) | AC | A | CP | repondre-a-une-annonce | Ce qui se joue dans les dix minutes d'une visite groupée : dossier complet en main, une question utile, la réponse le soir même | « Questions à poser en visite » (vague 5) liste les questions ; celui-ci traite le format collectif et le dossier à apporter, sans liste de questions | moyen |
| 3 | Louer pour un stage de quelques mois | location appartement pour stage | AC | A | CP | repondre-a-une-annonce | Trouver vite un logement court : meublé, bail mobilité, Visale ouverte à tout âge en bail mobilité, et le message qui dit les dates dès la première ligne | Le n° 20 (bail mobilité) explique le contrat ; celui-ci est le parcours du stagiaire et ne détaille pas le contrat | moyen |
| 4 | Louer son premier appartement : le dossier quand on n'a ni quittances ni avis d'imposition à son nom | louer son premier appartement (louer son premier logement ; comment louer son premier appartement) | AC | A | CP | dossier-de-location | Le primo-locataire sans historique : ce qui remplace les pièces qu'il n'a pas, et l'ordre des démarches (Visale d'abord) | « Trouver un appartement rapidement » (vague 5) traite la vitesse ; « sans avis d'imposition » (n° 9) traite une seule pièce ; celui-ci est le parcours complet et renvoie vers les deux | moyen |
| 5 | Peut-on louer un appartement en période d'essai ? | louer un appartement en période d'essai (peut-on louer… ; louer en CDI période d'essai) | AC | B | Q | dossier-de-location | Oui : ce que le propriétaire peut demander (contrat, fiches de paie), pourquoi il hésite, et Visale qui accepte les salariés récemment embauchés | Aucune page ne vise la période d'essai ; l'outil dossier donne la liste des pièces, l'article répond à « est-ce possible » | faible |
| 6 | Louer en CDD : avec ou sans garant | louer un appartement en CDD (avec garant ; sans garant ; comment louer quand on est en CDD) | AC | B | Q | dossier-de-location | Les pièces pour un CDD, la durée du contrat face à la durée du bail, et les garanties possibles | « Louer sans garant et sans CDI » reste au guide `louer-sans-garant` (registre) ; l'article est propre au CDD et y renvoie | moyen |
| 7 | Louer en auto-entrepreneur : les pièces que le propriétaire peut demander | louer un appartement auto-entrepreneur (comment louer… ; peut-on louer en auto-entrepreneur) | AC | B | Q | dossier-de-location | Le décret prévoit pour les indépendants les deux derniers bilans ou, à défaut, une attestation de ressources de l'exercice en cours : comment la présenter quand on vient de démarrer | Le guide dossier cite la ligne du décret ; l'article traite le cas du jeune indépendant sans bilan | faible |
| 8 | Louer avec le RSA ou l'AAH : ce que le propriétaire peut regarder, et ce qu'il ne peut pas retenir | louer un appartement avec le RSA (louer avec l'AAH ; peut-on louer avec le RSA ; RSA et garant) | AC | B | Q | refus-de-dossier | Les prestations comme ressources du dossier, la vulnérabilité économique comme critère interdit, la position du Défenseur des droits sur la nature des revenus | « Louer au chômage » (vague 5) traite les allocations chômage. **Une seule page pour RSA et AAH** : deux pages presque identiques seraient du contenu de masse. Le brief partage les faits communs avec l'article chômage et ne garde que ce qui est propre au RSA et à l'AAH | moyen |
| 9 | Louer sans avis d'imposition | louer sans avis d'imposition (peut-on louer… ; dossier location sans avis d'imposition ; sans déclaration d'impôt) | AC | B | Q | dossier-de-location | L'avis d'imposition est une pièce parmi d'autres de la liste ; ce qui le remplace pour un jeune, un arrivant de l'étranger ou un premier déclarant | Le guide dossier liste les pièces sans traiter l'absence de l'une d'elles | faible |
| 10 | Attestation d'hébergement : quand elle sert dans un dossier de location, et ce qu'elle doit dire | attestation d'hébergement dossier location (attestation d'hébergement location appartement ; modèle) | AC | B | Q (avec modèle) | dossier-de-location | Le candidat hébergé chez ses parents ou un ami : la pièce de domicile autorisée par le décret, et un modèle | Le guide dossier la cite en une ligne parmi les pièces ; l'article est le mode d'emploi. Écarter « location saisonnière » et « sous-location », autres intentions | faible |
| 11 | Acompte pour réserver un appartement : est-ce légal ? | acompte réservation location appartement (acompte location appartement ; acompte réservation… loi) | AC | B | Q | dossier-de-location | Aucune somme ne peut être demandée avant la signature du bail : la règle, ce qu'un propriétaire de bonne foi peut faire à la place, et quoi répondre | L'article « arnaque » (vague 5) traite la fraude ; celui-ci traite la demande d'un vrai propriétaire mal informé. Le brief 3 (« ne répond pas ») renvoie ici sur ce point au lieu de le développer | moyen |
| 12 | Un propriétaire peut-il refuser un locataire qui touche les APL ? | propriétaire refuse APL (bailleur refuse APL ; pourquoi propriétaire refuse APL) | AC | B | Q | refus-de-dossier | Ce que dit la loi d'un refus lié aux aides au logement, pourquoi certains bailleurs s'en méfient, et le versement au propriétaire qui peut rassurer | Le guide refus liste les critères ; l'article tranche un cas que le guide ne nomme pas | faible |
| 13 | Animal de compagnie : un propriétaire peut-il refuser votre candidature ou l'interdire dans le bail ? | un propriétaire peut-il refuser un chat (refus location animaux ; louer un appartement avec un chien) | AC | B | Q | refus-de-dossier | Deux moments distincts : le choix du locataire, et la clause du bail sur les animaux familiers, que la loi encadre | Aucune page ne traite les animaux | faible |
| 14 | Garant étranger : un propriétaire peut-il le refuser ? | garant étranger location France (garant étranger location) | AC | C | Q | garant-caution | La règle (une caution ne peut être refusée parce qu'elle n'est pas française ou ne réside pas en métropole) et les pièces qu'un garant à l'étranger peut fournir | Le guide garant cite la règle en une phrase ; l'article est le cas complet du garant hors de France | moyen |
| 15 | Un propriétaire peut-il demander deux garants ? | deux garants location (deux garants pour une location ; demander deux garants pour location) | AC | C | Q | garant-caution | Ce que la loi permet et interdit sur le cumul de garanties, avec la règle du bailleur assuré contre les impayés | Le guide garant ne traite pas le nombre de garants | faible |
| 16 | Quel revenu faut-il pour se porter garant ? | garant location revenu minimum (garant revenus minimum ; garant salaire minimum ; être garant en CDD) | AC | C | Q | garant-caution | Aucune loi ne fixe de revenu minimum pour un garant : ce que le propriétaire regarde, et ce qui compte pour un garant en CDD | Le futur outil « quel salaire pour un loyer » calcule pour le **locataire** ; l'article parle du **garant** et ne donne aucun ratio présenté comme règle. À relire contre la page outil quand elle existe | moyen |
| 17 | Visale en colocation : bail unique ou bail individuel | visale colocation (bail unique ; solidaire ; loyer maximum ; bail individuel) | AC | C | Q | garantie-visale | Comment Visale s'applique selon le type de bail en colocation, et le plafond de loyer pris en compte | Le guide Visale ne traite pas la colocation. Source officielle à lire dans un navigateur (visale.fr répond 403 aux robots) ; sans elle, l'article ne part pas | faible |
| 18 | Visale pour un étudiant étranger | visale étudiant étranger (visale étudiant ; rattaché au foyer fiscal des parents) | AC | C | Q | garantie-visale | Les conditions propres à l'étudiant venu de l'étranger, et le cas de l'étudiant rattaché au foyer fiscal de ses parents | Le guide Visale donne les conditions générales ; l'article traite un public que le guide ne nomme pas | moyen |
| 19 | Le propriétaire a une assurance loyers impayés : peut-il vous demander un garant ? | assurance loyer impayé garant (caution ; caution solidaire ; avec garant) | AC | C | Q | garant-caution | La règle de l'article 22-1 : pas de caution exigée d'un locataire quand le bailleur est assuré, sauf étudiant ou apprenti | Le guide garant traite le garant ; aucune page ne traite ce cumul interdit, pourtant sourcé (`faits-confirmes-2026-11-04.md`) | faible |
| 20 | Bail mobilité : pour qui, combien de temps, et ce qu'il change pour le dépôt de garantie | bail mobilité (conditions ; c'est quoi) | AC | D | Q | depot-de-garantie | Le contrat de 1 à 10 mois, ses publics, pas de dépôt de garantie, Visale à tout âge | Le n° 3 (stage) est un parcours qui renvoie ici pour le contrat ; aucune page ne présente le bail mobilité | faible |
| 21 | Peut-on se rétracter après avoir signé un bail ? | se rétracter après signature bail location (peut-on se rétracter ; combien de temps pour se rétracter) | AC | D | Q | preavis-location | Il n'existe pas de délai de rétractation pour un bail d'habitation (à confirmer à la source) : ce qui reste possible, avant et après l'entrée dans les lieux | Le guide préavis traite le départ d'un locataire installé ; l'article traite le candidat qui vient de signer. Écarter « bail commercial » | moyen |
| 22 | Surface minimum d'un logement en location : vérifier l'annonce avant de répondre | surface minimum location (par personne ; pour 2 personnes ; pour 4 personnes ; loi Carrez) | AC | D | Q | repondre-a-une-annonce | Les critères de décence sur la surface et le volume, et la différence avec les seuils par personne qui servent ailleurs (aides, regroupement familial) | Aucune page ne traite la décence. Les variantes par ville (« Nantes », « Paris ») ne changent pas la règle : pas de page par ville | faible |
| 23 | Colocation : bail unique ou bail individuel, ce que ça change pour vous | colocation bail unique ou individuel | AC | D | Q | garant-caution | Solidarité, départ d'un colocataire, garant engagé pour qui : le choix du contrat vu du candidat | Le n° 17 traite Visale en colocation et renvoie ici pour le contrat ; « dossier colocation » reste à l'outil dossier (registre) | moyen |
| 24 | « Charges comprises » dans une annonce : ce que le loyer affiché contient vraiment | annonce location charges comprises | AC | D | Q | repondre-a-une-annonce | Provision ou forfait de charges, régularisation annuelle, et comment comparer deux annonces | Le futur outil « quel salaire pour un loyer » prend un loyer en entrée ; l'article explique quoi y mettre et renvoie vers l'outil. « Calcul charges locatives » est écarté au registre (intention de bailleur) | faible |
| 25 | Le premier loyer se paie-t-il au prorata ? | calcul prorata loyer entrée (prorata loyer ; 30 ou 31 jours) | Registre (section 8) et AC | D | Q | depot-de-garantie | Ce que dit le bail, comment se calcule le premier mois quand on entre en cours de mois, avec un exemple chiffré | Le registre prévoit un outil « calcul prorata loyer » en P3 : l'article prend « le premier loyer se paie-t-il au prorata », l'outil prendra « calcul » et « simulateur » ; les deux se lient | moyen |

## Écartés au relevé, et pourquoi

| Requête vue (AC) | Raison |
|---|---|
| comment convaincre un propriétaire de nous choisir ; comment un propriétaire choisit son locataire ; comment se démarquer pour une location | Intention du guide pilier A (registre, ligne « comment répondre à une annonce ») : à ajouter à ses variantes, pas un article |
| dossier location couple ; dossier colocation ; colocation dossier facile | Variantes par situation de l'outil dossier (registre, section 5) |
| quel loyer pour mon salaire ; quel loyer pour salaire 1 400 € | Outil « quel salaire pour un loyer » en construction |
| garant ou visale ; garant visale ou physique | Question « quelle différence entre Visale et un garant physique ? » du guide Visale (registre) |
| caution parentale modèle ; lettre de garant location | Acte de cautionnement, section du guide garant ; risque élevé |
| caution bancaire location | Suggestions dominées par les noms de banques ; lien produit faible |
| propriétaire annule location | Demande réelle, mais aucune source officielle identifiée sur la rupture d'un accord avant bail : à reprendre si `blog-veille-juridique` en trouve une |
| location meublée préavis locataire | Section du guide préavis ; risque élevé |
| visale propriétaire refuse | Couvert par « Visale refusée » (vague 5) |
| caution étudiant boursier | Section « Le cas des étudiants » du guide `louer-sans-garant` ; risque élevé |

## Garde-fous propres à cette vague

- **La série « peut-on louer quand… »** (n° 5 à 9) a la même forme cinq fois. Elle ne passe que si
  chaque article a des faits qui lui sont propres (pièce du décret, règle Visale, cas réel) et se
  publie étalée sur plusieurs lots, jamais les cinq ensemble. `blog-relecteur` refuse un article dont
  plus de la moitié pourrait être recopiée dans un autre de la série.
- Les n° 8, 12 et 13 touchent à la discrimination : relecture juridique serrée, positions du
  Défenseur des droits attribuées à lui, jamais présentées comme la loi.
- Les n° 17 et 18 dépendent de visale.fr, qui refuse les robots : un humain lit la source dans un
  navigateur, ou l'article attend.
