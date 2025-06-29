document
  .getElementById("postForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const url = document.getElementById("url").value;
    const method = document.getElementById("method").value;
    const bodyText = document.getElementById("body").value;
    const responseDisplay = document.getElementById("responseDisplay");

    responseDisplay.innerHTML = "<p>Envoi en cours...</p>";

    try {
      let options = { method: method };

      if (bodyText) {
        try {
          // Tente de parser le corps comme JSON
          const parsedBody = JSON.parse(bodyText);
          options.headers = { "Content-Type": "application/json" }; // DÉFINIT L'EN-TÊTE ICI
          options.body = JSON.stringify(parsedBody);
        } catch (e) {
          // Si le corps n'est pas un JSON valide, envoie-le comme texte brut
          // Le Content-Type sera text/plain dans ce cas
          options.headers = { "Content-Type": "text/plain" };
          options.body = bodyText;
          console.warn(
            "Le corps n'est pas un JSON valide, envoi comme texte brut avec Content-Type: text/plain."
          );
        }
      }

      const response = await fetch(url, options);
      const responseText = await response.text(); // Récupère la réponse comme texte

      let formattedResponse = `
                    <h3>Statut : ${response.status} ${response.statusText}</h3>
                    <h3>Headers :</h3>
                    <pre>${JSON.stringify(
                      Object.fromEntries(response.headers.entries()),
                      null,
                      2
                    )}</pre>
                    <h3>Corps de la Réponse :</h3>
                    <pre>${responseText || "Aucun corps de réponse."}</pre>
                `;

      responseDisplay.innerHTML = formattedResponse;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      responseDisplay.innerHTML =
        '<p style="color: red;">Erreur lors de l\'envoi de la requête: ' +
        error.message +
        "</p>";
    }
  });
