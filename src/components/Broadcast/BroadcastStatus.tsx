import { BroadcastFormStateContext } from 'pages/Broadcast';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsClockFill, BsPersonFill } from 'react-icons/bs';
import styled from 'styled-components';
import { getSecondFormat } from 'utils/Time';

const BroadcastStatus = (props: {refVideo: React.RefObject<HTMLVideoElement>, title: string}) => {
  const context = useContext(BroadcastFormStateContext);
  const [duration, setDuration] = useState<number>(0);
  const [viewer, setViewer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timer>();
  useEffect(() => {
    if(!props.refVideo.current) return;
    timerRef.current = setInterval(() => {
      if(props.refVideo.current) setDuration(Math.floor(props.refVideo.current.currentTime));
      setViewer(context.broadcast.viewer.current || 0);
    }, 100);
    return () => {
      clearInterval(timerRef.current);
    }
  }, [props.refVideo])

  return (
    <Container>
      <DetailContainer>
        <Title>{props.title}</Title>
        <Detail>
          <Item><BsClockFill size={16} />{getSecondFormat(duration)}</Item>
          <Item style={{color: 'var(--red)'}}><BsPersonFill size={16} />{viewer}</Item>
        </Detail>
      </DetailContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const DetailContainer = styled.div`
`

const Title = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 400;
`

const Detail = styled.div`
  display: flex;
  align-items: center;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.375rem;
  font-weight: 400;
  :first-child {
    margin-left: 0;
  }
  :last-child {
    margin-right: 0;
  }
  svg {
    margin-right: 0.25rem;
  }

`

export default BroadcastStatus;