import { PlayListItem as PlayListItemInterface } from 'apis/Channel';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdArrowDropUp } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';
import PlayListItem from './PlayListItem';
import { VideoContext } from 'pages/Watch';

const PlayListPlayer = (props: {items: PlayListItemInterface[], onClick: (videoId: number) => void}) => {
  const videoContext = useContext(VideoContext);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Container>
      <Header onClick={() => setVisible((visible) => !visible)}>
        <Rotate>
          <AiOutlineLoading3Quarters size={16} />
        </Rotate>
        <Text>재생 목록 ({props.items.findIndex(item => item.video_id === Number(videoContext)) + 1}/{props.items.length})</Text>
        <Arrow visible={visible}><MdArrowDropUp size={24} /></Arrow>
      </Header>
      {
        visible &&
        <Body>
          {
            props.items.map(playList => <PlayListItem key={playList.video_id} onClick={props.onClick} {...playList} />)
          }
        </Body>
      }
    </Container>
  )
}

const Body = (props: {children: ReactNode[]}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if(!refContainer.current) return;
      refContainer.current.scrollBy({left: e.deltaY > 0 ? 50 : -50});
    }
    
    if(refContainer.current)
      refContainer.current.addEventListener('wheel', handleWheel);
    
    return () => {
      if(refContainer.current)
        refContainer.current.removeEventListener('wheel', handleWheel);
    }
  }, [refContainer]);

  return (
    <BodyContainer ref={refContainer}>{props.children}</BodyContainer>
  )
}

const Container = styled.div`
  background-color: var(--watch-body-bg-color);
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const BodyContainer = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #ebebeb;
  }
  ::-webkit-scrollbar-thumb {
    background: #babdc7;
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Rotate = styled.div`
  line-height: 0;
  svg {
    margin: 1.0rem 0.75rem 1.0rem 1.0rem;
    color: var(--main-text-color-light);
    animation: 1s ${rotate} linear infinite;
  }
`

const Text = styled.div`
  font-weight: 400;
`

const Arrow = styled.div<{visible: boolean}>`
  line-height: 0;
  transform: rotate(${props => props.visible ? `180deg` : `0deg`});
  transition: transform 200ms ease;
`

export default PlayListPlayer;