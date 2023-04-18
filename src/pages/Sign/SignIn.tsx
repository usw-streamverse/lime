import styled from 'styled-components';
import { HiOutlineX } from 'react-icons/hi';
import { useRef, Dispatch, SetStateAction } from 'react';
import FormTextBox from 'components/FormTextBox';
import CheckBox from 'components/CheckBox';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';

interface SignInProps {
    setPage: Dispatch<SetStateAction<number>>,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

const SignIn = ({setPage, show, setShow}: SignInProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={200} classNames="left-swipe" unmountOnExit>
            <Container ref={nodeRef}>
                <Head>로그인</Head>
                <Close onClick={() => setShow(false)}><HiOutlineX size={32} /></Close>
                <FormTextBox label="ID" />
                <FormTextBox type="password" label="PASSWORD" />
                <CheckBoxWrapper>
                    <CheckBox id="auto_login">자동 로그인</CheckBox>
                </CheckBoxWrapper>
                <ButtonContainer>
                    <SignUp onClick={() => setPage(1)}>회원가입</SignUp>
                    <Button>로그인</Button>
                </ButtonContainer>
            </Container>
        </CSSTransition>
    )
}

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 3.0rem;
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
        color: var(--main-text-color);
    }
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const CheckBoxWrapper = styled.div`
    margin: 0.5rem 0 1.0rem 0;
`

const SignUp = styled.div`
    justify-content: flex-start;
    color: #0066ff;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
`

export default SignIn;