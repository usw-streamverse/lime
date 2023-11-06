import styled from 'styled-components';
import VideoList from '../../components/VideoList';
import { useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import VideoListSkeleton from 'components/Skeleton/VideoList';
import SearchBox from 'components/Search/SearchBox';
import { BsGraphUp, BsSun } from 'react-icons/bs';

const Main = () => {
  const list = useQuery(['videoList'], Video().list);
  const popularList = useQuery(['popularVideoList'], Video().popularList);

  return (
    <Container>
      <Inner>
        <SearchWrap>
          <SearchBox />
        </SearchWrap>
        <Title>
          <BsGraphUp size={24} />
          인기 동영상
        </Title>
        <Wrapper>
          {popularList.isFetching ? (
            <VideoListSkeleton />
          ) : (
            <VideoList
              item={
                popularList.status === 'success' ? popularList.data?.data : []
              }
            />
          )}
        </Wrapper>
        <Title>
          <BsSun size={24} />
          최신 동영상
        </Title>
        <Wrapper>
          {list.isFetching ? (
            <VideoListSkeleton />
          ) : (
            <VideoList
              item={list.status === 'success' ? list.data?.data : []}
            />
          )}
        </Wrapper>
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 0;
`;

const Inner = styled.div`
  position: relative;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem 0 1rem;
  font-size: 1.25rem;
  font-weight: 500;

  svg {
    margin-right: 0.5rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 1.5rem;
  padding-top: 0.5rem;
`;

const SearchWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  padding: 1.5rem;
  padding-bottom: 1rem;
  background-color: var(--main-bg-color);
  z-index: 1;
`;

export default Main;
