# Pages d'intention « outil » : verdicts de relecture (relecteur distinct des auteurs, 2026-11-19)

Méthode : `docs/seo/blog/METHODE-SERIE.md` (« La relecture », « Pièges »), `docs/seo/blog/PLAN-PAGES-OUTIL.md`,
paragraphe « Visibilité » de `docs/seo/BRIEF.md`. Les cinq pages lues en entier.

- `npm run blog:sources` (par page, `BLOG_SLUG`) : 19 citations non retrouvées par le script (403 ou page rendue en JavaScript),
  toutes lues au navigateur le 2026-11-19 et **exactes** : PAP (Pass Prioritaire, fenêtre d'alerte sur deux pages, CGU),
  SeLoger (centre d'aide), Bien'ici (aide, deux), Rentola (FAQ prix, trois), leboncoin.fr (CGU), Légifrance (loi
  Hoguet art. 1, 3, 6 ; loi de 1989 art. 5). **Aucune citation retirée.**
- Phrases sans fait relu puis sourcées : « NOT » de Leboncoin (article d'aide 4410105936914, fait ajouté aux pages
  alerte et automatiser), « Favoris > Mes recherches » et cloche bleue (fait ajouté à la page alerte). Vérifiées sans
  ajout : formule Premium de Moteur Immo (15 recherches, 5 alertes), « propriétaires particuliers » de LocService,
  « jeunes actifs » d'ImmoJeune, Rentola « rassemble tout le marché de la location en une seule recherche », CGV
  Jinka Pro (service de diffusion d'annonces), baromètre Vigie d'octobre 2026, « deux études » de leboncoin immo.
- Publicité comparative (Code de la consommation, L122-1 et L122-2 relus sur Légifrance) : mêmes besoins, prix et
  fonctions vérifiables, pas de podium, aucun « X ne fait pas » ; Terouva éditeur déclaré en tête des pages 1 et 3.
- Définition de Terouva identique mot pour mot sur les cinq pages ; aucun prix de Terouva, aucun envoi automatique,
  aucun site nommé présenté comme couvert, liste d'attente sans date ; aucun mode d'emploi de script.
- `npm run blog:verifier` vert, `npx tsc --noEmit -p .` sans erreur.

Captures (WebP de `public/blog/captures/`, légende « Exemple de démonstration, novembre 2026 ») : page 1 #terouva
(liste triée) ; page 3 #terouva (message) ; page 2 #terouva (message) ; page 4 #tri, #message, #suivi ; page 5 aucune.
**Au chef avant publication** : les trois images montrent en bas à gauche « Extension non connectée » (mot banni des
textes), et celle du suivi montre « Voir sur Leboncoin » et « elles ne viennent pas de Leboncoin », lisible comme un
site couvert. Recadrer ou reprendre ces captures, ou faire trancher Hugo.

- meilleures-applications-trouver-location · PUBLIABLE (corrigé : Rentola « envoie des notifications gratuites et propose un abonnement après un essai » au lieu de « passe à l'abonnement » ; chasseur « contre des honoraires » sans « que vous payez », que la page chasseur laisse ouvert ; robot « peut écrire » au lieu de « écrit »)
- jinka-application-location · PUBLIABLE (corrigé : en-tête « qui figure dans la comparaison » au lieu de « qui préparera vos réponses aux annonces », promesse ; « environ 76 000 notes » pour « 76 k » ; « Rien ne vous empêche de cumuler les deux » sans « et c'est prudent », sous-entendu sur Jinka)
- alerte-location-appartement · PUBLIABLE (deux faits ajoutés : NOT et cloche bleue, retrouvés par le script)
- automatiser-recherche-location · PUBLIABLE (un fait ajouté : NOT, retrouvé par le script)
- chasseur-immobilier-location · PUBLIABLE (corrigé : la liste des exceptions de l'art. 6 de la loi Hoguet donnée entière, avec la clause d'honoraires dus « même si l'opération est conclue sans les soins de l'intermédiaire » ; chapeau « sauf exceptions qu'elle prévoit »)
