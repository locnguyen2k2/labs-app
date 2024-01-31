import axios from 'axios';
import { jwtManager } from './configJwt';

export const configAxios = () => {
    axios.defaults.baseURL = 'https://laboratory-management-system.onrender.com/apis/';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.interceptors.request.use(
        async (config) => {
            const token = (await jwtManager).get();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
    )
}