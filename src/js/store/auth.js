import { combineReducers } from 'redux';module

const defaultUserState = {
    isLogged: false,
    detail: {},
    notes: {},
    promotionNotes: {}
}

const user = (state = defaultUserState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {...state, isLogged: true, detail: action.payload}
        case "SET_USER_NOTES":
            return {...state, notes: action.payload}
        case "SET_USER_PROMOTION_NOTES":
            return {...state, promotionNotes: action.payload}    
        case "CLEAR_USER":
            return defaultUserState 
        default:
            return state    
    }
}



const authReducer = combineReducers({
    user,
});


export default authReducer;