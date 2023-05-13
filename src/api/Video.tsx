import JwtInterceptor from './JwtInterceptor';

export interface UploadResult {
    success: boolean,
    url?: string,
    m3u8?: string
}

export interface VideoItem {
    id: number,
    nickname: string,
    title: string,
    created: string,
    views: number,
    duration: number,
    thumbnail: string
}

const Video = () => {
    const upload = (formData: any) => {
        return JwtInterceptor().instance.post<UploadResult>('/videos', formData);
    }

    const list = () => {
        return JwtInterceptor().instance.get<VideoItem[]>('/videos');
    }

    return { upload, list };
}

export default Video;