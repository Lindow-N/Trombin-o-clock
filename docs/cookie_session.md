# Cookies et sessions

L'HTTP est dit **stateless** : sans état  
Il ne garde donc rien en mémoire.

## Cookies 🍪

Un cookie est un petit ~~gâteau~~ fichier stocké sur le navigateur permettant de stocker une donnée (pendant X temps) sous forme de chaine de caractère.

### Côté client

Créer un cookie sur le navigateur :

```js
document.cookie = "test=truc"; // le nom du cookie est "test" et sa valeur est "truc"
```

Accéder aux cookies sur le navigateur :

**F12** _(ouvrir l'outil de développement)_ -> **storage** _(ou application -> storage)_ -> **cookies**

### Côté serveur

Installer le module **cookie-parser** pour accéder aux cookies dans Express :

```bash
npm i cookie-parser
```

Importer le module dans index.js et l'initialiser :

```js
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

Accéder aux cookies dans Express via ce module :

```js
const cookies = req.cookies;
```

## Sessions

On utilise les sessions pour stocker des données temporaires côté serveur (plus fiable que les cookies qui peuvent être vus et manipulés par l'utilisateur).

💡 A savoir : La création d'une session renvoie un cookie à l'utilisateur avec un identifiant qui lui est propre afin de pouvoir l'identifier lors des prochaines requêtes.

💡 A savoir² : Si le serveur s'éteint ou redémarre, les sessions sont détruites.

Les sessions sont souvent utilisées pour créer des systèmes de login / logout (connexion / déconnexion).

Installer le module **express-session** :

```bash
npm i express-session
```

Importer le module _(dans index.js)_ et l'initialiser / le configurer :

```js
// On importe et on configure / initialise le module session
const session = require("express-session");
app.use(
  session({
    // mot de passe servant à crypter les infos
    secret: "mon super secret",
    // va sauvegarder une nouvelle session même si elle n'est pas modifiée
    saveUnitialized: true,
    // Resauvegarde une session à chaque requête même sans modifications (pas de date d'expiration)
    resave: true,
  })
);
```

Créer une session après avoir valider un formulaire (POST) :

```js
req.session.username = req.body.username;
```

Middleware _(à placer dans index.js)_ pour renvoyer le contenu des sessions dans les vues :

```js
app.use((req, res, next) => {
  // Si la session existe alors
  if (req.session.username) {
    // On transmet le username à la vue grâce à app.locals / res.locals
    res.locals.username = req.session.username;
  }
  next();
});
```

Détruire une session :

```js
req.session.destroy();
```
