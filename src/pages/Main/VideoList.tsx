import styled from 'styled-components';
import Video, { VideoItem as videoItem } from 'apis/Video';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getDifferenceTimeFormat, getDurationFormat, getKSTfromUTC } from 'utils/Time';
import { useContext } from 'react';
import { ModalStartFormContext } from '.';
import { AnimationStartForm } from 'components/PageModal';
const VideoList = () => {
    const {status, data} = useQuery(['videoList'], Video().list);

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

const handleClick = (e: React.MouseEvent<HTMLDivElement>, modalStartForm: AnimationStartForm) => {
    modalStartForm.x = e.currentTarget.offsetLeft - window.scrollX;
    modalStartForm.y = e.currentTarget.offsetTop - window.scrollY;
    modalStartForm.width = e.currentTarget.offsetWidth;
    modalStartForm.height = e.currentTarget.offsetHeight;
}

const VideoItem = (props: videoItem) => {
    const modalStartForm = useContext(ModalStartFormContext);
    const navigate = useNavigate();
    return (
        <Container onClick={(e) => {handleClick(e, modalStartForm); navigate(`/watch/${props.id}`)}}>
            <Thumbnail>
                <img src={props.thumbnail} />
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
    padding: 0.5rem;
    box-shadow: 0 0 1.0rem 0 var(--videolist-shadow);
    border-radius: 0.25rem;
    cursor: pointer;
    --thumbnail-row: 5;
    transition: all 200ms ease;
    @media screen and (min-width: 481px) {
        :hover {
            box-shadow: 0 0 2.0rem 0 var(--videolist-shadow-hover);
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