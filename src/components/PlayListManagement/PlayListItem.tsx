import { PlayListItem as PlayListItemProps } from 'apis/Channel';
import { BsXLg } from 'react-icons/bs';
import styled from 'styled-components';
import { getDifferenceTimeFormat, getDurationFormat, getKSTfromUTC } from 'utils/Time';

const PlayListItem = (props: PlayListItemProps) => {
  console.log(props);
  return (
    <Container>
       <Thumbnail>
          <img src={props.thumbnail} alt="Thumbnail" />
          <Duration>{getDurationFormat(props.duration)}</Duration>
      </Thumbnail>
      <InforContainer>
        <Title>{props.title}</Title>
        <Detail>{getDifferenceTimeFormat(getKSTfromUTC(props.created))}에 추가됨</Detail>
      </InforContainer>
      <ButtonContainer>
        <Delete />
      </ButtonContainer>
    </Container>
  )
}

const Delete = () => {
  return (
    <DeleteButton onClick={() => alert(1)}><BsXLg size={18} /></DeleteButton>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin: 6px;
  padding: 1.0rem;
`

const Thumbnail = styled.div`
  position: relative;
  width: 30%;
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

const InforContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.0rem;
`

const Title = styled.div`
  margin: 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Detail = styled.div`
  margin-bottom: 0.25rem;
  color: var(--main-text-color-light);
  font-size: 0.875rem;
  font-weight: 300;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 1.0rem;
`

const DeleteButton = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  transition: all 200ms ease;
  :hover {
    color: var(--red);
  }
`

export default PlayListItem;