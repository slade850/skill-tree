const express = require("express")
const connectJwt = require('../../middle/connectJwt');
const router = express.Router();

const UserController = require('./controller')

router.get('/promotions', UserController.allPromotions)
router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);
router.get('/info', connectJwt.allUser, UserController.userCall);
router.get('/skillslevels', connectJwt.allUser, UserController.getUserSkillsLevel)
router.get('/byskill/:skill_id', connectJwt.allUser, UserController.getUserBySkill)
router.get('/bylevel/:level_id', connectJwt.allUser, UserController.getUserByLevel)
router.get('/group', connectJwt.allUser, UserController.getAllUsersInPromotion)
router.get('/groupbyskill/:skill_id', connectJwt.allUser, UserController.getUsersGroupBySkill)
router.get('/groupbylevel/:level_id', connectJwt.allUser, UserController.getUsersGroupByLevel)
router.get('/groupAverageLevel', connectJwt.allUser, UserController.getUsersGroupAverageLevel)

module.exports = router;