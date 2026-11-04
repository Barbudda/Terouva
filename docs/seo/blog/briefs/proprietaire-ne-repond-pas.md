# Brief 3 — Le propriétaire ne répond pas à votre message : pourquoi, et quoi faire

> Rédacteur en chef : `blog-redacteur-en-chef`, 2026-11-04. Rédaction : `seo-redacteur`. Relecture :
> `blog-relecteur`. Publication semaine du 2026-11-16, après l'article 2 ou le même jour.

## Entrée `apps/web/lib/blog.ts` (ajout du 2026-11-04, rubrique créée par le commit 045a395)

| Champ | Valeur proposée | Contrôle |
|---|---|---|
| `slug` | `proprietaire-ne-repond-pas` | |
| `titre` (h1) | « Le propriétaire ne répond pas à votre message : pourquoi, et quoi faire » | |
| `titreSeo` | « Le propriétaire ne répond pas : que faire ? » | 53 signes avec « · Terouva » (≤ 60) |
| `description` | « Votre message à un propriétaire reste sans réponse ? Les raisons probables, quand relancer, et comment répondre plus tôt à la prochaine annonce. » | 144 signes (70 à 155) |
| `chapeau` | « Un propriétaire qui ne répond pas a souvent déjà assez de candidats, ou votre message ne lui donnait pas de quoi décider. Vous ne pouvez pas le vérifier, mais vous pouvez relancer une fois, brièvement, avec une information utile. Le vrai levier reste le message suivant : envoyé plus tôt, et complet dès la première ligne. » | 56 mots (40 à 60). « Souvent » n'est pas une mesure : `blog-relecteur` décide s'il passe ou s'il devient « peut-être » |
| `pilier` · `format` · `lecture` | `A` · `cas-pratique` · 5 | |
| `guidePilier` | `/guides/repondre-a-une-annonce-de-location` | |
| `guidesLies` | `/guides/dossier-de-location`, `/guides/refus-de-dossier` | |
| `outilLie` | `/outils/message-de-candidature` | |

## Fiche

| Champ | Valeur |
|---|---|
| Adresse | `/blog/proprietaire-ne-repond-pas` |
| Format | cas pratique pas à pas |
| Pilier | A. Répondre vite et bien |
| Requête-mère | « propriétaire ne répond pas » (registre, P2, autocomplétion et « Autres questions ») |
| Variantes | pourquoi les agences immobilières ne répondent-elles pas ? (PAA dans 2 SERP sur 13) ; mon propriétaire ne répond pas à mes messages ; relancer un propriétaire pour une location ; pas de réponse après candidature location |
| Intention | information, avec un geste à faire tout de suite |
| Ne pas cannibaliser | `/guides/repondre-a-une-annonce-de-location` (« comment répondre », pos. 6,7, à ne pas déplacer) ; l'outil `/outils/message-de-candidature` et la future requête « mail après visite » (registre : outil + section du guide). L'article traite **le silence avant la visite** ; l'après-visite est l'article 11 du calendrier |
| Longueur | 800 à 1 100 mots. Aucune page concurrente directe : la réponse doit être complète, pas longue |

## L'angle

SERP google.fr **non lue** (registre). Recherche web du 2026-11-04 : les pages qui sortent sur
« propriétaire ne répond pas » traitent du préavis, des impayés, de travaux ou de location
saisonnière, toutes côté locataire déjà en place ou côté bailleur. **Aucune ne traite le candidat
dont le premier message reste sans réponse.** C'est un angle mort, et c'est exactement le problème
que Terouva résout : répondre tôt et complet.

À demander à `seo-registre` avant la rédaction : lire la SERP google.fr de « propriétaire ne répond
pas » et de « pourquoi les agences ne répondent pas » (formats, ce que disent les PAA), pour caler
les intertitres sur les questions réelles.

L'article dit ce qu'on sait, sans inventer de chiffres : un silence a des causes probables qu'on ne
peut pas vérifier depuis l'extérieur ; on peut agir sur deux d'entre elles (le moment et le contenu
du message) ; on relance une fois, proprement ; on reconnaît le message trop rapide qui demande de
l'argent.

## Plan en questions

Chapeau-réponse (40 à 60 mots) : le plus souvent, un propriétaire ne répond pas parce qu'il a déjà
assez de candidats ou que votre message ne lui donnait pas de quoi décider ; une relance courte, une
fois, suffit ; le vrai levier est le message suivant, plus tôt et plus complet. (À reformuler : les
causes sont présentées comme probables, pas comme mesurées.)

1. Pourquoi un propriétaire ne répond-il pas ? (annonce déjà louée ou visites déjà calées ; message
   arrivé tard ; message sans les informations qui servent à trier ; message qui sent le
   copier-coller ; annonce retirée. Ce sont des explications courantes, présentées comme telles)
2. Votre message contenait-il ce qui sert à trier ? (rappel en trois lignes des six informations du
   guide pilier, et lien ; pas de copie du guide)
3. Faut-il relancer, et quand ? (une relance, courte, qui ajoute une information utile ; pas de délai
   présenté comme une règle : aucune source. Un exemple de relance de quatre lignes, marqué comme exemple)
4. Et les agences, pourquoi ne répondent-elles pas ? (même logique, plus le dossier complet attendu
   d'emblée ; renvoi au guide dossier)
5. Quand passer à autre chose ? (quand l'annonce a disparu, quand une relance est restée sans
   réponse ; le temps passé sur une annonce silencieuse est pris sur les suivantes)
6. Un propriétaire qui répond tout de suite et demande de l'argent ou des documents avant la visite :
   que faire ? (aucune somme avant la signature du bail ; liste limitative des pièces ; signes d'une
   arnaque, lien vers le futur guide « arnaque » quand il existera, sinon vers le guide dossier)
7. Comment répondre plus tôt la prochaine fois ? (alertes de recherche, message prêt à adapter,
   dossier prêt ; lien vers l'outil gratuit ; une phrase honnête sur Terouva, voir l'appel à l'action)

## Faits à sourcer (dans `docs/seo/FAITS.md` avant publication)

| # | Fait | Source visée | Déjà relevé ? |
|---|---|---|---|
| 1 | Aucune somme ne peut être demandée avant la signature du bail | service-public F1169 | oui (`faits-confirmes-2026-11-04.md`) |
| 2 | Liste limitative des pièces ; pièces interdites (relevés de compte, attestation de bonne tenue de compte) | art. 22-2 loi 1989 (LEGIARTI000028806691), décret 2015-1437, F1169 | oui |
| 3 | Amende pour une pièce non autorisée (3 000 € personne physique, 15 000 € personne morale) | art. 22-2 + F1169 | oui ; à citer seulement si utile au propos |
| 4 | Ressources officielles contre les arnaques au logement (signalement) | service-public, cybermalveillance.gouv.fr, ou la plateforme officielle de signalement : **à identifier et lire**, ne pas citer de mémoire | non |

**Pas de chiffre** sur le nombre de réponses reçues par une annonce, sur le délai moyen de réponse ou
sur le taux de relance qui marche : aucune source publique relevée (registre, case « Personne »). La
phrase du guide pilier « des dizaines de réponses en quelques heures » ne s'appuie sur aucune source
officielle (les sources du guide au catalogue sont PAP, Vestae et une agence, non relues ici) : ne
pas la reprendre sans l'avoir trouvée dans l'une d'elles, et la signaler à `seo-fraicheur`.

## Liens internes obligatoires

- Pilier : `/guides/repondre-a-une-annonce-de-location`, depuis la question 2, ancre « les six
  informations qui servent à vous trier ».
- Outil : `/outils/message-de-candidature`, depuis les questions 3 et 7.
- Guide voisin : `/guides/dossier-de-location`, depuis les questions 4 et 6.
- Guide voisin : `/guides/refus-de-dossier`, en une ligne (« si la réponse arrive et que c'est un refus »).
- À ajouter quand ils existeront : le guide « arnaque » (registre, P1) et l'article « Après la
  visite » (calendrier, semaine 11). `seo-maillage` le note.

## Appel à l'action

Outil gratuit d'abord : « Préparer votre message » (`/outils/message-de-candidature`, rien n'est
envoyé). Puis « Être prévenu », sur ce que le produit fait réellement : repérer les annonces qui
correspondent à votre recherche et préparer votre réponse, que **vous** relisez et envoyez. Aucune
phrase ne laisse croire à un envoi ou à une relance automatiques (ligne rouge).

## Visuel demandé à `seo-visuels`

Un schéma simple en SVG : un message envoyé, trois issues (réponse, silence, demande d'argent), et
pour chacune le geste à faire. Pas de délai chiffré sur le schéma. Texte alternatif qui dit les trois
issues. Image de partage : le titre.

## Contrôles avant publication

- `blog-relecteur` : aucune cause de silence présentée comme un fait mesuré ; l'exemple de relance est
  marqué comme exemple, nom fictif évident, aucune donnée réelle.
- Le mot « Leboncoin » n'apparaît pas dans une ancre ; s'il apparaît dans le texte, c'est comme lieu
  de l'annonce, jamais comme partenaire. Pas de comparatif de sites.
- Aucun prix ni offre.
