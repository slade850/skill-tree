const db = require("../../config/database");

// Notre query s'occupe d'effectuer la requête sur la base de donneés et de renvoyer au service les datas
const Query = {
    getAllModules: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM modules`, (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        })  
    },
    getModulesById: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM modules
            WHERE modules.id = "${id}"`;
            let sqlQuery2 = `SELECT * FROM skills
            WHERE skills.module_id = "${id}"`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                db.query(sqlQuery2, (err2, res2) => {
                    if(err2) reject(err2)
                    resolve({module: res[0], skills: res2})
                })
            })
        })    
    },
    getSkillById: (module_id, skill_id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT *, modules.id AS module_id, modules.title AS module_title FROM modules , skills
            WHERE modules.id = "${module_id}"
            AND skills.module_id = modules.id
            AND skills.id = "${skill_id}"`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res[0]);
            })
        })    
    },
    getAllSkills: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT *, modules.id AS module_id, modules.title AS module_title FROM modules , skills
            WHERE skills.module_id = modules.id`;
            db.query(sqlQuery, (err, res) => {
                let result = new Object;
                res.forEach(el => {
                    result[el.id] = el
                });
                if (err) reject(err)
                resolve(result);
            })
        })  
    },
}

module.exports = Query;