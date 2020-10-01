const UserQueries = require('./query');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const UserServices = {
    authenticate: async (req) => {
        const user = await UserQueries.authenticate(req.body.email);
        if(!user){
            return { status: 401, payload: { success: false, message: 'user not found' } };
        }else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                let payload = {userId: user.id, email: user.username};
                let token = await jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600});
                return { status: 200, payload: { success: true, message: 'wellcome', token: token, user: user } };
            }
            return { status: 401, payload: { success: false, message: 'wrong password' } };
        }
    },
    register: async (req) => {
        let { firstName, lastName, email, password, promotion_id } = req.body;
        let id = uuidv4();

        if (typeof firstName !== "string" || typeof lastName !== "string" || typeof password !== "string" || typeof email !== "string", typeof parseInt(promotion_id) !== "number") {
            return { status: 400, payload: { success: false, message: "All fields are required and must be a string type" } }
        }

        return bcrypt.genSalt()
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => UserQueries.register({ id, firstName, lastName, email, hashedPassword, promotion_id }))
        .then(user => ({ status: 201, payload: { success: true, message: 'User successfully registered' } }))
        .catch(err => ({ status: 401, payload: { success: false, message: err } }))
    },
    getUserById: async (id) => {
        const user = await UserQueries.getUserById(id);
        if(!user){
            return { status: 401, payload: { success: false, message: 'user not found' } };
        }
        return { status: 200, payload: { success: true, user: user }
    }
    },
    getUserSkillsLevel: async (id) => {
        return UserQueries.getUserSkillsLevel(id)
        .then(res => {
            let result = new Object();
            res.forEach(level => {
                result[level.skill_id] = level.level_id
            });
            return result
        })
        .catch(err => { return err})
    },
    userLevelsBySkill: async (id, skill_id) => {
        return UserQueries.userLevelsBySkill(id, skill_id)
        .then(res => {
            return res
        })
        .catch(err => { return err})
    },
    userSkillsByLevel: async (id, level_id) => {
        return UserQueries.userSkillsByLevel(id, level_id)
        .then(res => {
            return res
        })
        .catch(err => { return err})
    },
    getAllUsersInPromotion: async (promo_id) => {
        return UserQueries.getAllUserByPromotion(promo_id)
        .then(res => {
            return res
        })
        .catch(err => { return err})
    },
    getUsersLevelsBySkills: async (promo_id, skill_id) => {
        return UserQueries.getUsersLevelsBySkills(promo_id, skill_id)
        .then(res => {
            return res
        })
        .catch(err => { return err})
    },
    getUsersSkillsByLevels: async (promo_id, level_id) => {
        return UserQueries.getUsersSkillsByLevels(promo_id, level_id)
        .then(res => {
            return res
        })
        .catch(err => { return err})
    },
    getUsersGroupAverageLevel: async (promo_id) => {
        const skills_id = await UserQueries.getAllSkill().then(res => res)
        let result = new Object();
        for(let i = 0; i < skills_id.length; i++){
            await UserQueries.getUsersGroupAverageLevel(promo_id, skills_id[i].id).then(res => result[res.skill] = res.notes).catch(err => err)
        }
        return result;
    }

}

module.exports = UserServices;