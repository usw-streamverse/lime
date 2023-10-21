import { useMutation, useQueryClient } from '@tanstack/react-query';
import Channel, { PlayListItem as PlayListItemInterface } from 'apis/Channel';
import { AxiosError, AxiosResponse } from 'axios';
import { OverlayContext } from 'components/Overlay';
import { useContext } from 'react';
import { BsXLg } from 'react-icons/bs';
import styled from 'styled-components';
import { getDifferenceTimeFormat, getDurationFormat, getKSTfromUTC } from 'utils/Time';

interface PlayListItemProps extends PlayListItemInterface {
  playListId: number
}

const PlayListItem = (props: PlayListItemProps) => {
  return (
  <Container>
     <Thumbnail>
      <img src={props.thumbnail} alt="Thumbnail" />
      <Duration>{getDurationFormat(props.duration)}</Duration>
    </Thumbnail>
    <InforContainer>
    <Title>{props.title}</Title>
    <Detail>{getDifferenceTimeFormat(getKSTfromUTC(props.created))}에 추가됨</Detail>
    </InforContainer>
    <ButtonContainer>
    <Delete playListId={props.playListId} videoId={props.video_id}/>
    </ButtonContainer>
  </Container>
  )
}

const Delete = (props: {playListId: number, videoId: number}) => {
  const overlayContext = useContext(OverlayContext);
  const queryClient = useQueryClient();
  const deletePlayListItem = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {playListId: number, videoId: number}>(Channel().deletePlayListItem, {
    onSuccess: (data) => {
    queryClient.invalidateQueries(['playList', props.playListId]);
    },
    onError: (error) => {
    overlayContext.alert('동영상을 삭제하는 도중 오류가 발생하였습니다.');
    }
  });

  return (
  <DeleteButton onClick={() => deletePlayListItem.mutate({playListId: props.playListId, videoId: props.videoId})}><BsXLg size={18} /></DeleteButton>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin: 6px;
  padding: 1.0rem;
`

const Thumbnail = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 30%;
  aspect-ratio: 16/9;
  line-height: 0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    pointer-events: none;
  }
`

const Duration = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  padding: 0.75rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.66);
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 400;
`

const InforContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.0rem;
  overflow: hidden;
`

const Title = styled.div`
  margin: 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Detail = styled.div`
  margin-bottom: 0.25rem;
  color: var(--main-text-color-light);
  font-size: 0.875rem;
  font-weight: 300;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 1.0rem;
`

const DeleteButton = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  transition: all 200ms ease;
  :hover {
  color: var(--red);
  }
`

export default PlayListItem;