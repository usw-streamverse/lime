import styled, { keyframes } from 'styled-components';

const VideoListSkeleton = () => {
    return (
        <>
            <VideoItem />
            <VideoItem />
            <VideoItem />
            <VideoItem />
            <VideoItem />
            <VideoItem />
            <VideoItem />
            <VideoItem />
        </>
    )
}


const VideoItem = () => {
    return (
        <Container>
            <Thumbnail><Skeleton /></Thumbnail>
            <Title><Skeleton style={{width: '200px'}}>Title</Skeleton></Title>
            <Uploader><Skeleton style={{width: '100px'}}>Uploader</Skeleton></Uploader>
            <Detail><Skeleton style={{width: '130px'}}>Detail</Skeleton></Detail>
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
    div {
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        pointer-events: none;
    }
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

const loading = keyframes`
    0% {
        background-position-x: 0%;
    }
    100% {
        background-position-x: 200%;
    }
`

const Skeleton = styled.div`
    position: relative;
    background-color: var(--skeleton-bg-color);
    background: linear-gradient(90deg, var(--skeleton-bg-color) 0%, var(--skeleton-bg-color-animation) 50%, var(--skeleton-bg-color) 100%) #fdfdfd;
    background-size: 200% 100%;
    color: transparent;
    animation: ${loading} 1500ms infinite linear;
`

export default VideoListSkeleton;