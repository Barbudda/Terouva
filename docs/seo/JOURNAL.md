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
