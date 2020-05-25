const SkillModuleQueries = require('./query');

const SkillModuleServices = {
    getModulesWithSkills: async () => {
        const modules = await SkillModuleQueries.getAllModules().then(res => res)
        let result = new Object();
        for(let i = 0; i < modules.length; i++) {
            await SkillModuleQueries.getModulesById(modules[i].id)
            .then(res => result[modules[i].id] = {title: modules[i].title, skills: res})
            .catch(err => console.log(err))
        };
        return result;
    }
}

module.exports = SkillModuleServices;