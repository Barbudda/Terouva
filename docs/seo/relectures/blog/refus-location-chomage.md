# blog-relecteur : refus-location-chomage (2026-11-04)

Relu : `apps/web/components/blog/articles/refus-location-chomage.tsx` et `.meta.ts` (brouillon).
Brief : `docs/seo/blog/briefs/refus-location-chomage.md`. Faits en attente :
`docs/seo/faits-a-integrer/geo-citabilite.md`.

Verdict : REFUSÉ (un fait faux sur la décision du Défenseur des droits ; trois corrections courtes ci-dessous)

Bloquant : 1
- **La décision 2019-001 est présentée comme plus large qu'elle n'est.** Texte intégral lu (PDF du
  Défenseur des droits, extrait le 2026-11-04). Au § 28 : « Si le fait de privilégier des revenus
  d'activité, plutôt que ceux perçus au titre d'une pension d'invalidité, n'est pas en tant que tel un
  critère de discrimination prohibé, l'exclusion des personnes handicapées qui en résulte permet de
  présumer l'existence d'une discrimination. » Au § 36, la discrimination retenue est « fondée sur son
  handicap ». Or le chapeau affirme que le Défenseur « a déjà jugé discriminatoire un refus fondé sur la
  nature des revenus plutôt que sur leur montant ». Le corps (`:64-67`) en tire « leur origine ne
  devrait pas suffire à vous écarter », et `:108-109` donne comme indice de motif interdit un message
  qui écarte « les allocations ». Un candidat au chômage comprendra le contraire de ce que dit la source.
  Corrections proposées :
  1. Chapeau (`.meta.ts`), dernière phrase : « Mais la vulnérabilité économique est un critère
     interdit, et le Défenseur des droits a jugé discriminatoire, au titre du handicap, le refus d'un
     candidat dont une partie des revenus était une pension d'invalidité. »
  2. `:64-67` : « Cette décision portait sur le handicap, pas sur le chômage, et elle précise que
     privilégier des revenus d'activité « n'est pas en tant que tel un critère de discrimination
     prohibé ». Nous n'avons pas lu de décision sur les allocations chômage. Ce qui se discute avec le
     propriétaire, c'est le montant de vos ressources, pièces à l'appui. Si un refus vous est expliqué
     par écrit, gardez le message. »
  3. `:108-109` : retirer « comme un message qui écarte « les chômeurs » ou « les allocations » quel que
     soit leur montant », et garder « Ce qui compte, ce sont les éléments écrits et datés qui laissent
     supposer un motif interdit. »

Correction (non bloquante) : `:90-91`, Visale « réservée aux salariés du secteur privé sous
conditions, sauf promesse d'embauche » se lit mal. Écrire « ou aux personnes qui ont une promesse
d'embauche avec prise de fonction dans les trois mois », comme la FAQ de l'article.

Vérifié et exact : art. 225-1 du Code pénal cité mot pour mot, avec « leur » (en vigueur depuis le
2022-09-01) ; art. 225-2, trois ans et 45 000 € ; F14750 (vérifié le 2025-08-12) : « doit se fonder sur
des critères objectifs (par exemple, la situation financière du candidat) », plainte dans les six ans ;
F1169 (vérifié le 2025-04-10) : intitulé du justificatif d'allocations mot pour mot ; amende de
3 000 € ; propriétaire assuré et étudiant ou apprenti (art. 22-1).

Trois conditions du brief : requête réelle (« refus de louer à un chômeur », autocomplétion du
2026-11-04, variante du guide refus) ; apport propre (un seul cas traité jusqu'au bout, pièces qui
prouvent des allocations) ; rien d'inventé, sauf la portée de la décision ci-dessus. Pas de
cannibalisation : le guide refus garde la liste des critères.
Voix : vouvoiement, aucun tiret cadratin ni emoji, appel à l'action honnête.

Faits : non reportés dans `FAITS.md` tant que l'article n'est pas publiable.

## Contre-relecture du 2026-11-04 (commit be23d1e)

Verdict : PUBLIABLE

Les trois corrections sont faites, fidèles à la décision 2019-001 :
- Chapeau : « le Défenseur des droits a jugé discriminatoire, au titre du handicap, le refus d'un
  candidat qui touchait une pension d'invalidité » (§ 36).
- Section « nature » : la décision est citée pour ce qu'elle dit (discrimination fondée sur le
  handicap, parce que la pratique désavantageait les candidats handicapés, § 34), avec sa limite :
  privilégier des revenus d'activité n'est pas en soi un critère interdit (§ 28). Ce qui se discute
  est le montant des ressources. Le nouvel intitulé « Peut-il préférer un salaire à vos
  allocations ? » reçoit une réponse honnête : aucune source lue ne l'interdit pour le chômage.
- `:108-109` : l'exemple « les chômeurs » ou « les allocations » est retiré.
La correction Visale (« ou aux personnes qui ont une promesse d'embauche ») est faite aussi. Rien
d'autre n'a bougé.

Faits reportés dans `FAITS.md` : 4 (critère de vulnérabilité économique, choix du candidat, décision
2019-001 dans sa version corrigée, justificatif d'allocations), retirés de
`faits-a-integrer/geo-citabilite.md`.
