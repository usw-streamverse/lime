import axios, { AxiosRequestHeaders } from 'axios'

interface CustomRequestHeaders extends AxiosRequestHeaders {
    Authorization: string;
}

const JwtInterceptor = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:3000'
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