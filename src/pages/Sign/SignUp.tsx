import styled from 'styled-components';
import { HiOutlineChevronLeft, HiOutlineX } from 'react-icons/hi';
import { useRef, Dispatch, SetStateAction } from 'react';
import FormTextBox from 'components/FormTextBox';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { Auth } from 'api';
import { TailSpin } from  'react-loader-spinner'

interface SignUpProps {
    setPage: Dispatch<SetStateAction<number>>,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

const SignUp = ({setPage, show, setShow}: SignUpProps) => {
    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confirm_password = useRef<HTMLInputElement>(null);
    const nickname = useRef<HTMLInputElement>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const auth = Auth();
    const { mutate, status } = useMutation(() => {return auth.register(id?.current?.value || '', password?.current?.value || '', nickname?.current?.value || '')}, {
        onSuccess: () => {
            alert('회원가입 성공');
        },
        onError: () => {
            alert('회원가입 실패');
        }

    });
    const registerAttempt = () => {
        if(password?.current?.value !== confirm_password?.current?.value){
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        mutate();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(status === 'loading') return;
        registerAttempt();
    }

    return (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={300} classNames="down-swipe" unmountOnExit>
            <Container ref={nodeRef}>
                <Form onSubmit={handleSubmit}>
                    <Head>회원가입</Head>
                    <Close onClick={() => setShow(false)}><HiOutlineX size={32} /></Close>
                    <FormTextBox ref={id} label="ID" />
                    <FormTextBox ref={password} type="password" label="PASSWORD" />
                    <FormTextBox ref={confirm_password} type="password" label="CONFIRM PASSWORD" />
                    <FormTextBox ref={nickname} label="NICKNAME" />
                    <ButtonContainer>
                        <SignIn onClick={() => setPage(0)}><HiOutlineChevronLeft />로그인</SignIn>
                        <Button disabled={status === 'loading'}>{status === 'loading' ? <TailSpin height={24} width={24} color="#fff" visible={true} /> : '회원가입'}</Button>
                    </ButtonContainer>
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