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
        return JwtInterceptor().instance.post<UploadResult>('http://localhost:3000/videos', formData);
    }

    const list = () => {
        return JwtInterceptor().instance.get<VideoItem[]>('http://localhost:3000/videos');
    }

    return { upload, list };
}

export default Video;