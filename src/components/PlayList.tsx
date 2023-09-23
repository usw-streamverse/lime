import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Channel from 'apis/Channel'
import PlayListItem from './PlayListItem'

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
            <PlayListItem.Container>
                {
                    data.data.map(i => {
                        return <PlayListItem key={i.id} {...i} />
                    })
                }
            </PlayListItem.Container>
        )
    else
        return (
            <>
                Loading...
            </>
        )
}


/*
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
        </PlayListItem.Container>
    )
}*/

export default PlayList;