fetch('https://restcountries.com/v2/all?fields=name,languages,region,flag,population,currencies')
    .then(function (res) {
        // on peut vérifier le statut de la réponse ici.
        return res.json(); // Génère une nouvelle promesse.
    }
    )
    .then(function (text) {
        console.log(text);
        chargerDonneesPays(text);
    }
    );

function chargerDonneesPays(data) {

    const corpsTableau = document.getElementById('corps');
    let contenuLignesHTML = ''; // Variable pour accumuler le HTML des lignes

    // Boucle sur le tableau des pays
    for (i = 0; i < data.length; i++) {

        // Création de la ligne de tableau (<tr>) avec ses cellules (<td>)
        contenuLignesHTML += `
                    <div>
                            Pays : ${data[i].name} || Région : ${data[i].region} || Population : ${data[i].population}
                    </div>
                `;
    };
    //Mise en place des lignes dans le tableau
    corpsTableau.innerHTML = contenuLignesHTML;
}