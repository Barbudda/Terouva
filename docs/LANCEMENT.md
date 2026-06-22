# Lancement de Terouva — ce qu'il reste à faire (côté humain)

La migration vers l'**application web + extension Chrome** est terminée côté code.
Terouva fonctionne désormais sur **Mac, Windows et Linux**, dans le navigateur.
Ce document liste les dernières étapes — celles qui demandent une action de votre
part (un compte, un paiement, une validation), que le code ne peut pas faire seul.

---

## 1. Publier l'extension sur le Chrome Web Store (étape clé)

Aujourd'hui l'extension se charge « en mode développeur » (dossier `apps/extension/`).
Pour que **n'importe qui** puisse l'installer en un clic (y compris sur Mac), il faut
la publier sur le Chrome Web Store.

À faire :
1. Créer un **compte développeur Chrome Web Store** (frais uniques d'environ 5 $).
2. **Zipper** le dossier `apps/extension/` et le téléverser.
3. Remplir la fiche : nom (« Terouva — alertes Leboncoin »), description, captures
   d'écran, **politique de confidentialité** (lien vers la page Confidentialité du
   site), et la justification des permissions :
   - `leboncoin.fr` : pour **lire** les annonces des pages que vous ouvrez (jamais
     de requête automatique, jamais d'envoi à votre place).
   - `notifications` : pour vous prévenir d'une annonce intéressante.
   - `storage` : pour mémoriser si la surveillance est active.
4. Soumettre à la **revue** de Google (quelques jours en général).

> ⚠️ Une fois l'extension publiée, notez son **identifiant** (EXT_ID) et renseignez-le
> dans la variable d'environnement `NEXT_PUBLIC_TEROUVA_EXT_ID` du site (Vercel) pour
> que la page `/app` se connecte automatiquement à l'extension publiée.

---

## 2. Origine de l'application (déjà figée dans l'extension)

L'extension est autorisée à parler à l'application web sur l'origine
**`https://terouva.vercel.app`** (et `http://localhost:3000` en développement).

Si vous prenez un **domaine personnalisé** plus tard (ex. `terouva.fr`) :
- ajoutez-le dans `externally_connectable.matches` du `manifest.json` ;
- **republiez** l'extension (nouvelle revue).
C'est la seule chose qui impose une republication, d'où l'intérêt de figer le domaine
avant la première publication si possible.

---

## 3. Vérification finale (avant d'annoncer)

- [ ] Ouvrir `terouva.vercel.app` sur un **Mac** + Chrome : le site s'affiche, le
      bouton « Ouvrir Terouva » mène à l'application, l'onboarding fonctionne.
- [ ] Installer l'extension (publiée) sur ce Mac : la page « État extension »
      passe au vert.
- [ ] Ouvrir une recherche Leboncoin réelle : les annonces remontent dans le feed,
      sont scorées, et une annonce au-dessus du seuil déclenche une notification.
- [ ] Tester l'import par e-mail d'alerte (fonctionne **sans** extension).
- [ ] Vérifier que rien n'est envoyé à un serveur (onglet Réseau : seuls le site
      et l'API d'adresses du gouvernement apparaissent).

---

## 4. Ce qui reste optionnel / plus tard

- **Version Windows à installer** : conservée en option (lien « Version Windows »
  sur le site). L'app `apps/desktop` est gelée (maintenance), elle partage le même
  cœur (`@terouva/core`).
- **Firefox / Safari** : l'extension cible Chrome (et navigateurs Chromium : Edge,
  Brave). Un portage Safari/Firefox serait un chantier à part. En attendant, ces
  utilisateurs peuvent installer Chrome, ou utiliser l'import par e-mail d'alerte.
- **Synchronisation multi-appareils** : volontairement absente (tout est local).
  L'export / import d'un fichier permet de passer d'un ordinateur à un autre.
