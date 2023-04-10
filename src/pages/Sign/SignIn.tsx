import styled from 'styled-components';
import { HiOutlineX } from 'react-icons/hi';
import { Dispatch, SetStateAction } from 'react';
import FormTextBox from 'components/FormTextBox';

interface SignInProps {
    setShow: Dispatch<SetStateAction<boolean>>;
}

const SignIn = ({setShow}: SignInProps) => {
    return (
        <Container>
            <Head>로그인</Head>
            <Close onClick={() => setShow(false)}><HiOutlineX size={32} /></Close>
            <FormTextBox label="ID" />
            <FormTextBox label="PASSWORD" />
            <ButtonContainer>
                <SignUp>회원가입</SignUp>
                <Button>로그인</Button>
            </ButtonContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    padding: 0 1.0rem;
    margin: 0 2.0rem;
`

const Head = styled.div`
    position: absolute;
    top: 26px;
    left: 26px;
    color: var(--main-text-color);
    font-weight: 400;
    font-size: 2.0rem;
    letter-spacing: 0.1em;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`

const Close = styled.div`
    position: absolute;
    top: 26px;
    right: 18px;
    line-height: 0;
    color: #bebebe;
    cursor: pointer;
    transition: color 200ms ease;
    :hover {
        color: #000;
    }
`

const Button = styled.button`
    justify-content: flex-end;
    width: 120px;
    height: 48px;
    max-width: 100%;
    background-color: var(--sign-signin-bg-color);
    border: 0;
    border-radius: 2px;
    color: #fff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 200ms ease;
    :hover {
        background-color: var(--sign-signin-bg-color-hover);
    }
    :active {
        background-color: var(--sign-signin-bg-color-active);
    }
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const SignUp = styled.div`
    justify-content: flex-start;
    color: #0066ff;
    letter-spacing: 1px;
    cursor: pointer;
`

export default SignIn;