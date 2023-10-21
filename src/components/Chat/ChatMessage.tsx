import styled, { css } from 'styled-components';

export interface ChatMessageProps {
  profile: string,
  nickname: string,
  text: string,
  broadcaster: boolean
}

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <Container>
      <Profile profile={props.profile} />
      <Nickname broadcaster={props.broadcaster}>{props.nickname}</Nickname>
      <Text>{props.text}</Text>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  :first-child {
    margin-top: -0.5rem;
  }
  :last-child {
    margin-bottom: -0.5rem;
  }
`

const Profile = styled.div<{profile: string}>`
  background-color: ${props => props.profile};
  border-radius: 50%;
  width: 2.0rem;
  height: 2.0rem;
`

const Nickname = styled.div<{broadcaster: boolean}>`
  padding: 1.0rem 0;
  margin: 0 0.5rem;
  ${props => props.broadcaster && css `color: var(--red);`}
  font-size: 1.0rem;
  font-weight: 600;
`

const Text = styled.div`
  font-weight: 400;
`

export default ChatMessage;