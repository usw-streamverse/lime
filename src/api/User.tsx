import JwtInterceptor from './JwtInterceptor';

export interface ProfileResult {
    id: number,
    userid: string,
    nickname: string,
    success: boolean
}

const User = () => {
    const profile = () => {
        return JwtInterceptor().instance.get<ProfileResult>('http://localhost:3000/users/profile');
    }

    return { profile };
}

export default User;