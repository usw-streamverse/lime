import Button from 'components/Button';
import FormTextBox from 'components/FormTextBox';
import { OverlayContext } from 'components/Overlay';
import { useBroadcastType } from 'hooks/useBroadcast';
import { useContext, useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import styled from 'styled-components';

const ModifyTitle = (props: {broadcast: useBroadcastType}) => {
  const refTitle = useRef<HTMLInputElement>(null);

  const modifyTitle = () => {
    if(!refTitle.current) return;
    props.broadcast.modifyTitle(refTitle.current.value);
    closeModal();
  }
  
  const closeModal = () => {
    if(window.history.state.modal === 'ModifyTitle') window.history.back();
  }

  return (
    <Container>
      <Head>제목 변경</Head>
      <Close onClick={closeModal}><HiOutlineX size={32} /></Close>
      <Body>
        <FormTextBox ref={refTitle} placeholder="라이브 스트리밍 제목" defaultValue={props.broadcast.title} />
        <ButtonContainer>
          <Button color="#fff" bgColor="#2c7fe5" bgColorOver="#0e5ab9" onClick={modifyTitle}>변경하기</Button>
        </ButtonContainer>
      </Body>
    </Container>
  )
}

const Body = styled.div`
  flex: 1 1 auto;
  padding: 1.5rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 500px;
  max-width: 100%;
  max-height: 100vh;
  background-color: var(--main-bg-color);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  @media screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`

const Head = styled.div`
  margin-top: 26px;
  padding: 1.0rem;
  border-left: 0.5rem solid var(--sign-signin-bg-color);
  color: var(--main-text-color);
  font-weight: 500;
  font-size: 1.125rem;
`

const Close = styled.div`
  position: absolute;
  top: 26px;
  right: 18px;
  line-height: 0;
  color: #bebebe;
  cursor: pointer;
  transition: color 200ms ease;
  :hover {
    color: var(--main-text-color);
  }
`

const ButtonContainer = styled.div`
  float: right;
  padding-top: 1.5rem;
`

export default ModifyTitle;