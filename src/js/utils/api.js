import axios from 'axios';
import urlConfig from '../../../urlConf';

axios.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: urlConfig.url
})


export default instance;