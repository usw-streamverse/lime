import styled, { css } from 'styled-components';
import { useRef, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { CSSTransition } from 'react-transition-group';

interface PageModalProps {
    children: ReactNode,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    animationName?: string
}


const PageModal = ({children, show, setShow, animationName = 'modal2'}: PageModalProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflowY = show ? 'hidden' : 'overlay';
    }, [show]);

    return (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={document.body.offsetWidth > 480 ? 0 : 300} classNames={animationName} unmountOnExit>
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
`

const Shadow = styled.div<{show: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: transparent;
    @media screen and (max-width: 480px) {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.45);
        z-index: 99;
    }
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    @media screen and (min-width: 481px) {
        position: absolute;
    }
`

export default PageModal;