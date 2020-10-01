const SkillModuleQueries = require('./query');
const SkillModuleServices = require('./service');

const SkillModuleController = {
    getAllModules: (req, res) => {
        SkillModuleQueries.getAllModules()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
    },
    getModulesById: (req, res) => {
        SkillModuleQueries.getModulesById(req.params.module_id)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
    },
    getSkillById: (req, res) => {
        SkillModuleQueries.getSkillById(req.params.module_id, req.params.skill_id)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
    },
    getModulesWithSkills: (req, res) => {
        SkillModuleServices.getModulesWithSkills()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
    },
    getAllSkills: (req, res) => {
        SkillModuleQueries.getAllSkills()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
    }
}

module.exports = SkillModuleController;