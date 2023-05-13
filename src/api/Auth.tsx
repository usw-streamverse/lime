import JwtInterceptor from './JwtInterceptor';

export interface LoginParam {
    id: string,
    password: string
}

export interface LoginResult {
    success: boolean,
    code: number,
    id: string,
    userid: string,
    nickname: string,
    token: string
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
        return JwtInterceptor().instance.post<LoginResult>('/auth/login', props);
    }

    const register = (props: RegisterParam) => {
        return JwtInterceptor().instance.post<RegisterResult>('/auth/register', props);
    }

    return { login, register };
}

export default Auth;