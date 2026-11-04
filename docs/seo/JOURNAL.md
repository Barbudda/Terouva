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
- À valider par Hugo : URL des profils publics (GitHub, X, LinkedIn, Product Hunt) pour `sameAs` ;
  paliers et prix du freemium (pôle CTO & Commerce) pour aligner `llms.txt`.
- Suivant : `seo-analyste` pour une mesure fraîche, puis le chantier « guides en questions-réponses »
  (`geo-citabilite`, trois lots de trois guides) en parallèle de `seo-fiches-stores`.
