import { AxiosRequestConfig } from 'axios';
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

export interface VideoWatch {
    id: number,
    nickname: string,
    duration: number,
    title: string,
    views: number,
    thumbnail: string,
    url: string,
    explanation: string,
    likes: number,
    created: string
}


const Video = () => {
    const upload = (formData: any, config: AxiosRequestConfig) => {
        return JwtInterceptor().instance.post<UploadResult>('/videos', formData, config);
    }

    const list = () => {
        return JwtInterceptor().instance.get<VideoItem[]>('/videos');
    }

    const watch = (id: string) => {
        return JwtInterceptor().instance.get<VideoWatch>(`/videos/${id}`);
    }

    return { upload, list, watch };
}

export default Video;