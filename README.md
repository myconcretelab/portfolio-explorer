# Portfolio Explorer pour WordPress

Ce dépôt propose un plugin de portfolio pour WordPress :

- **Plugin `portfolio-explorer`** : fournit un bloc Gutenberg React affichant une arborescence des dossiers (Real Media Library) et une galerie d'images. Le bloc est compilé avec `@wordpress/scripts` et expose également une route REST `/wp-json/portfolio/v1/tree`.

## Installation

### Plugin
1. Copier le dossier `portfolio-explorer` dans `wp-content/plugins/`.
2. Exécuter `npm install` puis `npm run build` si vous modifiez le code source.
3. Activer le plugin depuis l'administration WordPress.

Le bloc "Portfolio Explorer" devient alors disponible dans l'éditeur Gutenberg.

## Développement

- **PHP** : vérifier la syntaxe via `php -l` sur les fichiers du plugin.
- **JS** : utiliser `npm run lint:js` et `npm run build`.

Ce projet constitue une base pour un portfolio moderne et fluide dans WordPress.
