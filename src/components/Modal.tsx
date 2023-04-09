import styled, { css } from 'styled-components';
import { ReactNode } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
    children: ReactNode,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

const Modal = ({children, show, setShow}: ModalProps) => {
    return (
        <Container show={show} onClick={() => setShow(false)}>
            <Shadow>
                <div onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
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
    width: 100vw; height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
`

export default Modal;