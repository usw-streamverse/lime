import styled, { keyframes } from 'styled-components';

const CommentSkeleton = () => {
  return (
    <Container>
      <Header>
        <Skeleton style={{width: '80px'}}>댓글</Skeleton>
      </Header>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  margin: 1.0rem;
  transition: all 200ms ease;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: -1px;
  padding: 1.0rem;
  background-color: var(--main-bg-color);
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    top: calc(100vw / 16 * 9);
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

export default CommentSkeleton;