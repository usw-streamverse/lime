import styled from 'styled-components';
import SearchBar from "./Search";
import VideoList from '../../components/VideoList';
import Watch from 'pages/Watch';
import { useEffect, useState } from 'react';
import PageModal from 'components/PageModal';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import SearchResult from 'components/SearchResult';
import Search from 'apis/Search';
import SearchResultSkeleton from 'components/Skeleton/SearchResult';
import VideoListSkeleton from 'components/Skeleton/VideoList';

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
    const [page, setPage] = useState<string>('');
    const location = useLocation();
    const query = useParams()['query'];
    const list = useQuery(['videoList'], Video().list);
    const search = useQuery(['searchList'], () => Search().search(query || ''), {enabled: false});

    useEffect(() => {
        const page = location.pathname.split('/')[1];
        setPage(page);

        switch(page){
            case 'search':
                search.refetch();
                break;
            default:
        }
    }, [location.pathname]);

    return (
        <Container>
            <PageModal show={page === 'watch'} animationName="modal2"><Watch /></PageModal>
            <Inner>
                <SearchWrap><SearchBar /></SearchWrap>
                <Wrapper>
                    {
                        ((page) => {
                            switch(page){
                                case 'search':
                                    return search.isFetching ? <SearchResultSkeleton /> : <SearchResult item={search.status === 'success' ? search.data?.data : []} />
                                default:
                                    return list.isFetching ? <VideoListSkeleton /> : <VideoList item={list.status === 'success' ? list.data?.data : []} />
                            }
                        })(page)
                    }
                    <Thumbnail>
                        <img alt="thumbnail" src="https://svlimestorage.blob.core.windows.net/lime/v1685515640893-thumbnail.png" />
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
    position: absolute;
    width: 100%;
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