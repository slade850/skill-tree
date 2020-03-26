const express = require("express")
const connectJwt = require('../../middle/connectJwt');
const router = express.Router();

const UserController = require('./controller')

router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);
router.get('/info', connectJwt.allUser, UserController.userCall);
router.get('/skillslevels', connectJwt.allUser, UserController.getUserSkillsLevel)
router.get('/group', connectJwt.allUser, UserController.allUsersInPromotion)

module.exports = router;