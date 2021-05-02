const dataMapper = require('../dataMapper');

// Etape 1 du challenge 4 : Afficher le formulaire
exports.showAddStudent = (req, res, next) => {

  dataMapper.allPromos((promos) => {
    // \! similaire À promos === undefined
    if(!promos) {
        next();
    } else {
        res.render('admin/studentEdit', {promos});
    }
  });
}

// Etape 2 du challenge 4 : Ajouter un étudiant
exports.addStudent = (req, res, next) => {
  console.log(req.body);

  // Contrôle sur les données envoyées du formulaire
  // ON vérifie que les champs ne sont pas vides
  if(!req.body.first_name ||
    !req.body.last_name ||
    !req.body.github_username ||
    !req.body.promo) {
      return next();
  }

  // On insère l'étudiant en base et on retourne la page de sa promo
  dataMapper.addStudent(req.body, (promo_id) => {
      if(!promo_id) {
        return next();
      } else {
        res.redirect(`/promo/${req.body.promo}/students`);
      //todo : montrer le render (pour faire la diff)
    }
  })
} 