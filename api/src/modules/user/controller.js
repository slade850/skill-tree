const UserServices = require('./service');
const UserQueries = require('./query');

const UserController = {
    authenticate: (req, res) => {
        UserServices.authenticate(req)
            .then(result => {
                if(result.status == 200){
                res.status(result.status).cookie('token', { access_token: result.payload.token }, { maxAge: 86400000, httpOnly: true }).send(true)
                }
                res.status(result.status).send(result.payload)
            })
            .catch(err => res.status(500).send(err))
    },
    register: (req, res) => {
        UserServices.register(req)
            .then(result => res.status(result.status).send(result.payload))
    },
    allPromotions: (req, res) => {
        UserQueries.getPromotions()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
    },
    userCall: (req, res) => {
        res.status(200).send(res.locals.user)
    },
    getUserSkillsLevel: (req, res) => {
        UserServices.getUserSkillsLevel(res.locals.user.id)
            .then(result => {
                console.log(result)
                res.status(200).send(result)
            })
            .catch(err => res.status(400).send(err))
    },
    getUserBySkill: (req, res) => {
        UserServices.userLevelsBySkill(res.locals.user.id, parseInt(req.params.skill_id))
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).send(err))
    },
    getUserByLevel: (req, res) => {
        UserServices.userSkillsByLevel(res.locals.user.id, parseInt(req.params.level_id))
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).send(err))
    },
    getAllUsersInPromotion: (req, res) => {
        UserServices.getAllUsersInPromotion(res.locals.user.promotion_id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).send(err))
    },
    getUsersGroupBySkill: (req, res) => {
        UserServices.getUsersLevelsBySkills(res.locals.user.promotion_id, parseInt(req.params.skill_id))
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).send(err))
    },
    getUsersGroupByLevel: (req, res) => {
        UserServices.getUsersSkillsByLevels(res.locals.user.promotion_id, parseInt(req.params.level_id))
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).send(err))
    }
}

module.exports = UserController;