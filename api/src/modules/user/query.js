const db = require("../../config/database");

// Notre query s'occupe d'effectuer la requête sur la base de donneés et de renvoyer au service les datas
const Query = {
    authenticate: (user) => {
        return new Promise((resolve, reject) => {
           let sqlQuery = `SELECT * FROM users WHERE email = "${user}"`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res[0]);
            })
        })    
    },
    register: (user) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO users (id, firstName, lastName, email, password) VALUES ("${user.id}", "${user.firstName}", "${user.lastName}", "${user.email}", "${user.hashedPassword}");`
            let sqlQuery2 = `INSERT INTO users_promotions (user_id, promotion_id) VALUES ((SELECT id FROM users WHERE id='${user.id}'), (SELECT id FROM promotions WHERE id=${user.promotion_id}));`
            db.query(sqlQuery, (err, res) => {
                if (err) reject (err)
                db.query(sqlQuery2, (err, res) => {
                    if (err) reject (err)
                    resolve(res);
                })
            })
        })    
    },
    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE id = "${id}"`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res[0]);
            })
        })    
    }
}

module.exports = Query;