# Portfolio React pour Real Media Library

Ce dépôt fournit un exemple minimaliste de portfolio d'artiste basé sur WordPress, React et le plugin **Real Media Library**. Il comprend :

- `php/portfolio-rest.php` : un fichier PHP ajoutant une route REST `/wp-json/portfolio/v1/tree` qui expose l'arborescence des dossiers et images gérées par Real Media Library.
- `src/PortfolioExplorer.jsx` : le composant React principal utilisant MUI pour naviguer dans les dossiers et afficher les images sans rechargement de page.
- `styles/portfolio.css` : feuille de style légère pour un rendu épuré.

## Mise en place

1. **Activer la route REST**  
   Copiez le fichier `php/portfolio-rest.php` dans un nouveau dossier sous `wp-content/plugins/` (par ex. `portfolio-rest/`) puis activez le plugin depuis l'administration WordPress.

2. **Préparer le code React**  
   Le composant React nécessite un bundler (par ex. `@wordpress/scripts`) et les dépendances MUI :
   ```bash
   npm install @wordpress/scripts react react-dom @mui/material @emotion/react @emotion/styled
   ```
   Placez `src/PortfolioExplorer.jsx` dans votre projet et compilez-le vers un fichier JavaScript chargé sur le site. Un exemple simple de bloc Gutenberg :
   ```javascript
   import { registerBlockType } from '@wordpress/blocks';
   import PortfolioExplorer from './PortfolioExplorer';
   import './portfolio.css';

   registerBlockType('portfolio/explorer', {
     edit: () => <PortfolioExplorer />, // rendu uniquement en mode édition
     save: () => null,                   // pas de contenu statique
   });
   ```

3. **Inclure le style**  
   Copiez `styles/portfolio.css` aux côtés du script compilé et chargez-la avec `wp_enqueue_style`.

4. **Utilisation**  
   Dans l'éditeur Gutenberg, insérez le bloc `Portfolio Explorer`. La navigation dans les dossiers est instantanée et les images se chargent sous forme de grille responsive.

## Route REST
Une fois le plugin activé, la route suivante renvoie l'arborescence complète :
```
GET /wp-json/portfolio/v1/tree
```
La réponse est un tableau de dossiers, chacun contenant ses sous-dossiers (`children`) et ses images (`images` avec `title`, `url` et `thumb`).

## Personnalisation
- Le composant React gère un nombre illimité de niveaux de dossiers.
- Ajoutez votre propre modal pour l'affichage plein écran des images si souhaité.
- Le CSS fourni est volontairement minimal ; adaptez-le selon votre charte graphique.

## Développement
- PHP : vérifiez la syntaxe avec `php -l php/portfolio-rest.php`.
- JS : utilisez vos outils habituels (`npm test`, `eslint`, etc.) pour valider le code.

---
Ce projet est un point de départ pour créer une page de portfolio moderne et fluide dans WordPress.
