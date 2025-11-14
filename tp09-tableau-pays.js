fetch('https://digicode.cleverapps.io/json/pays/pollution')
.then(function(res) {
// on peut vérifier le statut de la réponse ici.
return res.json(); // Génère une nouvelle promesse.
}
)
.then(function(text){
    console.log(text);
initialiserDonnees(text);
}
);

// création de la fonction
function initialiserDonnees(data) {
    const titreElement = document.getElementById('titre');
    const anneeElement = document.getElementById('annee');

    titreElement.textContent = `Pays les plus polluants pour le ${data.polluant} (${data.unite}) en ${data.annee}`;
    anneeElement.textContent = `Données pour l'année ${data.annee}`;

    const corpsTableau = document.getElementById('corps');
    let contenuLignesHTML = ''; // Variable pour accumuler le HTML des lignes

    // Boucle sur le tableau des pays
    data.pays.forEach(pays => {

        const urlDrapeau = `https://flagcdn.com/24x18/${pays.code}.png`;
        // Création de la ligne de tableau (<tr>) avec ses cellules (<td>)
        
        contenuLignesHTML += `
                    <tr>
                        <td class="nom-col">
                            <img src="${urlDrapeau}" alt="Drapeau de ${pays.nom}" width="24" height="18">
                            ${pays.nom}
                        </td>
                        <td class="valeur-col">${pays.valeur}</td>
                        <td class="pourcentage-col">${pays.pourcentage}</td>
                    </tr>
                `;
    });

    //Mise en place des lignes dans le tableau
    corpsTableau.innerHTML = contenuLignesHTML;
}