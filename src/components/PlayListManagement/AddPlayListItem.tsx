import { useMutation, useQueryClient } from '@tanstack/react-query';
import Video from 'apis/Video';
import { AxiosError, AxiosResponse } from 'axios';
import { OverlayContext } from 'components/Overlay';
import { VideoContext } from 'pages/Watch';
import { useContext } from 'react';
import styled from 'styled-components';

const AddPlayListItem = (props: {id: number}) => {
  const videoId = useContext(VideoContext);
  const overlayContext = useContext(OverlayContext);
  const queryClient = useQueryClient();

  const { mutate } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {videoId: number, playListId: number}>(Video().addPlayList, {
  onSuccess: (data) => {
    queryClient.invalidateQueries(['playList', props.id]);
    overlayContext.alert('현재 동영상을 재생목록에 추가하였습니다.');
  },
  onError: (error) => {
    switch (error.response?.status) {
    case 400: {
      overlayContext.alert('재생목록에 이미 등록된 동영상입니다.');
      break;
    }
    default: {
      overlayContext.alert('재생목록에 추가 도중 오류가 발생하였습니다.');
    }
    }
  }
  });

  const addPlayList = () => {
  mutate({videoId: parseInt(videoId), playListId: props.id});
  }

  return (
  <Container onClick={addPlayList}>재생목록에 추가하기</Container>
  )
}

const Container = styled.div`
  padding: 1.0rem;
  background-color: var(--playlist-item-add-bg-color);
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  transition: all 200ms ease;
  :hover {
  background-color: var(--playlist-item-add-bg-color-hover);
  }
`

export default AddPlayListItem;