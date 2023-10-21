import Button from 'components/Button';
import { ReactNode } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import styled from 'styled-components';

const Alert = (props: {children: ReactNode}) => {
  const closeModal = () => {
    if(window.history.state.modal === 'alert') window.history.back();
  }

  return (
    <Container>
      <Title><BsExclamationCircle size={24} /></Title>
      <Body>{props.children}</Body>
      <ButtonWrapper>
        <Button color="var(--alert-color)" bgColor="transparent" borderColor="transparent" bgColorOver="var(--alert-bg-hover)" onClick={closeModal}>확인</Button>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 450px;
  max-width: calc(100vw - 2.0rem);
  max-height: calc(100vh - 2.0rem);
  padding: 1.25rem;
  border-radius: 0.375rem;
  box-shadow: var(--alert-shadow) 0 0 8px 1px;
  border: 1px solid #727272;
  background-color: var(--main-bg-color);
`

const Title = styled.div`
`

const Body = styled.div`
  margin: 1.5rem 0;
  font-size: 1.125rem;
  font-weight: 400;
  word-wrap: break-word;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
  > button {
    padding: 0.75rem 1.875rem;
    font-size: 1.0rem;
    font-weight: 500;
  }
`

export default Alert;