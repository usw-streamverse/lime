import styled from 'styled-components';
import Search from "./Search";
import VideoList from '../../components/VideoList';
import Watch from 'pages/Watch';
import { useEffect, useState } from 'react';
import PageModal from 'components/PageModal';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';

const Thumbnail = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 16/9;
    line-height: 0;
    opacity: 0;
    display: none;
    img {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
`


const Main = () => {
    const [watch, setWatch] = useState<boolean>(false);
    const location = useLocation();
    useEffect(() => {
        setWatch(location.pathname.split('/')[1] === 'watch');
    }, [location.pathname]);

    const {status, data} = useQuery(['videoList'], Video().list);

    return (
        <Container>
            <PageModal show={watch} setShow={setWatch} animationName="modal2"><Watch /></PageModal>
            <Inner>
                <SearchWrap><Search /></SearchWrap>
                <Wrapper>
                    <VideoList item={status === 'success' ? data?.data : []} />
                    <Thumbnail>
                        <img src="https://svlimestorage.blob.core.windows.net/lime/v1685515640893-thumbnail.png" />
                    </Thumbnail>
                </Wrapper>
            </Inner>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
`

const Inner = styled.div`
    position: relative;
    height: calc(100vh - 4.0rem);
    overflow-y: scroll;
`

const Wrapper = styled.div`
    padding: 1.5rem;
    padding-top: 0.5rem;
    @media screen and (max-width: 480px) {
        padding: 1.0rem;
    }
`

const SearchWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    position: sticky;
    top: 0;
    padding: 1.5rem;
    padding-bottom: 1.0rem;
    background-color: var(--main-bg-color);
    z-index: 2;
`

export default Main;