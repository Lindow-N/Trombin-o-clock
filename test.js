// On importe ce qu'il faut du module pg (CLient)
const { Client } = require('pg');

// On lie notre .env à process.env de node pour qu'on puisse utiliser nos variables d'environnement dans notre fichier
require('dotenv').config();

// ON créé le client postgreSQL
const client = new Client();
// On se connecte au serveur postgreSQL
client.connect();

// On stock notre requête SQL dans notre constante query
// Requête : sélectionner toutes les promos
const query = `SELECT * FROM "promo"`;

// On exécute/lance la requête query
client.query(query, (err, data) => {
    // On affiche les enregistrements renvoyés par le serveur (les promos)
    if(err) {
        console.trace(err);
    }
    console.log(data.rows);
});





