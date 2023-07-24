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
    view_count: number,
    duration: number,
    thumbnail: string
}

export interface VideoWatch {
    id: number,
    nickname: string,
    duration: number,
    title: string,
    view_count: number,
    thumbnail: string,
    url: string,
    explanation: string,
    like_count: number,
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

export interface VideoComment {
    id: number,
    nickname: string,
    duration: number,
    parent_id: number,
    writer: number,
    comment: string,
    status: string,
    created: string,
    like_count: number,
    reply_count: number
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

    const write_comment = (props: {id: string, parent_id: string, comment: string}) => {
        return JwtInterceptor().instance.post<{success: boolean}>(`/videos/${props.id}/comment`, props);
    }

    const get_comment = (id: string) => {
        return JwtInterceptor().instance.get<VideoComment[]>(`/videos/${id}/comment`);
    }

    const get_reply = (id: string, parent_id: number) => {
        return JwtInterceptor().instance.get<VideoComment[]>(`/videos/${id}/comment/${parent_id}`);
    }
    
    const delete_comment = (props: {video_id: string, comment_id: string}) => {
        return JwtInterceptor().instance.delete<{success: boolean}>(`/videos/${props.video_id}/comment/${props.comment_id}`);
    }

    return { upload, list, watch, update, like, write_comment, get_comment, delete_comment, get_reply };
}

export default Video;