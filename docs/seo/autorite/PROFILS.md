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

Alignés sur le résumé de `apps/web/app/llms.txt/route.ts` (la version en ligne au 2026-11-04). Si
`geo-citabilite` arrête une autre phrase citable, ces textes la suivent : ils ne doivent jamais dire
autre chose que l'accueil et `llms.txt`. Aucun prix, aucune offre, aucun palier.

**Nom** : Terouva
**Site** : https://terouva.com
**Logo** : https://terouva.com/icon.svg (carré) ; bannière : https://terouva.com/opengraph-image
**Lieu** : Sévrier, Haute-Savoie, France
**Éditeur** : Blue Lake Dev, entreprise individuelle de Hugo Moëne (comme dans les mentions légales)

**Bio courte** (sous 160 caractères, pour X, Peerlist, champs « tagline ») :

> Terouva repère les annonces de location qui vous correspondent, les note et prépare votre message
> de candidature. Tout reste sur votre ordinateur.

**Bio moyenne** (LinkedIn « à propos », Crunchbase « short description », Indie Hackers) :

> Outil local pour trouver une location en France. Terouva repère les annonces qui correspondent à
> votre recherche, les note et prépare votre message de candidature. Vous relisez et vous envoyez
> vous-même. Pas de compte, pas de serveur, aucune donnée transmise. En préparation : la liste
> d'attente est ouverte sur terouva.com.

**Bio longue** (pages entreprise, annuaires qui acceptent plusieurs paragraphes) : reprendre la
« Description longue » de `docs/plan-backlinks.md`, avec deux corrections :
- « Une dizaine de guides sourcés » devient « Neuf guides sourcés » (il y en a 9 au 2026-11-04) ;
- retirer « pas de publicité » si le pôle CTO & Commerce n'a pas tranché le modèle, pour ne rien
  promettre sur l'offre.

**Version anglaise** (annuaires internationaux) :

> Terouva finds the rental listings that match your search in France, scores them and drafts your
> application message. You review it and send it yourself. Everything stays on your computer: no
> account, no server, no data sent.

**Bio d'Hugo** (profil personnel, pour les plateformes qui lient une personne à un produit) :

> Fondateur de Terouva, un outil local qui aide les locataires à trouver un logement et à répondre
> aux annonces. Blue Lake Dev, Sévrier (Haute-Savoie).

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
| 7 | BetaList | Fait pour un produit pas encore lancé avec liste d'attente | Bio moyenne + version anglaise | idée |
| 8 | AlternativeTo | Fiche produit ; à déclarer en alternative seulement à des outils dont la fiche existe et qui font vraiment la même chose | Version anglaise | idée |
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
