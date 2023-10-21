import styled from 'styled-components';
import { useRef, useEffect, ReactNode, useContext, RefObject } from 'react';
import { CSSTransition } from 'react-transition-group';

interface ModalProps {
  children: ReactNode,
  show?: boolean,
  nodeRef?: RefObject<HTMLDivElement>,
  'data-key': string
}

const Modal = (props: ModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(props.show){
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      if(props.show){
        document.body.style.overflowY = 'overlay';
      }
    };
  }, [props.show]);

  const closeModal = () => {
    if(window.history.state.modal === props['data-key']) window.history.back();
  }

  return (
    props['data-key'] === 'alert' ?
    <Container ref={props.nodeRef}>
      <Shadow className="shadow" onClick={closeModal} />
      <Wrapper className="body" isAlert={props['data-key'] === 'alert'} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </Wrapper>
    </Container>
    :
    <CSSTransition in={props.show} nodeRef={nodeRef} timeout={200} classNames="modal" unmountOnExit>
      <Container ref={nodeRef}>
        <Shadow className="shadow" onClick={closeModal} />
        <Wrapper className="body" isAlert={props['data-key'] === 'alert'} onClick={(e) => e.stopPropagation()}>
          {props.children}
        </Wrapper>
      </Container>
    </CSSTransition>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 999;
`

const Shadow = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`

const Wrapper = styled.div<{isAlert: boolean}>`
  ${props => !props.isAlert && `
    overflow: hidden;
    @media screen and (max-width: 480px) {
      width: 100%;
      height: 100%;
    }
  `}
`

export default Modal;