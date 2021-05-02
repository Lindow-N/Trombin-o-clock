const express = require('express');
const app = express();

//ON importe notre router
const router = require('./router');

// On lie les variables de notre .env À process.env
require('dotenv').config();

/* Importer le module cookie-parser
const cookieParser = require('cookie-parser');
 Initialiser le cookie parser pour l'application
app.use(cookieParser());*/

// On importe et on configure / initialise le module session
const session = require('express-session');
app.use(session({
    // mot de passe servant à crypter les infos
    secret: 'mon super secret',
    // va sauvegarder une nouvelle session même si elle n'est pas modifiée
    saveUnitialized : true,
    // Resauvegarde une session à chaque requête même sans modifications (pas de date d'expiration)
    resave : true
}));

// Permet de transmettre les données des sessions aux vues
app.use((req, res, next) => {
    // Si la session existe alors
    if(req.session.username) {
        // On transmet le username à la vue grâce à app.locals
        res.locals.username = req.session.username;
    }
    next();
});

// ON configure notre moteur de rendu et notre rÉpertoire static
app.set('view engine', 'ejs');
// app.set('views', './app/views'); => modifier le path du dossier views
app.use(express.static('./public'));

// Rend le body de la requête facilement exploitable.
// Pensez à toujours mettre cette ligne quand vous utilisez des POST dans vos routes
// C'est ce qu'on appelle un body parser. A PLACER AVANT LE ROUTER
app.use(express.urlencoded({extended:true}));
// app.use(express.json()); => même chose qu'au dessus

// ON utilise le router
app.use(router);

app.listen(process.env.PORT || 3000);