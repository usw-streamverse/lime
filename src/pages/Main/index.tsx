import styled from 'styled-components';
import VideoList from '../../components/VideoList';
import { useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import VideoListSkeleton from 'components/Skeleton/VideoList';
import SearchBox from 'components/Search/SearchBox';
import { useContext } from 'react';
import { OverlayContext } from 'components/Overlay';

const Main = () => {
  const list = useQuery(['videoList'], Video().list);
  const popularList = useQuery(['popularVideoList'], Video().popularList);

  return (
    <Container>
      <Inner>
        <SearchWrap><SearchBox /></SearchWrap>
        <Title>인기 동영상</Title>
        <Wrapper>
          {
            popularList.isFetching ? <VideoListSkeleton /> : <VideoList item={popularList.status === 'success' ? popularList.data?.data : []} />
          }
        </Wrapper>
        <Title>최신 동영상</Title>
        <Wrapper>
          {
            list.isFetching ? <VideoListSkeleton /> : <VideoList item={list.status === 'success' ? list.data?.data : []} />
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

const Title = styled.div`
  padding: 0 1.5rem;
  font-size: 1.375rem;
  font-weight: 500;
`

const Wrapper = styled.div`
  width: 100%;
  padding: 1.5rem;
  padding-top: 0.5rem;
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