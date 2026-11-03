# Plan de liens entrants (backlinks) pour terouva.com

Établi le 2026-11-03. Rien n'est soumis ni créé automatiquement : chaque fiche, chaque message et
chaque compte est fait à la main par Hugo.

**Point de départ** : terouva.com a un Domain Rating (Ahrefs, 0 à 100) de **0**. C'est normal
pour un domaine de quelques semaines. Une quinzaine de liens propres, venus de sites qui parlent
de logement, de location ou de startups françaises, suffisent à sortir de zéro en quelques mois.

Mesures faites le 2026-11-03 avec `check_domain_rating` du MCP BlogSEO (gratuit, résultat en cache
24 h). Le réseau d'échange de liens de BlogSEO n'est pas utilisé : il exige un abonnement, et
Google traite les échanges de liens automatisés comme un schéma de liens.

---

## Les textes à copier

Ils servent partout. Pas de tiret cadratin, pas d'emoji, le vouvoiement, et jamais « Leboncoin »
dans le nom du produit ni dans une ancre de lien : Terouva n'a aucun lien avec Leboncoin, et
les fiches doivent le laisser clair.

**Nom** : Terouva

**Accroche (60 caractères)**

> Trouvez votre logement sans y passer vos journées.

**Description courte (environ 150 caractères)**

> Terouva repère les annonces de location qui vous correspondent, les note et prépare votre
> message de candidature. Vous relisez, vous envoyez.

**Description longue**

> Chercher une location, c'est rafraîchir les mêmes recherches dix fois par jour, puis écrire le
> même message à chaque annonce. Terouva fait la partie répétitive. Il repère les nouvelles
> annonces qui correspondent à vos critères, leur donne une note sur 100 selon ce qui compte pour
> vous, et prépare un message de candidature dans le ton que vous choisissez. Vous relisez, vous
> envoyez vous-même : Terouva n'agit jamais à votre place.
>
> Tout reste sur votre ordinateur. Pas de compte à créer, pas de serveur qui stocke vos
> recherches ou votre dossier, pas de publicité.
>
> Le site propose aussi deux outils gratuits, sans inscription : la liste des pièces de dossier
> de location selon votre situation (et celles qu'on n'a pas le droit de vous demander), et un
> générateur de message de candidature. Une dizaine de guides sourcés couvrent la garantie Visale,
> le dépôt de garantie, le garant, le refus de dossier, l'état des lieux et le préavis.
>
> Terouva est en préparation. La démo est en ligne, et la liste d'attente est ouverte.

**Version anglaise courte** (pour les annuaires internationaux)

> Terouva spots the rental listings that match you in France, scores them and drafts your
> application message. You review it, you send it. Everything stays on your computer.

**Catégories à choisir** : Immobilier / Real estate, Productivité, Recherche de logement.
**Mots-clés** : location, recherche de logement, dossier de location, appartement, colocation, étudiant.
**Visuels** : `https://terouva.com/icon.svg` (logo), `https://terouva.com/opengraph-image` (bannière
1200 × 630), `https://terouva.com/promo/affiche.jpg` (affiche).
**Fondateur** : Hugo Moëne. **Éditeur** : Blue Lake Dev. **Lieu** : Sévrier, Haute-Savoie.

---

## Vague 1 : annuaires de lancement (semaine 1, environ 2 heures)

Tous gratuits dans leur formule de base. Les options payantes (mise en avant, passage
prioritaire) ne sont pas utiles à ce stade : ne rien payer sans en parler.

| Ordre | Site | DR | Ce qu'on y fait | Page à lier |
|---|---|---|---|---|
| 1 | betalist.com | 77 | Fait pour les produits pas encore lancés : colle à la liste d'attente | `/` |
| 2 | alternativeto.net | 82 | Fiche Terouva, déclarée alternative aux alertes d'annonces immobilières (Jinka, si la fiche existe) | `/` |
| 3 | saashub.com | 81 | Fiche produit, mêmes alternatives | `/` |
| 4 | uneed.best | 77 | Lancement gratuit, avec file d'attente de quelques semaines | `/` |
| 5 | fazier.com | 84 | Lancement gratuit | `/` |
| 6 | peerlist.io | 78 | Profil de Hugo, puis Launchpad | `/` |
| 7 | microlaunch.net | 64 | Lancement gratuit | `/` |
| 8 | indiehackers.com | 82 | Fiche produit, puis un post sur le choix du « tout en local » | `/` |
| 9 | crunchbase.com | 91 | Fiche organisation : sert surtout l'identité de marque (`sameAs`) | `/` |

**À garder pour plus tard** : Product Hunt (DR 91), le jour où Terouva est utilisable par tous.
On ne lance qu'une fois, et un lancement sur une liste d'attente convertit mal.

Chaque URL de fiche publiée est à envoyer à Claude : elle entre dans le champ `sameAs` de
l'organisation (`apps/web/app/layout.tsx`, bloc JSON-LD), qui n'en a aucun aujourd'hui.

---

## Vague 2 : presse startup française (semaine 2)

| Site | DR | Principe |
|---|---|---|
| maddyness.com | 80 | Rubrique des jeunes pousses et formulaire de contact de la rédaction. Angle : une app de recherche de logement qui ne garde aucune donnée |
| frenchweb.fr | 77 | Même approche, proposer un portrait court du projet |

Un e-mail court et personnel, pas un communiqué. Exemple de sujet : « Une app qui prépare vos
candidatures de location sans rien stocker ». Ajouter un chiffre réel seulement s'il existe
(inscrits sur la liste d'attente, par exemple).

---

## Vague 3 : communautés où les gens cherchent un logement (2 ou 3 réponses par semaine)

Ces liens ont peu de poids individuellement, souvent en `nofollow`, mais beaucoup de pertinence,
et ce sont eux qui amènent des inscrits. On y donne un guide ou un outil gratuit, jamais la page
d'accueil en premier.

| Lieu | DR | Question type | Page à donner |
|---|---|---|---|
| Reddit r/conseiljuridique | 95 | « Mon propriétaire ne rend pas ma caution » | `/guides/depot-de-garantie` |
| Reddit r/vosfinances | | « Quels papiers pour un dossier de location ? » | `/outils/dossier-de-location` |
| Reddit r/etudiants, r/lyon, r/paris… | | « Louer sans garant quand on est étudiant ? » | `/guides/louer-sans-garant` ou `/guides/garantie-visale` |
| Groupes Facebook de colocation et de logement étudiant par ville | | « Comment rédiger mon message au propriétaire ? » | `/outils/message-de-candidature` |
| idem | | « On me demande mon relevé bancaire, c'est normal ? » | `/guides/dossier-de-location` |

Règle : répondre d'abord dans le texte, puis donner le lien en source. Un lien par réponse.
Sur Reddit, lire les règles de chaque communauté : la plupart bannissent l'autopromotion.

---

## Vague 4 : associations et sites d'information sur le logement (semaine 3 et après)

Ces sites listent parfois des ressources utiles aux locataires. Les guides de Terouva sont
sourcés sur les textes officiels : c'est ce qui peut leur donner envie de les citer.

| Site | DR | Ce qu'on propose |
|---|---|---|
| anil.org et les ADIL départementales (ADIL 74 en premier) | 83 | Signaler l'outil gratuit de dossier de location, qui reprend la liste légale des pièces |
| clcv.org (association de consommateurs, logement) | 73 | Idem, avec le guide du refus de dossier |
| fage.org et les fédérations étudiantes locales | 63 | Les deux outils gratuits pour leurs pages « logement étudiant » |
| BDE et associations étudiantes d'Annecy, Chambéry, Grenoble, Lyon | | Même proposition, à la rentrée et en juin, quand la recherche de logement bat son plein |

Méthode : chercher sur Google `"logement étudiant" "liens utiles"`, `"dossier de location"
ressources` ou `"trouver un logement" association étudiante`, repérer les pages qui listent des
outils, et écrire à leur auteur un message court qui propose l'outil précis qui manque à sa
liste. Un message par site, personnalisé, jamais en masse.

---

## Vague 5 : presse étudiante et locale (1 heure par semaine)

| Site | DR | Principe |
|---|---|---|
| letudiant.fr | 80 | Proposer un conseil d'expert sur le dossier de location ou Visale, pour leurs articles de rentrée |
| studyrama.com | 77 | Idem |
| ledauphine.com (édition Haute-Savoie) | 82 | Angle local : un entrepreneur de Sévrier lance une app de recherche de logement |
| lemessager.fr | 70 | Même angle, hebdomadaire haut-savoyard |
| francebleu.fr (ici Pays de Savoie) | 88 | Même angle, en radio ; l'article web porte souvent un lien |
| featured.com | 74 | Des journalistes et blogueurs posent des questions, on répond en expert, la réponse publiée porte un lien |

Ces demandes passent par une personne nommée : Hugo, fondateur de Terouva. Les sujets où le site
a une vraie expertise sourcée : les pièces qu'un propriétaire peut demander, le refus de dossier,
Visale, le dépôt de garantie, le préavis.

---

## À ne pas faire

- Acheter des liens, des fermes de blogs ou des « packs de 500 backlinks ».
- Les réseaux d'échange automatiques (y compris celui de BlogSEO).
- Mettre le même texte d'ancre optimisé partout : laisser les sites utiliser le nom « Terouva ».
- Présenter Terouva comme un outil de Leboncoin, ou promettre qu'il envoie les messages à votre
  place. Il prépare, l'humain envoie.

## Suivi

Mesurer le DR de terouva.com une fois par mois (gratuit). Noter ici chaque fiche publiée :

| Date | Site | URL de la fiche ou de l'article | Lien suivi (dofollow) ? | Statut |
|---|---|---|---|---|
| | betalist.com | | | |
| | alternativeto.net | | | |
| | saashub.com | | | |
| | uneed.best | | | |
| | fazier.com | | | |
| | peerlist.io | | | |
| | microlaunch.net | | | |
| | indiehackers.com | | | |
| | crunchbase.com | | | |
| | maddyness.com | | | |
| | frenchweb.fr | | | |
| | anil.org / ADIL 74 | | | |
| | clcv.org | | | |
| | fage.org | | | |
| | letudiant.fr | | | |
| | studyrama.com | | | |
| | ledauphine.com | | | |
| | lemessager.fr | | | |
| | francebleu.fr | | | |
| | featured.com | | | |
| | Reddit (fils de discussion) | | | |
