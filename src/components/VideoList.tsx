import styled from 'styled-components';
import { VideoItem as videoItem } from 'apis/Video';
import { useNavigate } from 'react-router-dom';
import { getDifferenceTimeFormat, getDurationFormat, getKSTfromUTC } from 'utils/Time';

const VideoList = (props: {item: videoItem[]}) => {
    return (
        <>
        {
            props.item.map((e) => {
                return <VideoItem key={e.id} {...e} />
            })
        }
        </>
    )
}


const VideoItem = (props: videoItem) => {
    const navigate = useNavigate();
    return (
        <Container onClick={(e) => navigate(`/watch/${props.id}`)}>
            <Thumbnail>
                <img src={props.thumbnail} alt="Thumbnail" />
                <Duration>{getDurationFormat(props.duration)}</Duration>
            </Thumbnail>
            <Title>{props.title}</Title>
            <Uploader>{props.nickname}</Uploader>
            <Detail>조회수 {props.view_count}회 · {getDifferenceTimeFormat(getKSTfromUTC(props.created))}</Detail>
        </Container>
    )
}

const Container = styled.div`
    display: inline-block;
    position: relative;
    width: calc(100% / var(--thumbnail-row) - 12px);
    margin: 6px;
    padding: 1.0rem;
    border-radius: 0.25rem;
    cursor: pointer;
    --thumbnail-row: 5;
    transition: all 200ms ease;
    @media screen and (min-width: 481px) {
        :hover {
            transform: translateY(-0.5rem);
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

const Title = styled.div`
    margin: 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 400;
`

const Uploader = styled.div`
    margin-bottom: 0.25rem;
    color: var(--main-text-color-light);
    font-size: 0.875rem;
    font-weight: 300;
`

const Detail = styled.div`
    color: var(--main-text-color-light);
    font-size: 0.875rem;
    font-weight: 300;
`

export default VideoList;