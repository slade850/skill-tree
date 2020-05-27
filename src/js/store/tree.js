/* {
    name: 'Default tree name',
    skill: [],
    modules: [],
    isLoading: false
} */

import { combineReducers } from 'redux';

const modulesInitialState = {
    collection: [],
    isLoading: false
}

const modules = (state = modulesInitialState, action) => {
    const moduleAction = {
        "FETCH_MODULES": {...state, isLoading: true },
        "SET_MODULES": {...state, collection: action.payload, isLoading: false },
        "CLEAR_MODULES": modulesInitialState
    };

    return moduleAction[action.type] || state;
}



const skills = (state = {}, action) => {
    const skillAction = {
        "SET_ALL_SKILLS": {...state, collection: action.payload, isLoading: false },
    };

    return skillAction[action.type] || state;
}

const currentSkillInit = {
    module: {},
    details: {}
}

const currentSkill = (state = currentSkillInit, action) => {
    switch (action.type) {
        case "SET_CURRENT_SKILL":
            return { ...state, module: action.payload.module, details: action.payload.details }
        case "CLEAR_CURRENT_SKILL":
            return currentSkillInit   
        default:
            return state    
    }
}

const treeReducer = combineReducers({
    modules,
    currentSkill,
    skills
});


export default treeReducer;