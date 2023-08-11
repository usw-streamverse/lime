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

const Channel = () => {
    const videoList = (id: string) => {
        return JwtInterceptor().instance.get<VideoItem[]>(`/channels/${id}/video`);
    }

    return { videoList };
}

export default Channel;