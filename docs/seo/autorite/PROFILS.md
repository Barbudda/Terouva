# Profils d'entité de Terouva (pour le `sameAs`)

> Tenu par `seo-autorite`. Écrit le 2026-11-04. Rien n'est créé par les agents : Hugo ouvre chaque
> profil lui-même, puis envoie l'URL. Une URL n'entre dans le `sameAs` du bloc `Organization`
> (`apps/web/app/layout.tsx`) qu'une fois le profil en ligne et l'URL fournie par Hugo.

## Pourquoi c'est urgent

Le 2026-11-04, une recherche web sur « terouva » ne renvoie **aucune page sur le produit** : le
moteur corrige vers « Téréva », un grossiste en plomberie et chauffage. Tant que des profils
cohérents n'existent pas, ni Google ni les assistants ne savent que Terouva est une entité, ni de
quoi elle parle. Les profils ci-dessous sont la façon la moins chère de régler ça : même nom, même
logo, même phrase, même lien partout.

Le `sameAs` actuel est vide (vérifié dans `layout.tsx` le 2026-11-04).

## Les textes à coller

Remplacés le 2026-11-19 par la définition d'Hugo (`docs/seo/BRIEF.md`, `docs/commerce/MESSAGE.md`),
reprise mot pour mot. Les anciennes bios (« repère, note », « outil local », « tout reste sur votre
ordinateur ») ne servent plus. Aucun prix, aucune offre, aucun palier, aucune promesse d'envoi
automatique. Détail des formats courts dans `PLAN.md`.

**Nom** : Terouva
**Site** : https://terouva.com
**Logo** : https://terouva.com/icon.svg (carré) ; bannière : https://terouva.com/opengraph-image
**Lieu** : Sévrier, Haute-Savoie, France
**Éditeur** : Blue Lake Dev, entreprise individuelle de Hugo Moëne (comme dans les mentions légales)

**Bio courte** (sous 160 caractères, pour X, Peerlist, champs « tagline ») : la première phrase de
la définition, 88 caractères.

> Terouva est un outil d'automatisation de la recherche de location immobilière en France.

**Bio moyenne** (LinkedIn « à propos », Crunchbase « short description », Indie Hackers) : la
définition courte, ses deux premières phrases.

> Terouva est un outil d'automatisation de la recherche de location immobilière en France. Il aide
> les locataires à repérer rapidement les annonces correspondant à leurs critères, à évaluer leur
> pertinence, à préparer un message de candidature personnalisé et à suivre leurs candidatures.

**Bio longue** (pages entreprise, annuaires qui acceptent plusieurs paragraphes) : la définition
longue, puis, si le champ le permet, une phrase sur l'état du moment (aujourd'hui : « Terouva ouvre
par vagues ; l'inscription sur terouva.com réserve une place. »).

> Terouva est un outil d'automatisation de la recherche de location immobilière en France. Il aide
> les locataires à repérer rapidement les annonces correspondant à leurs critères, à évaluer leur
> pertinence, à préparer un message de candidature personnalisé et à suivre leurs candidatures.
> Terouva est conçu pour réduire le temps passé à rechercher un logement et permettre aux candidats
> de réagir plus rapidement aux nouvelles annonces. L'utilisateur garde le contrôle de l'envoi de ses
> messages.

**Version anglaise** (annuaires internationaux ; traduction à valider par le chef) :

> Terouva is a tool that automates the search for a rental home in France. It helps tenants quickly
> spot listings that match their criteria, assess how relevant they are, prepare a personalised
> application message and keep track of their applications. Terouva is built to cut the time spent
> looking for a home and to let applicants react faster to new listings. Users stay in control of
> sending their messages.

**Bio d'Hugo** (profil personnel, pour les plateformes qui lient une personne à un produit) :

> Fondateur de Terouva, un outil d'automatisation de la recherche de location immobilière en France.
> Blue Lake Dev, Sévrier (Haute-Savoie).

Règles communes : jamais « Leboncoin » dans le nom, la bio ou un texte d'ancre ; le vouvoiement ;
pas d'emoji ; pas de tiret cadratin ; « Être prévenu », jamais « Télécharger », tant que l'extension
n'est pas publiée.

## Les profils, par ordre de priorité

| Ordre | Profil | Pourquoi il compte | Texte | Statut |
|---|---|---|---|---|
| 1 | LinkedIn, profil personnel d'Hugo | Prérequis de la page entreprise ; c'est aussi lui qui porte les publications de `blog-diffusion` | Bio d'Hugo | à vérifier : existe-t-il ? |
| 2 | LinkedIn, page entreprise « Terouva » | Profil d'entité le plus lu par les moteurs pour une jeune entreprise française | Bio moyenne + bio longue, logo, bannière | idée |
| 3 | Crunchbase, organisation | Prévu dans la vague 1 du plan ; repris par plusieurs bases d'entreprises | Bio moyenne, fondateur, lieu, année | idée |
| 4 | GitHub (organisation ou dépôt public) | Preuve technique du « tout en local » ; seulement si Hugo rend un dépôt public. Le dépôt actuel `Barbudda/Terouva` contient tout le site : ne pas le rendre public sans relecture | Bio courte, lien vers le site | à décider par Hugo |
| 5 | Peerlist (profil d'Hugo, puis projet) | Prévu dans la vague 1 ; la page projet est publique et datée | Bio courte + bio d'Hugo | idée |
| 6 | Indie Hackers (fiche produit) | Prévu dans la vague 1 ; permet ensuite un post sur le choix du local | Bio moyenne | idée |
| 7 | BetaList | Fait pour un produit pas encore lancé avec liste d'attente ; payant (remboursé si refusé), relevé le 2026-11-19 | `../brouillons/annuaire-betalist.md` | brouillon, achat à décider par Hugo |
| 8 | AlternativeTo | Refuse les bêtas fermées et les produits destinés à un seul pays (FAQ lue le 2026-11-19, voir `PLAN.md`) | aucun | écarté |
| 9 | X (compte de la marque) | Seulement si Hugo compte s'en servir ; un compte vide n'aide pas | Bio courte | à décider par Hugo |
| 10 | Product Hunt (profil maker d'Hugo, sans lancement) | Le lancement attend que le produit soit utilisable par tous (plan, vague 1) ; le profil peut exister avant | Bio d'Hugo | plus tard |
| 11 | Chrome Web Store (fiche de l'extension) | Profil d'entité fort une fois publiée ; texte préparé par `seo-fiches-stores` | voir `docs/seo/stores/` | après publication |

Écartés pour l'instant :
- **Wikidata, Wikipédia** : il faut des sources secondaires indépendantes qui n'existent pas encore.
  Un élément créé trop tôt est supprimé.
- **Annuaire des entreprises (data.gouv.fr)** : la fiche de Blue Lake Dev existe d'office par le
  SIREN. Elle décrit l'éditeur, pas la marque : à lier depuis un `publisher` si `geo-citabilite`
  ajoute un jour l'éditeur au schéma, pas depuis le `sameAs` de Terouva.

## Ce qu'Hugo envoie après chaque profil

L'URL publique exacte du profil. `geo-citabilite` l'ajoute au `sameAs` ; `seo-autorite` met à jour la
colonne Statut ci-dessus (« publié par Hugo » avec la date) et le tableau de suivi du plan de liens.
