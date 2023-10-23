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
  profile: string,
  title: string,
  created: string,
  view_count: number,
  duration: number,
  thumbnail: string
}

export interface VideoWatch {
  id: number,
  channel_id: number,
  userid: string,
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
  subscribed: boolean,
  profile: string,
  readership: number
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
  reply_count: number,
  liked: boolean,
  profile: string
}

const Video = () => {
  const upload = (formData: any, config: AxiosRequestConfig) => {
    return JwtInterceptor().instance.post<UploadResult>('/videos', formData, config);
  }

  const list = () => {
    return JwtInterceptor().instance.get<VideoItem[]>('/videos');
  }

  const popularList = () => {
    return JwtInterceptor().instance.get<VideoItem[]>('/daily');
  }

  const subscriptionList = () => {
    return JwtInterceptor().instance.get<VideoItem[]>('/subscribe');
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

  const writeComment = (props: {id: string, parent_id: string, comment: string}) => {
    return JwtInterceptor().instance.post<{success: boolean}>(`/videos/${props.id}/comment`, props);
  }

  const getComment = (id: string) => {
    return JwtInterceptor().instance.get<VideoComment[]>(`/videos/${id}/comment`);
  }

  const getReply = (id: string, parent_id: number) => {
    return JwtInterceptor().instance.get<VideoComment[]>(`/videos/${id}/comment/${parent_id}`);
  }
  
  const deleteComment = (props: {video_id: string, comment_id: string}) => {
    return JwtInterceptor().instance.delete<{success: boolean}>(`/videos/${props.video_id}/comment/${props.comment_id}`);
  }

  const likeComment = (props: {comment_id: number}) => {
    return JwtInterceptor().instance.post<{active: boolean}>(`/videos/comment/${props.comment_id}/like`);
  }

  const addPlayList = (props: {videoId: number, playListId: number}) => {
    return JwtInterceptor().instance.post<{success: boolean}>(`/videos/${props.videoId}/playlist`, {playlist: props.playListId});
  }

  return { upload, list, popularList, subscriptionList, watch, update, like, writeComment, getComment, deleteComment, getReply, likeComment, addPlayList };
}

export default Video;