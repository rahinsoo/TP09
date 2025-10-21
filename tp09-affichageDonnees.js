function chargerDonneesPays() {
    const URL_API = 'https://restcountries.com/v2/all?fields=name,languages,region,flag,population,currencies';

    const conteneur = document.getElementById('conteneur-donnees');

    const xhr = new XMLHttpRequest();

    // callback pour l'état de la requête
    xhr.onreadystatechange = function() {
        
        if (xhr.readyState === 4) {
            
            if (xhr.status === 200) {
                
                conteneur.textContent = xhr.responseText;
                console.log("Requête AJAX réussie !");

            } else {
                // Échec : Gérer les erreurs HTTP (404, 500, ...)
                conteneur.innerHTML = `Erreur. Statut HTTP: ${xhr.status}`;
                console.error(`Erreur ${xhr.status} lors de la requête.`);
            }
        }
    };

    xhr.open('GET', URL_API, true);

    xhr.send();

    console.log("Requête AJAX envoyée...");
}