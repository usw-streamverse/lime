import { ReactNode } from 'react';
import styled from 'styled-components'

const VideoContainer = (props: {children: ReactNode}) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

VideoContainer.Text = styled.div`
  position: absolute;
  background-color: #000;
  color: #fff;
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #000;
  color: #fff;

  aspect-ratio: 16 / 9;

  video {
    z-index: 1;
  }
`

export default VideoContainer