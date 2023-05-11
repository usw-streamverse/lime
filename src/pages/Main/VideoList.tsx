import styled from 'styled-components';
import Video, { VideoItem as videoItem } from 'api/Video';
import { useQuery } from '@tanstack/react-query';
    
const VideoList = () => {
    const {status, data} = useQuery(['videoList'], Video().list);
    
    console.log(status, data?.data);

    return (
        <>
        {
            status === 'success' &&
            data?.data.map((e) => {
                return <VideoItem key={e.id} {...e} />
            })
        }
        </>
    )
}

const VideoItem = (props: videoItem) => {
    return (
        <Container>
            <Thumbnail src={props.thumbnail} />
            <Title>{props.title}</Title>
            <Uploader>{props.nickname}</Uploader>
            <Detail>조회수 {props.views}회 · {props.created}</Detail>
        </Container>
    )
}

const Container = styled.div`
    display: inline-block;
    width: calc(100% / var(--thumbnail-row) - 12px);
    margin: 6px;
    --thumbnail-row: 5;
    @media screen and (max-width: 1940px) { --thumbnail-row: 4; }
    @media screen and (max-width: 1420px) { --thumbnail-row: 3; }
    @media screen and (max-width: 900px) { --thumbnail-row: 2; }
    @media screen and (max-width: 480px) { --thumbnail-row: 1; }
`

const Thumbnail = styled.img`
    width: 100%;
    aspect-ratio: 16/9;
`

const Title = styled.div`
    margin: 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 400;
`

const Uploader = styled.div`
    margin-bottom: 0.25rem;
    color: var(--main-text-color-light);
    font-weight: 300;
`

const Detail = styled.div`
    color: var(--main-text-color-light);
    font-weight: 300;
`

export default VideoList;