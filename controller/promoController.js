const client = require('../database');
const dataMapper = require('../dataMapper');

exports.promos = (req, res, next) => {
    // On exécute la requête pour obtenir toutes les promos
    //client.query(`SELECT * FROM promo`, (err, data) => {
        /* On vérifie qu'il n'y ait pas d'erreurs
        Syntaxe : quand il y a qu'une instraction on peut la mettre à côté du if / else sinon on est obligé de mettre les { }*/
        //if(err) console.trace(err)
        //else res.render("promos", {promos:data.rows});
    //}) 
    
    dataMapper.allPromos((promos) => {
        // \! similaire À promos === undefined
        if(!promos) {
            next();
        } else {
            res.render("promos", {promos});
        }
    });

    
}

exports.promo = (req, res, next) => {
    // ON récupère l'id de la promo
    const id = Number(req.params.id);

    // On exÉcute la requÊte pour rÉcupÉrer la bonne promo selon l'id passÉ en paramÈtre. Sauf que l'on ne peut pas indiquer la variable en dur dans la requÊte car on risque une injection SQL de la part d'un utilisateur malintentionnÉ. Du fait on doit "prÉparer" la requÊte en indiquant $X À la place de la variable ($X est un index qui commence À 1). PrÉciser la variable en deuxiÈme paramÈtre dans un array ([]).
    // client.query(`SELECT * FROM "promo" WHERE "id"=$1`, [id], (err, data) => {
    //     if(err) console.trace(err);
    //     // Attention : data.rows contient toujours un array, il faut donc prÉciser quel ÉlÉment on veut rÉcupÉrer en prÉcisant son index
    //     else res.render("promo", {promo:data.rows[0]});

    // });
    // On récupère la bonne promo (selon l'id)
    //(promo, ) parenthèse et virgule superflux car un seul arguement
    //const promo = promos.find(promo => promo.id === id); 
    dataMapper.detailledPromo(id, promo => {
        if(!promo) {
            next();
        } else {
            res.render("promo", {promo});
        }
    });
}
   

exports.studentsInPromo = (req, res) => {

    const promoId = Number(req.params.id);

    // On exécute la requête pour récupérer la promo via son id
    client.query(`SELECT * FROM "promo" WHERE "id"=$1`, [promoId], (err, promo) => {
        if(err) console.trace(err);
        else {
            // ON exécute la requête pour récupérer tous les étudiants de la promo renseignée en id
            client.query(`SELECT * FROM "student" WHERE "promo_id" = $1 ORDER BY "last_name"`, [promoId], (err, students) => {
                if(err) console.trace(err)
                else {
                    res.render("students", 
                    {
                        studentsInPromo:students.rows, // renvoie tous les étudiants de la promo
                        promo:promo.rows[0] // renvoie le premier élément de rows (la promo)
                    });
                }
            });
        }
    });
    // On récupère les étudiants de la promo via son id
   // const studentsInPromo = students.filter(student => student.promo === Number(req.params.id) )
    // On récupère la bonne promo (selon l'id)
    //const promo = promos.find(promo => promo.id === Number(req.params.id));
    //res.render("students", {studentsInPromo, promo});

}