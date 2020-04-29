import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true
})

/* export const addAuth = token => {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} */

export default instance;