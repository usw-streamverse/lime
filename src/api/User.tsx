import JwtInterceptor from './JwtInterceptor';

export interface ProfileResult {
    id: number,
    userid: string,
    nickname: string,
    success: boolean
}

export interface ChannelResult {
    id: number,
    userid: string,
    nickname: string,
    success: boolean
}

const User = () => {
    const profile = () => {
        return JwtInterceptor().instance.get<ProfileResult>('http://localhost:3000/users/profile');
    }
    
    const channel = (id: string) => {
        return JwtInterceptor().instance.get<ChannelResult>('http://localhost:3000/users/' + id);
    }

    return { profile, channel };
}

export default User;