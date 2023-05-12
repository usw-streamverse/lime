import styled from 'styled-components';
import Video, { VideoItem as videoItem } from 'api/Video';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const time_format = (second: number): string => {
    return `${Math.floor(second/60)}:${(second%60<10 ? '0' : '') + second%60}`;
}
    
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
    const navigate = useNavigate();

    return (
        <Container onClick={() => navigate(`/watch/${props.id}`)}>
            <Thumbnail>
                <img src={props.thumbnail} />
                <Duration>{time_format(props.duration)}</Duration>
            </Thumbnail>
            <Title>{props.title}</Title>
            <Uploader>{props.nickname}</Uploader>
            <Detail>조회수 {props.views}회 · {props.created}</Detail>
        </Container>
    )
}

const Container = styled.div`
    display: inline-block;
    position: relative;
    width: calc(100% / var(--thumbnail-row) - 12px);
    margin: 6px;
    cursor: pointer;
    --thumbnail-row: 5;

    div:first-child {
        transition: all 150ms ease;
    }

    :hover {
        div:first-child {
            transform: scale(1.05);
        }
    }

    @media screen and (max-width: 1940px) { --thumbnail-row: 4; }
    @media screen and (max-width: 1420px) { --thumbnail-row: 3; }
    @media screen and (max-width: 900px) { --thumbnail-row: 2; }
    @media screen and (max-width: 480px) { --thumbnail-row: 1; }
`

const Thumbnail = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    line-height: 0;
    img {
        width: 100%;
        height: 100%;
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