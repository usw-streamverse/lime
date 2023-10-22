import styled, { css } from 'styled-components'
import { PlayListItem as PlayListItemInterface } from 'apis/Channel';
import { getDurationFormat } from 'utils/Time';
import { useContext } from 'react';
import { VideoContext } from 'pages/Watch';

interface PlayListItemProps extends PlayListItemInterface {
  onClick: (videoId: number) => void,
}

const PlayListItem = (props: PlayListItemProps) => {
  const videoContext = useContext(VideoContext);

  return (
    <Container selected={Number(videoContext) === props.video_id} onClick={() => props.onClick(props.video_id)}>
      <Thumbnail>
        <img src={props.thumbnail} />
        <Duration>{getDurationFormat(props.duration)}</Duration>
      </Thumbnail>
      <Title>{props.title}</Title>
    </Container>
  )
}

const Container = styled.div<{selected: boolean}>`
  display: inline-block;
  width: 200px;
  padding: 1.0rem;
  ${props => props.selected && css `
    background-color: var(--playlist-item-selected);
  `}
`;

const Thumbnail = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  line-height: 0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    pointer-events: none;
  }
`

const Duration = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  padding: 0.75rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.66);
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 400;
`

const Title = styled.div`
  position: relative;
  padding: 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default PlayListItem;