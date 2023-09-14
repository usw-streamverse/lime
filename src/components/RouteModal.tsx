import styled from 'styled-components';
import { useRef, ReactNode, useEffect, useState } from 'react';

const RouteModal = (props: {children: ReactNode}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [animation, setAnimation] = useState<boolean>(false);
    
    useEffect(() => {
        setAnimation(true);
    }, []);

    return (
        <Wrapper animation = {animation} ref={nodeRef} onClick={(e) => e.stopPropagation()}>
            {props.children}
        </Wrapper>
    );
}

const Wrapper = styled.div<{animation: boolean}>`
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 101;
    
    ${(props) => props.animation ?
        `
            opacity: 1.0;
            transform: scale(1.0);
        ` : 
        `
            opacity: 0;
            transform: scale(0.9);
        `
    }

    @media screen and (min-width: 481px) {
        position: absolute;
        height: calc(100vh - 4.0rem);
        z-index: 4;
    }

    transition: all 200ms ease;
`

export default RouteModal;