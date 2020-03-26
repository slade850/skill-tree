const jwt = require('jsonwebtoken');
const UserServices = require('../modules/user/service');

function jwtAuthenticate(req, role){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies['token'].access_token, process.env.SECRET_TOKEN, function(err, decoded) {
            // err
            if(err){
                reject({ authorize: false, message: 'sorry but, fuck! your token is invalid' })
            }
            // decoded
            if(decoded){
                UserServices.getUserById(decoded.userId)
                .then((result => {
                result.payload.success && (result.payload.user.role_name == role || role == null) ? resolve({ authorize: true, message: 'welcome', user: result.payload.user }) : resolve({ authorize: false, message: "you are not allowed"})
            }))
            }
        })    
    })
}

const connectJwt = {
    adminOnly: async (req, res, next) => {
        jwtAuthenticate(req, 'admin')
        .then(authorize => {
            console.log(authorize)
            if(authorize.authorize){
                res.locals.user = authorize.user;
                next();
            } else {
                res.status(403).send(authorize.message);
            } 
            })
        .catch(err => res.status(403).send(err.message))
        },
    teacherOnly: async (req, res, next) => {
        jwtAuthenticate(req, 'teacher')
        .then(authorize => {
            console.log(authorize)
            if(authorize.authorize){
                res.locals.user = authorize.user;
                next();
            } else {
                res.status(403).send(authorize.message);
            } 
            })
        .catch(err => res.status(403).send(err.message))
        }, 
    studentOnly: async (req, res, next) => {
        jwtAuthenticate(req, 'student')
        .then(authorize => {
            console.log(authorize)
            if(authorize.authorize){
                res.locals.user = authorize.user;
                next();
            } else {
                res.status(403).send(authorize.message);
            } 
            })
        .catch(err => res.status(403).send(err.message))
        },       
    allUser: async (req, res, next) => {
        jwtAuthenticate(req, null)
        .then(authorize => {
            console.log(authorize)
            if(authorize.authorize){
                res.locals.user = authorize.user;
                next();
            } else {
                res.status(403).send(authorize.message);
            } 
            })
        .catch(err => res.status(403).send(err.message))
    }
};


module.exports = connectJwt;