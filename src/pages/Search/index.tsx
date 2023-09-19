import styled from 'styled-components';
import {  useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchResult from 'components/Search/SearchResult';
import SearchApi from 'apis/Search';
import SearchResultSkeleton from 'components/Skeleton/SearchResult';
import SearchBox from 'components/Search/SearchBox';

const Search = () => {
    const query = useParams()['query'];
    const search = useQuery(['searchList'], () => SearchApi().search(query || ''));

    return (
        <Container>
            <Inner>
                <SearchWrap><SearchBox defaultValue={query || ''} /></SearchWrap>
                <Wrapper>
                    {
                        search.isFetching ? <SearchResultSkeleton /> : <SearchResult item={search.status === 'success' ? search.data?.data : []} />
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

export default Search;