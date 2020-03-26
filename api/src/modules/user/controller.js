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
        UserServices.UserCall()
            .then(result => res.status(result.status).send(result.payload))
    }
}

module.exports = UserController;