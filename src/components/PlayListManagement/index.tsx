import { TfiArrowLeft, TfiTrash } from 'react-icons/tfi';
import styled from 'styled-components';
import MenuButton from '../MenuButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Channel from 'apis/Channel';
import { AxiosError, AxiosResponse } from 'axios';
import Loading from '../Loading';
import { useContext } from 'react';
import { OverlayContext } from '../Overlay';
import AddPlayListItem from './AddPlayListItem';
import PlayListItem from './PlayListItem';

const PlayListManagement = (props: { goBack: () => void, playListId: number }) => {
  const queryClient = useQueryClient();
  const overlayContext = useContext(OverlayContext);
  const { data, status } = useQuery({
    queryKey: ['playList', props.playListId],
    staleTime: 0,
    queryFn: () => Channel().getPlayListItem(props.playListId),
    onError: (error: AxiosError) => {
        alert(error.response?.status);
    }
  });

  const deletePlayList = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {id: number}>(Channel().deletePlayList, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['playList', 0]);
      overlayContext.alert('재생목록을 삭제하였습니다.');
      props.goBack();  
    },
    onError: (error) => {
      console.log(error);
      alert(error.response?.status);
    }
});

  if(status === 'success')
    return (
      <Container>
        <Sticky>
          <MenuContainer>
            <MenuButton onClick={() => deletePlayList.mutate({id: props.playListId})} size={40}><TfiTrash size={18} /></MenuButton>
            <MenuButton onClick={props.goBack} size={40}><TfiArrowLeft size={18} /></MenuButton>
          </MenuContainer>
          <AddPlayListItem id={props.playListId} />
        </Sticky>
        {
          data.data.map(item => <PlayListItem key={item.video_id} {...item} playListId={props.playListId} />)
        }
      </Container>
    )
  
    return (
      <Container>
        <Loading />
      </Container>
    )
}

const Container = styled.div`
  position: relative;
  overflow-y: scroll;
  height: 350px;
  @media screen and (max-width: 480px) {
    height: 100%;
  }
`

const Sticky = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--main-bg-color);
  z-index: 1;
`

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0.75rem 0.75rem 0.75rem;
`

export default PlayListManagement;