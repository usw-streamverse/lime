import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import SignIn from './SignIn';

interface SignProps {
    setShow: Dispatch<SetStateAction<boolean>>
}

const Sign = ({setShow}: SignProps) => {
    return (
        <Container>
            <SignIn setShow={setShow} />
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 450px;
    max-width: 100%;
    height: 700px;
    max-height: 100%;
    background-color: var(--main-bg-color);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    @media screen and (max-width: 480px) {
        width: 100%;
        height: 100%;
    }
`

export default Sign;