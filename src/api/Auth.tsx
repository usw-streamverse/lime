import axios from 'axios';

const Auth = () => {
    const login = (id: string, password: string) => {
        const res = axios.post<string>('http://localhost:3000/auth/login', {
            'id': id,
            'password': password 
        });
        return res;
    }

    const register = (id: string, password: string, nickname: string) => {
        const res = axios.post<string>('http://localhost:3000/auth/register', {
            'id': id,
            'password': password,
            'nickname': nickname,
        });
        return res;
    }

    return { login, register };
}

export default Auth;