import styled, { css } from 'styled-components';
import { ReactNode } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
    children: ReactNode,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

const Modal = ({children, show, setShow}: ModalProps) => {
    document.body.style.overflowY = show ? 'hidden' : 'overlay';

    return (
        <Container show={show}>
            <Shadow onClick={() => setShow(false)}>
                <Wrapper onClick={(e) => e.stopPropagation()}>
                    {children}
                </Wrapper>
            </Shadow>
        </Container>
    );
}

const Container = styled.div<{show: boolean}>`
    position: relative;
    transition: all 200ms ease;
    ${(props) => props.show ?
        css `
            opacity: 1.0;
            pointer-events: all;
        ` :
        css `
            opacity: 0;
            pointer-events: none;    
        `
    };
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