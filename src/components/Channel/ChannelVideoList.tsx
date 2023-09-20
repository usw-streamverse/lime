import VideoList from 'components/VideoList';
import Channel from 'apis/Channel';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const ChannelVideoList = (props: {id: string}) => {
    const {status, data} = useQuery(['channel', props.id, 'videoList'], () => Channel().videoList(props.id));
    return (
        <Container>
            <VideoList item={status === 'success' ? data?.data : []} />
        </Container>
    )
}

const Container = styled.div`
    padding: 1.0rem;
`

export default ChannelVideoList;