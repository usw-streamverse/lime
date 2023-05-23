import { AxiosRequestConfig } from 'axios';
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
    created: string,
    like: boolean
}

export interface VideoUpdate {
    id: number,
    title: string,
    explanation: string
}

export interface VideoUpdateResult {
    id: number
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

    const update = (props: VideoUpdate) => {
        return JwtInterceptor().instance.put<UploadResult>(`/videos/${props.id}`, props);
    }

    const like = (props: {id: string}) => {
        return JwtInterceptor().instance.post<{active: boolean}>(`/videos/${props.id}/like`);
    }

    return { upload, list, watch, update, like };
}

export default Video;