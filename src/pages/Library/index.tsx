import { useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import PlayList from 'components/PlayList'
import VideoListSkeleton from 'components/Skeleton/VideoList';
import VideoList from 'components/VideoList';
import useUserQuery from 'hooks/useUserQuery'
import { BsClock, BsMusicNoteList } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Library = () => {
  const userQuery = useUserQuery();
  const navigate = useNavigate();
  const history = useQuery(['videoHistory'], Video().history);

  return (
    <Container>
      <Title><BsMusicNoteList size={24} />재생 목록</Title>
      <PlayList id={userQuery.Profile().data?.id} horizontal={false} onClick={(playListId) => navigate(`/watch/0/${playListId}`)} />
      <Title><BsClock size={24} />기록</Title>
      <Wrapper>
          {
            history.isFetching ? <VideoListSkeleton /> : <VideoList item={history.status === 'success' ? history.data?.data : []} />
          }
        </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding: 1.0rem;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 1.0rem 1.0rem 0 1.0rem;
  font-size: 1.25rem;
  font-weight: 500;

  svg {
    margin-right: 0.5rem;
  }
`

const Wrapper = styled.div`
  width: 100%;
  padding: 1.0rem;
  padding-top: 0.5rem;
`

export default Library;