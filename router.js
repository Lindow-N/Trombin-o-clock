const express = require('express');
const router = express.Router();

// On importe les controllers
const mainController = require('./controller/mainController');
const promoController = require('./controller/promoController');
const studentController = require('./controller/studentController');
const adminController = require('./controller/adminController');

// On appelle la mÉthode promos du controlleur 
router.get("/promos", promoController.promos);

// On appelle la méthode students du controller
router.get("/promo/:id/students", promoController.studentsInPromo);

// On appelle la méthode promo du controller
router.get("/promo/:id", promoController.promo);

// On appelle la méthode showAddStudent du controller (affiche le formulaire d'ajout)
router.get("/student/add", adminController.showAddStudent);

// On appelle la méthode addStudent du controller pour ajouter un étudiant
router.post("/student/add", adminController.addStudent);

//On appelle la mÉthode student du controller
router.get("/student/:id", studentController.student);

// On appelle la méthode login du mainController
router.get("/login", mainController.showLogin);

// On appelle la méthode login du mainController
router.post("/login", mainController.login);

// ON appelle la mÉthode accueil du controlleur 
router.get("/", mainController.accueil);

router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;