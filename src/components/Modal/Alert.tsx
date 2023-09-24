import { ReactNode } from 'react';
import styled from 'styled-components';

const Alert = (props: {children: ReactNode}) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100px;
    background-color: #fff;
    z-index: 999;
`

export default Alert;