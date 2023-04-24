import styled from 'styled-components';
import { HiOutlineX } from 'react-icons/hi';
import { useRef, Dispatch, SetStateAction, createRef, FormEventHandler } from 'react';
import FormTextBox from 'components/FormTextBox';
import CheckBox from 'components/CheckBox';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { Auth } from 'api';
import { TailSpin } from  'react-loader-spinner'
interface SignInProps {
    setPage: Dispatch<SetStateAction<number>>,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

const SignIn = ({setPage, show, setShow}: SignInProps) => {
    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const auth = Auth();
    const { mutate, status } = useMutation(() => {return auth.login(id?.current?.value || '', password?.current?.value || '')}, {
        onSuccess: () => {
            alert('로그인 성공');
        },
        onError: () => {
            alert('로그인 실패');
        }
    });
    
    const loginAttempt = () => {
        mutate();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(status === 'loading') return;
        loginAttempt();
    }

    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={300} classNames="up-swipe" unmountOnExit>
            <Container ref={nodeRef}>
                <Form onSubmit={handleSubmit}>
                    <Head>로그인</Head>
                    <Close onClick={() => setShow(false)}><HiOutlineX size={32} /></Close>
                    <FormTextBox ref={id} label="ID" />
                    <FormTextBox ref={password} type="password" label="PASSWORD" />
                    <SignInContainer>
                        <CheckBox id="auto_login">자동 로그인</CheckBox>
                        <Button type="submit" disabled={status === 'loading'}>{status === 'loading' ? <TailSpin height={24} width={24} color="#fff" visible={true} /> : '로그인'}</Button>
                    </SignInContainer>
                    
                    <SignUp onClick={() => setPage(1)}>회원가입</SignUp>
                </Form>
            </Container>
        </CSSTransition>
    )
}

const Form = styled.form`
    width: 100%;
`

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 3.0rem;
    background-color: var(--main-bg-color);
`

const Head = styled.div`
    position: absolute;
    top: 26px;
    left: 0;
    padding: 1.0rem;
    border-left: 0.5rem solid var(--sign-signin-bg-color);
    color: var(--main-text-color);
    font-weight: 400;
    font-size: 1.5rem;
    letter-spacing: 0.1em;
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

const SignInContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    width: 100%;
`

const SignUp = styled.div`
    justify-content: flex-start;
    color: #0066ff;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
`

export default SignIn;