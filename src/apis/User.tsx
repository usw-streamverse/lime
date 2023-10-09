import JwtInterceptor from './JwtInterceptor';

export interface ProfileResult {
    id: number,
    userid: string,
    nickname: string,
    profile: string,
    success: boolean
}

export interface ChannelResult {
    id: number,
    userid: string,
    nickname: string,
    profile: string,
    videoCount: number,
    readership: number,
    success: boolean,
    subscribed: boolean
}

const User = () => {
    const profile = () => {
        return JwtInterceptor().instance.get<ProfileResult>('/users/profile');
    }
    
    const channel = (id: string) => {
        return JwtInterceptor().instance.get<ChannelResult>('/users/' + id);
    }

    return { profile, channel };
}

export default User;