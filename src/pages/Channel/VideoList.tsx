import VideoListComponent from 'components/VideoList';
import Channel from 'apis/Channel';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const VideoList = () => {
    const {status, data} = useQuery(['channel', 'asd123', 'videoList'], () => Channel().videoList('asd123'));
    return (
        <Container>
            <VideoListComponent item={status === 'success' ? data?.data : []} />
        </Container>
    )
}

const Container = styled.div`
    padding: 1.0rem;
`

export default VideoList;