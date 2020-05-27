import { combineReducers } from 'redux';
import api from '../utils/api'
import { setStorageLogged, getStorageLogged } from '../utils/local-storage'

export const doLogin = (body) => {
    // On lance le fetch user - DOING LOGIN
    //Call d'api ->  DOING LOGIN
    // Reponse ok -> user 
    // user -> SET_AUTH_USER 
    // token -> SET_AUTH_TOKEN
    // LOGIN FINI
    // LOGIN FAILED
    return dispatch => {
        dispatch({ type: "DOING_LOGIN" })

        return api
            .post('user/authenticate', body)
                .then(response => {
                    dispatch({type: 'SET_USER', payload: response.data.user})
                    dispatch({ type: "SET_AUTH_MESSAGE", payload: response.data.message })
                    setStorageLogged(true)
                    })
                .catch(err => {
                    dispatch({ type: "SET_AUTH_MESSAGE", payload: err.response.data.message })
                    setStorageLogged(false)
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_AUTH_MESSAGE"})}, 2000) )
    }
}


const defaultUserState = {
    isLogged: false,
    detail: {},
    notes: {},
    promotionNotes: {}
}

const user = (state = defaultUserState, action) => {
    const userAction = {
        "SET_USER": {...state, isLogged: true, detail: action.payload},
        "SET_USER_LOGGED": {...state, isLogged: action.payload},
        "SET_USER_NOTES": {...state, notes: action.payload},
        "SET_USER_PROMOTION_NOTES": {...state, promotionNotes: action.payload},
        "CLEAR_USER": defaultUserState
    }

    return userAction[action.type] || state;
}

    const authMessage = (state = {message: null} , action) => {
        const authMessageAction = {
            "SET_AUTH_MESSAGE": {...state, message: action.payload },
            "CLEAR_AUTH_MESSAGE": {...state, message: null }
        }
        return authMessageAction[action.type] || state;
}

    const authFuntion = (state = false, action) => {
        const authFuntionAction = {
            "DOING_LOGIN": true
        }
        return authFuntionAction[action.type] || state;
    }



const authReducer = combineReducers({
    user,
    authMessage,
    authFuntion
});


export default authReducer;