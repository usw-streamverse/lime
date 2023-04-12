import styled from 'styled-components';
import { HiOutlineChevronLeft, HiOutlineX } from 'react-icons/hi';
import { useRef, Dispatch, SetStateAction } from 'react';
import FormTextBox from 'components/FormTextBox';
import { CSSTransition } from 'react-transition-group';

interface SignUpProps {
    setPage: Dispatch<SetStateAction<number>>,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

const SignUp = ({setPage, show, setShow}: SignUpProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    console.log(show);
    return (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={200} classNames="right-swipe" unmountOnExit>
            <Container ref={nodeRef}>
                <Head>회원가입</Head>
                <Close onClick={() => setShow(false)}><HiOutlineX size={32} /></Close>
                <FormTextBox label="ID" />
                <FormTextBox type="password" label="PASSWORD" />
                <FormTextBox type="password" label="CONFIRM PASSWORD" />
                <FormTextBox label="NICKNAME" />
                <ButtonContainer>
                    <SignIn onClick={() => setPage(0)}><HiOutlineChevronLeft />로그인</SignIn>
                    <Button>회원가입</Button>
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
    @media screen and (min-width: 481px) {
        :hover {
            background-color: var(--sign-signin-bg-color-hover);
        }
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
const SignIn = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #0066ff;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
`
export default SignUp;