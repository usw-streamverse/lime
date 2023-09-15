import styled from 'styled-components';
import { VideoItem as videoItem } from 'apis/Video';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDifferenceTimeFormat, getDurationFormat, getKSTfromUTC } from 'utils/Time';

const VideoList = (props: {item: videoItem[]}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const watch = (id: number) => {
        navigate(`/watch/${id}`, {state: {modal: location}});
    }

    return (
        <>
        {
            props.item.map((e) => {
                return <VideoItem onClick={() => watch(e.id)} key={e.id} {...e} />
            })
        }
        </>
    )
}

interface VideoItemProps extends videoItem {
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const VideoItem = (props: VideoItemProps) => {
    return (
        <Container onClick={props.onClick}>
            <Thumbnail>
                <img src={props.thumbnail} alt="Thumbnail" />
                <Duration>{getDurationFormat(props.duration)}</Duration>
            </Thumbnail>
            <InforContainer>
                <div>
                    <ProfileIcon profileColor={props.profile} />
                </div>
                <DetailContainer>
                    <Title>{props.title}</Title>
                    <Uploader>{props.nickname}</Uploader>
                    <Detail>조회수 {props.view_count}회 · {getDifferenceTimeFormat(getKSTfromUTC(props.created))}</Detail>
                </DetailContainer>
            </InforContainer>
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

const InforContainer = styled.div`
    display: flex;
    flex: auto;
    margin-top: 0.25rem;
`

const DetailContainer = styled.div`
    overflow-x: hidden;
`

const ProfileIcon = styled.div<{profileColor: string}>`
    width: 2.0rem;
    height: 2.0rem;
    margin-top: 0.5rem;
    margin-right: 1.0rem;
    background-color: ${props => props.profileColor};
    border-radius: 50%;
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
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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