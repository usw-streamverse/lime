import styled, {keyframes} from 'styled-components';

const SearchResultSkeleton = () => {
  return (
    <ResultContainer>
      <SearchItem />
      <SearchItem />
      <SearchItem />
      <SearchItem />
    </ResultContainer>
  )
}

const ResultContainer = styled.div`
  position: relative;
`

const SearchItem = () => {
  return (
    <Container>
      <Thumbnail><Skeleton /></Thumbnail>
      <Infor>
        <Title><Skeleton style={{width: '230px'}}>Title</Skeleton></Title>
        <Detail><Skeleton style={{width: '150px'}}>Detail</Skeleton></Detail>
        <Uploader><Skeleton style={{width: '100px'}}>Uploader</Skeleton></Uploader>
        <Explanation><Skeleton style={{width: '300px'}}>Explanation</Skeleton></Explanation>
      </Infor>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 1.0rem 0;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 200ms ease;
  @media screen and (max-width: 768px) {
    display: block;
    padding: 0;
  }
  
`

const Thumbnail = styled.div`
  position: relative;
  width: 400px;
  aspect-ratio: 16/9;
  line-height: 0;
  div {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    pointer-events: none;
  }
  @media screen and (max-width: 1024px) {
    width: 300px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const Infor = styled.div`
  padding: 0 1.0rem;
  width: calc(100% - 400px);
  @media screen and (max-width: 1024px) {
    width: calc(100% - 300px);
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0.5rem 0 1.0rem 0;
    padding: 0;
  }
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`

const Uploader = styled.div`
  margin-bottom: 0.75rem;
  color: var(--main-text-color-light);
  font-size: 1.125rem;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Detail = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  color: var(--main-text-color-light);
  font-size: 1.125rem;
  font-weight: 300;
`

const Explanation = styled.div`
  margin-bottom: 0.25rem;
  color: var(--main-text-color-light);
  font-size: 1.125rem;
  font-weight: 300;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const loading = keyframes`
  0% {
    background-position-x: 0%;
  }
  100% {
    background-position-x: 200%;
  }
`

const Skeleton = styled.div`
  position: relative;
  background-color: var(--skeleton-bg-color);
  background: linear-gradient(90deg, var(--skeleton-bg-color) 0%, var(--skeleton-bg-color-animation) 50%, var(--skeleton-bg-color) 100%) #fdfdfd;
  background-size: 200% 100%;
  color: transparent;
  animation: ${loading} 1500ms infinite linear;
`

export default SearchResultSkeleton;