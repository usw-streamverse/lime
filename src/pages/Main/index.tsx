import styled from 'styled-components';
import SearchBar from "./Search";
import VideoList from '../../components/VideoList';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import SearchResult from 'components/SearchResult';
import Search from 'apis/Search';
import SearchResultSkeleton from 'components/Skeleton/SearchResult';
import VideoListSkeleton from 'components/Skeleton/VideoList';

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
                </Wrapper>
            </Inner>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    z-index: 0;
`

const Inner = styled.div`
    position: relative;
    height: calc(100vh - 4.0rem);
    overflow-y: scroll;
`

const Wrapper = styled.div`
    width: 100%;
    padding: 1.5rem;
    padding-top: 0.5rem;
    @media screen and (max-width: 480px) {
        position: absolute;
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
    z-index: 1;
`

export default Main;