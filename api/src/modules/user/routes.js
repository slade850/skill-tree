const express = require("express")
const connectJwt = require('../../middle/connectJwt');
const router = express.Router();

const UserController = require('./controller')

router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);
router.get('/user', connectJwt.allUser, UserController.userCall)

module.exports = router;