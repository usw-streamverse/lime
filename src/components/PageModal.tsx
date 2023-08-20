import styled from 'styled-components';
import { useRef, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { CSSTransition } from 'react-transition-group';

interface PageModalProps {
    children: ReactNode,
    show: boolean,
    animationName?: string
}

const PageModal = ({children, show, animationName = 'modal2'}: PageModalProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={300} classNames={animationName} unmountOnExit>
            <Container>
                <Wrapper ref={nodeRef} onClick={(e) => e.stopPropagation()}>
                    {children}
                </Wrapper>
            </Container>
        </CSSTransition>
    );
}

const Container = styled.div`
`

const Wrapper = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 101;
    @media screen and (min-width: 481px) {
        position: absolute;
        height: calc(100vh - 4.0rem);
        z-index: 4;
    }
`

export default PageModal;