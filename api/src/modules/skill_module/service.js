const SkillModuleQueries = require('./query');

const SkillModuleServices = {
    getModulesWithSkills: async () => {
        const modules = await SkillModuleQueries.getAllModules().then(res => res)
        let result = [];
        for(let i = 0; i < modules.length; i++) {
            await SkillModuleQueries.getModulesById(modules[i].id)
            .then(res => result.push(res))
            .catch(err => console.log(err))
        };
        return result;
    }
}

module.exports = SkillModuleServices;