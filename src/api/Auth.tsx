import axios from 'axios';

export interface LoginParam {
    id: string,
    password: string
}

export interface LoginResult {
    success: boolean,
    code: number
}

export interface RegisterParam {
    id: string,
    password: string,
    nickname: string
}

export interface RegisterResult {
    success: boolean,
    code: number
}


const Auth = () => {
    const login = (props: LoginParam) => {
        return axios.post<LoginResult>('http://localhost:3000/auth/login', props);
    }

    const register = (props: RegisterParam) => {
        const res = axios.post<RegisterResult>('http://localhost:3000/auth/register', props);
        return res;
    }

    return { login, register };
}

export default Auth;