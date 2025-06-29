# REQUESTS-LISTENER

Une application Node.js/Express pour écouter, afficher et tester des requêtes HTTP.

## Fonctionnalités
- Affiche en temps réel toutes les requêtes reçues par le serveur.
- Permet d'envoyer des requêtes HTTP personnalisées (POST, GET, PUT, DELETE) à n'importe quelle URL.
- Affichage détaillé de la réponse (statut, headers, corps).

## Installation

1. Clonez ce dépôt ou copiez les fichiers dans un dossier local.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur :
   ```bash
   node server.js
   ```
4. Accédez à l'application dans votre navigateur :
   - [http://localhost:3000/](http://localhost:3000/)

## Structure
- `server.js` : Serveur Express principal
- `public/` : Fichiers statiques (HTML, CSS, JS)
- `index.html` : Liste des requêtes reçues
- `post.html` : Formulaire pour envoyer des requêtes

## Auteur
- Projet réalisé pour tester et visualiser des requêtes HTTP.
