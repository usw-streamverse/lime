import axios, { AxiosRequestHeaders } from 'axios'
import { API_SERVER } from 'config';

interface CustomRequestHeaders extends AxiosRequestHeaders {
    Authorization: string;
}

const JwtInterceptor = () => {
    const instance = axios.create({
        baseURL: API_SERVER
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if(token)
                config.headers = {
                    'Authorization': `Bearer ${token}`
                } as CustomRequestHeaders;
            return config;
        }
    );

    return { instance }
}

export default JwtInterceptor;