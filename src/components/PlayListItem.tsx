import { ReactNode, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { PlayList as PlayListInterface } from 'apis/Channel'
import { getDifferenceTimeFormat, getKSTfromUTC } from 'utils/Time';

interface PlayListItemInterface extends PlayListInterface {
  onClick: (playlistId: number) => void
}

const PlayListItem = (props: PlayListItemInterface) => {
  return (
    <Container onClick={() => props.onClick(props.id)}>
      <Thumbnail>
        {props.thumbnail && <img src={props.thumbnail} alt="Thumbnail" />}
        <Count>동영상 {props.count}개</Count>
      </Thumbnail>
      <InforContainer>
        <Name>{props.name}</Name>
        <Date>{getDifferenceTimeFormat(getKSTfromUTC(props.created))}</Date>
      </InforContainer>
    </Container>
  )
}

const PlayListItemContainer = (props: {children: ReactNode}) => {
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
    <PlayListItemContainer.Container ref={refContainer}>
      {props.children}
    </PlayListItemContainer.Container>
  )
}

PlayListItemContainer.Container = styled.div`
  padding: 1.0rem;
`

PlayListItem.Container = PlayListItemContainer;

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: calc(100% / var(--thumbnail-row) - 12px);
  margin: 6px;
  padding: 1.0rem;
  border-radius: 0.25rem;
  cursor: pointer;
  --thumbnail-row: 5;
  transition: all 200ms ease;
  @media screen and (min-width: 481px) {
    :hover {
      transform: translateY(-0.5rem);
    }
  }

  @media screen and (max-width: 1940px) { --thumbnail-row: 4; }
  @media screen and (max-width: 1420px) { --thumbnail-row: 3; }
  @media screen and (max-width: 900px) { --thumbnail-row: 2; }
  @media screen and (max-width: 480px) { --thumbnail-row: 1; }
`

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #aaa;
  line-height: 0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    pointer-events: none;
  }
`

const Count = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.0rem 0.875rem;
  background-color: rgba(0, 0, 0, 0.75);
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 400;
  text-align: right;
`

const InforContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.75rem 0;
`

const Name = styled.div`
  font-size: 1.0rem;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Date = styled.div`
  flex-grow: 1;
  margin-left: 0.5rem;
  color: var(--main-text-color-light);
  font-size: 1.0;
  font-weight: 300;
  text-align: right;
`

export default PlayListItem