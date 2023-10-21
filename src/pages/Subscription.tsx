import { useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import VideoListSkeleton from 'components/Skeleton/VideoList';
import VideoList from 'components/VideoList';
import styled from 'styled-components';

const Subscription = () => {
  const list = useQuery(['subscriptionList'], Video().subscriptionList);
  return (
    <Container>
      {list.isFetching ? <VideoListSkeleton /> : <VideoList item={list.status === 'success' ? list.data?.data : []} /> }
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

export default Subscription;