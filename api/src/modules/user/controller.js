const UserServices = require('./service');

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
    userCall: (req, res) => {
        res.status(200).send(res.locals.user)
    },
    getUserSkillsLevel: (req, res) => {
        UserServices.getUserSkillsLevel(res.locals.user.id)
            .then(result => {
                console.log(result)
                res.status(result.status).send(result)
            })
    },
    allUsersInPromotion: (req, res) => {
        
    },
    UsersGroupBySkill: (req, res) => {

    },
    UsersGroupByLevel: (req, res) => {

    }
}

module.exports = UserController;