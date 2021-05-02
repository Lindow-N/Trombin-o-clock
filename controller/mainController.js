exports.accueil = (req, res) => {
    res.render('accueil');
}

exports.showLogin = (req, res) => {
    res.render('login');
}

exports.login = (req, res, next) => {
    if(!req.body.username) {
        return next();
    }
    req.session.username = req.body.username;
    res.redirect('/');
}