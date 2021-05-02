const client = require('../database');

exports.student = (req, res) => {
    const studentId = Number(req.params.id);
    client.query(`SELECT * FROM "student" WHERE "id"=$1`, [studentId], (err, student) => {
        if(err) console.trace(err);
        else {
            const promoId = student.rows[0].promo_id;
            client.query(`SELECT "id", "name" FROM "promo" WHERE "id"=$1`, [promoId], (err, promo) => {
                    if(err) console.trace(err);
                    else {
                    res.render("student", {student: student.rows[0],promo:promo.rows[0]
                    }); 
                }
            });
        }
    });
}