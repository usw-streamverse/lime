import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Channel from 'apis/Channel'
import HorizontalPlayListItem from './HorizontalPlayListItem'
import PlayListItem from './PlayListItem'
import Loading from './Loading'
import styled from 'styled-components'

const PlayList = (props: {id?: number, horizontal: boolean, onClick: (playlistId: number) => void}) => {
    const { data, status } = useQuery({
        queryKey: ['playList', props.id || 0],
        staleTime: 0,
        queryFn: () => Channel().getPlayList(props.id || 0),
        onError: (error: AxiosError) => {
            alert(error.response?.status);
        }
    });

    if(status === 'success')
        return props.horizontal ? 
        (
            <HorizontalPlayListItem.Container>
            {
                data.data.map(i => {
                    return <HorizontalPlayListItem key={i.id} onClick={props.onClick} {...i} />
                })
            }
            </HorizontalPlayListItem.Container>
        )
        :
        (
            <PlayListItem.Container>
            {
                data.data.map(i => {
                    return <PlayListItem key={i.id} onClick={props.onClick} {...i} />
                })
            }
            </PlayListItem.Container>
        )
    else
        return (
            <Container>
                <Loading />
            </Container>
        )
}

const Container = styled.div`
    position: relative;
    min-height: 200px;
`

export default PlayList;