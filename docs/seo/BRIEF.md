# Brief SEO & GEO — Terouva

> Lu par le chef `/pole-seo-geo` et par chaque sous-agent avant d'agir. Écrit le 2026-11-04 à partir
> du README, de `llms.txt`, de `docs/plan-backlinks.md`, de l'audit du 2026-10-30
> (`docs/seo/AUDIT-2026-10-30.md`) et des réponses d'Hugo. À tenir à jour : c'est la seule source
> du positionnement pour le pôle.

## Le produit, en une phrase

Terouva aide un particulier qui cherche une location à **répondre le premier** : il repère les
annonces qui correspondent à sa recherche, les note, et prépare le message de candidature et le
dossier. Tout tourne sur l'ordinateur de l'utilisateur ; l'humain relit et envoie lui-même.

**Phrase citable** (identique sur l'accueil, `llms.txt`, le schéma `Organization` et les fiches
externes ; `geo-citabilite` en est propriétaire) : à formuler à partir de ces faits vérifiables :
local, aucun compte, aucune donnée transmise, aucun envoi automatique, aucune requête vers les sites
d'annonces à la place de l'utilisateur.

## Surfaces

| Surface | État au 2026-11-04 | Rôle pour le pôle |
|---|---|---|
| `apps/web` (Next.js 15, Vercel) | En ligne : accueil, 9 guides, 2 outils gratuits, démo `/app`, liste d'attente, pages légales, rubrique `/blog` prête | **Le seul périmètre du pôle** |
| `apps/extension` (Chrome MV3, v0.2) | Pas publiée | **Hors périmètre** (décision d'Hugo du 2026-11-04 : on ne travaille pas sur l'extension). Le dossier de fiche store reste en archive dans `docs/seo/stores/` |
| `apps/desktop` (Tauri) | Gelé (maintenance) | Hors périmètre |

**Objectif du pôle (Hugo, 2026-11-04)** : maximiser la visibilité du site sur le web, dans Google et
dans les assistants IA. Le levier principal est **un blog en volume** : beaucoup d'articles, chacun
utile, sourcé et relu.

- **Domaine de production** : `https://terouva.com` (référence de Septune `compare_sites`). L'URL
  absolue vient de `getSiteUrl()` dans `apps/web/lib/site.ts`.
- **Serveur local** : `npm run dev` dans `apps/web`, port **3030**.
- Pages et guides déclarés dans `apps/web/lib/catalogue.ts` (titres SEO, descriptions, **sources** de
  chaque guide) ; métadonnées par `pageMetadata` dans `apps/web/lib/seo.tsx` ; gabarit des guides
  `components/guides/CadreGuide.tsx` ; outils dans `components/outils/`.

## Public

Locataires particuliers en France, souvent étudiants, jeunes actifs ou en mutation, en zone tendue,
qui perdent des logements parce que d'autres candidats répondent avant eux. Ils cherchent : quoi
mettre dans un dossier, comment écrire à un propriétaire, garant, Visale, dépôt de garantie, préavis,
refus de dossier.

## Conversion visée (dans cet ordre)

1. **Inscription à la liste d'attente** et usage des outils gratuits.
2. **Lecture régulière** du blog et des guides (retour direct, flux RSS, liste).

Un appel à l'action dit ce qu'il fait vraiment aujourd'hui : rien n'est téléchargeable, donc « Être
prévenu », jamais « Télécharger ».

## Blog en volume

Les **guides** sont permanents et se mettent à jour ; les **articles** sont datés et nombreux :
actualité des règles de location, questions précises de locataires, cas pratiques, études de données
publiques, saisonnalité de la recherche. Chaque article se rattache à un pilier
(`docs/seo/blog/LIGNE-EDITORIALE.md`) et renvoie vers le guide et l'outil voisins.

**Volume sans contenu de masse.** Google sanctionne le contenu produit à la chaîne pour se classer
(« scaled content abuse »), qu'il soit écrit par une IA ou non : ce qui le déclenche, c'est la page
qui n'apporte rien. Le volume tient donc à trois conditions, non négociables :
1. **une requête réelle par article** (registre), jamais deux articles sur la même intention ;
2. **un apport propre** : réponse directe, faits sourcés et datés, exemple concret, ce que les trois
   premiers résultats ne disent pas ;
3. **relu par un autre que l'auteur** avant publication, et publié par lots (5 à 10), avec une mesure
   de l'indexation entre deux lots.

Mécanique : un article = deux fichiers à son nom dans `apps/web/components/blog/articles/`
(`<slug>.tsx` pour le corps, `<slug>.meta.ts` pour la fiche), puis `npm run blog:index`. Plusieurs
rédacteurs écrivent donc en parallèle sans fichier commun. Le statut `brouillon` cache l'article ;
`publie` le met partout (page, plan du site, flux, `llms.txt`).

## Prix et offre : hors périmètre

Le prix, l'offre et la monétisation appartiennent au pôle CTO & Commerce. Le pôle SEO & GEO n'écrit
aucun prix, aucune offre et aucun palier dans les pages qu'il produit, et ne touche pas aux passages
existants qui en parlent : il parle de ce que le produit fait.

## Ton

Vouvoiement. Simple, concret, bienveillant, sans jargon. Phrases courtes. Pas d'emoji, pas de tiret
cadratin dans les textes publics, pas de promesse commerciale ni de chiffre marketing inventé.

## Lignes rouges (priment sur tout)

- On **observe** Leboncoin, on ne le **pilote** pas : pas de bot, pas d'envoi automatique, pas
  d'évasion anti-détection. Aucun texte ne doit laisser croire à un envoi automatique.
- **Aucun lien avec Leboncoin** : jamais « Leboncoin » dans le nom du produit ni dans une ancre de
  lien. Un article peut nommer le site quand il en parle (comment répondre à une annonce qui y est
  publiée), toujours comme un site tiers, sans affiliation suggérée.
- **Leboncoin d'abord** (décision du 2026-11-04) : pas de pages qui promettent d'autres sites
  d'annonces tant que le produit ne les sert pas.
- Rien d'inventé : SIREN, adresse, profils, avis, chiffres juridiques. Les profils `sameAs` n'existent
  que quand Hugo les a créés et donné leur URL.

## Sources de référence (faits juridiques)

Service-public.gouv.fr, Légifrance (loi n° 89-462 du 6 juillet 1989 et décrets), Visale.fr, ANIL.
Chaque guide porte déjà ses sources dans `catalogue.ts` ; tout chiffre nouveau passe aussi par
`docs/seo/FAITS.md` avec sa date de relevé.

## À ne pas viser

Achat immobilier, investissement locatif, crédit, gestion pour propriétaires : du trafic qui ne
convertira jamais. Rester sur ce que le produit sert : trouver et obtenir une location.

## Outillage disponible

- Septune (MCP `septune`, sans clé) : `audit_site`, `audit_page`, `geo_audit`, `compare_sites`.
- BlogSEO et BabyLoveGrowth (MCP) : Domain Rating, Search Console et GA4 si Google est connecté.
- Semrush : présent, exige l'OAuth en session (`/mcp`) ; sinon sources gratuites.
- `npm run seo:indexnow` à la racine : soumission IndexNow après un push qui change des URL.
- `scripts/check-donnees-structurees.mjs`, `scripts/check-liens.mjs`, `scripts/check-redlines.mjs`.

## Politique git

Commits et push autorisés par Hugo (2026-11-04). Le push déclenche un déploiement Vercel : la porte
`compare_sites` passe avant.
