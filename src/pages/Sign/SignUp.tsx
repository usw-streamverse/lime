import styled, { css } from 'styled-components';
import { HiOutlineChevronLeft, HiOutlineX } from 'react-icons/hi';
import { useRef, useState, Dispatch, SetStateAction } from 'react';
import FormTextBox from 'components/FormTextBox';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { Auth } from 'api';
import { TailSpin } from  'react-loader-spinner'
import { AxiosError, AxiosResponse } from 'axios';
import { RegisterParam, RegisterResult } from 'api/Auth';

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
    const [error, setError] = useState<number>(0);
    const nodeRef = useRef<HTMLDivElement>(null);
    const auth = Auth();

    const { mutate, status } = useMutation<AxiosResponse<RegisterResult>, AxiosError<RegisterResult>, RegisterParam>(auth.register, {
        onSuccess: (data) => {
            alert('회원가입 성공!');
        },
        onError: (error) => {
            setError(error.response?.data?.code || 99);
        }
    });
    
    const registerAttempt = () => {
        setError(0);
        if(password?.current?.value !== confirm_password?.current?.value){
            confirm_password?.current?.focus();
            setError(6);
            return;
        }
        mutate({id: id?.current?.value || '', password: password?.current?.value || '', nickname: nickname?.current?.value || ''});
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
                    <FormTextBox warning={error === 2 || error === 3} ref={id} label="ID" />
                    <FormTextBox warning={error === 4} ref={password} type="password" label="PASSWORD" />
                    <FormTextBox warning={error === 6} ref={confirm_password} type="password" label="CONFIRM PASSWORD" />
                    <FormTextBox warning={error === 5} ref={nickname} label="NICKNAME" />
                    <Error visible={error !== 0}>
                        {{
                            2: '이미 사용중인 아이디입니다.',
                            3: '아이디를 입력해 주세요.',
                            4: '비밀번호를 입력해 주세요.',
                            5: '닉네임을 입력해 주세요.',
                            6: '비밀번호가 일치하지 않습니다.',
                            99: '알 수 없는 오류가 발생하였습니다.'
                        }[error]}
                    </Error>
                    <ButtonContainer>
                        <SignIn onClick={() => setPage(0)}><HiOutlineChevronLeft />로그인</SignIn>
                        <Button type="submit" disabled={status === 'loading'}>{status === 'loading' ? <TailSpin height={24} width={24} color="#fff" visible={true} /> : '회원가입'}</Button>
                    </ButtonContainer>
                </Form>
            </Container>
        </CSSTransition>
    )
}

const Form = styled.form`
    width: 100%;
`

const Error = styled.div<{visible: boolean}>`
    height: 1.0rem;
    margin-top: -0.5rem;
    margin-bottom: 1.0rem;
    color: var(--red);
    font-weight: 400;

    ${(props) => props.visible ? css `
        opacity: 1;
        transition: all ease-in-out 200ms;
    ` : css `
        opacity: 0;
    `}
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