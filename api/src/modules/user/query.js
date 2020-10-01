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
            let sqlQuery = `SELECT id FROM promotions WHERE id=${parseInt(user.promotion_id)};`
            let sqlQuery1 = `INSERT INTO users (id, firstName, lastName, email, password) VALUES ("${user.id}", "${user.firstName}", "${user.lastName}", "${user.email}", "${user.hashedPassword}");`
            let sqlQuery2 = `INSERT INTO users_promotions (user_id, promotion_id) VALUES ((SELECT id FROM users WHERE id='${user.id}'), (SELECT id FROM promotions WHERE id=${user.promotion_id}));`
            let sqlQuery3 = `INSERT INTO user_skills_levels (user_id, skill_id)
            SELECT "${user.id}", skills.id
            FROM skills`
            db.query(sqlQuery, (err, res) => {
                if (err) reject (err)
                if(res.length > 0){
                    db.query(sqlQuery1, (err, res) => {
                        if (err) reject (err.sqlMessage)
                        db.query(sqlQuery2, (err, res) => {
                            if (err) reject (err.sqlMessage)
                            db.query(sqlQuery3, (err, res) => {
                                if (err) reject (err.sqlMessage)
                                resolve(res);
                            })    
                        })
                    })
                } else {
                    reject ("promotion_id don't exist")
                }
            })
        })    
    },
    getPromotions: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM promotions`, (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        })  
    },
    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT users.id, users.firstName, users.lastName, users.email, users.avatar, users.role, promotions.id AS promotion_id, promotions.name AS promotion_name
            FROM users, promotions, users_promotions 
            WHERE users.id = "${id}"
            AND users_promotions.user_id = users.id
            AND promotions.id = users_promotions.promotion_id`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res[0]);
            })
        })    
    },
    getUserSkillsLevel: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT skill_id, level_id
            FROM user_skills_levels
            WHERE user_id = "${id}"`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        })    
    },
    userLevelsBySkill: (id, skill_id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT skill_id, level_id
            FROM user_skills_levels
            WHERE user_id = "${id}"
            AND skill_id = ${skill_id}`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        })    
    },
    userSkillsByLevel: (id, level_id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT skill_id, level_id
            FROM user_skills_levels
            WHERE user_id = "${id}"
            AND level_id = ${level_id}`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        })    
    },
    getAllUserByPromotion: (promo_id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT users.id, users.firstName, users.lastName, users.avatar, users.role
            FROM users, users_promotions
            WHERE users.id = users_promotions.user_id
            AND users_promotions.promotion_id = ${promo_id}`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        })    
    },
    getUsersLevelsBySkills: (promo_id, skill_id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT users.id, users.firstName, users.lastName, users.avatar, users.role, user_skills_levels.level_id
            FROM users, users_promotions, user_skills_levels
            WHERE users.id = users_promotions.user_id
            AND users_promotions.promotion_id = ${promo_id}
            AND user_skills_levels.skill_id = ${skill_id}
            AND users.id = user_skills_levels.user_id`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        })    
    },
    getUsersSkillsByLevels: (promo_id, level_id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT users.id, users.firstName, users.lastName, users.avatar, users.role, user_skills_levels.skill_id
            FROM users, users_promotions, user_skills_levels
            WHERE users.id = users_promotions.user_id
            AND users_promotions.promotion_id = ${promo_id}
            AND user_skills_levels.level_id = ${level_id}
            AND users.id = user_skills_levels.user_id`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                console.log(res)
                resolve(res);
            })
        })    
    },
    getAllSkill: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT skills.id FROM skills`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve(res)
        })
    })
    },
    getUsersGroupAverageLevel: (promo_id, skill_id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT user_skills_levels.level_id
            FROM users, users_promotions, user_skills_levels
            WHERE users.id = users_promotions.user_id
            AND users_promotions.promotion_id = ${promo_id}
            AND user_skills_levels.skill_id = ${skill_id}
            AND users.id = user_skills_levels.user_id`;

            db.query(sqlQuery, (err, res) => {
                if (err) reject(err)
                resolve({skill: skill_id, notes: Math.round(res.reduce((a, b) => a + b.level_id , 0)/res.length)})
        })
    })
    }
}

module.exports = Query;