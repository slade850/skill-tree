const express = require("express")
const router = express.Router();

const SkillModuleController = require('./controller')

router.get('/', SkillModuleController.getAllModules);
router.get('/getAllSkills', SkillModuleController.getAllSkills);
router.get('/modulesWithSkills', SkillModuleController.getModulesWithSkills);
router.get('/:module_id/skills', SkillModuleController.getModulesById);
router.get('/:module_id/skills/:skill_id', SkillModuleController.getSkillById);

module.exports = router;