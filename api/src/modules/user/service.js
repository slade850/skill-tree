const UserQueries = require('./query');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const UserServices = {
    authenticate: async (req) => {
        const user = await UserQueries.authenticate(req.body.email);
        
        if(!user){
            return { status: 400, payload: { success: false, message: 'user not found' } };
        }else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                let payload = {userId: user.id, email: user.username};
                let token = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600});
                return { status: 200, payload: { success: true, message: 'wellcome', token: token } };
            }
            return { status: 400, payload: { success: false, message: 'wrong password' } };
        }
    },
    register: async (req) => {
        let { firstName, lastName, email, password, promotion_id } = req.body;
        let id = uuidv4();

        if (typeof firstName !== "string" || typeof lastName !== "string" || typeof password !== "string" || typeof email !== "string", typeof promotion_id !== "number") {
            return { status: 400, payload: { success: false, message: "All fields are required and must be a string type" } }
        }

        return bcrypt.genSalt()
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => UserQueries.register({ id, firstName, lastName, email, hashedPassword, promotion_id }))
        .then(user => ({ status: 201, payload: { success: true, message: 'User successfully registered' } }))
        .catch(err => ({ status: 400, payload: { success: false, message: err } }))
    },
    getUserById: async (id) => {
        const user = await UserQueries.getUserById(id);
        if(!user){
            return { status: 400, payload: { success: false, message: 'user not found' } };
        }
        return { status: 200, payload: { success: true, user: user }
    }
    },
    UserCall: async ()=> {
        return { status: 200, payload: { success: true, message: "wellcome"}}
    }
}

module.exports = UserServices;