import styled from 'styled-components';

const VideoItem = () => {
    return (
        <Container>
            <Thumbnail />
            <Title>동영상 이름</Title>
            <Uploader>업로더 이름</Uploader>
            <Detail>조회수 100회 · 23시간 전</Detail>
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

const Thumbnail = styled.div`
    width: 100%;
    aspect-ratio: 16/9;
    background-color: #000;
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

export default VideoItem;