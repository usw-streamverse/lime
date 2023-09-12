import styled from 'styled-components';
import { LiveItem as liveItem } from 'apis/Live';
import { useNavigate } from 'react-router-dom';
import { getDifferenceTimeFormat } from 'utils/Time';
import { CiCloudDrizzle } from 'react-icons/ci';

const LiveList = (props: {item: liveItem[]}) => {
    return (
        <>
        {
            props.item.length ? 
            props.item.map((e) => {
                return <LiveItem key={e.channel} {...e} />
            }) :
            <NoResult />
        }
        </>
    )
}

const NoResult = () => {
    return (
        <NoResult.Container>
            <CiCloudDrizzle size={64} />
            <NoResult.Text>진행 중인 라이브 스트리밍이 없습니다.</NoResult.Text>
        </NoResult.Container>
    )
}

NoResult.Container = styled.div`
    margin-top: 2.0rem;
    text-align: center;
`

NoResult.Text = styled.div`
    margin-top: 0.5rem;
    font-weight: 500;
`

const LiveItem = (props: liveItem) => {
    const navigate = useNavigate();
    return (
        <Container onClick={(e) => navigate(`/live/${props.channel}`)}>
            <Thumbnail>
                <img src={props.thumbnail} alt="Thumbnail" />
                <Box>LIVE</Box>
            </Thumbnail>
            <Title>{props.title}</Title>
            <Uploader>{props.nickname}</Uploader>
            <Detail>라이브 · {getDifferenceTimeFormat(props.created)}</Detail>
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

const Box = styled.span`
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

export default LiveList;