let listePays = []; // Pour stocker les données récupérées une seule fois
let triActuel = 'none'; // 'none', 'asc' (ascendant), ou 'desc' (descendant)

const URL_API = 'https://restcountries.com/v2/all?fields=name,languages,region,flag,population,currencies';

fetch(URL_API)
    .then(function (res) {
        // Vérification de la réponse HTTP si OK (status 200-299)
        if (!res.ok) {
            throw new Error('Erreur HTTP ' + res.status);
        }
        return res.json();
    })
    .then(function (data) {
        // Stocke les données dans la variable globale pour le tri
        listePays = data;
        console.log("Données récupérées :", listePays.length, "pays.");

        // Affiche les données initiales
        chargerDonneesPays(listePays);
    })
    .catch(function (error) {
        console.error("Erreur lors de la récupération des données :", error);
        document.getElementById('corps').innerHTML = '<tr><td colspan="3" style="color: red;">Erreur de chargement des données.</td></tr>';
    });


// --- FONCTIONS DE TRI ET D'AFFICHAGE ---

/**
 * Gère la logique de tri et met à jour l'affichage.
 */
function trierParPopulation() {
    // 1. Déterminer le prochain état de tri
    if (triActuel === 'none' || triActuel === 'asc') {
        triActuel = 'desc'; // Passer de non trié/ascendant à descendant
    } else {
        triActuel = 'asc'; // Passer de descendant à ascendant
    }

    // 2. Trier le tableau de données
    listePays.sort((a, b) => {
        const popA = a.population || 0; // Utilise 0 si la population est null/undefined
        const popB = b.population || 0;

        if (triActuel === 'asc') {
            return popA - popB; // Tri ascendant
        } else {
            return popB - popA; // Tri descendant
        }
    });

    // 3. Mettre à jour l'icône
    const iconElement = document.getElementById('sortIcon');
    iconElement.className = ''; // Réinitialiser les classes

    if (triActuel === 'asc') {
        // Icône de tri ascendant (flèche vers le haut)
        iconElement.classList.add('fas', 'fa-sort-up');
    } else {
        // Icône de tri descendant (flèche vers le bas)
        iconElement.classList.add('fas', 'fa-sort-down');
    }

    // Réafficher les données triées
    chargerDonneesPays(listePays);
}

function chargerDonneesPays(data) {

    const corpsTableau = document.getElementById('corps');
    let contenuLignesHTML = '';

    // Boucle sur le tableau des pays
    // nouveau test avec forEach.
    data.forEach(pays => {

        // Je formate la population pour une meilleure lisibilité
        const populationFormatee = pays.population ? pays.population.toLocaleString('fr-FR') : 'N/A';

        // Construction de la ligne de tableau
        contenuLignesHTML += `
            <tr>
                <td>${pays.name}</td>
                <td>${pays.region || 'N/A'}</td>
                <td style="text-align: right;">${populationFormatee}</td>
            </tr>
        `;
    });
    corpsTableau.innerHTML = contenuLignesHTML;
}