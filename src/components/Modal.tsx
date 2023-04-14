import styled, { css } from 'styled-components';
import { useRef, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { CSSTransition } from 'react-transition-group';

interface ModalProps {
    children: ReactNode,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}


const Modal = ({children, show, setShow}: ModalProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    
    const closeModal = () => {
        setShow(false);
    };

    useEffect(() => {
        document.body.style.overflowY = show ? 'hidden' : 'overlay';

        if(show){
            window.history.pushState(null, '', window.location.href);
            window.addEventListener('popstate', closeModal);
        }

        return () => {
            window.removeEventListener('popstate', closeModal);
        };
    }, [show]);

    return (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={200} classNames="modal" unmountOnExit>
            <Container>
                <Shadow ref={nodeRef} show={show} onClick={() => setShow(false)}>
                    <Wrapper onClick={(e) => e.stopPropagation()}>
                        {children}
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

const Shadow = styled.div<{show: boolean}>`
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