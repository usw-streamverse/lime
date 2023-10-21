import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchResult from 'components/Search/SearchResult';
import SearchApi from 'apis/Search';
import SearchResultSkeleton from 'components/Skeleton/SearchResult';
import SearchBox from 'components/Search/SearchBox';
import { useRef } from 'react';

const Search = () => {
  const query = useRef<string>(useParams()['query'] || '');
  const search = useQuery(['searchList'], () => SearchApi().search(query.current || ''));

  const onSearch = (paramQuery: string) => {
    query.current = paramQuery;
    search.refetch();
  }

  return (
    <Container>
      <Inner>
        <SearchWrap><SearchBox defaultValue={query.current || ''} onSearch={onSearch} replaceState /></SearchWrap>
        <Wrapper>
          {search.isFetching && <SearchResultSkeleton />}
          <AnimatedWrapper value={!search.isFetching}>
            {!search.isFetching && <SearchResult item={search.status === 'success' ? search.data?.data : []} />}
          </AnimatedWrapper>
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

const AnimatedWrapper = styled.div<{value: boolean}>`
  opacity: 0;
  ${props => props.value && `
    opacity: 1;
    transition: all 500ms ease;
  `}
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