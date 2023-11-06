import { useMutation, useQueryClient } from '@tanstack/react-query';
import Channel from 'apis/Channel';
import { AxiosError, AxiosResponse } from 'axios';
import Button from 'components/Button';
import FormTextBox from 'components/FormTextBox';
import PlayList from 'components/PlayList';
import PlayListManagement from 'components/PlayListManagement';
import { useRef, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import styled from 'styled-components';

const PlayListModal = () => {
  const [management, setManagement] = useState<number>(-1);
   
  const closeModal = () => {
    if(window.history.state.modal === 'PlayList') window.history.back();
  }
   
  return (
    <Container>
      <Head>내 재생목록</Head>
      <Close onClick={closeModal}><HiOutlineX size={32} /></Close>
      <ListWrapper>
        {
          management === -1 ?
          <>
            <NewPlayList />
            <PlayList horizontal={true} onClick={playListId => setManagement(playListId)} />
          </>
          :
          <PlayListManagement goBack={() => setManagement(-1)} playListId={management} />
        }
      </ListWrapper>
    </Container>
  )
}

const NewPlayList = () => {
  const queryClient = useQueryClient();
  const playListName = useRef<HTMLInputElement>(null);
  const { mutate } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {name: string}>(Channel().newPlayList, {
    onSuccess: (data) => {
      if(playListName.current)
        playListName.current.value = '';
      queryClient.invalidateQueries(['playList', 0]);
    },
    onError: (error) => {
      alert(error.response?.status);
    }
  });

  const newPlayList = () => {
    if(playListName.current?.value.trim() !== '')
      mutate({name: playListName?.current?.value || ''});
  }

  return (
    <NewPlayList.Container>
      <FormTextBox ref={playListName} placeholder="새 재생목록 이름" />
      <NewPlayList.Button>
        <Button color="#fff" bgColor="#2c7fe5" borderColor="#707070" bgColorOver="#0e5ab9" onClick={newPlayList}>만들기</Button>
      </NewPlayList.Button>
    </NewPlayList.Container>
  )
}

NewPlayList.Container = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 1.0rem;
  background-color: var(--main-bg-color);
  z-index: 1;
`

NewPlayList.Button = styled.div`
  margin-left: 1.0rem;
  > button {
    width: 100px;
    padding: 1.0rem;
  }
`

const ListWrapper = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 550px;
  max-width: 100%;
  max-height: 100vh;
  background-color: var(--main-bg-color);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  @media screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`

const Head = styled.div`
  margin-top: 26px;
  padding: 1.0rem;
  border-left: 0.5rem solid var(--sign-signin-bg-color);
  color: var(--main-text-color);
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
`

const Close = styled.div`
  position: absolute;
  top: 26px;
  right: 18px;
  line-height: 0;
  color: #bebebe;
  cursor: pointer;
  transition: color 200ms ease;
  :hover {
    color: var(--main-text-color);
  }
`

export default PlayListModal;