import styled from 'styled-components';
import { useRef, useEffect, ReactNode, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { OverlayContext } from './Overlay';

interface ModalProps {
    children: ReactNode,
    show: boolean,
    'data-key': string
}

const Modal = (props: ModalProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const overlayContext = useContext(OverlayContext);

    const closeModal = () => {
        overlayContext.hide(props['data-key']);
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', closeModal);

        return () => {
            document.body.style.overflowY = 'overlay';
            window.removeEventListener('popstate', closeModal);
        };
    }, []);

    return (
        <CSSTransition in={props.show} nodeRef={nodeRef} timeout={200} classNames="modal" unmountOnExit>
            <Container>
                <Shadow ref={nodeRef} onClick={closeModal}>
                    <Wrapper onClick={(e) => e.stopPropagation()}>
                        {props.children}
                    </Wrapper>
                </Shadow>
            </Container>
        </CSSTransition>
    );
}

const Container = styled.div`
    position: relative;
    z-index: 999;
`

const Shadow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
`

const Wrapper = styled.div`
    overflow: hidden;
    @media screen and (max-width: 480px) {
        width: 100%;
        height: 100%;
    }
`

export default Modal;