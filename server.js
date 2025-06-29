const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Nouveau: pour manipuler les chemins de fichiers
const app = express();
const port = 3000;

// Tableau pour stocker les requêtes reçues
let receivedRequests = [];

// --- Middlewares ---
// Permet à toutes les origines de faire des requêtes (gestion de CORS)
app.use(cors());

// Middleware pour parser les corps de requêtes JSON (pour les requêtes POST)
app.use(bodyParser.json());
// Middleware pour parser les corps de requêtes URL-encoded (par exemple, depuis des formulaires HTML)
app.use(bodyParser.urlencoded({ extended: true }));

// **Nouveau : Serve des fichiers statiques depuis le dossier 'public'**
// Cela rendra 'index.html', 'post.html' et 'style.css' accessibles directement
// Par exemple, 'index.html' sera accessible via '/' et 'post.html' via '/post.html'
app.use(express.static(path.join(__dirname, "public")));

// Middleware pour capturer toutes les requêtes (GET, POST, etc.)
app.use((req, res, next) => {
  // Exclure les requêtes pour les fichiers statiques et l'API des requêtes
  // pour ne pas les inclure dans la liste des requêtes affichées
  if (
    req.originalUrl.startsWith("/api/") ||
    req.originalUrl.startsWith("/style.css")
  ) {
    return next();
  }

  const requestInfo = {
    timestamp: new Date().toISOString(), // Ajout d'un horodatage
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body, // Le corps de la requête parsé par bodyParser
    ip: req.ip, // Adresse IP de l'expéditeur
  };
  receivedRequests.unshift(requestInfo); // Ajoute la requête au début du tableau (plus récent en haut)
  // Limite le nombre de requêtes stockées pour éviter la surcharge mémoire
  if (receivedRequests.length > 100) {
    // Augmentons un peu la limite
    receivedRequests.pop(); // Supprime la plus ancienne (qui est maintenant à la fin)
  }
  next(); // Passe la main au prochain middleware ou à la route
});

// --- Routes API ---

// Endpoint API pour récupérer les requêtes (utilisé par le front-end)
// Cette route est maintenant `/api/requests` pour mieux séparer API et fichiers statiques
app.get("/api/requests", (req, res) => {
  res.json(receivedRequests);
});

// Route d'exemple pour tester les requêtes POST vers ce serveur
app.post("/api/post-test", (req, res) => {
  console.log("Requête POST reçue sur /api/post-test:", req.body);
  res.json({
    message: "Requête POST reçue avec succès!",
    dataReceived: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
  console.log(
    `Accédez à http://localhost:${port} pour voir les requêtes reçues.`
  );
  console.log(
    `Accédez à http://localhost:${port}/post.html pour envoyer des requêtes.`
  );
});
