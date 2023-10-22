import { UseQueryResult, useQuery } from '@tanstack/react-query';
import Channel, { PlayListItem } from 'apis/Channel';
import { useEffect, useRef, useState } from 'react';

export type usePlayListType = { query: UseQueryResult, items: PlayListItem[], status: string, getCurrentVideo: () => number, setVideoId: (videoId: number) => boolean };

const usePlayList = (id: number): usePlayListType => {
  const [items, setItems] = useState<PlayListItem[]>([]);
  const [status, setStatus] = useState<string>('loading');
  const index = useRef<number>(0);

  const query = useQuery({
    queryKey: ['playList', id],
    staleTime: 0,
    enabled: false,
    onSuccess: (data) => {
      setItems(data.data);
      setStatus('success');
    },
    queryFn: () => Channel().getPlayListItem(id)
  });

  const getCurrentVideo = () => {
    return items[index.current].video_id;
  }

  const setVideoId = (videoId: number) => {
    const videoIndex = items.findIndex(item => item.video_id == videoId);
    if (videoIndex === -1) {
      return false;
    }
    index.current = videoIndex;
    return true;
  }

  useEffect(() => {
    if (id) query.refetch();
  }, [id]);

  return { query, items, status, getCurrentVideo, setVideoId };
}

export default usePlayList;