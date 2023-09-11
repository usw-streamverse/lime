import JwtInterceptor from './JwtInterceptor';

export interface LiveItem {
    channel: string,
    nickname: string,
    title: string,
    created: string,
    viewer: number,
    thumbnail: string
}

const Live = () => {    
    const list = () => {
        return JwtInterceptor().instance.get<LiveItem[]>('/live');
    }

    return { list };
}

export default Live;