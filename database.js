// On importe le module PG pour pouvoir communiquer avec une base de donnée postgres dans notre code
const { Client } = require('pg');
// On lie les variables d'environnement du fichier .env ) notre process.env (node)
require('dotenv').config();

/* Une autre façon de se connecter à la base de donnée sans avoir besoin du .env (à éviter)
const connectionString = 'postgresql://etudiant:js4life@pg.oclock.lan:3211/trombi'
const client = new Client({connectionString});*/

// On se connecter à notre base de donnée postgres
const client = new Client();
client.connect();

module.exports = client;