import { CiSquarePlus } from 'react-icons/ci'
import styled from 'styled-components'
import FormTextBox from './FormTextBox'
import { createContext, useContext, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import Channel, { PlayList as PlayListInterface } from 'apis/Channel'
import { BsFolderPlus } from 'react-icons/bs'
import { VideoContext } from 'pages/Watch'
import Video from 'apis/Video'

const PlayList = () => {
    const { data, status } = useQuery({
        queryKey: ['myPlayList'],
        staleTime: 0,
        queryFn: () => Channel().getMyPlayList(),
        onError: (error: AxiosError) => {
            alert(error.response?.status);
        }
    });

    if(status === 'success')
        return (
            <Container>
                <NewPlayList />
                <ListContainer>
                    {
                        data.data.map(i => {
                            return <PlayListItem key={i.id} {...i} />
                        })
                    }
                </ListContainer>
            </Container>
        )
    else
        return (
            <>
                Loading...
            </>
        )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
`

const ListContainer = styled.div`
    margin: 0.5rem;
    overflow-y: scroll;
`

const PlayListItem = (props: PlayListInterface) => {
    const videoId = useContext(VideoContext);
    const { mutate } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {videoId: number, playListId: number}>(Video().addPlayList, {
        onSuccess: (data) => {
            alert('추가 완료.');
        },
        onError: (error) => {
            alert(error.response?.status);
        }
    });

    const addPlayList = () => {
        mutate({videoId: parseInt(videoId), playListId: props.id});
    }

    return (
        <PlayListItem.Container>
            {props.name}
            <PlayListItem.Add onClick={addPlayList}><CiSquarePlus size={24} /></PlayListItem.Add>
        </PlayListItem.Container>
    )
}

PlayListItem.Container = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.75rem 1.0rem;
    font-weight: 500;
    transition: all 200ms ease;
    :hover {
        background-color: var(--navbar-menu-hover);
    }
`

PlayListItem.Add = styled.div`
    position: absolute;
    right: 8px;
    color: var(--main-text-color-light);
    cursor: pointer;
    transition: all 200ms ease;
    :hover {
        color: var(--main-text-color);
    }
`

const NewPlayList = () => {
    const queryClient = useQueryClient();
    const playListName = useRef<HTMLInputElement>(null);
    const { mutate } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {name: string}>(Channel().newPlayList, {
        onSuccess: (data) => {
            if(playListName.current)
                playListName.current.value = '';
            queryClient.invalidateQueries(['myPlayList']);
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
            <FormTextBox ref={playListName} placeholder="새로운 플레이리스트" />
            <NewPlayList.Button onClick={() => newPlayList()}><BsFolderPlus size={24} /></NewPlayList.Button>
        </NewPlayList.Container>
    )
}

NewPlayList.Container = styled.div`
    display: flex;
    align-items: center;
    padding: 1.0rem;
`

NewPlayList.Button = styled.div`
    margin: 0 0.5rem 0 1.0rem;
    color: var(--main-text-color-light);
    cursor: pointer;
    transition: all 200ms ease;
    :hover {
        color: var(--main-text-color);
    }
`

export default PlayList;