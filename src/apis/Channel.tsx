import JwtInterceptor from './JwtInterceptor';

export interface UploadResult {
    success: boolean,
    url?: string,
    m3u8?: string,
    filename: string,
    duration: number,
    id: number,
    thumbnail: string
}

export interface VideoItem {
    id: number,
    nickname: string,
    title: string,
    created: string,
    view_count: number,
    duration: number,
    thumbnail: string
}

export interface PlayList {
    id: number,
    name: string,
    created: string,
}

const Channel = () => {
    const videoList = (id: string) => {
        return JwtInterceptor().instance.get<VideoItem[]>(`/channels/${id}/video`);
    }

    const subscribe = (props: {id: number}) => {
        return JwtInterceptor().instance.post<{active: boolean}>(`/channels/${props.id}/subscribe`);
    }

    const newPlayList = (props: {name: string}) => {
        return JwtInterceptor().instance.post<{success: boolean}>(`/channels/playlist`, {name: props.name});
    }

    const getMyPlayList = () => {
        return JwtInterceptor().instance.get<PlayList[]>(`/channels/playlist`);
    }

    return { videoList, subscribe, newPlayList, getMyPlayList };
}

export default Channel;