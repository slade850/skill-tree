import axios from 'axios';

axios.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

/* export const addAuth = token => {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} */

export default instance;