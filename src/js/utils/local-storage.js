export const setStorageLogged = (logged) => {
    return window.localStorage.setItem('logged', logged)
}

export const getStorageLogged = () => {
    return window.localStorage.getItem('logged')
}

export const clearLogged = () => {
    window.localStorage.removeItem('logged');
}