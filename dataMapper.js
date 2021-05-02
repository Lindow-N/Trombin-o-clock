// ON se connecte à la base via postgres
const client = require('./database');

// Retourne toutes les promos
exports.allPromos = (callback) => {
    client.query(`SELECT * FROM "promo"`, (err, data) => {
        if(err) {
            callback();
        } else {
            callback(data.rows);
        }
    })
};

// Retourne la promo renseignée (id)
exports.detailledPromo = (id, callback) => {
    client.query(`SELECT * FROM "promo" WHERE "id"=$1`, [id], (err, data) => {
        if(err){
            callback();
        } else {
            callback(data.rows[0]);
        }
    })
}

// On insère l'étudiant en base
exports.addStudent = (studentInfo, callback) => {
    client.query(`INSERT INTO "student" ("first_name", "last_name", "github", "promo_id", "profile_picture_url") VALUES($1,$2,$3,$4, $5)`, [studentInfo.first_name, studentInfo.last_name, studentInfo.github_username, studentInfo.promo, `https://github.com/${studentInfo.github_username}.png`], (err, data) => {
        if(err){
            console.trace(err);
            callback();
        } else {
            callback(studentInfo.promo);
        }
    })
}