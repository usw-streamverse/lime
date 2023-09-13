import styled from 'styled-components';
import { useRef, ReactNode, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const RouteModal = (props: {children: ReactNode}) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <Container>
            <Wrapper ref={nodeRef} onClick={(e) => e.stopPropagation()}>
                {props.children}
            </Wrapper>
        </Container>
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

export default RouteModal;