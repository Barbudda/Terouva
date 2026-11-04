# blog-relecteur : /outils/quel-salaire-pour-un-loyer (2026-11-04)

Relu par `seo-registre` (distinct de l'auteur), vague 5. Fichiers (commit 4b720c2) :
`apps/web/app/outils/quel-salaire-pour-un-loyer/page.tsx`, `apps/web/components/outils/CalculLoyer.tsx`,
`apps/web/lib/loyer.ts` ; spec `docs/seo/outils/SPEC-quel-salaire-pour-un-loyer.md`. Sources ouvertes
le 2026-11-04 : SP F1169 (vérifiée le 2025-04-10), F33453 (vérifiée le 2026-01-23), F31267 (vérifiée le
2025-04-10), ANIL « caution et garanties ». Tests : `npx vitest run lib/loyer.test.ts`, 19 sur 19.

### blog-relecteur — /outils/quel-salaire-pour-un-loyer
Verdict : À CORRIGER

Bloquants : 1 → `lib/loyer.ts:162-166`. Le calcul Visale ignore les aides au logement saisies,
alors que F33453 les compte : « Allocation logement » figure dans la liste des « ressources prises
en compte », pour l'étudiant ou alternant au-dessus du seuil comme pour les autres locataires
(tableaux Île-de-France, régions et outre-mer). Conséquence : une personne dont les aides comblent
l'écart lit « il manque X € par mois pour la condition », ce qui est faux, et en sa défaveur.
Correction exacte (pour `seo-outils`) : dans `calculerLoyer`, calculer
`const ressourcesVisale = ressources !== null ? ressources + (aides ?? 0) : null;`, puis passer
`ressourcesVisale` à `regleVisale(...)` et à `loyerVisale` à la place de `ressources`. Ajouter un
test (étudiant en Île-de-France, loyer de 1 100 €, ressources de 1 800 €, aides de 250 € : condition
remplie), et une ligne dans la spec. Le taux d'effort et le repère « trois fois le loyer » restent
calculés sans les aides : c'est juste, le bailleur choisit.

Corrections :
1. FAQ « Quel salaire pour un loyer de 700 € ? » (`page.tsx`) : « 1 400 € par mois suffisent » se lit
   seul dans les résultats enrichis et dans les réponses des assistants, sans l'avertissement de
   l'interface. Correction exacte : « … 1 400 € par mois suffisent, si vous êtes éligible à Visale et
   que le loyer reste sous le plafond de votre zone. »

Vérifié et exact :
- « Trois fois le loyer » présenté comme une pratique, jamais comme une règle, partout : en-tête de
  `lib/loyer.ts`, FAQ, section « Ce qu'un propriétaire a le droit de regarder », phrases du
  calculateur. F1169 liste les justificatifs de ressources sans aucun seuil.
- La liste des justificatifs de ressources de la page (avis d'imposition, trois fiches de paie,
  bilans, pensions et allocations, bourse, simulation des aides) : F1169.
- Plafonds Visale (charges comprises) : 1 940 € en Île-de-France, 1 575 € ou 1 365 € en région,
  1 575 € en outre-mer ; seuils étudiants 1 000 / 840 / 680 € ; ressources « doit dépasser »
  2 000 / 1 680 / 1 360 €, avec l'inégalité stricte bien codée ; hors étudiants, loyer au plus la
  moitié des ressources (F33453 ; ANIL : taux d'effort au plus 50 %). Les montants outre-mer, notés
  « non revérifiés » dans `FAITS.md:41`, sont dans la section outre-mer de F33453 lue ce jour.
- « Un propriétaire assuré contre les loyers impayés ne peut pas exiger en plus un garant, sauf si
  vous êtes étudiant ou apprenti » : F31267.
- L'interface rappelle que Visale dépend aussi de l'âge et de la situation, et renvoie au
  simulateur Visale pour le plafond régional, que F33453 ne liste pas.
- Schéma `WebApplication` sans `offers` ni note inventée : conforme.

Cannibalisation : requête-mère « quel salaire pour un loyer de … euros » (registre, section 8, P1).
Aucune autre page ne la vise ; le guide `dossier-de-location` et les articles n'en font pas leur
sujet.

Remarques (non bloquantes) :
- Le texte de `FinDePage` dit « L'application sort bientôt » : honnête, mais vague. Le brief demande
  « Être prévenu » plutôt qu'une date ; ça tient.
- Voix : `zero-slop` en inspection sur les textes de la page, aucun signal ; aucun interdit du brief.
