# Journal SEO & GEO — Terouva

> Tenu par `/pole-seo-geo` (chantiers) et `seo-analyste` (mesures). Les entrées s'ajoutent en bas,
> datées. Ne pas réécrire une entrée passée : la corriger dans une entrée nouvelle.

## 2026-10-30 — Audit de départ (fait depuis BONDS)

Détail complet : `docs/seo/AUDIT-2026-10-30.md` (Septune `audit_site` et `geo_audit` sur
terouva.com, 15 pages).

### Mesures 2026-10-30
| Métrique | Valeur | Outil |
|---|---|---|
| performance, indexing, structure, schema, framework | 100 | Septune audit_site |
| metadata | 99 | Septune audit_site |
| images | 98 | Septune audit_site |
| internal-linking | 92 (15 paires manquantes) | Septune audit_site |
| GEO | 96 | Septune geo_audit |
| Titres formulés en question | 4 sur tout le site | Septune geo_audit |
| Domain Rating | 0 (relevé le 2026-11-03) | BlogSEO check_domain_rating |

Faux positif connu : `content-keyword-alignment` sur `/confidentialite`.

## 2026-11-04 — Mise en place du pôle SEO & GEO

- Livré : chef `/pole-seo-geo` et neuf sous-agents installés depuis BONDS (`equip --pole=seo-geo`),
  `docs/seo/` créé (brief, registre, faits, journal), audit du 30/10 rangé ici.
- État relevé dans le code, sans nouvelle mesure en ligne : mentions légales faites (2026-11-02),
  liens guide ↔ outil partiellement posés (8 guides sur 9 lient un outil), intertitres des guides
  pas encore en questions, `sameAs` absent, page `/telecharger` absente, fiche Chrome Web Store non
  rédigée, emoji de `Annonces.tsx` déjà retiré, 11 fichiers parasites vides dans `apps/web` retirés.
- Reste ouvert de l'audit du 30/10 (« Fini quand ») :
  1. Aucun bouton ne promet un téléchargement inexistant ; page `/telecharger` qui attend son URL.
  2. Texte de la fiche Chrome Web Store prêt et soumis à Hugo.
  3. Les 9 guides en questions-réponses (réponse autonome de 40 à 60 mots), plus de 30 titres
     interrogatifs au `geo_audit`.
  4. internal-linking ≥ 98.
  5. GEO 100 : `sameAs` réel (URL à demander à Hugo), schéma sur toutes les pages.
  6. `compare_sites` sans régression.
- À valider par Hugo : URL des profils publics (GitHub, X, LinkedIn, Product Hunt) pour `sameAs`.
- Ajout le même jour de huit agents (blog et contenu) : `blog-redacteur-en-chef`,
  `blog-veille-juridique`, `blog-donnees`, `blog-relecteur`, `blog-diffusion`, `seo-fraicheur`,
  `seo-pages-villes`, `seo-visuels`. Le prix et l'offre sortent du périmètre du pôle.
- Suivant : `seo-analyste` pour une mesure fraîche, puis le chantier « guides en questions-réponses »
  (`geo-citabilite`, trois lots de trois guides) en parallèle de `seo-fiches-stores`.

### Mesures 2026-11-04

Production https://terouva.com, 17 pages crawlées sur 17 URL du sitemap (15 le 30/10). Mêmes outils
que le 30/10, plus Search Console, test LLM et trace de performance.

| Métrique | Avant (2026-10-30) | Maintenant | Outil |
|---|---|---|---|
| metadata | 99 | 99 | Septune audit_site |
| indexing, structure, schema, framework | 100 | 100 | Septune audit_site |
| images | 98 | **84** | Septune audit_site |
| performance | 100 | **92** | Septune audit_site |
| internal-linking | 92 (15 paires manquantes) | **100** (0 paire suggérée) | Septune audit_site |
| Profondeur max, orphelines, liens cassés, doublons | 1 / 0 / 0 / 0 | 1 / 0 / 0 / 0 | Septune audit_site |
| GEO | 96 | 96 | Septune geo_audit |
| Titres formulés en question | 4 | **16** | Septune geo_audit |
| Pages avec schéma de réponse | non relevé | 12 / 17 | Septune geo_audit |
| Auteur nommé / date exposée | 12/12, 7/12 | 17/17, 10/17 | Septune geo_audit |
| `sameAs` | absent | absent (seul point « warn » du GEO) | Septune geo_audit |
| Robots IA bloqués | 0 | 0 sur 21 | Septune geo_audit |
| Search Console, 2026-10-05 → 11-01 | non mesuré | 5 clics, 261 impressions, CTR 1,9 %, position 31,2 | BlogSEO query_search_console |
| Search Console, 2026-08-02 → 11-01 | non mesuré | identique : premières données le 2026-10-13 | BlogSEO query_search_console |
| Visibilité LLM (5 questions × 4 moteurs) | non mesuré | cité 1 fois sur 20 réponses (Gemini) | BabyLoveGrowth run_llm_visibility_test |
| Mots-clés organiques estimés, AI Overviews | non mesuré | 0 / 0 | BabyLoveGrowth (domainStats) |
| Images de partage | non relevé | 15 pages en 200 ; `/cgu` et `/mentions-legales` en **404** | curl sur og:image et twitter:image |
| Accueil mobile, 4G lente, CPU ×4 | non mesuré | CLS 0,00 ; FCP 1 252 ms (cache chaud) ; **LCP non émis par Chrome** (2 traces, chaude et froide) ; 718 nœuds DOM | chrome-devtools performance trace |
| Trafic venu des assistants IA | non mesuré | non mesuré : aucune propriété GA4 connectée | — |

Régressions :
- `images` 98 → 84 : 56 images en `alt=""` et 68 images `next/image` en `fill` sans width/height,
  sur l'accueil, `/outils`, `/guides` et les 9 guides. Vérifié dans le HTML servi : aucune image
  n'est sans attribut `alt` ; ce sont des vignettes décoratives ajoutées par les refontes depuis le
  30/10 (commits 285156f, 671bec1, 7721c55, d9108d5). Septune compte `alt=""` comme absent. À
  arbitrer : décor légitime, mais les photos des guides perdent la recherche d'images. Plus 5 JPEG
  de 98 à 185 Ko servis en 3840 px (`img-legacy-format`).
- `performance` 100 → 92 : `perf-render-blocking` sur les 17 pages (1 script, 2 feuilles de style
  dans `<head>`), confirmé par la trace (RenderBlocking, LegacyJavaScript 11,8 à 14,6 Ko,
  ForcedReflow). Chrome n'émet pas de LCP sur l'accueil : à expliquer avant tout chiffre LCP
  (contenu du hero qui apparaît par animation, piste à vérifier).
- og:image 404 sur `/cgu` et `/mentions-legales` : `apps/web/lib/seo.tsx:33` construit
  `<chemin>/opengraph-image` pour chaque page, et ces deux routes n'ont pas de fichier
  `opengraph-image` (`/confidentialite` retombe bien sur l'image de l'accueil).

Gisements (les 5 plus gros) :
1. `/guides/repondre-a-une-annonce-de-location` : 92 impressions, position 6,7, **0 clic**. Seule
   page en première page avec du volume ; requête visible « bonjour je suis intéressé par votre
   annonce de location » (position 6,8). Titre et description à retravailler pour le clic.
2. Question « Quel outil de recherche d'appartement aide à rédiger un message de candidature ? » :
   Gemini cite Terouva en 2e position (source `/outils/message-de-candidature`), derrière RentLetter ;
   Claude cite RentLetter et pas nous ; ChatGPT et Perplexity ne citent ni l'un ni l'autre.
3. Grappe « garant » : `/guides/garant-caution` 44 impressions, position 41,6 ; requêtes « actionner
   le garant », « un garant est il obligatoire » (28,5), « qui peut se porter garant » (32), « garant
   locataire famille » (37,7). `/guides/louer-sans-garant` : 22 impressions, position 82,7.
4. `/guides/refus-de-dossier` : 25 impressions, position 43,6, 1 clic ; « refus de dossier location »
   à 78,6 avec 11 impressions, la requête la plus vue du site.
5. Questions où un concurrent est cité et pas nous : alternatives à 123Loger pour le dossier
   (123loger.com cité 15 fois sur le test, DossierFacile, LocService) et alertes de nouvelles
   annonces (Jinka, MoteurImmo, Kazaki). Aucune requête n'est en positions 5 à 20 avec plus de
   5 impressions : le gisement « page 2 » n'existe pas encore.

Limites de la mesure :
- `run_llm_visibility_test` choisit lui-même ses 5 questions (pas de paramètre de questions) :
  « plateformes de recherche de logement en 2026 », « plateforme pour étudiants », « alternatives à
  MoteurImmo », « mieux que 123Loger », « outil qui aide à rédiger un message de candidature ». Les
  questions du brief n'ont pas pu être posées telles quelles.
- BabyLoveGrowth est mal branché pour la Search Console : sa propriété est `sc-domain:rush-pilot.com`.
  La Search Console de Terouva est lue par BlogSEO (`sc-domain:terouva.com`).
- Les lignes par requête ne couvrent qu'une partie des 261 impressions (requêtes anonymisées par
  Google).

Faux positifs connus :
- `content-keyword-alignment` sur `/confidentialite` (déjà connu), et désormais sur `/` (« suis,
  pour, vous ») et `/guides/depot-de-garantie` (« mois, est, pas ») : des mots vides pris pour le
  sujet de la page.
- `img-dimensions-missing` sur les `next/image` en `fill` : le conteneur porte les dimensions, CLS
  mesuré à 0,00.

### Mesures vague 3 (prévisualisation)

**Prévisualisation de `second/auto` :**
https://terouva-git-second-auto-hugopoene74-1336s-projects.vercel.app (alias de branche Vercel,
build du commit 47bd484, statut GitHub « Deployment has completed »). Publique, sans
authentification : 200 sur `/` et `/guides`. Elle sert bien la vague 3 (nouveau titre de « répondre
à une annonce »). Vercel y ajoute `X-Robots-Tag: noindex`. Canoniques et sitemap pointent vers
terouva.com, comme prévu.

| Métrique | Production (2026-11-04) | Prévisualisation | Outil |
|---|---|---|---|
| Intertitres h2/h3 finissant par « ? », `repondre-a-une-annonce-de-location` | 0 sur 15 | **4 sur 15** | curl, comptage du HTML servi |
| Idem `garant-caution` | 0 sur 13 | **6 sur 13** | idem |
| Idem `refus-de-dossier` | 0 sur 13 | **7 sur 13** | idem |
| Schéma JSON-LD des 3 guides | Article + FAQPage (4, 9, 4 Q/R) + Breadcrumb | identique | idem |
| Nombre de mots (répondre / garant / refus) | 1 629 / 2 325 / 1 719 | 1 741 / 2 636 / 1 943 | Septune audit_page |
| Titre de « répondre » | Répondre à une annonce de location · Terouva | Répondre à une annonce de location : modèle · Terouva | Septune audit_page |
| Description de « répondre » | Comment écrire un message de candidature… | « Bonjour, je suis intéressé par votre annonce » ne suffit pas… | Septune audit_page |
| metadata, structure, schema, internal-linking (3 guides) | 100 | 100 | Septune audit_page |
| performance (3 guides) | 92 (`perf-render-blocking` : 1 script, 2 CSS) | **100** (1 seule CSS dans `<head>`) | Septune audit_page + curl |
| images (3 guides) | 84 | 84 (inchangé, `alt=""` décoratifs) | Septune audit_page |
| indexing (3 guides) | 100 | 66 | Septune audit_page |
| GEO du site | 96 | non mesurable (65, 0 page lue) | Septune geo_audit |

Régressions : aucune imputable au code.
- `indexing` 66 et `indexing-sitemap-hygiene` viennent de l'environnement : `X-Robots-Tag: noindex`
  posé par Vercel sur toute prévisualisation, et sitemap sur terouva.com. Septune ne les classe pas
  à part en `audit_page`. Ils disparaissent en production.
- `geo_audit` sur la prévisualisation est inutilisable : il lit 0 page (« 0/0 page(s) ») et rend
  65, probablement parce que les pages en `noindex` sont écartées. Le score GEO de la vague 3 se
  mesurera après mise en production.

Gains :
- 17 intertitres en question sur les 3 guides, contre 0 en production (comptage des « ? » ; le
  chiffre de 16 du `geo_audit` en production suit une autre règle, par mots interrogatifs, et ne se
  compare pas à ce comptage).
- performance 92 → 100 sur les 3 guides : une feuille de style bloquante de moins dans `<head>`.
  Cause non vérifiée : la vague 3 ne touche pas `layout.tsx`, c'est donc sans doute un autre commit
  de la branche.

À mesurer après mise en production : `geo_audit` (titres en question, attendu > 16), `audit_site`
(performance, images), Search Console sur « répondre » (CTR, à J+14 au plus tôt), test LLM.

## 2026-11-04 (soir) — Mise en production des vagues 1 à 4

- Livré : `main` avancé de `10a593b` à `b83cbd3` (71 commits, avance rapide, sans conflit), déployé
  sur terouva.com ; 17 adresses soumises à IndexNow (HTTP 200). Portes passées sur la
  prévisualisation Vercel pour les vagues 3 et 4 (`docs/seo/portes/`), relectures dans
  `docs/seo/relectures/`.
- Contrôle en ligne : `/blog` en `noindex`, absent du sitemap (17 URL) ; images de partage de `/cgu`
  et `/mentions-legales` en 200 ; adresse d'article inconnue en 404.

### Mesures production 2026-11-04 (soir)
| Métrique | 30/10 | 4/11 matin | 4/11 soir | Outil |
|---|---|---|---|---|
| Titres formulés en question | 4 | 16 | **43** | Septune geo_audit |
| GEO | 96 | 96 | 96 (seul avertissement : `sameAs`) | Septune geo_audit |
| Pages avec schéma de réponse | non relevé | 12/17 | 12/17 | Septune geo_audit |
| Pages avec faits chiffrés | 6/12 | non relevé | 9/17 | Septune geo_audit |
| performance | 100 | 92 | **100** | Septune audit_site |
| images | 98 | 84 | 84 | Septune audit_site |
| internal-linking | 92 | 100 | 100 | Septune audit_site |
| metadata, indexing, structure, schema, framework | 99-100 | 99-100 | 99-100 | Septune audit_site |

- Reste ouvert : `images` 84 (56 vignettes décoratives en `alt=""` comptées comme absentes, 5 JPEG
  servis en 3 840 px) ; `sameAs` (profils à créer par Hugo, bios prêtes dans
  `docs/seo/autorite/PROFILS.md`) ; extension à corriger par le pôle CTO avant la fiche store.
- Suivant : effet en Search Console et test de visibilité LLM dans 2 à 3 semaines (`seo-analyste`) ;
  publication de l'article sur l'encadrement des loyers après revérification de l'état du texte à
  l'Assemblée ; lot 3 des guides en questions-réponses (dépôt, état des lieux, préavis).

## 2026-11-04 (nuit) — Le blog s'ouvre : lot 1 en production

- Livré : `main` avancé de `b83cbd3` à `f1c048f`. Sept articles publiés (nouveau modèle de bail,
  révision du loyer avec l'IRL, frais d'agence, arnaques à la location, lettre de motivation,
  filigrane sur le dossier, Visale refusée), le troisième outil `/outils/quel-salaire-pour-un-loyer`,
  le blog relié au site (nav, pied de page, « Articles liés » dans les guides, flux RSS).
- Contrôle en ligne : `/blog` en `index, follow`, sept articles et l'outil en 200, brouillons en 404,
  plan du site de 17 à 26 adresses ; 26 adresses soumises à IndexNow (HTTP 200).
- Relu avant publication par trois relecteurs qui n'en étaient pas les auteurs
  (`docs/seo/relectures/blog/`) ; porte du lot sur la prévisualisation (`docs/seo/portes/2026-11-04-lot1.md`).
- En attente : six brouillons corrigés en contre-relecture (lot 2 avec « après la visite » et le
  DPE) ; quatre retenus pour cannibalisation ; l'article sur l'encadrement des loyers après le vote
  de l'Assemblée du 18 novembre.
- Suivant : vérifier l'indexation du lot 1 une semaine après (`seo-analyste`), avant le lot 2.

## 2026-11-04 (nuit, suite) — Lot 2 en production, sur décision d'Hugo

- Livré : huit articles de plus (refus au chômage, étude des zones tendues, DossierFacile,
  propriétaire qui ne répond pas, trouver un appartement rapidement, questions à poser en visite,
  après la visite, DPE recalculé), soit **15 articles publiés**. Hugo a choisi de ne pas attendre la
  mesure d'indexation du lot 1 que prévoyait le brief.
- Trois liens vers des brouillons retenus redirigés vers des pages publiées ; contrôle : aucun lien
  vers un brouillon sur les 15 articles. En ligne : les 8 en 200, brouillon retenu en 404, plan du
  site à 36 adresses, soumises à IndexNow.
- Reste en brouillon : 4 articles retenus pour cannibalisation, l'article sur l'encadrement des
  loyers (vote de l'Assemblée le 18 novembre). Vague 6 planifiée (25 articles).
- Suivant : mesurer l'indexation des 15 articles (Search Console) d'ici une à deux semaines.
