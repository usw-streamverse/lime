import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Sign = () => {
    const [page, setPage] = useState<number>(0);

    return (
        <Container>
            <SignIn show={page === 0} setPage={setPage} />
            <SignUp show={page === 1} setPage={setPage} />
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 450px;
    max-width: 100%;
    height: 700px;
    max-height: 100vh;
    background-color: var(--main-bg-color);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    @media screen and (max-width: 480px) {
        width: 100%;
        height: 100%;
    }
`

export default Sign;