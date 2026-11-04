# Pages de confiance — ce qu'elles doivent dire, et ce qu'il faut demander à Hugo

> Propriétaire : `blog-redacteur-en-chef`, 2026-11-04. Cahier des charges, pas le texte des pages :
> `seo-redacteur` les écrit, `blog-relecteur` les relit, `seo-gardien-technique` les branche.
> État au 2026-11-04 : **aucune des deux pages n'existe** ; le schéma des guides déclare
> `author: Organization "Terouva"` (`components/guides/CadreGuide.tsx:99`).

## 1. « Comment nous écrivons » (proposé : `/comment-nous-ecrivons`)

Une page courte, vraie phrase par phrase : chaque engagement doit correspondre à ce que le pôle fait
réellement aujourd'hui, sinon on ne l'écrit pas.

| Section | Ce qu'elle dit | Ce sur quoi elle s'appuie (vérifiable) |
|---|---|---|
| Nos sources | Les règles viennent de sources officielles : service-public.gouv.fr, Légifrance, visale.fr, ANIL, INSEE. La presse et les sites privés peuvent alerter, ils ne prouvent rien | `docs/seo/BRIEF.md` (sources de référence), `VEILLE.md` (en-tête) |
| La date de relevé | Chaque chiffre ou règle porte la date à laquelle la source a été lue ; les guides affichent leur date de mise à jour, les articles leur date de publication et leurs mises à jour | `docs/seo/FAITS.md`, champs `modifieLe` et `misesAJour` de `blog.ts` |
| Guides et articles | Un guide est mis à jour à la même adresse ; un article est daté et ne change que pour suivre l'actualité qu'il traite, avec la mise à jour affichée en tête | `LIGNE-EDITORIALE.md`, section 3 |
| La relecture | Celui qui écrit ne se relit pas : chaque texte est relu avant publication, faits contre sources | circuit du pôle (`pole-seo-geo/SKILL.md`). **Qui relit** est la question n° 4 ci-dessous : la page ne nomme pas de relecteur humain qui n'existe pas |
| La correction des erreurs | Comment signaler une erreur (adresse de contact), dans quel délai on corrige, et la mention datée de la correction sur la page | adresse de contact des mentions légales ; **délai à fixer par Hugo** (question n° 5) |
| Ce que nous ne faisons pas | Pas de conseil juridique personnalisé ; pas d'article payé ou sponsorisé ; pas de prix ni d'offre dans les guides | brief (prix hors périmètre) ; **absence de contenu sponsorisé à confirmer** (question n° 6) |
| Notre lien avec le produit | Terouva édite aussi un outil de recherche de location ; les guides et articles renvoient vers ses outils gratuits, et le disent | brief ; c'est la transparence attendue d'un éditeur qui a un produit |

Interdits sur cette page : « experts », « juristes », « équipe éditoriale » ou tout effectif non
réel ; aucune certification ; aucune promesse d'exactitude absolue (« nous corrigeons » oui,
« zéro erreur » non).

## 2. Page auteur (proposé : `/auteurs/<slug>` ou une section de `/a-propos`)

Seul fait publié aujourd'hui sur la personne, dans les mentions légales : le site est édité par Blue
Lake Dev, entreprise individuelle de Hugo Moëne, qui en est le directeur de la publication. Rien
d'autre n'est écrit tant qu'Hugo ne l'a pas donné.

Ce que la page contiendrait, **si Hugo l'accepte** : nom tel qu'il veut le voir signé, rôle (par
exemple « fondateur de Terouva, éditeur du site », formulation à lui), ce qui le relie au sujet (son
expérience de la recherche de location, s'il veut en parler), ce qu'il écrit et ce qu'il relit, une
photo s'il en fournit une, ses profils publics réels (qui serviront aussi à `sameAs`), la liste des
articles signés. Schéma : `Person`, référencé comme `author` des articles qu'il signe.

Sans réponse d'Hugo : on garde l'organisation comme auteur (c'est vrai et suffisant), et on fait la
page « Comment nous écrivons » seule.

## 3. Questions pour Hugo

1. **Signer** : les articles sont-ils signés de votre nom, ou de « Terouva » seulement ?
2. **Nom et rôle** affichés : « Hugo Moëne » ? quel intitulé (fondateur, éditeur, autre) ?
3. **Lien au sujet** : voulez-vous dire pourquoi vous avez fait Terouva (une recherche vécue, par
   exemple) ? Si oui, en quelques phrases de votre main ; nous n'écrivons rien à votre place.
4. **Relecture et IA** : les textes sont rédigés et relus avec des assistants IA, puis validés par
   vous. Que voulez-vous que la page dise de cette façon de travailler, et qui valide en dernier ?
   (Nous recommandons de le dire simplement plutôt que de le taire.)
5. **Corrections** : quelle adresse pour signaler une erreur, et quel délai de correction tenable ?
6. **Contenu sponsorisé** : confirmez-vous qu'aucun article ne sera payé par un tiers ?
7. **Photo et profils** : une photo ? des profils publics à lier (ils servent aussi à `sameAs`) ?
