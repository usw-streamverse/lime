import JwtInterceptor from './JwtInterceptor';
import { VideoItem } from './Video';

export interface UploadResult {
  success: boolean,
  url?: string,
  m3u8?: string,
  filename: string,
  duration: number,
  id: number,
  thumbnail: string
}

export interface PlayList {
  id: number,
  name: string,
  created: string,
  count: number,
  thumbnail: string
}

export interface PlayListItem {
  video_id: number,
  title: string,
  created: string,
  duration: number,
  thumbnail: string
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

  const getPlayList = (id: number) => {
    return JwtInterceptor().instance.get<PlayList[]>(`/channels/${id}/playlist`);
  }

  const getPlayListItem = (id: number) => {
    return JwtInterceptor().instance.get<PlayListItem[]>(`/channels/playlist/${id}`);
  }

  const deletePlayList = (props: {id: number}) => {
    return JwtInterceptor().instance.delete<{success: boolean}>(`/channels/playlist/${props.id}`);
  }

  const deletePlayListItem = (props: {playListId: number, videoId: number}) => {
    return JwtInterceptor().instance.delete<{success: boolean}>(`/channels/playlist/${props.playListId}/${props.videoId}`);
  }

  return { videoList, subscribe, newPlayList, getPlayList, getPlayListItem, deletePlayList, deletePlayListItem };
}

export default Channel;