import Button from 'components/Button';
import VideoContainer from 'components/VideoContainer';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BroadcastFormStateContext } from '.';
import BroadcastStatus from 'components/Broadcast/BroadcastStatus';
import { OverlayContext } from 'components/Overlay';
import ModifyTitle from 'components/Modal/Broadcast/ModifyTitle';
import { useNavigate } from 'react-router-dom';

const BroadcastOnAir = () => {
  const refVideo = useRef<HTMLVideoElement>(null);
  const context = useContext(BroadcastFormStateContext);

  useEffect(() => {
    context.broadcast.setVideo(refVideo);
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <ModifyTitleButton />
        <EndBroadcastButton />
      </ButtonContainer>
      <Body>
        <Preview refVideo={refVideo}/>
      </Body>
    </Container>
  )
}

const EndBroadcastButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/')} borderColor="var(--sign-textbox-border-color)" color="var(--navbar-menu-text-color-active)" bgColor="var(--button1-bg-color)" bgColorOver="var(--navbar-menu-hover)">스트리밍 종료</Button>
  )
}

const ModifyTitleButton = () => {
  const overlayContext = useContext(OverlayContext);
  const context = useContext(BroadcastFormStateContext);

  useEffect(() => {
    overlayContext.push(<ModifyTitle broadcast={context.broadcast} />, 'ModifyTitle')

    return () => {
      overlayContext.hide('ModifyTitle');
    }
  }, [context.broadcast]);

  return (
    <Button onClick={() => overlayContext.show('ModifyTitle')} borderColor="var(--sign-textbox-border-color)" color="var(--navbar-menu-text-color-active)" bgColor="var(--button1-bg-color)" bgColorOver="var(--navbar-menu-hover)">제목 변경</Button>
  )
}

const Preview = (props: {refVideo: React.RefObject<HTMLVideoElement>}) => {
  const [visible, setVisible] = useState<Boolean>(true);
  const context = useContext(BroadcastFormStateContext);

  return (
    <Preview.Container>
      <Preview.VideoWrapper style={{display: visible ? 'block' : 'none'}}>
        <VideoContainer>
          <VideoContainer.Text>방송 송출화면 미리보기</VideoContainer.Text>
          <video width="100%" height="100%" ref={props.refVideo} muted>
            <source />
          </video>
        </VideoContainer>
      </Preview.VideoWrapper>
      <Preview.Infor>
        <BroadcastStatus refVideo={props.refVideo} title={context.broadcast.title} />
        <Button onClick={() => setVisible(visible => !visible)} borderColor="var(--button1-border-color)" color="var(--navbar-menu-text-color-active)" bgColor="var(--button1-bg-color)" bgColorOver="var(--navbar-menu-hover)">{visible ? '송출 화면 숨기기' : '송출 화면 표시'}</Button>
      </Preview.Infor>
    </Preview.Container>
  )
}

Preview.Container = styled.div`

`

Preview.VideoWrapper = styled.div`
  margin-bottom: 1.0rem;
`

Preview.Infor = styled.div`
  display: flex;
  justify-content: space-between;
`

const Container = styled.div`
  position: relative;
  padding: 1.5rem;
  margin: 0 auto;
  max-width: 1024px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  > button {
    height: 3.0rem;
    padding: 0.5rem 1.5rem;
    margin: 0.25rem 0.375rem;
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`

const Body = styled.div`
  margin-top: 1.0rem;
`

export default BroadcastOnAir;