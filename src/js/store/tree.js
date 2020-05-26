/* {
    name: 'Default tree name',
    skill: [],
    modules: [],
    isLoading: false
} */

import { combineReducers } from 'redux';

const name = (state = null, action) => {
    switch (action.type) {
        case "SET_TREE_NAME":
            return action.payload
        case "CLEAR_TREE_NAME":
            return null  
        default:
            return state    
    }
}

const modulesInitialState = {
    collection: [],
    isLoading: false
}

const modules = (state = modulesInitialState, action) => {
    switch (action.type) {
        case "FETCH_MODULES":
            return {...state, isLoading: true }
        case "SET_MODULES":
            return { ...state, collection: action.payload, isLoading: false }
        case "CLEAR_MODULES":
            return modulesInitialState   
        default:
            return state    
    }
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
    name,
    modules,
    currentSkill,
});


export default treeReducer;