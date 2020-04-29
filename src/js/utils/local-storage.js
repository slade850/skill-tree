export const setStorageUser = (user) => {
    return window.localStorage.setItem('user', JSON.stringify(user))
}

export const getStorageUser = () => {
    return JSON.parse(window.localStorage.getItem('user'))
}

export const clearUser = () => {
    window.localStorage.removeItem('user');
}

// si je suis dans un autre fichier

// import {setUser} from 'local-storage';
// import {getUser} from 'local-storage';
// import {clearUser} from 'local-storage';